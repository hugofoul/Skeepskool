import { useEffect, useState } from 'react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import { photoGallery, images } from '../data/images.js'

export default function PhotoAlbum() {
  const { lang } = useLang()
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (activeIndex === null) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current === null ? null : (current + 1) % photoGallery.length))
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null ? null : (current - 1 + photoGallery.length) % photoGallery.length,
        )
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  const openPhoto = (index) => setActiveIndex(index)
  const closePhoto = () => setActiveIndex(null)
  const currentPhoto = activeIndex === null ? null : photoGallery[activeIndex]

  return (
    <div className="bg-lightGray">
      <SEO
        title={lang === 'fr' ? 'Album photo' : 'Photo album'}
        path="/album-photo"
        alternates={[
          { hrefLang: 'fr-FR', path: '/album-photo' },
          { hrefLang: 'en', path: '/album-photo' },
          { hrefLang: 'x-default', path: '/album-photo' },
        ]}
        description={
          lang === 'fr'
            ? 'Album photo Skeepskool : vagues, élèves sur l’eau, lumières de fin de journée et ambiance surf.'
            : 'Skeepskool photo album: waves, students in the water, golden light and surf atmosphere.'
        }
      />

      <PageHero
        title={lang === 'fr' ? 'Album photo' : 'Photo album'}
        subtitle={
          lang === 'fr' ? 'Photos Skeepskool' : 'Skeepskool photos'
        }
        image={images.homeHero}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-lightGray px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-royalBlue">
              {lang === 'fr' ? 'Collection' : 'Collection'}
            </span>
            <p className="mt-5 text-lg leading-relaxed text-dark/75">
              {lang === 'fr'
                ? 'Des images simples et naturelles du spot, des sessions et de l’ambiance à l’eau.'
                : 'Simple, natural images of the spot, the sessions and the atmosphere in the water.'}
            </p>
          </div>

          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {photoGallery.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => openPhoto(index)}
                className={`group mb-4 block w-full overflow-hidden rounded-[2rem] text-left shadow-xl ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 ${photo.className ?? ''}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {currentPhoto && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-dark/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'fr' ? 'Visionneuse photo' : 'Photo viewer'}
          onClick={closePhoto}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] bg-black shadow-2xl ring-1 ring-white/10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePhoto}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-royalBlue shadow-lg transition-colors hover:bg-yellow"
            >
              {lang === 'fr' ? 'Fermer' : 'Close'}
            </button>

            <div className="grid lg:grid-cols-[1.4fr_0.6fr]">
              <div className="bg-black">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  className="h-auto max-h-[calc(100dvh-14rem)] w-full object-contain sm:h-[75vh] sm:max-h-none lg:h-[80vh]"
                />
              </div>
              <div className="flex flex-col justify-between gap-6 bg-royalBlue p-6 text-white sm:p-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow">
                    {lang === 'fr' ? 'Photo' : 'Photo'}
                  </p>
                  <h3 className="mt-4 text-2xl font-black sm:text-3xl">
                    {activeIndex === 0 && (lang === 'fr' ? 'La puissance des vagues' : 'Wave power')}
                    {activeIndex === 1 && (lang === 'fr' ? 'Lumière de fin de journée' : 'End-of-day light')}
                    {activeIndex > 1 && (lang === 'fr' ? 'Ambiance surf au Porge' : 'Surf atmosphere at Le Porge')}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-white/85">
                    {currentPhoto.alt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveIndex((current) => (current - 1 + photoGallery.length) % photoGallery.length)}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold transition-colors hover:bg-white/20"
                  >
                    {lang === 'fr' ? 'Précédente' : 'Previous'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((current) => (current + 1) % photoGallery.length)}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold transition-colors hover:bg-white/20"
                  >
                    {lang === 'fr' ? 'Suivante' : 'Next'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}