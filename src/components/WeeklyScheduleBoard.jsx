import { Clock3 } from 'lucide-react'
import Reveal from './Reveal.jsx'

export default function WeeklyScheduleBoard({
  title,
  liveLabel,
  fallbackLabel,
  days,
  isLive,
}) {
  return (
    <section className="relative overflow-hidden bg-[#f3f7fd] py-16 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#d7e7ff] via-[#f3f7fd] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="mt-5 text-3xl font-black text-royalBlue sm:text-4xl">{title}</h1>
              <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
            </div>
            <span
              className={`inline-flex items-center self-start rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${
                isLive
                  ? 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300'
                  : 'bg-white text-royalBlue ring-1 ring-black/10'
              }`}
            >
              {isLive ? liveLabel : fallbackLabel}
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {days.map((day, index) => (
            <Reveal
              key={day.day}
              delay={index * 70}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-lg transition-shadow hover:shadow-xl ring-1 ring-black/5"
            >
              <div className="bg-gradient-to-br from-royalBlue via-[#2f5fd0] to-[#1a3ebd] px-6 py-6 text-white">
                <h2 className="text-3xl font-black">{day.day}</h2>
              </div>

              <div className="space-y-2.5 px-6 py-6">
                {day.slots.length ? (
                  day.slots.map((slot) => (
                    <div
                      key={`${day.day}-${slot.time}-${slot.type}`}
                      className="group/slot rounded-xl bg-gradient-to-br from-[#f3f7fd] to-[#e8f1fc] px-4 py-3.5 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red/10">
                            <Clock3 className="h-4 w-4 text-red" />
                          </span>
                          <p className="text-base font-black text-dark">{slot.time}</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {slot.type && slot.type.includes('Sunset') && (
                            <span className="rounded-lg bg-yellow px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight text-red">
                              Sunset
                            </span>
                          )}
                          <span className="max-w-full rounded-lg bg-white px-2.5 py-1 text-[10px] font-bold uppercase leading-tight tracking-tight text-royalBlue shadow-sm ring-1 ring-black/5">
                            {slot.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-lightGray px-4 py-4 text-sm font-medium text-dark/60">
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