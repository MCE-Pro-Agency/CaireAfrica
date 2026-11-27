import { useCallback, useEffect, useRef, useState } from 'react'
import { details } from '../../data/details'
import { useLanguage } from '../../i18n/LanguageContext'

// Diaporama plein cadre : défilement automatique (barres de progression en haut),
// pause au survol, flèches, glisser du doigt, vignettes titrées en dessous.
const DURATION = 6000

export default function DetailsSlider() {
  const { pick } = useLanguage()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const start = useRef(0)
  const drag = useRef(null)
  const thumbs = useRef(null)
  const n = details.length

  const go = useCallback(
    (i) => {
      setIndex(((i % n) + n) % n)
      setProgress(0)
      start.current = performance.now()
    },
    [n],
  )

  // Défilement automatique
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf
    start.current = performance.now() - progress * DURATION
    const tick = (now) => {
      if (!paused) {
        const p = (now - start.current) / DURATION
        if (p >= 1) go(index + 1)
        else setProgress(p)
      } else start.current = now - progress * DURATION
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [index, paused, go]) // eslint-disable-line react-hooks/exhaustive-deps

  // La vignette active reste visible : on fait défiler la bande de vignettes seule,
  // horizontalement — jamais la page.
  useEffect(() => {
    const strip = thumbs.current
    const el = strip?.children[index]
    if (!strip || !el) return
    strip.scrollTo({ left: el.offsetLeft - (strip.clientWidth - el.clientWidth) / 2, behavior: 'smooth' })
  }, [index])

  const onDown = (e) => (drag.current = e.clientX)
  const onUp = (e) => {
    if (drag.current == null) return
    const dx = e.clientX - drag.current
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
    drag.current = null
  }

  const slide = details[index]

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Scène */}
      <div
        className="relative aspect-[4/5] touch-pan-y select-none overflow-hidden rounded-3xl bg-coal sm:aspect-[16/9]"
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current = null)}
        role="region"
        aria-roledescription="carousel"
        aria-label={pick(slide.title)}
      >
        {details.map((d, i) => (
          <div
            key={d.image}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== index}
          >
            {/* Photo verticale : fond flouté + photo entière (les visages ne sont pas coupés) */}
            {d.portrait && <img src={d.image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-70 blur-2xl" />}
            <img
              src={d.image}
              alt={pick(d.title)}
              loading={i < 2 ? 'eager' : 'lazy'}
              draggable="false"
              className={`absolute inset-0 h-full w-full ease-out ${d.portrait ? 'object-contain' : 'object-cover'} ${i === index ? 'scale-105' : 'scale-100'}`}
              style={{ transitionProperty: 'transform', transitionDuration: i === index ? '7000ms' : '1200ms' }}
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

        {/* Barres de progression */}
        <div className="absolute inset-x-5 top-5 flex gap-1.5 md:inset-x-8 md:top-7">
          {details.map((d, i) => (
            <button
              key={d.image}
              type="button"
              onClick={() => go(i)}
              aria-label={pick(d.title)}
              className="h-1 flex-1 overflow-hidden rounded-full bg-white/25"
            >
              <span className="block h-full rounded-full bg-brand-yellow" style={{ width: i < index ? '100%' : i === index ? `${progress * 100}%` : '0%' }} />
            </button>
          ))}
        </div>

        {/* Légende */}
        <div key={index} className="absolute inset-x-0 bottom-0 animate-fadeUp p-6 md:p-10">
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-brand-yellow">
            <span className="tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </span>
            {slide.tag && (
              <>
                <span aria-hidden="true" className="h-px w-8 bg-brand-yellow/60" />
                {pick(slide.tag)}
              </>
            )}
          </p>
          <h3 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight text-ivory md:text-5xl">{pick(slide.title)}</h3>
          {slide.caption && <p className="mt-3 max-w-xl text-[15px] text-ivory/75 md:text-base">{pick(slide.caption)}</p>}
        </div>

        {/* Flèches */}
        <div className="absolute bottom-6 right-6 hidden gap-2 sm:flex md:bottom-10 md:right-10">
          {[
            [-1, '←', 'Précédente'],
            [1, '→', 'Suivante'],
          ].map(([d, label, aria]) => (
            <button
              key={d}
              type="button"
              onClick={() => go(index + d)}
              aria-label={aria}
              className="grid h-12 w-12 place-items-center rounded-full border border-ivory/30 bg-black/30 text-lg text-ivory backdrop-blur transition hover:border-brand-yellow hover:bg-brand-yellow hover:text-ink"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Vignettes titrées */}
      <div ref={thumbs} className="mt-5 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {details.map((d, i) => (
          <button
            key={d.image}
            type="button"
            onClick={() => go(i)}
            className={`group flex w-56 shrink-0 items-center gap-3 rounded-2xl p-2 pr-4 text-left transition ${
              i === index ? 'bg-white shadow-md ring-1 ring-brand-red/50' : 'opacity-60 hover:bg-white/60 hover:opacity-100'
            }`}
          >
            <img src={d.image} alt="" loading="lazy" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
            <span className="line-clamp-2 text-[13px] leading-snug text-ink">{pick(d.title)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
