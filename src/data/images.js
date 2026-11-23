// Toutes les images utilisées par les pages du site.
//
// Les photos de la galerie ne sont PAS listées ici : il suffit de déposer un
// fichier dans public/images/galerie/ (voir public/images/LISEZ-MOI.md).
// Les versions optimisées (WebP, plusieurs tailles) sont générées
// automatiquement par scripts/optimize-images.mjs.

const G = (file) => `/images/galerie/${file}`

export const images = {
  // Image de fond des bandeaux du haut (toutes les pages)
  homeHero: '/images/fondpages.jpg',
  fondpages: '/images/fondpages.jpg',

  // L'école
  schoolSpot: G('20-dunes-et-foret-de-pins.jpg'), // section "Le spot" + cours du matin
  schoolTeamSection: G('04-seance-de-coaching-sur-le-spot-du-porge.jpg'), // section "Notre équipe"
  schoolSession: G('08-session-surf-en-bord-d-ocean.jpg'),
  ffsPortrait: '/images/ffs-officiel-portrait.png',

  // Cours & tarifs
  lessonsIntro: G('24-seance-de-surf-personnalisee.jpg'), // bloc de présentation
  lessonsSunset: '/images/sunset-cours.jpg', // section Sunset
  ffsDiplomas: '/images/diplomes-ffs.webp', // bloc "Enseignement de qualité"
  giftVoucher: '/images/bon-cadeau.jpg', // bloc bon cadeau

  // Location
  rentalBoards: '/images/planches-location.jpg',

  // Infos pratiques
  contactHero: G('21-l-ecole-de-surf-skeepskool.jpg'),
  contactPlan: '/images/plan-acces.jpg',
  aroundCamping: G('28-camping-la-grigne.jpg'),
  aroundTourism: G('07-plage-sauvage-et-horizon-oceanique.jpg'),

  // Logos
  efsLabel: '/images/label-efsurf.png',
  whatsapp: '/images/whatsapp.png',
}

// Carrousel de la page d'accueil — ajoutez ou retirez des lignes librement.
export const carousel = [
  { src: G('03-cours-de-surf-sur-l-eau.jpg'), alt: 'Cours de surf à Skeepskool' },
  { src: G('02-eleve-au-coucher-du-soleil.jpg'), alt: 'Surfeur prenant une vague au coucher du soleil' },
  { src: G('19-ocean-et-planches-au-coucher-du-soleil.webp'), alt: 'Planches de surf au coucher du soleil' },
  { src: G('04-seance-de-coaching-sur-le-spot-du-porge.jpg'), alt: 'Cours de surf sur la plage du Porge Océan' },
  { src: G('18-vague-au-coucher-du-soleil.jpg'), alt: 'Vague atlantique au coucher du soleil' },
  { src: G('11-groupe-de-surfeurs-sur-l-eau.jpg'), alt: 'Groupe de surfeurs sur l’eau' },
]

// Portraits de l'équipe.
export const teamPhotos = {
  pierre: '/images/pierre.jpeg',
  mariane: '/images/mariane.jpg',
  manoa: G('23-manu-moniteur.jpg'),
  hugo: G('22-hugo-moniteur.jpg'),
  oscar: '/images/oscar.jpg',
  alioune: G('15-alioune-equipe-skeepskool.jpg'),
  alexandre: '/images/alexandre.jpg',
}
