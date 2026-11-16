import { Link } from 'react-router-dom'
import CtaBand from '../components/sections/CtaBand'
import Media from '../components/ui/Media'
import PageHero from '../components/ui/PageHero'
import { featuredMenus } from '../data/menus'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function Prestations() {
  const { t, pick } = useLanguage()
  usePageMeta(t('services.title'), t('services.description'))
  const chapters = t('services.chapters')

  return (
    <>
      <PageHero eyebrow={t('services.eyebrow')} heading={t('services.heading')} intro={t('services.intro')} image="/images/prestations/hero.jpg">
        {/* Sommaire des trois chapitres */}
        <nav className="mt-12 flex flex-wrap gap-x-10 gap-y-4" aria-label={t('services.eyebrow')}>
          {chapters.map((chapter, i) => (
            <a key={chapter.id} href={`#${chapter.id}`} className="group flex items-baseline gap-3">
              <span className="font-serif text-2xl text-ivory/50 transition-colors group-hover:text-ivory">0{i + 1}</span>
              <span className="link-line">{chapter.short}</span>
            </a>
          ))}
        </nav>
      </PageHero>

      {chapters.map((chapter, i) => (
        <article key={chapter.id} id={chapter.id} className="section scroll-mt-16 border-t border-ivory/10">
          <div className="container-x grid gap-12 md:grid-cols-2 md:gap-20">
            <div className={i % 2 ? 'md:order-2' : ''}>
              <Media src={chapter.image} alt={chapter.heading} className="aspect-[4/3] w-full md:sticky md:top-28" />
            </div>
            <div>
              <p className="font-serif text-6xl text-ivory/20">0{i + 1}</p>
              <p className="eyebrow mt-4">
                {t('services.chapterWord')} 0{i + 1} — {chapter.short}
              </p>
              <h2 className="mt-5 text-4xl leading-tight md:text-5xl">{chapter.heading}</h2>
              <p className="body-text mt-6">{chapter.text}</p>

              {chapter.showMenus ? (
                <div className="mt-10">
                  <p className="eyebrow">{t('services.formulas')}</p>
                  <ul className="mt-4 divide-y divide-ivory/10 border-y border-ivory/10">
                    {featuredMenus.map((menu) => (
                      <li key={menu.slug}>
                        <Link to={`/menu/${menu.slug}`} className="group block py-5">
                          <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                            <span className="font-serif text-2xl">{menu.name}</span>
                            <span className="text-[11px] uppercase tracking-[0.2em] text-ivory/60 transition-colors group-hover:text-ivory">
                              {t('services.seeThisMenu')}
                            </span>
                          </span>
                          <span className="mt-2 block text-sm text-ivory/60">{pick(menu.tagline)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-ivory/50">{t('services.formulasNote')}</p>
                </div>
              ) : (
                <div className="mt-10 border-y border-ivory/10 py-5">
                  <p className="eyebrow">{t('services.bespoke')}</p>
                  <p className="mt-2 font-serif text-2xl">{chapter.price}</p>
                </div>
              )}

              <Link to="/contact" className="btn-solid mt-10">
                {t('cta.project')}
              </Link>
            </div>
          </div>
        </article>
      ))}

      <div className="border-t border-ivory/10">
        <CtaBand title={t('services.closing')} />
      </div>
    </>
  )
}
