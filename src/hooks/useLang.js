import { useLanguageContext } from '../context/LanguageContext.jsx'

/**
 * useLang() returns { lang, setLang, toggle, t }
 * where t is the active translation object (fr or en).
 */
export function useLang() {
  const { lang, setLang, t } = useLanguageContext()

  const toggle = () => setLang(lang === 'fr' ? 'en' : 'fr')

  return { lang, setLang, toggle, t }
}
