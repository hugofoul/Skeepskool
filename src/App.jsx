import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import QuickActionBar from './components/QuickActionBar.jsx'

const Home    = lazy(() => import('./pages/Home.jsx'))
const School  = lazy(() => import('./pages/School.jsx'))
const Lessons = lazy(() => import('./pages/Lessons.jsx'))
const Schedule = lazy(() => import('./pages/Schedule.jsx'))
const Rental  = lazy(() => import('./pages/Rental.jsx'))
const Around  = lazy(() => import('./pages/Around.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Booking = lazy(() => import('./pages/Booking.jsx'))
const Legal   = lazy(() => import('./pages/Legal.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        // Wait a tick so the target page has rendered before scrolling.
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">
        <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><span className="h-8 w-8 animate-spin rounded-full border-4 border-royalBlue border-t-transparent" /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ecole" element={<School />} />
          <Route path="/school" element={<School />} />
          <Route path="/cours" element={<Lessons />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/reserver" element={<Booking />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/horaires" element={<Schedule />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/location" element={<Rental />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/autour" element={<Around />} />
          <Route path="/around" element={<Around />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <QuickActionBar />
      <Footer />
    </div>
  )
}
