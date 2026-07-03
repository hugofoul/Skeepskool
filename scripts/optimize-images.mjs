import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const INPUT_DIR = path.join(ROOT, 'public', 'images')
const OUTPUT_DIR = path.join(INPUT_DIR, 'optimized')
const WIDTHS = [640, 1024, 1600]
const RASTER_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

const formatMB = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const abs = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (entry.name === 'optimized') continue
      files.push(...(await walk(abs)))
      continue
    }

    files.push(abs)
  }

  return files
}

const toPublicPath = (abs) => `/${path.relative(path.join(ROOT, 'public'), abs).split(path.sep).join('/')}`

const optimizeOne = async (inputPath) => {
  const ext = path.extname(inputPath).toLowerCase()
  if (!RASTER_EXTENSIONS.has(ext)) return null

  const baseName = path.basename(inputPath, path.extname(inputPath))
  const image = sharp(inputPath)
  const metadata = await image.metadata()

  if (!metadata.width) return null

  let totalOut = 0

  for (const width of WIDTHS) {
    const outputPath = path.join(OUTPUT_DIR, `${baseName}-${width}.webp`)

    await image
      .clone()
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(outputPath)

    const stat = await fs.stat(outputPath)
    totalOut += stat.size
  }

  const inputStat = await fs.stat(inputPath)

  return {
    inputPath,
    inputBytes: inputStat.size,
    outputBytes: totalOut,
  }
}

const main = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true })

  const allFiles = await walk(INPUT_DIR)
  const rasterFiles = allFiles.filter((file) => RASTER_EXTENSIONS.has(path.extname(file).toLowerCase()))

  const results = []

  for (const file of rasterFiles) {
    const res = await optimizeOne(file)
    if (res) results.push(res)
  }

  const inputTotal = results.reduce((sum, item) => sum + item.inputBytes, 0)
  const outputTotal = results.reduce((sum, item) => sum + item.outputBytes, 0)

  console.log(`Optimized ${results.length} images into ${toPublicPath(OUTPUT_DIR)}.`)
  console.log(`Input total:  ${formatMB(inputTotal)}`)
  console.log(`Output total: ${formatMB(outputTotal)} (3 responsive .webp variants per image)`)

  const biggestWins = [...results]
    .map((item) => ({
      ...item,
      savedBytes: item.inputBytes - item.outputBytes,
    }))
    .sort((a, b) => b.savedBytes - a.savedBytes)
    .slice(0, 8)

  console.log('\nTop savings:')
  for (const item of biggestWins) {
    const rel = toPublicPath(item.inputPath)
    const delta = item.inputBytes - item.outputBytes
    console.log(`- ${rel}: ${formatMB(item.inputBytes)} -> ${formatMB(item.outputBytes)} (saved ${formatMB(delta)})`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
