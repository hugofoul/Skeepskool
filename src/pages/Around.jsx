import { Tent, Utensils, MapPin, Phone, CalendarCheck, ExternalLink, Instagram, Compass } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'
import { buildSrcSet, DEFAULT_SIZES } from '../utils/responsiveImage.js'

export default function Around() {
  const { t, lang } = useLang()
  const a = t.around

  return (
    <div>
      <SEO
        title={lang === 'fr' ? 'Autour de nous' : (lang === 'de' ? 'Rund um uns' : 'Around Us')}
        path={lang === 'fr' ? '/autour' : '/around'}
        alternates={[
          { hrefLang: 'fr-FR', path: '/autour' },
          { hrefLang: 'en', path: '/around' },
          { hrefLang: 'x-default', path: '/autour' },
        ]}
        description={lang === 'fr'
          ? "Hébergements, activités et bonnes adresses autour de la plage du Porge Océan, Gironde. Tout pour profiter de votre séjour surf."
          : (lang === 'de'
            ? 'Unterkünfte, Aktivitäten und gute Adressen rund um Le Porge Océan, Gironde. Alles für deinen Surfaufenthalt.'
            : "Accommodation, activities and local tips around Le Porge Océan, Gironde. Everything to make the most of your surf stay.")}
      />
      <PageHero title={a.heroTitle} image={images.aroundHero} />

      {/* ---- Camping ---- */}
      <section id="camping-la-grigne" className="bg-lightGray py-16 sm:py-20">
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
                srcSet={buildSrcSet(images.aroundCamping)}
                sizes={DEFAULT_SIZES}
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
                className="flex flex-col overflow-hidden rounded-2xl border-b-4 border-red bg-white shadow-md"
              >
                <iframe
                  src={resto.embedUrl}
                  title={`${resto.name} Instagram`}
                  className="h-80 w-full border-0 bg-lightGray sm:h-96"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex flex-1 flex-col p-7">
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
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
                srcSet={buildSrcSet(images.aroundTourism)}
                sizes={DEFAULT_SIZES}
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

    </div>
  )
}
