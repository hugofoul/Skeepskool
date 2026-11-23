import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang.js'
import { analyticsEnabled, getConsent, initAnalytics, onCookieSettingsRequest, setConsent } from '../lib/analytics.js'

/**
 * Consent banner for Google Analytics (only shown when analytics is configured).
 * "Refuser" is as visible as "Accepter", as required by the CNIL.
 */
export default function CookieBanner() {
  const { t, path } = useLang()
  const c = t.cookies
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!analyticsEnabled) return undefined
    initAnalytics()
    if (getConsent() === null) setOpen(true)
    return onCookieSettingsRequest(() => setOpen(true))
  }, [])

  if (!analyticsEnabled || !open) return null

  const choose = (value) => {
    setConsent(value)
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={c.title}
      className="fixed inset-x-3 bottom-3 z-[120] mx-auto max-w-xl rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10 sm:bottom-5"
    >
      <p className="text-base font-black text-royalBlue">{c.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-dark/80">
        {c.text}{' '}
        <Link to={path('privacy', 'cookies')} className="font-semibold text-royalBlue underline hover:text-red">
          {c.more}
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="rounded-full border-2 border-royalBlue px-4 py-2.5 text-sm font-bold text-royalBlue transition-colors hover:bg-royalBlue hover:text-white"
        >
          {c.refuse}
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="rounded-full border-2 border-royalBlue bg-royalBlue px-4 py-2.5 text-sm font-bold text-white transition-colors hover:border-red hover:bg-red"
        >
          {c.accept}
        </button>
      </div>
    </div>
  )
}
