import { useLang } from '../hooks/useLang.js'
import { useWeeklySchedule } from '../hooks/useWeeklySchedule.js'
import WeeklyScheduleBoard from '../components/WeeklyScheduleBoard.jsx'
import PageHero from '../components/PageHero.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import SEO from '../components/SEO.jsx'
import { Phone, MessageCircle } from 'lucide-react'
import { CONTACT } from '../config/site.js'
import { images } from '../data/images.js'

export default function Schedule() {
  const { t, lang } = useLang()
  const s = t.schedule
  const whatsappUrl = t.whatsappUrl
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(whatsappUrl)}`
  const whatsappTitle = lang === 'fr'
    ? 'Recevez les horaires'
    : (lang === 'de' ? 'WhatsApp-Community beitreten' : 'Join the WhatsApp community')
  const whatsappText = lang === 'fr'
    ? 'Les horaires sont établis généralement tous les jeudi pour la semaine à venir'
    : (lang === 'de'
      ? 'Wir versenden die Kurszeiten in der Regel donnerstags für die kommende Woche. Tritt der WhatsApp-Community bei, um alle Updates zu erhalten.'
      : 'We usually share lesson schedules on Thursdays for the coming week. Join the WhatsApp community to receive all updates.')
  const whatsappCta = lang === 'fr'
    ? 'Ouvrir le lien WhatsApp'
    : (lang === 'de' ? 'WhatsApp-Link öffnen' : 'Open WhatsApp link')
  const weeklyTitle = lang === 'fr'
    ? 'Horaires des cours de la semaine'
    : (lang === 'de' ? 'Kurszeiten der Woche' : 'Lesson schedule for the week')
  const scheduleWindowNote = lang === 'fr'
    ? 'Les horaires sont établis du jeudi au jeudi, pour assurer les cours aux meilleurs moments.'
    : (lang === 'de'
      ? 'Die Kurszeiten werden von Donnerstag bis Donnerstag festgelegt, um die besten Meeresbedingungen zu sichern.'
      : 'Lesson schedules are set from Thursday to Thursday to ensure the best sea conditions.')
  const schedule = useWeeklySchedule({
    lang,
    fallbackDays: s.fallbackDays,
    allLevelsLabel: s.allLevels,
  })
  const heroSubtitle = (
    <>
      {schedule.isLive ? s.liveLabel : s.fallbackLabel}
      <br />
      <span className="md:whitespace-nowrap">{scheduleWindowNote}</span>
    </>
  )

  return (
    <div>
      <SEO
        title={lang === 'fr' ? 'Horaires des cours' : (lang === 'de' ? 'Kurszeiten' : 'Lesson Schedule')}
        path={lang === 'fr' ? '/horaires' : '/schedule'}
        alternates={[
          { hrefLang: 'fr-FR', path: '/horaires' },
          { hrefLang: 'en', path: '/schedule' },
          { hrefLang: 'de', path: '/schedule' },
          { hrefLang: 'x-default', path: '/horaires' },
        ]}
        description={lang === 'fr'
          ? "Planning des cours de surf en direct à Skeepskool. Créneaux collectifs, sessions enfants et cours Sunset au Porge Océan."
          : (lang === 'de'
            ? 'Live-Surfstundenplan bei Skeepskool. Gruppen-Slots, Kinder-Sessions und Sunset-Kurse in Le Porge Océan.'
            : "Live surf lesson schedule at Skeepskool. Group slots, kids sessions and Sunset lessons at Le Porge Océan.")}
      />
      <PageHero
        title={s.title}
        subtitle={heroSubtitle}
        image={images.fondpages}
        titleClassName="font-bold"
      />

      <section className="bg-white pt-8 sm:pt-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="overflow-hidden rounded-3xl border border-black/10 bg-lightGray shadow-md ring-1 ring-black/5">
            <div className="grid gap-6 p-5 sm:grid-cols-[1.2fr_auto] sm:items-center sm:p-7">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-green-700">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </div>
                <h2 className="mt-3 text-2xl font-black text-royalBlue sm:text-3xl">{whatsappTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-dark/80 sm:text-base">{whatsappText}</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-green-600"
                >
                  {whatsappCta}
                </a>
              </div>
              <div className="mx-auto w-fit rounded-2xl bg-white p-3 ring-1 ring-black/10">
                <img
                  src={qrCodeUrl}
                  alt="QR code WhatsApp Skeepskool"
                  className="h-36 w-36 sm:h-44 sm:w-44"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white pb-4 pt-10 sm:pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-black text-royalBlue sm:text-4xl">{weeklyTitle}</h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>
        </div>
      </section>

      <WeeklyScheduleBoard
        fallbackLabel={s.fallbackLabel}
        days={schedule.days}
      />

      <section className="bg-white pb-16 pt-4 sm:pb-20 sm:pt-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal className="rounded-2xl border-l-4 border-red bg-lightGray p-6 shadow-md ring-1 ring-black/5 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-royalBlue" />
                  <h2 className="text-2xl font-black text-royalBlue">{s.callWidgetTitle}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-dark/80 sm:text-base">{s.callWidgetText}</p>
              </div>

              <CTAButton href={`tel:${CONTACT.phonePrimary}`} className="shrink-0">
                {s.callWidgetCta}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}