import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'

export default function Navbar() {
  const { lang, toggle, t } = useLang()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const links = [
    { to: '/ecole', label: t.nav.school },
    { to: '/cours', label: t.nav.lessons },
    { to: '/horaires', label: t.nav.schedule },
    { to: '/location', label: t.nav.rental },
    { to: '/autour', label: t.nav.around },
    { to: '/contact', label: t.nav.contact },
  ]

  const linkClass = ({ isActive }) =>
    [
      'relative font-semibold text-white py-1 transition-colors',
      'after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-yellow after:transition-all after:duration-300',
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
    ].join(' ')

  const LangToggle = ({ className = '' }) => (
    <button
      onClick={toggle}
      aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      className={`inline-flex items-center gap-1 rounded-full bg-yellow px-3 py-1.5 text-sm font-bold text-royalBlue transition-transform hover:scale-105 ${className}`}
    >
      <span className={lang === 'fr' ? 'opacity-100' : 'opacity-50'}>FR</span>
      <span className="opacity-60">|</span>
      <span className={lang === 'en' ? 'opacity-100' : 'opacity-50'}>EN</span>
    </button>
  )

  return (
    <header className="sticky top-0 z-50 bg-royalBlue shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="group flex items-center">
          <div className="h-14 w-44 overflow-hidden sm:h-16 sm:w-48">
            <img
              src="/logo-skeepskool-new.svg"
              alt="Skeepskool Surfing Le Porge"
              className="h-[132%] w-full -translate-y-[11%] object-contain object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        </Link>

        {/* Center links (desktop) */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Right: lang toggle (desktop) + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+33650523475"
            className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-yellow hover:text-royalBlue lg:inline-flex"
          >
            <Phone className="h-4 w-4 text-yellow" />
            +33 6 50 52 34 75
          </a>
          <LangToggle className="hidden md:inline-flex" />
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
      {open && (
        <div className="border-t border-white/10 bg-royalBlue px-4 pb-5 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 text-base font-semibold transition-colors ${
                    isActive ? 'bg-white/10 text-yellow' : 'text-white hover:bg-white/10'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="tel:+33650523475"
              className="mt-1 flex items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-5 w-5 text-yellow" />
              +33 6 50 52 34 75
            </a>
            <div className="pt-3">
              <LangToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
