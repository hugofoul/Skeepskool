// Adresses de toutes les pages, dans chaque langue.
// Le français est à la racine du site, l'anglais sous /en, l'allemand sous /de.
// Utilisé par le routeur, les liens, le sélecteur de langue, le SEO (hreflang),
// le sitemap et le pré-rendu.

export const LANGS = ['fr', 'en', 'de']
export const DEFAULT_LANG = 'fr'

export const HREFLANG = { fr: 'fr-FR', en: 'en', de: 'de' }

export const ROUTES = {
  home: { fr: '/', en: '/en', de: '/de' },
  school: { fr: '/ecole', en: '/en/school', de: '/de/schule' },
  lessons: { fr: '/cours', en: '/en/lessons', de: '/de/kurse' },
  session: { fr: '/seance-type', en: '/en/session-details', de: '/de/ablauf-einer-session' },
  schedule: { fr: '/horaires', en: '/en/schedule', de: '/de/zeitplan' },
  rental: { fr: '/location', en: '/en/rental', de: '/de/verleih' },
  gift: { fr: '/bon-cadeau', en: '/en/gift-voucher', de: '/de/gutschein' },
  photos: { fr: '/galerie', en: '/en/gallery', de: '/de/galerie' },
  contact: { fr: '/contact', en: '/en/contact', de: '/de/kontakt' },
  booking: { fr: '/reserver', en: '/en/book', de: '/de/buchen' },
  legal: { fr: '/mentions-legales', en: '/en/legal-notice', de: '/de/impressum' },
  privacy: { fr: '/confidentialite', en: '/en/privacy', de: '/de/datenschutz' },
}

const normalize = (pathname) => {
  const clean = (pathname || '/').split(/[?#]/)[0].replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

export const langFromPath = (pathname) => {
  const first = normalize(pathname).split('/')[1]
  return first === 'en' || first === 'de' ? first : DEFAULT_LANG
}

/** { key, lang } of the page at this pathname, or null. */
export const routeFromPath = (pathname) => {
  const target = normalize(pathname)
  for (const [key, paths] of Object.entries(ROUTES)) {
    for (const lang of LANGS) {
      if (paths[lang] === target) return { key, lang }
    }
  }
  return null
}

/** Path of a page in a language, with an optional #anchor. */
export const pathFor = (key, lang = DEFAULT_LANG, hash = '') => {
  const paths = ROUTES[key]
  if (!paths) throw new Error(`Unknown route "${key}"`)
  const base = paths[lang] || paths[DEFAULT_LANG]
  return hash ? `${base}#${hash.replace(/^#/, '')}` : base
}
