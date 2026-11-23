import {
  MapPin,
  Bus,
  Tent,
  Utensils,
  Compass,
  Phone,
  Facebook,
  Instagram,
  CalendarCheck,
  ExternalLink,
  ParkingCircle,
  HelpCircle,
  Plus,
  Minus,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'
import { CONTACT, MAPS, SOCIAL } from '../config/site.js'
import { buildSrcSet, DEFAULT_SIZES } from '../utils/responsiveImage.js'
import { trackEvent } from '../lib/analytics.js'

const MAP_SRC =
  'https://www.google.com/maps?q=Skeepskool+Ecole+de+Surf+Plage+Centrale+du+Porge&z=14&output=embed'

export default function Contact() {
  const { t, path } = useLang()
  const [isMapPlanOpen, setIsMapPlanOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const c = t.contact
  const a = t.around
  const faqItems = t.home?.practical?.faqItems || []
  const faqTitle = t.ui.contact.frequentlyAskedQuestions
  const mapPlanAriaLabel = t.ui.contact.openTheAccessMap
  const mapPlanAlt = t.ui.contact.locationMapToFind
  const mapPlanTitle = t.ui.contact.accessMap
  const mapPlanHint = t.ui.contact.clickTheImageTo

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMapPlanOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div>
      <SEO
        title={t.ui.contact.practicalInfo}
        routeKey="contact"
        description={t.ui.contact.howToReachLe}
      />
      <PageHero title={c.heroTitle} subtitle={c.heroSubtitle} image={images.fondpages} titleClassName="font-bold -translate-y-2" compact />

      {/* ---- Info cards ---- */}
      <section id="infos-contact" className="scroll-mt-36 bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{c.infoTitle}</h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
            {c.infoLead && <p className="mt-4 max-w-2xl text-base text-dark/75 sm:text-lg">{c.infoLead}</p>}
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 max-md:mt-6 max-md:grid-cols-2 max-md:gap-3">
            <InfoCard icon={Phone} className="max-md:col-span-2">
              <a href="tel:+33670608426" onClick={() => trackEvent('click_phone', { target: 'tel:+33670608426', source: 'contact_page' })} className="block font-semibold text-dark hover:text-red max-md:py-2.5">
                +33 6 70 60 84 26
              </a>
              <a href={`tel:${CONTACT.phoneSecondary}`} onClick={() => trackEvent('click_phone', { target: `tel:${CONTACT.phoneSecondary}`, source: 'contact_page' })} className="block font-semibold text-dark hover:text-red max-md:py-2.5">
                {CONTACT.phoneSecondaryDisplay}
              </a>
            </InfoCard>
            <InfoCard icon={Instagram}>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-dark hover:text-red max-md:inline-block max-md:py-2"
              >
                <span className="max-md:hidden">{c.instagram}</span><span className="md:hidden">Instagram</span>
              </a>
            </InfoCard>
            <InfoCard icon={Facebook}>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-dark hover:text-red max-md:inline-block max-md:py-2"
              >
                <span className="max-md:hidden">{c.facebook}</span><span className="md:hidden">Facebook</span>
              </a>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* ---- Season & hours ---- */}
      <section id="saison-horaires" className="scroll-mt-36 bg-royalBlue py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-black sm:text-3xl">{c.seasonTitle}</h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
            <span className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-yellow px-5 py-2 text-base font-extrabold text-royalBlue">
              <CalendarCheck className="h-5 w-5" />
              {c.seasonHighlight}
            </span>
            {c.season && (
              <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">{c.season}</p>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---- WhatsApp community ---- */}
      {/* ---- Map ---- */}
      <section className="scroll-mt-36 bg-lightGray py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 id="comment-nous-trouver" className="scroll-mt-36 text-3xl font-black text-red sm:text-4xl">{c.findUsTitle}</h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>

          {/* ---- Bus ---- */}
          <Reveal className="mt-8 rounded-2xl bg-royalBlue p-6 text-white shadow-lg sm:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <Bus className="h-8 w-8 text-yellow" />
                  <h3 id="bus-details" className="scroll-mt-36 sm:scroll-mt-40 text-2xl font-black sm:text-3xl">{c.findUs.busLabel}</h3>
                </div>
                <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
                <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">{c.findUs.bus}</p>
                <p className="mt-3 text-sm font-semibold text-yellow sm:text-base">
                  {c.findUs.busBookingNote}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 max-md:grid max-md:grid-cols-2 max-md:gap-2">
                  <CTAButton
                    href={c.findUs.busUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow text-royalBlue hover:bg-white max-md:col-span-2"
                  >
                    {c.findUs.busCta}
                    <ExternalLink className="h-4 w-4" />
                  </CTAButton>
                  <CTAButton
                    href={c.findUs.busAppStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red hover:bg-yellow max-md:justify-center max-md:whitespace-nowrap max-md:px-3"
                  >
                    <span className="max-md:hidden">{c.findUs.busAppStoreCta}</span><span className="md:hidden">App Store</span>
                    <ExternalLink className="h-4 w-4" />
                  </CTAButton>
                  <CTAButton
                    href={c.findUs.busGooglePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/30 bg-white/10 hover:bg-white/20 max-md:justify-center max-md:whitespace-nowrap max-md:px-3"
                  >
                    <span className="max-md:hidden">{c.findUs.busGooglePlayCta}</span><span className="md:hidden">Google Play</span>
                    <ExternalLink className="h-4 w-4" />
                  </CTAButton>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 text-center ring-1 ring-white/15 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-yellow">
                  {c.findUs.busPriceLabel}
                </p>
                <p className="mt-2 text-4xl font-black text-yellow max-md:text-2xl">{c.findUs.busPrice}</p>
                {c.findUs.busPriceNote && (
                  <p className="mt-3 text-xs text-white/75">{c.findUs.busPriceNote}</p>
                )}
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {/* Info list */}
            <Reveal className="space-y-5">
              <InfoLine icon={MapPin} label={c.findUs.address} />
              <InfoLine
                icon={MapPin}
                title={c.findUs.byCarLabel}
                label={c.findUs.byCar}
              />
              <InfoLine
                icon={MapPin}
                title={c.findUs.citiesLabel}
                label={c.findUs.cities}
              />
              <InfoLine
                icon={ParkingCircle}
                title={c.findUs.parkingLabel}
                label={c.findUs.parking}
              />
              <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 max-md:hidden">
                <span className="rounded-lg bg-royalBlue/10 p-2">
                  <Bus className="h-5 w-5 text-royalBlue" />
                </span>
                <div>
                  <p className="font-bold text-royalBlue">{c.findUs.busLabel}</p>
                  <p className="text-sm text-dark/80">{c.findUs.bus}</p>
                  <a href="#bus-details" className="mt-2 inline-block text-sm font-semibold text-red hover:underline max-md:py-2.5">
                    {c.findUs.busLearnMore}
                  </a>
                </div>
              </div>
              <InfoLine icon={MapPin} title={c.findUs.gpsLabel} label={c.findUs.gps} />
            </Reveal>

            {/* Map + access plan */}
            <Reveal delay={120} className="space-y-5">
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/10">
                <button
                  type="button"
                  aria-label={mapPlanAriaLabel}
                  className="block w-full"
                  onClick={() => {
                    setIsMapPlanOpen(true)
                    trackEvent('click_map', { target: images.contactPlan, source: 'contact_plan_lightbox_open' })
                  }}
                >
                  <img
                    src={images.contactPlan}
                    srcSet={buildSrcSet(images.contactPlan)}
                    sizes={DEFAULT_SIZES}
                    alt={mapPlanAlt}
                    className="h-80 w-full object-cover object-[88%_4%] sm:h-96 max-md:h-52"
                    loading="lazy"
                  />
                </button>
                <div className="p-4">
                  <p className="text-sm font-semibold text-royalBlue">{mapPlanTitle}</p>
                  <p className="mt-1 text-sm text-dark/75">{mapPlanHint}</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10">
                <iframe
                  title={c.mapTitle}
                  src={MAP_SRC}
                  className="h-80 w-full border-0 max-md:h-56"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section id="faq" className="scroll-mt-36 bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <HelpCircle className="h-8 w-8 text-royalBlue" />
              <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{faqTitle}</h2>
            </div>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>

          <Reveal delay={120} className="mt-8 divide-y divide-black/10 overflow-hidden rounded-2xl bg-lightGray shadow-sm ring-1 ring-black/5">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index
              const panelId = `contact-faq-panel-${index}`
              const buttonId = `contact-faq-button-${index}`

              return (
                <div key={item.question} className="px-5 sm:px-6">
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-3 py-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="text-base font-bold text-dark sm:text-lg">{item.question}</span>
                    {isOpen ? (
                      <Minus className="h-5 w-5 shrink-0 text-red" aria-hidden="true" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-royalBlue" aria-hidden="true" />
                    )}
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="pb-5"
                  >
                    <p className="pr-6 text-sm leading-relaxed text-dark/75 sm:text-base">{item.answer}</p>
                    {item.ctaLabel && item.ctaRoute ? (
                      <Link
                        to={path(item.ctaRoute)}
                        className="mt-3 inline-flex rounded-full bg-red px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-yellow hover:text-royalBlue max-md:px-5 max-md:py-3 max-md:text-sm"
                      >
                        {item.ctaLabel}
                      </Link>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </Reveal>
        </div>
      </section>


      {isMapPlanOpen ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={mapPlanTitle}
          onClick={() => setIsMapPlanOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsMapPlanOpen(false)}
              className="absolute right-2 top-2 z-10 rounded-full bg-white/90 px-3 py-1.5 text-sm font-bold text-royalBlue shadow-md hover:bg-white"
            >
              {t.ui.contact.close}
            </button>
            <img
              src={images.contactPlan}
              srcSet={buildSrcSet(images.contactPlan)}
              sizes="100vw"
              alt={mapPlanAlt}
              className="max-h-[88vh] w-full rounded-xl object-contain"
              loading="eager"
            />
          </div>
        </div>
      ) : null}

      {/* ---- Around: Camping ---- */}
      <section id="camping-la-grigne" className="scroll-mt-36 bg-white py-12 sm:py-20">
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
                className="h-52 w-full object-cover sm:h-96"
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
                  <a href="tel:+33556265488" className="font-semibold hover:text-red max-md:inline-block max-md:py-2.5">
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

      {/* ---- Around: Restaurants ---- */}
      <section id="ou-manger" className="scroll-mt-36 bg-lightGray py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <Utensils className="h-8 w-8 text-red" />
              <h2 className="text-3xl font-black text-red sm:text-4xl">{a.restaurantsTitle}</h2>
            </div>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
            <p className="mt-5 max-w-2xl text-lg text-dark/75">{a.restaurantsIntro}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 max-md:mt-6 max-md:-mx-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-4 max-md:overflow-x-auto max-md:px-4 max-md:pb-3 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {a.restaurants.map((resto, i) => (
              <Reveal
                key={resto.name}
                delay={i * 120}
                className="flex flex-col overflow-hidden rounded-2xl border-b-4 border-red bg-white shadow-md max-md:w-[82%] max-md:shrink-0 max-md:snap-center"
              >
                <iframe
                  src={resto.embedUrl}
                  title={`${resto.name} Instagram`}
                  className="h-80 w-full border-0 bg-lightGray sm:h-96 max-md:h-72"
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

      {/* ---- Around: Tourist office ---- */}
      <section className="bg-white py-12 sm:py-20">
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
                className="h-52 w-full object-cover sm:h-96"
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

function InfoCard({ icon: Icon, children, className = '' }) {
  return (
    <div className={`rounded-2xl border-b-4 border-red bg-white p-6 shadow-md max-md:p-4 ${className}`}>
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-royalBlue/10">
        <Icon className="h-5 w-5 text-royalBlue" />
      </div>
      {children}
    </div>
  )
}

function InfoLine({ icon: Icon, title, label }) {
  const isAddress = Icon === MapPin && !title
  
  return (
    <div className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <span className="rounded-lg bg-royalBlue/10 p-2">
        <Icon className="h-5 w-5 text-royalBlue" />
      </span>
      <div>
        {title && <p className="font-bold text-royalBlue">{title}</p>}
        {isAddress ? (
          <a
            href={MAPS.addressSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-dark/80 transition-colors hover:text-royalBlue"
          >
            {label}
          </a>
        ) : (
          <p className="text-sm text-dark/80">{label}</p>
        )}
      </div>
    </div>
  )
}
