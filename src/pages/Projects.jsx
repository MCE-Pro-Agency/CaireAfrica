import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProjectModal, { statusDot } from '../components/sections/ProjectModal'
import Media from '../components/ui/Media'
import { countries, references, sectors, statuses } from '../data/references'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

// Page /projets : bandeau (texte à gauche, 3 photos empilées à droite),
// barre de filtres, grille des références, fenêtre de détail (?p=slug).

const T = {
  metaTitle: { fr: 'Projets — CAIREAFRICA', en: 'Projects — CAIREAFRICA' },
  metaDesc: {
    fr: 'Références CAIREAFRICA et CAIREPRO : éducation, résidentiel, santé, bureaux, industrie — au Sénégal, en Afrique de l’Ouest et à l’international.',
    en: 'CAIREAFRICA and CAIREPRO references: education, residential, healthcare, offices, industry — in Senegal, West Africa and worldwide.',
  },
  eyebrow: { fr: 'Projets — Références', en: 'Projects — References' },
  title1: { fr: 'Des projets qui', en: 'Projects that' },
  title2: { fr: 'façonnent', en: 'shape' },
  title3: { fr: 'l’Afrique.', en: 'Africa.' },
  lead: {
    fr: 'Campus, résidences, cliniques, bureaux et infrastructures : une sélection de réalisations au Sénégal et en Afrique de l’Ouest, complétée par des références CAIREPRO à l’international.',
    en: 'Campuses, residences, clinics, offices and infrastructure: a selection of work in Senegal and West Africa, complemented by CAIREPRO references worldwide.',
  },
  statRefs: { fr: 'Références', en: 'References' },
  statCountries: { fr: 'Pays', en: 'Countries' },
  statSectors: { fr: 'Secteurs', en: 'Sectors' },
  see: { fr: 'Voir les projets', en: 'See the projects' },
  talk: { fr: 'Parler de votre projet', en: 'Discuss your project' },
  featured: { fr: 'À la une', en: 'Featured' },
  search: { fr: 'Rechercher', en: 'Search' },
  searchPh: { fr: 'Nom, ville, client…', en: 'Name, city, client…' },
  country: { fr: 'Pays', en: 'Country' },
  sector: { fr: 'Secteur', en: 'Sector' },
  status: { fr: 'Statut', en: 'Status' },
  all: { fr: 'Tous', en: 'All' },
  reset: { fr: 'Réinitialiser', en: 'Reset' },
  count: { fr: (n) => `${n} projet${n > 1 ? 's' : ''}`, en: (n) => `${n} project${n > 1 ? 's' : ''}` },
  empty: { fr: 'Aucun projet ne correspond à ces critères.', en: 'No project matches these filters.' },
  ctaTitle: { fr: 'Votre projet sera le prochain.', en: 'Your project could be next.' },
  ctaText: {
    fr: 'Du concept à la direction des travaux, un interlocuteur unique à Dakar.',
    en: 'From concept to site supervision, a single point of contact in Dakar.',
  },
  ctaBtn: { fr: 'Démarrer un projet', en: 'Start a project' },
}

const norm = (s) =>
  String(s ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

const used = (key) => [...new Set(references.map((p) => p[key]))]

export default function Projects() {
  const { pick, lang } = useLanguage()
  usePageMeta(pick(T.metaTitle), pick(T.metaDesc))
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState('')
  const [country, setCountry] = useState('')
  const [sector, setSector] = useState('')
  const [status, setStatus] = useState('')

  const list = useMemo(() => {
    const words = norm(q).split(/\s+/).filter(Boolean)
    return references.filter((p) => {
      if (country && p.country !== country) return false
      if (sector && p.sector !== sector) return false
      if (status && p.status !== status) return false
      if (!words.length) return true
      const hay = norm([p.name, p.city, pick(countries[p.country]), pick(sectors[p.sector]), pick(p.client), p.year].join(' '))
      return words.every((w) => hay.includes(w))
    })
  }, [q, country, sector, status, pick])

  const open = references.find((p) => p.slug === params.get('p'))
  const setOpen = (slug) => setParams(slug ? { p: slug } : {}, { replace: !!open })
  const step = (d) => {
    const src = list.length ? list : references
    const i = src.findIndex((p) => p.slug === open.slug)
    setOpen(src[(i + d + src.length) % src.length].slug)
  }

  const featured = references.filter((p) => p.featured && p.images.length).slice(0, 3)
  const filtered = q || country || sector || status
  const reset = () => (setQ(''), setCountry(''), setSector(''), setStatus(''))

  const stats = [
    [references.length, T.statRefs],
    [used('country').length, T.statCountries],
    [used('sector').length, T.statSectors],
  ]

  return (
    <>
      {/* ---------- Bandeau ---------- */}
      <section className="relative overflow-hidden bg-ink pb-28 pt-[72px] md:pb-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgba(58,148,55,.18),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(205,23,25,.12),transparent_50%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="container-x relative grid max-w-7xl items-center gap-14 pt-12 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Texte */}
          <div className="animate-fadeUp">
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.02em] sm:text-6xl xl:text-[5.4rem]">
              {pick(T.title1)}
              <br />
              {pick(T.title2)} <em className="font-semibold text-brand-yellow">{pick(T.title3)}</em>
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ivory/75">{pick(T.lead)}</p>

            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6 border-t border-ivory/10 pt-8">
              {stats.map(([value, label]) => (
                <div key={label.fr}>
                  <dd className="font-display text-5xl font-extrabold text-brand-yellow">{value}</dd>
                  <dt className="mt-2 text-[10px] uppercase tracking-[0.3em] text-ivory/60">{pick(label)}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#liste" className="btn rounded-full bg-brand-yellow text-ink hover:bg-ivory">
                {pick(T.see)} ↓
              </a>
              <Link to="/contact" className="btn rounded-full border border-ivory/40 text-ivory hover:border-brand-yellow hover:text-brand-yellow">
                {pick(T.talk)}
              </Link>
            </div>
          </div>

          {/* Trois photos empilées */}
          {featured.length === 3 && (
            <div className="relative mx-auto aspect-[1.05] w-full max-w-[620px] animate-fadeUp">
              {[
                'left-0 top-[14%] z-10 h-[64%] w-[58%] -rotate-2',
                'right-0 top-0 z-20 h-[52%] w-[50%] rotate-2',
                'right-[6%] bottom-0 z-30 h-[46%] w-[48%] -rotate-1',
              ].map((pos, i) => (
                <button
                  key={featured[i].slug}
                  type="button"
                  onClick={() => setOpen(featured[i].slug)}
                  className={`group absolute overflow-hidden rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)] ring-1 ring-ivory/10 transition duration-500 hover:z-40 hover:rotate-0 hover:scale-[1.03] ${pos}`}
                >
                  <Media src={featured[i].images[0]} alt={featured[i].name} eager className="h-full w-full transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-sm font-medium opacity-0 transition group-hover:opacity-100">
                    {featured[i].name}
                  </span>
                </button>
              ))}
              {/* Carte « À la une » */}
              <button
                type="button"
                onClick={() => setOpen(featured[0].slug)}
                className="absolute bottom-[4%] left-[3%] z-40 rounded-xl border border-ivory/15 bg-ink/80 px-5 py-4 text-left shadow-2xl backdrop-blur-md transition hover:border-brand-yellow"
              >
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                  <span className={`h-2 w-2 animate-pulse rounded-full ${statusDot[featured[0].status]}`} />
                  {pick(T.featured)}
                </span>
                <span className="mt-1.5 block text-lg font-medium">{featured[0].name}</span>
                <span className="mt-0.5 block text-sm text-brand-yellow">
                  {featured[0].city} · {pick(statuses[featured[0].status])}
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Filtres + grille ---------- */}
      <section id="liste" className="theme-light scroll-mt-16 pb-24">
        <div className="container-x max-w-7xl">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="relative z-10 -mt-14 grid gap-px overflow-hidden rounded-2xl bg-ink/10 shadow-[0_25px_60px_-25px_rgba(0,0,0,.45)] ring-1 ring-ink/10 grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]"
          >
            <label className="col-span-2 block bg-white px-5 py-4 lg:col-span-1 lg:px-6">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-brand-red">{pick(T.search)}</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={pick(T.searchPh)}
                className="mt-1 block w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink/40"
              />
            </label>
            <Select label={pick(T.country)} value={country} onChange={setCountry} all={pick(T.all)}
              options={used('country').map((k) => [k, pick(countries[k])])} />
            <Select label={pick(T.sector)} value={sector} onChange={setSector} all={pick(T.all)}
              options={used('sector').map((k) => [k, pick(sectors[k])])} />
            <Select label={pick(T.status)} value={status} onChange={setStatus} all={pick(T.all)}
              options={used('status').map((k) => [k, pick(statuses[k])])} />
            <div className="flex items-center bg-white p-3">
              <button
                type="button"
                onClick={reset}
                disabled={!filtered}
                className="btn h-full w-full rounded-xl bg-brand-yellow text-ink transition hover:bg-ink hover:text-ivory disabled:cursor-default disabled:opacity-40 disabled:hover:bg-brand-yellow disabled:hover:text-ink"
              >
                {pick(T.reset)}
              </button>
            </div>
          </form>

          {/* Filtres rapides par secteur */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="-mx-6 flex gap-2 overflow-x-auto px-6 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
              {['', ...used('sector')].map((k) => (
                <button
                  key={k || 'all'}
                  type="button"
                  onClick={() => setSector(k)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.15em] transition ${
                    sector === k ? 'border-ink bg-ink text-ivory' : 'border-ink/15 text-ink/70 hover:border-ink hover:text-ink'
                  }`}
                >
                  {k ? pick(sectors[k]) : pick(T.all)}
                </button>
              ))}
            </div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-ink/60" aria-live="polite">
              {T.count[lang === 'en' ? 'en' : 'fr'](list.length)}
            </p>
          </div>

          {/* Grille */}
          {list.length ? (
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => (
                <li key={p.slug} className="animate-fadeUp" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
                  <button type="button" onClick={() => setOpen(p.slug)} className="group block w-full text-left">
                    <div className="relative overflow-hidden rounded-xl bg-coal">
                      <Media src={p.images[0]} alt={p.name} className="aspect-[4/3] w-full transition duration-700 ease-out group-hover:scale-105" />
                      <span className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-ink backdrop-blur">
                        <span className={`h-1.5 w-1.5 rounded-full ${statusDot[p.status]}`} />
                        {pick(statuses[p.status])}
                      </span>
                      {p.images.length > 1 && (
                        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] tracking-[0.15em] text-ivory">
                          {p.images.length} photos
                        </span>
                      )}
                      <span className="absolute inset-0 grid place-items-center bg-ink/0 transition group-hover:bg-ink/25">
                        <span className="grid h-14 w-14 scale-75 place-items-center rounded-full bg-brand-yellow text-xl text-ink opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                          →
                        </span>
                      </span>
                    </div>
                    <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-brand-red">
                      {pick(sectors[p.sector])} · {p.year}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight transition group-hover:text-brand-red">{p.name}</h2>
                    <p className="mt-1 text-sm text-ink/60">
                      {[p.city, pick(countries[p.country])].filter(Boolean).join(', ')}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-16 rounded-2xl border border-dashed border-ink/20 p-12 text-center">
              <p className="text-ink/70">{pick(T.empty)}</p>
              <button type="button" onClick={reset} className="link-line mt-6">
                {pick(T.reset)}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Appel à l'action ---------- */}
      <section className="bg-ink text-brand-yellow">
        <div className="container-x flex max-w-7xl flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl">{pick(T.ctaTitle)}</h2>
            <p className="mt-2 text-base leading-relaxed text-brand-yellow/80">{pick(T.ctaText)}</p>
          </div>
          <Link to="/contact" className="btn shrink-0 rounded-full bg-brand-yellow text-ink hover:bg-ivory">
            {pick(T.ctaBtn)} →
          </Link>
        </div>
      </section>

      {open && <ProjectModal project={open} onClose={() => setOpen(null)} onStep={step} />}
    </>
  )
}

function Select({ label, value, onChange, options, all }) {
  return (
    <label className="relative block bg-white px-5 py-4 lg:px-6">
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-brand-red">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full cursor-pointer appearance-none bg-transparent pr-6 text-[15px] text-ink outline-none"
      >
        <option value="">{all}</option>
        {options.map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-5 right-5 text-xs lg:right-6 text-ink/50">
        ▾
      </span>
    </label>
  )
}
