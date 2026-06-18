import { Check, Star, Waves } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'

// Index of the card to highlight as "Popular" (Pack 5 lessons)
const POPULAR_INDEX = 2

export default function Lessons() {
  const { t } = useLang()
  const l = t.lessons

  return (
    <div>
      <PageHero title={l.heroTitle} subtitle={l.heroSubtitle} image={images.riding} />

      {/* ---- Intro ---- */}
      <section className="bg-white pt-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">{l.introTitle}</h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
            <p className="mt-5 text-lg text-dark/75">{l.introText}</p>
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
