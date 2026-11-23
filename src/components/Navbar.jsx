import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown, ShoppingCart } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import { usePrimaryPhone } from '../hooks/usePrimaryPhone.js'
import { buildSrcSet } from '../utils/responsiveImage.js'
import { trackEvent } from '../lib/analytics.js'

export default function Navbar() {
  const { lang, setLang, t, path } = useLang()
  const primaryPhone = usePrimaryPhone()
  const [open, setOpen] = useState(false)
  const [activeTopDropdown, setActiveTopDropdown] = useState(null)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
    setActiveTopDropdown(null)
  }, [location.pathname])

  const bookingPath = path('booking')

  const lessonsSubLinks = [
    {
      href: path('lessons', 'explication'),
      label: t.ui.navbar.info,
    },
    {
      href: path('lessons', 'planning-cours-semaine'),
      label: t.ui.navbar.schedule,
    },
    {
      href: path('lessons', 'formules-tarifs'),
      label: t.ui.navbar.pricing,
    },
  ]

  const rentalSubLinks = [
    {
      href: path('rental', 'infos-location'),
      label: t.ui.navbar.info,
    },
    {
      href: path('rental', 'tarifs-location'),
      label: t.ui.navbar.pricing,
    },
  ]

  const contactSubLinks = [
    {
      href: path('contact', 'infos-contact'),
      label: t.ui.navbar.contact,
    },
    {
      href: path('contact', 'comment-nous-trouver'),
      label: t.ui.navbar.access,
    },
    {
      href: path('contact', 'faq'),
      label: t.ui.navbar.faq,
    },
    {
      href: path('contact', 'camping-la-grigne'),
      label: t.ui.navbar.whereToSleep,
    },
    {
      href: path('contact', 'ou-manger'),
      label: t.ui.navbar.whereToEat,
    },
  ]

  const links = [
    { key: 'school', to: path('school'), label: t.nav.school },
    { key: 'lessons', to: path('lessons'), label: t.nav.lessons, subLinks: lessonsSubLinks },
    { key: 'rental', to: path('rental'), label: t.nav.rental, subLinks: rentalSubLinks },
    { key: 'gift', to: path('gift'), label: t.nav.gift },
    { key: 'photos', to: path('photos'), label: t.nav.photos },
    { key: 'contact', to: path('contact'), label: t.nav.contact, subLinks: contactSubLinks },
  ]

  const linkClass = (isActive) =>
    [
      'relative inline-flex h-9 items-center whitespace-nowrap text-sm font-bold text-white transition-colors',
      'after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-yellow after:transition-all after:duration-300',
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
    ].join(' ')

  const LangToggle = ({ className = '' }) => (
    <label aria-label="Language selector" className={`relative inline-flex items-center ${className}`}>
      <select
        value={lang}
        onChange={(e) => {
          const nextLang = e.target.value
          if (nextLang !== lang) {
            trackEvent('language_changed', { from_lang: lang, to_lang: nextLang })
          }
          setLang(nextLang)
        }}
        className="h-9 cursor-pointer appearance-none rounded-full bg-royalBlue pl-3 pr-9 text-sm font-bold leading-none text-white shadow-sm transition hover:bg-[#244fc8] focus:outline-none"
      >
        <option value="fr" className="text-royalBlue">🇫🇷</option>
        <option value="en" className="text-royalBlue">🇬🇧</option>
        <option value="de" className="text-royalBlue">🇩🇪</option>
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
        <Link to={path('home')} className="group flex items-center justify-self-center md:-ml-4 md:justify-self-auto lg:-ml-6" aria-label="Retour à l'accueil">
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
        <div className="hidden items-center gap-4 md:flex lg:gap-6 xl:gap-8">
          {links.map((l) => (
            <div
              key={l.key}
              className="relative flex items-center gap-1"
              onMouseEnter={() => l.subLinks && setActiveTopDropdown(l.key)}
              onMouseLeave={() => l.subLinks && setActiveTopDropdown(null)}
            >
              <NavLink
                to={l.to}
                onClick={() => setActiveTopDropdown(null)}
                className={({ isActive }) => linkClass(isActive)}
              >
                {l.label}
              </NavLink>

              {l.subLinks ? (
                <button
                  type="button"
                  onMouseEnter={() => setActiveTopDropdown(l.key)}
                  onFocus={() => setActiveTopDropdown(l.key)}
                  onClick={() => setActiveTopDropdown((current) => (current === l.key ? null : l.key))}
                  className="rounded p-0.5 text-white transition-colors hover:text-yellow"
                  aria-label={`${t.ui.navbar.openSubmenu} ${l.label}`}
                  aria-expanded={activeTopDropdown === l.key}
                >
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeTopDropdown === l.key ? 'rotate-180' : ''}`} />
                </button>
              ) : null}

              {l.subLinks && activeTopDropdown === l.key ? (
                <div
                  className="absolute left-1/2 top-full z-50 mt-3 w-max min-w-[220px] -translate-x-1/2 rounded-2xl border border-white/20 bg-royalBlue/95 p-2 shadow-2xl backdrop-blur"
                  onMouseEnter={() => setActiveTopDropdown(l.key)}
                  onMouseLeave={() => setActiveTopDropdown(null)}
                >
                  <div className="flex flex-col gap-1">
                    {l.subLinks.map((item) => {
                      const hash = item.href.split('#')[1]
                      const isActive = location.pathname === item.href.split('#')[0] && location.hash === `#${hash}`

                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setActiveTopDropdown(null)}
                          className={`rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-colors ${
                            isActive
                              ? 'bg-yellow text-royalBlue'
                              : 'text-white hover:bg-white/15 hover:text-yellow'
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Right: lang toggle (desktop) + hamburger (mobile) */}
        <div className="flex items-center justify-self-end gap-3">
          <a
            href={`tel:${primaryPhone.tel}`}
            onClick={() => trackEvent('click_phone', { target: `tel:${primaryPhone.tel}`, source: 'navbar_desktop' })}
            className="hidden h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-3 text-sm font-bold text-white transition-colors hover:bg-yellow hover:text-royalBlue xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-yellow" />
            {primaryPhone.display}
          </a>
          <Link
            to={bookingPath}
            onClick={() => trackEvent('click_booking_cta', { target: bookingPath, source: 'navbar_desktop_cart' })}
            className="hidden h-9 shrink-0 items-center gap-1.5 rounded-full bg-red px-3 text-sm font-bold text-white transition-colors hover:bg-yellow hover:text-royalBlue lg:inline-flex"
          >
            <ShoppingCart className="h-4 w-4" />
            {t.nav.cart}
          </Link>
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

      <div className="-mt-5 px-4 pb-0.5 text-center text-[10px] font-extrabold uppercase tracking-[0.14em] text-yellow md:hidden">
        {t.ui.navbar.aprilToNovember9am}
      </div>

      {/* Mobile dropdown */}
      <div
        className={`origin-top overflow-hidden bg-royalBlue transition-all duration-300 ease-out md:hidden ${
          open ? 'max-h-[80vh] border-t border-white/10 opacity-100' : 'max-h-0 border-t border-transparent opacity-0'
        }`}
      >
        <div className={`px-3 pb-5 pt-2 transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-4'}`}>
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
              href={`tel:${primaryPhone.tel}`}
              onClick={() => trackEvent('click_phone', { target: `tel:${primaryPhone.tel}`, source: 'navbar_mobile' })}
              className="mt-1 flex items-center gap-2 rounded-lg px-2 py-2.5 text-[0.95rem] font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/10 sm:px-3 sm:text-base"
            >
              <Phone className="h-5 w-5 text-yellow" />
              {primaryPhone.display}
            </a>
            <NavLink
              to={bookingPath}
              onClick={() => trackEvent('click_booking_cta', { target: bookingPath, source: 'navbar_mobile_cart' })}
              className="mt-1 inline-flex w-fit items-center self-start rounded-full bg-red px-3 py-1.5 text-sm font-bold leading-tight text-white transition-colors hover:bg-yellow hover:text-royalBlue"
            >
              <ShoppingCart className="mr-1.5 inline h-3.5 w-3.5" />
              {t.nav.cart}
            </NavLink>
            <div className="pt-3">
              <LangToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
