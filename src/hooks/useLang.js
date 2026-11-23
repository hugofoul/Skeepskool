import { useLanguageContext } from '../context/LanguageContext.jsx'

/**
 * useLang() returns { lang, setLang, t, path }
 * - t: the active translation object (fr, en or de)
 * - path(key, hash?): address of a page in the active language, e.g. path('booking')
 */
export function useLang() {
  return useLanguageContext()
}
