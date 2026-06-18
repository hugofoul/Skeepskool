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
  homeHero: '/images/vague_avec_planche.jpg', // Accueil > grand hero

  // L'école
  schoolHero: '/images/vague.jpg', // L'école > bandeau du haut
  schoolSpot: '/images/dune-foret.jpg', // L'école > section "Le spot"
  schoolPedagogy: '/images/planches.jpg', // L'école > section "Notre pédagogie"
  schoolTeamSection: '/images/charliecours.jpg', // L'école > section "Notre équipe"

  // Cours & tarifs
  lessonsHero: '/images/vague.jpg', // Cours & tarifs > bandeau du haut
  lessonsIntro: '/images/vague.jpg', // Cours & tarifs > bloc de présentation
  lessonsSunset: '/images/sunset1.JPEG', // Cours & tarifs > section Sunset

  // Location
  rentalHero: '/images/planches.jpg', // Location > bandeau du haut

  // Contact
  contactHero: '/images/école.jpeg', // Contact > bandeau du haut

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
  { src: '/images/sunset3.JPEG', alt: 'Groupe de surfeurs sur la plage' },
]

// Team member portraits.
export const teamPhotos = {
  pierre: '/images/boss.jpeg', //  u('1500648767791-00dcc994a43e', 800)
  mariane: '/images/boss.jpeg', // u('1494790108377-be9c29b29330', 800)
  manoa: '/images/charlie.jpeg', //    u('1506794778202-cad84cf45f1d', 800)
  hugo: '/images/hugo.JPG', //      u('1507003211169-0a1dd7228f2d', 800)
}

// Exported so the helper stays available if you switch a line back to Unsplash.
export { u }


