import { Waves, Handshake, TrendingUp, Award } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import { images, teamPhotos } from '../data/images.js'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'

const sectionImages = [images.dunePines, images.surfboards, images.team]
const valueIcons = [Waves, Handshake, TrendingUp]
const teamImages = [teamPhotos.pierre, teamPhotos.mariane, teamPhotos.manoa, teamPhotos.hugo]

export default function School() {
  const { t } = useLang()
  const s = t.school

  return (
    <div>
      <PageHero title={s.heroTitle} subtitle={s.heroSubtitle} image={images.wave} />

      {/* ---- Alternating content sections ---- */}
      {s.sections.map((sec, i) => {
        const even = i % 2 === 0
        return (
          <section key={sec.tag} className={even ? 'bg-white' : 'bg-lightGray'}>
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
              {/* Text */}
              <Reveal className={even ? 'lg:order-1' : 'lg:order-2'}>
                <span className="inline-block rounded-full bg-royalBlue/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-royalBlue">
                  {sec.tag}
                </span>
                <h2 className="mt-4 text-3xl font-black text-royalBlue sm:text-4xl">
                  {sec.title}
                </h2>
                <span className="mt-3 block h-1 w-16 rounded bg-yellow" />
                <p className="mt-5 text-lg leading-relaxed text-dark/80">{sec.text}</p>
              </Reveal>

              {/* Image */}
              <Reveal
                delay={120}
                className={`overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10 ${
                  even ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <img
                  src={sectionImages[i]}
                  alt={sec.title}
                  className="h-72 w-full object-cover sm:h-96"
                  loading="lazy"
                />
              </Reveal>
            </div>
          </section>
        )
      })}

      {/* ---- Values block ---- */}
      <section className="bg-royalBlue py-16 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-black sm:text-4xl">{s.valuesTitle}</h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {s.values.map((v, i) => {
              const Icon = valueIcons[i]
              return (
                <Reveal key={v.title} delay={i * 120} className="text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                    <Icon className="h-8 w-8 text-yellow" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold">{v.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-white/80">{v.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---- Team presentation ---- */}
      <section id="equipe" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-center text-3xl font-black text-royalBlue sm:text-4xl">
              {s.teamTitle}
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded bg-yellow" />
            <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-dark/75">
              {s.teamSubtitle}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.team.map((member, i) => (
              <Reveal
                key={member.name}
                delay={(i % 4) * 100}
                className="group overflow-hidden rounded-2xl bg-lightGray shadow-md ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={teamImages[i]}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-yellow px-3 py-1 text-xs font-bold text-royalBlue">
                    {member.role}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-royalBlue">{member.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark/75">{member.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FFS badge ---- */}
      <section className="bg-lightGray py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal className="inline-flex flex-col items-center gap-4 rounded-3xl border-2 border-yellow bg-white px-10 py-10 shadow-md">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow">
              <Award className="h-10 w-10 text-royalBlue" />
            </span>
            <p className="text-xl font-black text-royalBlue">{s.badge}</p>
            <p className="text-sm text-dark/70">{t.ffsLabel}</p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
