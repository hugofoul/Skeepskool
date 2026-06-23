import {
  Check,
  Star,
  Waves,
  Clock,
  Users,
  Backpack,
  ShieldCheck,
  MapPin,
  Info,
  Sunset,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'

// Index of the card to highlight as "Popular" (Pack 5 lessons)
const POPULAR_INDEX = 2

const factIcons = [Clock, Users, Backpack, ShieldCheck]

export default function Lessons() {
  const { t, lang } = useLang()
  const l = t.lessons

  return (
    <div>
      <SEO
        title={lang === 'fr' ? 'Formules & Tarifs' : 'Packages & Prices'}
        path={lang === 'fr' ? '/cours' : '/lessons'}
        alternates={[
          { hrefLang: 'fr-FR', path: '/cours' },
          { hrefLang: 'en', path: '/lessons' },
          { hrefLang: 'x-default', path: '/cours' },
        ]}
        description={lang === 'fr'
          ? "Cours de surf collectifs et particuliers à partir de 40€. Packs 3, 5, 10 ou 20 séances. Matériel et assurance inclus. Le Porge Océan, Gironde."
          : "Group and private surf lessons from €40. Packs of 3, 5, 10 or 20 sessions. Equipment and insurance included. Le Porge Océan, Gironde."}
      />
      <PageHero title={l.heroTitle} subtitle={l.heroSubtitle} image={images.lessonsHero} />

      {/* ---- Lesson presentation ---- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{l.aboutTitle}</h2>
              <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
              <p className="mt-5 text-lg leading-relaxed text-dark/80">{l.aboutLead}</p>
            </Reveal>
            <Reveal
              delay={120}
              className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10"
            >
              <img
                src={images.lessonsIntro}
                alt={l.aboutTitle}
                className="h-72 w-full object-cover sm:h-96"
                loading="lazy"
              />
            </Reveal>
          </div>

          {/* Quick facts */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* Team link */}
          <Reveal delay={150} className="mt-10">
            <Link
              to="/ecole#equipe"
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
                src={images.lessonsSunset}
                alt={l.sunsetTitle}
                className="h-72 w-full object-cover sm:h-96"
                loading="lazy"
              />
            </Reveal>
            <Reveal delay={120} className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#d9f0f5]">
                <Sunset className="h-4 w-4" /> Sunset
              </span>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">{l.sunsetTitle}</h2>
              <span className="mt-3 block h-1 w-16 rounded bg-[#8ad1df]" />
              <p className="mt-5 text-lg leading-relaxed text-white/88">{l.sunsetText}</p>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="bg-royalBlue py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black sm:text-4xl">{l.stepsTitle}</h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {l.steps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 100}
                className="relative rounded-2xl bg-white/5 p-6 ring-1 ring-white/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow text-lg font-black text-royalBlue">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-yellow">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Included + good to know ---- */}
      <section className="bg-lightGray py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="rounded-2xl bg-white p-7 shadow-md ring-1 ring-black/5 sm:p-9">
            <h3 className="text-2xl font-black text-royalBlue">{l.includedTitle}</h3>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
            <ul className="mt-6 space-y-3">
              {l.includes.map((inc) => (
                <li key={inc} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow">
                    <Check className="h-4 w-4 text-royalBlue" strokeWidth={3} />
                  </span>
                  <span className="font-semibold text-dark">{inc}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={120}
            className="rounded-2xl border-l-4 border-red bg-white p-7 shadow-md ring-1 ring-black/5 sm:p-9"
          >
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-red" />
              <h3 className="text-2xl font-black text-royalBlue">{l.goodToKnowTitle}</h3>
            </div>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
            <ul className="mt-6 space-y-3">
              {l.goodToKnow.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-dark/80">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-royalBlue" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{l.faqTitle}</h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>

          <div className="mt-8 space-y-4">
            {l.faq.map((item, i) => (
              <Reveal
                key={item.question}
                delay={i * 80}
                className="rounded-2xl border-l-4 border-red bg-lightGray p-6 shadow-sm"
              >
                <p className="text-lg font-extrabold text-royalBlue">{item.question}</p>
                <p className="mt-2 text-sm leading-relaxed text-dark/80">{item.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fb] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-black/5 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-red/80">
              {l.weeklySchedule.badge}
            </p>
            <h2 className="mt-4 text-3xl font-black text-royalBlue sm:text-4xl">
              {l.weeklySchedule.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-dark/75">{l.weeklySchedule.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton to="/horaires">{l.weeklySchedule.openPlanning}</CTAButton>
              <CTAButton
                href={t.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-royalBlue hover:bg-yellow"
              >
                {l.weeklySchedule.contactCta}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Prices heading ---- */}
      <section className="bg-white pt-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{l.pricesTitle}</h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
            <p className="mt-5 text-lg text-dark/75">{l.pricesSubtitle}</p>
            <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-yellow/20 px-4 py-2 text-sm font-bold text-royalBlue ring-1 ring-yellow">
              <ShieldCheck className="h-4 w-4" />
              {l.validityNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Pricing cards ---- */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    <ul className="mt-5 space-y-2">
                      {l.includes.slice(0, 3).map((inc) => (
                        <li key={inc} className="flex items-center gap-2 text-sm text-dark/80">
                          <Check className="h-4 w-4 shrink-0 text-yellow" strokeWidth={3} />
                          {inc}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-2">
                      <CTAButton to="/contact" className="w-full">
                        {t.bookNow}
                      </CTAButton>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
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
                  <CTAButton to="/contact" className="bg-red hover:bg-yellow">
                    {l.cta}
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- Includes checklist ---- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">
              {l.includesTitle}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>
          <Reveal delay={120} className="mt-10 grid gap-4 sm:grid-cols-2">
            {l.includes.map((inc) => (
              <div
                key={inc}
                className="flex items-center gap-3 rounded-xl bg-lightGray px-5 py-4 text-left shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow">
                  <Check className="h-5 w-5 text-royalBlue" strokeWidth={3} />
                </span>
                <span className="font-semibold text-dark">{inc}</span>
              </div>
            ))}
          </Reveal>

          <div className="mt-12">
            <CTAButton to="/contact" className="text-lg">
              {l.cta}
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
