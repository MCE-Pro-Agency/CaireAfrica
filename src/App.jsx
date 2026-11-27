import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Expertises from './pages/Expertises'
import Projects from './pages/Projects'
import ComingSoon from './pages/ComingSoon'
import Contact from './pages/Contact'
import Legal from './pages/Legal'
import Cookies from './pages/Cookies'
import NotFound from './pages/NotFound'

// Plan du site (arborescence du cahier des charges)
//   /                   Accueil
//   /a-propos           À propos / Qui sommes-nous      (à construire)
//   /expertises         Expertises / Services           (à construire)
//   /projets            Projets / Références            (à construire)
//   /equipe             Équipe / Contacts clés          (à construire)
//   /actualites         Actualités (Instagram)          (à construire)
//   /contact            Coordonnées + formulaire
//   /mentions-legales   Mentions légales
//   /cookies            Cookies
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="a-propos" element={<About />} />
        <Route path="expertises" element={<Expertises />} />
        <Route path="projets" element={<Projects />} />
        <Route path="equipe" element={<Navigate to="/a-propos#equipe" replace />} />
        <Route path="actualites" element={<ComingSoon section="news" />} />
        <Route path="contact" element={<Contact />} />
        <Route path="mentions-legales" element={<Legal />} />
        <Route path="cookies" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}