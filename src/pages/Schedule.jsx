import { useLang } from '../hooks/useLang.js'
import { useWeeklySchedule } from '../hooks/useWeeklySchedule.js'
import WeeklyScheduleBoard from '../components/WeeklyScheduleBoard.jsx'
import CTAButton from '../components/CTAButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { Phone } from 'lucide-react'

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
        title={s.title}
        liveLabel={s.liveLabel}
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

              <CTAButton href="tel:+33670608426" className="shrink-0">
                {s.callWidgetCta}
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}