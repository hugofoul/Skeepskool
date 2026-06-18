import { useLang } from '../hooks/useLang.js'
import { useWeeklySchedule } from '../hooks/useWeeklySchedule.js'
import WeeklyScheduleBoard from '../components/WeeklyScheduleBoard.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Schedule() {
  const { t, lang } = useLang()
  const s = t.schedule
  const schedule = useWeeklySchedule({
    lang,
    fallbackDays: s.fallbackDays,
    allLevelsLabel: s.allLevels,
  })

  return (
    <div>
      <WeeklyScheduleBoard
        badge={s.badge}
        title={s.title}
        subtitle={s.subtitle}
        dayLabel={s.dayLabel}
        liveLabel={s.liveLabel}
        fallbackLabel={s.fallbackLabel}
        days={schedule.days}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="rounded-[2rem] bg-royalBlue p-8 text-white shadow-xl sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow">{s.infoBadge}</p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">{s.infoTitle}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/85">{s.infoText}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTAButton href={t.whatsappUrl} target="_blank" rel="noopener noreferrer">
                {s.bookCta}
              </CTAButton>
              <CTAButton to="/contact" className="bg-yellow text-royalBlue hover:bg-white">
                {s.contactCta}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}