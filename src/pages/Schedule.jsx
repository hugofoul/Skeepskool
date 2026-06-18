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
        liveLabel={s.liveLabel}
        fallbackLabel={s.fallbackLabel}
        days={schedule.days}
      />
    </div>
  )
}