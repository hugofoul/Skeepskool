import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import School from './pages/School.jsx'
import Lessons from './pages/Lessons.jsx'
import Rental from './pages/Rental.jsx'
import Around from './pages/Around.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'

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
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ecole" element={<School />} />
          <Route path="/school" element={<School />} />
          <Route path="/cours" element={<Lessons />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/location" element={<Rental />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/autour" element={<Around />} />
          <Route path="/around" element={<Around />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
