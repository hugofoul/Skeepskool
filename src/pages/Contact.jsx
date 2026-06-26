import {
  MapPin,
  Bus,
  Phone,
  Facebook,
  Instagram,
  CalendarCheck,
  MessageCircle,
  ExternalLink,
  ParkingCircle,
} from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'
import { CONTACT, MAPS, SOCIAL } from '../config/site.js'
import { buildSrcSet, DEFAULT_SIZES } from '../utils/responsiveImage.js'

const MAP_SRC =
  'https://www.google.com/maps?q=Skeepskool+Ecole+de+Surf+Plage+Centrale+du+Porge&z=14&output=embed'

export default function Contact() {
  const { t, lang } = useLang()
  const c = t.contact

  return (
    <div>
      <SEO
        title={lang === 'fr' ? 'Infos pratiques' : 'Practical Info'}
        path="/contact"
        alternates={[
          { hrefLang: 'fr-FR', path: '/contact' },
          { hrefLang: 'en', path: '/contact' },
          { hrefLang: 'x-default', path: '/contact' },
        ]}
        description={lang === 'fr'
          ? "Comment venir au Porge Océan, horaires d'ouverture, numéros de téléphone, accès bus depuis Bordeaux. École de surf Skeepskool."
          : "How to reach Le Porge Océan, opening hours, phone numbers, bus access from Bordeaux. Skeepskool surf school."}
      />
      <PageHero title={c.heroTitle} subtitle={c.heroSubtitle} image={images.contactHero} />

      {/* ---- Info cards ---- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{c.infoTitle}</h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
            {c.infoLead && <p className="mt-4 max-w-2xl text-base text-dark/75 sm:text-lg">{c.infoLead}</p>}
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <InfoCard icon={Phone}>
              <a href={`tel:${CONTACT.phonePrimary}`} className="block font-semibold text-dark hover:text-red">
                {CONTACT.phonePrimaryDisplay}
              </a>
              <a href={`tel:${CONTACT.phoneSecondary}`} className="block font-semibold text-dark hover:text-red">
                {CONTACT.phoneSecondaryDisplay}
              </a>
            </InfoCard>
            <InfoCard icon={Instagram}>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-dark hover:text-red"
              >
                {c.instagram}
              </a>
            </InfoCard>
            <InfoCard icon={Facebook}>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-dark hover:text-red"
              >
                {c.facebook}
              </a>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* ---- Season & hours ---- */}
      <section className="bg-royalBlue py-14 text-white">
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl border-l-4 border-yellow bg-lightGray shadow-lg">
            <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-royalBlue">
                <MessageCircle className="h-8 w-8 text-yellow" />
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-black text-royalBlue">{c.whatsappTitle}</h3>
                <p className="mt-2 text-sm text-dark/75">{c.whatsappText}</p>
              </div>
              <CTAButton
                href={t.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <MessageCircle className="h-4 w-4" />
                {c.whatsappCta}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Map ---- */}
      <section className="bg-lightGray py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black text-red sm:text-4xl">{c.findUsTitle}</h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
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
              <InfoLine
                icon={Bus}
                title={c.findUs.busLabel}
                label={c.findUs.bus}
              />
              <InfoLine icon={MapPin} title={c.findUs.gpsLabel} label={c.findUs.gps} />
            </Reveal>

            {/* Map + access plan */}
            <Reveal delay={120} className="space-y-5">
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/10">
                <a href={images.contactPlan} target="_blank" rel="noopener noreferrer" aria-label="Ouvrir le plan d’accès en grand">
                  <img
                    src={images.contactPlan}
                    srcSet={buildSrcSet(images.contactPlan)}
                    sizes={DEFAULT_SIZES}
                    alt="Plan explicatif pour localiser l’école de surf Skeepskool"
                    className="h-80 w-full object-cover object-[88%_4%] sm:h-96"
                    loading="lazy"
                  />
                </a>
                <div className="p-4">
                  <p className="text-sm font-semibold text-royalBlue">Plan d’accès</p>
                  <p className="mt-1 text-sm text-dark/75">Cliquez sur l’image pour l’ouvrir en grand.</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10">
                <iframe
                  title={c.mapTitle}
                  src={MAP_SRC}
                  className="h-80 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="mt-8 rounded-2xl bg-royalBlue p-6 text-white shadow-lg sm:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <Bus className="h-8 w-8 text-yellow" />
                  <h3 className="text-2xl font-black sm:text-3xl">{c.findUs.busLabel}</h3>
                </div>
                <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
                <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">{c.findUs.bus}</p>
                <p className="mt-3 text-sm font-semibold text-yellow sm:text-base">
                  {c.findUs.busBookingNote}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CTAButton
                    href={c.findUs.busUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow text-royalBlue hover:bg-white"
                  >
                    {c.findUs.busCta}
                    <ExternalLink className="h-4 w-4" />
                  </CTAButton>
                  <CTAButton
                    href={c.findUs.busAppStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red hover:bg-yellow"
                  >
                    {c.findUs.busAppStoreCta}
                    <ExternalLink className="h-4 w-4" />
                  </CTAButton>
                  <CTAButton
                    href={c.findUs.busGooglePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/30 bg-white/10 hover:bg-white/20"
                  >
                    {c.findUs.busGooglePlayCta}
                    <ExternalLink className="h-4 w-4" />
                  </CTAButton>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 text-center ring-1 ring-white/15 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-yellow">
                  {c.findUs.busPriceLabel}
                </p>
                <p className="mt-2 text-4xl font-black text-yellow">{c.findUs.busPrice}</p>
                {c.findUs.busPriceNote && (
                  <p className="mt-3 text-xs text-white/75">{c.findUs.busPriceNote}</p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function InfoCard({ icon: Icon, children }) {
  return (
    <div className="rounded-2xl border-b-4 border-red bg-white p-6 shadow-md">
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
