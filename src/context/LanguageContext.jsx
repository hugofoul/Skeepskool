import { createContext, useContext, useEffect, useState } from 'react'
import { fr } from '../translations/fr.js'
import { en } from '../translations/en.js'
import { de } from '../translations/de.js'

const dictionaries = { fr, en, de }

export const LanguageContext = createContext({
  lang: 'fr',
  setLang: () => {},
  t: fr,
})

const STORAGE_KEY = 'skeepskool-lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'fr'
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'en' || stored === 'fr' || stored === 'de' ? stored : 'fr'
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = {
    lang,
    setLang,
    t: dictionaries[lang],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  return useContext(LanguageContext)
}
