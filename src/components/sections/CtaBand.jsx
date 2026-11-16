import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'

// Appel à l'action de fin de page.
export default function CtaBand({ title, text, secondary }) {
  const { t } = useLanguage()

  return (
    <section className="section">
      <div className="container-x text-center">
        <h2 className="mx-auto max-w-3xl text-4xl leading-tight md:text-6xl">{title}</h2>
        {text && <p className="body-text mx-auto mt-6 max-w-xl">{text}</p>}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-solid">
            {t('cta.project')}
          </Link>
          {secondary && (
            <Link to={secondary.to} className="btn-ghost">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
