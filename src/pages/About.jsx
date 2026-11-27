import { Link } from 'react-router-dom'
import HistorySnake from '../components/sections/HistorySnake'
import TeamSection from '../components/sections/TeamSection'
import BrandBar from '../components/ui/BrandBar'
import Logo from '../components/ui/Logo'
import { about, board } from '../data/about'
import { site } from '../data/site'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

// Page /a-propos : CAIREAFRICA et sa maison mère CAIREPRO.
// Textes : src/data/about.js (Qui sommes-nous, histoire, conseil d'administration).

const fr = (fr, en) => ({ fr, en })
const T = {
  metaTitle: fr('À propos — CAIREAFRICA', 'About — CAIREAFRICA'),
  metaDesc: fr(
    'CAIREAFRICA, société sénégalaise d’architecture et d’ingénierie basée à Dakar, filiale du groupe italien CAIREPRO fondé en 1947.',
    'CAIREAFRICA, a Senegalese architecture and engineering company based in Dakar, subsidiary of the Italian group CAIREPRO founded in 1947.',
  ),
  eyebrow: fr('À propos', 'About'),
  stats: [
    ['1947', fr('fondation de CAIREPRO', 'CAIREPRO founded')],
    ['78+', fr('ans d’expérience', 'years of experience')],
    ['2018', fr('création de CAIREAFRICA', 'CAIREAFRICA founded')],
    ['16', fr('associés', 'partners')],
    ['+50', fr('professionnels', 'professionals')],
  ],
  twoTitle: fr('Une maison mère, une filiale :', 'A parent company, a subsidiary:'),
  twoTitle2: fr('une même exigence.', 'one standard of excellence.'),
  caireafrica: {
    label: fr('La filiale africaine', 'The African subsidiary'),
    facts: [
      fr('Société de droit sénégalais, basée à Mermoz, Dakar', 'Senegalese company based in Mermoz, Dakar'),
      fr('Créée en 2018, détenue à 100 % par CAIREPRO', 'Founded in 2018, wholly owned by CAIREPRO'),
      fr('Projets au Sénégal et en Afrique de l’Ouest', 'Projects in Senegal and West Africa'),
      fr('Du concept à la direction des travaux', 'From concept to site supervision'),
    ],
  },
  cairepro: {
    label: fr('La maison mère', 'The parent company'),
    facts: [
      fr('Fondée en 1947 à Reggio Emilia (Italie)', 'Founded in 1947 in Reggio Emilia (Italy)'),
      fr('Première coopérative de professions intellectuelles en Europe', 'Europe’s first cooperative of intellectual professions'),
      fr('Société d’ingénierie depuis 2025', 'An engineering company since 2025'),
      fr('Certifiée ISO 9001, ISO 14001, ISO 45001 · membre de l’OICE', 'ISO 9001, ISO 14001, ISO 45001 certified · OICE member'),
    ],
  },
  ourWork: fr('Nos expertises', 'Our expertise'),
  ourProjects: fr('Nos projets', 'Our projects'),
  historyEyebrow: fr('Histoire', 'History'),
  historyTitle: fr('Près de 80 ans', 'Nearly 80 years'),
  historyTitle2: fr('de projets, de lieux et de personnes.', 'of projects, places and people.'),
  boardEyebrow: fr('Gouvernance CAIREPRO', 'CAIREPRO governance'),
  boardTitle: fr('Le conseil d’administration', 'The board of directors'),
  boardText: fr(
    '16 associés et un réseau de plus de 50 professionnels, actifs en Italie et à l’international, organisés en une structure pluridisciplinaire.',
    '16 partners and a network of more than 50 professionals working in Italy and abroad, organised in a multidisciplinary structure.',
  ),
  boardLink: fr('Toute l’équipe CAIREPRO', 'The whole CAIREPRO team'),
  ctaTitle: fr('Donnons vie à vos ambitions architecturales.', 'Bringing your architectural ambitions to life.'),
  ctaText: fr('De la conception à la réalisation, bénéficiez d’une expertise internationale et d’un accompagnement de proximité.', 'From concept to completion, benefit from international expertise and dedicated local support.'),
  ctaBtn: fr('Nous contacter', 'Contact us'),
}

export default function About() {
  const { pick } = useLanguage()
  usePageMeta(pick(T.metaTitle), pick(T.metaDesc))

  return (
    <>
      {/* ---------- Bandeau ---------- */}
      <section className="relative overflow-hidden bg-ink pt-[72px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_10%,rgba(250,180,14,.14),transparent_50%),radial-gradient(ellipse_at_0%_90%,rgba(205,23,25,.12),transparent_55%)]" />
        <div className="container-x relative grid max-w-7xl items-center gap-14 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-fadeUp">
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.02em] sm:text-6xl xl:text-7xl">
              {pick(about.titleStart)}
              <br />
              <em className="font-semibold text-brand-yellow">{pick(about.titleEnd)}</em>
            </h1>
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-ivory/60">{about.tagline}</p>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ivory/75">{pick(about.blocks[0].text[0])}</p>
          </div>

          {/* Deux photos superposées */}
          <div className="relative mx-auto aspect-[1.1] w-full max-w-[560px] animate-fadeUp">
            <img
              src="/images/details/chantier-visite-1.jpg"
              alt=""
              className="absolute left-0 top-0 h-[70%] w-[78%] -rotate-2 rounded-2xl object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)] ring-1 ring-ivory/10"
            />
            <img
              src="/images/details/visite-realites-reggio-emilia.jpg"
              alt=""
              className="absolute bottom-0 right-0 h-[55%] w-[65%] rotate-2 rounded-2xl object-cover shadow-[0_30px_60px_-20px_rgba(0,0,0,.8)] ring-4 ring-ink"
            />
            <span className="absolute bottom-[8%] left-[4%] z-10 rounded-xl bg-brand-yellow px-4 py-3 text-ink shadow-xl">
              <span className="block font-display text-2xl font-extrabold leading-none">Dakar · Reggio Emilia</span>
            </span>
          </div>
        </div>

        {/* Chiffres */}
        <dl className="relative border-t border-ivory/10">
          <div className="container-x grid max-w-7xl grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-5">
            {T.stats.map(([value, label]) => (
              <div key={value} className="flex flex-col-reverse py-8 text-center lg:py-10">
                <dt className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ivory/55">{pick(label)}</dt>
                <dd className="font-display text-4xl font-extrabold text-brand-yellow md:text-5xl">{value}</dd>
              </div>
            ))}
          </div>
        </dl>
      </section>

      {/* ---------- Qui sommes-nous ---------- */}
      <section className="section theme-light">
        <div className="container-x max-w-7xl">
          <h2 className="section-title">
            {pick(about.titleStart)} <em className="font-semibold text-brand-red">{pick(about.titleEnd)}</em>
          </h2>
          <BrandBar className="mx-auto mt-6" />
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {about.blocks.map((block, i) => (
              <article key={block.color} className="relative rounded-2xl bg-white p-8 shadow-[0_20px_50px_-30px_rgba(0,0,0,.35)] ring-1 ring-ink/5">
                <span aria-hidden="true" className={`absolute inset-x-8 top-0 h-1 rounded-b ${block.color}`} />
                <span className="font-display text-5xl font-extrabold text-ink/10">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-2xl font-extrabold leading-snug">{pick(block.title)}</h3>
                {block.text.map((para, k) => (
                  <p key={k} className="body-text mt-4">
                    {pick(para)}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CAIREAFRICA / CAIREPRO ---------- */}
      <section className="section theme-light pt-0">
        <div className="container-x max-w-7xl">
          <h2 className="section-title">
            {pick(T.twoTitle)} <em className="font-semibold text-brand-red">{pick(T.twoTitle2)}</em>
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {/* CAIREPRO */}
            <article className="relative overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-ink/10 md:p-10">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-green/10" />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-green">{pick(T.cairepro.label)}</p>
                <p className="font-display text-3xl font-extrabold">CAIREPRO</p>
                <p className="mt-1 text-sm text-ink/55">Cooperativa Architetti e Ingegneri Progettazione · Reggio Emilia</p>
              </div>
              <ul className="relative mt-8 space-y-3">
                {T.cairepro.facts.map((f) => (
                  <li key={f.fr} className="flex gap-3 text-[15px] text-ink/75">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {pick(f)}
                  </li>
                ))}
              </ul>
              <div className="relative mt-8">
                <a href={site.parent.href} target="_blank" rel="noopener noreferrer" className="btn rounded-full bg-forest text-[#D9B36C] hover:bg-brand-green hover:text-ivory">
                  cairepro.it ↗
                </a>
              </div>
            </article>
            {/* CAIREAFRICA */}
            <article className="relative overflow-hidden rounded-3xl bg-ink p-8 text-ivory md:p-10">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-yellow/10" />
              <div className="relative flex items-center gap-4">
                <Logo variant="mark" className="h-12 w-auto" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brand-yellow">{pick(T.caireafrica.label)}</p>
                  <p className="font-display text-3xl font-extrabold">CAIREAFRICA</p>
                </div>
              </div>
              <ul className="relative mt-8 space-y-3">
                {T.caireafrica.facts.map((f) => (
                  <li key={f.fr} className="flex gap-3 text-[15px] text-ivory/80">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow" />
                    {pick(f)}
                  </li>
                ))}
              </ul>
              <div className="relative mt-8 flex flex-wrap gap-3">
                <Link to="/expertises" className="btn rounded-full bg-brand-yellow text-ink hover:bg-ivory">
                  {pick(T.ourWork)} →
                </Link>
                <Link to="/projets" className="btn rounded-full border border-ivory/40 hover:border-brand-yellow hover:text-brand-yellow">
                  {pick(T.ourProjects)}
                </Link>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ---------- Histoire ---------- */}
      <section className="section bg-forest">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
          <h2 className="section-title">
            {pick(T.historyTitle)} <em className="font-semibold text-[#D9B36C]">{pick(T.historyTitle2)}</em>
          </h2>

          <div className="mt-16">
            <HistorySnake />
          </div>
        </div>
      </section>

      {/* ---------- Conseil d'administration CAIREPRO ---------- */}
      <section className="section theme-light">
        <div className="container-x max-w-7xl">
          <div className="text-center">
            <h2 className="section-title">{pick(T.boardTitle)}</h2>
            <p className="body-text mx-auto mt-4 max-w-xl">{pick(T.boardText)}</p>
            <a href="https://www.cairepro.it/fr/equipe/" target="_blank" rel="noopener noreferrer" className="link-line mt-6 inline-block">
              {pick(T.boardLink)} ↗
            </a>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {board.map((p, i) => (
              <li key={p.name} className="group">
                <div className="relative overflow-hidden rounded-2xl bg-[#ececea]">
                  <img src={p.photo} alt={p.name} loading="lazy" width="500" height="600" className="aspect-[5/6] w-full object-cover grayscale transition duration-700 group-hover:scale-[1.04]" />
                  <span className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${['bg-brand-red', 'bg-brand-yellow', 'bg-brand-green'][i % 3]}`} />
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-brand-red">{pick(p.role)}</p>
                <p className="mt-1 font-serif text-2xl leading-tight">{p.name}</p>
                <p className="mt-1 text-sm text-ink/55">{pick(p.discipline)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Équipe CAIREAFRICA ---------- */}
      <div className="border-t border-ink/10">
        <TeamSection />
      </div>

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
