import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { countries, sectors, statuses } from '../../data/references'
import { useLanguage } from '../../i18n/LanguageContext'

// Fenêtre de détail d'un projet : galerie (flèches, vignettes, clavier) + fiche.
const L = {
  close: { fr: 'Fermer', en: 'Close' },
  prev: { fr: 'Photo précédente', en: 'Previous photo' },
  next: { fr: 'Photo suivante', en: 'Next photo' },
  place: { fr: 'Lieu', en: 'Location' },
  year: { fr: 'Année', en: 'Year' },
  status: { fr: 'Statut', en: 'Status' },
  client: { fr: 'Client', en: 'Client' },
  credit: { fr: 'Rendu', en: 'Render' },
  more: { fr: 'Voir la fiche sur cairepro.it', en: 'View on cairepro.it' },
  cta: { fr: 'Un projet similaire ? Parlons-en', en: 'A similar project? Let’s talk' },
  soon: { fr: 'Visuels à venir', en: 'Visuals coming soon' },
}

export const statusDot = { concept: 'bg-brand-yellow', ongoing: 'bg-brand-green', done: 'bg-brand-red' }

export default function ProjectModal({ project, onClose, onStep }) {
  const { pick } = useLanguage()
  const [index, setIndex] = useState(0)
  const images = project.images
  const n = images.length

  useEffect(() => setIndex(0), [project.slug])

  const go = useCallback((d) => n > 1 && setIndex((i) => (i + d + n) % n), [n])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [go, onClose])

  const place = [project.city, pick(countries[project.country])].filter(Boolean).join(', ')
  const meta = [
    [L.place, place],
    [L.year, project.year],
    [L.status, pick(statuses[project.status])],
    [L.client, pick(project.client)],
    project.credit && [L.credit, project.credit],
  ].filter(Boolean)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/85 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-full w-full max-w-6xl overflow-y-auto bg-coal text-ivory md:max-h-[92vh] md:rounded-2xl lg:h-[88vh] lg:grid-cols-[1.45fr_1fr] lg:grid-rows-1 lg:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Galerie */}
        <div className="relative flex min-h-0 flex-col bg-black">
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-0 lg:flex-1">
            {n ? (
              <>
                {/* Fond : la même photo, floutée, pour remplir le cadre sans déformer l'image */}
                <img key={`bg-${images[index]}`} src={images[index]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
                {/* Photo entière et nette, centrée (aucun recadrage) */}
                <img
                  key={images[index]}
                  src={images[index]}
                  alt={`${project.name} — ${index + 1}`}
                  decoding="async"
                  className="absolute inset-0 h-full w-full animate-fadeUp object-contain"
                />
              </>
            ) : (
              <div className="placeholder absolute inset-0">
                <span>{pick(L.soon)}</span>
              </div>
            )}
            {n > 1 && (
              <>
                <button type="button" aria-label={pick(L.prev)} onClick={() => go(-1)} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-xl backdrop-blur transition hover:bg-brand-yellow hover:text-ink">
                  ‹
                </button>
                <button type="button" aria-label={pick(L.next)} onClick={() => go(1)} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/55 text-xl backdrop-blur transition hover:bg-brand-yellow hover:text-ink">
                  ›
                </button>
                <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] tracking-[0.2em]">
                  {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </span>
              </>
            )}
          </div>
          {n > 1 && (
            <div className="flex shrink-0 gap-2 overflow-x-auto p-3 [scrollbar-width:thin]">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}`}
                  className={`h-14 w-20 shrink-0 overflow-hidden rounded-md transition ${i === index ? 'ring-2 ring-brand-yellow' : 'opacity-50 hover:opacity-100'}`}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fiche */}
        {/* min-h-0 + overflow-y-auto : la fiche défile dans la fenêtre, avec une barre de défilement visible */}
        <div className="modal-scroll flex min-h-0 flex-col p-7 pt-20 md:p-10 md:pt-20 lg:overflow-y-auto">
          <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-brand-yellow">
            <span className={`h-2 w-2 rounded-full ${statusDot[project.status]}`} />
            {pick(sectors[project.sector])}
          </p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] md:text-5xl">{project.name}</h2>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-ivory/10 py-6">
            {meta.map(([label, value]) => (
              <div key={label.fr}>
                <dt className="text-[10px] uppercase tracking-[0.25em] text-ivory/50">{pick(label)}</dt>
                <dd className="mt-1.5 text-[15px] text-ivory/90">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 space-y-6">
            {project.sections?.length ? (
              project.sections.map((s) => (
                <div key={s.title.fr}>
                  <h3 className="text-xl text-ivory">{pick(s.title)}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ivory/70">{pick(s.text)}</p>
                </div>
              ))
            ) : (
              <p className="text-[15px] leading-relaxed text-ivory/70">{pick(project.summary)}</p>
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-10">
            <Link to="/contact" className="btn-solid" onClick={onClose}>
              {pick(L.cta)} →
            </Link>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-line">
                {pick(L.more)} ↗
              </a>
            )}
          </div>
        </div>

        {/* Fermer / projet suivant */}
        <div className="absolute right-3 top-3 z-10 flex gap-2">
          <button type="button" onClick={() => onStep(-1)} aria-label="←" className="hidden h-10 w-10 place-items-center rounded-full bg-black/60 text-ivory backdrop-blur transition hover:bg-ivory hover:text-ink md:grid">
            ←
          </button>
          <button type="button" onClick={() => onStep(1)} aria-label="→" className="hidden h-10 w-10 place-items-center rounded-full bg-black/60 text-ivory backdrop-blur transition hover:bg-ivory hover:text-ink md:grid">
            →
          </button>
          <button type="button" onClick={onClose} aria-label={pick(L.close)} className="grid h-10 w-10 place-items-center rounded-full bg-black/60 text-lg text-ivory backdrop-blur transition hover:bg-brand-red">
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}