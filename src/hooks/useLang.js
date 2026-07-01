import { useLanguageContext } from '../context/LanguageContext.jsx'

/**
 * useLang() returns { lang, setLang, toggle, t }
 * where t is the active translation object (fr, en or de).
 */
export function useLang() {
  const { lang, setLang, t } = useLanguageContext()

  const toggle = () => {
    if (lang === 'fr') setLang('en')
    else if (lang === 'en') setLang('de')
    else setLang('fr')
  }

  return { lang, setLang, toggle, t }
}
