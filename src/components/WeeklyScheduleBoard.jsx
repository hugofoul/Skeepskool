import { CalendarDays, Clock3, Radio } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function WeeklyScheduleBoard({
  badge,
  title,
  subtitle,
  dayLabel,
  liveLabel,
  fallbackLabel,
  days,
}) {
  return (
    <section className="relative overflow-hidden bg-[#f3f7fd] py-16 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#d7e7ff] via-[#f3f7fd] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-royalBlue shadow-sm ring-1 ring-royalBlue/10">
                <CalendarDays className="h-4 w-4 text-red" />
                {badge}
              </span>
              <h1 className="mt-5 text-3xl font-black text-royalBlue sm:text-4xl">{title}</h1>
              <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
              {subtitle && (
                <p className="mt-5 text-lg leading-relaxed text-dark/75">{subtitle}</p>
              )}
            </div>

            <div className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-bold text-royalBlue shadow-sm ring-1 ring-black/5 lg:self-auto">
              <Radio className="h-4 w-4 text-red" />
              {days.length ? liveLabel : fallbackLabel}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {days.map((day, index) => (
            <Reveal
              key={day.day}
              delay={index * 70}
              className="overflow-hidden rounded-[1.75rem] bg-white shadow-md ring-1 ring-black/5"
            >
              <div className="bg-gradient-to-r from-royalBlue to-[#2f5fd0] px-6 py-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-yellow/90">
                  {dayLabel}
                </p>
                <h2 className="mt-2 text-2xl font-black">{day.day}</h2>
              </div>

              <div className="space-y-3 px-5 py-5">
                {day.slots.length ? (
                  day.slots.map((slot) => (
                    <div
                      key={`${day.day}-${slot.time}-${slot.title}`}
                      className="rounded-2xl bg-lightGray px-4 py-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-red">
                          <Clock3 className="h-4 w-4" />
                          <p className="text-lg font-black">{slot.time}</p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-royalBlue ring-1 ring-black/5">
                          {slot.level}
                        </span>
                      </div>
                      <p className="mt-2 text-base font-bold text-royalBlue">{slot.title}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl bg-lightGray px-4 py-5 text-sm font-medium text-dark/60">
                    {fallbackLabel}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}