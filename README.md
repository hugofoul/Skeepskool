# Skeepskool — École de Surf Le Porge Océan

Site de **Skeepskool**, école de surf labellisée FFS à Le Porge Océan (Gironde).
Trilingue (français, anglais, allemand) · React 18 + React Router + Tailwind CSS + Vite.

---

## Démarrer en local

Prérequis : Node.js 20+ et Google Chrome (pour le pré-rendu).

```bash
npm install
npm run dev       # http://localhost:5173 (optimise les images au premier lancement)
npm run build     # images + build Vite + pré-rendu des pages dans dist/
npm run preview   # aperçu du build
npm run lint
```

## Comment le site est organisé

| Dossier / fichier | Rôle |
| --- | --- |
| `src/pages/` | Une page par fichier |
| `src/components/` | Menu, pied de page, bandeau cookies, blocs réutilisables |
| `src/translations/fr.js`, `en.js`, `de.js` | **Tous les textes**, dans les 3 langues |
| `src/config/routes.js` | Adresse de chaque page dans chaque langue (`/cours`, `/en/lessons`, `/de/kurse`…) |
| `src/config/site.js` | Téléphones, réseaux sociaux, adresse du site |
| `src/data/images.js` | Images utilisées par les pages |
| `public/images/galerie/` | **Photos de la galerie** (voir le README de ce dossier) |
| `public/.htaccess` | Configuration OVH : redirections des anciennes adresses, cache, compression |
| `public/api/send-request.php` | Envoi du récapitulatif des réservations par e-mail (Resend) sur OVH |
| `api/send-request.js` | Même chose sur Vercel (phase de test) |
| `scripts/optimize-images.mjs` | Fabrique les versions WebP des images + la liste de la galerie |
| `scripts/prerender.mjs` | Pré-rendu HTML de chaque page + `sitemap.xml` |

### Langues
Le français est à la racine, l'anglais sous `/en`, l'allemand sous `/de`.
Pour modifier un texte : le chercher dans `src/translations/`.
Pour un lien vers une page dans le code : `path('booking')` (fourni par `useLang()`), jamais une adresse écrite à la main.

### Images
- **Galerie** : déposer les photos dans `public/images/galerie/` (ordre = nom de fichier). Rien d'autre à faire.
- Les versions légères (WebP 400 → 2000 px) sont créées automatiquement par `npm run dev` / `npm run build`
  dans `public/images/optimized/` ; ce dossier n'est pas dans Git.

### SEO
Chaque page a son titre, sa description, son adresse canonique et ses balises hreflang (FR/EN/DE),
générés par `src/components/SEO.jsx`. Au build, chaque page est pré-rendue en HTML et `sitemap.xml` est généré.

## E-mails de réservation (Resend)

Les formulaires « Réserver » et « Bon cadeau » envoient un récapitulatif à skeepskool@hotmail.com
(offre gratuite de Resend : 3 000 e-mails/mois, 100/jour), puis proposent WhatsApp en complément.
Si l'envoi échoue, le formulaire propose WhatsApp avec le message déjà prêt.

1. Créer un compte sur https://resend.com **avec l'adresse skeepskool@hotmail.com**, puis une clé API.
2. Vercel : variable d'environnement `RESEND_API_KEY`. OVH : secret GitHub `RESEND_API_KEY` (voir ci-dessous).
3. Plus tard (recommandé) : vérifier le domaine leporge-ecoledesurf.com dans Resend (enregistrements DNS chez OVH)
   et utiliser un expéditeur `reservations@leporge-ecoledesurf.com` (`MAIL_FROM`).

## Déploiement

- **Phase de test : Vercel** (`vercel.json`). Sans Chrome sur Vercel, les pages ne sont pas pré-rendues :
  le site fonctionne normalement, seul le bénéfice SEO du pré-rendu manque.
- **Mise en ligne : OVH** via GitHub Actions (`.github/workflows/deploy-ovh.yml`) : construit le site
  (avec pré-rendu) et l'envoie en FTP. Lancement manuel depuis l'onglet *Actions* tant que le site
  n'est pas en production ; secrets à créer : `OVH_FTP_SERVER`, `OVH_FTP_USERNAME`, `OVH_FTP_PASSWORD`, `RESEND_API_KEY`.
- Le jour J : soumettre `https://www.leporge-ecoledesurf.com/sitemap.xml` dans Google Search Console
  et surveiller les erreurs 404 pendant quelques semaines.

## Contact

skeepskool@hotmail.com · +33 6 70 60 84 26 · +33 6 50 52 34 75 · Instagram/Facebook @skeepskool
