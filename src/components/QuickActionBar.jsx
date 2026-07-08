import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, CalendarCheck2 } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import { CONTACT } from '../config/site.js'
import { trackEvent } from '../lib/analytics.js'

export default function QuickActionBar() {
  const { lang, t } = useLang()
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)

  const isBookingPage = location.pathname === '/reserver' || location.pathname === '/book'
  const isLegalPage = location.pathname === '/mentions-legales' || location.pathname === '/legal'

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let lastY = window.scrollY
    setIsVisible(false)

    const handleScroll = () => {
      const currentY = window.scrollY

      if (currentY <= 20) {
        setIsVisible(false)
        lastY = currentY
        return
      }

      if (currentY > lastY + 2) {
        setIsVisible(true)
      } else if (currentY < lastY - 2) {
        setIsVisible(false)
      }

      lastY = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  if (isBookingPage || isLegalPage) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-royalBlue/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pt-2 backdrop-blur transition-transform duration-300 md:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${CONTACT.phonePrimary}`}
          onClick={() => trackEvent('click_phone', { target: `tel:${CONTACT.phonePrimary}`, source: 'quick_action_bar' })}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-sm font-extrabold text-royalBlue"
        >
          <Phone className="h-4 w-4" />
          {t.quickActions.call}
        </a>
        <Link
          to={lang === 'fr' ? '/reserver' : '/book'}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red px-3 py-3 text-sm font-extrabold text-white"
        >
          <CalendarCheck2 className="h-4 w-4" />
          {t.quickActions.book}
        </Link>
      </div>
    </div>
  )
}
