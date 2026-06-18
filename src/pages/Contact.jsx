import {
  MapPin,
  Phone,
  Facebook,
  Instagram,
  CalendarCheck,
  MessageCircle,
  Star,
} from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'

const MAP_SRC =
  'https://www.google.com/maps?q=Skeepskool+Ecole+de+Surf+Plage+Centrale+du+Porge&z=14&output=embed'

export default function Contact() {
  const { t } = useLang()
  const c = t.contact

  return (
    <div>
      <PageHero title={c.heroTitle} subtitle={c.heroSubtitle} image={images.contact} />

      {/* ---- Info cards ---- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{c.infoTitle}</h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <InfoCard icon={MapPin}>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Skeepskool+Ecole+de+Surf+Plage+Centrale+du+Porge"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <p className="font-semibold text-dark group-hover:text-red">{c.address}</p>
                <p className="text-sm text-dark/60">{c.addressDetail}</p>
                <span className="mt-1 inline-block text-sm font-semibold text-royalBlue group-hover:text-red">
                  {c.openMaps} →
                </span>
              </a>
            </InfoCard>
            <InfoCard icon={Phone}>
              <a href="tel:+33670608426" className="block font-semibold text-dark hover:text-red">
                +33 6 70 60 84 26
              </a>
              <a href="tel:+33650523475" className="block font-semibold text-dark hover:text-red">
                +33 6 50 52 34 75
              </a>
            </InfoCard>
            <InfoCard icon={Facebook}>
              <a
                href="https://www.facebook.com/skeepskool/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-dark hover:text-red"
              >
                {c.facebook}
              </a>
            </InfoCard>
            <InfoCard icon={Instagram}>
              <a
                href="https://www.instagram.com/skeepskool/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-dark hover:text-red"
              >
                {c.instagram}
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
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">{c.season}</p>
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
            <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{c.mapTitle}</h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>
          <Reveal
            delay={120}
            className="mt-8 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10"
          >
            <iframe
              title={c.mapTitle}
              src={MAP_SRC}
              className="h-80 w-full border-0 sm:h-[28rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function InfoCard({ icon: Icon, children }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border-l-4 border-royalBlue bg-lightGray p-5 shadow-sm">
      <span className="rounded-lg bg-royalBlue/10 p-2.5">
        <Icon className="h-5 w-5 text-royalBlue" />
      </span>
      <div>{children}</div>
    </div>
  )
}
