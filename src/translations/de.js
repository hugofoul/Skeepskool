import { en } from './en.js'

export const de = {
  ...en,
  tagline: 'Lebe den Ozean',
  ffsLabel: 'Franzosische Surfschule - FFS-zertifiziert',
  bookNow: 'Buchen',
  bookNowLong: 'Jetzt buchen',
  learnMore: 'Mehr erfahren',
  seasonBadge: 'Geoffnet von April bis November',

  quickActions: {
    response: 'Schnelle Antwort',
    call: 'Anrufen',
    book: 'Buchen',
  },

  nav: {
    home: 'Startseite',
    school: 'Schule',
    lessons: 'Pakete',
    photos: 'Fotos',
    book: 'Buchen',
    schedule: 'Zeitplan',
    rental: 'Verleih',
    around: 'Rundherum',
    contact: 'Infos',
  },

  home: {
    ...en.home,
    heroTagline: 'Lebe den Ozean',
    heroCta: 'Jetzt buchen',
    heroSecondaryCta: 'Jetzt anrufen',
    schedulePreview: {
      ...en.home.schedulePreview,
      badge: 'Wochenplan',
      title: 'Die nachsten Kurszeiten auf einen Blick',
      cta: 'Vollen Zeitplan ansehen',
    },
    surfConditions: {
      ...en.home.surfConditions,
      title: 'Surfbedingungen fur dieses Wochenende',
      fallbackParagraphs: ['Update zu den Bedingungen folgt bald.'],
    },
    findUsTitle: 'So findest du uns',
    reviewsTitle: 'Google-Bewertung hinterlassen',
    reviewsCta: 'Google-Bewertung schreiben',
  },

  school: {
    ...en.school,
    heroTitle: 'Die Schule',
    teamTitle: 'Das Skeepskool-Team',
  },

  lessons: {
    ...en.lessons,
    heroTitle: 'Kurse & Preise',
    pricesTitle: 'Preise & Pakete',
    popular: 'Beliebt',
    perSession: '/ Einheit',
  },

  schedule: {
    ...en.schedule,
    title: 'Kurszeiten',
    liveLabel: 'Aktualisiert',
    fallbackLabel: 'Bald verfugbar',
    callWidgetTitle: 'Telefonische Auskunft',
    callWidgetCta: 'Anrufen',
  },

  booking: {
    ...en.booking,
    heroTitle: 'Buchen',
    submitCta: 'Anfrage senden',
  },

  rental: {
    ...en.rental,
    heroTitle: 'Materialverleih',
  },

  contact: {
    ...en.contact,
    heroTitle: 'Praktische Infos',
    infoTitle: 'Kontaktdaten',
  },

  around: {
    ...en.around,
    heroTitle: 'Rund um uns',
    campingTitle: 'Ubernachten',
    restaurantsTitle: 'Essen',
    tourismTitle: 'Tourismusburo',
  },

  footer: {
    ...en.footer,
    quickLinks: 'Schnellzugriff',
    contact: 'Kontakt',
    legal: 'Rechtliche Hinweise',
  },

  legal: {
    ...en.legal,
    heroTitle: 'Rechtliche Hinweise',
  },
}