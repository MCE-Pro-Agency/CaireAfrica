import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import Media from '../ui/Media'

// Carrousel 3D des projets : la carte active au centre, les autres tournent en perspective.
// Navigation : glisser (souris / doigt), flèches à l'écran, flèches du clavier, clic sur une carte latérale.

// Position, rotation et profondeur de chaque carte selon sa distance à la carte active
function cardStyle(offset) {
  const abs = Math.abs(offset)
  const sign = Math.sign(offset)
  const x = [0, 108, 180, 230][Math.min(abs, 3)] * sign // décalage horizontal (% de la largeur de carte)
  const z = -abs * 160 // profondeur
  const rotate = -sign * Math.min(abs, 2) * 28 // rotation 3D
  const scale = abs === 0 ? 1 : 0.88 - (abs - 1) * 0.08
  return {
    transform: `translateX(calc(-50% + ${x}%)) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`,
    opacity: abs > 2 ? 0 : 1,
    zIndex: 10 - abs,
    pointerEvents: abs > 2 ? 'none' : 'auto',
  }
}

export default function ProjectCarousel({ items }) {
  const { t, pick, lang } = useLanguage()
  const [active, setActive] = useState(0)
  const drag = useRef({ startX: 0, dragging: false, moved: false })
  const total = items.length

  const go = useCallback((step) => setActive((i) => (i + step + total) % total), [total])

  // Distance circulaire entre une carte et la carte active (boucle infinie)
  const offsetOf = (i) => {
    let d = i - active
    if (d > total / 2) d -= total
    if (d < -total / 2) d += total
    return d
  }

  // Glisser pour faire tourner
  const onPointerDown = (e) => {
    drag.current = { startX: e.clientX, dragging: true, moved: false }
  }
  const onPointerUp = (e) => {
    if (!drag.current.dragging) return
    const delta = e.clientX - drag.current.startX
    if (Math.abs(delta) > 50) {
      drag.current.moved = true
      go(delta < 0 ? 1 : -1)
    }
    drag.current.dragging = false
  }

  // Flèches du clavier quand le carrousel a le focus
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  // Réinitialise si la liste change
  useEffect(() => setActive(0), [total])

  if (!total) return null

  return (
    <div className="mt-14">
      <div
        role="region"
        aria-roledescription="carrousel"
        aria-label={lang === 'fr' ? 'Projets' : 'Projects'}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => (drag.current.dragging = false)}
        className="relative h-[540px] cursor-grab select-none overflow-hidden [perspective:1600px] active:cursor-grabbing sm:h-[580px]"
        style={{ touchAction: 'pan-y' }}
      >
        <ul className="absolute inset-0 [transform-style:preserve-3d]">
          {items.map((project, i) => {
            const offset = offsetOf(i)
            const isActive = offset === 0
            const meta = [project.year, project.status && t(`projects.status.${project.status}`)].filter(Boolean).join(' · ')
            return (
              <li
                key={project.slug}
                aria-hidden={!isActive}
                onClick={() => {
                  if (!isActive && !drag.current.moved) setActive(i)
                  drag.current.moved = false
                }}
                style={cardStyle(offset)}
                className={`absolute left-1/2 top-6 w-[280px] transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] sm:w-[340px] ${
                  isActive ? '' : 'cursor-pointer'
                }`}
              >
                <article
                  className={`relative overflow-hidden rounded-xl bg-ivory text-ink transition-shadow duration-700 ${
                    isActive ? 'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-brand-yellow/40' : 'shadow-xl'
                  }`}
                >
                  {/* Voile sombre sur les cartes latérales */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-ink transition-opacity duration-700"
                    style={{ opacity: [0, 0.5, 0.75, 0.9][Math.min(Math.abs(offset), 3)] }}
                  />
                  <Media src={project.image} alt={project.name} className="pointer-events-none aspect-[4/3] w-full" />
                  <div className="p-6">
                    <p className="text-[10px] font-normal uppercase tracking-[0.3em] text-brand-red">
                      {String(i + 1).padStart(2, '0')} — {pick(project.sector)}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl leading-tight">{project.name}</h3>
                    <p className="mt-1 text-xs text-ink/50">
                      {project.city}, {pick(project.country)}
                    </p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/70">{pick(project.summary)}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                      <span className="font-serif text-base italic text-ink/60">{meta}</span>
                      <Link
                        to="/projets"
                        tabIndex={isActive ? 0 : -1}
                        className="text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:text-brand-red"
                      >
                        {lang === 'fr' ? 'Détails' : 'Details'} →
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Indication + contrôles */}
      <p className="mt-4 text-center text-[11px] uppercase tracking-[0.3em] text-ivory/50">
        ← {lang === 'fr' ? 'Glissez pour faire tourner' : 'Drag to rotate'} →
      </p>
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={lang === 'fr' ? 'Projet précédent' : 'Previous project'}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 text-lg transition-colors hover:border-brand-yellow hover:bg-brand-yellow hover:text-ink"
        >
          ←
        </button>
        <span className="min-w-[64px] text-center text-xs tracking-[0.2em] text-ivory/70" aria-live="polite">
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={lang === 'fr' ? 'Projet suivant' : 'Next project'}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory text-lg transition-colors hover:border-brand-yellow hover:bg-brand-yellow hover:text-ink"
        >
          →
        </button>
      </div>
    </div>
  )
}