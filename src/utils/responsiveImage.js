export const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px'
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
