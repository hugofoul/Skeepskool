import { Waves, ShieldQuestion, Info } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'

const guideIcons = [Waves, ShieldQuestion, Info]

export default function Rental() {
  const { t, lang } = useLang()
  const r = t.rental

  return (
    <div>
      <SEO
        title={lang === 'fr' ? 'Location de matériel' : 'Equipment Rental'}
        path="/location"
        description={lang === 'fr'
          ? "Location de planches de surf, bodyboards et combinaisons à la sortie de la plage du Porge Océan. À partir de 10€. Créneau sunset disponible."
          : "Surfboard, bodyboard and wetsuit rental right by the beach at Le Porge Océan. From €10. Sunset slot available."}
      />
      <PageHero title={r.heroTitle} subtitle={r.heroSubtitle} image={images.rentalHero} />

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

          {/* Notes */}
          <div className="mt-8 space-y-3">
            <p className="flex items-start gap-2 text-sm font-semibold text-royalBlue">
              <Waves className="mt-0.5 h-4 w-4 shrink-0 text-royalBlue" />
              {r.plusNote}
            </p>
            <p className="italic text-dark/60">{r.riskNote}</p>
            <p className="flex items-start gap-2 text-sm font-semibold text-red">
              <ShieldQuestion className="mt-0.5 h-4 w-4 shrink-0 text-red" />
              {r.idRequiredNote}
            </p>
            <p className="flex items-start gap-2 text-sm text-dark/70">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-royalBlue" />
              {r.sunsetNote}
            </p>
          </div>
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
            <CTAButton to="/contact" className="text-lg">
              {r.cta}
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
