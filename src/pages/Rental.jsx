import { Waves, ShieldQuestion, Info, Phone, AlertTriangle } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'
import { SITE_URL } from '../config/site.js'
import { buildSrcSet } from '../utils/responsiveImage.js'

const guideIcons = [Waves, ShieldQuestion, Info]

export default function Rental() {
  const { t, path } = useLang()
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
        url: `${SITE_URL}${path('rental')}`,
        itemOffered: {
          '@type': 'Service',
          name: row.item,
          description: t.ui.rental.rentalFrom.replace('{price}', minPrice),
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

  const rentalPath = path('rental')
  const rentalName = t.ui.rental.equipmentRental
  const rentalStructuredData = [
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
        title={t.ui.rental.equipmentRental}
        routeKey="rental"
        description={t.ui.rental.surfboardBodyboardAndWetsuit}
        structuredData={rentalStructuredData}
      />
      <PageHero title={r.heroTitle} subtitle={r.heroSubtitle} image={images.fondpages} titleClassName="font-bold -translate-y-2" compact />

      <section id="infos-location" className="scroll-mt-36 bg-lightGray pb-2 pt-6 sm:pt-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-2xl border-l-4 border-red bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
            <p className="flex items-start gap-2 text-sm font-semibold text-red sm:text-base">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red" />
              <span>
                {r.safetyRecommendationTitle ? <span className="mb-1 block font-black uppercase tracking-[0.03em]">{r.safetyRecommendationTitle}</span> : null}
                {r.safetyRecommendation}
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Equipment guide ---- */}
      <section id="guide-location" className="scroll-mt-36 bg-lightGray pb-16 pt-6 sm:pb-20 sm:pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-black text-red sm:text-4xl">
              {r.guideTitle}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm font-semibold text-dark/80 sm:text-base">
              {r.guideAdvice || (t.ui.rental.guideAdvice)}
            </p>
          </Reveal>
          <Reveal className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl shadow-md ring-1 ring-black/10">
            <img
              src={images.rentalBoards}
              srcSet={buildSrcSet(images.rentalBoards)}
              sizes="(max-width: 1024px) 100vw, 1024px"
              alt={t.ui.rental.rentalSurfboards}
              className="h-64 w-full object-cover sm:h-80"
              loading="lazy"
            />
          </Reveal>
          <div className={`mt-12 grid gap-6 max-md:mt-6 max-md:gap-3 ${r.guide.length === 2 ? 'md:mx-auto md:max-w-4xl md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {r.guide.map((g, i) => {
              const Icon = guideIcons[i]
              return (
                <Reveal
                  key={g.title}
                  delay={i * 120}
                  className="rounded-2xl border-b-4 border-red bg-white p-7 shadow-md max-md:grid max-md:grid-cols-[3rem_1fr] max-md:items-start max-md:gap-x-4 max-md:p-4"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-royalBlue/10 max-md:row-span-2 max-md:h-12 max-md:w-12">
                    <Icon className="h-7 w-7 text-royalBlue" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-royalBlue max-md:mt-0 max-md:text-lg">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark/75 max-md:mt-1">{g.text}</p>
                </Reveal>
              )
            })}
          </div>

          <div className="mt-14 text-center">
            {r.callNote ? (
              <div className="mx-auto mb-6 max-w-3xl rounded-3xl border border-royalBlue/20 bg-white px-5 py-5 shadow-lg ring-1 ring-black/5 sm:px-7 sm:py-6">
                <p className="inline-flex items-start gap-2 text-base font-extrabold leading-relaxed text-royalBlue sm:text-xl">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-red" />
                  {r.callNote}
                </p>
              </div>
            ) : null}
            <CTAButton to={path('contact')} className="text-lg">
              {r.cta || (t.ui.rental.contactUs)}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ---- Pricing table (desktop) ---- */}
      <section id="tarifs-location" className="scroll-mt-36 bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8">
            <h2 className="text-center text-3xl font-black text-royalBlue sm:text-4xl">
              {t.ui.rental.pricing}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>
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

          {/* Mobile: one comparison table (equipment in columns, durations in rows) */}
          <Reveal className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/10 md:hidden">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="bg-royalBlue text-white">
                  <th className="w-[28%] px-2.5 py-3 text-xs font-bold">{r.tableHead[0]}</th>
                  {r.rows.map((row) => (
                    <th key={row.item} className="hyphens-auto break-words px-1 py-3 text-center text-xs font-bold leading-tight">
                      {row.item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.tableHead.slice(1).map((head, pi) => (
                  <tr key={head} className={pi % 2 === 0 ? 'bg-white' : 'bg-lightGray'}>
                    <th scope="row" className="px-2.5 py-3 text-xs font-semibold leading-tight text-dark/80">{head}</th>
                    {r.rows.map((row) => (
                      <td key={row.item} className="px-1 py-3 text-center text-sm font-bold text-red">
                        {row.prices[pi]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

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
    </div>
  )
}
