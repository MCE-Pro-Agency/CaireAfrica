import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

// Page provisoire pour les rubriques du cahier des charges qui restent à construire.
// section = clé de navigation : about | expertise | projects | team | news
export default function ComingSoon({ section }) {
  const { t } = useLanguage()
  const name = t(`nav.${section}`)
  usePageMeta(`${name} — CAIREAFRICA`)

  return (
    <section className="flex min-h-[80vh] items-center">
      <div className="container-x pt-24 text-center">
        <p className="eyebrow">{t('comingSoon.eyebrow')}</p>
        <h1 className="mt-5 text-5xl md:text-7xl">{name}</h1>
        <p className="body-text mx-auto mt-6 max-w-xl">{t('comingSoon.text')}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-solid">
            {t('cta.contact')}
          </Link>
          <Link to="/" className="btn-ghost">
            {t('comingSoon.back')}
          </Link>
        </div>
      </div>
    </section>
  )
}