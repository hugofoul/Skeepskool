import {
  Waves,
  LifeBuoy,
  Award,
  Star,
  CalendarDays,
  Clock3,
} from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import { useWeeklySchedule } from '../hooks/useWeeklySchedule.js'
import { useSurfConditions } from '../hooks/useSurfConditions.js'
import { images, carousel } from '../data/images.js'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import Carousel from '../components/Carousel.jsx'

const highlightIcons = [Waves, LifeBuoy, Award]

export default function Home() {
  const { t, lang } = useLang()
  const h = t.home
  const lessonSchedule = useWeeklySchedule({
    lang,
    fallbackDays: t.lessons.weeklySchedule.days,
    allLevelsLabel: t.lessons.weeklySchedule.allLevels,
  })
  const surfConditions = useSurfConditions({
    fallbackParagraphs: h.surfConditions.fallbackParagraphs,
  })

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

        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center text-white/90">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
            {lang === 'fr' ? 'Faites defiler' : 'Scroll'}
          </p>
          <span className="mt-1 block text-sm leading-none animate-bounce">↓</span>
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

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-lightGray px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-royalBlue">
                <CalendarDays className="h-4 w-4 text-red" />
                {h.schedulePreview.badge}
              </span>
              <h2 className="mt-5 text-3xl font-black text-royalBlue sm:text-4xl">
                {h.schedulePreview.title}
              </h2>
              <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-dark/75">
                {h.schedulePreview.text}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <CTAButton to="/horaires">{h.schedulePreview.cta}</CTAButton>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-3">
              {lessonSchedule.days.slice(0, 3).map((day, i) => (
                <Reveal
                  key={day.day}
                  delay={i * 100}
                  className="rounded-[1.75rem] bg-lightGray p-5 shadow-sm ring-1 ring-black/5"
                >
                  <h3 className="text-2xl font-black text-royalBlue">{day.day}</h3>
                  <div className="mt-4 space-y-3">
                    {day.slots.slice(0, 2).map((slot) => (
                      <div key={`${day.day}-${slot.time}`} className="rounded-2xl bg-white px-4 py-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-red">
                            <Clock3 className="h-4 w-4" />
                            <p className="text-sm font-black">{slot.time}</p>
                          </div>
                          {slot.type && slot.type.includes('Sunset') && (
                            <span className="rounded-full bg-yellow px-2 py-0.5 text-[10px] font-bold text-red">
                              Sunset
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SURF CONDITIONS ---------------- */}
      <section className="bg-lightGray py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-3xl border-l-4 border-red bg-white p-7 shadow-lg ring-1 ring-black/5 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-royalBlue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-royalBlue">
              <Waves className="h-4 w-4 text-red" />
              {h.surfConditions.badge}
            </span>
            <h2 className="mt-5 text-3xl font-black text-royalBlue sm:text-4xl">
              {h.surfConditions.title}
            </h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />

            <div className="mt-6 space-y-4">
              {surfConditions.paragraphs.map((paragraph, index) => (
                <p key={`surf-condition-${index}`} className="text-base leading-relaxed text-dark/80 sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- GOOGLE REVIEWS CTA ---------------- */}
      <section className="bg-royalBlue py-14 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-yellow/10 shadow-lg ring-1 ring-yellow/20">
            <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
              <div className="flex gap-1 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow text-yellow" />
                ))}
              </div>
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
