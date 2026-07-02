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
  fondpages: '/images/fondpages.JPG', // Image de fond unifiee pour les bandeaux du haut

  // L'école
  schoolHero: '/images/vague.webp', // L'école > bandeau du haut
  schoolSpot: '/images/dune-foret.webp', // L'école > section "Le spot"
  schoolPedagogy: '/images/planches.webp', // L'école > section "Notre pédagogie"
  schoolTeamSection: '/images/charliecours.webp', // L'école > section "Notre équipe"

  // Cours & tarifs
  lessonsHero: '/images/vague.webp', // Cours & tarifs > bandeau du haut
  lessonsIntro: '/images/personalise.jpg', // Cours & tarifs > bloc de présentation
  lessonsSunset: '/images/sunset1.webp', // Cours & tarifs > section Sunset

  // Location
  rentalHero: '/images/planches.webp', // Location > bandeau du haut

  // Contact
  contactHero: '/images/ecole.jpeg', // Contact > bandeau du haut
  contactPlan: '/images/plan-ecole-de-surf-skeepskool-le-porge.png', // Contact > plan d'accès

  // Autour de nous
  aroundHero: '/images/dune-foret.webp', // Autour de nous > bandeau du haut
  aroundCamping: '/images/accueil-camping-la-grigne-2.jpg', // Autour de nous > section Camping
  aroundTourism: '/images/plage.jpg', // Autour de nous > Office de tourisme
}

// Home page photo carousel — add or remove lines freely.
export const carousel = [
  { src: '/images/carrousel-1.jpeg', alt: 'Cours de surf à Skeepskool' },
  { src: '/images/sunset2.jpeg', alt: 'Surfeur prenant une vague' },
  { src: '/images/coucher2.webp', alt: 'Planches de surf alignées' },
  { src: '/images/charliecours.webp', alt: 'Plage du Porge Océan' },
  { src: '/images/coucher.jpg', alt: 'Vague atlantique qui déferle' },
  { src: '/images/sunset4.jpeg', alt: 'Groupe de surfeurs sur la plage' },
]

// Home page photo gallery — used for the “plus de photos” section.
export const photoGallery = [
  {
    src: '/images/vague_avec_planche.webp',
    alt: 'Planche de surf portée par une vague au large',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    src: '/images/sunset2.jpeg',
    alt: 'Élève de Skeepskool au coucher du soleil',
    className: 'md:col-span-2',
  },
  {
    src: '/images/carrousel-1.jpeg',
    alt: 'Cours de surf à Skeepskool sur l’eau',
  },
  {
    src: '/images/charliecours.webp',
    alt: 'Séance de coaching sur le spot du Porge',
  },
  {
    src: '/images/vague.webp',
    alt: 'Vague de l’Atlantique qui déferle',
  },
  {
    src: '/images/sunset4.jpeg',
    alt: 'Groupe de surfeurs dans la lumière du soir',
  },
  {
    src: '/images/plage.jpg',
    alt: 'Plage sauvage et horizon océanique',
  },
  {
    src: '/images/img_2093.jpg',
    alt: 'Session surf en bord d’océan',
  },
  {
    src: '/images/img_2122.jpeg',
    alt: 'Élève Skeepskool sur la vague',
  },
  {
    src: '/images/img_2170.jpeg',
    alt: 'Moment surf sur le spot du Porge',
  },
  {
    src: '/images/img_2177.jpg',
    alt: 'Vue de la session sur l’eau',
  },
  {
    src: '/images/img_2188.jpeg',
    alt: 'Surfeur lancé sur une vague',
  },
  {
    src: '/images/img_2212.jpeg',
    alt: 'Élève en équilibre sur sa planche',
  },
  {
    src: '/images/img_2221.jpeg',
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
    src: '/images/coaching_confirme.jpg',
    alt: 'Coaching confirmé sur le sable',
  },
  {
    src: '/images/coucher.jpg',
    alt: 'Vague au coucher du soleil',
  },
  {
    src: '/images/coucher2.webp',
    alt: 'Ambiance océan et planches au coucher du soleil',
  },
  {
    src: '/images/dune-foret.webp',
    alt: 'Dunes et forêt de pins',
  },
  {
    src: '/images/ecole.jpeg',
    alt: 'L’école de surf Skeepskool',
  },
  {
    src: '/images/hugo.jpg',
    alt: 'Portrait de Hugo',
  },
  {
    src: '/images/manu.jpg',
    alt: 'Portrait de Manu',
  },
  {
    src: '/images/personalise.jpg',
    alt: 'Séance de surf personnalisée',
  },
  {
    src: '/images/planches.webp',
    alt: 'Planches de surf prêtes sur la plage',
  },
  {
    src: '/images/sunset1.webp',
    alt: 'Lumière de sunset sur la plage',
  },
  {
    src: '/images/sunset3.jpeg',
    alt: 'Fin de journée sur l’océan',
  },
  {
    src: '/images/vague_avec_planche_hero.jpg',
    alt: 'Grand visuel de vague avec planche de surf',
  },
  {
    src: '/images/accueil-camping-la-grigne-2.jpg',
    alt: 'Vue du camping La Grigne',
  },
  {
    src: '/images/charlie.jpeg',
    alt: 'Session de surf encadrée par Charlie',
  },
  {
    src: '/images/charliecours.jpg',
    alt: 'Cours de surf au Porge Océan',
  },
  {
    src: '/images/planches.jpg',
    alt: 'Planches de surf préparées pour la session',
  },
  {
    src: '/images/sunset1.jpeg',
    alt: 'Session au coucher du soleil',
  },
  {
    src: '/images/vague_avec_planche.jpg',
    alt: 'Vague avec planche en premier plan',
  },
  {
    src: '/images/vague.jpg',
    alt: 'Vague atlantique sur le spot du Porge',
  },
  {
    src: '/images/dune-foret.jpg',
    alt: 'Dunes et forêt autour du spot',
  },
  {
    src: '/images/DSC_0880.JPG',
    alt: 'Photo de session surf DSC 0880',
  },
  {
    src: '/images/DSC_5586.jpg',
    alt: 'Photo de session surf DSC 5586',
  },
  {
    src: '/images/288509_2276646957644_6309143_o.jpg',
    alt: 'Archive surf 288509',
  },
  {
    src: '/images/290693_2276636797390_3586123_o.jpg',
    alt: 'Archive surf 290693',
  },
]

// Team member portraits.
export const teamPhotos = {
  pierre: '/images/pierre.jpeg', //  u('1500648767791-00dcc994a43e', 800)
  mariane: '/images/mariane.jpeg', // u('1494790108377-be9c29b29330', 800)
  manoa: '/images/manu.jpg', //    u('1506794778202-cad84cf45f1d', 800)
  hugo: '/images/hugo.jpg', //      u('1507003211169-0a1dd7228f2d', 800)
}

// Exported so the helper stays available if you switch a line back to Unsplash.
export { u }


