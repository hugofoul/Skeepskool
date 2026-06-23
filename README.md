# Skeepskool — École de Surf Le Porge Océan

Site web officiel de **Skeepskool**, école de surf labellisée FFS à Le Porge Océan, Gironde.

> 🏄 Cours collectifs et particuliers dès 5 ans | Location de matériel | À 50 min de Bordeaux

---

## 🎯 À propos du projet

Site vitrine moderne et bilingue (FR/EN) avec :
- Présentation de l'école et l'équipe
- Formules et tarifs des cours
- Planning en temps réel
- Système de réservation
- Localisation et accès
- Horaires et infos pratiques

**Stack tech** : React 18 + React Router + Tailwind CSS + Vite

---

## ⚙️ Installation & Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Setup local

```bash
# Clone le repo
git clone <repo-url>
cd Skeepksool

# Installe les dépendances
npm install

# Lance le serveur de dev (http://localhost:5173)
npm run dev

# Build pour production
npm run build

# Préview du build
npm run preview

# Lint le code
npm run lint
npm run lint:fix
```

---

## 📁 Structure du projet

```
Skeepksool/
├── public/
│   ├── images/              # Toutes les photos du site
│   │   ├── LISEZ-MOI.md     # Convention de nommage
│   │   └── Plan-ecole-de-surf-Skeepskool-Le-Porge.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── App.jsx              # Routeur principal
│   ├── main.jsx             # Entry point React
│   ├── index.css            # Styles globaux
│   ├── components/          # Composants réutilisables
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CTAButton.jsx
│   │   ├── PageHero.jsx
│   │   ├── SEO.jsx
│   │   └── ...
│   ├── pages/               # Pages du site (route-mapped)
│   │   ├── Home.jsx
│   │   ├── School.jsx
│   │   ├── Lessons.jsx
│   │   ├── Schedule.jsx
│   │   ├── Rental.jsx
│   │   ├── Around.jsx
│   │   ├── Contact.jsx
│   │   ├── Booking.jsx
│   │   └── Legal.jsx
│   ├── hooks/               # Hooks personnalisés
│   │   ├── useLang.js       # Gestion langue FR/EN
│   │   ├── useSurfConditions.js
│   │   └── useWeeklySchedule.js
│   ├── context/
│   │   └── LanguageContext.jsx
│   ├── data/
│   │   └── images.js        # Catalogue d'images du site
│   ├── config/
│   │   └── site.js          # Config globale (phones, URLs, etc.)
│   └── translations/
│       ├── fr.js            # Contenu français
│       └── en.js            # Contenu anglais
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── package.json
```

---

## 🌐 Routes disponibles

| Route | Page | FR | EN |
|-------|------|----|----|
| `/` | Accueil | ✓ | ✓ |
| `/ecole` | L'école | ✓ | `/school` |
| `/cours` | Formules & Tarifs | ✓ | `/lessons` |
| `/reserver` | Réservation | ✓ | `/book` |
| `/horaires` | Planning | ✓ | `/schedule` |
| `/location` | Location matériel | ✓ | `/rental` |
| `/autour` | Autour de nous | ✓ | `/around` |
| `/contact` | Infos pratiques | ✓ | - |
| `/mentions-legales` | Mentions légales | ✓ | `/legal` |

---

## 🖼️ Gestion des images

Toutes les images du site se trouvent dans `/public/images/`.

**Ajouter une image** :
1. Placer le fichier dans `/public/images/`
2. Respecter la convention : nom ASCII, sans accents ni espaces
3. Ajouter la référence dans `src/data/images.js`
4. Utiliser l'image via `images.nomDeLImage`

**Exemple** :
```js
// src/data/images.js
export const images = {
  homeHero: '/images/vague_avec_planche_hero.jpg',
  schoolSpot: '/images/dune-foret.jpg',
  // ...
}
```

Voir `public/images/LISEZ-MOI.md` pour les détails et formats recommandés.

---

## 🌍 Multilingue (FR/EN)

Le site bascule automatiquement selon la route :
- `/route` → Français
- `/route-en` ou `/route` en anglais → Anglais

**Modifier le contenu** :
- Français : `src/translations/fr.js`
- Anglais : `src/translations/en.js`

Utilisation dans les composants :
```jsx
import { useLang } from '../hooks/useLang.js'

export default function MyComponent() {
  const { t, lang } = useLang()
  return <h1>{t.home.heroTitle}</h1>
}
```

---

## ⚙️ Configuration globale

**Site config** (`src/config/site.js`) :
- Numéros de téléphone
- Email
- URLs externes (WhatsApp, socials, Google Maps)
- Informations de contact

Exemple d'utilisation :
```jsx
import { CONTACT, SOCIAL } from '../config/site.js'
<a href={`tel:${CONTACT.phonePrimary}`}>{CONTACT.phonePrimaryDisplay}</a>
```

---

## 🔍 SEO

Le site utilise `react-helmet-async` pour gérer :
- Titres de page
- Meta descriptions
- Alternates hrefLang (bilingue)
- Sitemap et robots.txt

Exemple :
```jsx
<SEO
  title="Accueil"
  path="/"
  description="École de surf labellisée FFS à Le Porge Océan..."
  alternates={[
    { hrefLang: 'fr-FR', path: '/' },
    { hrefLang: 'en', path: '/' },
  ]}
/>
```

---

## 📱 Design Responsive

Le site est construit avec **Tailwind CSS** et est entièrement responsive :
- Mobile (< 640px)
- Tablette (640px – 1024px)
- Desktop (> 1024px)

Breakpoints Tailwind : `sm`, `md`, `lg`, `xl`, `2xl`

---

## 🎨 Thème & Couleurs

Couleurs personnalisées dans `tailwind.config.js` :
- `royalBlue` : Bleu principal
- `red` : Rouge accent (CTA)
- `yellow` : Jaune accent
- `dark` : Textes sombres
- `lightGray` : Fond clair

---

## 🚀 Déploiement

**Build pour production** :
```bash
npm run build
```

Les fichiers générés se trouvent dans le dossier `dist/`.

Le site est hébergé sur **Vercel** (configuration dans `vercel.json`).

Pour redéployer :
```bash
git push origin main
```

Vercel redéploiera automatiquement.

---

## 📋 Commandes utiles

```bash
# Dev mode avec hot reload
npm run dev

# Build une fois
npm run build

# Vérifier et corriger le lint
npm run lint:fix

# Voir le build en local
npm run preview
```

---

## 🔗 Liens importants

- **Site en ligne** : https://skeepskool.fr
- **Vercel Dashboard** : https://vercel.com
- **Google Maps** : Intégré dans Contact
- **WhatsApp Community** : Lien dans le site
- **Réseaux sociaux** : Instagram, Facebook (links dans config)

---

## 📝 Notes importantes

- **Horaires** : Ouvert d'avril à novembre (9h–19h)
- **Label** : École Française de Surf (FFS)
- **Planning** : Consulter WhatsApp pour horaires en temps réel
- **Localisation** : 40m au nord de l'accès principal, Plage Centrale, Le Porge Océan

---

## 👥 Équipe

- **Pierre** : Le boss
- **Mariane** : La maman de l'équipe
- **Manua** : Le prof cool (Tahiti)
- **Hugo** : Le gardien de la cabane

---

## 📧 Support & Contact

- **Email** : skeepskool@hotmail.com
- **Téléphone** : +33 6 70 60 84 26 · +33 6 50 52 34 75
- **Instagram** : @skeepskool
- **Facebook** : @skeepskool

---

## 📄 Licence

Projet privé © Skeepskool 2024+

---

**Dernière mise à jour** : 23 juin 2026
