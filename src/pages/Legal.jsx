import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SEO from '../components/SEO.jsx'
import { images } from '../data/images.js'

export default function Legal() {
  const { t, lang } = useLang()
  const l = t.legal

  return (
    <div>
      <SEO
        title={lang === 'fr' ? 'Mentions légales' : 'Legal Notice'}
        path={lang === 'fr' ? '/mentions-legales' : '/legal'}
        alternates={[
          { hrefLang: 'fr-FR', path: '/mentions-legales' },
          { hrefLang: 'en', path: '/legal' },
          { hrefLang: 'x-default', path: '/mentions-legales' },
        ]}
        description={
          lang === 'fr'
            ? 'Mentions légales, politique de confidentialité et informations réglementaires de Skeepskool.'
            : 'Legal notice, privacy policy and regulatory information for Skeepskool.'
        }
      />
      <PageHero title={l.heroTitle} subtitle={l.heroSubtitle} image={images.fondpages} />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {l.sections.map((sec) => (
              <Reveal
                key={sec.title}
                className="border-l-4 border-royalBlue pl-6"
              >
                <h2 className="text-xl font-black text-royalBlue sm:text-2xl">{sec.title}</h2>
                <span className="mt-2 block h-1 w-12 rounded bg-yellow" />
                <div className="mt-4 space-y-3">
                  {sec.body.map((para, i) => (
                    <p key={i} className="text-sm leading-relaxed text-dark/80">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
