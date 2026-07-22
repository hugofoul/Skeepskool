import { useState, useEffect } from 'react'
import { useLang } from '../hooks/useLang'

export default function WhatsAppWidget() {
  const { lang } = useLang()
  const [isScrolling, setIsScrolling] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const whatsappUrl = 'https://chat.whatsapp.com/J2vEDM7mQr23DoI61RSJFo'
  const schedulePath = lang === 'fr' ? '/horaires' : '/schedule'
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(whatsappUrl)}`

  const translations = {
    fr: {
      buttonLabel: 'Horaires des cours',
      modalTitle: 'Horaires des cours',
      weeklySiteLead: 'Si vous voulez les horaires de la semaine, consultez la page horaires du site.',
      weeklySiteCta: 'Voir la page horaires',
      whatsappLead: 'Rejoignez Skeepskool sur WhatsApp, infos sur les conditions de mer et horaires des cours d\'avril à novembre.',
      whatsappCta: 'Ouvrir le lien WhatsApp',
      close: 'Fermer',
    },
    en: {
      buttonLabel: 'Lesson schedule',
      modalTitle: 'Lesson schedule',
      weeklySiteLead: 'If you want this week\'s schedule, open the schedule page on the site.',
      weeklySiteCta: 'Open schedule page',
      whatsappLead: 'If you want lesson schedules every week, here is the WhatsApp link:',
      whatsappCta: 'Open WhatsApp link',
      close: 'Close',
    },
    de: {
      buttonLabel: 'Kurszeiten',
      modalTitle: 'Kurszeiten',
      weeklySiteLead: 'Wenn du die Zeiten der Woche willst, öffne die Zeitplan-Seite der Website.',
      weeklySiteCta: 'Zeitplan-Seite öffnen',
      whatsappLead: 'Wenn du die Kurszeiten jede Woche willst, hier ist der WhatsApp-Link:',
      whatsappCta: 'WhatsApp-Link öffnen',
      close: 'Schließen',
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

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t.buttonLabel}
        className="fixed top-32 right-4 z-40 flex items-center gap-1 rounded-full bg-green-500 pl-4 pr-8 py-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600"
      >
        <img src="/images/WhatsApp.png" alt="WhatsApp" className="h-12 w-12 shrink-0 object-contain" />
        <span className="text-sm font-bold text-left leading-tight">
          {t.buttonLabel}
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4" onClick={() => setIsOpen(false)}>
          <div
            className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={t.modalTitle}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-black text-royalBlue sm:text-2xl">{t.modalTitle}</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-2 py-1 text-sm font-semibold text-dark/70 hover:bg-black/5"
              >
                {t.close}
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-dark/80 sm:text-base">{t.weeklySiteLead}</p>
            <a
              href={schedulePath}
              className="mt-3 inline-flex rounded-full bg-royalBlue px-4 py-2 text-sm font-bold text-white transition hover:bg-royalBlue/90"
            >
              {t.weeklySiteCta}
            </a>

            <p className="mt-4 text-sm leading-relaxed text-dark/80 sm:text-base">{t.whatsappLead}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-600"
            >
              {t.whatsappCta}
            </a>

            <div className="mt-5 hidden items-start gap-4 rounded-xl bg-lightGray p-4 ring-1 ring-black/5 sm:flex">
              <img src={qrCodeUrl} alt="QR code WhatsApp" className="mx-auto h-32 w-32 rounded-lg bg-white p-1 ring-1 ring-black/10" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
