import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import CookieBanner from './CookieBanner'

// Remonte en haut à chaque changement de page, ou va à l'ancre (#domicile…).
// Le détail d'un menu (/menu/:slug) s'ouvre par-dessus la liste : pas de saut.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  const section = pathname.startsWith('/menu') ? '/menu' : pathname

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [section, hash])

  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </div>
  )
}
