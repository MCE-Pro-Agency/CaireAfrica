import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import CookieBanner from './CookieBanner'

// Remonte en haut à chaque changement de page, ou va à l'ancre (#expertises…).
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Les images au-dessus de la section se chargent après coup et la décalent :
    // on se recale plusieurs fois, sauf si le visiteur a commencé à défiler lui-même.
    let userMoved = false
    const stop = () => (userMoved = true)
    const go = () => !userMoved && document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
    go()
    const timers = [150, 500, 1000, 1800].map((ms) => setTimeout(go, ms))
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchmove', stop, { passive: true })
    window.addEventListener('keydown', stop)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchmove', stop)
      window.removeEventListener('keydown', stop)
    }
  }, [pathname, hash])

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