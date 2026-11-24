import { Link } from 'react-router-dom'
import { navigation, site } from '../../data/site'
import { useLanguage } from '../../i18n/LanguageContext'
import Logo from '../ui/Logo'

// Pied de page : fond jaune très clair, texte noir, bande tricolore du logo en haut
export default function Footer() {
  const { t } = useLanguage()
  const socials = site.socials.filter((s) => s.href)

  return (
    <footer className="theme-yellow-light">
      {/* Bande tricolore du logo */}
      <div aria-hidden="true" className="flex h-1.5">
        <span className="flex-1 bg-brand-red" />
        <span className="flex-1 bg-brand-yellow" />
        <span className="flex-1 bg-brand-green" />
      </div>

      <div className="container-x py-16">
        {socials.length > 0 && (
          <div className="flex flex-col items-center gap-5 border-b border-ink/10 pb-12 text-center">
            <p className="eyebrow">{t('footer.find')}</p>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-10 pt-12 md:grid-cols-3">
          <div>
            {/* Logo complet en version texte noir, lisible sur fond clair */}
            <Link to="/" aria-label="CAIREAFRICA — Architecture Ingénierie" className="inline-flex items-center gap-3">
              <Logo variant="mark" className="h-12 w-auto" />
              <span className="flex flex-col leading-none text-ink">
                <span className="text-xl font-bold tracking-[0.12em]">CAIREAFRICA</span>
                <span className="mt-1.5 text-[10px] tracking-[0.25em]">ARCHITECTURE INGÉNIERIE</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm text-ink/60">{t('footer.baseline')}</p>
          </div>

          <ul className="grid grid-cols-2 gap-3 text-sm text-ink/75">
            {navigation.map((item) => (
              <li key={item.key}>
                <Link to={item.to} className="transition-colors hover:text-brand-red">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="transition-colors hover:text-brand-red">
                {t('nav.contact')}
              </Link>
            </li>
          </ul>

          <ul className="space-y-3 text-sm text-ink/75 md:text-right">
            <li>{site.address}</li>
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-brand-red">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand-red">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-xs text-ink/50">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="transition-colors hover:text-brand-red">
              {t('footer.legal')}
            </Link>
            <Link to="/cookies" className="transition-colors hover:text-brand-red">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}