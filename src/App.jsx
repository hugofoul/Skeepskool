import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import QuickActionBar from './components/QuickActionBar.jsx'
import WhatsAppWidget from './components/WhatsAppWidget.jsx'
import { trackPageView } from './lib/analytics.js'

const Home    = lazy(() => import('./pages/Home.jsx'))
const School  = lazy(() => import('./pages/School.jsx'))
const Lessons = lazy(() => import('./pages/Lessons.jsx'))
const Schedule = lazy(() => import('./pages/Schedule.jsx'))
const Rental  = lazy(() => import('./pages/Rental.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const PhotoAlbum = lazy(() => import('./pages/PhotoAlbum.jsx'))
const SessionDetails = lazy(() => import('./pages/SessionDetails.jsx'))
const Booking = lazy(() => import('./pages/Booking.jsx'))
const GiftVoucher = lazy(() => import('./pages/GiftVoucher.jsx'))
const Legal   = lazy(() => import('./pages/Legal.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

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
        <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><span className="h-8 w-8 animate-spin rounded-full border-4 border-royalBlue border-t-transparent" /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ecole" element={<School />} />
          <Route path="/school" element={<School />} />
          <Route path="/cours" element={<Lessons />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/seance-type" element={<SessionDetails />} />
          <Route path="/session-details" element={<SessionDetails />} />
          <Route path="/reserver" element={<Booking />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/bon-cadeau" element={<GiftVoucher />} />
          <Route path="/gift-voucher" element={<GiftVoucher />} />
          <Route path="/horaires" element={<Schedule />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/location" element={<Rental />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/autour" element={<Navigate to="/contact" replace />} />
          <Route path="/around" element={<Navigate to="/contact" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/album-photo" element={<PhotoAlbum />} />
          <Route path="/photos" element={<PhotoAlbum />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <QuickActionBar />
      <WhatsAppWidget />
      <Footer />
    </div>
  )
}
