import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../hooks/useLang'

export default function WhatsAppWidget() {
  const { lang } = useLang()
  const [isScrolling, setIsScrolling] = useState(false)
  const schedulePath = lang === 'fr' ? '/horaires' : '/schedule'

  const translations = {
    fr: {
      buttonLabel: 'Horaires des cours',
    },
    en: {
      buttonLabel: 'Lesson schedule',
    },
    de: {
      buttonLabel: 'Kurszeiten',
    },
  }

  const t = translations[lang] || translations.fr

  useEffect(() => {
    let scrollTimeout

    const handleScroll = () => {
      setIsScrolling(true)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => setIsScrolling(false), 1500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <Link
      to={schedulePath}
      aria-label={t.buttonLabel}
      className="fixed top-32 right-7 z-40 flex items-center gap-1 rounded-full bg-green-500 pl-4 pr-8 py-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600"
    >
      <img src="/images/WhatsApp.png" alt="WhatsApp" className="h-12 w-12 shrink-0 object-contain" />
      <span className="text-sm font-bold text-left leading-tight">
        {t.buttonLabel}
      </span>
    </Link>
  )
}
