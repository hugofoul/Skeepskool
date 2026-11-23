import { useMemo, useRef, useState } from 'react'
import { useLang } from '../hooks/useLang.js'
import { usePrimaryPhone } from '../hooks/usePrimaryPhone.js'
import PageHero from '../components/PageHero.jsx'
import SEO from '../components/SEO.jsx'
import Reveal from '../components/Reveal.jsx'
import { Waves } from 'lucide-react'
import { buildSrcSet } from '../utils/responsiveImage.js'
import { images } from '../data/images.js'
import { SITE_URL } from '../config/site.js'
import { trackConversion, trackEvent } from '../lib/analytics.js'
import { sendRequestEmail } from '../lib/sendRequest.js'

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
  const { t, lang, path } = useLang()
  const primaryPhone = usePrimaryPhone()
  const giftBlock = t.lessons
  const b = t.booking

  const content = t.giftVoucher

  const pagePath = path('gift')

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: t.ui.giftVoucher.howDoIBuy,
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
    email: '',
  })
  const [giftSurfers, setGiftSurfers] = useState([{ ...initialGiftSurfer }])
  const nextGiftSurferId = useRef(2)
  const [needsGiftVisual, setNeedsGiftVisual] = useState(false)
  const [paidConfirmed, setPaidConfirmed] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [hasStartedForm, setHasStartedForm] = useState(false)
  const phoneInputRef = useRef(null)

  const inputClass =
    'w-full rounded-xl border border-dark/20 bg-white px-4 py-3 text-sm max-md:text-base text-dark shadow-sm outline-none transition focus:border-royalBlue focus:ring-2 focus:ring-royalBlue/20'

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

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!event.currentTarget.checkValidity()) {
      trackEvent('gift_voucher_form_error', { reason: 'invalid_required_fields' })
      event.currentTarget.reportValidity()
      return
    }

    const fullPhone = buildFullPhone(contact)

    if (contact.phoneCountryCode === 'custom' && !/^\+[0-9]{1,4}$/.test(contact.customPhoneCountryCode.trim())) {
      setPhoneError(t.ui.giftVoucher.invalidCallingCodeE)
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

    const packageByValue = new Map(b.packages.map((pkg) => [pkg.value, pkg.label]))


    setSending(true)
    setSuccessMessage('')
    const sent = await sendRequestEmail({
      type: 'gift',
      lang,
      contact: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: fullPhone,
        email: contact.email.trim(),
      },
      surfers: giftSurfers.map((surfer) => ({
        name: `${surfer.firstName} ${surfer.lastName}`.trim(),
        package: packageByValue.get(surfer.packageValue),
      })),
      total,
      giftVisual: needsGiftVisual,
      website: honeypot,
    })
    setSending(false)
    setSendFailed(!sent)
    if (!sent) {
      trackEvent('gift_voucher_form_email_failed')
      setSuccessMessage(b.sendFailed)
      return
    }

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
        routeKey="gift"
        structuredData={structuredData}
      />
      <PageHero title={content.title} subtitle={content.subtitle} image={images.fondpages} titleClassName="font-bold -translate-y-2" compact />

      {/* ---- Gift experience block (same as on the lessons page) ---- */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="overflow-hidden rounded-3xl bg-royalBlue shadow-xl ring-1 ring-black/10">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[320px] sm:min-h-[420px] max-md:min-h-[200px]">
                <img
                  src={images.giftVoucher}
                  srcSet={buildSrcSet(images.giftVoucher)}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  alt={t.ui.giftVoucher.giftVoucherVisual}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-royalBlue sm:left-6 sm:top-6">
                  <Waves className="h-4 w-4" /> {giftBlock.giftExperienceBadge}
                </div>
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                  <h2 className="text-2xl font-black leading-tight text-white drop-shadow sm:text-3xl">
                    {giftBlock.giftExperienceTitle}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 text-white sm:p-10">
                <p className="text-base font-semibold leading-relaxed text-white/95 sm:text-lg">
                  {giftBlock.giftExperienceText1}
                </p>
                <p className="mt-4 text-sm font-semibold leading-relaxed text-white/85 sm:text-base">
                  {giftBlock.giftExperienceText2}
                </p>
                <div className="mt-6 h-1.5 w-20 rounded-full bg-yellow" />
                <div className="mt-6">
                  <a
                    href="#formulaire-bon-cadeau"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-yellow hover:text-royalBlue"
                  >
                    {giftBlock.giftExperienceCta}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="formulaire-bon-cadeau" className="scroll-mt-28 bg-lightGray py-14 sm:py-16">
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
              <div className="mt-5 grid gap-4 sm:grid-cols-2 max-md:grid-cols-2 max-md:gap-3">
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

                <label className="block sm:col-span-2 max-md:col-span-2">
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
                        {t.ui.giftVoucher.otherCallingCode}
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
                        placeholder={t.ui.giftVoucher.codeEG33}
                        inputMode="tel"
                        pattern="^\\+[0-9]{1,4}$"
                        title={t.ui.giftVoucher.requiredFormatFollowedBy}
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

                <label className="block sm:col-span-2 max-md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-dark">{b.emailOptional}</span>
                  <input
                    type="email"
                    className={inputClass}
                    value={contact.email}
                    onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                    autoComplete="email"
                    inputMode="email"
                  />
                </label>

                {/* Champ piège anti-spam : invisible pour les visiteurs */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
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

                    <div className="grid gap-4 sm:grid-cols-2 max-md:grid-cols-2 max-md:gap-3">
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

                      <label className="block sm:col-span-2 max-md:col-span-2">
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
                disabled={sending}
                className="w-full rounded-xl bg-red px-6 py-3 text-base font-black text-white shadow-md transition hover:bg-yellow hover:text-royalBlue disabled:cursor-wait disabled:opacity-70"
              >
                {sending ? b.sending : content.submit}
              </button>
            </Reveal>

            {successMessage && (
              <Reveal className={`rounded-2xl border-l-4 bg-white p-6 shadow-md ring-1 ring-black/5 ${sendFailed ? 'border-yellow' : 'border-red'}`}>
                <p className="whitespace-pre-line text-sm font-semibold leading-relaxed text-royalBlue sm:text-base">
                  {successMessage}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`tel:${primaryPhone.tel}`}
                    onClick={() => trackEvent('click_phone', { target: `tel:${primaryPhone.tel}`, source: 'gift_voucher_success_box' })}
                    className="inline-flex items-center justify-center rounded-full border border-red px-4 py-2 text-sm font-bold text-red transition hover:bg-red hover:text-white"
                  >
                    {content.callCta}
                  </a>
                </div>
              </Reveal>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
