import PageHero from '../components/ui/PageHero'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

// Les champs entre crochets dans src/i18n/*.js (legal.sections) sont à compléter
// avec les informations légales réelles avant la mise en ligne.
export default function Legal() {
  const { t } = useLanguage()
  usePageMeta(t('legal.title'))

  return (
    <>
      <PageHero heading={t('legal.heading')} />
      <section className="pb-24">
        <div className="container-x max-w-3xl space-y-12">
          {t('legal.sections').map((section) => (
            <div key={section.title}>
              <h2 className="text-3xl">{section.title}</h2>
              {section.lines.map((line) => (
                <p key={line} className="body-text mt-3">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
