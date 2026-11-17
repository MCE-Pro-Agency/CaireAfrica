import { Link } from 'react-router-dom'
import CtaBand from '../components/sections/CtaBand'
import BrandBar from '../components/ui/BrandBar'
import Logo from '../components/ui/Logo'
import Media from '../components/ui/Media'
import { expertises } from '../data/expertises'
import { projects } from '../data/projects'
import { site } from '../data/site'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

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

      {/* 3. Qui sommes-nous */}
      <section className="section border-t border-ivory/10">
        <div className="container-x grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Media src="/images/societe.jpeg" alt={t('home.aboutImageAlt')} className="aspect-[4/3] w-full" />
          <div>
            <p className="eyebrow">{t('home.aboutEyebrow')}</p>
            <p className="lead mt-6">{t('home.aboutLead')}</p>
            <p className="body-text mt-6">{t('home.aboutText')}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/a-propos" className="link-line">
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
      <section className="section border-y border-ivory/10">
        <div className="container-x">
          <p className="eyebrow">{t('home.figuresEyebrow')}</p>
          <p className="lead mt-5 max-w-3xl">{t('home.figuresLead')}</p>
          <dl className="mt-12 grid grid-cols-2 gap-px border border-ivory/10 bg-ivory/10 lg:grid-cols-4">
            {t('home.figures').map((figure) => (
              <div key={figure.label} className="flex flex-col-reverse bg-ink px-4 py-10 text-center">
                <dt className="eyebrow mt-3">{figure.label}</dt>
                <dd className="font-serif text-4xl md:text-6xl">{figure.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-ivory/50">{t('home.figuresNote')}</p>
        </div>
      </section>

      {/* 5. Expertises */}
      <section id="expertises" className="section scroll-mt-16">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-2 md:gap-20">
            <div>
              <p className="eyebrow">{t('home.expertiseEyebrow')}</p>
              <h2 className="mt-5 text-4xl leading-tight md:text-5xl">{t('home.expertiseHeading')}</h2>
            </div>
            <p className="body-text md:pt-10">{t('home.expertiseText')}</p>
          </div>
          <ol className="mt-12 grid gap-px border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
            {expertises.map((item, i) => (
              <li key={item.key} className="bg-ink p-8">
                <span className="font-serif text-2xl text-ivory/30">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-2xl">{pick(item.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/65">{pick(item.text)}</p>
              </li>
            ))}
          </ol>
          <Link to="/expertises" className="link-line mt-10 inline-block">
            {t('home.expertiseLink')}
          </Link>
        </div>
      </section>

      {/* 6. Projets */}
      <section id="projets" className="section scroll-mt-16 border-t border-ivory/10">
        <div className="container-x">
          <p className="eyebrow">{t('home.projectsEyebrow')}</p>
          <h2 className="mt-5 max-w-3xl text-4xl leading-tight md:text-5xl">{t('home.projectsHeading')}</h2>
          <p className="body-text mt-6 max-w-2xl">{t('home.projectsText')}</p>
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <figure>
                  <div className="group overflow-hidden">
                    <Media
                      src={project.image}
                      alt={project.name}
                      className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-5">
                    <p className="eyebrow">
                      {[pick(project.sector), project.year, project.status && t(`projects.status.${project.status}`)]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                    <p className="mt-2 font-serif text-2xl leading-tight">{project.name}</p>
                    <p className="mt-1 text-sm text-ivory/60">
                      {project.city}, {pick(project.country)}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ivory/65">{pick(project.summary)}</p>
                    {project.credit && (
                      <p className="mt-2 text-xs text-ivory/40">
                        {t('projects.creditPrefix')} {project.credit}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <Link to="/projets" className="btn-ghost mt-12">
            {t('home.projectsLink')}
          </Link>
        </div>
      </section>

      {/* 7. Appel à l'action */}
      <div className="border-t border-ivory/10">
        <CtaBand title={t('home.ctaTitle')} text={t('home.ctaText')} />
      </div>

      {/* 8. Portes d'entrée vers les pages */}
      <section className="pb-24">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {t('home.links').map((item) => (
            <Link key={item.to} to={item.to} className="group relative block overflow-hidden">
              <Media src={item.image} alt="" className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 to-transparent p-6">
                <p className="eyebrow">{item.label}</p>
                <p className="mt-2 font-serif text-3xl">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}