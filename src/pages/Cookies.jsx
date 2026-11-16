import PageHero from '../components/ui/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function Cookies() {
  const { t } = useLanguage()
  usePageMeta(t('cookies.title'))

  return (
    <>
      <PageHero heading={t('cookies.heading')} />
      <section className="pb-24">
        <div className="container-x max-w-3xl space-y-5">
          {t('cookies.paragraphs').map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="body-text">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </>
  )
}
