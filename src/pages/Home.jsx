import {
  Waves,
  LifeBuoy,
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

const highlightIcons = [Waves, LifeBuoy, null]

export default function Home() {
  const { t, lang } = useLang()
  const h = t.home
  const heroSlogan = "Apprendre le surf dans les règles de l'art"
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const faqItems = [
    {
      question: {
        fr: 'Quand faut-il arriver avant le cours ?',
        en: 'When should I arrive before the lesson?',
      },
      answer: {
        fr: 'Présentez-vous 20 minutes avant le début du cours.',
        en: 'Please arrive 20 minutes before the lesson starts.',
      },
    },
    {
      question: {
        fr: 'Le premier cours se passe comment ?',
        en: 'What happens during the first lesson?',
      },
      answer: {
        fr: 'Pour un premier cours, le temps sur le sable est plus long (bases et sécurité).',
        en: 'For a first lesson, more time is spent on the sand covering the basics and safety.',
      },
    },
    {
      question: {
        fr: 'Comment sont formés les groupes ?',
        en: 'How are groups formed?',
      },
      answer: {
        fr: 'Les groupes sont constitués par niveau pour une progression optimale, et limités à 8 personnes maximum.',
        en: 'Groups are formed by level for optimal progression, and limited to 8 people maximum.',
      },
    },
    {
      question: {
        fr: 'Où voir les horaires mis à jour ?',
        en: 'Where can I see the updated schedule?',
      },
      answer: {
        fr: 'Les horaires sont publiés en temps réel sur la communauté WhatsApp.',
        en: 'The schedule is published in real time on the WhatsApp community.',
      },
      link: { to: '/horaires', fr: 'Voir les horaires →', en: 'See schedule →' },
    },
    {
      question: {
        fr: 'Que faut-il prévoir avant le cours ?',
        en: 'What should I bring to the lesson?',
      },
      answer: {
        fr: 'Arrivez 20 minutes avant avec votre maillot de bain, de l\'eau et de la crème solaire.',
        en: 'Arrive 20 minutes early with your swimsuit, water, and sunscreen.',
      },
    },
    {
      question: {
        fr: 'Quels documents faut-il apporter ?',
        en: 'What documents do I need to bring?',
      },
      answer: {
        fr: 'Pensez à apporter votre carte d\'identité ainsi que votre maillot de bain, de l\'eau et de la crème solaire.',
        en: 'Please bring your ID card along with your swimsuit, water, and sunscreen.',
      },
    },
    {
      question: {
        fr: 'Faut-il savoir nager ?',
        en: 'Do I need to know how to swim?',
      },
      answer: {
        fr: 'Il est recommandé de savoir nager. Une aisance dans l\'eau est nécessaire pour pratiquer le surf en toute sécurité.',
        en: 'Swimming ability is recommended. Feeling comfortable in the water is essential to surf safely.',
      },
      link: { to: '/ecole', fr: 'En savoir plus sur l\'école →', en: 'Learn more about the school →' },
    },
    {
      question: {
        fr: 'Que se passe-t-il si les conditions sont mauvaises ?',
        en: 'What happens if conditions are bad?',
      },
      answer: {
        fr: 'En cas de conditions dangereuses, le cours est reporté ou remboursé. Nous vous prévenons dès que possible.',
        en: 'If conditions are unsafe, the lesson is rescheduled or refunded. We notify you as soon as possible.',
      },
      link: { to: '/contact', fr: 'Nous contacter →', en: 'Contact us →' },
    },
    {
      question: {
        fr: 'Peut-on payer sur place ?',
        en: 'Can I pay on site?',
      },
      answer: {
        fr: 'Oui ! Vous pouvez régler sur place en espèces, par virement bancaire ou avec des chèques vacances. Pour garantir votre place à l\'avance, le paiement par virement ou Paylib est recommandé.',
        en: 'Yes! You can pay on site in cash, by bank transfer, or with holiday vouchers (chèques vacances). To secure your spot in advance, payment by bank transfer or Paylib is recommended.',
      },
      link: { to: '/reserver', fr: 'Réserver et payer →', en: 'Book and pay →' },
    },
    {
      question: {
        fr: 'Combien de personnes par groupe ?',
        en: 'How many people per group?',
      },
      answer: {
        fr: 'Les groupes sont limités à 8 personnes maximum pour garantir un encadrement de qualité.',
        en: 'Groups are limited to 8 people maximum to ensure quality supervision.',
      },
      link: { to: '/cours', fr: 'Voir les formules →', en: 'See packages →' },
    },
    {
      question: {
        fr: 'Peut-on louer du matériel sans prendre de cours ?',
        en: 'Can I rent equipment without taking a lesson?',
      },
      answer: {
        fr: 'Oui, la location est ouverte à tous. Cependant, nous déconseillons fortement la location sans encadrement si vous avez moins de 10 heures de cours avec un moniteur diplômé. En dessous de ce niveau, la pratique du surf peut être dangereuse pour vous et pour les autres surfeurs.',
        en: 'Yes, rental is open to everyone. However, we strongly advise against renting without supervision if you have fewer than 10 hours of lessons with a qualified instructor. Below this level, surfing can be dangerous for yourself and for other surfers.',
      },
      link: { to: '/location', fr: 'Voir les tarifs location →', en: 'See rental prices →' },
    },
  ]

  const surfConditions = useSurfConditions({
    lang,
    fallbackParagraphs: h.surfConditions.fallbackParagraphs,
  })

  return (
    <div>
      <SEO
        path="/"
        alternates={[
          { hrefLang: 'fr-FR', path: '/' },
          { hrefLang: 'en', path: '/' },
          { hrefLang: 'x-default', path: '/' },
        ]}
        description={lang === 'fr'
          ? "École de surf labellisée FFS à Le Porge Océan, Gironde. Cours collectifs et particuliers dès 5 ans, location de matériel. Moniteurs diplômés d'État. 50 min de Bordeaux."
          : "FFS-certified surf school at Le Porge Océan, Gironde. Group and private lessons from age 5, equipment rental. State-certified instructors. 50 min from Bordeaux."}
      />
      {/* ---------------- HERO ---------------- */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
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
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <div className="mx-auto max-w-3xl rounded-2xl bg-black/20 px-5 py-4 shadow-xl ring-1 ring-white/25 backdrop-blur-[2px] sm:px-8 sm:py-6">
            <h1 className="animate-fadeInUp mx-auto text-3xl font-bold leading-[1.35] tracking-[0.01em] text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)] md:text-5xl">
              {heroSlogan}
            </h1>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
            {lang === 'fr'
              ? h.heroSubtitle
              : '40 m north of the main access to Le Porge central beach, our school welcomes you at the foot of the dune and pine forest for surf lessons at the gates of Bordeaux.'}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-white/85 sm:text-base">
            {h.campingNotePrefix}
            <a
              href="https://camping-leporge.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white transition-colors hover:text-yellow"
            >
              {h.campingNoteLink}
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CTAButton
              to={lang === 'fr' ? '/reserver' : '/book'}
              aria-label={lang === 'fr' ? 'Reserver un creneau de cours' : 'Book a lesson slot'}
              className="px-6 py-3"
            >
              <CalendarCheck2 className="h-5 w-5" />
              {h.heroCta}
            </CTAButton>
            <CTAButton
              href={`tel:${CONTACT.phonePrimary}`}
              aria-label={lang === 'fr' ? 'Appeler Skeepskool' : 'Call Skeepskool'}
              className="bg-white px-6 py-3 !text-royalBlue hover:bg-yellow"
            >
              <Phone className="h-5 w-5" />
              {h.heroSecondaryCta}
            </CTAButton>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {h.heroTrustItems.map((item) => (
              <span
                key={item}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center text-white/90">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
            {lang === 'fr' ? 'Faites defiler' : 'Scroll'}
          </p>
          <span className="mt-1 block text-sm leading-none animate-bounce">↓</span>
        </div>
      </section>

      {/* ---------------- HIGHLIGHTS ---------------- */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {h.highlights.map((card, i) => {
              const Icon = highlightIcons[i]
              return (
                <Reveal
                  key={card.title}
                  delay={i * 120}
                  className="group rounded-2xl border-b-4 border-red bg-white p-8 shadow-md ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
                >
                  {i === 2 ? (
                    <img
                      src="/images/ffs-officiel-portrait.png"
                      alt={lang === 'fr' ? 'Logo École Française de Surf' : 'French Surf School logo'}
                      className="h-12 w-12 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <Icon className="h-12 w-12 text-royalBlue" strokeWidth={2} />
                  )}
                  <h3 className="mt-4 text-xl font-extrabold text-royalBlue">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark/75">{card.text}</p>
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
              {lang === 'fr'
                ? 'Envie d’en voir plus ? Ouvrez l’album photo pour découvrir le spot, les sessions et l’ambiance à l’eau.'
                : 'Want to see more? Open the photo album to discover the spot, sessions and life in the water.'}
            </p>
            <CTAButton
              href="/album-photo"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-black/10 !bg-white px-5 py-2.5 text-sm font-medium !text-royalBlue shadow-sm shadow-black/5 hover:-translate-y-0.5 hover:border-yellow hover:!bg-yellow hover:shadow-md"
            >
              {lang === 'fr' ? 'Voir l’album photo' : 'View photo album'}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT SNIPPET ---------------- */}
      <section className="bg-royalBlue py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-block h-1 w-16 rounded bg-yellow" />
            <h2 className="mt-6 text-3xl font-black sm:text-4xl">{h.aboutTitle}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
              {h.aboutText}
            </p>
            <div className="mt-8">
              <CTAButton to="/ecole" className="bg-yellow text-royalBlue hover:bg-white">
                {t.learnMore}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- SURF CONDITIONS ---------------- */}
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

      {/* ---------------- GOOGLE REVIEWS CTA ---------------- */}
      <section className="bg-royalBlue py-14 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-yellow/10 shadow-lg ring-1 ring-yellow/20">
            <div className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
              <div className="flex gap-1 shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow text-yellow" />
                ))}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white">{h.reviewsTitle}</h3>
                <p className="mt-2 text-sm text-white/85">{h.reviewsText}</p>
              </div>
              <CTAButton
                href={h.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-yellow text-royalBlue hover:bg-white"
              >
                <Star className="h-4 w-4" />
                {h.reviewsCta}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>

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
              {lang === 'fr' ? 'Questions fréquentes' : 'FAQ'}
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
                        {lang === 'fr' ? item.question.fr : item.question.en}
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
                          {lang === 'fr' ? item.answer.fr : item.answer.en}
                        </p>
                        {item.link && (
                          <Link
                            to={item.link.to}
                            className="mt-3 inline-block text-red font-semibold hover:underline"
                          >
                            {lang === 'fr' ? item.link.fr : item.link.en}
                          </Link>
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
