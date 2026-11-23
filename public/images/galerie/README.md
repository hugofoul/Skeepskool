# Images du site Skeepskool

## Ajouter des photos à la galerie

1. Déposez vos photos dans le dossier `public/images/galerie/`
   (sur GitHub : ouvrez le dossier → **Add file** → **Upload files** → **Commit changes**).
2. C'est tout : le site se reconstruit et se met en ligne tout seul.

Conseils :

- **Ordre** : les photos s'affichent dans l'ordre de leur nom de fichier.
  Commencez le nom par un numéro (`34-...`, `35-...`) pour choisir l'ordre.
- **Nom de fichier** : décrivez la photo, sans espace ni accent
  (`34-cours-enfants-maree-basse.jpg`). Il sert de texte descriptif pour Google.
- **Légende avec accents** (facultatif) : ajoutez une ligne dans
  `legendes.txt` (dans ce dossier) : `34-cours-enfants-maree-basse.jpg = Cours enfants à marée basse`.
- **Retirer une photo** : supprimez simplement le fichier.
- **Formats** : JPG, PNG ou WebP. Inutile de réduire les photos vous-même :
  les versions légères (WebP, 400 à 2000 px) sont fabriquées automatiquement.
  Évitez seulement les fichiers de plus de 15 Mo.

## Images des autres pages

Elles sont déclarées dans `src/data/images.js`. Pour remplacer une image,
déposez le nouveau fichier dans `public/images/` puis changez son nom dans ce fichier.

## Comment ça marche

`scripts/optimize-images.mjs` est lancé avant `npm run dev` et `npm run build`.
Il crée `public/images/optimized/` (versions WebP) et `src/data/image-manifest.json`
(liste des tailles disponibles + galerie). Ces deux éléments ne sont pas
enregistrés dans Git : ils sont recréés à chaque construction du site.
