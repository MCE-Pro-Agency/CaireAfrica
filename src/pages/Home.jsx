import { Link } from 'react-router-dom'
import CtaBand from '../components/sections/CtaBand'
import Testimonials from '../components/sections/Testimonials'
import Logo from '../components/ui/Logo'
import Media from '../components/ui/Media'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  usePageMeta(t('home.title'), t('home.description'))

  return (
    <>
      {/* 1. Bandeau principal */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <Media src="/images/hero.jpg" alt="" eager className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/40 to-ink" />
        <div className="container-x relative text-center">
          <Logo className="mx-auto h-20 w-20 animate-fadeUp" />
          <h1 className="mt-8 animate-fadeUp text-5xl tracking-[0.25em] sm:text-6xl md:text-8xl">CHEF KARA</h1>
          <ul className="mt-8 flex animate-fadeUp flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row text-[11px] uppercase tracking-[0.3em]">
            {t('home.heroTags').map((tag, i) => (
              <li key={tag} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="hidden text-ivory/40 sm:inline">|</span>}
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Promesse */}
      <section className="section">
        <div className="container-x max-w-4xl text-center">
          <p className="lead">{t('home.introLead')}</p>
          <p className="body-text mt-6">{t('home.introText')}</p>
          <Link to="/menu" className="btn-ghost mt-10">
            {t('cta.discoverMenu')}
          </Link>
        </div>
      </section>

      {/* 3. Le chef en deux phrases */}
      <section className="section border-t border-ivory/10">
        <div className="container-x grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <Media src="/images/chef/portrait.jpg" alt="Chef Kara" className="aspect-[4/5] w-full" />
          <div>
            <p className="eyebrow">Chef Kara</p>
            <p className="lead mt-6">{t('home.storyLead')}</p>
            <p className="body-text mt-6">{t('home.storyText')}</p>
            <Link to="/chef" className="link-line mt-10 inline-block">
              {t('home.storyLink')}
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Preuve sociale */}
      <Testimonials />

      {/* 5. Appel à l'action */}
      <CtaBand title={t('home.ctaTitle')} text={t('home.ctaText')} secondary={{ to: '/menu', label: t('cta.seeMenu') }} />

      {/* 6. Portes d'entrée vers les pages */}
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
