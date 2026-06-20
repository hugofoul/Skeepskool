import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SITE_URL, SEO_IMAGES } from '../config/site.js'

const DEFAULT_IMAGE = SEO_IMAGES.defaultOg

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
}) {
  const { pathname } = useLocation()
  const canonicalPath = path || pathname || '/'
  const canonical = `${SITE_URL}${canonicalPath}`
  const fullTitle = title
    ? `${title} · Skeepskool — École de surf Le Porge`
    : 'Skeepskool — École de surf à Le Porge Océan | 50 min de Bordeaux'

  return (
    <Helmet>
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
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Skeepskool" />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
