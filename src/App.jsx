import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import QuickActionBar from './components/QuickActionBar.jsx'
import WhatsAppWidget from './components/WhatsAppWidget.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import { trackPageView } from './lib/analytics.js'
import { LANGS, ROUTES } from './config/routes.js'
// Pages are imported directly (no lazy loading) so that the pre-rendered HTML
// can be hydrated without waiting for a page chunk.
import Home from './pages/Home.jsx'
import School from './pages/School.jsx'
import Lessons from './pages/Lessons.jsx'
import Schedule from './pages/Schedule.jsx'
import Rental from './pages/Rental.jsx'
import Contact from './pages/Contact.jsx'
import PhotoAlbum from './pages/PhotoAlbum.jsx'
import SessionDetails from './pages/SessionDetails.jsx'
import Booking from './pages/Booking.jsx'
import GiftVoucher from './pages/GiftVoucher.jsx'
import Legal from './pages/Legal.jsx'
import Privacy from './pages/Privacy.jsx'
import NotFound from './pages/NotFound.jsx'

const PAGES = {
  home: Home,
  school: School,
  lessons: Lessons,
  session: SessionDetails,
  schedule: Schedule,
  rental: Rental,
  gift: GiftVoucher,
  photos: PhotoAlbum,
  contact: Contact,
  booking: Booking,
  legal: Legal,
  privacy: Privacy,
}

// Old addresses still used by links in the wild (also redirected with a 301 by public/.htaccess).
const LEGACY_REDIRECTS = {
  '/school': ROUTES.school.en,
  '/lessons': ROUTES.lessons.en,
  '/session-details': ROUTES.session.en,
  '/book': ROUTES.booking.en,
  '/gift-voucher': ROUTES.gift.en,
  '/schedule': ROUTES.schedule.en,
  '/rental': ROUTES.rental.en,
  '/legal': ROUTES.legal.en,
  '/photos': ROUTES.photos.fr,
  '/album-photo': ROUTES.photos.fr,
  '/autour': ROUTES.contact.fr,
  '/around': ROUTES.contact.fr,
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1)
      let attempts = 0
      let cancelled = false

      const scrollToHashTarget = () => {
        if (cancelled) return

        const el = document.getElementById(targetId)
        if (el) {
          requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
          return
        }

        attempts += 1
        if (attempts < 20) {
          setTimeout(scrollToHashTarget, 60)
        }
      }

      scrollToHashTarget()

      return () => {
        cancelled = true
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])

  return null
}

function AnalyticsTracker() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    trackPageView(`${pathname}${search}`)
  }, [pathname, search])

  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <AnalyticsTracker />
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">
        <Routes>
          {Object.entries(ROUTES).flatMap(([key, paths]) => LANGS.map((lang) => {
            const Page = PAGES[key]
            return <Route key={`${key}-${lang}`} path={paths[lang]} element={<Page />} />
          }))}
          {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <QuickActionBar />
      <WhatsAppWidget />
      <CookieBanner />
      <Footer />
    </div>
  )
}
