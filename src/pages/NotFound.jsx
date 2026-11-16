import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()
  usePageMeta(t('notFound.title'))

  return (
    <section className="flex min-h-[80vh] items-center">
      <div className="container-x text-center">
        <p className="font-serif text-7xl text-ivory/20">404</p>
        <h1 className="mt-4 text-4xl md:text-6xl">{t('notFound.heading')}</h1>
        <p className="body-text mt-5">{t('notFound.text')}</p>
        <Link to="/" className="btn-solid mt-10">
          {t('notFound.back')}
        </Link>
      </div>
    </section>
  )
}
