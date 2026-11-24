import { Link } from 'react-router-dom'
import ProjectCarousel from '../components/sections/ProjectCarousel'
import BrandBar from '../components/ui/BrandBar'
import Logo from '../components/ui/Logo'
import Media from '../components/ui/Media'
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

// Section « Qui sommes-nous » : texte de présentation (FR / EN)
const about = {
  eyebrow: { fr: 'Qui sommes-nous', en: 'Who we are' },
  titleStart: { fr: 'Nous concevons aujourd’hui', en: 'Today, we design' },
  titleEnd: { fr: 'la forme de demain.', en: 'the shape of tomorrow.' },
  blocks: [
    {
      color: 'bg-brand-red',
      title: { fr: 'Savoir-faire italien, racines locales.', en: 'Italian expertise, local roots.' },
      text: {
        fr: 'Nous sommes une société sénégalaise basée à Dakar, entièrement contrôlée par la maison mère italienne CAIREPRO. Depuis plusieurs années, nous opérons au Sénégal et en Afrique de l’Ouest, alliant l’excellence conceptuelle d’une réalité historique forte de plus de 78 ans d’expérience aux dynamiques et à la connaissance approfondie du marché local.',
        en: 'We are a Senegalese company based in Dakar, wholly owned by the Italian parent company CAIREPRO. For several years we have been working in Senegal and West Africa, combining the design excellence of a firm with more than 78 years of experience with an in-depth knowledge of the local market and its dynamics.',
      },
    },
    {
      color: 'bg-brand-yellow',
      title: { fr: 'De l’idée au chantier : des projets à notre actif.', en: 'From idea to site: a proven track record.' },
      text: {
        fr: 'Avec de nombreuses interventions réalisées et en cours, nous gérons l’ensemble du cycle : du concept à la direction des travaux. Plus de 50 professionnels intègrent des compétences diverses autour d’une méthode partagée, garantissant un contrôle technique et économique total ainsi que des normes de qualité élevées.',
        en: 'With many projects completed and under way, we manage the whole cycle, from concept to works supervision. More than 50 professionals bring together diverse skills around a shared method, ensuring full technical and financial control and high quality standards.',
      },
    },
    {
      color: 'bg-brand-green',
      title: { fr: 'Une filière de compétences intégrées.', en: 'An integrated chain of expertise.' },
      text: {
        fr: 'Faire partie d’une réalité née en 1947 nous permet de nous positionner comme un interlocuteur unique. Nous traduisons la culture du projet en réalisations concrètes, en associant un patrimoine inestimable à la capacité opérationnelle sur le terrain pour donner forme au développement de demain.',
        en: 'Being part of a firm founded in 1947 allows us to act as a single point of contact. We turn design culture into concrete achievements, combining an invaluable heritage with operational capacity on the ground to shape tomorrow’s development.',
      },
    },
  ],
}

export default function Home() {
  const { t, pick } = useLanguage()
  usePageMeta(t('home.title'), t('home.description'))

  return (
    <>
      {/* 1. Bandeau principal */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <Media src="/images/hero.jpg" alt="" eager className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        <div className="container-x relative text-center">
          <Logo variant="mark" className="mx-auto h-24 w-auto animate-fadeUp" />
          <h1 className="mt-8 animate-fadeUp text-4xl tracking-[0.15em] sm:text-6xl sm:tracking-[0.2em] md:text-7xl lg:text-8xl">
            CAIREAFRICA
          </h1>
          <ul className="mt-8 flex animate-fadeUp flex-col items-center justify-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.3em] sm:flex-row">
            {t('home.heroTags').map((tag, i) => (
              <li key={tag} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="hidden text-ivory/40 sm:inline">|</span>}
                {tag}
              </li>
            ))}
          </ul>
          <BrandBar className="mx-auto mt-10 animate-fadeUp" />
          <p className="lead mx-auto mt-8 max-w-2xl animate-fadeUp italic">{t('home.heroTagline')}</p>
        </div>
      </section>

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

      {/* 3. Qui sommes-nous : photo de l'équipe en fond, texte à gauche */}
            {/* 3. Qui sommes-nous : photo de l'équipe en fond, texte à gauche */}
            {/* 3. Qui sommes-nous : photo de l'équipe en fond, texte à gauche */}
      <section className="relative overflow-hidden border-t border-ivory/10 md:flex md:min-h-[56.3vw] md:items-center">
        {/* Mobile : la photo au-dessus du texte */}
        <img
          src="/images/qui-sommes-nous.png"
          alt={t('home.aboutImageAlt')}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover object-right md:hidden"
        />
        {/* Ordinateur : la photo entière en fond, calée à droite pour garder tous les visages */}
        <img
          src="/images/qui-sommes-nous.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 hidden h-full w-full object-cover object-right md:block"
        />

        {/* Texte à gauche */}
        <div className="relative w-full px-6 py-20 md:px-16 md:py-24 lg:px-28 xl:px-40">
          <div className="max-w-xl md:max-w-[46%] lg:max-w-[600px]">
            <p className="eyebrow text-brand-yellow">{pick(about.eyebrow)}</p>
            <h2 className="mt-5 text-4xl leading-[1.1] md:text-5xl">
              {pick(about.titleStart)}
              <br />
              <span className="text-brand-yellow">{pick(about.titleEnd)}</span>
            </h2>
            <BrandBar className="mt-8" />

            <p className="mt-8 text-sm uppercase tracking-[0.2em] text-ivory/70">
              <span className="font-bold text-ivory">CAIREAFRICA</span> · {pick({ fr: 'Groupe CAIREPRO · Dakar', en: 'CAIREPRO Group · Dakar' })}
            </p>

            <div className="mt-10 space-y-10">
              {about.blocks.map((block) => (
                <div key={block.color} className="flex gap-5">
                  <span aria-hidden="true" className={`mt-1.5 h-12 w-1 shrink-0 ${block.color}`} />
                  <div>
                    <h3 className="text-2xl font-bold leading-snug text-ivory">{pick(block.title)}</h3>
                    <p className="mt-3 text-base leading-relaxed text-ivory/90 md:text-[17px] lg:text-lg">{pick(block.text)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
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
          <p className="eyebrow text-brand-yellow">{t('home.figuresEyebrow')}</p>
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
          <div className="grid gap-8 md:grid-cols-2 md:gap-20">
            <div>
              <p className="eyebrow">{t('home.expertiseEyebrow')}</p>
              <h2 className="mt-5 text-4xl leading-tight md:text-5xl">{t('home.expertiseHeading')}</h2>
            </div>
            <p className="body-text md:pt-10">{t('home.expertiseText')}</p>
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
          <p className="eyebrow text-brand-yellow">{t('home.projectsEyebrow')}</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl leading-tight md:text-5xl">{t('home.projectsHeading')}</h2>
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

      {/* 7. Portes d'entrée vers les pages */}
      <section className="theme-light py-24">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {t('home.links').map((item) => (
            <Link key={item.to} to={item.to} className="group relative block overflow-hidden">
              <Media src={item.image} alt="" className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 to-transparent p-6">
                <p className="eyebrow !text-brand-yellow">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-ivory">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}