import { Link } from 'react-router-dom'
import { Phone, Mail, Facebook, Instagram, MapPin } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import { CONTACT, MAPS, SOCIAL } from '../config/site.js'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/ecole', label: t.nav.school },
    { to: '/cours', label: t.nav.lessons },
    { to: '/horaires', label: t.nav.schedule },
    { to: '/location', label: t.nav.rental },
    { to: '/autour', label: t.nav.around },
    { to: '/contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-royalBlue text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Col 1 — Brand */}
        <div>
          <Link to="/" className="inline-flex items-center">
            <div className="h-20 w-56 overflow-hidden">
              <img
                src="/logo-skeepskool-new.svg"
                alt="Skeepskool Surfing Le Porge"
                className="h-[132%] w-full -translate-y-[11%] object-contain object-top"
              />
            </div>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/80">{t.footer.tagline}</p>
          <span className="mt-4 inline-block rounded-full bg-yellow px-3 py-1 text-xs font-bold text-royalBlue">
            {t.ffsLabel}
          </span>
        </div>

        {/* Col 2 — Quick links */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-yellow">
            {t.footer.quickLinks}
          </h3>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-white/85 transition-colors hover:text-yellow"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-yellow">
            {t.footer.contact}
          </h3>
          <ul className="space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-yellow" />
              <a
                href={MAPS.addressSearch}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-yellow"
              >
                Plage Centrale, Le Porge Océan, 33680 Gironde
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-yellow" />
              <a href={`tel:${CONTACT.phonePrimary}`} className="transition-colors hover:text-yellow">
                {CONTACT.phonePrimaryDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-yellow" />
              <a href={`tel:${CONTACT.phoneSecondary}`} className="transition-colors hover:text-yellow">
                {CONTACT.phoneSecondaryDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-yellow" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="transition-colors hover:text-yellow"
              >
                {CONTACT.email}
              </a>
            </li>
          </ul>

          <div className="mt-4 flex gap-3">
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-white/10 p-2 transition-colors hover:bg-yellow hover:text-royalBlue"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2 transition-colors hover:bg-yellow hover:text-royalBlue"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/70 sm:flex-row sm:px-6 lg:px-8">
          <p>
            {t.footer.rights} · {year}
          </p>
          <Link to="/mentions-legales" className="transition-colors hover:text-yellow">
            {t.footer.legal}
          </Link>
        </div>
      </div>
    </footer>
  )
}
