// Google Analytics 4, chargé uniquement après accord du visiteur (bandeau cookies).
// Sans VITE_GA4_MEASUREMENT_ID dans l'environnement de build, rien n'est chargé
// et le bandeau n'apparaît pas.

const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA4_MEASUREMENT_ID || '').trim()
const CONSENT_KEY = 'skeepskool-cookie-consent'
// The choice is asked again after 6 months (CNIL recommendation).
const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182
const CONSENT_EVENT = 'skeepskool:cookie-settings'

export const analyticsEnabled = Boolean(GA_MEASUREMENT_ID)

const isBrowser = () => typeof window !== 'undefined'

/** 'granted', 'denied' or null when the visitor has not chosen yet. */
export function getConsent() {
  if (!isBrowser()) return null
  try {
    const stored = JSON.parse(window.localStorage.getItem(CONSENT_KEY) || 'null')
    if (!stored || Date.now() - stored.date > CONSENT_MAX_AGE_MS) return null
    return stored.value === 'granted' || stored.value === 'denied' ? stored.value : null
  } catch {
    return null
  }
}

let gaLoaded = false

function loadGoogleAnalytics() {
  if (gaLoaded || !analyticsEnabled || !isBrowser()) return
  gaLoaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false, anonymize_ip: true })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
  trackPageView(`${window.location.pathname}${window.location.search}`)
}

function deleteGoogleAnalyticsCookies() {
  if (!isBrowser()) return
  const domains = ['', window.location.hostname, `.${window.location.hostname.replace(/^www\./, '')}`]
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim()
    if (!name.startsWith('_ga')) continue
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`
    }
  }
}

export function setConsent(value) {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, date: Date.now() }))
  } catch {
    // Storage unavailable (private mode…): the choice only lasts for this page view.
  }
  if (value === 'granted') {
    loadGoogleAnalytics()
  } else {
    deleteGoogleAnalyticsCookies()
    if (gaLoaded) window.location.reload()
  }
}

/** Loads analytics on page load when the visitor already accepted. */
export function initAnalytics() {
  if (getConsent() === 'granted') loadGoogleAnalytics()
}

/** Re-opens the cookie banner (footer link). */
export function openCookieSettings() {
  if (isBrowser()) window.dispatchEvent(new Event(CONSENT_EVENT))
}

export function onCookieSettingsRequest(callback) {
  if (!isBrowser()) return () => {}
  window.addEventListener(CONSENT_EVENT, callback)
  return () => window.removeEventListener(CONSENT_EVENT, callback)
}

const hasGtag = () => gaLoaded && isBrowser() && typeof window.gtag === 'function'

export function trackPageView(path) {
  if (!hasGtag()) return
  window.gtag('event', 'page_view', {
    page_path: path,
    send_to: GA_MEASUREMENT_ID,
  })
}

export function trackEvent(eventName, params = {}) {
  if (!hasGtag()) return
  window.gtag('event', eventName, {
    send_to: GA_MEASUREMENT_ID,
    ...params,
  })
}

export function trackConversion(conversionName, params = {}) {
  trackEvent(conversionName, {
    event_category: 'conversion',
    ...params,
  })
}
