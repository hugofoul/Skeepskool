import {
  Star,
  Waves,
  Clock,
  Users,
  Backpack,
  ShieldCheck,
  Sunset,
  ArrowRight,
  Phone,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'
import { useWeeklySchedule } from '../hooks/useWeeklySchedule.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'
import { SITE_URL } from '../config/site.js'
import { buildSrcSet, DEFAULT_SIZES } from '../utils/responsiveImage.js'

// Index of the card to highlight as "Popular" (Pack 10 lessons)
const POPULAR_INDEX = 3

const factIcons = [Clock, Users, Backpack, ShieldCheck]
const valueIcons = [Waves, Star, ShieldCheck]
const packageByCardIndex = ['single', 'pack3', 'pack5', 'pack10', 'pack20', 'private']
const SCHOOL_LABEL_SVG = '/images/passeport.svg'

export default function Lessons() {
  const { t, lang } = useLang()
  const l = t.lessons
  const school = t.school
  const s = t.schedule
  const bookingPath = lang === 'fr' ? '/reserver' : '/book'
  const giftPath = lang === 'fr' ? '/bon-cadeau' : '/gift-voucher'
  const schedulePath = lang === 'fr' ? '/horaires' : '/schedule'
  const sessionDetailsPath = lang === 'fr' ? '/seance-type' : '/session-details'
  const schedule = useWeeklySchedule({
    lang,
    fallbackDays: s.fallbackDays,
    allLevelsLabel: s.allLevels,
  })
  const nextTwoDays = schedule.days.slice(0, 2)

  const parseEuroPrice = (value) => {
    const parsed = Number.parseFloat(String(value || '').replace(',', '.').replace(/[^0-9.]/g, ''))
    return Number.isFinite(parsed) ? parsed : null
  }

  const offers = l.cards
    .map((card, index) => {
      const price = parseEuroPrice(card.price)
      if (price === null) return null

      return {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price,
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}${bookingPath}?package=${packageByCardIndex[index]}`,
        itemOffered: {
          '@type': 'Service',
          name: card.name,
          description: card.detail,
        },
      }
    })
    .filter(Boolean)

  const faqEntries = [...(l.goodToKnow || []), ...(l.faq || [])]
    .filter((item) => item?.question && item?.answer)
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))

  const lessonsPath = lang === 'fr' ? '/cours' : '/lessons'
  const breadcrumbName = lang === 'fr' ? 'Cours & Tarifs' : (lang === 'de' ? 'Kurse & Preise' : 'Lessons & Prices')
  const lessonsStructuredData = [
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
          name: breadcrumbName,
          item: `${SITE_URL}${lessonsPath}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqEntries,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: breadcrumbName,
      serviceType: breadcrumbName,
      provider: {
        '@type': 'SportsActivityLocation',
        name: 'Skeepskool',
      },
      areaServed: 'Le Porge Océan',
      offers,
    },
  ]

  return (
    <div>
      <SEO
        title={lang === 'fr' ? 'Formules & Tarifs' : (lang === 'de' ? 'Kurse & Preise' : 'Packages & Prices')}
        path={lang === 'fr' ? '/cours' : '/lessons'}
        lang={lang}
        alternates={[
          { hrefLang: 'fr-FR', path: '/cours' },
          { hrefLang: 'en', path: '/lessons' },
          { hrefLang: 'de', path: '/lessons' },
          { hrefLang: 'x-default', path: '/cours' },
        ]}
        description={lang === 'fr'
          ? "Cours de surf collectifs et particuliers à partir de 40€. Packs 3, 5, 10 ou 20 séances. Matériel et assurance inclus. Le Porge Océan, Gironde."
          : (lang === 'de'
            ? 'Gruppen- und Privat-Surfkurse ab 40€. Pakete mit 3, 5, 10 oder 20 Einheiten. Material und Versicherung inklusive. Le Porge Océan, Gironde.'
            : "Group and private surf lessons from €40. Packs of 3, 5, 10 or 20 sessions. Equipment and insurance included. Le Porge Océan, Gironde.")}
        structuredData={lessonsStructuredData}
      />
      <PageHero title={l.heroTitle} subtitle={l.heroSubtitle} image={images.fondpages} titleClassName="font-bold -translate-y-2" compact />

      {/* ---- Lesson presentation ---- */}
      <section id="explication" className="scroll-mt-36 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal
              delay={120}
              className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10"
            >
              <img
                src={images.lessonsIntro}
                srcSet={buildSrcSet(images.lessonsIntro)}
                sizes={DEFAULT_SIZES}
                alt={l.aboutTitle}
                className="h-72 w-full object-cover sm:h-96"
                loading="lazy"
              />
            </Reveal>
            <Reveal>
              <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{l.aboutTitle}</h2>
              <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
              <p className="mt-5 text-lg leading-relaxed text-dark/80">{l.aboutLead}</p>
            </Reveal>
          </div>

          {/* Quick facts */}
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {l.quickFacts.map((fact, i) => {
              const Icon = factIcons[i]
              return (
                <Reveal
                  key={fact.label}
                  delay={i * 100}
                  className="rounded-2xl border-b-4 border-red bg-lightGray p-6 shadow-sm"
                >
                  <Icon className="h-9 w-9 text-royalBlue" strokeWidth={2} />
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-royalBlue/70">
                    {fact.label}
                  </p>
                  <p className="text-xl font-extrabold text-dark">{fact.value}</p>
                  <p className="mt-1 text-sm text-dark/65">{fact.detail}</p>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={120} className="mt-10 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl">
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="border-b border-black/10 bg-[#f3f7fd] p-7 sm:p-9 lg:border-b-0 lg:border-r">
                <h3 className="mt-3 text-3xl font-black leading-tight text-royalBlue sm:text-4xl">
                  {school.coachingTitle}
                </h3>
                <span className="mt-4 block h-1 w-16 rounded bg-red" />

                <div className="mt-7 flex w-full items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-2xl border-2 border-royalBlue bg-white px-5 py-3 shadow-sm">
                    <span className="text-base font-black text-royalBlue sm:text-lg">{school.coachingExperience}</span>
                  </div>
                  <img
                    src={SCHOOL_LABEL_SVG}
                    alt={lang === 'fr' ? 'Label École Française de Surf' : 'French Surf School label'}
                    className="h-36 w-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                
              </div>

              <div className="p-7 sm:p-9">
                <div className="grid gap-3">
                  {school.coachingItems.map((item) => (
                    <article
                      key={item}
                      className="rounded-xl border-l-4 border-red bg-lightGray px-4 py-3 shadow-sm ring-1 ring-black/5"
                    >
                      <p className="text-sm font-semibold leading-relaxed text-dark/85 sm:text-base">{item}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Team link */}
          <Reveal delay={150} className="mt-10">
            <Link
              to="/#equipe"
              className="group flex flex-col items-start gap-4 rounded-2xl bg-royalBlue p-7 text-white shadow-md ring-1 ring-black/5 transition-colors hover:bg-royalBlue/90 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow">
                  <Users className="h-6 w-6 text-royalBlue" strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-yellow">{l.teamLinkTitle}</h3>
                  <p className="mt-1 text-sm text-white/85">{l.teamLinkText}</p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-yellow px-5 py-2.5 text-sm font-bold text-royalBlue transition-transform group-hover:translate-x-1">
                {l.teamLinkCta}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- Sunset lessons ---- */}
      <section className="relative overflow-hidden py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2d45] via-[#245a72] to-[#5c8f9d]" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal
              className="order-2 overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/15 lg:order-1"
            >
              <img
                src="/images/bonsunset.png"
                alt={l.sunsetTitle}
                className="h-72 w-full object-cover sm:h-96"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = images.lessonsSunset
                }}
              />
            </Reveal>
            <Reveal delay={120} className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#d9f0f5]">
                <Sunset className="h-4 w-4" /> Sunset
              </span>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">{l.sunsetTitle}</h2>
              <span className="mt-3 block h-1 w-16 rounded bg-[#8ad1df]" />
              <p className="mt-5 text-lg leading-relaxed text-white/88">{l.sunsetText}</p>
              <div className="mt-6 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#d9f0f5]">Cours du matin</p>
                <p className="mt-2 text-base font-semibold text-white">{l.morningText || 'Nous proposons aussi des cours le matin pour ceux qui aiment le calme du matin.'}</p>
                <img
                  src={images.schoolSpot}
                  srcSet={buildSrcSet(images.schoolSpot)}
                  sizes={DEFAULT_SIZES}
                  alt={lang === 'fr' ? 'Cours du matin' : 'Morning lessons'}
                  className="mt-3 h-28 w-full rounded-xl object-cover"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section id="deroule-seance" className="scroll-mt-36 bg-royalBlue py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black sm:text-4xl">{l.stepsTitle}</h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>
          <Reveal delay={120} className="mt-10 overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-7 shadow-xl sm:p-9">
            <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
              {lang === 'fr'
                ? (
                  <>
                    <span>Vous souhaitez découvrir le déroulé complet d'une séance type ?</span>
                    <span className="block md:whitespace-nowrap">Consultez la page détaillée avec toutes les étapes numérotées et les visuels explicatifs.</span>
                  </>
                )
                : (lang === 'de'
                  ? 'Sie möchten den kompletten Ablauf einer typischen Session sehen? Öffnen Sie die Detailseite mit allen nummerierten Schritten und Erklär-Visuals.'
                  : 'Want to see the full flow of a typical session? Open the detailed page with all numbered steps and explanatory visuals.')}
            </p>
            <Link
              to={sessionDetailsPath}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-royalBlue transition-colors hover:bg-white"
            >
              {lang === 'fr' ? 'Voir la séance type détaillée' : (lang === 'de' ? 'Typische Session im Detail' : 'View detailed session flow')}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- School values ---- */}
      <section id="valeurs" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-black text-royalBlue sm:text-4xl">{school.valuesTitle}</h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
            {school.valuesSubtitle && (
              <p className="mx-auto mt-5 max-w-3xl text-center text-base text-dark/70 sm:text-lg">{school.valuesSubtitle}</p>
            )}
          </Reveal>

          <div className={`mt-12 grid gap-6 ${school.values.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-3'}`}>
            {school.values.map((value, index) => {
              const Icon = valueIcons[index] || ShieldCheck
              const isQualitySafety = value.title?.toLowerCase().includes('qualit') && value.title?.toLowerCase().includes('sécur')
              return (
                <Reveal
                  key={value.title}
                  delay={index * 100}
                  className="rounded-2xl border-b-4 border-red bg-lightGray p-6 text-center shadow-sm"
                >
                  {isQualitySafety ? (
                    <img
                      src={SCHOOL_LABEL_SVG}
                      alt={lang === 'fr' ? 'École Française de Surf' : 'French Surf School'}
                      className="mx-auto h-32 w-32 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-royalBlue/10">
                      <Icon className="h-7 w-7 text-royalBlue" />
                    </span>
                  )}
                  <h3 className="mt-4 text-xl font-extrabold text-royalBlue">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark/75">{value.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- Next 2 days schedule preview ---- */}
      <section className="bg-lightGray py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-royalBlue/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-royalBlue">
              {l.weeklySchedule.badge}
            </span>
            <h2 className="mt-4 text-3xl font-black text-royalBlue sm:text-4xl">{l.weeklySchedule.title}</h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
            <p className="mt-4 max-w-3xl text-base text-dark/75 sm:text-lg">{l.weeklySchedule.subtitle}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {nextTwoDays.map((day, index) => (
              <Reveal
                key={day.day}
                delay={index * 100}
                className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5"
              >
                <div className="bg-royalBlue px-5 py-4 text-white">
                  <h3 className="text-2xl font-black">{day.day}</h3>
                </div>
                <div className="space-y-2 p-5">
                  {day.slots.length ? day.slots.map((slot) => (
                    <div
                      key={`${day.day}-${slot.time}-${slot.type}-${slot.level}`}
                      className="rounded-xl bg-lightGray px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-base font-black text-dark">{slot.time}</p>
                        {slot.type?.includes('Sunset') && (
                          <span className="rounded-lg bg-yellow px-2 py-1 text-[10px] font-bold uppercase text-red">Sunset</span>
                        )}
                      </div>
                      <p className="mt-1 text-xs font-bold uppercase tracking-tight text-royalBlue/80">{slot.level}</p>
                    </div>
                  )) : (
                    <div className="rounded-xl bg-lightGray px-4 py-4 text-sm font-medium text-dark/60">
                      {s.fallbackLabel}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150} className="mt-8 flex flex-wrap items-center gap-3">
            <CTAButton to={schedulePath} className="bg-royalBlue hover:bg-red">
              {l.weeklySchedule.openPlanning}
            </CTAButton>
            <CTAButton to={bookingPath} className="bg-red hover:bg-yellow hover:text-royalBlue">
              {l.weeklySchedule.contactCta}
            </CTAButton>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-royalBlue shadow-xl ring-1 ring-black/10">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <Link
                to={giftPath}
                className="relative block min-h-[320px] sm:min-h-[420px]"
                aria-label={lang === 'fr' ? 'Voir la page bon cadeau' : 'Open gift voucher page'}
              >
                <img
                  src="/images/bon-cadeau.jpg"
                  srcSet={buildSrcSet('/images/bon-cadeau.jpg')}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  alt={lang === 'fr' ? 'Visuel bon cadeau' : 'Gift voucher visual'}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-royalBlue sm:left-6 sm:top-6">
                  <Waves className="h-4 w-4" /> {l.giftExperienceBadge}
                </div>
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                  <h2 className="text-2xl font-black leading-tight text-white drop-shadow sm:text-3xl">
                    {l.giftExperienceTitle}
                  </h2>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-white/90">
                    {lang === 'fr' ? 'Cliquer pour voir la page bon cadeau' : (lang === 'de' ? 'Klicken, um die Gutscheinseite zu sehen' : 'Click to open gift voucher page')}
                  </p>
                </div>
              </Link>

              <div className="flex flex-col justify-center p-7 text-white sm:p-10">
                <p className="text-base font-semibold leading-relaxed text-white/95 sm:text-lg">
                  {l.giftExperienceText1}
                </p>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-white/85 sm:text-base">
                  {l.giftExperienceText2}
                </p>
                <div className="mt-6 h-1.5 w-20 rounded-full bg-yellow" />
                <div className="mt-6">
                  <CTAButton to={giftPath} className="bg-red hover:bg-yellow hover:text-royalBlue">
                    {l.giftExperienceCta}
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Prices heading ---- */}
      <section id="formules-tarifs" className="scroll-mt-24 bg-white pt-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{l.pricesTitle}</h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
            <p className="mx-auto mt-5 inline-flex items-center rounded-full bg-yellow/20 px-5 py-2.5 text-base font-bold text-royalBlue ring-1 ring-yellow sm:text-lg">
              {l.validityNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Pricing cards ---- */}
      <section id="cours-a-lunite" className="scroll-mt-96 bg-white pb-8 pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
            {l.cards.map((card, i) => {
              const popular = i === POPULAR_INDEX
              return (
                <Reveal
                  key={card.name}
                  delay={(i % 3) * 100}
                  className={`relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 transition-transform duration-300 hover:-translate-y-1 ${
                    popular ? 'ring-2 ring-yellow' : 'ring-black/5'
                  }`}
                >
                  {popular && (
                    <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-yellow px-3 py-1 text-xs font-bold text-royalBlue">
                      <Star className="h-3.5 w-3.5 fill-royalBlue" />
                      {l.popular}
                    </span>
                  )}
                  {/* royalBlue top band */}
                  <div className="bg-royalBlue px-6 py-5">
                    <h3 className="text-lg font-extrabold text-white">{card.name}</h3>
                    <p className="text-sm text-white/75">{card.detail}</p>
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <p className="text-4xl font-black text-red">{card.price}</p>
                    {card.note && (
                      <p className="mt-1 text-sm font-medium text-dark/60">{card.note}</p>
                    )}
                    <div className="mt-6 pt-2">
                      <CTAButton to={`${bookingPath}?package=${packageByCardIndex[i]}`} className="w-full">
                        {t.bookNow}
                      </CTAButton>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
        {l.pricesSubtitle ? (
          <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-base font-semibold text-dark/75 sm:text-lg">
              {l.pricesSubtitle}
            </p>
          </div>
        ) : null}
      </section>

      {/* ---- Combo package ---- */}
      <section className="bg-lightGray py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-royalBlue shadow-xl">
            <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div className="text-white">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-yellow">
                  <Waves className="h-4 w-4" /> Combo
                </span>
                <h2 className="mt-4 text-3xl font-black text-yellow sm:text-4xl">
                  {l.comboTitle}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/90">{l.comboDetail}</p>
                <p className="mt-3 italic text-white/80">“{l.comboText}”</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-8 text-center">
                <p className="text-6xl font-black text-yellow">{l.comboPrice}</p>
                <div className="mt-5">
                  <CTAButton to={`${bookingPath}?package=combo`} className="bg-red hover:bg-yellow">
                    {l.cta}
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-lightGray pb-12 sm:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-center text-base font-semibold text-dark/75 sm:text-lg">
              <Phone className="mr-1.5 inline h-5 w-5 align-text-bottom text-royalBlue" />
              {l.groupNote}
            </p>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
