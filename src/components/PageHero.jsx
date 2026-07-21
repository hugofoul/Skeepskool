import Reveal from './Reveal.jsx'
import { buildSrcSet, HERO_SIZES } from '../utils/responsiveImage.js'

/**
 * royalBlue page header with white title and a yellow decorative underline.
 * Optionally renders a faint background image.
 */
export default function PageHero({ title, subtitle, image, titleClassName = '' }) {
  return (
    <section className="relative overflow-hidden bg-royalBlue">
      {image && (
        <>
          <img
            src={image}
            srcSet={buildSrcSet(image)}
            sizes={HERO_SIZES}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-royalBlue/30" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal>
          <h1 className={`home-hero-title-font text-[2rem] leading-[1.1] text-white sm:text-5xl ${titleClassName || 'font-normal'}`}>{title}</h1>
          <span className="mx-auto mt-3 block h-1.5 w-24 rounded-full bg-yellow" />
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/90 sm:mt-5 sm:text-lg">{subtitle}</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
