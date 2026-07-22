import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'

const STEP_NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function SessionDetails() {
  const { lang } = useLang()
  const lessonsPath = lang === 'fr' ? '/cours' : '/lessons'
  const [activeIndex, setActiveIndex] = useState(null)

  const copy = {
    fr: {
      title: 'Séance type',
      subtitle: 'Le déroulé complet d\'une séance, étape par étape.',
      intro: 'Voici les visuels détaillés de chaque étape pour comprendre précisément comment se déroule une séance chez Skeepskool.',
      back: 'Retour aux cours',
      cta: 'Réserver une séance',
      ctaPath: '/reserver',
      stepLabel: 'Étape',
    },
    en: {
      title: 'Typical Session',
      subtitle: 'Full lesson flow, step by step.',
      intro: 'Here are the detailed visuals for each step so you can clearly understand how a session works at Skeepskool.',
      back: 'Back to lessons',
      cta: 'Book a session',
      ctaPath: '/book',
      stepLabel: 'Step',
    },
    de: {
      title: 'Typische Session',
      subtitle: 'Der komplette Ablauf, Schritt für Schritt.',
      intro: 'Hier sind die detaillierten Visuals für jeden Schritt, damit Sie den Ablauf einer Session bei Skeepskool genau verstehen.',
      back: 'Zurück zu den Kursen',
      cta: 'Session buchen',
      ctaPath: '/book',
      stepLabel: 'Schritt',
    },
  }

  const c = copy[lang] || copy.fr

  useEffect(() => {
    if (activeIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current === null ? null : (current + 1) % STEP_NUMBERS.length))
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + STEP_NUMBERS.length) % STEP_NUMBERS.length,
        )
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex])

  return (
    <div>
      <SEO
        title={lang === 'fr' ? 'Séance type' : (lang === 'de' ? 'Typische Session' : 'Typical Session')}
        path={lang === 'fr' ? '/seance-type' : '/session-details'}
        lang={lang}
        alternates={[
          { hrefLang: 'fr-FR', path: '/seance-type' },
          { hrefLang: 'en', path: '/session-details' },
          { hrefLang: 'de', path: '/session-details' },
          { hrefLang: 'x-default', path: '/seance-type' },
        ]}
        description={c.intro}
      />

      <PageHero title={c.title} subtitle={c.subtitle} image={images.fondpages} titleClassName="font-bold" />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="max-w-3xl text-base leading-relaxed text-dark/75 sm:text-lg">
              {lang === 'fr' ? <span className="md:whitespace-nowrap">{c.intro}</span> : c.intro}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {STEP_NUMBERS.map((step, index) => (
              <Reveal
                key={step}
                delay={index * 60}
                className="overflow-hidden rounded-2xl bg-lightGray shadow-md ring-1 ring-black/5"
              >
                <div className="flex items-center justify-between border-b border-black/10 bg-white px-4 py-3">
                  <p className="text-sm font-bold uppercase tracking-wider text-royalBlue">{c.stepLabel}</p>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow text-sm font-black text-royalBlue">
                    {step}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="block w-full bg-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2"
                  aria-label={`${c.stepLabel} ${step} — zoom`}
                >
                  <img
                    src={`/images/séance_type/${step}.png`}
                    alt={`${c.stepLabel} ${step}`}
                    loading="lazy"
                    className="h-auto w-full object-contain"
                  />
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to={lessonsPath}
              className="inline-flex items-center gap-2 rounded-full bg-lightGray px-5 py-3 text-sm font-bold text-royalBlue transition-colors hover:bg-royalBlue/10"
            >
              <ArrowLeft className="h-4 w-4" />
              {c.back}
            </Link>
            <Link
              to={c.ctaPath}
              className="inline-flex items-center gap-2 rounded-full bg-royalBlue px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-red"
            >
              {c.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'fr' ? 'Visionneuse étape' : (lang === 'de' ? 'Schrittanzeige' : 'Step viewer')}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-black ring-1 ring-white/15"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-royalBlue shadow"
            >
              ×
            </button>

            <div className="relative flex items-center justify-center bg-black p-3 sm:p-5">
              <img
                src={`/images/séance_type/${STEP_NUMBERS[activeIndex]}.png`}
                alt={`${c.stepLabel} ${STEP_NUMBERS[activeIndex]}`}
                className="block max-h-[85vh] w-auto max-w-full object-contain"
              />

              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current - 1 + STEP_NUMBERS.length) % STEP_NUMBERS.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-royalBlue shadow"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current + 1) % STEP_NUMBERS.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-royalBlue shadow"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}