import Reveal from './Reveal.jsx'

/**
 * royalBlue page header with white title and a yellow decorative underline.
 * Optionally renders a faint background image.
 */
export default function PageHero({ title, subtitle, image }) {
  return (
    <section className="relative overflow-hidden bg-royalBlue">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-royalBlue/35" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <h1 className="text-4xl font-black text-white sm:text-5xl">{title}</h1>
          <span className="mx-auto mt-4 block h-1.5 w-24 rounded-full bg-yellow" />
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">{subtitle}</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
