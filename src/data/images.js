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
  hero: '/images/vague_avec_planche.jpg', //          u('1502680390469-be75c86b636f')
  wave: '/images/vague.jpg', //         u('1505459668311-8dfac7952bf9')
  beach: '/images/vague_avec_planche.jpg', //        u('1507525428034-b723cf961d3e')
  surfboards: '/images/planches.jpg', // u('1531722569936-825d3dd91b15')
  riding: '/images/vague.jpg', //  u('1455729552865-3658a5d39692')
  dunePines: '/images/dune-foret.jpg', // u('1559827260-dc66d52bef19')
  lesson: '/images/charliecours.jpg', //       u('1549880181-56a44cf4a9a5')
  team: '/images/charliecours.jpg', //        u('1530870110042-98b2cb110834')
  contact: '/images/école.jpeg', //      u('1520454974749-611b7248ffdb')
}

// Home page photo carousel — add or remove lines freely.
export const carousel = [
  { src: '/images/carrousel-1.JPEG', alt: 'Cours de surf à Skeepskool' },
  { src: '/images/école.jpeg', alt: 'Surfeur prenant une vague' },
  { src: '/images/coucher2.jpg', alt: 'Planches de surf alignées' },
  { src: '/images/carrousel-4.jpg', alt: 'Plage du Porge Océan' },
  { src: '/images/coucher.jpg', alt: 'Vague atlantique qui déferle' },
  { src: '/images/dune-foret.jpg', alt: 'Groupe de surfeurs sur la plage' },
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


