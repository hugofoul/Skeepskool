import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'
import SEO from '../components/SEO.jsx'

export default function NotFound() {
  const { lang } = useLang()

  return (
    <section className="bg-lightGray px-4 py-20 sm:px-6 lg:px-8">
      <SEO
        title={lang === 'fr' ? 'Page introuvable' : (lang === 'de' ? 'Seite nicht gefunden' : 'Page not found')}
        description={
          lang === 'fr'
            ? 'La page demandee est introuvable.'
            : (lang === 'de' ? 'Die angeforderte Seite wurde nicht gefunden.' : 'The requested page could not be found.')
        }
        robots="noindex, nofollow"
      />
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-lg ring-1 ring-black/5 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red">404</p>
        <h1 className="mt-3 text-3xl font-black text-royalBlue sm:text-4xl">
          {lang === 'fr' ? 'Cette page n\'existe pas.' : (lang === 'de' ? 'Diese Seite existiert nicht.' : 'This page does not exist.')}
        </h1>
        <p className="mt-4 text-base text-dark/75 sm:text-lg">
          {lang === 'fr'
            ? 'Le lien est peut-etre obsolete ou incorrect.'
            : (lang === 'de' ? 'Der Link ist möglicherweise veraltet oder falsch.' : 'The link may be outdated or incorrect.')}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-red px-7 py-3 text-base font-bold text-white shadow-lg shadow-red/20 transition-all duration-300 hover:bg-yellow hover:text-royalBlue"
        >
          {lang === 'fr' ? "Retour a l'accueil" : (lang === 'de' ? 'Zur Startseite' : 'Back to home')}
        </Link>
      </div>
    </section>
  )
}
