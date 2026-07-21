import { useLang } from '../hooks/useLang'
import { useState, useEffect } from 'react'

export default function WhatsAppWidget() {
  const lang = useLang()
  const [isScrolling, setIsScrolling] = useState(false)
  
  const translations = {
    fr: {
      title: 'Horaires des cours',
      description: 'Reçois les horaires sur WhatsApp chaque jeudi',
    },
    en: {
      title: 'Class Schedule',
      description: 'Get schedules every Thursday',
    },
    de: {
      title: 'Stundenplan',
      description: 'Erhalten Sie jeden Donnerstag den Zeitplan',
    },
  }

  const t = translations[lang] || translations.fr
  const whatsappUrl = 'https://chat.whatsapp.com/J2vEDM7mQr23DoI61RSJFo'

  useEffect(() => {
    let scrollTimeout
    
    const handleScroll = () => {
      setIsScrolling(true)
      
      // Clear the previous timeout
      if (scrollTimeout) clearTimeout(scrollTimeout)
      
      // Set a new timeout to hide scrolling state after 1.5s of inactivity
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 1500)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Rejoindre WhatsApp"
      className={`fixed top-32 right-4 z-40 flex items-center gap-3 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 ${
        isScrolling ? 'md:px-4 px-3' : ''
      }`}
    >
      <img src="/images/WhatsApp.png" alt="WhatsApp" className="h-12 w-12 shrink-0 object-contain" />
      <div className={`flex flex-col gap-0.5 text-sm transition-all duration-300 ${
        isScrolling ? 'hidden md:flex' : 'flex'
      }`}>
        <span className="font-bold">{t.title}</span>
        <span className="text-xs opacity-90">{t.description}</span>
      </div>
    </a>
  )
}
