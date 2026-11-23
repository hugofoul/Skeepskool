import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SEO from '../components/SEO.jsx'
import { images } from '../data/images.js'
import { openCookieSettings, analyticsEnabled } from '../lib/analytics.js'

export default function Privacy() {
  const { t } = useLang()
  const p = t.privacy

  return (
    <div>
      <SEO title={p.seoTitle} routeKey="privacy" description={p.seoDescription} />
      <PageHero title={p.heroTitle} subtitle={p.heroSubtitle} image={images.fondpages} titleClassName="font-bold -translate-y-2" compact />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-dark/60">{p.updated}</p>
          <div className="mt-8 space-y-10">
            {p.sections.map((section) => (
              <Reveal key={section.id} className="scroll-mt-36 border-l-4 border-royalBlue pl-6">
                <h2 id={section.id} className="scroll-mt-36 text-xl font-black text-royalBlue sm:text-2xl">{section.title}</h2>
                <span className="mt-2 block h-1 w-12 rounded bg-yellow" />
                <div className="mt-4 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-dark/80">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.id === 'cookies' && analyticsEnabled ? (
                  <button
                    type="button"
                    onClick={openCookieSettings}
                    className="mt-4 rounded-full bg-royalBlue px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-red"
                  >
                    {t.cookies.title}
                  </button>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
