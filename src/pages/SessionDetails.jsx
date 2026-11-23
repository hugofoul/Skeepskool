import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'
import { buildSrcSet } from '../utils/responsiveImage.js'

const STEP_NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function SessionDetails() {
  const { t, path } = useLang()
  const lessonsPath = path('lessons')
  const [activeIndex, setActiveIndex] = useState(null)

  const c = t.sessionDetails

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
        title={t.ui.sessionDetails.typicalSession}
        routeKey="session"
        description={c.intro}
      />

      <PageHero title={c.title} subtitle={c.subtitle} image={images.fondpages} titleClassName="font-bold -translate-y-2" compact />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="max-w-3xl text-base leading-relaxed text-dark/75 sm:text-lg">
              {c.intro}
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
                    src={`/images/seance-type/${step}.png`}
                    srcSet={buildSrcSet(`/images/seance-type/${step}.png`)}
                    sizes="(max-width: 640px) 100vw, 33vw"
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
              to={path(c.ctaRoute)}
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
          aria-label={t.ui.sessionDetails.stepViewer}
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
                src={`/images/seance-type/${STEP_NUMBERS[activeIndex]}.png`}
                srcSet={buildSrcSet(`/images/seance-type/${STEP_NUMBERS[activeIndex]}.png`)}
                sizes="100vw"
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