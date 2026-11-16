// Informations globales du site — un seul endroit à modifier.
export const site = {
  name: 'Chef Kara',
  url: 'https://www.lechefkara.com',
  phoneDisplay: '07 69 65 35 12',
  phoneHref: 'tel:+33769653512',
  email: 'sowmodoukara@gmail.com',
  whatsapp: 'https://wa.me/33769653512',
  stats: { years: 9, rating: '4,49', services: 296 },
  socials: [
    { label: 'Take a Chef', href: 'https://www.takeachef.com/fr-fr/chef/modou-kara-sow' },
    { label: 'Instagram', href: 'https://www.instagram.com/chef_karaaa' },
    { label: 'GetChef', href: 'https://www.getchef.fr/' },
    { label: 'Barnes', href: 'https://www.barnes-paris.com/' },
    { label: 'Private Chef Manager', href: 'https://www.privatechefmanager.com' },
  ],
  cities: ['Paris', 'Nantes', 'Bordeaux', 'Cannes', 'Lyon', 'Marseille'],
}

// Navigation principale (les libellés viennent de i18n : nav.<key>)
export const navigation = [
  { key: 'home', to: '/' },
  { key: 'services', to: '/prestations' },
  { key: 'menu', to: '/menu' },
  { key: 'chef', to: '/chef' },
  { key: 'gallery', to: '/galerie' },
  { key: 'contact', to: '/contact' },
]

export function whatsappLink(message) {
  return message ? `${site.whatsapp}?text=${encodeURIComponent(message)}` : site.whatsapp
}
