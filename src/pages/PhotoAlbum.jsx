import { useEffect, useState } from 'react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import { photoGallery, images } from '../data/images.js'
import { buildSrcSet, DEFAULT_SIZES } from '../utils/responsiveImage.js'

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
        title={lang === 'fr' ? 'Album photo' : (lang === 'de' ? 'Fotoalbum' : 'Photo album')}
        path="/album-photo"
        alternates={[
          { hrefLang: 'fr-FR', path: '/album-photo' },
          { hrefLang: 'en', path: '/album-photo' },
          { hrefLang: 'x-default', path: '/album-photo' },
        ]}
        description={
          lang === 'fr'
            ? 'Album photo Skeepskool : vagues, élèves sur l’eau, lumières de fin de journée et ambiance surf.'
            : (lang === 'de'
              ? 'Skeepskool Fotoalbum: Wellen, Schüler im Wasser, Abendlicht und Surf-Atmosphäre.'
              : 'Skeepskool photo album: waves, students in the water, golden light and surf atmosphere.')
        }
      />

      <PageHero
        title={lang === 'fr' ? 'Album photo' : (lang === 'de' ? 'Fotoalbum' : 'Photo album')}
        subtitle={
          lang === 'fr' ? 'Photos Skeepskool' : (lang === 'de' ? 'Skeepskool Fotos' : 'Skeepskool photos')
        }
        image={images.homeHero}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-lightGray px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-royalBlue">
              {lang === 'de' ? 'Sammlung' : 'Collection'}
            </span>
            <p className="mt-5 text-lg leading-relaxed text-dark/75">
              {lang === 'fr'
                ? 'Des images simples et naturelles du spot, des sessions et de l’ambiance à l’eau.'
                : (lang === 'de'
                  ? 'Einfache und natürliche Bilder vom Spot, den Sessions und der Stimmung im Wasser.'
                  : 'Simple, natural images of the spot, the sessions and the atmosphere in the water.')}
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
                  srcSet={buildSrcSet(photo.src)}
                  sizes={DEFAULT_SIZES}
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
          aria-label={lang === 'fr' ? 'Visionneuse photo' : (lang === 'de' ? 'Fotoanzeige' : 'Photo viewer')}
          onClick={closePhoto}
        >
          <div
            className="relative w-fit max-w-[94vw] overflow-hidden rounded-[2rem] bg-black shadow-2xl ring-1 ring-white/10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closePhoto}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-royalBlue shadow-lg transition-colors hover:bg-yellow"
            >
              ×
            </button>

            <div className="relative flex items-center justify-center bg-black">
              <img
                src={currentPhoto.src}
                srcSet={buildSrcSet(currentPhoto.src)}
                sizes="94vw"
                alt={currentPhoto.alt}
                className="block h-auto max-h-[calc(100dvh-8rem)] w-auto max-w-[94vw] object-contain sm:max-h-[85dvh]"
              />
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current - 1 + photoGallery.length) % photoGallery.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-royalBlue shadow-lg transition-colors hover:bg-yellow"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((current) => (current + 1) % photoGallery.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-royalBlue shadow-lg transition-colors hover:bg-yellow"
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