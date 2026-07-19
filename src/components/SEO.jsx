import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SITE_URL, SEO_IMAGES } from '../config/site.js'
import { useLanguageContext } from '../context/LanguageContext.jsx'

const DEFAULT_IMAGE = SEO_IMAGES.defaultOg
const OG_LOCALE_BY_LANG = {
  fr: 'fr_FR',
  en: 'en_GB',
  de: 'de_DE',
}

const SITE_TITLE_SUFFIX = {
  fr: 'Skeepskool — École de surf Le Porge',
  en: 'Skeepskool — Surf School Le Porge',
  de: 'Skeepskool — Surfschule Le Porge',
}

const DEFAULT_TITLE_BY_LANG = {
  fr: 'Skeepskool — École de surf à Le Porge Océan | 50 min de Bordeaux',
  en: 'Skeepskool — Surf School at Le Porge Océan | 50 min from Bordeaux',
  de: 'Skeepskool — Surfschule in Le Porge Océan | 50 Min. von Bordeaux',
}

function hrefLangToOgLocale(hrefLang) {
  if (!hrefLang || hrefLang.toLowerCase() === 'x-default') return null

  const normalized = hrefLang.toLowerCase()
  if (normalized.startsWith('fr')) return 'fr_FR'
  if (normalized.startsWith('de')) return 'de_DE'
  if (normalized.startsWith('en-us')) return 'en_US'
  if (normalized.startsWith('en')) return 'en_GB'
  return null
}

/**
 * Per-page SEO: title, description, canonical, Open Graph.
 * Usage: <SEO title="..." description="..." path="/ecole" />
 */
export default function SEO({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  alternates = [],
  robots = 'index, follow',
  lang,
  structuredData = [],
}) {
  const { lang: contextLang } = useLanguageContext()
  const { pathname } = useLocation()
  const canonicalPath = path || pathname || '/'
  const canonical = `${SITE_URL}${canonicalPath}`
  const activeLang = lang || contextLang || (typeof document !== 'undefined' ? document.documentElement.lang : 'fr') || 'fr'
  const ogLocale = OG_LOCALE_BY_LANG[activeLang] || OG_LOCALE_BY_LANG.fr
  const ogLocaleAlternates = Array.from(
    new Set(
      alternates
        .map((alternate) => hrefLangToOgLocale(alternate.hrefLang))
        .filter((locale) => locale && locale !== ogLocale),
    ),
  )
  const normalizedStructuredData = Array.isArray(structuredData)
    ? structuredData.filter(Boolean)
    : (structuredData ? [structuredData] : [])
  const homeLabel = activeLang === 'fr' ? 'Accueil' : (activeLang === 'de' ? 'Startseite' : 'Home')
  const pageLabel = title || homeLabel
  const autoBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: canonicalPath === '/'
      ? [
        {
          '@type': 'ListItem',
          position: 1,
          name: homeLabel,
          item: `${SITE_URL}/`,
        },
      ]
      : [
        {
          '@type': 'ListItem',
          position: 1,
          name: homeLabel,
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: pageLabel,
          item: canonical,
        },
      ],
  }
  const allStructuredData = [autoBreadcrumb, ...normalizedStructuredData]
  const titleSuffix = SITE_TITLE_SUFFIX[activeLang] || SITE_TITLE_SUFFIX.fr
  const defaultTitle = DEFAULT_TITLE_BY_LANG[activeLang] || DEFAULT_TITLE_BY_LANG.fr
  const fullTitle = title ? `${title} · ${titleSuffix}` : defaultTitle

  return (
    <Helmet htmlAttributes={{ lang: activeLang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      {alternates.map((alternate) => (
        <link
          key={alternate.hrefLang}
          rel="alternate"
          hrefLang={alternate.hrefLang}
          href={`${SITE_URL}${alternate.path}`}
        />
      ))}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={ogLocale} />
      {ogLocaleAlternates.map((locale) => (
        <meta key={locale} property="og:locale:alternate" content={locale} />
      ))}
      <meta property="og:site_name" content="Skeepskool" />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {allStructuredData.map((item, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  )
}
