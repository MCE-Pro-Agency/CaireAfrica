import { useCallback, useEffect, useMemo, useState } from 'react'
import CtaBand from '../components/sections/CtaBand'
import Media from '../components/ui/Media'
import PageHero from '../components/ui/PageHero'
import { gallery, galleryFilters } from '../data/gallery'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function Gallery() {
  const { t } = useLanguage()
  usePageMeta(t('gallery.title'), t('gallery.description'))

  const [filter, setFilter] = useState('all')
  const [openIndex, setOpenIndex] = useState(null)

  const items = useMemo(() => gallery.filter(galleryFilters.find((f) => f.key === filter).match), [filter])
  const current = openIndex === null ? null : items[openIndex]

  const close = useCallback(() => setOpenIndex(null), [])
  const move = useCallback(
    (delta) => setOpenIndex((i) => (i === null ? i : (i + delta + items.length) % items.length)),
    [items.length],
  )

  // Visionneuse : clavier + blocage du défilement
  useEffect(() => {
    if (openIndex === null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openIndex, close, move])

  return (
    <>
      <PageHero eyebrow={t('gallery.eyebrow')} heading={t('gallery.heading')} intro={t('gallery.intro')} />

      <section className="pb-20">
        <div className="container-x">
          {/* Filtres */}
          <div className="flex flex-wrap gap-3" role="group" aria-label={t('gallery.eyebrow')}>
            {galleryFilters.map((f) => {
              const count = gallery.filter(f.match).length
              const selected = f.key === filter
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setFilter(f.key)
                    setOpenIndex(null)
                  }}
                  className={`border px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    selected ? 'border-ivory bg-ivory text-ink' : 'border-ivory/25 hover:border-ivory'
                  }`}
                >
                  {t(`gallery.filters.${f.key}`)} <span className="opacity-60">{count}</span>
                </button>
              )
            })}
          </div>

          {/* Grille */}
          <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {items.map((item, i) => (
              <li key={item.id} className="mb-4 break-inside-avoid">
                <button type="button" onClick={() => setOpenIndex(i)} className="group relative block w-full overflow-hidden text-left">
                  <Media
                    src={item.src}
                    alt={item.title}
                    className={`w-full transition-transform duration-700 group-hover:scale-105 ${i % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`}
                  />
                  {item.video && (
                    <span aria-hidden="true" className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/60 bg-ink/50 text-xs">
                      ▶
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10 text-sm opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-center text-sm text-ivory/50">{t('gallery.note')}</p>
        </div>
      </section>

      <div className="border-t border-ivory/10">
        <CtaBand title={t('home.ctaTitle')} text={t('home.ctaText')} />
      </div>

      {/* Visionneuse */}
      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.title} className="fixed inset-0 z-50 flex flex-col bg-black/95" onClick={close}>
          <div className="flex items-center justify-between gap-4 p-5">
            <p className="text-sm text-ivory/80">{current.title}</p>
            <button type="button" onClick={close} aria-label={t('gallery.close')} className="flex h-10 w-10 shrink-0 items-center justify-center border border-ivory/20 hover:border-ivory">
              ✕
            </button>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-between gap-2 px-2 pb-6 md:px-6" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => move(-1)} aria-label={t('gallery.prev')} className="h-12 w-12 shrink-0 text-2xl text-ivory/70 hover:text-ivory">
              ←
            </button>
            <div className="flex h-full min-w-0 flex-1 items-center justify-center">
              {current.video ? (
                <video key={current.id} src={current.videoSrc} poster={current.src} controls autoPlay playsInline className="max-h-full max-w-full" />
              ) : (
                <Media key={current.id} src={current.src} alt={current.title} className="max-h-full max-w-full !object-contain [&.placeholder]:aspect-[4/3] [&.placeholder]:w-full [&.placeholder]:max-w-3xl" />
              )}
            </div>
            <button type="button" onClick={() => move(1)} aria-label={t('gallery.next')} className="h-12 w-12 shrink-0 text-2xl text-ivory/70 hover:text-ivory">
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
