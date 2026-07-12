import { Link } from 'react-router-dom'
import { Phone, Facebook, Instagram, MapPin } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import { CONTACT, MAPS, SOCIAL } from '../config/site.js'
import { buildSrcSet } from '../utils/responsiveImage.js'
import { trackEvent } from '../lib/analytics.js'

export default function Footer() {
  const { t, lang } = useLang()
  const year = new Date().getFullYear()

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/ecole', label: t.nav.school },
    { to: '/cours', label: t.nav.lessons },
    { to: '/location', label: t.nav.rental },
    { to: lang === 'fr' ? '/bon-cadeau' : '/gift-voucher', label: t.nav.gift },
    { to: '/album-photo', label: t.nav.photos },
    { to: '/contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-royalBlue text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-8 pt-12 sm:px-6 md:grid-cols-3 lg:px-8">
        {/* Col 1 — Brand */}
        <div>
          <Link to="/" className="inline-flex items-start">
            <div className="relative h-24 w-80 overflow-visible">
              <img
                src="/logo-skeepskool-2026.svg"
                srcSet={buildSrcSet('/logo-skeepskool-2026.svg')}
                sizes="224px"
                alt="Skeepskool Surfing Le Porge"
                className="h-full w-full object-contain object-top"
              />
              <img
                src="/images/Web - Logo label EFSurf neutre_blanc-paysage.png"
                alt={lang === 'fr' ? 'Logo federation EFSurf' : 'EFSurf federation logo'}
                className="absolute left-1/2 top-[106%] h-auto w-56 -translate-x-1/2 -translate-y-1/2 object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Link>
          <p className="mt-20 max-w-sm text-sm text-white/80">
            {lang === 'fr' ? 'École de surf labellisée FFS au Porge Océan, Gironde.' : t.footer.tagline}
          </p>
        </div>

        {/* Col 2 — Quick links */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-yellow">
            {t.footer.quickLinks}
          </h3>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
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
                onClick={() => trackEvent('click_map', { target: MAPS.addressSearch, source: 'footer' })}
                className="transition-colors hover:text-yellow"
              >
                Plage Centrale, Le Porge Océan, 33680 Gironde
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-yellow" />
              <a href="tel:+33670608426" onClick={() => trackEvent('click_phone', { target: 'tel:+33670608426', source: 'footer' })} className="transition-colors hover:text-yellow">
                +33 6 70 60 84 26
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-yellow" />
              <a href={`tel:${CONTACT.phoneSecondary}`} onClick={() => trackEvent('click_phone', { target: `tel:${CONTACT.phoneSecondary}`, source: 'footer' })} className="transition-colors hover:text-yellow">
                {CONTACT.phoneSecondaryDisplay}
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
