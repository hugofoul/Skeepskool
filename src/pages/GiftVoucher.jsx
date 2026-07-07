import { Gift, CheckCircle2, Phone } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'
import { CONTACT, SITE_URL } from '../config/site.js'

export default function GiftVoucher() {
  const { lang } = useLang()

  // TODO(business): confirm if gift vouchers are valid from April to December and expose this period in UI/SEO text.

  const content = lang === 'fr'
    ? {
      title: 'Bon cadeau surf',
      subtitle: 'Offrez un cours de surf ou une formule à la personne de votre choix.',
      intro: 'Le bon cadeau Skeepskool permet d\'offrir une expérience surf à Le Porge Océan, avec moniteurs diplômés, matériel inclus et choix de formule.',
      points: [
        'Cours pour tous niveaux et tous âges dès 5 ans.',
        'Matériel inclus : planche et combinaison.',
        'Réservation simple via la page Réserver.',
        'En cas d\'urgence, privilégiez l\'appel téléphonique.',
      ],
      cta: 'Choisir un bon cadeau',
      phoneCta: 'Appeler pour réserver',
    }
    : (lang === 'de'
      ? {
        title: 'Surf-Geschenkgutschein',
        subtitle: 'Verschenke einen Surfkurs oder ein Paket deiner Wahl.',
        intro: 'Mit dem Skeepskool-Geschenkgutschein verschenkst du ein Surferlebnis in Le Porge Océan, mit qualifizierten Lehrern, Material inklusive und frei wählbarem Paket.',
        points: [
          'Kurse für alle Niveaus und Altersgruppen ab 5 Jahren.',
          'Material inklusive: Board und Neoprenanzug.',
          'Einfache Buchung über die Seite Buchen.',
          'Bei dringenden Buchungen bitte telefonisch anrufen.',
        ],
        cta: 'Geschenkgutschein wählen',
        phoneCta: 'Anrufen und buchen',
      }
      : {
        title: 'Surf gift voucher',
        subtitle: 'Offer a surf lesson or package to someone you care about.',
        intro: 'The Skeepskool gift voucher lets you offer a surf experience in Le Porge Océan, with certified instructors, equipment included and flexible package choice.',
        points: [
          'Lessons for all levels and ages from 5 years old.',
          'Equipment included: surfboard and wetsuit.',
          'Easy booking from the booking page.',
          'For urgent bookings, please call us directly.',
        ],
        cta: 'Choose a gift voucher',
        phoneCta: 'Call to book',
      })

  const pagePath = lang === 'fr' ? '/bon-cadeau' : '/gift-voucher'
  const bookingPath = lang === 'fr' ? '/reserver' : '/book'

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: lang === 'fr'
            ? 'Que comprend le bon cadeau ?'
            : (lang === 'de' ? 'Was ist im Geschenkgutschein enthalten?' : 'What is included in the gift voucher?'),
          acceptedAnswer: {
            '@type': 'Answer',
            text: content.intro,
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: content.title,
      serviceType: content.title,
      provider: {
        '@type': 'SportsActivityLocation',
        name: 'Skeepskool',
      },
      areaServed: 'Le Porge Océan',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}${bookingPath}`,
      },
    },
  ]

  return (
    <div>
      <SEO
        title={content.title}
        description={content.intro}
        path={pagePath}
        lang={lang}
        alternates={[
          { hrefLang: 'fr-FR', path: '/bon-cadeau' },
          { hrefLang: 'en', path: '/gift-voucher' },
          { hrefLang: 'de', path: '/gift-voucher' },
          { hrefLang: 'x-default', path: '/bon-cadeau' },
        ]}
        structuredData={structuredData}
      />
      <PageHero title={content.title} subtitle={content.subtitle} image={images.fondpages} />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-3xl border-l-4 border-red bg-lightGray p-6 shadow-md ring-1 ring-black/5 sm:p-8">
            <p className="text-base leading-relaxed text-dark/80 sm:text-lg">{content.intro}</p>
            <ul className="mt-6 space-y-3">
              {content.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-semibold text-royalBlue sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton to={bookingPath} className="bg-red hover:bg-yellow">
                <Gift className="h-4 w-4" />
                {content.cta}
              </CTAButton>
              <CTAButton href={`tel:${CONTACT.phonePrimary}`} className="border border-royalBlue/30 bg-white text-royalBlue shadow-none hover:bg-royalBlue hover:text-white">
                <Phone className="h-4 w-4" />
                {content.phoneCta}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
