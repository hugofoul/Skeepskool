import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Phone, CalendarCheck2, Clock3 } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import { usePrimaryPhone } from '../hooks/usePrimaryPhone.js'
import { routeFromPath } from '../config/routes.js'
import { trackEvent } from '../lib/analytics.js'

export default function QuickActionBar() {
  const { t, path } = useLang()
  const primaryPhone = usePrimaryPhone()
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)

  const routeKey = routeFromPath(location.pathname)?.key
  const isHidden = ['booking', 'gift', 'legal', 'privacy'].includes(routeKey)

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

  if (isHidden) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-royalBlue/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pt-2 backdrop-blur transition-transform duration-300 md:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${primaryPhone.tel}`}
          onClick={() => trackEvent('click_phone', { target: `tel:${primaryPhone.tel}`, source: 'quick_action_bar' })}
          className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-white px-2 py-3 text-sm font-extrabold text-royalBlue"
        >
          <Phone className="h-4 w-4 shrink-0" />
          {t.quickActions.call}
        </a>
        <Link
          to={path('schedule')}
          className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-green-500 px-2 py-3 text-sm font-extrabold text-white"
        >
          <Clock3 className="h-4 w-4 shrink-0" />
          {t.quickActions.schedule}
        </Link>
        <Link
          to={path('booking')}
          className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-red px-2 py-3 text-sm font-extrabold text-white"
        >
          <CalendarCheck2 className="h-4 w-4 shrink-0" />
          {t.quickActions.book}
        </Link>
      </div>
    </div>
  )
}
