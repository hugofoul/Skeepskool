import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../hooks/useLang.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import { images } from '../data/images.js'
import { CONTACT } from '../config/site.js'
import { trackConversion } from '../lib/analytics.js'

const initialSurfer = {
  id: 1,
  firstName: '',
  lastName: '',
  age: '',
  level: 'beginner',
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

export default function Booking() {
  const { t, lang } = useLang()
  const b = t.booking

  const todayDate = useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date.toISOString().slice(0, 10)
  }, [])

  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phoneCountryCode: '+33',
    customPhoneCountryCode: '',
    phone: '',
  })
  const [surfers, setSurfers] = useState([{ ...initialSurfer }])
  const nextSurferId = useRef(2)
  const [startDate, setStartDate] = useState('')
  const [paymentType, setPaymentType] = useState('transfer')
  const [payerName, setPayerName] = useState('')
  const [sameAsContactSurfer, setSameAsContactSurfer] = useState(false)
  const [sameAsContactPayer, setSameAsContactPayer] = useState(false)
  const [message, setMessage] = useState('')
  const [paidConfirmed, setPaidConfirmed] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [dateError, setDateError] = useState('')
  const formRef = useRef(null)
  const phoneInputRef = useRef(null)
  const startDateInputRef = useRef(null)

  const daysUntilStartDate = useMemo(() => {
    if (!startDate) return null
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const selected = new Date(`${startDate}T00:00:00`)
    return Math.floor((selected - today) / 86400000)
  }, [startDate])

  const isShortNotice =
    daysUntilStartDate !== null && daysUntilStartDate >= 0 && daysUntilStartDate < 3

  const scrollToField = (element) => {
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    element.focus({ preventScroll: true })
  }

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

  useEffect(() => {
    if (!sameAsContactSurfer) return
    setSurfers((prev) => {
      if (!prev.length) return prev
      return prev.map((surfer, index) =>
        index === 0
          ? { ...surfer, firstName: contact.firstName, lastName: contact.lastName }
          : surfer,
      )
    })
  }, [contact.firstName, contact.lastName, sameAsContactSurfer])

  useEffect(() => {
    if (!sameAsContactPayer) return
    const fullName = `${contact.firstName} ${contact.lastName}`.trim()
    setPayerName(fullName)
  }, [contact.firstName, contact.lastName, sameAsContactPayer])

  const total = useMemo(() => {
    const packageByValue = new Map(b.packages.map((pkg) => [pkg.value, pkg.price]))
    return surfers.reduce((sum, surfer) => sum + (packageByValue.get(surfer.packageValue) ?? 0), 0)
  }, [b.packages, surfers])

  const inputClass =
    'w-full rounded-xl border border-dark/20 bg-white px-4 py-3 text-sm text-dark shadow-sm outline-none transition focus:border-royalBlue focus:ring-2 focus:ring-royalBlue/20'

  const updateSurfer = (index, field, value) => {
    setSurfers((prev) =>
      prev.map((surfer, i) => (i === index ? { ...surfer, [field]: value } : surfer)),
    )
  }

  const addSurfer = () => {
    setSurfers((prev) => [
      ...prev,
      {
        ...initialSurfer,
        id: nextSurferId.current++,
      },
    ])
  }

  const removeSurfer = (index) => {
    setSurfers((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      const firstInvalid = event.currentTarget.querySelector(':invalid')
      scrollToField(firstInvalid)
      return
    }

    const fullPhone = buildFullPhone(contact)

    if (contact.phoneCountryCode === 'custom' && !/^\+[0-9]{1,4}$/.test(contact.customPhoneCountryCode.trim())) {
      setPhoneError(lang === 'fr' ? 'Indicatif invalide (ex: +33).' : 'Invalid calling code (e.g. +33).')
      return
    }

    if (!isValidPhone(fullPhone)) {
      setPhoneError(b.phoneInvalid)
      scrollToField(phoneInputRef.current)
      return
    }
    setPhoneError('')

    if (isShortNotice) {
      setDateError(b.shortNoticeAlert)
      scrollToField(startDateInputRef.current)
      return
    }
    setDateError('')

    const selectedDate = startDate || b.unknownDate
    const safeMessage = message.trim() || b.none
    const fullName = `${contact.firstName} ${contact.lastName}`.trim()

    const packageByValue = new Map(b.packages.map((pkg) => [pkg.value, pkg.label]))
    const levelByValue = new Map(b.levels.map((level) => [level.value, level.label]))
    const paymentMethodByValue = new Map(b.paymentMethods.map((method) => [method.value, method.label]))

    const surfersLines = surfers
      .map((surfer, index) => {
        const ageSuffix = b.whatsappSurferLine === 'Surfer' ? ' y/o' : ' ans'
        const surferName = `${surfer.firstName} ${surfer.lastName}`.trim()
        return `- ${b.whatsappSurferLine} ${index + 1}: ${surferName}, ${surfer.age}${ageSuffix}, ${levelByValue.get(
          surfer.level,
        )}, ${packageByValue.get(surfer.packageValue)}`
      })
      .join('\n')

    const whatsappMessage = [
      b.whatsappHeader,
      `${b.whatsappContact} ${fullName} - ${fullPhone}`,
      `${b.whatsappDate} ${selectedDate}`,
      `${b.whatsappTotal} ${total}€`,
      b.whatsappPayment,
      `${b.whatsappPaymentType} ${paymentMethodByValue.get(paymentType)}`,
      `${b.whatsappPayerName} ${payerName}`,
      '',
      b.whatsappSurfers,
      surfersLines,
      '',
      `${b.whatsappMessage} ${safeMessage}`,
      b.whatsappCallWeek,
      b.whatsappClosing,
    ].join('\n')

    const encoded = encodeURIComponent(whatsappMessage)
    window.open(`https://wa.me/${CONTACT.whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer')

    trackConversion('booking_form_submitted', {
      surfers_count: surfers.length,
      total_eur: total,
      payment_type: paymentType,
    })

    const displayName = contact.firstName || b.firstName
    const successLead = b.successLead.replace('{name}', displayName)
    setSuccessMessage(`${successLead}\n${b.callWeekNote}\n${b.successEnd}`)
  }

  return (
    <div>
      <SEO
        title={lang === 'fr' ? 'Réserver' : (lang === 'de' ? 'Buchen' : 'Book a Lesson')}
        path={lang === 'fr' ? '/reserver' : '/book'}
        alternates={[
          { hrefLang: 'fr-FR', path: '/reserver' },
          { hrefLang: 'en', path: '/book' },
          { hrefLang: 'x-default', path: '/reserver' },
        ]}
        description={lang === 'fr'
          ? "Réservez votre cours de surf à Skeepskool, école de surf au Porge Océan. Choisissez votre formule et validez votre place en ligne."
          : (lang === 'de'
            ? 'Buche deinen Surfkurs bei Skeepskool in Le Porge Océan. Wähle dein Paket und sichere deinen Platz online.'
            : "Book your surf lesson at Skeepskool, surf school at Le Porge Océan. Choose your package and secure your spot online.")}
      />
      <PageHero title={b.title} subtitle={b.subtitle} image={images.fondpages} />

      <section className="bg-lightGray py-14 sm:py-16">
        <div className="mx-auto w-full max-w-[680px] px-4 sm:px-6">
          <Reveal className="rounded-2xl bg-royalBlue p-6 text-white shadow-lg sm:p-7">
            <p className="text-sm font-semibold leading-relaxed sm:text-base">{b.intro}</p>
          </Reveal>

          <Reveal className="mt-4 rounded-2xl border border-yellow/50 bg-yellow px-5 py-4 text-royalBlue shadow-md sm:px-6">
            <p className="text-sm font-black leading-relaxed sm:text-base">{b.startDateNote}</p>
          </Reveal>

          <form
            ref={formRef}
            onInvalidCapture={(e) => {
              e.preventDefault()
              scrollToField(e.target)
            }}
            onSubmit={handleSubmit}
            className="mt-8 space-y-8"
          >
            <Reveal className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 sm:p-7">
              <h2 className="text-xl font-black text-royalBlue">{b.contactTitle}</h2>
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

              <label className="mt-5 flex items-start gap-3 rounded-xl bg-lightGray p-3 text-sm font-semibold text-royalBlue">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-dark/30 text-royalBlue focus:ring-royalBlue"
                  checked={sameAsContactSurfer}
                  onChange={(e) => setSameAsContactSurfer(e.target.checked)}
                />
                <span>{b.sameAsContactSurfer}</span>
              </label>

              <div className="mt-5 space-y-5">
                {surfers.map((surfer, index) => (
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
                          onClick={() => removeSurfer(index)}
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
                          onChange={(e) => updateSurfer(index, 'firstName', e.target.value)}
                          required
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-dark">{b.surferLastName}</span>
                        <input
                          type="text"
                          className={inputClass}
                          value={surfer.lastName}
                          onChange={(e) => updateSurfer(index, 'lastName', e.target.value)}
                          required
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-dark">{b.surferAge}</span>
                        <input
                          type="number"
                          min="1"
                          className={inputClass}
                          value={surfer.age}
                          onChange={(e) => updateSurfer(index, 'age', e.target.value)}
                          required
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-dark">{b.surferLevel}</span>
                        <select
                          className={inputClass}
                          value={surfer.level}
                          onChange={(e) => updateSurfer(index, 'level', e.target.value)}
                          required
                        >
                          {b.levels.map((level) => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="block sm:col-span-2">
                        <span className="mb-2 block text-sm font-semibold text-dark">{b.surferPackage}</span>
                        <select
                          className={inputClass}
                          value={surfer.packageValue}
                          onChange={(e) => updateSurfer(index, 'packageValue', e.target.value)}
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
                onClick={addSurfer}
                className="mt-5 rounded-xl border-2 border-royalBlue px-4 py-2.5 font-bold text-royalBlue transition hover:bg-royalBlue hover:text-white"
              >
                {b.addSurfer}
              </button>
            </Reveal>

            <Reveal className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 sm:p-7">
              <h2 className="text-xl font-black text-royalBlue">{b.commonTitle}</h2>

              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-dark">{b.startDate}</span>
                  <input
                    ref={startDateInputRef}
                    type="date"
                    className={inputClass}
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value)
                      if (dateError) setDateError('')
                    }}
                    min={todayDate}
                    required
                  />
                  {(isShortNotice || dateError) && (
                    <span className="mt-2 block text-xs font-bold text-red">{b.shortNoticeAlert}</span>
                  )}
                </label>

                <label className="block sm:max-w-sm">
                  <span className="mb-2 block text-sm font-semibold text-dark">{b.paymentType}</span>
                  <select
                    className={inputClass}
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    required
                  >
                    {b.paymentMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex items-start gap-3 rounded-xl bg-lightGray p-3 text-sm font-semibold text-royalBlue">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-dark/30 text-royalBlue focus:ring-royalBlue"
                    checked={sameAsContactPayer}
                    onChange={(e) => setSameAsContactPayer(e.target.checked)}
                  />
                  <span>{b.sameAsContactPayer}</span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-dark">{b.payerName}</span>
                  <input
                    type="text"
                    className={inputClass}
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-dark">{b.optionalMessage}</span>
                  <textarea
                    className={`${inputClass} min-h-28 resize-y`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
              </div>
            </Reveal>

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
              <p className="mt-3 text-sm font-extrabold">{b.callWeekNote}</p>
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
                {b.submit}
              </button>
            </Reveal>

            {successMessage && (
              <Reveal className="rounded-2xl border-l-4 border-red bg-white p-6 shadow-md ring-1 ring-black/5">
                <p className="whitespace-pre-line text-sm font-semibold leading-relaxed text-royalBlue sm:text-base">
                  {successMessage}
                </p>
              </Reveal>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
