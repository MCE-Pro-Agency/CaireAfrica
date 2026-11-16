import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { menus } from '../../data/menus'
import { useLanguage } from '../../i18n/LanguageContext'

// Détail d'une carte, affiché par-dessus la liste. Piloté par l'URL (/menu/:slug).
export default function MenuModal({ menu, onClose }) {
  const { t, pick } = useLanguage()
  const closeRef = useRef(null)
  const number = String(menus.indexOf(menu) + 1).padStart(2, '0')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-modal-title"
        className="relative h-full w-full max-w-2xl overflow-y-auto bg-coal px-6 py-10 md:px-12 md:py-14"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t('menu.close')}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-ivory/20 text-lg transition-colors hover:border-ivory"
        >
          ✕
        </button>

        <p className="eyebrow">
          {t('menu.eyebrow')} · {number}
        </p>
        <h2 id="menu-modal-title" className="mt-4 pr-10 text-4xl leading-tight md:text-5xl">
          {menu.name}
        </h2>
        <p className="body-text mt-4">{pick(menu.tagline)}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-ivory/60">
          <span>{t(`menu.types.${menu.type}`)}</span>
          <span>{t('menu.price')}</span>
        </div>

        <div className="mt-10 space-y-10">
          {menu.courses.map((course) => (
            <section key={course.key}>
              <h3 className="eyebrow border-b border-ivory/10 pb-3 !font-sans">{t(`menu.courses.${course.key}`)}</h3>
              <ul className="mt-4 space-y-3">
                {course.items.map((dish) => (
                  <li key={dish} className="font-serif text-xl leading-snug">
                    {dish}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <Link to={`/contact?menu=${menu.slug}`} className="btn-solid mt-12 w-full">
          {t('cta.bookMenu')}
        </Link>
      </div>
    </div>
  )
}
