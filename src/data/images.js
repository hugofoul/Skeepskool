// All site imagery lives here.
//
// HOW TO USE YOUR OWN PHOTOS:
// Drop your files into the `public/images/` folder using the file names below
// (see public/images/LISEZ-MOI.md). They will appear automatically — no other
// file to edit. While a photo is missing, a neutral ocean placeholder is shown
// instead of a broken image (handled in index.html).
//
// The commented Unsplash URLs are kept as a reference / temporary fallback:
// to use one instead of a local file, replace the local path with the u('...')
// call shown on that line.
const u = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

export const images = {
  // Accueil
  homeHero: '/images/vague_avec_planche_hero.jpg', // Accueil > grand hero (version optimisee)

  // L'école
  schoolHero: '/images/vague.jpg', // L'école > bandeau du haut
  schoolSpot: '/images/dune-foret.jpg', // L'école > section "Le spot"
  schoolPedagogy: '/images/planches.jpg', // L'école > section "Notre pédagogie"
  schoolTeamSection: '/images/charliecours.jpg', // L'école > section "Notre équipe"

  // Cours & tarifs
  lessonsHero: '/images/vague.jpg', // Cours & tarifs > bandeau du haut
  lessonsIntro: '/images/personalise.jpg', // Cours & tarifs > bloc de présentation
  lessonsSunset: '/images/sunset1.JPEG', // Cours & tarifs > section Sunset

  // Location
  rentalHero: '/images/planches.jpg', // Location > bandeau du haut

  // Contact
  contactHero: '/images/ecole.jpeg', // Contact > bandeau du haut
  contactPlan: '/images/Plan-ecole-de-surf-Skeepskool-Le-Porge.png', // Contact > plan d'accès

  // Autour de nous
  aroundHero: '/images/dune-foret.jpg', // Autour de nous > bandeau du haut
  aroundCamping: '/images/camping.jpg', // Autour de nous > section Camping
  aroundTourism: '/images/plage.jpg', // Autour de nous > Office de tourisme
}

// Home page photo carousel — add or remove lines freely.
export const carousel = [
  { src: '/images/carrousel-1.JPEG', alt: 'Cours de surf à Skeepskool' },
  { src: '/images/sunset2.JPEG', alt: 'Surfeur prenant une vague' },
  { src: '/images/coucher2.jpg', alt: 'Planches de surf alignées' },
  { src: '/images/charliecours.jpg', alt: 'Plage du Porge Océan' },
  { src: '/images/coucher.jpg', alt: 'Vague atlantique qui déferle' },
  { src: '/images/sunset4.JPEG', alt: 'Groupe de surfeurs sur la plage' },
]

// Home page photo gallery — used for the “plus de photos” section.
export const photoGallery = [
  {
    src: '/images/vague_avec_planche.jpg',
    alt: 'Planche de surf portée par une vague au large',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    src: '/images/sunset2.JPEG',
    alt: 'Élève de Skeepskool au coucher du soleil',
    className: 'md:col-span-2',
  },
  {
    src: '/images/carrousel-1.JPEG',
    alt: 'Cours de surf à Skeepskool sur l’eau',
  },
  {
    src: '/images/charliecours.jpg',
    alt: 'Séance de coaching sur le spot du Porge',
  },
  {
    src: '/images/vague.jpg',
    alt: 'Vague de l’Atlantique qui déferle',
  },
  {
    src: '/images/sunset4.JPEG',
    alt: 'Groupe de surfeurs dans la lumière du soir',
  },
  {
    src: '/images/plage.jpg',
    alt: 'Plage sauvage et horizon océanique',
  },
  {
    src: '/images/IMG_2093.jpg',
    alt: 'Session surf en bord d’océan',
  },
  {
    src: '/images/IMG_2122.JPEG',
    alt: 'Élève Skeepskool sur la vague',
  },
  {
    src: '/images/IMG_2170.JPEG',
    alt: 'Moment surf sur le spot du Porge',
  },
  {
    src: '/images/IMG_2177.jpg',
    alt: 'Vue de la session sur l’eau',
  },
  {
    src: '/images/IMG_2188.JPEG',
    alt: 'Surfeur lancé sur une vague',
  },
  {
    src: '/images/IMG_2212.JPEG',
    alt: 'Élève en équilibre sur sa planche',
  },
  {
    src: '/images/IMG_2221.JPEG',
    alt: 'Ambiance de session avec les vagues',
  },
  {
    src: '/images/boss.jpeg',
    alt: 'Portrait de l’équipe Skeepskool',
  },
  {
    src: '/images/camping.jpg',
    alt: 'Camping à proximité de la plage',
  },
  {
    src: '/images/coaching_confirmé.JPG',
    alt: 'Coaching confirmé sur le sable',
  },
  {
    src: '/images/coucher.jpg',
    alt: 'Vague au coucher du soleil',
  },
  {
    src: '/images/coucher2.jpg',
    alt: 'Ambiance océan et planches au coucher du soleil',
  },
  {
    src: '/images/dune-foret.jpg',
    alt: 'Dunes et forêt de pins',
  },
  {
    src: '/images/ecole.jpeg',
    alt: 'L’école de surf Skeepskool',
  },
  {
    src: '/images/hugo.JPG',
    alt: 'Portrait de Hugo',
  },
  {
    src: '/images/manu.JPG',
    alt: 'Portrait de Manu',
  },
  {
    src: '/images/personalise.jpg',
    alt: 'Séance de surf personnalisée',
  },
  {
    src: '/images/planches.jpg',
    alt: 'Planches de surf prêtes sur la plage',
  },
  {
    src: '/images/sunset1.JPEG',
    alt: 'Lumière de sunset sur la plage',
  },
  {
    src: '/images/sunset3.JPEG',
    alt: 'Fin de journée sur l’océan',
  },
  {
    src: '/images/vague_avec_planche_hero.jpg',
    alt: 'Grand visuel de vague avec planche de surf',
  },
]

// Team member portraits.
export const teamPhotos = {
  pierre: '/images/boss.jpeg', //  u('1500648767791-00dcc994a43e', 800)
  mariane: '/images/boss.jpeg', // u('1494790108377-be9c29b29330', 800)
  manoa: '/images/manu.JPG', //    u('1506794778202-cad84cf45f1d', 800)
  hugo: '/images/hugo.JPG', //      u('1507003211169-0a1dd7228f2d', 800)
}

// Exported so the helper stays available if you switch a line back to Unsplash.
export { u }


