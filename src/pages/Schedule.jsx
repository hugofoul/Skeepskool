import { useLang } from '../hooks/useLang.js'
import { usePrimaryPhone } from '../hooks/usePrimaryPhone.js'
import { useWeeklySchedule } from '../hooks/useWeeklySchedule.js'
import WeeklyScheduleBoard from '../components/WeeklyScheduleBoard.jsx'
import PageHero from '../components/PageHero.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import SEO from '../components/SEO.jsx'
import { Phone, MessageCircle } from 'lucide-react'
import { images } from '../data/images.js'

export default function Schedule() {
  const { t, lang } = useLang()
  const primaryPhone = usePrimaryPhone()
  const s = t.schedule
  const whatsappUrl = t.whatsappUrl
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(whatsappUrl)}`
  const whatsappTitle = t.ui.schedule.joinTheWhatsappCommunity
  const whatsappText = t.ui.schedule.weUsuallyShareLesson
  const whatsappCta = t.ui.schedule.openWhatsappLink
  const weeklyTitle = t.ui.schedule.lessonScheduleForThe
  const schedule = useWeeklySchedule({
    lang,
    fallbackDays: s.fallbackDays,
    allLevelsLabel: s.allLevels,
  })
  const heroSubtitle = ''

  return (
    <div>
      <SEO
        title={t.ui.schedule.lessonSchedule}
        routeKey="schedule"
        description={t.ui.schedule.liveSurfLessonSchedule}
      />
      <PageHero
        title={s.title}
        subtitle={heroSubtitle}
        image={images.fondpages}
        titleClassName="font-bold -translate-y-2"
        compact
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

      <section id="planning-semaine" className="scroll-mt-36 bg-white pb-4 pt-10 sm:pt-12">
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
              </div>

              <CTAButton href={`tel:${primaryPhone.tel}`} className="shrink-0">
                {s.callWidgetCta}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}