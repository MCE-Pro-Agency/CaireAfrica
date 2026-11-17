// Sélection de projets affichée sur l'accueil.
// Source : tableau « 00 - CAIREAFRICA - Projets », fiches projets du Drive et brochure CAIREAFRICA 06/2026.
// status : 'concept' | 'ongoing' | null  (libellés dans i18n : projects.status.<key>)
// year   : nombre, ou null si inconnu (rien n'est alors affiché)
// image  : fichier placé dans public/images/
// La liste complète (≈ 20 références) alimentera la future page /projets.

export const projects = [
  {
    slug: 'makaan-oasis',
    name: 'Makaan Oasis',
    city: 'Dakar',
    country: { fr: 'Sénégal', en: 'Senegal' },
    sector: { fr: 'Résidentiel', en: 'Residential' },
    year: 2025,
    status: 'ongoing',
    summary: {
      fr: 'Résidence face à l’océan aux Almadies : appartements, piscine, services.',
      en: 'Ocean-facing residence in Almadies: apartments, pool and services.',
    },
    credit: 'Stefano Barbieri',
    image: '/images/makaan.jpg',
  },
  {
    slug: 'campus-universitaire-de-thies',
    name: 'Campus universitaire de Thiès',
    city: 'Thiès',
    country: { fr: 'Sénégal', en: 'Senegal' },
    sector: { fr: 'Éducation', en: 'Education' },
    year: 2019,
    status: 'concept',
    summary: {
      fr: 'Campus régional de l’Université de Thiès.',
      en: 'Regional campus for the University of Thiès.',
    },
    image: '/images/Thies.jpg',
  },
  {
    slug: 'campus-universitaire-alioune-diop',
    name: 'Campus Universitaire Alioune Diop',
    city: 'Bambey',
    country: { fr: 'Sénégal', en: 'Senegal' },
    sector: { fr: 'Éducation', en: 'Education' },
    year: 2019,
    status: 'ongoing',
    summary: {
      fr: 'Campus universitaire conçu avec une attention particulière à la durabilité.',
      en: 'University campus designed with a strong focus on sustainability.',
    },
    image: '/images/alioune_diop.jpg',
  },
  {
    slug: 'restaurant-ucad',
    name: 'Restaurant principal de l’UCAD',
    city: 'Dakar',
    country: { fr: 'Sénégal', en: 'Senegal' },
    sector: { fr: 'Équipements universitaires', en: 'University facilities' },
    year: null, // À COMPLÉTER : année absente de la fiche projet
    status: null,
    summary: {
      fr: '16 000 m² sur trois niveaux et quatre salles de 880 places, éclairées par des sheds en acier.',
      en: '16,000 m² over three levels and four 880-seat halls, lit by steel sawtooth skylights.',
    },
    image: '/images/restaurant_Ucad.jpg',
  },
  {
    slug: 'safietou',
    name: 'Safiétou',
    city: 'Dakar',
    country: { fr: 'Sénégal', en: 'Senegal' },
    sector: { fr: 'Résidentiel', en: 'Residential' },
    year: 2025,
    status: 'ongoing',
    summary: {
      fr: 'Résidence à Yoff : conception et direction des travaux.',
      en: 'Residence in Yoff: design and site supervision.',
    },
    credit: 'Stefano Barbieri',
    image: '/images/safietou.jpg',
  },
  {
    slug: 'agrifood-platform',
    name: 'Agrifood Platform',
    city: 'Jenoi',
    country: { fr: 'Gambie', en: 'The Gambia' },
    sector: { fr: 'Industrie et logistique', en: 'Industry & logistics' },
    year: 2022,
    status: null,
    summary: {
      fr: 'Plateforme agroalimentaire : conception et direction des travaux.',
      en: 'Agrifood platform: design and site supervision.',
    },
    image: '/images/agrifood.jpg',
  },
]