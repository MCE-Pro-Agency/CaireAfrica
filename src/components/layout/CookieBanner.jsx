import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

export default function CookieBanner() {
  const { t, consent, setConsent } = useLanguage()
  if (consent) return null

  return (
    <div
      role="region"
      aria-label="Cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ivory/10 bg-ink/95 backdrop-blur"
    >
      <div className="container-x flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-xs leading-relaxed text-ivory/75">
          {t('cookies.banner')}{' '}
          <Link to="/cookies" className="underline underline-offset-4 hover:text-ivory">
            {t('cookies.more')}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" className="btn-ghost !px-4 !py-2.5" onClick={() => setConsent('refused')}>
            {t('cookies.refuse')}
          </button>
          <button type="button" className="btn-solid !px-4 !py-2.5" onClick={() => setConsent('accepted')}>
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
