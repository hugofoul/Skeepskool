import {
  Waves,
  Star,
  Phone,
  CalendarCheck2,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'
import { useSurfConditions } from '../hooks/useSurfConditions.js'
import { images, carousel } from '../data/images.js'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import Carousel from '../components/Carousel.jsx'
import SEO from '../components/SEO.jsx'
import { CONTACT } from '../config/site.js'
import { buildSrcSet, HERO_SIZES } from '../utils/responsiveImage.js'

export default function Home() {
  const { t, lang } = useLang()
  const h = t.home
  const isFr = lang === 'fr'
  const isDe = lang === 'de'
  const pickLang = (frText, enText, deText) => (isFr ? frText : (isDe ? deText : enText))
  const heroTitleLines = isFr
    ? {
      top: "L'école de surf",
      middle: 'de la',
      bottom: 'Plage Centrale du Porge',
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
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const faqItems = [
    {
      question: {
        fr: 'Je n’ai jamais fait de surf, puis-je quand même prendre un cours chez vous ?',
        en: 'I have never surfed before. Can I still take a lesson with you?',
        de: 'Ich habe noch nie gesurft. Kann ich trotzdem einen Kurs bei euch machen?',
      },
      answer: {
        fr: 'Oui, bien sûr. Nos cours sont ouverts à tous, même si vous débutez complètement. On privilégie une progression simple, ludique et personnalisée, avec des conseils adaptés à votre niveau et du matériel qui facilite l’apprentissage dès la première séance.',
        en: 'Yes, absolutely. Our lessons are open to everyone, even complete beginners. We focus on simple, fun and personalized progression, with coaching adapted to your level and equipment that helps you learn from the first session. If you want to discuss your needs, contact us.',
        de: 'Ja, natürlich. Unsere Kurse sind für alle offen, auch für absolute Anfänger. Wir setzen auf eine einfache, spielerische und individuelle Progression, mit Tipps passend zu deinem Niveau und Material, das den Einstieg von der ersten Session an erleichtert. Wenn du Fragen hast, kontaktiere uns.',
      },
      links: [
        { to: '/ecole#valeurs', fr: 'Découvrir l\'école →', en: 'Discover ocean awareness →', de: 'Meeresverständnis entdecken →' },
        { to: '/cours', fr: 'Voir les formules →', en: 'See packages →', de: 'Pakete ansehen →' },
      ],
    },
    {
      question: {
        fr: 'Est-ce que je dois savoir nager ?',
        en: 'Should I know how to swim?',
        de: 'Sollte ich schwimmen koennen?',
      },
      answer: {
        fr: 'Si vous n\'avez pas peur de mettre la tête sous l’eau, vous pouvez venir jouer dans les vagues et découvrir l’Océan dans notre école de surf. L’apprentissage ludique permet à vos enfants dès 5 ans de s’initier en s’amusant dans des eaux peu profondes en toute sérénité. Le surf est la meilleure des activités pour découvrir l’Océan.',
        en: 'If putting your head under water does not scare you, you can come have fun in the waves and discover the ocean with us. Our playful teaching approach helps children from age 5 learn with confidence in shallow water. Surfing is one of the best ways to discover the ocean.',
        de: 'Wenn es dir nichts ausmacht, den Kopf unter Wasser zu haben, kannst du mit uns in den Wellen spielen und den Ozean entdecken. Unsere spielerische Lernmethode hilft Kindern ab 5 Jahren, in flachem Wasser sicher und mit Spaß einzusteigen. Surfen ist eine der besten Aktivitäten, um den Ozean kennenzulernen.',
      },
      link: { to: '/ecole', fr: 'En savoir plus sur l\'école →', en: 'Learn more about the school →', de: 'Mehr über die Schule →' },
    },
    {
      question: {
        fr: 'Les courants et les grandes marées sont-ils un danger pour l’apprentissage ?',
        en: 'Are currents and big tides dangerous for learning?',
        de: 'Sind Strömungen und große Gezeiten beim Lernen gefährlich?',
      },
      answer: {
        fr: 'Nos moniteurs analysent l’océan avant chaque session pour choisir la zone la plus adaptée au niveau du groupe. Le sens marin fait partie de notre pédagogie : comprendre les marées, lire les courants et reconnaître les zones à éviter permet d’apprendre dans de bonnes conditions, avec sérénité.',
        en: 'Our instructors assess the ocean before every session to choose the area that best matches the group level. Ocean awareness is part of our teaching: understanding tides, reading currents and identifying areas to avoid helps you learn in safe and comfortable conditions.',
        de: 'Unsere Trainer analysieren vor jeder Session den Ozean, um den Bereich zu wählen, der am besten zum Gruppenniveau passt. Meeresverständnis ist Teil unserer Pädagogik: Gezeiten verstehen, Strömungen lesen und kritische Zonen erkennen hilft beim sicheren und entspannten Lernen.',
      },
      links: [
        { to: '/ecole#valeurs', fr: 'Nos valeurs : le sens marin →', en: 'Our values: ocean awareness →', de: 'Unsere Werte: Meeresverständnis →' },
        { to: '/cours', fr: 'Voir nos formules →', en: 'See our packages →', de: 'Unsere Pakete ansehen →' },
      ],
    },
    {
      question: {
        fr: 'Peut-on payer sur place ?',
        en: 'Can I pay on site?',
        de: 'Kann ich vor Ort bezahlen?',
      },
      answer: {
        fr: 'Oui ! Vous pouvez régler sur place en espèces, virement bancaire, chèque ou avec des chèques vacances. Pour garantir votre place à l\'avance, le paiement par virement est recommandé.',
        en: 'Yes! You can pay on site in cash, by bank transfer, or with holiday vouchers (chèques vacances). To secure your spot in advance, payment by bank transfer or Paylib is recommended.',
        de: 'Ja! Du kannst vor Ort bar, per Überweisung oder mit Urlaubsgutscheinen bezahlen. Um deinen Platz zu sichern, empfehlen wir Überweisung im Voraus.',
      },
      link: { to: '/reserver', fr: 'Réserver et payer →', en: 'Book and pay →', de: 'Buchen und bezahlen →' },
    },
    {
      question: {
        fr: 'Peut-on louer du matériel sans prendre de cours ?',
        en: 'Can I rent equipment without taking a lesson?',
        de: 'Kann ich Material mieten, ohne einen Kurs zu buchen?',
      },
      answer: {
        fr: 'Oui, la location est ouverte à tous. Cependant, nous déconseillons fortement la location sans encadrement si vous avez moins de 10 séances avec un moniteur diplômé. En dessous de ce niveau, la pratique du surf peut être dangereuse pour vous et pour les autres surfeurs.',
        en: 'Yes, rental is open to everyone. However, we strongly advise against renting without supervision if you have fewer than 10 lessons with a qualified instructor. Below this level, surfing can be dangerous for yourself and for other surfers.',
        de: 'Ja, der Verleih ist für alle offen. Wir raten jedoch vom Surfen ohne Betreuung ab, wenn du weniger als 10 Kurseinheiten mit einem qualifizierten Lehrer hattest.',
      },
      link: { to: '/location', fr: 'Voir les tarifs location →', en: 'See rental prices →', de: 'Verleihpreise ansehen →' },
    },
  ]

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
          { hrefLang: 'x-default', path: '/' },
        ]}
        description={pickLang(
          "École de surf labellisée FFS à Le Porge Océan, Gironde. Cours collectifs et particuliers dès 5 ans, location de matériel. Moniteurs diplômés d'État. 50 min de Bordeaux.",
          'FFS-certified surf school at Le Porge Océan, Gironde. Group and private lessons from age 5, equipment rental. State-certified instructors. 50 min from Bordeaux.',
          'FFS-zertifizierte Surfschule in Le Porge Océan, Gironde. Gruppen- und Privatkurse ab 5 Jahren, Materialverleih, staatlich geprüfte Lehrer. 50 Minuten von Bordeaux.',
        )}
      />
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden sm:min-h-[88vh]">
        <img
          src={images.homeHero}
          srcSet={buildSrcSet(images.homeHero)}
          sizes={HERO_SIZES}
          alt="Surfeur à la plage du Porge Océan"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-royalBlue/50" />
        <div className="relative z-10 mx-auto max-w-4xl -translate-y-8 px-4 text-center text-white md:-translate-y-12 lg:-translate-y-24">
          <h1 className="home-hero-title-font mx-auto flex max-w-4xl flex-col items-center px-2 text-center text-[1.9rem] font-bold leading-[1.08] text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <>
              <span className="home-hero-line block w-full text-center" style={{ animationDelay: '0.05s' }}>{heroTitleLines.top}</span>
              <span className="home-hero-line mt-1 flex w-full flex-col items-center text-center sm:mt-1.5" style={{ animationDelay: '0.75s' }}>
                <span className="block text-[0.9rem] font-semibold text-white/92 sm:text-[1.05rem] md:text-[1.15rem] lg:text-[1.25rem]">{heroTitleLines.middle}</span>
                <span className="block whitespace-nowrap text-center">{heroTitleLines.bottom}</span>
              </span>
            </>
          </h1>
          {h.heroSubtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
              {h.heroSubtitle}
            </p>
          )}
          <p className="home-hero-subline mx-auto mt-0 max-w-xl px-2 text-base font-semibold leading-snug text-white/90 sm:whitespace-nowrap sm:text-xl sm:leading-normal" style={{ animationDelay: '1.55s' }}>
            {h.campingNotePrefix}
            <a
              href="https://camping-leporge.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-yellow transition-colors hover:text-white"
            >
              {h.campingNoteLink}
            </a>
            <span className="text-white/90">{h.campingNoteSuffix || ''}</span>
          </p>
          <div className="mt-14 flex w-full flex-col items-center justify-center gap-3 sm:mt-16 sm:flex-row sm:gap-6">
            <CTAButton
              to={lang === 'fr' ? '/reserver' : '/book'}
              aria-label={pickLang('Reserver un creneau de cours', 'Book a lesson slot', 'Einen Kurs-Slot buchen')}
              className="w-auto justify-center gap-1 px-2 py-1 text-xs font-semibold !bg-red !text-white !shadow-none hover:!bg-red/90 sm:gap-2 sm:!rounded-full sm:px-8 sm:py-4 sm:text-lg sm:font-bold sm:!shadow-lg"
            >
              <CalendarCheck2 className="h-4 w-4 sm:h-5 sm:w-5" />
              {h.heroCta}
            </CTAButton>
            <CTAButton
              href={`tel:${CONTACT.phonePrimary}`}
              aria-label={pickLang('Appeler Skeepskool', 'Call Skeepskool', 'Skeepskool anrufen')}
              className="w-auto justify-center gap-1 px-2 py-1 text-xs font-semibold !bg-white !text-royalBlue !shadow-none hover:!bg-yellow sm:gap-2 sm:!rounded-full sm:px-8 sm:py-4 sm:text-lg sm:font-bold sm:!shadow-lg"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              {h.heroSecondaryCta}
            </CTAButton>
          </div>
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

      {/* ---------------- HIGHLIGHTS ---------------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {h.highlights.slice(0, 2).map((card, i) => {
              const visualSrc = i === 0 ? '/images/charliecours.webp' : '/images/ecole.jpeg'
              return (
                <Reveal
                  key={card.title}
                  delay={i * 120}
                  className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={visualSrc}
                      srcSet={buildSrcSet(visualSrc)}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      alt={card.title}
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </div>
                  <div className="flex min-h-[220px] flex-col p-6">
                    <h3 className="text-2xl font-black text-royalBlue">{card.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-dark/75">{card.text}</p>
                    {i === 0 && (
                      <div className="mt-5">
                        <CTAButton to="/cours" className="px-4 py-2 text-sm">
                          {t.learnMore}
                        </CTAButton>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="mt-5">
                        <CTAButton to="/location" className="px-4 py-2 text-sm">
                          {t.learnMore}
                        </CTAButton>
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
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

      {/* ---------------- FAQ ---------------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <h2 className="text-3xl font-black text-royalBlue sm:text-4xl">
              {pickLang('Questions fréquentes', 'FAQ', 'Häufige Fragen')}
            </h2>
            <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>

          <div className="mt-12 space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <Reveal key={item.question.en} delay={index * 60}>
                  <div className="border-l-4 border-yellow py-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-3 text-left transition hover:text-royalBlue"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base font-bold text-dark sm:text-lg">
                        {pickLang(item.question.fr, item.question.en, item.question.de ?? item.question.en)}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-yellow transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 pb-4">
                        <p className="leading-relaxed text-dark/80">
                          {pickLang(item.answer.fr, item.answer.en, item.answer.de ?? item.answer.en)}
                        </p>
                        {item.link && (
                          <Link
                            to={item.link.to}
                            className="mt-3 inline-block text-red font-semibold hover:underline"
                          >
                            {pickLang(item.link.fr, item.link.en, item.link.de ?? item.link.en)}
                          </Link>
                        )}
                        {item.links && item.links.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-3">
                            {item.links.map((link) => (
                              <Link
                                key={`${link.to}-${link.en}`}
                                to={link.to}
                                className="inline-block text-red font-semibold hover:underline"
                              >
                                {pickLang(link.fr, link.en, link.de ?? link.en)}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
