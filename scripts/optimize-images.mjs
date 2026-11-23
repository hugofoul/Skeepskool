// Génère les versions optimisées (WebP) de toutes les images de public/images
// et un manifeste utilisé par le site (srcset + galerie automatique).
//
// Lancé automatiquement avant `npm run dev` et `npm run build`.
// Ne retraite que les images nouvelles ou modifiées.
//
// - public/images/**            -> images sources (jpg, jpeg, png, webp)
// - public/images/optimized/    -> versions générées (non versionnées dans Git)
// - public/images/galerie/      -> toutes les photos de ce dossier apparaissent
//                                  dans la galerie, triées par nom de fichier
// - public/images/galerie/legendes.txt -> légendes facultatives, une par ligne :
//                                  nom-du-fichier.jpg = Texte de la légende
//                                  (sans légende, le nom du fichier sert de texte)
// - src/data/image-manifest.json -> manifeste généré (non versionné dans Git)

import fs from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const IMAGES_DIR = path.join(ROOT, 'public', 'images')
const OUTPUT_DIR = path.join(IMAGES_DIR, 'optimized')
const GALLERY_DIR = 'galerie'
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'image-manifest.json')
const WIDTHS = [400, 800, 1200, 1600, 2000]
const RASTER_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const toPosix = (value) => value.split(path.sep).join('/')

const kebabCase = (value) => value
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-zA-Z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .toLowerCase()

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (abs !== OUTPUT_DIR) files.push(...await walk(abs))
    } else if (RASTER_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(abs)
    }
  }
  return files
}

// "08-session-surf-en-bord-d-ocean.jpg" -> "Session surf en bord d ocean".
// Camera file names (IMG_1234, DSC_0880...) give an empty string.
const altFromFileName = (fileName) => {
  const base = path.basename(fileName, path.extname(fileName))
    .replace(/^\d+[-_ .]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
  if (!base || /^(img|dsc|dscn|pxl|photo|image|whatsapp image)?\s*\d[\d\s]*$/i.test(base)) return ''
  return base.charAt(0).toUpperCase() + base.slice(1)
}

const readCaptions = async () => {
  const file = path.join(IMAGES_DIR, GALLERY_DIR, 'legendes.txt')
  if (!existsSync(file)) return {}
  const captions = {}
  for (const line of (await fs.readFile(file, 'utf8')).split(/\r?\n/)) {
    const index = line.indexOf('=')
    if (line.trim().startsWith('#') || index === -1) continue
    const name = line.slice(0, index).trim()
    const caption = line.slice(index + 1).trim()
    if (name && caption) captions[name.normalize('NFC').toLowerCase()] = caption
  }
  return captions
}

const isUpToDate = (output, sourceMtime) => existsSync(output) && statSync(output).mtimeMs >= sourceMtime

const main = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  const captions = await readCaptions()
  const sources = (await walk(IMAGES_DIR)).sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }))

  const images = {}
  const gallery = []
  const usedKeys = new Map()
  const producedFiles = new Set()
  let generated = 0

  for (const sourcePath of sources) {
    const rel = toPosix(path.relative(IMAGES_DIR, sourcePath))
    const publicPath = `/images/${rel}`
    let key = kebabCase(rel.slice(0, -path.extname(rel).length))
    if (usedKeys.has(key)) key = `${key}-${kebabCase(path.extname(rel))}`
    usedKeys.set(key, publicPath)

    let metadata
    try {
      metadata = await sharp(sourcePath).metadata()
    } catch (error) {
      console.warn(`⚠️  Image illisible ignorée : ${rel} (${error.message})`)
      continue
    }
    const rotated = (metadata.orientation || 1) >= 5
    const width = rotated ? metadata.height : metadata.width
    const height = rotated ? metadata.width : metadata.height
    if (!width || !height) continue

    const widths = WIDTHS.filter((w) => w <= width)
    if (!widths.length) widths.push(width)

    const sourceMtime = statSync(sourcePath).mtimeMs
    for (const w of widths) {
      const output = path.join(OUTPUT_DIR, `${key}-${w}.webp`)
      producedFiles.add(output)
      if (isUpToDate(output, sourceMtime)) continue
      await sharp(sourcePath)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 78, effort: 4 })
        .toFile(output)
      generated += 1
    }

    images[publicPath] = { key, width, height, widths }

    if (rel.startsWith(`${GALLERY_DIR}/`)) {
      const caption = captions[path.basename(rel).normalize('NFC').toLowerCase()]
      gallery.push({ src: publicPath, alt: caption || altFromFileName(rel), width, height })
    }
  }

  // Remove generated files whose source no longer exists.
  let removed = 0
  for (const file of await fs.readdir(OUTPUT_DIR)) {
    const abs = path.join(OUTPUT_DIR, file)
    if (!producedFiles.has(abs)) {
      await fs.rm(abs, { force: true })
      removed += 1
    }
  }

  const manifest = `${JSON.stringify({ images, gallery }, null, 2)}\n`
  const previous = existsSync(MANIFEST_PATH) ? await fs.readFile(MANIFEST_PATH, 'utf8') : ''
  if (previous !== manifest) await fs.writeFile(MANIFEST_PATH, manifest)

  console.log(`Images : ${Object.keys(images).length} sources, ${gallery.length} dans la galerie, ${generated} versions générées, ${removed} supprimées.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
