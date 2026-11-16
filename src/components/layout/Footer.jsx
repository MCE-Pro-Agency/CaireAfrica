import { Link } from 'react-router-dom'
import { navigation, site } from '../../data/site'
import { useLanguage } from '../../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-ivory/10 bg-ink">
      <div className="container-x py-16">
        <div className="flex flex-col items-center gap-5 border-b border-ivory/10 pb-12 text-center">
          <p className="eyebrow">{t('footer.find')}</p>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-10 pt-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl tracking-[0.3em]">CHEF KARA</p>
            <p className="mt-3 text-sm text-ivory/60">{t('footer.baseline')}</p>
          </div>

          <ul className="grid grid-cols-2 gap-3 text-sm text-ivory/75">
            {navigation.map((item) => (
              <li key={item.key}>
                <Link to={item.to} className="transition-colors hover:text-ivory">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="space-y-3 text-sm text-ivory/75 md:text-right">
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-ivory">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-ivory">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ivory">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-xs text-ivory/40">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="transition-colors hover:text-ivory">
              {t('footer.legal')}
            </Link>
            <Link to="/cookies" className="transition-colors hover:text-ivory">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
