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
	if (!isLocalImagePath(src)) return `${src} 640w, ${src} 1024w, ${src} 1600w`

	const baseName = getBaseName(src)
	if (!baseName) return `${src} 640w, ${src} 1024w, ${src} 1600w`

	return [640, 1024, 1600]
		.map((width) => `/images/optimized/${baseName}-${width}.webp ${width}w`)
		.join(', ')
}
