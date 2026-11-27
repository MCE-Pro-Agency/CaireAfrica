// Diaporama « Parce que chaque détail compte » (page Expertises).
// Ajouter une photo : la déposer dans public/images/details/ puis ajouter une ligne ici.
// title : titre affiché sur la photo · caption : sous-titre (facultatif) · tag : petit libellé (facultatif)
// portrait : true pour une photo verticale (affichée entière, sur un fond flouté)
const fr = (fr, en) => ({ fr, en })

export const details = [
  {
    image: '/images/details/chantier-visite-1.jpg',
    tag: fr('Chantier', 'Site'),
    title: fr('Visite de chantier à Dakar', 'Site visit in Dakar'),
    caption: fr('Lecture des plans sur place, avec le client et les entreprises.', 'Reading the drawings on site with the client and contractors.'),
  },
  {
    image: '/images/details/chantier-visite-3.jpg',
    tag: fr('Direction des travaux', 'Site supervision'),
    title: fr('Chaque choix se vérifie sur place', 'Every choice is checked on site'),
    caption: fr('Plans en main, l’équipe valide l’exécution pièce par pièce.', 'Drawings in hand, the team checks the works room by room.'),
  },
  {
    image: '/images/details/chantier-plans.jpg',
    portrait: true,
    tag: fr('Équipe', 'Team'),
    title: fr('Nos ingénieurs sur le terrain', 'Our engineers on site'),
    caption: fr('L’équipe CAIREAFRICA consulte les plans d’exécution.', 'The CAIREAFRICA team reviews the construction drawings.'),
  },
  {
    image: '/images/details/chantier-visite-2.jpg',
    tag: fr('Coordination', 'Coordination'),
    title: fr('Un dialogue constant avec le client', 'Constant dialogue with the client'),
    caption: fr('Maître d’ouvrage, entreprises et CAIREAFRICA autour des mêmes plans.', 'Client, contractors and CAIREAFRICA around the same drawings.'),
  },
  {
    image: '/images/details/chantier-coffrage.jpg',
    tag: fr('Structure', 'Structure'),
    title: fr('Contrôle des coffrages avant coulage', 'Checking formwork before pouring'),
    caption: fr('Sur le chantier, avec les équipes de Réalités Sénégal.', 'On site, with the Réalités Sénégal teams.'),
  },
  {
    image: '/images/details/visite-realites-reggio-emilia.jpg',
    tag: fr('Italie', 'Italy'),
    title: fr('Visite de Réalités Sénégal à Reggio Emilia', 'Réalités Sénégal visits Reggio Emilia'),
    caption: fr('Au siège CAIREPRO, en Italie, avec notre client.', 'At CAIREPRO head office in Italy, with our client.'),
  },
  {
    image: '/images/details/visite-realites-reggio-emilia-2.jpg',
    portrait: true,
    tag: fr('Italie', 'Italy'),
    title: fr('Revue de projet au siège CAIREPRO', 'Design review at CAIREPRO head office'),
    caption: fr('Échanges autour des planches à Reggio Emilia.', 'Discussing the boards in Reggio Emilia.'),
  },
]
