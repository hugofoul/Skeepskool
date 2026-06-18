import { Waves, LifeBuoy, Award, Star, MapPin, Car, Navigation, ParkingCircle } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import { images, carousel } from '../data/images.js'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import Carousel from '../components/Carousel.jsx'

const highlightIcons = [Waves, LifeBuoy, Award]

const MAP_SRC =
  'https://www.google.com/maps?q=Skeepskool+Ecole+de+Surf+Plage+Centrale+du+Porge&z=14&output=embed'

export default function Home() {
  const { t } = useLang()
  const h = t.home

  return (
    <div>
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
        <img
          src={images.homeHero}
          alt="Surfeur à la plage du Porge Océan"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-royalBlue/50" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
          <h1 className="animate-fadeInUp text-5xl font-black tracking-tight drop-shadow-lg sm:text-7xl lg:text-8xl">
            {h.heroTitle}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-yellow sm:text-3xl">
            {h.heroTagline}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            {h.heroSubtitle}
          </p>
          <div className="mt-8">
            <CTAButton to="/contact" className="text-lg">
              {h.heroCta}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ---------------- HIGHLIGHTS ---------------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {h.highlights.map((card, i) => {
              const Icon = highlightIcons[i]
              return (
                <Reveal
                  key={card.title}
                  delay={i * 120}
                  className="group rounded-2xl border-b-4 border-red bg-white p-8 shadow-md ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Icon className="h-12 w-12 text-royalBlue" strokeWidth={2} />
                  <h3 className="mt-4 text-xl font-extrabold text-royalBlue">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark/75">{card.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------- PHOTO CAROUSEL ---------------- */}
      <section className="bg-lightGray py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Carousel slides={carousel} />
          </Reveal>
        </div>
      </section>

      {/* ---------------- ABOUT SNIPPET ---------------- */}
      <section className="bg-royalBlue py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-block h-1 w-16 rounded bg-yellow" />
            <h2 className="mt-6 text-3xl font-black sm:text-4xl">{h.aboutTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
              {h.aboutText}
            </p>
            <div className="mt-8">
              <CTAButton to="/ecole" className="bg-yellow text-royalBlue hover:bg-white">
                {t.learnMore}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- HOW TO FIND US ---------------- */}
      <section className="bg-lightGray py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black text-red sm:text-4xl">{h.findUsTitle}</h2>
            <span className="mt-3 inline-block h-1 w-16 rounded bg-yellow" />
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            {/* Info list */}
            <Reveal className="space-y-5">
              <InfoLine icon={MapPin} label={h.findUs.address} />
              <InfoLine
                icon={Car}
                title={h.findUs.byCarLabel}
                label={h.findUs.byCar}
              />
              <InfoLine
                icon={Navigation}
                title={h.findUs.citiesLabel}
                label={h.findUs.cities}
              />
              <InfoLine
                icon={ParkingCircle}
                title={h.findUs.parkingLabel}
                label={h.findUs.parking}
              />
              <InfoLine icon={MapPin} title={h.findUs.gpsLabel} label={h.findUs.gps} />
            </Reveal>

            {/* Map */}
            <Reveal delay={120} className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/10">
              <iframe
                title="Le Porge Océan — Google Maps"
                src={MAP_SRC}
                className="h-80 w-full border-0 lg:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- GOOGLE REVIEWS CTA ---------------- */}
      <section className="bg-royalBlue py-14 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-yellow/10 shadow-lg ring-1 ring-yellow/20">
            <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-yellow">
                <Star className="h-8 w-8 fill-yellow text-yellow" />
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white">{h.reviewsTitle}</h3>
                <p className="mt-2 text-sm text-white/85">{h.reviewsText}</p>
              </div>
              <CTAButton
                href={h.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-yellow text-royalBlue hover:bg-white"
              >
                <Star className="h-4 w-4" />
                {h.reviewsCta}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-black text-royalBlue sm:text-4xl">
              {h.testimonialsTitle}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {h.testimonials.map((rev, i) => (
              <Reveal
                key={rev.name}
                delay={i * 120}
                className="rounded-2xl border-l-4 border-red bg-lightGray p-6 shadow-sm"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-5 w-5 fill-yellow text-yellow" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-dark/80">“{rev.text}”</p>
                <p className="mt-4 font-bold text-royalBlue">{rev.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
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
            href="https://www.google.com/maps/search/?api=1&query=Skeepskool+Ecole+de+Surf+Plage+Centrale+du+Porge"
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
