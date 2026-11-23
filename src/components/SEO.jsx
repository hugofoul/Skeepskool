import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SITE_URL, SEO_IMAGES } from '../config/site.js'
import { useLanguageContext } from '../context/LanguageContext.jsx'
import { DEFAULT_LANG, HREFLANG, LANGS, pathFor } from '../config/routes.js'

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

/**
 * Per-page SEO: title, description, canonical, hreflang alternates, Open Graph.
 * Usage: <SEO routeKey="lessons" title="..." description="..." />
 * The addresses in every language come from src/config/routes.js.
 */
export default function SEO({
  title,
  description,
  routeKey,
  image = DEFAULT_IMAGE,
  robots = 'index, follow',
  structuredData = [],
}) {
  const { lang: activeLang, t } = useLanguageContext()
  const { pathname } = useLocation()
  const canonicalPath = routeKey ? pathFor(routeKey, activeLang) : pathname
  const canonical = `${SITE_URL}${canonicalPath}`
  const alternates = routeKey
    ? [
      ...LANGS.map((lang) => ({ hrefLang: HREFLANG[lang], path: pathFor(routeKey, lang) })),
      { hrefLang: 'x-default', path: pathFor(routeKey, DEFAULT_LANG) },
    ]
    : []
  const ogLocale = OG_LOCALE_BY_LANG[activeLang] || OG_LOCALE_BY_LANG.fr
  const ogLocaleAlternates = routeKey
    ? LANGS.filter((lang) => lang !== activeLang).map((lang) => OG_LOCALE_BY_LANG[lang])
    : []
  const homeUrl = `${SITE_URL}${pathFor('home', activeLang)}`
  const normalizedStructuredData = Array.isArray(structuredData)
    ? structuredData.filter(Boolean)
    : (structuredData ? [structuredData] : [])
  const homeLabel = t.nav.home
  const pageLabel = title || homeLabel
  const autoBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: routeKey === 'home'
      ? [
        {
          '@type': 'ListItem',
          position: 1,
          name: homeLabel,
          item: homeUrl,
        },
      ]
      : [
        {
          '@type': 'ListItem',
          position: 1,
          name: homeLabel,
          item: homeUrl,
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
      {routeKey ? <link rel="canonical" href={canonical} /> : null}
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
