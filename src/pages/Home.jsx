import { Link } from 'react-router-dom'
import Hero3D from '../components/sections/Hero3D'
import ProjectCarousel from '../components/sections/ProjectCarousel'
import WhyUs from '../components/sections/WhyUs'
import BrandBar from '../components/ui/BrandBar'
import { about } from '../data/about'
import { expertises } from '../data/expertises'
import { projects } from '../data/projects'
import { site } from '../data/site'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

// Les cartes d'expertise reprennent les 3 couleurs du logo, à tour de rôle
const accents = [
  { border: 'border-t-brand-red', num: 'text-brand-red' },
  { border: 'border-t-brand-yellow', num: 'text-clay' },
  { border: 'border-t-brand-green', num: 'text-brand-green' },
]

// Section « Qui sommes-nous » : texte dans src/data/about.js (partagé avec la page À propos)

export default function Home() {
  const { t, pick } = useLanguage()
  usePageMeta(t('home.title'), t('home.description'))

  return (
    <>
      {/* 1. Bandeau principal : construction 3D au scroll */}
      <Hero3D />

      {/* 2. Promesse */}
      <section className="section">
        <div className="container-x max-w-4xl text-center">
          <p className="lead">{t('home.introLead')}</p>
          <p className="body-text mt-6">{t('home.introText')}</p>
          <Link to="/expertises" className="btn-ghost mt-10">
            {t('home.introCta')}
          </Link>
        </div>
      </section>

      {/* 3. Qui sommes-nous : la photo qui-sommes-nous.png en arrière-plan, texte à gauche */}
      <section
        id="a-propos"
        className="relative scroll-mt-[72px] overflow-hidden border-t border-ivory/10 md:flex md:min-h-[56.3vw] md:items-center"
      >
        {/* Mobile : la photo au-dessus du texte */}
        <img
          src="/images/qui-sommes-nous.png"
          alt={t('home.aboutImageAlt')}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover object-right md:hidden"
        />
        {/* Ordinateur : la photo en arrière-plan de toute la section, calée à droite */}
        <img
          src="/images/qui-sommes-nous.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 hidden h-full w-full object-cover object-right md:block"
        />

        {/* Texte à gauche */}
        <div className="relative w-full px-6 py-14 md:px-[4vw] md:py-[4vw] xl:px-[6vw]">
          <div className="max-w-xl md:max-w-[35vw] xl:max-w-[31vw]">
            <h2 className="text-4xl leading-[1.1] md:text-[3.2vw]">
              {pick(about.titleStart)}
              <br />
              <span className="text-brand-yellow">{pick(about.titleEnd)}</span>
            </h2>
            <BrandBar className="mt-6" />

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-ivory/70">
              <span className="font-bold text-ivory">CAIREAFRICA</span> · {pick({ fr: 'Groupe CAIREPRO · Dakar', en: 'CAIREPRO Group · Dakar' })}
            </p>

            <div className="mt-8 space-y-7">
              {about.blocks.map((block) => (
                <div key={block.color} className="flex gap-5">
                  <span aria-hidden="true" className={`mt-1 h-10 w-1 shrink-0 ${block.color}`} />
                  <div>
                    <h3 className="text-xl font-bold leading-snug text-ivory xl:text-2xl">{pick(block.title)}</h3>
                    {block.text.map((para, k) => (
                      <p key={k} className="mt-2 text-[15px] leading-relaxed text-ivory/90 xl:text-base">
                        {pick(para)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/a-propos" className="btn-ghost">
                {t('home.aboutLink')}
              </Link>
              <a href={site.parent.href} target="_blank" rel="noopener noreferrer" className="link-line">
                cairepro.it →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Chiffres clés */}
      <section className="section bg-forest">
        <div className="container-x">
          <p className="lead mt-5 max-w-3xl">{t('home.figuresLead')}</p>
          <dl className="mt-12 grid grid-cols-2 gap-px border border-ivory/15 bg-ivory/15 lg:grid-cols-4">
            {t('home.figures').map((figure) => (
              <div key={figure.label} className="flex flex-col-reverse bg-forest px-4 py-10 text-center">
                <dt className="eyebrow mt-3">{figure.label}</dt>
                <dd className="text-4xl font-bold text-brand-yellow md:text-6xl">{figure.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-ivory/60">{t('home.figuresNote')}</p>
        </div>
      </section>

      {/* 5. Expertises */}
      <section id="expertises" className="section theme-light scroll-mt-16">
        <div className="container-x">
          <div className="text-center">
            <h2 className="section-title">{t('home.expertiseHeading')}</h2>
            <p className="body-text mx-auto mt-6 max-w-3xl">{t('home.expertiseText')}</p>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expertises.map((item, i) => {
              const a = accents[i % accents.length]
              return (
                <li key={item.key} className={`border-t-4 bg-white p-8 shadow-sm transition-shadow hover:shadow-md ${a.border}`}>
                  <span className={`text-2xl font-bold ${a.num}`}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-2xl text-ink">{pick(item.title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{pick(item.text)}</p>
                </li>
              )
            })}
          </ol>
          <Link to="/expertises" className="link-line mt-10 inline-block">
            {t('home.expertiseLink')}
          </Link>
        </div>
      </section>

      {/* 6. Projets : fond noir, carrousel 3D de cartes claires */}
      <section id="projets" className="section scroll-mt-16 overflow-hidden">
        <div className="container-x text-center">
          <h2 className="section-title">{t('home.projectsHeading')}</h2>
          <p className="body-text mx-auto mt-6 max-w-2xl">{t('home.projectsText')}</p>
        </div>

        {/* Pleine largeur, pour voir les cartes latérales */}
        <ProjectCarousel items={projects} />

        <div className="container-x mt-12 text-center">
          <Link to="/projets" className="btn-ghost">
            {t('home.projectsLink')}
          </Link>
        </div>
      </section>

      {/* 7. Pourquoi nous faire confiance ? (l'équipe est sur la page À propos) */}
      <WhyUs />
    </>
  )
}