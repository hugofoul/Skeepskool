// Pré-rendu : après `vite build`, ouvre chaque page du site dans Chrome (sans
// fenêtre) et enregistre le HTML obtenu dans dist/ (cours.html, en/lessons.html…).
// Google, Facebook, WhatsApp… reçoivent ainsi directement le contenu, le titre,
// la description et les balises hreflang de chaque page.
// Génère aussi dist/sitemap.xml et dist/404.html.
//
// Chrome est cherché aux emplacements habituels (ou via la variable CHROME_PATH).
// Sans Chrome, chaque page reçoit une copie de index.html : le site fonctionne,
// mais sans le bénéfice SEO du pré-rendu (un avertissement est affiché).

import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { promisify } from 'node:util'
import zlib from 'node:zlib'
import { DEFAULT_LANG, HREFLANG, LANGS, ROUTES } from '../src/config/routes.js'
import { SITE_URL } from '../src/config/site.js'

const run = promisify(execFile)
const DIST = path.resolve(process.env.PRERENDER_DIST || 'dist')
const PORT = 4321 + Math.floor(Math.random() * 1000)
const CONCURRENCY = 4

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean)

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
}

/** Serves dist/ like the production server would before pre-rendering (SPA fallback). */
const startServer = (shell) => new Promise((resolve) => {
  const server = http.createServer(async (req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0])
    const file = path.join(DIST, url)
    if (url.startsWith('/api/')) {
      res.writeHead(404).end()
      return
    }
    if (file.startsWith(DIST) && path.extname(file) && existsSync(file)) {
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' })
      res.end(await fs.readFile(file))
      return
    }
    res.writeHead(200, { 'Content-Type': MIME['.html'] })
    res.end(shell)
  })
  server.listen(PORT, '127.0.0.1', () => resolve(server))
})

// Pre-compressed copies served by public/.htaccess (Brotli / Gzip).
const writeWithCompressed = async (file, content) => {
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, content)
  const buffer = Buffer.from(content)
  await fs.writeFile(`${file}.gz`, zlib.gzipSync(buffer, { level: 9 }))
  await fs.writeFile(`${file}.br`, zlib.brotliCompressSync(buffer, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }))
}

const outputFile = (routePath) => (routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`)

const renderPage = async (chrome, url) => {
  const { stdout } = await run(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--disable-extensions',
    '--hide-scrollbars',
    '--window-size=1280,900',
    '--virtual-time-budget=15000',
    '--run-all-compositor-stages-before-draw',
    '--dump-dom',
    url,
  ], { maxBuffer: 20 * 1024 * 1024, timeout: 60000 })
  if (!stdout.includes('id="root"') || !/<h1[\s>]/.test(stdout)) {
    throw new Error(`rendu incomplet pour ${url}`)
  }
  return `<!doctype html>\n${stdout.trim()}\n`
}

const buildSitemap = () => {
  const today = new Date().toISOString().slice(0, 10)
  const urls = Object.entries(ROUTES).flatMap(([, paths]) => LANGS.map((lang) => {
    const alternates = [
      ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE_URL}${paths[l]}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${paths[DEFAULT_LANG]}"/>`,
    ].join('\n')
    return `  <url>\n    <loc>${SITE_URL}${paths[lang]}</loc>\n${alternates}\n    <lastmod>${today}</lastmod>\n  </url>`
  }))
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
}

const main = async () => {
  const shell = await fs.readFile(path.join(DIST, 'index.html'), 'utf8')
  await writeWithCompressed(path.join(DIST, 'sitemap.xml'), buildSitemap())

  const pages = [
    ...Object.values(ROUTES).flatMap((paths) => LANGS.map((lang) => paths[lang])),
    '/__404__',
  ]
  const chrome = CHROME_CANDIDATES.find((candidate) => existsSync(candidate))

  if (!chrome) {
    console.warn('⚠️  Chrome introuvable : pages copiées sans pré-rendu (définissez CHROME_PATH pour l’activer).')
    for (const page of pages) {
      await writeWithCompressed(path.join(DIST, page === '/__404__' ? '404.html' : outputFile(page)), shell)
    }
    return
  }

  const server = await startServer(shell)
  let done = 0
  const failures = []
  const queue = [...pages]
  const worker = async () => {
    while (queue.length) {
      const page = queue.shift()
      const file = path.join(DIST, page === '/__404__' ? '404.html' : outputFile(page))
      try {
        const html = await renderPage(chrome, `http://127.0.0.1:${PORT}${page}`)
        await writeWithCompressed(file, html)
        done += 1
      } catch (error) {
        failures.push(`${page}: ${error.message.split('\n')[0]}`)
        await writeWithCompressed(file, shell)
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  server.close()

  console.log(`Pré-rendu : ${done}/${pages.length} pages.`)
  if (failures.length) {
    console.error(`❌ Pré-rendu échoué pour :\n  ${failures.join('\n  ')}`)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
