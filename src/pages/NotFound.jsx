import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'
import SEO from '../components/SEO.jsx'
import { images } from '../data/images.js'
import { buildSrcSet, HERO_SIZES } from '../utils/responsiveImage.js'

export default function NotFound() {
  const { t, path } = useLang()

  return (
    <section className="relative overflow-hidden bg-lightGray px-4 py-20 sm:px-6 lg:px-8">
      <img
        src={images.fondpages}
        srcSet={buildSrcSet(images.fondpages)}
        sizes={HERO_SIZES}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-royalBlue/5" />
      <SEO
        title={t.ui.notFound.pageNotFound}
        description={
          t.ui.notFound.theRequestedPageCould
        }
        robots="noindex, nofollow"
      />
      <div className="relative mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-lg ring-1 ring-black/5 sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-red">404</p>
        <h1 className="mt-3 text-3xl font-black text-royalBlue sm:text-4xl">
          {t.ui.notFound.thisPageDoesNot}
        </h1>
        <p className="mt-4 text-base text-dark/75 sm:text-lg">
          {t.ui.notFound.theLinkMayBe}
        </p>
        <Link
          to={path('home')}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-red px-7 py-3 text-base font-bold text-white shadow-lg shadow-red/20 transition-all duration-300 hover:bg-yellow hover:text-royalBlue"
        >
          {t.ui.notFound.backToHome}
        </Link>
      </div>
    </section>
  )
}
