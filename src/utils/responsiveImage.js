// Most content images are single-column on mobile/tablet and two-column on desktop.
export const DEFAULT_SIZES = '(max-width: 1024px) 100vw, 50vw'
// Team portraits and dense grids render smaller cards on large screens.
export const GRID_CARD_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
// Masonry album thumbnails are narrower as the number of columns increases.
export const ALBUM_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
export const HERO_SIZES = '100vw'

const isLocalImagePath = (src) => typeof src === 'string' && src.startsWith('/images/')

const getBaseName = (src) => {
	const file = src.split('/').pop() ?? ''
	const dotIndex = file.lastIndexOf('.')
	return dotIndex > 0 ? file.slice(0, dotIndex) : file
}

export const buildSrcSet = (src) => {
	if (!isLocalImagePath(src)) return `${src} 400w, ${src} 800w, ${src} 1200w, ${src} 1600w`

	const baseName = getBaseName(src)
	if (!baseName) return `${src} 400w, ${src} 800w, ${src} 1200w, ${src} 1600w`

	return [400, 800, 1200, 1600]
		.filter((width) => width === 400 || width === 800 || width === 1200 || width === 1600)
		.map((width) => `/images/optimized/${baseName}-${width}.webp ${width}w`)
		.join(', ')
}

export const buildAvifSrcSet = (src) => {
	if (!isLocalImagePath(src)) return ''
	const baseName = getBaseName(src)
	if (!baseName) return ''
	return [400, 800, 1200, 1600]
		.map((width) => `/images/optimized/${baseName}-${width}.avif ${width}w`)
		.join(', ')
}
