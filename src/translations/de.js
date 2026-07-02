import { en } from './en.js'

export const de = {
  ...en,
  tagline: 'Lebe den Ozean',
  ffsLabel: 'Französische Surfschule — FFS-zertifiziert',
  bookNow: 'Buchen',
  bookNowLong: 'Jetzt buchen',
  learnMore: 'Mehr erfahren',
  seasonBadge: 'Geöffnet von April bis November',

  quickActions: {
    response: 'Schnelle Antwort',
    call: 'Anrufen',
    book: 'Buchen',
  },

  nav: {
    home: 'Startseite',
    school: 'Schule',
    lessons: 'Kurse',
    photos: 'Fotos',
    book: 'Buchen',
    schedule: 'Stundenplan',
    rental: 'Verleih',
    around: 'In der Nähe',
    contact: 'Praktische Infos',
  },

  home: {
    ...en.home,
    heroTitle: 'SKEEPSKOOL',
    heroTagline: 'Lebe den Ozean',
    heroSubtitle:
      '40 m nördlich vom Hauptzugang des Zentralstrands von Le Porge heißt dich unsere Schule am Fuß der Düne und des Pinienwaldes willkommen.',
    campingNotePrefix: 'Die Surfschule direkt beim ',
    campingNoteLink: 'Camping La Grigne',
    heroCta: 'Jetzt buchen',
    heroSecondaryCta: 'Jetzt anrufen',
    heroTrustItems: ['Staatlich geprüfte Lehrer', 'Ab 5 Jahren', 'Material inklusive'],
    highlights: [
      {
        title: 'Kurse',
        text: 'Gruppen- und Privatkurse ab 5 Jahren, betreut von qualifizierten Lehrern.',
      },
      {
        title: 'Verleih',
        text: 'Surfboards, Bodyboards und Neoprenanzüge direkt am Strand zu mieten.',
      },
      {
        title: 'FFS-Label',
        text: 'Mitglied der Fédération Française de Surf — zertifizierte Surfschule.',
      },
    ],
    aboutTitle: 'Surfen vor den Toren von Bordeaux',
    aboutText:
      'Der nächstgelegene Atlantikstrand von Bordeaux. Surfkurse ab 5 Jahren mit staatlich geprüften Lehrern, von April bis November.',
    schedulePreview: {
      ...en.home.schedulePreview,
      badge: 'Wochenplan',
      title: 'Die nächsten Kurszeiten auf einen Blick',
      text: 'Finde Gruppenkurse, Kinder-Sessions und Sunset-Slots und öffne dann den kompletten Wochenplan.',
      cta: 'Vollen Zeitplan ansehen',
    },
    surfConditions: {
      ...en.home.surfConditions,
      badge: 'Bedingungen',
      title: 'Surfbedingungen für dieses Wochenende',
      fallbackParagraphs: ['Update zu den Bedingungen folgt bald.'],
    },
    findUsTitle: 'So findest du uns',
    findUs: {
      ...en.home.findUs,
      byCarLabel: 'Mit dem Auto',
      byCar:
        '~50 Min. ab Bordeaux über die D6 und dann D3 Richtung Le Porge → den Schildern „Le Porge Océan“ folgen.',
      citiesLabel: 'Nächstgelegene Städte',
      parkingLabel: 'Parken',
      parking: 'Kostenloser Parkplatz in Strandnähe.',
    },
    reviewsTitle: 'Google-Bewertung hinterlassen',
    reviewsText: 'Dein Feedback hilft uns! Wenn dir deine Erfahrung bei Skeepskool gefallen hat, freuen wir uns über eine Google-Bewertung.',
    reviewsCta: 'Google-Bewertung schreiben',
    testimonialsTitle: 'Sie sind mit uns gesurft',
    testimonials: [
      {
        name: 'Camille D.',
        text: 'Erste Familien-Surfstunde: super Empfang und sehr pädagogischer Lehrer. Die Kinder waren begeistert!',
      },
      {
        name: 'Julien M.',
        text: 'Wunderschöner Spot zwischen Düne und Wald. Nach zwei Kursen stand ich bereits auf dem Board.',
      },
      {
        name: 'Sarah L.',
        text: 'Das 5er-Paket ist perfekt zum echten Fortschritt. Tolles, herzliches Team.',
      },
    ],
  },

  school: {
    ...en.school,
    heroTitle: 'Die Schule',
    heroSubtitle: 'Ein geschützter Spot, ein leidenschaftliches Team, ein verlässliches Label.',
    sections: [
      {
        tag: 'Der Spot',
        title: 'Zwischen Dünen und Pinienwald',
        text:
          'Der Strand von Le Porge Océan liegt zwischen Dünen und Pinienwald und bietet einen außergewöhnlichen Naturrahmen, um Surfen zu lernen.',
      },
      {
        tag: 'Unsere Pädagogik',
        title: 'Ein echtes Sporttraining',
        text:
          'Jede Einheit ist wie ein strukturiertes Sporttraining aufgebaut. Passendes Material wird bereitgestellt, Sicherheit steht im Mittelpunkt.',
      },
      {
        tag: 'Unser Team',
        title: 'Staatlich geprüfte Lehrer',
        text:
          'Alle unsere Lehrer sind staatlich geprüft und mit Leidenschaft dabei. Sicherheit und Spaß stehen in jeder Session im Mittelpunkt.',
      },
    ],
    valuesTitle: 'Unsere Werte',
    values: [
      { title: 'Respekt für den Ozean', text: 'Den Spot und die Natur um uns herum bewahren.' },
      { title: 'Teilen & Gemeinschaft', text: 'Surfkultur und Teamgeist weitergeben.' },
      { title: 'Fortschritt für alle', text: 'Jede Person im eigenen Tempo sicher voranbringen.' },
    ],
    badge: 'Zertifizierte Französische Surfschule',
    teamTitle: 'Das Skeepskool-Team',
    teamSubtitle: 'Ein leidenschaftliches Team, das dich im Wasser begleitet.',
    team: [
      {
        name: 'Pierre',
        role: 'Der Boss',
        text: 'Kopf des Teams, Bodyboard- und Surf-Foil-Profi, immer bereit für neue Herausforderungen.',
      },
      {
        name: 'Mariane',
        role: 'Die Team-Mama',
        text: 'Organisation, Empfang, gute Tipps: sie hat alles im Griff.',
      },
      {
        name: 'Manua',
        role: 'Der entspannte Coach',
        text: 'Direkt aus Tahiti: gute Vibes und Stil in jeder Session.',
      },
      {
        name: 'Hugo',
        role: 'Der Hüttenwächter',
        text: 'Immer da für Material, Empfang und gute Stimmung.',
      },
    ],
  },

  lessons: {
    ...en.lessons,
    heroTitle: 'Kurse & Preise',
    heroSubtitle: 'Surfkurse unter Anleitung qualifizierter Lehrer.',
    introTitle: 'Surfkurse',
    introText:
      'Jedes Paket enthält: qualifizierten Lehrer, passendes Material, Versicherung, Verbandslizenz und Level-Bescheinigung.',
    aboutTitle: 'Wie läuft eine Stunde ab?',
    aboutLead:
      'Eine Surfstunde bei Skeepskool dauert 2 Stunden und wird von einem staatlich geprüften Lehrer am Zentralstrand von Le Porge Océan betreut.',
    quickFacts: [
      { label: 'Dauer', value: '2 Stunden', detail: 'Bitte 20 Minuten vor Kursbeginn da sein.' },
      { label: 'Niveau', value: 'Alle Levels', detail: 'Anfänger bis Fortgeschrittene, ab 5 Jahren.' },
      { label: 'Material', value: 'Alles inklusive', detail: 'Neoprenanzug und Board werden gestellt.' },
      { label: 'Betreuung', value: 'Qualifizierter Lehrer', detail: 'Immer mit dir im Wasser.' },
    ],
    stepsTitle: 'Schritt für Schritt',
    steps: [
      {
        title: '20 Min. vorher ankommen',
        text: 'Treffpunkt an der Skeepskool-Hütte, Materialausgabe und kurze Einweisung.',
      },
      {
        title: 'Aufwärmen & Theorie',
        text: 'Auf dem Sand: Warm-up, Tagesbedingungen und Sicherheitsregeln.',
      },
      {
        title: 'Ins Wasser',
        text: 'Praxiszeit: Anfänger im Weißwasser, Fortgeschrittene auf den Wellen.',
      },
      {
        title: 'Feedback & Fortschritt',
        text: 'Zum Abschluss individuelle Tipps für die nächste Session.',
      },
    ],
    includedTitle: 'Alles im Preis enthalten',
    goodToKnowTitle: 'Gut zu wissen',
    goodToKnow: [
      {
        question: 'Wann sollte ich vor dem Kurs da sein?',
        answer: 'Bitte 20 Minuten vor Kursbeginn eintreffen.',
      },
      {
        question: 'Wie läuft ein erster Kurs ab?',
        answer: 'Beim ersten Kurs ist der Theorieteil am Strand länger (Basics und Sicherheit).',
      },
      {
        question: 'Wie werden Gruppen gebildet?',
        answer: 'Die Gruppen werden nach Niveau eingeteilt, damit du optimal Fortschritte machst.',
      },
      {
        question: 'Wo finde ich die aktuellen Zeiten?',
        answer: 'Die Zeiten werden in Echtzeit in der WhatsApp-Community veröffentlicht.',
      },
    ],
    faqTitle: 'Häufige Fragen',
    faq: [
      {
        question: 'Was sollte ich zum Kurs mitbringen?',
        answer: '20 Minuten vorher da sein, mit Badebekleidung, Wasser und Sonnencreme.',
      },
    ],
    pricesTitle: 'Preise & Pakete',
    pricesSubtitle: '',
    popular: 'Beliebt',
    perSession: '/ Einheit',
    cards: [
      { name: 'Einzelstunde', price: '40€', detail: '2h Gruppenkurs', note: '' },
      { name: 'Mini-Paket 3 Kurse', price: '110€', detail: '3 × 2h', note: '≈ 37€ / Einheit' },
      { name: 'Paket 5 Kurse', price: '165€', detail: '5 × 2h', note: '≈ 33€ / Einheit' },
      { name: 'Paket 10 Kurse', price: '300€', detail: '10 × 2h', note: '30€ / Einheit' },
      { name: 'Paket 20 Kurse', price: '540€', detail: '20 × 2h', note: '27€ / Einheit' },
      { name: 'Privatkurs', price: '110€', detail: '2h privat (1 oder 2 Personen)', note: '' },
    ],
    comboTitle: 'Kombi-Paket',
    comboPrice: '255€',
    comboDetail: '5 Tage: täglich 2h Gruppenkurs + Board- und Neoprenverleih für 5 Tage.',
    comboText: 'Perfekt, wenn du vor und nach dem Kurs weiter surfen willst!',
    includesTitle: 'In jedem Paket enthalten',
    includes: [
      'Qualifizierter Lehrer',
      'Material inklusive',
      'Versicherung inklusive',
      'Verbandslizenz',
      'Level-Bescheinigung',
    ],
    validityNote: 'Alle Pakete sind 1 Jahr ab Kaufdatum gültig.',
    sunsetTitle: 'Sunset-Kurse',
    sunsetText:
      'Lust auf eine besondere Session? Unsere Sunset-Kurse finden im goldenen Abendlicht statt, wenn der Ozean ruhiger wird.',
    sunsetCta: 'Sunset-Kurs anfragen',
    teamLinkTitle: 'Betreut von einem leidenschaftlichen Team',
    teamLinkText: 'Alle Kurse werden von staatlich geprüften Lehrern durchgeführt.',
    teamLinkCta: 'Team kennenlernen',
    weeklySchedule: {
      ...en.lessons.weeklySchedule,
      badge: 'Wochenplan',
      title: 'Kursplanung jede Woche aktualisiert',
      subtitle: 'Alle Kurszeiten im Tab Stundenplan in einer klaren Wochenansicht.',
      openPlanning: 'Tab Stundenplan öffnen',
      contactCta: 'Diesen Slot buchen',
    },
    cta: 'Jetzt buchen',
  },

  schedule: {
    ...en.schedule,
    title: 'Kurszeiten der Woche',
    liveLabel: 'Live-Plan',
    fallbackLabel: 'Kein Kurs geplant',
    allLevels: 'Alle Niveaus',
    callWidgetTitle: 'Ruf uns an, um zu buchen',
    callWidgetText: 'Wenn du Hilfe bei der Slot-Wahl brauchst oder schnell buchen willst: Ruf die Schule an.',
    callWidgetCta: 'Jetzt anrufen',
    fallbackDays: [
      { day: 'Montag', slots: [] },
      { day: 'Dienstag', slots: [] },
      { day: 'Mittwoch', slots: [] },
      { day: 'Donnerstag', slots: [] },
      { day: 'Freitag', slots: [] },
      { day: 'Samstag', slots: [] },
      { day: 'Sonntag', slots: [] },
    ],
  },

  booking: {
    ...en.booking,
    title: 'Buchen',
    subtitle: 'Sende deine Anfrage in wenigen Klicks',
    intro: 'Zur Bestätigung deiner Buchung muss die Zahlung per Überweisung vor dem Absenden bereits erfolgt sein.',
    contactTitle: 'Kontaktinformationen',
    firstName: 'Vorname',
    lastName: 'Nachname',
    phone: 'Telefonnummer',
    phoneHint: 'Erwartetes Format: 10 Ziffern (z. B. 06 70 60 84 26) oder internationale Nummer.',
    phoneInvalid: 'Bitte eine gültige Telefonnummer eingeben.',
    surfersTitle: 'Surfer',
    surferLabel: 'Surfer',
    surferFirstName: 'Vorname',
    surferLastName: 'Nachname',
    surferAge: 'Alter',
    surferLevel: 'Niveau',
    surferPackage: 'Paket',
    addSurfer: '+ Surfer hinzufügen',
    removeSurfer: 'Entfernen',
    commonTitle: 'Gemeinsame Informationen',
    startDate: 'Ungefähres Startdatum',
    startDateNote: 'Bei Buchungen unter 3 Tagen bitte direkt anrufen, damit wir den besten Slot anbieten können.',
    shortNoticeAlert: 'Bei Buchungen unter 3 Tagen bitte direkt die Schule anrufen.',
    paymentType: 'Zahlungsart',
    payerName: 'Person, die die Überweisung getätigt hat',
    sameAsContactSurfer: 'Surfer 1 automatisch mit Kontaktdaten ausfüllen',
    sameAsContactPayer: 'Zahler ist dieselbe Person wie der Kontakt',
    optionalMessage: 'Optionale Nachricht',
    paymentMethods: [{ value: 'transfer', label: 'Banküberweisung' }],
    totalLabel: 'Gesamt:',
    warning: '⚠️ Wichtig — Deine Buchung ist erst bestätigt, wenn die Zahlung VOR dem Absenden erfolgt ist.',
    paylibLabel: '',
    ibanLabel: '🏦 Überweisung IBAN: FR76 1027 8022 8200 0205 3750 133 — BIC: CMCIFR2A',
    warningFooter: 'Nach der Zahlung bitte die Bestätigung ankreuzen und auf Senden klicken.',
    callWeekNote: '📞 Bitte ruf die Schule 1 Woche vor deiner Anreise an, um den Slot zu bestätigen.',
    paidCheckbox: 'Ich bestätige, dass die Zahlung vor dem Absenden bereits erfolgt ist.',
    submit: 'Senden',
    none: 'Keine',
    unknownDate: 'Nicht angegeben',
    successLead: 'Danke {name}! Deine Anfrage wurde mit Zahlung als erfolgt per WhatsApp gesendet.',
    successEnd: 'Wir kontaktieren dich bald zur Bestätigung. Bitte vergiss nicht, eine Woche vor Anreise anzurufen. Bis bald im Wasser! 🏄',
    whatsappHeader: '🏄 Neue Skeepskool-Buchung',
    whatsappContact: '👤 Kontakt:',
    whatsappDate: '📅 Gewünschtes Datum:',
    whatsappTotal: '💰 Gesamt:',
    whatsappSurfers: 'Surfer:',
    whatsappMessage: '💬 Nachricht:',
    whatsappPayment: '✅ Zahlung: Bereits erfolgt',
    whatsappPaymentType: '💳 Zahlungsart:',
    whatsappPayerName: '👤 Zahler:',
    whatsappCallWeek: '📞 Ich rufe die Schule 1 Woche vor Anreise an.',
    whatsappClosing: 'Bitte Verfügbarkeit bestätigen!',
    whatsappSurferLine: 'Surfer',
    heroTitle: 'Buchen',
    submitCta: 'Anfrage senden',
  },

  rental: {
    ...en.rental,
    heroTitle: 'Materialverleih',
    heroSubtitle: 'Surfboards, Bodyboards und Neoprenanzüge direkt am Strand.',
    tableHead: ['Material', '2H', '4H', 'Tag (9–19 Uhr)', '7 Tage', 'Sunset (18–9:30 Uhr)'],
    rows: [
      { item: 'Surf / Longboard', prices: ['12€', '18€', '23€', '100€', '18€'] },
      { item: 'Bodyboard', prices: ['10€', '12€', '15€', '80€', '12€'] },
      { item: 'Neoprenanzug', prices: ['6€', '8€', '10€', '45€', '8€'] },
    ],
    riskNote: 'Verleih auf eigenes Risiko — ohne Betreuung.',
    safetyRecommendation:
      'Wir empfehlen mindestens 10 Surfstunden mit einem Lehrer. Sicherheit ist für dich und andere im Wasser entscheidend.',
    plusNote: 'Pluspunkt: Du kannst während der Mietdauer das Board wechseln.',
    idRequiredNote: 'Für jede Miete ist ein Ausweis erforderlich.',
    sunsetNote: 'Sunset-Slot: von 18 Uhr bis 9:30 Uhr am nächsten Tag.',
    guideTitle: 'Das passende Material wählen',
    guide: [
      {
        title: 'Welches Board?',
        text: 'Longboard für Anfänger (stabil und einfach), Shortboard für Fortgeschrittene.',
      },
      {
        title: 'Welcher Anzug?',
        text: '3/2 mm im Sommer, 4/3 mm im Frühling und Herbst für mehr Wärme.',
      },
      {
        title: 'Bodyboard oder Surf?',
        text: 'Bodyboard ist ideal für schnellen Spaß, Surf für Fortschritt im Stehen.',
      },
    ],
    callNote: 'Du möchtest Board und Neopren reservieren? Ruf uns gern an.',
    cta: 'Kontakt',
  },

  contact: {
    ...en.contact,
    heroTitle: 'Praktische Infos',
    infoTitle: 'Kontaktdaten',
    infoLead: 'Ruf uns an für Buchungen oder Fragen.',
    openMaps: 'In Google Maps öffnen',
    seasonTitle: 'Öffnungszeiten',
    season: 'Geöffnet von 9 bis 19 Uhr, 7 Tage die Woche.',
    seasonHighlight: '9:00 - 19:00 Uhr, täglich',
    whatsappTitle: 'Kurszeiten auf WhatsApp',
    whatsappText: 'Alle Kurszeiten sind in Echtzeit in unserer WhatsApp-Community verfügbar. Tritt bei, damit du nichts verpasst!',
    whatsappCta: 'WhatsApp-Community beitreten',
    findUsTitle: 'So findest du uns',
    findUs: {
      ...en.contact.findUs,
      byCarLabel: 'Mit dem Auto',
      citiesLabel: 'Nächstgelegene Städte',
      parkingLabel: 'Parken',
      parking: 'Kostenlose Parkplätze nahe dem Strand.',
      busLabel: 'Bus 4210',
      busBookingNote: 'Buchung ausschließlich online über die App Cars Nouvelle-Aquitaine 33.',
      busCta: 'Fahrplan ansehen (PDF)',
      busAppStoreCta: 'Im App Store laden',
      busGooglePlayCta: 'Bei Google Play laden',
      busPriceLabel: 'Preis',
      busPriceNote: 'Richtpreise des Regionalverkehrs, bitte vor Reiseantritt prüfen.',
    },
    formTitle: 'Schreib uns',
    form: {
      ...en.contact.form,
      firstName: 'Vorname',
      email: 'E-Mail',
      subject: 'Betreff',
      subjectOptions: ['Gruppenkurs', 'Privatkurs', 'Verleih', 'Kombi', 'Sonstiges'],
      message: 'Nachricht',
      submit: 'Senden',
      successTitle: 'Nachricht gesendet!',
      success: 'Danke für deine Nachricht. Wir melden uns so schnell wie möglich.',
    },
    gift: 'Geschenkgutschein anbieten',
    reviewsTitle: 'Google-Bewertung hinterlassen',
    reviewsText: 'Dein Feedback hilft uns, besser zu werden. Wenn dir Skeepskool gefallen hat, freuen wir uns über eine Google-Bewertung.',
    reviewsCta: 'Google-Bewertung schreiben',
    mapTitle: 'Standort',
  },

  around: {
    ...en.around,
    heroTitle: 'Rund um uns',
    heroSubtitle: '',
    campingTitle: 'Übernachten',
    camping: {
      ...en.around.camping,
      text: 'Skeepskool liegt gegenüber dem kommunalen Campingplatz La Grigne am Atlantik. Direkter Zugang zum Strand zu Fuß oder mit dem Rad.',
      season: 'Geöffnet vom 4. April bis 1. November',
      cta: 'Camping ansehen',
    },
    restaurantsTitle: 'Essen',
    restaurantsIntro: 'Zwei tolle Adressen in der Nähe nach deiner Session:',
    restaurants: [
      {
        ...en.around.restaurants[0],
        text: 'Großzügige Pizzen zwischen Düne und Wald — perfekt nach dem Surfen.',
        cta: 'Auf Instagram ansehen',
      },
      {
        ...en.around.restaurants[1],
        text: 'Gemütliches Restaurant in Le Porge Océan für eine leckere Pause nahe dem Strand.',
        cta: 'Auf Instagram ansehen',
      },
    ],
    busTitle: 'Anreise mit dem Bus',
    busText:
      'Die regionale Linie Cars Région Nouvelle-Aquitaine verbindet Bordeaux mit Le Porge. Eine einfache und günstige Lösung ohne Auto.',
    busPriceLabel: 'Preis',
    busPrice: '2,50 € einfach · 4,50 € hin und zurück',
    busPriceNote: 'Richtpreise des Regionalverkehrs — bitte vor Abfahrt prüfen.',
    busCta: 'Fahrplan ansehen (PDF)',
    tourismTitle: 'Tourismusbüro',
    tourism: {
      ...en.around.tourism,
      text: 'Zur Reiseplanung hilft dir das Tourismusbüro Médoc Atlantique dabei, Le Porge und den Ozean zu entdecken.',
      cta: 'Le Porge entdecken',
    },
  },

  footer: {
    ...en.footer,
    tagline: 'FFS-zertifizierte Surfschule in Le Porge Océan, Gironde.',
    quickLinks: 'Schnellzugriff',
    contact: 'Kontakt',
    rights: '© Skeepskool — Surfschule Le Porge Océan',
    legal: 'Rechtliche Hinweise',
  },

  legal: {
    ...en.legal,
    heroTitle: 'Rechtliche Hinweise',
    heroSubtitle: 'Rechtliche Informationen zur Skeepskool-Website.',
    sections: en.legal.sections.map((section) => ({
      ...section,
      title:
        section.title === 'Company information'
          ? 'Unternehmensangaben'
          : section.title === 'Publication director'
            ? 'Verantwortlicher für die Veröffentlichung'
            : section.title === 'Website hosting'
              ? 'Hosting der Website'
              : section.title === 'Intellectual property'
                ? 'Geistiges Eigentum'
                : section.title === 'Personal data'
                  ? 'Personenbezogene Daten'
                  : section.title === 'Cookies'
                    ? 'Cookies'
                    : section.title,
    })),
  },
}