import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation } from '../../data/site'
import { useLanguage } from '../../i18n/LanguageContext'
import Logo from '../ui/Logo'

// En-tête : fond jaune très clair (version claire du jaune du logo), texte noir
export default function Header() {
  const { t, lang, toggle } = useLanguage()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ferme le menu mobile à chaque navigation
  useEffect(() => setOpen(false), [pathname])

  // Bloque le défilement de la page quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Lien actif souligné en rouge logo
  const linkClass = ({ isActive }) =>
    `whitespace-nowrap border-b-2 pb-1 text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-ink ${
      isActive ? 'border-brand-red text-ink' : 'border-transparent text-ink/70'
    }`

  return (
    <header
      className={`theme-yellow-light fixed inset-x-0 top-0 z-40 transition-shadow duration-300 ${
        scrolled || open ? 'shadow-md' : ''
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between gap-6 px-6 md:px-10">
        <Link to="/" aria-label={t('nav.homeAria')} className="flex shrink-0 items-center gap-3 whitespace-nowrap">
          <Logo variant="mark" className="h-9 w-auto" />
          <span className="text-base font-medium tracking-[0.18em] text-ink">CAIREAFRICA</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-7" aria-label="Navigation principale">
          {navigation.map((item) => (
            <NavLink key={item.key} to={item.to} end={item.to === '/'} className={linkClass}>
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={t('nav.switchLang')}
            className="border border-ink/30 px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-ink"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link to="/contact" className="btn-solid hidden whitespace-nowrap xl:inline-flex">
            {t('cta.contact')}
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? t('nav.close') : t('nav.open')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px w-6 bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px w-6 bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="h-[calc(100vh-72px)] overflow-y-auto border-t border-ink/10 bg-yellow-light lg:hidden"
          aria-label="Navigation mobile"
        >
          <div className="container-x flex flex-col gap-6 py-10">
            {navigation.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `font-serif text-3xl ${isActive ? 'text-brand-red' : 'text-ink/70'}`}
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-solid mt-4 self-start">
              {t('cta.contact')}
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}