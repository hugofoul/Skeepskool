import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Auto-playing photo carousel with prev/next arrows and dot indicators.
 * Pauses on hover/focus. Respects prefers-reduced-motion (no autoplay).
 */
export default function Carousel({ slides = [], interval = 4500 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const [dragDelta, setDragDelta] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const count = slides.length
  const timer = useRef(null)
  const viewportRef = useRef(null)
  const startXRef = useRef(0)

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count])
  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (count <= 1 || paused || !autoPlay) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    timer.current = setTimeout(() => goTo(index + 1), interval)
    return () => clearTimeout(timer.current)
  }, [index, paused, autoPlay, count, interval, goTo])

  const onDragStart = useCallback((clientX) => {
    startXRef.current = clientX
    setIsDragging(true)
    setPaused(true)
  }, [])

  const onDragMove = useCallback(
    (clientX) => {
      if (!isDragging) return
      setDragDelta(clientX - startXRef.current)
    },
    [isDragging],
  )

  const onDragEnd = useCallback(() => {
    if (!isDragging) return

    const width = viewportRef.current?.clientWidth || 1
    const threshold = Math.max(40, width * 0.12)

    if (dragDelta <= -threshold) {
      next()
    } else if (dragDelta >= threshold) {
      prev()
    }

    setDragDelta(0)
    setIsDragging(false)
    setPaused(false)
  }, [dragDelta, isDragging, next, prev])

  if (count === 0) return null

  return (
    <div
      ref={viewportRef}
      className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        onDragEnd()
        setPaused(false)
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false)
        }
      }}
      onMouseDown={(event) => onDragStart(event.clientX)}
      onMouseMove={(event) => onDragMove(event.clientX)}
      onMouseUp={onDragEnd}
      onTouchStart={(event) => onDragStart(event.touches[0].clientX)}
      onTouchMove={(event) => onDragMove(event.touches[0].clientX)}
      onTouchEnd={onDragEnd}
      onTouchCancel={onDragEnd}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          next()
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          prev()
        }
        if (event.key === 'Home') {
          event.preventDefault()
          goTo(0)
        }
        if (event.key === 'End') {
          event.preventDefault()
          goTo(count - 1)
        }
      }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos Skeepskool"
    >
      {/* Track */}
      <div
        aria-live={paused || !autoPlay ? 'polite' : 'off'}
        className={`flex ${isDragging ? '' : 'transition-transform duration-700 ease-out'}`}
        style={{ transform: `translateX(calc(-${index * 100}% + ${dragDelta}px))` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="min-w-full" aria-hidden={i !== index}>
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-72 w-full object-cover sm:h-96 lg:h-[30rem]"
              loading={i === 0 ? 'eager' : 'lazy'}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Gradient for control contrast */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark/40 to-transparent" />

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Photo précédente"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-royalBlue shadow-md transition-colors hover:bg-yellow"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        aria-label="Photo suivante"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-royalBlue shadow-md transition-colors hover:bg-yellow"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <button
        onClick={() => setAutoPlay((value) => !value)}
        aria-label={autoPlay ? 'Mettre en pause le carrousel' : 'Relancer le carrousel'}
        className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-royalBlue shadow-md transition-colors hover:bg-yellow"
      >
        {autoPlay ? 'Pause' : 'Play'}
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Aller à la photo ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-yellow' : 'w-2.5 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
