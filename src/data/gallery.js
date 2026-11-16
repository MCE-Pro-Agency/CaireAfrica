// Galerie : 27 médias. category : 'plates' | 'desserts' | 'kitchen'
// video: true → fichier /images/galerie/NN.mp4 (+ NN.jpg comme image d'aperçu)

const raw = [
  ['plates', 'Dos de cabillaud, sauce crémée au caviar'],
  ['desserts', 'Tiramisu maison au cacao'],
  ['plates', 'Tartine, herbes et perles de moutarde'],
  ['desserts', 'Pavlova, fruits rouges et fleurs'],
  ['kitchen', 'Le geste du chef, au dressage'],
  ['kitchen', 'Le chef en action, dressage en cuisine', true],
  ['plates', 'Pièce de bœuf, pommes grenaille, sauce au poivre'],
  ['plates', 'Aubergines rôties, houmous, lentilles noires et pois chiches'],
  ['desserts', 'Crème légère, émulsion basilic et crumble doré'],
  ['plates', 'Ris de veau, laitue rôtie, champignons et tuile aux herbes'],
  ['desserts', 'Mousse chocolat, myrtilles et éclats de meringue'],
  ['kitchen', 'Dîner privé en appartement parisien'],
  ['kitchen', "Préparation d'un plat, gestes du chef", true],
  ['plates', 'Tartare de bœuf en brioche, mimolette soufflée et sauce tartare'],
  ['desserts', 'Tiramisu et carpaccio de fraises, dressage en bols'],
  ['plates', 'Menu Prestige : velouté, magret, stracciatella et pièce de bœuf'],
  ['plates', 'Poulpe snacké, mini-maïs grillés et émulsion de maïs'],
  ['plates', 'Poisson blanc en croûte de sésame noir, caviar et touches de carotte'],
  ['plates', 'Tartine croustillante, crevettes aux herbes et perles de moutarde'],
  ['desserts', 'Dessert à la mangue, meringue et fleurs de bourrache', true],
  ['plates', 'Suprême de volaille, purée de courge, maïs grillé et jus au vin rouge'],
  ['plates', 'Magret de canard, purée de carotte et perles de moutarde'],
  ['kitchen', 'Le geste du chef : perles de moutarde à la cuillère'],
  ['kitchen', 'Service en cuisine : dressage de plats et desserts en série', true],
  ['plates', 'Poisson blanc, sauce crémée au sésame noir et caviar'],
  ['plates', 'Joue de bœuf braisée, gnocchis, champignons et lardons'],
  ['plates', 'Tartare de bœuf sur brioche, jaune d’œuf râpé et câpre'],
]

export const gallery = raw.map(([category, title, video = false], i) => {
  const id = String(i + 1).padStart(2, '0')
  return {
    id,
    category,
    title,
    video,
    src: `/images/galerie/${id}.jpg`,
    videoSrc: video ? `/images/galerie/${id}.mp4` : null,
  }
})

// Filtres (libellés dans i18n : gallery.filters.<key>)
export const galleryFilters = [
  { key: 'all', match: () => true },
  { key: 'plates', match: (m) => m.category === 'plates' },
  { key: 'desserts', match: (m) => m.category === 'desserts' },
  { key: 'kitchen', match: (m) => m.category === 'kitchen' },
  { key: 'videos', match: (m) => m.video },
]
