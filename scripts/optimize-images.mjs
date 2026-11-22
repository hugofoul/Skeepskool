import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const INPUT_DIR = path.join(ROOT, 'public', 'images')
const SOURCE_DIR = path.join(ROOT, 'images-source')
const OUTPUT_DIR = path.join(INPUT_DIR, 'optimized')
const WIDTHS = [400, 800, 1200, 1600]
const RASTER_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png'])

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'optimized' && entry.name !== 'séance_type') files.push(...await walk(abs))
      else if (entry.name === 'séance_type') files.push(...await walk(abs))
    } else files.push(abs)
  }
  return files
}

const kebabCase = (value) => value
  .normalize('NFD')
  .replace(/[^a-zA-Z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .toLowerCase()

const main = async () => {
  await fs.mkdir(SOURCE_DIR, { recursive: true })
  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  const files = await walk(INPUT_DIR)
  const sources = files.filter((file) => RASTER_EXTENSIONS.has(path.extname(file).toLowerCase()))
  let totalInput = 0
  let totalOutput = 0

  for (const inputPath of sources) {
    const metadata = await sharp(inputPath).metadata()
    if (!metadata.width) continue

    const rel = path.relative(INPUT_DIR, inputPath)
    const sourceRelativeDir = path.dirname(rel)
    const sourceDir = path.join(SOURCE_DIR, sourceRelativeDir)
    await fs.mkdir(sourceDir, { recursive: true })
    await fs.copyFile(inputPath, path.join(sourceDir, path.basename(inputPath)))

    const baseName = kebabCase(path.basename(inputPath, path.extname(inputPath)))
    const inputStat = await fs.stat(inputPath)
    totalInput += inputStat.size

    for (const width of WIDTHS) {
      if (width > metadata.width) continue
      const webpPath = path.join(OUTPUT_DIR, `${baseName}-${width}.webp`)
      const avifPath = path.join(OUTPUT_DIR, `${baseName}-${width}.avif`)

      await sharp(inputPath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 6 })
        .toFile(webpPath)

      await sharp(inputPath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 52, effort: 7 })
        .toFile(avifPath)

      totalOutput += (await fs.stat(webpPath)).size
      totalOutput += (await fs.stat(avifPath)).size
    }
  }

  console.log(`Optimized ${sources.length} raster sources.`)
  console.log(`Source total: ${(totalInput / 1024 / 1024).toFixed(2)} MB`)
  console.log(`Generated WebP/AVIF total: ${(totalOutput / 1024 / 1024).toFixed(2)} MB`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
