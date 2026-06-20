import { Link, useLocation } from 'react-router-dom'
import { Phone, CalendarCheck2 } from 'lucide-react'
import { useLang } from '../hooks/useLang.js'
import { CONTACT } from '../config/site.js'

export default function QuickActionBar() {
  const { lang, t } = useLang()
  const location = useLocation()

  const isBookingPage = location.pathname === '/reserver' || location.pathname === '/book'
  const isLegalPage = location.pathname === '/mentions-legales' || location.pathname === '/legal'

  if (isBookingPage || isLegalPage) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-royalBlue/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pt-2 backdrop-blur md:hidden">
      <p className="pb-2 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-yellow/90">
        {t.quickActions.response}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={`tel:${CONTACT.phonePrimary}`}
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
