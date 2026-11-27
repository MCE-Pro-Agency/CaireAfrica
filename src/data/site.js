// Informations globales du site — un seul endroit à modifier.
export const site = {
  name: 'CAIREAFRICA',
  baseline: 'Architecture · Ingénierie',
  address: 'Rue MZ 134, Mermoz, Dakar',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rue+MZ+134+Mermoz+Dakar',

  // Bureau de Dakar (source : brochure CAIREAFRICA 06/2026)
  phoneDisplay: '+221 78 462 26 26',
  phoneHref: 'tel:+221784622626',
  // À CONFIRMER : la brochure indique info@caire.africa, le cahier des charges info@caire.africa.it
  email: 'info@caire.africa',

  // Contact direct (numéro italien — appel ou WhatsApp)
  contactPerson: 'Antonio Armaroli',
  contactPhoneDisplay: '+39 335 626 9505',
  contactPhoneHref: 'tel:+393356269505',
  whatsapp: 'https://wa.me/393356269505',

  parent: { name: 'CAIREPRO', href: 'https://www.cairepro.it/fr/' },

  // Réseaux sociaux : renseigner les URL ; une entrée sans href n'est pas affichée.
  socials: [
    { label: 'CAIREPRO', href: 'https://www.cairepro.it/fr/' },
    { label: 'LinkedIn', href: '' },
    { label: 'Instagram', href: '' },
    { label: 'Facebook', href: '' },
    { label: 'TikTok', href: '' },
  ],
}

// Navigation principale (libellés dans i18n : nav.<key>)
// L'équipe est présentée sur la page À propos (plus d'entrée « Équipe » dans le menu).
export const navigation = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/a-propos' },
  { key: 'expertise', to: '/expertises' },
  { key: 'projects', to: '/projets' },
  { key: 'news', to: '/actualites' },
]

export function whatsappLink(message) {
  return message ? `${site.whatsapp}?text=${encodeURIComponent(message)}` : site.whatsapp
}