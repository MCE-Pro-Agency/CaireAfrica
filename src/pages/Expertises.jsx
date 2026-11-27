import { useState } from 'react'
import { Link } from 'react-router-dom'
import DetailsSlider from '../components/sections/DetailsSlider'
import NetworkMap from '../components/sections/NetworkMap'
import BrandBar from '../components/ui/BrandBar'
import CertBadge from '../components/ui/CertBadge'
import { expertises } from '../data/expertises'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

// Page /expertises : carte des liaisons Reggio Emilia ↔ Dakar ↔ projets,
// explorateur des 9 expertises, méthode, chiffres et certifications, appel à l'action.
// Textes des expertises : https://www.cairepro.it/fr/expertise/ (src/data/expertises.js)

const T = {
  metaTitle: { fr: 'Expertises — CAIREAFRICA', en: 'Expertise — CAIREAFRICA' },
  metaDesc: {
    fr: 'Conception, BIM, durabilité, prévention incendie, vulnérabilité sismique, direction des travaux, sécurité, réhabilitation et vérification : les 9 expertises de CAIREAFRICA et CAIREPRO.',
    en: 'Design, BIM, sustainability, fire prevention, seismic assessment, site supervision, safety, refurbishment and design review: the 9 areas of expertise of CAIREAFRICA and CAIREPRO.',
  },
  eyebrow: { fr: 'Expertises', en: 'Expertise' },
  title1: { fr: 'l’expertise sans frontières.', en: 'expertise without borders.' },
  
  lead: {
    fr: 'Architectes, ingénieurs et designers unissent chaque jour leurs compétences pour donner vie à des projets, de la conception à la réalisation, autour d’une méthodologie commune axée sur l’excellence et la performance.',
    en: 'Every day, architects, engineers and designers combine their skills to bring projects to life, from design to delivery, around a shared methodology focused on excellence and performance.',
  },
  see: { fr: 'Découvrir les 9 expertises', en: 'Explore the 9 areas of expertise' },
  talk: { fr: 'Parler de votre projet', en: 'Discuss your project' },
  listEyebrow: { fr: 'Nos 9 expertises', en: 'Our 9 areas of expertise' },
  listTitle: { fr: 'Une seule équipe,', en: 'One team,' },
  listTitle2: { fr: 'toutes les compétences.', en: 'every skill.' },
  prev: { fr: 'Précédente', en: 'Previous' },
  next: { fr: 'Suivante', en: 'Next' },
  methodEyebrow: { fr: 'La méthode', en: 'Our method' },
  methodTitle: { fr: 'Du concept au chantier,', en: 'From concept to site,' },
  methodTitle2: { fr: 'sans rupture.', en: 'seamlessly.' },
  steps: [
    { title: { fr: 'Concevoir', en: 'Design' }, keys: ['design', 'bim'] },
    { title: { fr: 'Optimiser', en: 'Optimise' }, keys: ['sustainability', 'fire', 'seismic'] },
    { title: { fr: 'Vérifier', en: 'Review' }, keys: ['validation', 'refurbishment'] },
    { title: { fr: 'Réaliser', en: 'Deliver' }, keys: ['supervision', 'safety'] },
  ],
  figures: [
    { value: '+50', label: { fr: 'professionnels', en: 'professionals' } },
    { value: '9', label: { fr: 'expertises intégrées', en: 'integrated areas of expertise' } },
    { value: '6', label: { fr: 'spécialistes BIM', en: 'BIM specialists' } },
    { value: '20 M€', label: { fr: 'projets vérifiés jusqu’à', en: 'design reviews up to' } },
    { value: '1947', label: { fr: 'naissance de CAIREPRO', en: 'CAIREPRO founded' } },
  ],
  detailsEyebrow: { fr: 'En images', en: 'In pictures' },
  detailsTitle: { fr: 'Parce que', en: 'Because' },
  detailsTitle2: { fr: 'chaque détail compte.', en: 'every detail matters.' },
  detailsText: {
    fr: 'Rencontres, chantiers, rendus : un aperçu de notre manière de travailler, du premier croquis à la livraison.',
    en: 'Meetings, sites, renderings: a glimpse of the way we work, from the first sketch to handover.',
  },
  certEyebrow: { fr: 'Qualité · Environnement · Sécurité', en: 'Quality · Environment · Safety' },
  certTitle: { fr: 'Nos certifications', en: 'Our certifications' },
  certText: {
    fr: 'Les systèmes de management de CAIREPRO, maison mère de CAIREAFRICA, sont certifiés selon les normes internationales.',
    en: 'The management systems of CAIREPRO, CAIREAFRICA’s parent company, are certified to international standards.',
  },
  certs: [
    { norm: 'ISO 9001:2015', label: { fr: 'QUALITÉ', en: 'QUALITY' }, color: '#A3222F', number: 'CR-1047Q/004', name: { fr: 'Management de la qualité', en: 'Quality management' } },
    { norm: 'ISO 14001:2015', label: { fr: 'ENVIRONNEMENT', en: 'ENVIRONMENT' }, color: '#2F7A2D', number: 'CR-1047A/001', name: { fr: 'Management environnemental', en: 'Environmental management' } },
    { norm: 'ISO 45001:2018', label: { fr: 'SÉCURITÉ', en: 'SAFETY' }, color: '#B9850B', number: 'CR-3296S/001', name: { fr: 'Santé et sécurité au travail', en: 'Occupational health & safety' } },
    { norm: 'UNI/PdR 125:2022', label: { fr: 'ÉGALITÉ', en: 'EQUALITY' }, color: '#58595B', number: 'CR-2868PG/001', name: { fr: 'Égalité des genres', en: 'Gender equality' } },
  ],
  oice: { fr: 'Membre titulaire de l’OICE', en: 'Full member of OICE' },
  oiceText: {
    fr: 'Association italienne des organisations d’ingénierie, d’architecture et de conseil technico-économique.',
    en: 'Italian association of engineering, architecture and technical-economic consultancy organisations.',
  },
  certNumber: { fr: 'Certificat n°', en: 'Certificate no.' },
  certified: { fr: 'CERTIFIÉ', en: 'CERTIFIED' },
  system: { fr: 'SYSTÈME DE MANAGEMENT', en: 'MANAGEMENT SYSTEM' },
  ctaTitle: { fr: 'Un projet ? Une seule équipe pour tout le cycle.', en: 'A project? One team for the whole cycle.' },
  ctaText: { fr: 'Du concept à la direction des travaux, un interlocuteur unique à Dakar.', en: 'From concept to site supervision, a single point of contact in Dakar.' },
  ctaBtn: { fr: 'Démarrer un projet', en: 'Start a project' },
}

// Pictogrammes (traits, 24 × 24)
const ICONS = {
  design: 'M4 20h16M6 20V9l6-5 6 5v11M10 20v-6h4v6M3 20l3-3',
  bim: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v18M4 7.5l8 4.5 8-4.5',
  sustainability: 'M5 19c8 0 14-6 14-14-8 0-14 6-14 14zm0 0l7-7',
  fire: 'M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-6 2 1 3 3 3 3s1-3 0-7z',
  seismic: 'M2 12h4l2-5 3 10 3-14 3 12 2-3h3',
  supervision: 'M4 21V10l8-6 8 6v11M9 21v-5h6v5M8 11h8',
  safety: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zm-3 9l2 2 4-4',
  refurbishment: 'M14 6l4 4-9 9H5v-4l9-9zm-2 2l4 4M4 4l3 3',
  validation: 'M9 12l2 2 4-4M7 3h10l2 3v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6l2-3z',
}
const accents = ['bg-brand-red', 'bg-brand-yellow', 'bg-brand-green']
const accentText = ['text-brand-red', 'text-clay', 'text-brand-green']

function Icon({ k, className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICONS[k]} />
    </svg>
  )
}

function Detail({ ex, i, pick }) {
  return (
    <div key={ex.key} className="animate-fadeUp">
      <div className="flex items-center gap-4">
        <span className={`grid h-14 w-14 place-items-center rounded-2xl text-ink ${accents[i % 3]}`}>
          <Icon k={ex.key} />
        </span>
        <span className="font-display text-6xl font-extrabold text-ink/10">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <p className={`mt-8 text-[11px] uppercase tracking-[0.3em] ${accentText[i % 3]}`}>{pick(ex.title)}</p>
      <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-4xl">{pick(ex.heading)}</h3>
      <div className="mt-6 space-y-4">
        {ex.body.map((p, k) => (
          <p key={k} className="body-text">
            {pick(p)}
          </p>
        ))}
      </div>
    </div>
  )
}

export default function Expertises() {
  const { pick } = useLanguage()
  usePageMeta(pick(T.metaTitle), pick(T.metaDesc))
  const [active, setActive] = useState(0)
  const ex = expertises[active]
  const go = (d) => setActive((a) => (a + d + expertises.length) % expertises.length)
  const select = (key) => {
    setActive(expertises.findIndex((e) => e.key === key))
    document.getElementById('liste')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ---------- Bandeau : carte ---------- */}
      <section className="relative overflow-hidden bg-ink pb-16 pt-[72px] md:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(58,148,55,.16),transparent_55%),radial-gradient(ellipse_at_50%_100%,rgba(250,180,14,.08),transparent_60%)]" />
        <div className="container-x relative max-w-5xl pt-14 text-center md:pt-20">
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
            {pick(T.title1)}
            <br />
            <em className="font-semibold text-brand-yellow">{pick(T.title2)}</em>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-ivory/75">{pick(T.lead)}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="#liste" className="btn rounded-full bg-brand-yellow text-ink hover:bg-ivory">
              {pick(T.see)} ↓
            </a>
            <Link to="/contact" className="btn rounded-full border border-ivory/40 text-ivory hover:border-brand-yellow hover:text-brand-yellow">
              {pick(T.talk)}
            </Link>
          </div>
        </div>
        <div className="relative mt-10 md:mt-6">
          <NetworkMap />
        </div>
      </section>

      {/* ---------- Explorateur des 9 expertises ---------- */}
      <section id="liste" className="section theme-light scroll-mt-16">
        <div className="container-x max-w-7xl">
          <h2 className="section-title">
            {pick(T.listTitle)} <em className="text-brand-red">{pick(T.listTitle2)}</em>
          </h2>
          <BrandBar className="mx-auto mt-6" />

          <div className="mt-12 grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
            {/* Liste */}
            <ol className="divide-y divide-ink/10 border-y border-ink/10 lg:sticky lg:top-24 lg:self-start">
              {expertises.map((e, i) => {
                const on = i === active
                return (
                  <li key={e.key}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={on}
                      className={`group relative flex w-full items-center gap-4 py-4 pl-4 pr-3 text-left transition ${on ? 'bg-ink text-ivory' : 'hover:bg-ink/5'}`}
                    >
                      <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1 transition ${on ? accents[i % 3] : 'bg-transparent'}`} />
                      <span className={`w-7 text-[11px] tracking-[0.2em] ${on ? 'text-brand-yellow' : 'text-ink/40'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <Icon k={e.key} className={`h-5 w-5 shrink-0 ${on ? 'text-brand-yellow' : 'text-ink/50'}`} />
                      <span className="flex-1 text-[15px] font-medium">{pick(e.title)}</span>
                      <span aria-hidden="true" className={`transition ${on ? 'translate-x-0 text-brand-yellow' : '-translate-x-1 text-ink/30 group-hover:translate-x-0'}`}>
                        →
                      </span>
                    </button>
                    {/* Mobile : le texte s'ouvre sous l'expertise */}
                    {on && (
                      <div className="px-4 pb-8 pt-6 lg:hidden">
                        <Detail ex={e} i={i} pick={pick} />
                      </div>
                    )}
                  </li>
                )
              })}
            </ol>

            {/* Ordinateur : panneau de détail */}
            <div className="hidden min-h-[520px] flex-col rounded-3xl bg-white p-12 shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] ring-1 ring-ink/5 lg:flex">
              <Detail ex={ex} i={active} pick={pick} />
              <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-6">
                <button type="button" onClick={() => go(-1)} className="link-line">
                  ← {pick(T.prev)}
                </button>
                <span className="text-[11px] tracking-[0.25em] text-ink/40">
                  {String(active + 1).padStart(2, '0')} / {String(expertises.length).padStart(2, '0')}
                </span>
                <button type="button" onClick={() => go(1)} className="link-line">
                  {pick(T.next)} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Parce que chaque détail compte : diaporama ---------- */}
      <section className="section bg-yellow-light text-ink">
        <div className="container-x max-w-7xl">
          <div className="text-center">
            <h2 className="section-title">
              {pick(T.detailsTitle)} <em className="text-brand-red">{pick(T.detailsTitle2)}</em>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink/70">{pick(T.detailsText)}</p>
          </div>
          <div className="mt-12">
            <DetailsSlider />
          </div>
        </div>
      </section>

      {/* ---------- Méthode ---------- */}
      <section className="section bg-forest">
        <div className="container-x max-w-7xl">
          <h2 className="section-title">
            {pick(T.methodTitle)} <em className="text-brand-yellow">{pick(T.methodTitle2)}</em>
          </h2>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[22px] hidden h-px bg-ivory/20 md:block" />
            {T.steps.map((st, i) => (
              <li key={st.title.fr} className="relative">
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full bg-brand-yellow font-display text-lg font-extrabold text-ink">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-display text-2xl font-extrabold">{pick(st.title)}</h3>
                <ul className="mt-4 space-y-2">
                  {st.keys.map((k) => {
                    const e = expertises.find((x) => x.key === k)
                    return (
                      <li key={k}>
                        <button type="button" onClick={() => select(k)} className="flex items-center gap-2 text-left text-[15px] text-ivory/75 transition hover:text-brand-yellow">
                          <Icon k={k} className="h-4 w-4 shrink-0" />
                          {pick(e.title)}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Chiffres + certifications ---------- */}
      <section className="section theme-light">
        <div className="container-x max-w-7xl">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-ink/10 md:grid-cols-5">
            {T.figures.map((f) => (
              <div key={f.value} className="flex flex-col-reverse bg-ivory px-5 py-10 text-center">
                <dt className="mt-3 text-[10px] uppercase tracking-[0.25em] text-ink/60">{pick(f.label)}</dt>
                <dd className="font-display text-4xl font-extrabold text-brand-red md:text-5xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Nos certifications ---------- */}
      <section className="section border-t border-ink/10 theme-light">
        <div className="container-x max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">{pick(T.certTitle)}</h2>
            <BrandBar className="mx-auto mt-6" />
            <p className="body-text mt-6">{pick(T.certText)}</p>
          </div>

          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {T.certs.map((c) => (
              <li key={c.norm} className="group flex flex-col items-center text-center">
                <CertBadge
                  norm={c.norm}
                  line={pick(T.system)}
                  label={pick(c.label)}
                  status={pick(T.certified)}
                  color={c.color}
                  className="h-40 w-36 drop-shadow-[0_18px_25px_rgba(0,0,0,.18)] transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[-3deg] md:h-44 md:w-40"
                />
                <p className="mt-5 text-[15px] font-medium">{pick(c.name)}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink/50">
                  {pick(T.certNumber)} {c.number}
                </p>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-ink/10 bg-white p-6 text-center sm:flex-row sm:text-left">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink font-display text-sm font-extrabold tracking-wider text-brand-yellow">OICE</span>
            <div>
              <p className="font-medium">{pick(T.oice)}</p>
              <p className="mt-1 text-sm text-ink/60">{pick(T.oiceText)}</p>
            </div>
          </div>
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
    </>
  )
}
