const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA4_MEASUREMENT_ID || '').trim()

const hasGtag = () =>
  typeof window !== 'undefined' &&
  typeof window.gtag === 'function' &&
  Boolean(GA_MEASUREMENT_ID)

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
