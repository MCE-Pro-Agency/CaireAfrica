import { useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MenuModal from '../components/sections/MenuModal'
import PageHero from '../components/ui/PageHero'
import { getMenu, menus } from '../data/menus'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function Menu() {
  const { t, pick } = useLanguage()
  const { slug } = useParams()
  const navigate = useNavigate()
  const active = slug ? getMenu(slug) : null

  usePageMeta(active ? `${active.name} — Chef Kara` : t('menu.title'), active ? pick(active.tagline) : t('menu.description'))

  const close = useCallback(() => navigate('/menu', { preventScrollReset: true }), [navigate])

  return (
    <>
      <PageHero eyebrow={t('menu.eyebrow')} heading={t('menu.heading')} intro={t('menu.intro')} />

      <section className="pb-20">
        <div className="container-x">
          <ul className="grid gap-px border border-ivory/10 bg-ivory/10 md:grid-cols-2">
            {menus.map((menu, i) => (
              <li key={menu.slug} className="bg-ink">
                <Link to={`/menu/${menu.slug}`} className="group flex h-full flex-col p-8 transition-colors hover:bg-coal md:p-10">
                  <span className="font-serif text-4xl text-ivory/25">{String(i + 1).padStart(2, '0')}</span>
                  <span className="eyebrow mt-6">{t(`menu.types.${menu.type}`)}</span>
                  <span className="mt-3 font-serif text-3xl leading-tight">{menu.name}</span>
                  <span className="mt-3 flex-1 text-sm leading-relaxed text-ivory/65">{pick(menu.tagline)}</span>
                  <span className="mt-8 text-[11px] uppercase tracking-[0.2em] text-ivory/60 transition-colors group-hover:text-ivory">
                    {t('menu.discover')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Menu sur mesure */}
      <section className="section border-t border-ivory/10">
        <div className="container-x max-w-3xl text-center">
          <p className="eyebrow">{t('menu.customEyebrow')}</p>
          <h2 className="mt-5 text-4xl md:text-6xl">{t('menu.customHeading')}</h2>
          <p className="body-text mt-6">{t('menu.customText')}</p>
          <Link to="/contact?menu=sur-mesure" className="btn-solid mt-10">
            {t('cta.bookMenu')}
          </Link>
          <p className="mt-12 text-sm text-ivory/50">{t('menu.note')}</p>
        </div>
      </section>

      {active && <MenuModal menu={active} onClose={close} />}
    </>
  )
}
