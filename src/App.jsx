import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Prestations from './pages/Prestations'
import Menu from './pages/Menu'
import Chef from './pages/Chef'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import Cookies from './pages/Cookies'
import NotFound from './pages/NotFound'

// Plan du site
//   /                   Accueil
//   /prestations        Les trois prestations (ancres #domicile #evenements #partout)
//   /menu               Les huit cartes
//   /menu/:slug         Détail d'une carte (fenêtre par-dessus la liste, URL partageable)
//   /chef               Le chef
//   /galerie            Photos & vidéos
//   /contact            Formulaire de réservation (?menu=slug pour pré-remplir)
//   /mentions-legales   Mentions légales
//   /cookies            Cookies
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="prestations" element={<Prestations />} />
        <Route path="menu" element={<Menu />} />
        <Route path="menu/:slug" element={<Menu />} />
        <Route path="chef" element={<Chef />} />
        <Route path="galerie" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="mentions-legales" element={<Legal />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
