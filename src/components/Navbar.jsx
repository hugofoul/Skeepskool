import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import { CONTACT } from '../config/site.js'
import { buildSrcSet } from '../utils/responsiveImage.js'

export default function Navbar() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const links = [
    { to: '/ecole', label: t.nav.school },
    { to: '/cours', label: t.nav.lessons },
    { to: lang === 'fr' ? '/reserver' : '/book', label: t.nav.book, match: ['/reserver', '/book'] },
    { to: '/horaires', label: t.nav.schedule },
    { to: '/location', label: t.nav.rental },
    { to: '/album-photo', label: t.nav.photos, match: ['/album-photo', '/photos'] },
    { to: '/autour', label: t.nav.around },
    { to: '/contact', label: t.nav.contact },
  ]

  const linkClass = (isActive) =>
    [
      'relative font-semibold text-white py-1 transition-colors',
      'after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-yellow after:transition-all after:duration-300',
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
    ].join(' ')

  const LangToggle = ({ className = '' }) => (
    <label aria-label="Language selector" className={`relative inline-flex items-center ${className}`}>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="h-9 cursor-pointer appearance-none rounded-full bg-royalBlue pl-3 pr-9 text-sm font-semibold leading-none text-white ring-1 ring-yellow shadow-sm transition hover:bg-[#244fc8] focus:outline-none focus:ring-2 focus:ring-yellow"
      >
        <option value="fr" className="text-royalBlue">FR</option>
        <option value="en" className="text-royalBlue">EN</option>
        <option value="de" className="text-royalBlue">DE</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
    </label>
  )

  return (
    <header className="sticky top-0 z-50 bg-royalBlue shadow-lg">
      <nav className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 py-3 sm:px-6 md:flex md:justify-between lg:pl-0 lg:pr-8">
        {/* Left placeholder to keep centered logo on mobile */}
        <div className="h-7 w-7 md:hidden" aria-hidden="true" />

        {/* Brand */}
        <Link to="/" className="group flex items-center justify-self-center md:-ml-4 md:justify-self-auto lg:-ml-6">
          <div className="h-[4.5rem] w-[15rem] overflow-hidden sm:h-[4.5rem] sm:w-[15rem] md:h-[3.75rem] md:w-[12.5rem] lg:h-[4rem] lg:w-[13.5rem]">
            <img
              src="/logo-skeepskool-2026.svg"
              srcSet={buildSrcSet('/logo-skeepskool-2026.svg')}
              sizes="(max-width: 1024px) 200px, 216px"
              alt="Skeepskool Surfing Le Porge"
              className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </Link>

        {/* Center links (desktop) */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => linkClass(isActive || (l.match?.includes(location.pathname) ?? false))}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Right: lang toggle (desktop) + hamburger (mobile) */}
        <div className="flex items-center justify-self-end gap-3">
          <a
            href={`tel:${CONTACT.phoneSecondary}`}
            className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-yellow hover:text-royalBlue lg:inline-flex"
          >
            <Phone className="h-4 w-4 text-yellow" />
            {CONTACT.phoneSecondaryDisplay}
          </a>
          <LangToggle className="hidden md:inline-flex md:translate-y-0.5" />
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-white md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden bg-royalBlue transition-all duration-300 ease-out md:hidden ${
          open ? 'max-h-[80vh] border-t border-white/10 opacity-100' : 'max-h-0 border-t border-transparent opacity-0'
        }`}
      >
        <div className={`px-3 pb-5 pt-2 transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-2'}`}>
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-lg px-2 py-2.5 text-[0.95rem] font-semibold leading-tight tracking-tight transition-colors sm:px-3 sm:text-base ${
                    isActive ? 'bg-white/10 text-yellow' : 'text-white hover:bg-white/10'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={`tel:${CONTACT.phoneSecondary}`}
              className="mt-1 flex items-center gap-2 rounded-lg px-2 py-2.5 text-[0.95rem] font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/10 sm:px-3 sm:text-base"
            >
              <Phone className="h-5 w-5 text-yellow" />
              {CONTACT.phoneSecondaryDisplay}
            </a>
            <div className="pt-3">
              <LangToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
