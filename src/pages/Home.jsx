import {
  Waves,
  Star,
  Phone,
  CalendarCheck2,
  MapPin,
  Car,
  ParkingCircle,
  Tent,
  ExternalLink,
  Plus,
  Minus,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'
import { useSurfConditions } from '../hooks/useSurfConditions.js'
import { images, carousel, teamPhotos } from '../data/images.js'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import Carousel from '../components/Carousel.jsx'
import SEO from '../components/SEO.jsx'
import { CONTACT, MAPS } from '../config/site.js'
import { buildSrcSet, HERO_SIZES, GRID_CARD_SIZES } from '../utils/responsiveImage.js'

const teamImages = [teamPhotos.pierre, teamPhotos.mariane, teamPhotos.manoa, teamPhotos.hugo]
const teamImagePositionByKey = {
  pierre: 'object-cover object-top',
  mariane: 'object-cover object-[50%_58%]',
  manua: 'object-cover object-center',
  hugo: 'object-cover object-center',
  oscar: 'object-cover object-[50%_18%]',
  alioune: 'object-cover object-center',
  alexandre: 'object-cover object-[50%_18%]',
}
const teamImageScaleByKey = {
  mariane: 'scale-105 group-hover:scale-110',
}
const teamPortraits = {
  pierre: teamPhotos.pierre,
  mariane: teamPhotos.mariane,
  manua: teamPhotos.manoa,
  hugo: teamPhotos.hugo,
  oscar: teamPhotos.oscar,
  alioune: teamPhotos.alioune,
  alexandre: teamPhotos.alexandre,
}
const HOME_MAP_SRC =
  'https://www.google.com/maps?q=Skeepskool+Ecole+de+Surf+Plage+Centrale+du+Porge&z=14&output=embed'

export default function Home() {
  const { t, lang } = useLang()
  const h = t.home
  const s = t.school
  const booking = t.booking
  const rental = t.rental
  const isFr = lang === 'fr'
  const isDe = lang === 'de'
  const pickLang = (frText, enText, deText) => (isFr ? frText : (isDe ? deText : enText))
  const bookingPath = lang === 'fr' ? '/reserver' : '/book'
  const lessonsPath = lang === 'fr' ? '/cours' : '/lessons'
  const lessonsPricingPath = `${lessonsPath}#formules-tarifs`
  const schedulePath = lang === 'fr' ? '/horaires' : '/schedule'
  const contactFindUsPath = '/contact#comment-nous-trouver'
  const rentalPath = lang === 'fr' ? '/location' : '/rental'
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [showAllPracticalFaq, setShowAllPracticalFaq] = useState(false)

  const parseEuroPrice = (value) => {
    const parsed = Number.parseFloat(String(value || '').replace(',', '.').replace(/[^0-9.]/g, ''))
    return Number.isFinite(parsed) ? parsed : null
  }

  const formatPrice = (value) => {
    if (!Number.isFinite(value)) return h?.offers?.priceFallback || ''
    const locale = lang === 'fr' ? 'fr-FR' : (lang === 'de' ? 'de-DE' : 'en-GB')
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value)
  }

  const packagePrices = new Map((booking.packages || []).map((pkg) => [pkg.value, pkg.price]))
  const rentalRows = rental.rows || []
  const surfBoardTwoHours = parseEuroPrice(rentalRows[0]?.prices?.[0])
  const wetsuitTwoHours = parseEuroPrice(rentalRows[2]?.prices?.[0])
  const multiDaySurf = parseEuroPrice(rentalRows[0]?.prices?.[3])

  const homeCourseCards = (h.offers?.cards || []).map((card) => ({
    ...card,
    price: packagePrices.get(card.packageValue) ?? null,
  }))

  const homeRentalCards = [
    {
      ...h.rentalShowcase.cards[0],
      price: surfBoardTwoHours,
    },
    {
      ...h.rentalShowcase.cards[1],
      price:
        Number.isFinite(surfBoardTwoHours) && Number.isFinite(wetsuitTwoHours)
          ? surfBoardTwoHours + wetsuitTwoHours
          : null,
    },
    {
      ...h.rentalShowcase.cards[2],
      price: multiDaySurf,
    },
  ]

  const infoIcons = {
    map: MapPin,
    drive: Car,
    city: MapPin,
    parking: ParkingCircle,
    camping: Tent,
  }

  const homeFaqEntries = (h.practical?.faqItems || [])
    .filter((item) => item?.question && item?.answer)
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))

  const homeOffers = [
    ...homeCourseCards,
    ...homeRentalCards,
  ]
    .filter((item) => Number.isFinite(item.price))
    .map((item) => ({
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: item.price,
      availability: 'https://schema.org/InStock',
      url: item.packageValue ? `${bookingPath}?package=${item.packageValue}` : rentalPath,
      itemOffered: {
        '@type': 'Service',
        name: item.title,
        description: item.description,
      },
    }))

  const homeStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: homeFaqEntries,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: lang === 'fr' ? 'Cours et location Skeepskool' : (lang === 'de' ? 'Kurse und Verleih Skeepskool' : 'Skeepskool lessons and rental'),
      serviceType: lang === 'fr' ? 'Cours de surf et location de matériel' : (lang === 'de' ? 'Surfkurse und Materialverleih' : 'Surf lessons and equipment rental'),
      areaServed: 'Le Porge Océan',
      offers: homeOffers,
    },
  ]
  const heroTitleLines = isFr
    ? {
      top: "L'école de surf",
      middle: 'de la',
      bottom: 'Plage Centrale du Porge',
      bottomMobile: ['Plage Centrale', 'du Porge'],
    }
    : (isDe
      ? {
        top: 'Surfschule',
        middle: 'am',
        bottom: 'Zentralstrand Le Porge',
      }
      : {
        top: 'Surf school',
        middle: 'at',
        bottom: 'Le Porge Central Beach',
      })
  const surfConditions = useSurfConditions({
    lang,
    fallbackParagraphs: h.surfConditions.fallbackParagraphs,
  })

  return (
    <div className="overflow-x-hidden">
      <SEO
        path="/"
        alternates={[
          { hrefLang: 'fr-FR', path: '/' },
          { hrefLang: 'en', path: '/' },
          { hrefLang: 'de', path: '/' },
          { hrefLang: 'x-default', path: '/' },
        ]}
        description={pickLang(
          "École de surf labellisée FFS à Le Porge Océan, Gironde. Cours collectifs et particuliers dès 5 ans, location de matériel. Moniteurs diplômés d'État. 50 min de Bordeaux.",
          'FFS-certified surf school at Le Porge Océan, Gironde. Group and private lessons from age 5, equipment rental. State-certified instructors. 50 min from Bordeaux.',
          'FFS-zertifizierte Surfschule in Le Porge Océan, Gironde. Gruppen- und Privatkurse ab 5 Jahren, Materialverleih, staatlich geprüfte Lehrer. 50 Minuten von Bordeaux.',
        )}
        structuredData={homeStructuredData}
      />
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden sm:min-h-[88vh]">
        <img
          src={images.homeHero}
          srcSet={buildSrcSet(images.homeHero)}
          sizes={HERO_SIZES}
          alt="Surfeur à la plage du Porge Océan"
          className="absolute inset-0 h-full w-full rotate-[4deg] scale-[1.46] object-cover object-[96%_center] md:scale-[1.32]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="relative z-10 mx-auto max-w-4xl -translate-y-20 px-4 text-center text-royalBlue sm:-translate-y-8 md:-translate-y-12 lg:-translate-y-24">
          <h1 className="home-hero-title-font mx-auto flex max-w-4xl flex-col items-center px-2 text-center text-[2.3rem] font-bold leading-[1.08] text-royalBlue sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <>
              <span className="home-hero-line block w-full text-center" style={{ animationDelay: '0.05s' }}>{heroTitleLines.top}</span>
              <span className="home-hero-line mt-1 flex w-full flex-col items-center text-center sm:mt-1.5" style={{ animationDelay: '0.75s' }}>
                <span className="block text-[0.9rem] font-semibold text-royalBlue sm:text-[1.05rem] md:text-[1.15rem] lg:text-[1.25rem]">{heroTitleLines.middle}</span>
                <span className="block text-center">
                  {heroTitleLines.bottomMobile ? (
                    <>
                      <span className="sm:hidden">
                        {heroTitleLines.bottomMobile.map((line, i) => (
                          <span key={i} className="block">{line}</span>
                        ))}
                      </span>
                      <span className="hidden whitespace-nowrap sm:inline">{heroTitleLines.bottom}</span>
                    </>
                  ) : heroTitleLines.bottom}
                </span>
              </span>
            </>
          </h1>
          {h.heroSubtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-royalBlue sm:text-lg">
              {h.heroSubtitle}
            </p>
          )}
          <p className="home-hero-subline mx-auto mt-4 max-w-xl px-2 text-base font-semibold leading-snug text-royalBlue sm:mt-0 sm:whitespace-nowrap sm:text-xl sm:leading-normal" style={{ animationDelay: '1.55s' }}>
            {h.campingNotePrefix}
            <a
              href="https://camping-leporge.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold !text-red transition-colors hover:!text-red active:!text-red visited:!text-red"
            >
              {h.campingNoteLink}
            </a>
            <span className="block sm:hidden" />
            <span className="text-royalBlue">{h.campingNoteSuffix || ''}</span>
          </p>
          <div className="mt-14 w-full sm:mt-16 sm:translate-y-16 lg:translate-y-36">
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-12">
              <CTAButton
                to={lang === 'fr' ? '/reserver' : '/book'}
                aria-label={pickLang('Reserver un creneau de cours', 'Book a lesson slot', 'Einen Kurs-Slot buchen')}
                className="w-auto justify-center gap-2 px-4 py-3 text-base font-semibold !bg-red !text-white !shadow-none hover:!bg-red/90 sm:gap-3 sm:!rounded-full sm:px-12 sm:py-6 sm:text-2xl sm:font-bold sm:!shadow-lg"
              >
                <CalendarCheck2 className="h-6 w-6 sm:h-7 sm:w-7" />
                {h.heroCta}
              </CTAButton>
              <CTAButton
                href={`tel:${CONTACT.phonePrimary}`}
                aria-label={pickLang('Appeler Skeepskool', 'Call Skeepskool', 'Skeepskool anrufen')}
                className="w-auto justify-center gap-2 px-4 py-3 text-base font-semibold !bg-white !text-royalBlue !shadow-none hover:!bg-yellow sm:gap-3 sm:!rounded-full sm:px-12 sm:py-6 sm:text-2xl sm:font-bold sm:!shadow-lg"
              >
                <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
                {pickLang('Appeler', 'Call', 'Anrufen')}
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="absolute left-3 top-24 z-20 sm:left-6 sm:top-20 lg:left-10 lg:top-16">
          <p className="inline-flex items-center rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-royalBlue ring-1 ring-royalBlue/20 backdrop-blur-sm sm:text-xs">
            {pickLang(
              'Ouvert d\'avril à novembre',
              'Open from April to November',
              'Geöffnet von April bis November',
            )}
          </p>
        </div>

        <div className="absolute bottom-8 right-4 z-10 sm:bottom-2 sm:right-6 lg:-bottom-2 lg:right-10">
          <span className="flex h-44 w-44 items-center justify-center sm:h-56 sm:w-56 lg:h-72 lg:w-72">
            <img
              src="/images/Web - Logo label EFSurf neutre_blanc-paysage.png"
              alt={lang === 'fr' ? 'Logo EFSurf' : 'EFSurf logo'}
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </span>
        </div>

        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center text-white/90">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
            {pickLang('Faites defiler', 'Scroll', 'Scrollen')}
          </p>
          <span className="mt-1 block text-sm leading-none animate-bounce">↓</span>
        </div>
      </section>

      {/* ---------------- COURSES ---------------- */}
      <section className="bg-[#f7f9fc] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-royalBlue/80">
              {h.offers.eyebrow}
            </p>
            <h2 className="mt-3 text-center text-3xl font-black text-royalBlue sm:text-4xl">
              {h.offers.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm font-semibold text-dark/70 sm:text-base">
              {pickLang(
                'Toutes nos formules sont valables 1 an à partir de la date d\'achat.',
                'All our packages are valid for 1 year from the date of purchase.',
                'Alle unsere Pakete sind ab Kaufdatum 1 Jahr gültig.',
              )}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {homeCourseCards.map((card, index) => {
              const isFeatured = Boolean(card.featuredLabel)
              return (
                <Reveal
                  key={card.title}
                  delay={index * 90}
                  className={`flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5 ${isFeatured ? 'xl:-translate-y-1 xl:ring-2 xl:ring-red/20' : ''}`}
                >
                  {isFeatured ? (
                    <div className="bg-red px-5 py-2 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-white">
                      {card.featuredLabel}
                    </div>
                  ) : (
                    <div className="px-5 pt-5">
                      <span className="inline-flex rounded-full bg-royalBlue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-royalBlue">
                        {card.badge}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <h3 className="text-2xl font-black text-royalBlue">{card.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-dark/70">{card.subtitle}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-dark/75">{card.description}</p>

                    <div className="mt-6">
                      {card.pricePrefix ? (
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-dark/55">{card.pricePrefix}</p>
                      ) : null}
                      <p className="mt-1 text-4xl font-black text-red">{formatPrice(card.price)}</p>
                    </div>

                    <CTAButton
                      to={`${bookingPath}?package=${card.packageValue}`}
                      aria-label={`${card.cta} ${card.title}`}
                      className="mt-6 w-full justify-center"
                    >
                      {card.cta}
                    </CTAButton>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={120} className="mt-8 text-center">
            <Link to={lessonsPricingPath} className="text-base font-extrabold text-royalBlue transition-colors hover:text-red">
              {h.offers.viewAllCta}
            </Link>
          </Reveal>

          <Reveal delay={160} className="mt-4 text-center">
            <Link
              to={schedulePath}
              className="text-sm font-bold uppercase tracking-[0.12em] text-red transition-colors hover:text-royalBlue"
            >
              {pickLang('Voir les horaires de cours de la semaine', 'See this week\'s lesson schedule', 'Wochenplan der Surfkurse ansehen')}
            </Link>
          </Reveal>

        </div>
      </section>

      {/* ---------------- RENTAL TEASER ---------------- */}
      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl border border-black/10 bg-lightGray shadow-md">
            <div className="grid items-stretch md:grid-cols-[1fr_1.1fr]">
              <div className="relative min-h-[220px] md:min-h-[260px]">
                <img
                  src={images.contactHero}
                  srcSet={buildSrcSet(images.contactHero)}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  alt={pickLang('École de surf Skeepskool', 'Skeepskool surf school', 'Skeepskool Surfschule')}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
              </div>

              <div className="flex flex-col justify-center gap-4 px-6 py-7 sm:px-8 sm:py-9">
                <h2 className="text-2xl font-black text-royalBlue sm:text-3xl">
                  {h.highlights[1]?.title || h.rentalShowcase.title}
                </h2>
                <p className="text-sm leading-relaxed text-dark/75 sm:text-base">
                  {h.highlights[1]?.text || h.rentalShowcase.intro}
                </p>

                <div className="pt-1">
                  <CTAButton to={rentalPath} className="justify-center px-6 py-3">
                    {h.rentalShowcase.viewAllCta}
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- SCHOOL ADVANTAGES ---------------- */}
      <section className="relative overflow-hidden bg-royalBlue py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-24 top-8 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  {pickLang('Le spot du porge', 'Le Porge spot', 'Der Spot in Le Porge')}
                </p>
                <h3 className="mt-2 text-3xl font-black text-white sm:text-4xl">{s.beachAdvantagesTitle}</h3>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-2xl bg-yellow px-5 py-2.5 text-sm font-black uppercase tracking-[0.06em] text-royalBlue shadow-[0_10px_25px_rgba(0,0,0,0.28)] ring-2 ring-white/70 sm:px-6 sm:py-3 sm:text-base">
                <Star className="h-4 w-4 fill-royalBlue text-royalBlue" aria-hidden="true" />
                {s.coachingExperience}
              </span>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <Reveal className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-white/20 lg:col-span-5">
              <div className="relative h-full min-h-[250px]">
                <img
                  src={images.schoolSpot}
                  srcSet={buildSrcSet(images.schoolSpot)}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  alt={s.beachAdvantagesTitle}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 backdrop-blur-sm">
                  <p className="text-sm font-bold text-royalBlue sm:text-base">
                    {pickLang(
                      'Un cadre naturel unique entre dune, forêt et océan.',
                      'A unique natural setting between dune, forest and ocean.',
                      'Ein einzigartiges Naturumfeld zwischen Düne, Wald und Ozean.',
                    )}
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-7">
              <div className="mt-4 flex flex-col gap-3 sm:mt-6">
              {s.beachAdvantagesItems.map((item, index) => (
                <Reveal
                  key={item}
                  delay={index * 80}
                  className="w-full px-1 py-1 text-white"
                >
                  <p className="flex items-start gap-2 text-lg font-semibold leading-relaxed sm:text-xl lg:text-2xl">
                    <span aria-hidden="true" className="mt-[1px] text-xl text-yellow sm:text-2xl lg:text-3xl">→</span>
                    <span>{item}</span>
                  </p>
                </Reveal>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PHOTO CAROUSEL ---------------- */}
      <section className="bg-lightGray py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Carousel slides={carousel} />
          </Reveal>
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <p className="max-w-2xl text-sm font-medium text-dark/70 sm:text-base">
              {pickLang(
                'Envie d’en voir plus ? Ouvrez l’album photo pour découvrir le spot, les sessions et l’ambiance à l’eau.',
                'Want to see more? Open the photo album to discover the spot, sessions and life in the water.',
                'Lust auf mehr? Öffne das Fotoalbum und entdecke den Spot, die Sessions und das Leben im Wasser.',
              )}
            </p>
            <CTAButton
              href="/album-photo"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black/10 !bg-white px-5 py-2.5 text-sm font-medium !text-royalBlue shadow-sm shadow-black/5 hover:-translate-y-0.5 hover:border-yellow hover:!bg-yellow hover:shadow-md"
            >
              {pickLang('Voir l’album photo', 'View photo album', 'Fotoalbum ansehen')}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ---------------- SCHOOL TEAM ---------------- */}
      <section id="equipe" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-black text-royalBlue sm:text-4xl">
              {s.teamTitle}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
            <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-dark/75">
              {s.teamSubtitle}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {s.team.map((member, index) => (
              (() => {
                const imageSrc = teamPortraits[member.image] || teamImages[index % teamImages.length]
                const imagePosition = teamImagePositionByKey[member.image] || 'object-cover object-center'
                const imageScale = teamImageScaleByKey[member.image] || 'group-hover:scale-105'

                return (
              <Reveal
                key={member.name}
                delay={(index % 4) * 100}
                className="group overflow-hidden rounded-2xl bg-lightGray shadow-md ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={imageSrc}
                    srcSet={buildSrcSet(imageSrc)}
                    sizes={GRID_CARD_SIZES}
                    alt={member.name}
                    className={`h-full w-full ${imagePosition} ${imageScale} transition-transform duration-500`}
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-yellow px-3 py-1 text-xs font-bold text-royalBlue">
                    {member.role}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-royalBlue">{member.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark/75">{member.text}</p>
                </div>
              </Reveal>
                )
              })()
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SURF CONDITIONS ---------------- */}
      {surfConditions.shouldDisplay && (
        <section className="bg-lightGray py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Reveal className="rounded-3xl border-l-4 border-red bg-white p-7 shadow-lg ring-1 ring-black/5 sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-royalBlue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-royalBlue">
                <Waves className="h-4 w-4 text-red" />
                {h.surfConditions.badge}
              </span>
              <h2 className="mt-5 text-3xl font-black text-royalBlue sm:text-4xl">
                {h.surfConditions.title}
              </h2>
              <span className="mt-3 block h-1 w-16 rounded bg-yellow" />

              <div className="mt-6 space-y-4">
                {surfConditions.paragraphs.map((paragraph, index) => (
                  <p key={`surf-condition-${index}`} className="text-base leading-relaxed text-dark/80 sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-black text-royalBlue sm:text-4xl">
              {h.testimonialsTitle}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {h.testimonials.map((rev, i) => (
              <Reveal
                key={rev.name}
                delay={i * 120}
                className="rounded-2xl border-l-4 border-red bg-lightGray p-6 shadow-sm"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-5 w-5 fill-yellow text-yellow" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-dark/80">“{rev.text}”</p>
                <p className="mt-4 font-bold text-royalBlue">{rev.name}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PRACTICAL / FAQ / MAP ---------------- */}
      <section className="bg-[#f7f9fc] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="divide-y divide-black/10 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              <article className="flex h-full flex-col p-6 sm:p-7">
                <h2 className="text-2xl font-black text-royalBlue">{h.practical.infoTitle}</h2>
                <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
                <Link
                  to={contactFindUsPath}
                  className="mt-4 inline-flex items-center font-bold text-red transition-colors hover:text-royalBlue"
                >
                  {pickLang('Aller à Comment nous trouver', 'Go to How to find us', 'Zu So findest du uns')}
                </Link>
                <ul className="mt-6 space-y-4">
                  {h.practical.infoItems.map((item) => {
                    const Icon = infoIcons[item.icon] || MapPin
                    return (
                      <li key={item.title} className="flex items-start gap-3">
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-red" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold text-dark sm:text-base">{item.title}</p>
                          {item.subtitle ? <p className="text-sm text-dark/70">{item.subtitle}</p> : null}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </article>

              <article className="flex h-full flex-col p-6 sm:p-7">
                <h2 className="text-2xl font-black text-royalBlue">{h.practical.faqTitle}</h2>
                <span className="mt-3 block h-1 w-16 rounded bg-yellow" />

                <div className="mt-5 divide-y divide-black/10">
                  {h.practical.faqItems.map((item, index) => {
                    const isOpen = showAllPracticalFaq || openFaqIndex === index
                    const panelId = `home-practical-faq-panel-${index}`
                    const buttonId = `home-practical-faq-button-${index}`

                    return (
                      <div key={item.question} className="py-2">
                        <button
                          id={buttonId}
                          type="button"
                          onClick={() => {
                            if (showAllPracticalFaq) setShowAllPracticalFaq(false)
                            setOpenFaqIndex(isOpen && !showAllPracticalFaq ? null : index)
                          }}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              if (showAllPracticalFaq) setShowAllPracticalFaq(false)
                              setOpenFaqIndex(isOpen && !showAllPracticalFaq ? null : index)
                            }
                          }}
                          className="flex w-full items-center justify-between gap-3 py-2 text-left"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                        >
                          <span className="text-sm font-bold text-dark sm:text-base">{item.question}</span>
                          {isOpen ? (
                            <Minus className="h-4 w-4 shrink-0 text-red" aria-hidden="true" />
                          ) : (
                            <Plus className="h-4 w-4 shrink-0 text-royalBlue" aria-hidden="true" />
                          )}
                        </button>

                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <p className="pb-2 pr-6 text-sm leading-relaxed text-dark/75">{item.answer}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllPracticalFaq(true)}
                  className="mt-5 inline-flex items-center font-bold text-royalBlue transition-colors hover:text-red"
                >
                  {h.practical.allQuestionsCta}
                </button>
              </article>

              <article className="flex h-full flex-col p-6 sm:p-7">
                <h2 className="text-2xl font-black text-royalBlue">{h.practical.mapTitle}</h2>
                <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
                <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-black/10">
                  <iframe
                    title={h.practical.mapFrameTitle}
                    src={HOME_MAP_SRC}
                    className="h-64 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <a
                  href={MAPS.addressSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-red px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-yellow hover:text-royalBlue"
                >
                  {h.practical.itineraryCta}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
