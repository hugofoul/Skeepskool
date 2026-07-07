import { Waves, ShieldQuestion, Info } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'
import { SITE_URL } from '../config/site.js'

const guideIcons = [Waves, ShieldQuestion, Info]

export default function Rental() {
  const { t, lang } = useLang()
  const r = t.rental

  const parseEuroPrice = (value) => {
    const parsed = Number.parseFloat(String(value || '').replace(',', '.').replace(/[^0-9.]/g, ''))
    return Number.isFinite(parsed) ? parsed : null
  }

  const rentalOffers = r.rows
    .map((row) => {
      const prices = (row.prices || []).map(parseEuroPrice).filter((price) => price !== null)
      if (!prices.length) return null

      const minPrice = Math.min(...prices)
      return {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price: minPrice,
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}${lang === 'fr' ? '/location' : '/rental'}`,
        itemOffered: {
          '@type': 'Service',
          name: row.item,
          description: lang === 'fr'
            ? `Location à partir de ${minPrice}€.`
            : (lang === 'de' ? `Verleih ab ${minPrice}€.` : `Rental from €${minPrice}.`),
        },
      }
    })
    .filter(Boolean)

  const rentalFaqEntries = (r.guide || [])
    .filter((entry) => entry?.title && entry?.text)
    .map((entry) => ({
      '@type': 'Question',
      name: entry.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.text,
      },
    }))

  const rentalPath = lang === 'fr' ? '/location' : '/rental'
  const rentalName = lang === 'fr' ? 'Location de matériel' : (lang === 'de' ? 'Materialverleih' : 'Equipment Rental')
  const rentalStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: lang === 'fr' ? 'Accueil' : (lang === 'de' ? 'Startseite' : 'Home'),
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: rentalName,
          item: `${SITE_URL}${rentalPath}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: rentalFaqEntries,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: rentalName,
      serviceType: rentalName,
      provider: {
        '@type': 'SportsActivityLocation',
        name: 'Skeepskool',
      },
      areaServed: 'Le Porge Océan',
      offers: rentalOffers,
    },
  ]

  return (
    <div>
      <SEO
        title={lang === 'fr' ? 'Location de matériel' : (lang === 'de' ? 'Materialverleih' : 'Equipment Rental')}
        path={lang === 'fr' ? '/location' : '/rental'}
        lang={lang}
        alternates={[
          { hrefLang: 'fr-FR', path: '/location' },
          { hrefLang: 'en', path: '/rental' },
          { hrefLang: 'x-default', path: '/location' },
        ]}
        description={lang === 'fr'
          ? "Location de planches de surf, bodyboards et combinaisons à la sortie de la plage du Porge Océan. À partir de 10€. Créneau sunset disponible."
          : (lang === 'de'
            ? 'Verleih von Surfboards, Bodyboards und Neoprenanzügen direkt am Strand von Le Porge Océan. Ab 10€. Sunset-Slot verfügbar.'
            : "Surfboard, bodyboard and wetsuit rental right by the beach at Le Porge Océan. From €10. Sunset slot available.")}
        structuredData={rentalStructuredData}
      />
      <PageHero title={r.heroTitle} subtitle={r.heroSubtitle} image={images.fondpages} />

      <section className="bg-white py-6 sm:py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-2xl border-l-4 border-red bg-lightGray p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
            <p className="flex items-start gap-2 text-sm font-semibold text-red sm:text-base">
              <ShieldQuestion className="mt-0.5 h-4 w-4 shrink-0 text-red" />
              {r.safetyRecommendation}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Pricing table (desktop) ---- */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Desktop / tablet table */}
          <Reveal className="hidden overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10 md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-royalBlue text-white">
                  {r.tableHead.map((head, i) => (
                    <th
                      key={head}
                      className={`px-5 py-4 text-sm font-bold ${i === 0 ? '' : 'text-center'}`}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row, ri) => (
                  <tr
                    key={row.item}
                    className={ri % 2 === 0 ? 'bg-white' : 'bg-lightGray'}
                  >
                    <td className="px-5 py-4 font-bold text-royalBlue">{row.item}</td>
                    {row.prices.map((price, pi) => (
                      <td
                        key={pi}
                        className="px-5 py-4 text-center font-bold text-red transition-colors hover:bg-yellow/20"
                      >
                        {price}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          {/* Mobile cards */}
          <div className="space-y-5 md:hidden">
            {r.rows.map((row, ri) => (
              <Reveal
                key={row.item}
                delay={ri * 100}
                className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/10"
              >
                <div className="bg-royalBlue px-5 py-3">
                  <h3 className="font-extrabold text-white">{row.item}</h3>
                </div>
                <dl className="divide-y divide-black/5">
                  {row.prices.map((price, pi) => (
                    <div
                      key={pi}
                      className={`flex items-center justify-between px-5 py-3 ${
                        pi % 2 === 0 ? 'bg-white' : 'bg-lightGray'
                      }`}
                    >
                      <dt className="text-sm font-medium text-dark/75">
                        {r.tableHead[pi + 1]}
                      </dt>
                      <dd className="font-bold text-red">{price}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>

          {/* Rental conditions */}
          <Reveal className="mt-8 rounded-2xl border-2 border-royalBlue/20 bg-royalBlue/5 p-5 shadow-sm sm:p-6">
            <h3 className="text-lg font-black text-royalBlue sm:text-xl">{r.conditionsTitle}</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-black/5">
                <Waves className="mt-0.5 h-5 w-5 shrink-0 text-royalBlue" />
                <p className="text-sm font-semibold text-dark sm:text-base">{r.plusNote}</p>
              </li>
              <li className="flex items-start gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-black/5">
                <ShieldQuestion className="mt-0.5 h-5 w-5 shrink-0 text-red" />
                <p className="text-sm font-semibold text-dark sm:text-base">{r.idRequiredNote}</p>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- Equipment guide ---- */}
      <section className="bg-lightGray py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-black text-red sm:text-4xl">
              {r.guideTitle}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {r.guide.map((g, i) => {
              const Icon = guideIcons[i]
              return (
                <Reveal
                  key={g.title}
                  delay={i * 120}
                  className="rounded-2xl border-b-4 border-red bg-white p-7 shadow-md"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-royalBlue/10">
                    <Icon className="h-7 w-7 text-royalBlue" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-royalBlue">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark/75">{g.text}</p>
                </Reveal>
              )
            })}
          </div>

          <div className="mt-14 text-center">
            {r.callNote ? (
              <div className="mx-auto mb-6 max-w-2xl rounded-2xl border-2 border-red/40 bg-gradient-to-r from-red/10 via-yellow/20 to-red/10 px-5 py-4 shadow-md ring-1 ring-red/20 sm:px-6 sm:py-5">
                <p className="text-base font-black leading-relaxed text-red sm:text-xl">
                  {r.callNote}
                </p>
              </div>
            ) : null}
            <CTAButton to="/contact" className="text-lg">
              {r.cta}
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
