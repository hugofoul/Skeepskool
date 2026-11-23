import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fr } from '../translations/fr.js'
import { en } from '../translations/en.js'
import { de } from '../translations/de.js'
import { DEFAULT_LANG, langFromPath, pathFor, routeFromPath } from '../config/routes.js'

const dictionaries = { fr, en, de }

export const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: fr,
  path: (key, hash) => pathFor(key, DEFAULT_LANG, hash),
})

/**
 * The language comes from the URL (/en/…, /de/…, French otherwise), so every
 * language has its own indexable address. Changing language navigates to the
 * same page in the other language.
 */
export function LanguageProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = langFromPath(location.pathname)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((nextLang) => {
    if (nextLang === lang) return
    const route = routeFromPath(location.pathname)
    navigate(pathFor(route ? route.key : 'home', nextLang, location.hash))
  }, [lang, location.pathname, location.hash, navigate])

  const value = useMemo(() => ({
    lang,
    setLang,
    t: dictionaries[lang],
    path: (key, hash) => pathFor(key, lang, hash),
  }), [lang, setLang])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  return useContext(LanguageContext)
}
