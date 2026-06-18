import { Tent, Utensils, Bus, MapPin, Phone, CalendarCheck, ExternalLink, Instagram, Compass } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'

export default function Around() {
  const { t } = useLang()
  const a = t.around

  return (
    <div>
      <PageHero title={a.heroTitle} subtitle={a.heroSubtitle} image={images.aroundHero} />

      {/* ---- Tourist office ---- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <Compass className="h-8 w-8 text-royalBlue" />
              <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{a.tourismTitle}</h2>
            </div>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10">
              <img
                src={images.aroundTourism}
                alt={a.tourismTitle}
                className="h-72 w-full object-cover sm:h-96"
                loading="lazy"
              />
            </Reveal>
            <Reveal delay={120}>
              <p className="text-lg leading-relaxed text-dark/80">{a.tourism.text}</p>
              <div className="mt-7">
                <CTAButton href={a.tourism.url} target="_blank" rel="noopener noreferrer">
                  {a.tourism.cta}
                  <ExternalLink className="h-4 w-4" />
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Camping ---- */}
      <section className="bg-lightGray py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <Tent className="h-8 w-8 text-royalBlue" />
              <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{a.campingTitle}</h2>
            </div>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10">
              <img
                src={images.aroundCamping}
                alt={a.camping.name}
                className="h-72 w-full object-cover sm:h-96"
                loading="lazy"
              />
            </Reveal>
            <Reveal delay={120}>
              <h3 className="text-2xl font-extrabold text-royalBlue">{a.camping.name}</h3>
              <p className="mt-4 text-lg leading-relaxed text-dark/80">{a.camping.text}</p>
              <ul className="mt-6 space-y-3 text-sm text-dark/80">
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-royalBlue" />
                  {a.camping.address}
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-royalBlue" />
                  <a href="tel:+33556265488" className="font-semibold hover:text-red">
                    {a.camping.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <CalendarCheck className="h-5 w-5 shrink-0 text-royalBlue" />
                  {a.camping.season}
                </li>
              </ul>
              <div className="mt-7">
                <CTAButton href={a.camping.url} target="_blank" rel="noopener noreferrer">
                  {a.camping.cta}
                  <ExternalLink className="h-4 w-4" />
                </CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- Restaurants ---- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <Utensils className="h-8 w-8 text-red" />
              <h2 className="text-3xl font-black text-red sm:text-4xl">{a.restaurantsTitle}</h2>
            </div>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
            <p className="mt-5 max-w-2xl text-lg text-dark/75">{a.restaurantsIntro}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {a.restaurants.map((resto, i) => (
              <Reveal
                key={resto.name}
                delay={i * 120}
                className="flex flex-col rounded-2xl border-b-4 border-red bg-white p-7 shadow-md"
              >
                <h3 className="text-xl font-extrabold text-royalBlue">{resto.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-dark/75">{resto.text}</p>
                <a
                  href={resto.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 self-start rounded-full border-2 border-royalBlue px-5 py-2 text-sm font-bold text-royalBlue transition-colors hover:border-yellow hover:bg-yellow"
                >
                  <Instagram className="h-4 w-4" />
                  {resto.cta}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Bus ---- */}
      <section className="bg-royalBlue py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <Bus className="h-8 w-8 text-yellow" />
                <h2 className="text-3xl font-black sm:text-4xl">{a.busTitle}</h2>
              </div>
              <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
              <p className="mt-5 text-lg leading-relaxed text-white/90">{a.busText}</p>
              <div className="mt-7">
                <CTAButton
                  href={a.busUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red hover:bg-yellow"
                >
                  {a.busCta}
                  <ExternalLink className="h-4 w-4" />
                </CTAButton>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-8 text-center ring-1 ring-white/15">
              <p className="text-xs font-bold uppercase tracking-widest text-yellow">
                {a.busPriceLabel}
              </p>
              <p className="mt-2 text-4xl font-black text-yellow">{a.busPrice}</p>
              <p className="mt-3 text-xs text-white/70">{a.busPriceNote}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
