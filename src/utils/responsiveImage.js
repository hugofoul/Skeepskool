export const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px'
export const HERO_SIZES = '100vw'

export const buildSrcSet = (src) => `${src} 640w, ${src} 1024w, ${src} 1600w`
