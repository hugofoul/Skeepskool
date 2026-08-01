export const fr = {
  // ---- Shared / brand ----
  brand: 'SKEEPSKOOL',
  tagline: "Vis l'océan",
  ffsLabel: 'École Française de Surf — Labellisée FFS',
  bookNow: 'Réserver',
  bookNowLong: 'Réserver maintenant',
  learnMore: 'En savoir plus',
  whatsappUrl: 'https://chat.whatsapp.com/J2vEDM7mQr23DoI61RSJFo',
  seasonBadge: 'Ouvert d’avril à novembre',
  quickActions: {
    response: 'Reponse rapide',
    call: 'Appeler',
    book: 'Reserver',
  },

  nav: {
    home: 'Accueil',
    school: 'École',
    lessons: 'Cours',
    gift: 'Bon cadeau',
    photos: 'Gallerie',
    book: 'Réserver',
    cart: 'Panier',
    schedule: 'Horaires',
    rental: 'Location',
    around: 'Autour',
    contact: 'Infos pratiques',
  },

  // ---- Home ----
  home: {
    heroTitle: 'SKEEPSKOOL',
    heroTagline: 'Sécurité, technique et sens marin',
    heroSubtitle: '',
    campingNotePrefix: 'La plus proche du ',
    campingNoteLink: 'Camping La Grigne',
    campingNoteSuffix: ' et de Bordeaux',
    heroCta: 'Réserver',
    heroSecondaryCta: 'Appeler maintenant',
    heroTrustItems: ['Moniteurs diplomes d\'Etat', 'Des 5 ans', 'Materiel inclus'],

    highlights: [
      {
        title: 'Cours',
        text: 'Cours collectifs et particuliers dès 5 ans, encadrés par des moniteurs diplômés.',
      },
      {
        title: 'Location de matériel',
        text: 'Surf, longboard, bodyboard et combinaisons à louer.',
      },
      {
        title: 'Label FFS',
        text: "Affiliée à la Fédération Française de Surf — École Française de Surf.",
      },
    ],

    offers: {
      eyebrow: 'NOS FORMULES',
      title: 'Réservez en avance pour s’assurer de la place',
      viewAllCta: 'Voir toutes les formules →',
      priceFallback: 'Tarif à confirmer',
      cards: [
        {
          badge: 'Découverte',
          title: '1 séance',
          subtitle: '1 séance · 2 h',
          description: '',
          pricePrefix: '',
          cta: 'Réserver',
          packageValue: 'single',
        },
        {
          badge: 'Progression',
          title: 'Stage 5 séances',
          subtitle: '5 séances · 10 h',
          description: '',
          pricePrefix: '',
          cta: 'Réserver',
          packageValue: 'pack5',
        },
        {
          featuredLabel: '★ La référence',
          title: 'Stage 10 séances',
          subtitle: '10 séances · 20 h',
          description: '',
          pricePrefix: '',
          cta: 'Réserver',
          packageValue: 'pack10',
        },
      ],
    },

    rentalShowcase: {
      eyebrow: 'LOCATION DE MATÉRIEL',
      title: 'Louez votre matériel de surf au Porge',
      intro: 'Planche, combinaison et matériel adapté à votre niveau pour profiter pleinement de votre session.',
      viewAllCta: 'Découvrir toutes les locations →',
      cards: [
        {
          title: 'Planche de surf',
          description: 'Une planche adaptée à votre niveau et aux conditions du jour.',
          pricePrefix: 'À partir de',
          cta: 'Voir les tarifs',
        },
        {
          title: 'Planche + combinaison',
          description: 'L’équipement complet pour aller surfer en toute simplicité.',
          pricePrefix: 'À partir de',
          cta: 'Voir les tarifs',
        },
        {
          title: 'Location plusieurs jours',
          description: 'Une formule avantageuse pour profiter du surf pendant tout votre séjour.',
          pricePrefix: 'À partir de',
          cta: 'Voir les tarifs',
          priceFallback: 'Sur demande',
        },
      ],
    },

    practical: {
      infoTitle: 'INFOS PRATIQUES',
      faqTitle: 'QUESTIONS FRÉQUENTES',
      mapTitle: 'NOUS TROUVER',
      mapFrameTitle: 'Carte Skeepskool Le Porge',
      itineraryCta: 'Voir l’itinéraire',
      allQuestionsCta: 'Voir toutes les questions',
      infoItems: [
        { icon: 'map', title: 'Plage Centrale, Le Porge Océan, 33680, Gironde' },
        { icon: 'drive', title: 'En voiture', subtitle: '~50 min depuis Bordeaux via la D6 puis la D3 en direction du Porge.' },
        { icon: 'city', title: 'Villes les plus proches', subtitle: 'Bordeaux 50 min · Lacanau 20 min · Lège-Cap-Ferret 25 min' },
        { icon: 'parking', title: 'Stationnement', subtitle: 'Parking gratuit en face de l’école.' },
        { icon: 'camping', title: 'Camping La Grigne', subtitle: 'Situé juste en face de l’école, à deux pas de la plage.' },
      ],
      faqItems: [
        {
          question: 'Est-ce que je dois savoir nager ?',
          answer: 'Non, il n\'est pas obligatoire de savoir nager, les bases du surf s\'apprennent avec de l\'eau jusqu\'à la taille, par contre merci de le signaler au moniteur au début du cours. Le surf est un bon moyen de développer son aisance aquatique.',
        },
        {
          question: 'Peut on annuler la séance ?',
          answer: 'Oui, si l’annulation est faite 24h à l’avance, le cours vous sera entièrement remboursé, sinon la séance devra être réglée.',
        },
        {
          question: 'Faites-vous des cours pour les niveaux avancés ?',
          answer: 'Oui, nous proposons des cours spécifiques pour le perfectionnement ainsi que des cours doubles niveaux avec 2 moniteurs (intermédiaires/avancés), ce qui permet de passer d’un groupe à un autre si besoin.',
        },
        {
          question: 'Faut-il réserver à l\'avance ?',
          answer: 'Oui, pour garantir votre place à l\'avance, il est fortement conseillé de réserver vos sessions dès maintenant.',
          ctaLabel: 'Aller au panier',
          ctaPath: '/reserver',
        },
        {
          question: 'Peut-on louer du matériel sans prendre de cours ?',
          answer: 'Oui, la location est ouverte à tous. Cependant, nous déconseillons fortement la location sans encadrement si vous avez moins de 10 séances avec un moniteur diplômé.',
        },
      ],
    },

    aboutTitle: 'Le surf aux portes de Bordeaux',
    aboutText:
      "La plage océan la plus proche de Bordeaux. Cours de surf dès 5 ans, encadrés par des moniteurs diplômés d'État, d'avril à novembre.",
    schedulePreview: {
      badge: 'Planning de la semaine',
      title: 'Consultez les prochains créneaux en un coup d’œil',
      text: 'Retrouvez les horaires des cours collectifs, des sessions enfants et des créneaux sunset, puis ouvrez le planning complet pour toute la semaine.',
      cta: 'Voir le planning complet',
    },
    surfConditions: {
      badge: 'Conditions',
      title: 'Conditions de surf prevues pour ce week-end',
      fallbackParagraphs: ['Mise a jour des conditions en cours.'],
    },

    findUsTitle: 'Comment nous trouver',
    findUs: {
      address: 'Plage Centrale, Le Porge Océan, 33680, Gironde',
      byCarLabel: 'En voiture',
      byCar:
        '~50 min depuis Bordeaux via la D6 puis la D3 en direction du Porge → suivre les panneaux « Le Porge Océan ».',
      citiesLabel: 'Villes les plus proches',
      cities: 'Bordeaux 50 min · Lacanau 20 min · Lège-Cap-Ferret 25 min',
      parkingLabel: 'Stationnement',
      parking: 'Parking gratuit en face de l’école.',
      gpsLabel: 'GPS',
      gps: '44°53’39.432”N    1°12’50.048”O',
    },

    reviewsTitle: 'Laissez un avis Google',
    reviewsText: 'Votre retour nous aide à progresser ! Si vous avez apprécié votre expérience chez Skeepskool, n\'hésitez pas à nous laisser un avis sur Google.',
    reviewsCta: 'Laisser un avis sur Google',
    reviewsUrl: 'https://g.page/r/Cevy5D3GcYpTEAE/review',

    testimonialsTitle: 'Ils ont surfé avec nous',
    testimonials: [
      {
        name: 'Margaux W',
        text: "Accueil au top. J'ai passé un super moment, l'équipe est géniale, tout le monde est hyper pédagogue !! Merci beaucoup pour ce moment. A bientôt.",
      },
      {
        name: 'Elaia M.',
        text: "Cours au top ! J'ai failli ne pas en prendre et je n'ai pas du tout regretté. Indispensable pour bien commencer. En plus tout se fait dans la bonne humeur et le cours est très complet, merci encore et à la prochaine 😉",
      },
      {
        name: 'Camille R',
        text: "C'est une super école de surf !! Il y a une bonne ambiance et les moniteurs sont très sympa !! J'ai eu un coup de cœur pour le surf au couché du soleil...",
      },
    ],
  },

  // ---- School ----
  school: {
    heroTitle: "L'école",
    heroSubtitle: 'Un spot préservé, une équipe passionnée, un label de qualité.',
    sections: [
      {
        tag: 'Le spot',
        title: 'Entre dunes et forêt de pins',
        text:
          "Nichée entre dunes et forêt de pins, la Plage Centrale du Porge Océan est un spot préservé aux portes de Bordeaux. Un cadre naturel exceptionnel pour apprendre le surf dans les meilleures conditions.",
      },
      {
        tag: 'Notre pédagogie',
        title: 'Un véritable entraînement sportif',
        text:
          "Chaque cours est construit comme un véritable entraînement sportif. Tout le matériel adapté est fourni. Skeepskool est labellisée École Française de Surf.",
      },
      {
        tag: 'Notre équipe',
        title: "Des moniteurs diplômés d'État",
        text:
          "Tous nos moniteurs sont diplômés d'État et passionnés par leur métier. La sécurité et le plaisir sont au cœur de chaque session.",
      },
    ],
    valuesTitle: 'Nos valeurs',
    valuesSubtitle: "Vous apprendre le surf étape par étape dans les règles de l'art",
    values: [
      {
        title: 'Sens marin',
        text: 'Savoir quand et où surfer, lire les vagues, identifier les dangers et les zones adaptées à chaque niveau.',
      },
      {
        title: 'Technique',
        text: 'Prise de vague, redressement idéale, prise de direction, prendre les vagues vertes, les maneuvres…Nos moniteurs vous transmettent les techniques en fonction de votre niveau.',
      },
      {
        title: 'Sécurité avant tout',
        text: 'On vous apprend la sécurité avec les vagues, la planche, les courants et les autres surfeurs.',
      },
    ],
    badge: 'Labellisée École Française de Surf',

    teamTitle: "L'équipe Skeepskool",
    teamSubtitle: 'Une équipe de professionnels dynamique et passionnée à votre service.',
    coachingTitle: 'Enseignement de qualité et sécurisé',
    coachingItems: [
      'Apprendre à surfer en sécurité',
      'Tous âges, tous niveaux',
      'Matériel adapté à chacun',
      'Conseils individualisés',
      'Diplôme de niveau de la Fédération Française de Surf sur demande',
    ],
    coachingExperience: "Plus de 25 ans d'expérience",
    beachAdvantagesTitle: 'Les avantages de la Plage Centrale',
    beachAdvantagesItems: [
      'À côté du Poste de Secours (sécurité avant tout)',
      'À proximité de la baignade surveillée',
      'Sur l’accès plage le plus court (avec caillebotis)',
      'Devant le Camping « La Grigne »',
      'Parking gratuit devant l’école',
      'À côté des restaurants, douches et commodités',
    ],
    team: [
      {
        name: 'Pierre',
        image: 'pierre',
        text: 'Passionné par l’océan depuis son plus jeune âge, il a exploré toutes les disciplines de glisse, du surf au rescue board, en passant par le bodyboard et aujourd’hui le surf foil, avant de créer Skeepskool il y a plus de 25 ans.',
      },
      {
        name: 'Mariane',
        image: 'mariane',
        text: 'Elle sait tout faire : accueil, organisation, conseils… rien ne lui échappe.',
      },
      {
        name: 'Manua',
        image: 'manua',
        text: 'Il nous vient tout droit de Tahiti. Bonne humeur et style garantis à chaque session.',
      },
      {
        name: 'Hugo',
        image: 'hugo',
        text: 'Toujours là pour le matériel, l’accueil et la bonne ambiance.',
      },
      {
        name: 'Oscar',
        image: 'oscar',
        text: 'Oscar accompagne les élèves avec calme, précision et une bonne dose d’énergie sur l’eau.',
      },
      {
        name: 'Alioune',
        image: 'alioune',
        text: 'Alioune encadre les sessions avec pédagogie, attention et sens du rythme.',
      },
      {
        name: 'Alexandre',
        image: 'alexandre',
        text: 'Alexandre vous accueille, vous guide et veille à ce que tout se passe au mieux dès votre arrivée.',
      },
    ],
  },

  // ---- Lessons ----
  lessons: {
    heroTitle: 'Cours & Tarifs',
    heroSubtitle: '',
    introTitle: 'Cours de surf',
    introText:
      'Chaque formule comprend : moniteur diplômé, matériel adapté, assurance, licence fédérale et attestation de niveau.',

    // --- Présentation détaillée d'un cours ---
    aboutTitle: 'Comment se déroule un cours ?',
    aboutLead:
      'Un cours de surf dans notre école, c’est 2 heures encadrées par un moniteur diplômé, sur la Plage Centrale du Porge Océan. Une vraie séance sportive complete, étape par étape en fonction de votre niveau.',
    quickFacts: [
      { label: 'Durée', value: '2 heures', detail: 'Présentez-vous 20 min avant le début du cours.' },
      { label: 'Niveau', value: 'Groupes de niveaux', detail: 'Débutant à confirmé, dès 5 ans.' },
      { label: 'Matériel', value: 'Tout est compris', detail: 'Combinaison et planche adaptée.' },
      { label: 'Encadrement', value: 'Moniteur diplômé', detail: 'Dynamique, souriant et à votre écoute' },
    ],
    stepsTitle: 'Le déroulé, étape par étape',
    steps: [
      {
        title: 'Arrivée 20 min avant',
        text: 'Rendez-vous à la cabane Skeepskool 20 minutes avant le début du cours pour récupérer votre combinaison et la planche choisie par votre moniteur.',
      },
      {
        title: 'Checkpoint',
        text: 'Arrêt en haut de la dune pour analyser les conditions de mer (taille des vagues, marée, vent, relief de la plage et courants de baïnes) afin de choisir l’endroit le plus adapté. Car le surf, c’est avant tout de l’observation !',
      },
      {
        title: 'Échauffement',
        text: 'Échauffement de tout le corps afin de rentrer dans l’eau dans de bonnes conditions.',
      },
      {
        title: 'Consignes de sécurité',
        text: 'Apprentissage et rappel des consignes de sécurité avant chaque cours en fonction des conditions et du niveau de chacun.',
      },
      {
        title: 'Dans l’eau',
        text: 'Place à la pratique ! Les débutants surfent dans les mousses, les plus à l’aise vont chercher les vagues du large. Le moniteur reste avec vous dans l’eau.',
      },
      {
        title: 'Étirements',
        text: 'Quelques minutes d’étirements afin de gagner en souplesse et de favoriser la récupération.',
      },
      {
        title: 'Bilan de séance',
        text: 'Analyse de fin de séance sur : ce qui a changé au niveau des conditions de mer et du spot de surf ; la sécurité (comportements à risques lors de la session) ; la technique (rappel de ce qui a été appris pendant la séance, conseils de réussite et perspectives de progression pour les prochaines séances).',
      },
      {
        title: 'Retour à l’école',
        text: 'Retour à l’école : ranger sa planche et rincer sa combinaison ; checkout à l’accueil sur le bon déroulement de la séance ; vérifier l’horaire pour son prochain cours.',
      },
    ],
    includedTitle: 'Tout est compris dans le prix',
    goodToKnowTitle: 'Bon à savoir',
    goodToKnow: [
      {
        question: 'Je n’ai jamais fait de surf, puis-je prendre un cours chez vous ?',
        answer: 'Oui, bien sûr. Nos cours accueillent tous les niveaux, même les grands débutants. L’approche est progressive, ludique et personnalisée, avec le matériel adapté pour vous mettre en confiance dès la première séance. Vous pouvez aussi découvrir la page École et la page Formules pour en savoir plus.',
      },
      {
        question: 'Les courants et les marées sont-ils un danger pour apprendre ?',
        answer: 'Nous adaptons chaque cours aux conditions du jour. Grâce à l’analyse du spot et au sens marin transmis par les moniteurs, vous apprenez à lire l’océan, à comprendre les marées et à repérer les zones adaptées à votre niveau.',
      },
    ],
    faqTitle: 'Questions fréquentes',
    faq: [],
    pricesTitle: 'Nos formules & tarifs',
    pricesSubtitle: '',

    popular: 'La référence',
    perSession: '/ séance',
    cards: [
      { name: 'Cours à l’unité', price: '40€', detail: '2h', note: '' },
      { name: 'Mini pack 3 cours', price: '110€', detail: '3 × 2h', note: '≈ 37€ / séance' },
      { name: 'Pack 5 cours', price: '165€', detail: '5 × 2h', note: '≈ 33€ / séance' },
      { name: 'Pack 10 cours', price: '300€', detail: '10 × 2h', note: '30€ / séance' },
      { name: 'Pack 20 cours', price: '540€', detail: '20 × 2h', note: '27€ / séance' },
      { name: 'Cours particulier', price: '110€', detail: '2h en privé', note: '' },
    ],
    comboTitle: 'Formule Combo',
    comboPrice: '255€',
    comboDetail: '5 jours : 2h/jour de cours collectif + location planche & combinaison pendant 5 jours.',
    comboText: 'Pour ceux qui veulent garder le materiel avant et après les cours',
    includesTitle: 'Compris dans chaque formule',
    includes: [
      'Moniteur diplômé',
      'Matériel adapté fourni',
      'Assurance incluse',
      'Licence fédérale',
      'Attestation de niveau',
    ],
    validityNote: 'Afin d\'avoir les bases de sécurité, de sens marin et de technique pour aller à l\'eau dans des conditions de surf faciles, il est recommandé de faire au minimum 10 séances en école de surf.',
    groupNote: 'Pour les groupes, entreprises, EVG et EVF, merci de nous téléphoner directement !',
    sunsetTitle: 'Cours au coucher du soleil / Afterwork',
    sunsetText:
      'Envie d’une session magique ? Nous proposons aussi des cours en Sunset : surfez dans la lumière dorée de fin de journée, quand l’océan se calme et que les vagues n’appartiennent plus qu’à vous.',
    morningText: 'Nous proposons aussi des cours le matin pour ceux qui aiment le calme du matin.',
    sunsetCta: 'Demander un cours Sunset',
    teamLinkTitle: 'Encadré par une équipe passionnée',
    teamLinkText: 'Tous nos cours sont assurés par des moniteurs diplômés. Faites connaissance avec l’équipe Skeepskool.',
    teamLinkCta: 'Découvrir notre équipe',
    giftExperienceBadge: 'Bon cadeau',
    giftExperienceTitle: 'Offrir un bon cadeau surf',
    giftExperienceText1: 'Vous cherchez une idée cadeau simple et originale ? Offrez un cours ou un stage de surf.',
    giftExperienceText2: 'Nos bons cadeaux sont valables 1 an.',
    giftExperienceCta: 'Offrir maintenant',
    weeklySchedule: {
      badge: 'Horaires de la semaine',
      title: 'Le planning des cours de la semaine',
      subtitle: '',
      openPlanning: 'Voir les horaires',
      contactCta: 'Reserver',
    },
    cta: 'Réserver maintenant',
  },

  schedule: {
    title: 'Horaires des cours de la semaine',
    liveLabel: 'Appelez-nous pour réserver : nous avons peut-être d\'autres créneaux.',
    fallbackLabel: 'En cours de chargement',
    allLevels: 'Tous niveaux',
    callWidgetTitle: 'Appelez-nous pour réserver',
    callWidgetText: '',
    callWidgetCta: 'Appeler maintenant',
    fallbackDays: [
      { day: 'Lundi', slots: [] },
      { day: 'Mardi', slots: [] },
      { day: 'Mercredi', slots: [] },
      { day: 'Jeudi', slots: [] },
      { day: 'Vendredi', slots: [] },
      { day: 'Samedi', slots: [] },
      { day: 'Dimanche', slots: [] },
    ],
  },

  booking: {
    title: 'Panier',
    subtitle: 'Le paiement se fera par virement Bancaire (IBAN)',
    intro:
      'Pour valider votre réservation, le paiement doit déjà être effectué par virement avant l\'envoi de ce formulaire.',

    contactTitle: 'Informations de contact',
    contactTitleGift: 'Informations du payeur',
    firstName: 'Prénom',
    lastName: 'Nom',
    phone: 'Téléphone',
    phoneHint: 'Format attendu : 10 chiffres (ex. 06 70 60 84 26) ou numéro international.',
    phoneInvalid: 'Merci de renseigner un numéro de téléphone valide.',

    surfersTitle: 'Surfeurs',
    surferLabel: 'Surfeur',
    surferFirstName: 'Prénom',
    surferLastName: 'Nom',
    surferAge: 'Âge',
    surferLevel: 'Niveau',
    surferPackage: 'Formule choisie',
    surferPackageGift: 'Formule à offrir',
    addSurfer: '+ Ajouter un surfeur',
    removeSurfer: '✕ Supprimer',

    levels: [
      { value: 'beginner', label: 'Débutant' },
      { value: 'some', label: 'Quelques cours' },
      { value: 'intermediate', label: 'Confirmé' },
    ],

    packages: [
      { value: 'single', label: '1 séance (2h) — 40€', price: 40 },
      { value: 'pack3', label: 'Pack 3 séances — 110€', price: 110 },
      { value: 'pack5', label: 'Pack 5 séances — 165€', price: 165 },
      { value: 'pack10', label: 'Pack 10 séances — 300€', price: 300 },
      { value: 'pack20', label: 'Pack 20 séances — 540€', price: 540 },
      { value: 'private', label: 'Cours particulier (2h) — 110€', price: 110 },
      { value: 'combo', label: 'Combo 5 jours + planche + combi — 255€', price: 255 },
    ],

    commonTitle: 'Informations communes',
    startDate: 'Date de début approximative',
    endDate: 'Date de fin approximative',
    availabilityNote: 'Nous avons de la disponibilité : il faudra appeller 3j avant pour definir le créneau.',
    startDateNote: 'Pour une réservation à moins de 3 jours, appelez-nous directement.',
    giftVoucherCheckbox: 'C\'est un bon cadeau',
    giftVoucherDateValue: 'Bon cadeau (date à définir)',
    giftVoucherYes: 'Oui',
    giftVoucherNo: 'Non',
    giftVisualCheckbox: 'Je souhaite un visuel pour offrir le bon cadeau',
    giftVoucherValidityNote: 'Bon cadeau valable 1 an à partir de la date d\'achat.',
    shortNoticeAlert: 'Pour les réservations à moins de 3 jours, merci d’appeler l’école directement.',
    paymentType: 'Type de paiement',
    payerName: 'Personne qui a fait le virement / paiement',
    sameAsContactSurfer: 'Remplir automatiquement le Surfeur 1 avec les informations de contact',
    sameAsContactPayer: 'Le payeur est la même personne que le contact',
    optionalMessage: 'Message optionnel',

    paymentMethods: [
      { value: 'transfer', label: 'Virement bancaire' },
    ],

    totalLabel: 'Total :',
    warning:
      'Attention — Pour que votre réservation soit validée, le paiement doit être effectué AVANT d\'envoyer ce formulaire.',
    paylibLabel: '',
    ibanLabel: 'Virement IBAN : FR76 1027 8022 8200 0205 3750 133 — BIC : CMCIFR2A',
    warningFooter: 'Une fois le paiement effectué, cochez la case de confirmation puis cliquez sur Envoyer.',
    callWeekNote: 'Merci d\'appeler l\'école 3 jours avant votre arrivée pour confirmer le créneau.',
    paidCheckbox: 'Je confirme avoir déjà effectué le paiement avant envoi du formulaire.',

    submit: 'Envoyer',
    none: 'Aucun',
    unknownDate: 'Non renseignée',

    successLead: 'Merci {name} ! Votre demande a bien été envoyée sur WhatsApp.',
    successEnd: 'Nous vous contacterons rapidement pour confirmer le créneau. À bientôt sur l\'eau ! 🏄',

    whatsappHeader: 'Nouvelle réservation Skeepskool',
    whatsappContact: 'Contact :',
    whatsappDate: 'Date souhaitée :',
    whatsappEndDate: 'Date de fin souhaitée :',
    whatsappGiftVoucher: 'Bon cadeau :',
    whatsappGiftVisual: 'Visuel cadeau :',
    whatsappTotal: 'Total :',
    whatsappSurfers: 'Surfeurs :',
    whatsappMessage: 'Message :',
    whatsappPayment: 'Paiement : Déjà effectué',
    whatsappPaymentType: 'Type de paiement :',
    whatsappPayerName: 'Payeur :',
    whatsappCallWeek: 'Je contacterai l\'école 3 jours avant l\'arrivée.',
    whatsappClosing:
      'Merci de confirmer la disponibilité.',
    whatsappSurferLine: 'Surfeur',
  },

  // ---- Rental ----
  rental: {
    heroTitle: 'Location de matériel',
    heroSubtitle: '',
    conditionsTitle: 'Informations pour la location',
    tableHead: ['Matériel', '2H', '4H', 'Journée (9h–19h)', '7 jours', 'Sunset (18h–9h30)'],
    rows: [
      { item: 'Surf / Longboard', prices: ['12€', '18€', '23€', '100€', '18€'] },
      { item: 'Bodyboard + Palmes', prices: ['10€', '12€', '15€', '80€', '12€'] },
      { item: 'Combinaison', prices: ['6€', '8€', '10€', '45€', '8€'] },
    ],
    riskNote: '',
    safetyRecommendationTitle: 'Conseil école de surf :',
    safetyRecommendation:
      'Afin d\'avoir les bases de sécurité, de sens marin et de technique pour aller à l\'eau dans des conditions de surf faciles, il est recommandé de faire au minimum 10 séances en école de surf. Si vous avez le moindre doute, continuez votre apprentissage en école de surf : c\'est la manière la plus sécurisée et la plus rapide pour apprendre à surfer.',
    plusNote: 'Pendant toute la location, vous pouvez changer de planche à tout moment.',
    idRequiredNote: 'Une pièce d\'identité est obligatoire pour toute location.',
    sunsetNote: 'Créneau Sunset : de 18h jusqu’au lendemain 9h30.',
    guideTitle: 'Choisir son matériel',
    guide: [
      {
        title: 'Quelle planche ?',
        text: 'Nous avons tout type de planches : SURF, LONGBOARD, MINI MALIBU, BODYBOARD, SKIMBOARD.',
      },
      {
        title: 'Quelle combi ?',
        text: 'Nous avons des shortis et intégrales de differentes épaisseurs en fonction de la temperature de l’eau.',
      },
    ],
    guideAdvice: 'Notre équipe saura vous conseiller la planche la plus adaptée aux conditions et à votre niveau',
    callNote: 'Envie de réserver vos planches et votre combinaison ? Appelez-nous, on vous prépare tout avant votre arrivée.',
    cta: 'Nous contacter',
  },

  // ---- Infos pratiques (anciennement Contact) ----
  contact: {
    heroTitle: 'Infos pratiques',
    heroSubtitle: '',
    infoTitle: 'Nos coordonnées',
    infoLead: 'Merci de privilégier un appel téléphonique (WhatsApp possible).',
    address: 'Plage Centrale, Le Porge Océan, 33680 Gironde',
    addressDetail: '40 m au nord de l’accès principal à la plage, au pied de la dune côté forêt.',
    openMaps: 'Ouvrir dans Google Maps',
    phones: '+33 6 70 60 84 26 · +33 6 50 52 34 75',
    facebook: '@skeepskool (Facebook)',
    instagram: '@skeepskool (Instagram)',
    email: 'skeepskool@hotmail.com',

    seasonTitle: "Horaires d'ouverture",
    season: "Ouvert d'avril à novembre.",
    seasonHighlight: '9h - 19h, tous les jours',

    whatsappTitle: 'Horaires des cours sur WhatsApp',
    whatsappText:
      'Tous les horaires des cours sont disponibles en temps réel sur notre communauté WhatsApp. Rejoignez-la pour ne rien manquer !',
    whatsappCta: 'Rejoindre la communauté WhatsApp',

    findUsTitle: 'Comment nous trouver',
    findUs: {
      address: 'Plage Centrale, Le Porge Océan, 33680, Gironde',
      byCarLabel: 'En voiture',
      byCar:
        '~50 min depuis Bordeaux via la D6 puis la D3 en direction du Porge \u2192 au rond-point de la plage, prenez \u00e0 droite puis \u00e0 gauche \u00e0 l\u2019intersection suivante. Vous arrivez devant l\u2019\u00e9cole, qui se situe \u00e0 40\u00a0m \u00e0 droite de l\u2019all\u00e9e des restaurants juste avant de monter la dune.',
      citiesLabel: 'Villes les plus proches',
      cities: 'Bordeaux 50 min · Lacanau 20 min · Lège-Cap-Ferret 25 min',
      parkingLabel: 'Stationnement',
      parking: 'Parking gratuit en face de l’école.',
      busLabel: 'Bus 4210',
      bus: 'Ligne 4210 depuis Bordeaux vers Le Porge. Consultez les arrêts desservis pour Le Porge Océan, puis accès plage à pied.',
      busLearnMore: 'En savoir plus',
      busBookingNote: 'La réservation se fait exclusivement en ligne sur l’appli Cars Nouvelle-Aquitaine 33.',
      busCta: 'Voir les horaires (PDF)',
      busUrl:
        'https://transports.nouvelle-aquitaine.fr/sites/default/files/timetable_files/NOUVEAU-SPECIAL%20Eté-Fiche%20horaire%20Cars%20régionaux-Bordeaux-Le%20Porge.pdf',
      busAppStoreCta: 'Télécharger sur l’App Store',
      busAppStoreUrl: 'https://apps.apple.com/fr/app/cars-nouvelle-aquitaine-33/id1563743788',
      busGooglePlayCta: 'Télécharger sur Google Play',
      busGooglePlayUrl: 'https://play.google.com/store/apps/details?id=com.conduent.transit.nva.cars33',
      busPriceLabel: 'Tarif',
      busPrice: '2,50 € aller simple · 4,50 € aller-retour',
      busPriceNote: '',
      gpsLabel: 'GPS',
      gps: '44°53’39.432”N    1°12’50.048”O',
    },

    formTitle: 'Écrivez-nous',
    form: {
      firstName: 'Prénom',
      email: 'Email',
      subject: 'Sujet',
      subjectOptions: [
        'Cours collectif',
        'Cours particulier',
        'Location',
        'Combo',
        'Autre',
      ],
      message: 'Message',
      submit: 'Envoyer',
      successTitle: 'Message envoyé !',
      success: 'Merci pour votre message. Nous vous répondrons au plus vite.',
    },

    gift: 'Offrir un bon cadeau',
    giftUrl: 'https://www.leporge-ecoledesurf.com/en/gift-coupons/',

    reviewsTitle: 'Laissez un avis Google',
    reviewsText: 'Votre retour nous aide à progresser ! Si vous avez apprécié votre expérience chez Skeepskool, n\'hésitez pas à nous laisser un avis sur Google.',
    reviewsCta: 'Laisser un avis sur Google',
    reviewsUrl: 'https://g.page/r/Cevy5D3GcYpTEAE/review',

    mapTitle: 'Localisation',
  },

  // ---- Around / Practical ----
  around: {
    heroTitle: 'Autour de nous',
    heroSubtitle: '',

    campingTitle: 'Où dormir',
    camping: {
      name: 'Camping La Grigne ★★★',
      text: 'Skeepskool est en face du Camping municipal La Grigne, au bord de l’océan Atlantique. Accès direct à la plage à pied ou à vélo, cadre naturel préservé et ambiance familiale — l’idéal pour combiner vacances et sessions de surf.',
      address: '35 avenue de l’Océan, 33680 Le Porge-Océan',
      phone: '+33 5 56 26 54 88',
      season: 'Ouvert du 4 avril au 1ᵉʳ novembre',
      cta: 'Voir le camping',
      url: 'https://camping-leporge.fr',
    },

    restaurantsTitle: 'Où manger',
    restaurantsIntro: 'Trois bonnes adresses à proximité pour se régaler après le surf :',
    restaurants: [
      {
        name: 'Pizzeria des Bois',
        text: 'Pizzas généreuses à savourer entre dune et forêt, parfait après une session.',
        cta: 'Voir sur Instagram',
        url: 'https://www.instagram.com/pizzeria_des_bois/',
        embedUrl: 'https://www.instagram.com/pizzeria_des_bois/embed/',
      },
      {
        name: 'L’Ajoncière',
        text: 'Restaurant convivial du Porge Océan pour une pause gourmande à deux pas de la plage.',
        cta: 'Voir sur Instagram',
        url: 'https://www.instagram.com/l_ajonciere_le_porge_ocean/',
        embedUrl: 'https://www.instagram.com/l_ajonciere_le_porge_ocean/embed/',
      },
      {
        name: 'Chez Matteo',
        text: 'Burgers et pizzas sur la route du retour vers Le Porge ville — une bonne adresse à ne pas manquer.',
        cta: 'Voir sur Instagram',
        url: 'https://www.instagram.com/chez_matteo_pizza/',
        embedUrl: 'https://www.instagram.com/chez_matteo_pizza/embed/',
      },
    ],

    busTitle: 'Venir en bus',
    busText:
      'La ligne de cars régionaux Cars Région Nouvelle-Aquitaine relie Bordeaux au Porge. Une solution simple et économique pour rejoindre l’océan sans voiture.',
    busPriceLabel: 'Tarif',
    busPrice: '2,50 € aller simple · 4,50 € aller-retour',
    busPriceNote: '',
    busCta: 'Voir les horaires (PDF)',
    busUrl:
      'https://transports.nouvelle-aquitaine.fr/sites/default/files/timetable_files/NOUVEAU-SPECIAL%20Eté-Fiche%20horaire%20Cars%20régionaux-Bordeaux-Le%20Porge.pdf',

    tourismTitle: 'Office de tourisme',
    tourism: {
      text: 'Pour préparer votre séjour, l’Office de tourisme Médoc Atlantique vous fait découvrir Le Porge, son village et son océan : balades, marchés, activités nature et bons plans tout au long de la saison.',
      cta: 'Découvrir Le Porge',
      url: 'https://www.medocpleinsud.com/decouvrir/le-porge-village-et-ocean/',
    },
  },

  // ---- Footer ----
  footer: {
    tagline: 'École de surf labellisée FFS au Porge Océan, Gironde.',
    quickLinks: 'Liens rapides',
    contact: 'Contact',
    rights: '© Skeepskool — École de Surf Le Porge Océan',
    legal: 'Mentions légales',
  },

  // ---- Legal ----
  legal: {
    heroTitle: 'Mentions légales',
    heroSubtitle: 'Informations légales relatives au site Skeepskool.',
    sections: [
      {
        title: 'Informations sur la société',
        body: [
          'Le site Skeepskool est géré par M. Pierre Vienne, immatriculé en tant que professionnel libéral sous le numéro 43760702100023.',
        ],
      },
      {
        title: 'Responsable de publication',
        body: [
          'Le responsable de publication et des équipes de rédaction de ce site est M. Pierre Vienne.',
        ],
      },
      {
        title: 'Hébergement du site',
        body: [
          'Ce site internet est hébergé chez :',
          'OVH, SAS au capital de 10 000 000 €',
          'Société immatriculée au RCS de Roubaix – Tourcoing sous le numéro 424 761 419 00045',
          'Code APE 6202A',
          'N° TVA : FR 22 424 761 419',
          'Siège social : 2 rue Kellermann, 59100 Roubaix, France.',
        ],
      },
      {
        title: 'Propriété intellectuelle',
        body: [
          'L’ensemble du site, y compris sa structure et son contenu (textes, tableaux, graphiques, images, photographies, vidéos, sons, bases de données, applications et logiciels), est protégé par le droit d’auteur et de propriété intellectuelle de Skeepskool ou de ses fournisseurs et prestataires.',
          'Toute représentation, reproduction, adaptation, modification ou exploitation non autorisée est interdite et susceptible de constituer une contrefaçon au sens des articles L. 335-2 et suivants du Code de la propriété intellectuelle.',
        ],
      },
      {
        title: 'Données personnelles',
        body: [
          'Skeepskool s’engage à mettre en œuvre un traitement de vos données personnelles respectueux de votre vie privée et conforme à la législation française et européenne en vigueur.',
          'Les données collectées via le formulaire de contact (prénom, email, message) sont utilisées uniquement pour répondre à votre demande et ne sont ni cédées ni vendues à des tiers.',
          'Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition au traitement de vos données. Pour exercer ces droits, contactez-nous à skeepskool@hotmail.com.',
          'Vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr).',
        ],
      },
      {
        title: 'Cookies',
        body: [
          'Skeepskool utilise uniquement des cookies et traceurs ayant pour finalité de permettre ou faciliter une communication par voie électronique, ou strictement nécessaires au bon fonctionnement du site.',
          'Vous pouvez modifier les paramètres de votre navigateur pour bloquer ou supprimer les cookies. Le blocage des cookies peut altérer le fonctionnement du site.',
        ],
      },
    ],
  },
}
