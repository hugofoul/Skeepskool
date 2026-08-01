import { useMemo, useRef, useState } from 'react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'
import { CONTACT, SITE_URL } from '../config/site.js'
import { trackConversion, trackEvent } from '../lib/analytics.js'

const initialGiftSurfer = {
  id: 1,
  firstName: '',
  lastName: '',
  packageValue: 'single',
}

const priorityCountryCallingCodes = [
  { value: '+33', label: 'France (+33)' },
  { value: '+49', label: 'Allemagne (+49)' },
  { value: '+31', label: 'Pays-Bas (+31)' },
  { value: '+32', label: 'Belgique (+32)' },
]

const countryCallingCodes = [
  { value: '+41', label: 'Suisse (+41)' },
  { value: '+34', label: 'Espagne (+34)' },
  { value: '+39', label: 'Italie (+39)' },
  { value: '+44', label: 'Royaume-Uni (+44)' },
  { value: '+353', label: 'Irlande (+353)' },
  { value: '+352', label: 'Luxembourg (+352)' },
  { value: '+351', label: 'Portugal (+351)' },
  { value: '+43', label: 'Autriche (+43)' },
  { value: '+45', label: 'Danemark (+45)' },
  { value: '+46', label: 'Suede (+46)' },
  { value: '+47', label: 'Norvege (+47)' },
  { value: '+48', label: 'Pologne (+48)' },
  { value: '+420', label: 'Tchequie (+420)' },
  { value: '+30', label: 'Grece (+30)' },
  { value: '+212', label: 'Maroc (+212)' },
  { value: '+213', label: 'Algerie (+213)' },
  { value: '+216', label: 'Tunisie (+216)' },
  { value: '+1', label: 'USA/Canada (+1)' },
  { value: '+55', label: 'Bresil (+55)' },
  { value: '+61', label: 'Australie (+61)' },
]

export default function GiftVoucher() {
  const { t, lang } = useLang()
  const b = t.booking

  const content = lang === 'fr'
    ? {
      title: 'Bon cadeau surf',
      subtitle: '',
      intro: 'Remplissez les informations, choisissez la formule et finalisez via WhatsApp.',
      note: 'Bon cadeau : date a definir plus tard avec la personne qui recevra le cadeau.',
      submit: 'Envoyer la demande Bon cadeau',
      successHeader: 'Demande Bon cadeau envoyee.',
      whatsappHeader: 'Nouveau bon cadeau Skeepskool',
      callCta: 'Appeler l ecole',
    }
    : (lang === 'de'
      ? {
        title: 'Surf-Geschenkgutschein',
        subtitle: 'Verschenke einen Surfkurs oder ein Paket deiner Wahl.',
        intro: 'Geschenkgutschein-Formular: Daten ausfullen, Paket wahlen und per WhatsApp abschliessen.',
        note: 'Geschenkgutschein: Datum wird spater mit der beschenkten Person festgelegt.',
        submit: 'Geschenkgutschein-Anfrage senden',
        successHeader: 'Geschenkgutschein-Anfrage gesendet.',
        whatsappHeader: 'Neuer Skeepskool-Geschenkgutschein',
        callCta: 'Schule anrufen',
      }
      : {
        title: 'Surf gift voucher',
        subtitle: 'Offer a surf lesson or package to someone you care about.',
        intro: 'Gift voucher form: fill in details, choose the package and complete via WhatsApp.',
        note: 'Gift voucher: date will be set later with the recipient.',
        submit: 'Send gift voucher request',
        successHeader: 'Gift voucher request sent.',
        whatsappHeader: 'New Skeepskool gift voucher',
        callCta: 'Call the school',
      })

  const pagePath = lang === 'fr' ? '/bon-cadeau' : '/gift-voucher'

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: lang === 'fr'
            ? 'Comment acheter un bon cadeau ?'
            : (lang === 'de' ? 'Wie kaufe ich einen Geschenkgutschein?' : 'How do I buy a gift voucher?'),
          acceptedAnswer: {
            '@type': 'Answer',
            text: content.intro,
          },
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: content.title,
      serviceType: content.title,
      provider: {
        '@type': 'SportsActivityLocation',
        name: 'Skeepskool',
      },
      areaServed: 'Le Porge Ocean',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}${pagePath}`,
      },
    },
  ]

  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phoneCountryCode: '+33',
    customPhoneCountryCode: '',
    phone: '',
  })
  const [giftSurfers, setGiftSurfers] = useState([{ ...initialGiftSurfer }])
  const nextGiftSurferId = useRef(2)
  const [needsGiftVisual, setNeedsGiftVisual] = useState(false)
  const [paidConfirmed, setPaidConfirmed] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [hasStartedForm, setHasStartedForm] = useState(false)
  const [whatsappDeepLink, setWhatsappDeepLink] = useState('')
  const [whatsappPayload, setWhatsappPayload] = useState('')
  const [copyFeedback, setCopyFeedback] = useState('')
  const phoneInputRef = useRef(null)

  const inputClass =
    'w-full rounded-xl border border-dark/20 bg-white px-4 py-3 text-sm text-dark shadow-sm outline-none transition focus:border-royalBlue focus:ring-2 focus:ring-royalBlue/20'

  const buildFullPhone = ({ phoneCountryCode, customPhoneCountryCode, phone }) => {
    const selectedCode = phoneCountryCode === 'custom' ? customPhoneCountryCode : phoneCountryCode
    return `${selectedCode} ${phone}`.replace(/\s+/g, ' ').trim()
  }

  const isValidPhone = (phoneValue) => {
    const trimmed = phoneValue.trim()
    const basicFormatOk = /^\+?[0-9\s().-]{8,22}$/.test(trimmed)
    const digitsOnly = trimmed.replace(/\D/g, '')
    return basicFormatOk && digitsOnly.length >= 8 && digitsOnly.length <= 15
  }

  const total = useMemo(() => {
    const packageByValue = new Map((b.packages || []).map((pkg) => [pkg.value, pkg.price]))
    return giftSurfers.reduce((sum, surfer) => sum + (packageByValue.get(surfer.packageValue) ?? 0), 0)
  }, [b.packages, giftSurfers])

  const markFormStarted = () => {
    if (hasStartedForm) return
    setHasStartedForm(true)
    trackEvent('gift_voucher_form_started', { lang })
  }

  const updateGiftSurfer = (index, field, value) => {
    setGiftSurfers((prev) =>
      prev.map((surfer, i) => (i === index ? { ...surfer, [field]: value } : surfer)),
    )
  }

  const addGiftSurfer = () => {
    setGiftSurfers((prev) => [
      ...prev,
      {
        ...initialGiftSurfer,
        id: nextGiftSurferId.current++,
      },
    ])
  }

  const removeGiftSurfer = (index) => {
    setGiftSurfers((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      trackEvent('gift_voucher_form_error', { reason: 'invalid_required_fields' })
      event.currentTarget.reportValidity()
      return
    }

    const fullPhone = buildFullPhone(contact)

    if (contact.phoneCountryCode === 'custom' && !/^\+[0-9]{1,4}$/.test(contact.customPhoneCountryCode.trim())) {
      setPhoneError(lang === 'fr' ? 'Indicatif invalide (ex: +33).' : 'Invalid calling code (e.g. +33).')
      trackEvent('gift_voucher_form_error', { reason: 'invalid_country_code' })
      return
    }

    if (!isValidPhone(fullPhone)) {
      setPhoneError(b.phoneInvalid)
      trackEvent('gift_voucher_form_error', { reason: 'invalid_phone' })
      phoneInputRef.current?.focus({ preventScroll: true })
      return
    }
    setPhoneError('')

    const fullName = `${contact.firstName} ${contact.lastName}`.trim()

    const packageByValue = new Map(b.packages.map((pkg) => [pkg.value, pkg.label]))

    const giftLines = giftSurfers
      .map((surfer, index) => {
        const surferName = `${surfer.firstName} ${surfer.lastName}`.trim()
        return `- ${b.whatsappSurferLine} ${index + 1}: ${surferName}, ${packageByValue.get(surfer.packageValue)}`
      })
      .join('\n')

    const whatsappMessage = [
      content.whatsappHeader,
      `${b.whatsappContact} ${fullName} - ${fullPhone}`,
      `${b.whatsappDate} ${b.giftVoucherDateValue}`,
      `${b.whatsappGiftVoucher} ${b.giftVoucherYes}`,
      `${b.whatsappGiftVisual} ${needsGiftVisual ? b.giftVoucherYes : b.giftVoucherNo}`,
      `${b.whatsappTotal} ${total}€`,
      b.whatsappPayment,
      '',
      b.whatsappSurfers,
      giftLines,
      '',
      b.whatsappClosing,
    ].join('\n')

    const encoded = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/${CONTACT.whatsappNumber}?text=${encoded}`
    setWhatsappPayload(whatsappMessage)
    setWhatsappDeepLink(whatsappUrl)
    setCopyFeedback('')
    trackEvent('click_whatsapp', { source: 'gift_voucher_form', target: whatsappUrl })
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    trackConversion('gift_voucher_form_submitted', {
      surfers_count: giftSurfers.length,
      total_eur: total,
      is_gift_voucher: true,
      needs_visual: needsGiftVisual,
    })

    setSuccessMessage(content.successHeader)
  }

  return (
    <div>
      <SEO
        title={content.title}
        description={content.intro}
        path={pagePath}
        lang={lang}
        alternates={[
          { hrefLang: 'fr-FR', path: '/bon-cadeau' },
          { hrefLang: 'en', path: '/gift-voucher' },
          { hrefLang: 'de', path: '/gift-voucher' },
          { hrefLang: 'x-default', path: '/bon-cadeau' },
        ]}
        structuredData={structuredData}
      />
      <PageHero title={content.title} subtitle={content.subtitle} image={images.fondpages} titleClassName="font-bold -translate-y-2" compact />

      <section className="bg-lightGray py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[680px] px-4 sm:px-6">
          <Reveal className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5">
            <div className="grid gap-4 px-5 py-5 sm:px-6">
              <div className="rounded-xl border border-red/30 bg-red/10 px-4 py-3">
                <p className="text-sm font-bold leading-relaxed text-royalBlue">{content.note}</p>
              </div>
              <div className="rounded-xl border border-yellow/30 bg-yellow/10 px-4 py-3">
                <p className="text-sm font-semibold leading-relaxed text-dark">{b.giftVoucherValidityNote}</p>
              </div>
            </div>
          </Reveal>

          <form
            onFocusCapture={markFormStarted}
            onSubmit={handleSubmit}
            className="mt-8 space-y-8"
          >
            <Reveal className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 sm:p-7">
              <h2 className="text-xl font-black text-royalBlue">{b.contactTitleGift}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-dark">{b.firstName}</span>
                  <input
                    type="text"
                    className={inputClass}
                    value={contact.firstName}
                    onChange={(e) => setContact((prev) => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-dark">{b.lastName}</span>
                  <input
                    type="text"
                    className={inputClass}
                    value={contact.lastName}
                    onChange={(e) => setContact((prev) => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-dark">{b.phone}</span>
                  <div className="grid gap-3 sm:grid-cols-[170px_1fr]">
                    <select
                      className={inputClass}
                      value={contact.phoneCountryCode}
                      onChange={(e) => {
                        const nextCode = e.target.value
                        setContact((prev) => ({
                          ...prev,
                          phoneCountryCode: nextCode,
                          customPhoneCountryCode: nextCode === 'custom' ? prev.customPhoneCountryCode : '',
                        }))
                        if (phoneError) setPhoneError('')
                      }}
                      autoComplete="tel-country-code"
                      aria-label="Indicatif pays"
                    >
                      {priorityCountryCallingCodes.map((code) => (
                        <option key={`priority-${code.value}`} value={code.value}>
                          {code.label}
                        </option>
                      ))}
                      <option disabled>──────────</option>
                      {countryCallingCodes.map((code) => (
                        <option key={code.value} value={code.value}>
                          {code.label}
                        </option>
                      ))}
                      <option value="custom">
                        {lang === 'fr' ? 'Autre indicatif...' : 'Other calling code...'}
                      </option>
                    </select>
                    {contact.phoneCountryCode === 'custom' && (
                      <input
                        type="text"
                        className={inputClass}
                        value={contact.customPhoneCountryCode}
                        onChange={(e) => {
                          setContact((prev) => ({ ...prev, customPhoneCountryCode: e.target.value }))
                          if (phoneError) setPhoneError('')
                        }}
                        placeholder={lang === 'fr' ? 'Indicatif ex: +33' : 'Code e.g. +33'}
                        inputMode="tel"
                        pattern="^\\+[0-9]{1,4}$"
                        title={lang === 'fr' ? 'Format requis: + suivi de 1 a 4 chiffres.' : 'Required format: + followed by 1 to 4 digits.'}
                        required
                      />
                    )}
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      className={inputClass}
                      value={contact.phone}
                      onChange={(e) => {
                        setContact((prev) => ({ ...prev, phone: e.target.value }))
                        if (phoneError) setPhoneError('')
                      }}
                      inputMode="tel"
                      autoComplete="tel-national"
                      pattern="^[0-9\\s().-]{6,18}$"
                      title={b.phoneHint}
                      required
                    />
                  </div>
                  {phoneError && <span className="mt-1 block text-xs font-bold text-red">{phoneError}</span>}
                </label>
              </div>
            </Reveal>

            <Reveal className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 sm:p-7">
              <h2 className="text-xl font-black text-royalBlue">{b.surfersTitle}</h2>

              <div className="mt-5 space-y-5">
                {giftSurfers.map((surfer, index) => (
                  <div
                    key={surfer.id}
                    className="rounded-2xl border-l-4 border-red bg-white p-5 shadow-sm ring-1 ring-black/5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-extrabold text-royalBlue">
                        {b.surferLabel} {index + 1}
                      </h3>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeGiftSurfer(index)}
                          className="rounded-lg border border-red px-3 py-1.5 text-sm font-semibold text-red transition hover:bg-red hover:text-white"
                        >
                          {b.removeSurfer}
                        </button>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-dark">{b.surferFirstName}</span>
                        <input
                          type="text"
                          className={inputClass}
                          value={surfer.firstName}
                          onChange={(e) => updateGiftSurfer(index, 'firstName', e.target.value)}
                          required
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-dark">{b.surferLastName}</span>
                        <input
                          type="text"
                          className={inputClass}
                          value={surfer.lastName}
                          onChange={(e) => updateGiftSurfer(index, 'lastName', e.target.value)}
                          required
                        />
                      </label>

                      <label className="block sm:col-span-2">
                        <span className="mb-2 block text-sm font-semibold text-dark">{b.surferPackageGift}</span>
                        <select
                          className={inputClass}
                          value={surfer.packageValue}
                          onChange={(e) => {
                            updateGiftSurfer(index, 'packageValue', e.target.value)
                            trackEvent('gift_package_selected', {
                              surfer_index: index + 1,
                              package_value: e.target.value,
                            })
                          }}
                          required
                        >
                          {b.packages.map((pkg) => (
                            <option key={pkg.value} value={pkg.value}>
                              {pkg.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addGiftSurfer}
                className="mt-5 rounded-xl border-2 border-royalBlue px-4 py-2.5 font-bold text-royalBlue transition hover:bg-royalBlue hover:text-white"
              >
                {b.addSurfer}
              </button>
            </Reveal>

            <div className="rounded-xl border border-black/10 bg-lightGray px-4 py-3 shadow-sm">
              <label className="flex items-start gap-3 text-sm font-semibold text-royalBlue">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-dark/30 text-royalBlue focus:ring-royalBlue"
                    checked={needsGiftVisual}
                    onChange={(e) => setNeedsGiftVisual(e.target.checked)}
                  />
                  <span>{b.giftVisualCheckbox}</span>
              </label>
            </div>

            <Reveal className="rounded-2xl border border-yellow/60 bg-yellow/20 p-5 text-royalBlue shadow-sm">
              <p className="text-xl font-black">
                {b.totalLabel} {total}€
              </p>
            </Reveal>

            <Reveal className="rounded-2xl border-2 border-red bg-yellow p-6 text-royalBlue shadow-md">
              <p className="text-base font-black leading-relaxed">{b.warning}</p>
              {b.paylibLabel && <p className="mt-3 text-sm font-semibold">{b.paylibLabel}</p>}
              <p className="mt-2 text-sm font-semibold">{b.ibanLabel}</p>
              <p className="mt-3 text-sm font-semibold">{b.warningFooter}</p>
            </Reveal>

            <Reveal className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
              <label className="flex items-start gap-3 text-sm font-semibold text-royalBlue sm:text-base">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 rounded border-dark/30 text-red focus:ring-royalBlue"
                  checked={paidConfirmed}
                  onChange={(e) => setPaidConfirmed(e.target.checked)}
                  required
                />
                <span>{b.paidCheckbox}</span>
              </label>
            </Reveal>

            <Reveal>
              <button
                type="submit"
                className="w-full rounded-xl bg-red px-6 py-3 text-base font-black text-white shadow-md transition hover:bg-yellow hover:text-royalBlue"
              >
                {content.submit}
              </button>
            </Reveal>

            {successMessage && (
              <Reveal className="rounded-2xl border-l-4 border-red bg-white p-6 shadow-md ring-1 ring-black/5">
                <p className="whitespace-pre-line text-sm font-semibold leading-relaxed text-royalBlue sm:text-base">
                  {successMessage}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {whatsappDeepLink && (
                    <a
                      href={whatsappDeepLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('click_whatsapp', { source: 'gift_voucher_success_box', target: whatsappDeepLink })}
                      className="inline-flex items-center justify-center rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700"
                    >
                      {lang === 'fr' ? 'Ouvrir WhatsApp' : (lang === 'de' ? 'WhatsApp offnen' : 'Open WhatsApp')}
                    </a>
                  )}
                  {whatsappPayload && (
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(whatsappPayload)
                          setCopyFeedback(lang === 'fr' ? 'Message copie.' : (lang === 'de' ? 'Nachricht kopiert.' : 'Message copied.'))
                        } catch {
                          setCopyFeedback(lang === 'fr' ? 'Impossible de copier automatiquement.' : (lang === 'de' ? 'Automatisches Kopieren fehlgeschlagen.' : 'Unable to copy automatically.'))
                        }
                      }}
                      className="inline-flex items-center justify-center rounded-full border border-royalBlue px-4 py-2 text-sm font-bold text-royalBlue transition hover:bg-royalBlue hover:text-white"
                    >
                      {lang === 'fr' ? 'Copier le message' : (lang === 'de' ? 'Nachricht kopieren' : 'Copy message')}
                    </button>
                  )}
                  <a
                    href={`tel:${CONTACT.phonePrimary}`}
                    onClick={() => trackEvent('click_phone', { target: `tel:${CONTACT.phonePrimary}`, source: 'gift_voucher_success_box' })}
                    className="inline-flex items-center justify-center rounded-full border border-red px-4 py-2 text-sm font-bold text-red transition hover:bg-red hover:text-white"
                  >
                    {content.callCta}
                  </a>
                </div>
                {copyFeedback && (
                  <p className="mt-3 text-xs font-semibold text-royalBlue/80">{copyFeedback}</p>
                )}
              </Reveal>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
