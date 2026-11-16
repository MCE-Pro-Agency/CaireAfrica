import CtaBand from '../components/sections/CtaBand'
import Testimonials from '../components/sections/Testimonials'
import Media from '../components/ui/Media'
import PageHero from '../components/ui/PageHero'
import { site } from '../data/site'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function Chef() {
  const { t } = useLanguage()
  usePageMeta(t('chef.title'), t('chef.description'))

  return (
    <>
      <PageHero eyebrow={t('chef.eyebrow')} heading={t('chef.heading')}>
        <p className="mt-10 font-serif text-3xl">Kara</p>
        <p className="eyebrow mt-2">{t('chef.role')}</p>
      </PageHero>

      {/* Chiffres clés */}
      <section className="border-y border-ivory/10">
        <dl className="container-x grid grid-cols-3 divide-x divide-ivory/10">
          {t('chef.stats').map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse px-2 py-10 text-center">
              <dt className="eyebrow mt-3">{stat.label}</dt>
              <dd className="font-serif text-3xl md:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* L'histoire */}
      <section className="section">
        <div className="container-x grid gap-12 md:grid-cols-2 md:gap-20">
          <Media src="/images/chef/portrait.jpg" alt="Chef Kara" className="aspect-[4/5] w-full" />
          <div>
            <p className="eyebrow">{t('chef.storyEyebrow')}</p>
            {t('chef.story').map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="body-text mt-6">
                {paragraph}
              </p>
            ))}
            <figure className="mt-12 border-l border-ivory/30 pl-6">
              <blockquote className="lead italic">{t('chef.quote')}</blockquote>
              <figcaption className="eyebrow mt-4">— Kara</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Reconnaissances */}
      <section className="section border-t border-ivory/10">
        <div className="container-x">
          <p className="eyebrow">{t('chef.awardsEyebrow')}</p>
          <h2 className="mt-5 text-4xl md:text-5xl">{t('chef.awardsHeading')}</h2>
          <ul className="mt-12 grid gap-px border border-ivory/10 bg-ivory/10 md:grid-cols-3">
            {t('chef.awards').map((award) => (
              <li key={award.title} className="bg-ink p-8">
                <p className="font-serif text-2xl">{award.title}</p>
                {award.detail && <p className="mt-2 text-sm text-ivory/60">{award.detail}</p>}
                <p className="eyebrow mt-6">{award.source}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials eyebrow={t('chef.reviewsEyebrow')} />

      {/* Valeurs */}
      <section className="section">
        <div className="container-x">
          <p className="eyebrow">{t('chef.valuesEyebrow')}</p>
          <ol className="mt-12 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {t('chef.values').map((value, i) => (
              <li key={value.title} className="border-t border-ivory/10 pt-6">
                <span className="font-serif text-2xl text-ivory/30">0{i + 1}</span>
                <h3 className="mt-3 text-3xl">{value.title}</h3>
                <p className="body-text mt-3">{value.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Villes */}
      <section className="section border-t border-ivory/10">
        <div className="container-x text-center">
          <p className="eyebrow">{t('chef.citiesEyebrow')}</p>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 font-serif text-3xl md:text-5xl">
            {site.cities.map((city) => (
              <li key={city}>{city}</li>
            ))}
            <li className="italic text-ivory/50">{t('chef.citiesMore')}</li>
          </ul>
          <p className="body-text mt-10">{t('chef.citiesText')}</p>
        </div>
      </section>

      <div className="border-t border-ivory/10">
        <CtaBand title={t('home.ctaTitle')} text={t('home.ctaText')} secondary={{ to: '/menu', label: t('cta.seeMenu') }} />
      </div>
    </>
  )
}
