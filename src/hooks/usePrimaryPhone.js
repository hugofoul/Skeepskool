import { useEffect, useState } from 'react'
import { PHONES, isHighSeason } from '../config/site.js'

// Pre-rendering runs in headless Chrome: keep the default number in the saved HTML.
const isPrerendering = () => typeof navigator !== 'undefined' && /HeadlessChrome/.test(navigator.userAgent)

/**
 * Phone number to highlight: the beach number in July and August.
 * The first render always uses the default number so that it matches the
 * pre-rendered HTML; the seasonal number is applied right after.
 */
export function usePrimaryPhone() {
  const [highSeason, setHighSeason] = useState(false)

  useEffect(() => {
    if (!isPrerendering()) setHighSeason(isHighSeason())
  }, [])

  return highSeason ? PHONES.highSeason : PHONES.default
}
