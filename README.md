# Chef Kara — site vitrine

Refonte de [lechefkara.com](https://www.lechefkara.com/) en **React 18 + Vite 5 + Tailwind CSS 3**
(React Router 6, bilingue FR/EN, sans back-end).

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
npm run preview  # prévisualise dist/
```

## Plan du site

| URL                 | Page                                                        |
| ------------------- | ----------------------------------------------------------- |
| `/`                 | Accueil                                                     |
| `/prestations`      | Trois chapitres : `#domicile`, `#evenements`, `#partout`    |
| `/menu`             | Les huit cartes + menu sur mesure                           |
| `/menu/:slug`       | Détail d'une carte (URL partageable, ex. `/menu/prestige`)  |
| `/chef`             | Histoire, chiffres, reconnaissances, valeurs, villes        |
| `/galerie`          | 27 photos / vidéos filtrables + visionneuse                 |
| `/contact`          | Coordonnées + formulaire en 4 étapes (`?menu=slug`)         |
| `/mentions-legales` | Mentions légales (**champs à compléter**)                   |
| `/cookies`          | Cookies                                                     |

## Arborescence

```
chef-kara/
├── index.html                  Balises SEO / Open Graph, polices
├── tailwind.config.js          Couleurs (ink, coal, ivory), polices, animations
├── public/
│   ├── .htaccess               Routage SPA Apache/LiteSpeed (corrige le 403)
│   ├── _redirects              Routage SPA Netlify
│   ├── favicon.svg
│   └── images/                 Médias à déposer (voir images/LISEZ-MOI.md)
└── src/
    ├── main.jsx                Point d'entrée
    ├── App.jsx                 Routes
    ├── index.css               Tailwind + classes maison (.btn-solid, .eyebrow…)
    ├── data/                   ← LE CONTENU MODIFIABLE
    │   ├── site.js             Téléphone, e-mail, WhatsApp, réseaux, navigation
    │   ├── menus.js            Les 8 cartes et leurs plats
    │   ├── testimonials.js     Avis clients
    │   └── gallery.js          Médias de la galerie
    ├── i18n/
    │   ├── LanguageContext.jsx Langue courante, t(), pick(), consentement
    │   ├── fr.js               Tous les textes français
    │   └── en.js               Tous les textes anglais
    ├── hooks/
    │   └── usePageMeta.js      <title> et description par page
    ├── components/
    │   ├── layout/             Layout, Header, Footer, WhatsAppButton, CookieBanner
    │   ├── ui/                 Logo, Media (image avec repli), PageHero
    │   └── sections/           Testimonials, CtaBand, MenuModal, BookingForm
    └── pages/                  Home, Prestations, Menu, Chef, Gallery, Contact,
                                Legal, Cookies, NotFound
```

## Modifier le contenu

- **Un texte** : `src/i18n/fr.js` (et son équivalent dans `en.js`).
- **Un menu / un plat** : `src/data/menus.js`.
- **Une photo** : déposer le fichier dans `public/images/` (noms attendus dans
  `public/images/LISEZ-MOI.md`). Sans fichier, un bloc de remplacement s'affiche.
- **Les coordonnées** : `src/data/site.js`.

## Mise en ligne

Envoyer le **contenu** de `dist/` à la racine de l'hébergement. Le fichier
`.htaccess` est copié automatiquement dans `dist/` : il renvoie toutes les URL
vers `index.html`, ce qui corrige l'erreur 403 du site actuel sur l'accès direct
à `/prestations` et `/menu`.

## Points à traiter avant la mise en ligne

1. **Images et vidéos** : à récupérer auprès du chef et à déposer dans `public/images/`.
2. **Mentions légales** : compléter les champs entre crochets (`legal.sections` dans `fr.js` / `en.js`).
3. **Menu « Étoiles Fusionner »** : semble être un doublon du « Menu Étoiles Fusion » — à confirmer avec le chef.
4. **Formulaire** : la demande part par WhatsApp ou par e-mail pré-rempli (aucun serveur).
   Pour enregistrer les demandes (Supabase, Formspree…), voir le commentaire en tête de
   `src/components/sections/BookingForm.jsx`.
5. **Carte des villes** : le site actuel affiche une carte Leaflet ; ici, la liste des villes
   suffit. Ajouter `react-leaflet` dans `src/pages/Chef.jsx` si la carte est souhaitée.
