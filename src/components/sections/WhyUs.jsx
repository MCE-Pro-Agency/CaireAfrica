
import { Link } from 'react-router-dom'
import { references } from '../../data/references'
import { useLanguage } from '../../i18n/LanguageContext'
import BrandBar from '../ui/BrandBar'

const fr = (fr, en) => ({ fr, en })

const countries = new Set(references.map((p) => p.country)).size

const REASONS = [
  {
    value: '78+',
    unit: fr('ans', 'years'),
    title: fr(
      'L’expérience d’un groupe fondé en 1947',
      'The experience of a group founded in 1947',
    ),
    text: fr(
      'CAIREPRO, notre maison mère, conçoit des bâtiments depuis près de 80 ans en Italie et à l’international.',
      'CAIREPRO, our parent company, has been designing buildings for nearly 80 years in Italy and abroad.',
    ),
    icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  },
  {
    value: '1',
    unit: fr('interlocuteur', 'contact'),
    title: fr(
      'Du concept à la direction des travaux',
      'From concept to site supervision',
    ),
    text: fr(
      'Une seule équipe pour tout le cycle : études, conception, BIM, sécurité, suivi de chantier. Moins d’intermédiaires, plus de maîtrise.',
      'One team for the whole cycle: studies, design, BIM, safety, site supervision. Fewer intermediaries, more control.',
    ),
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5',
  },
  {
    value: '+50',
    unit: fr('professionnels', 'professionals'),
    title: fr(
      'Toutes les compétences, réunies',
      'Every skill, under one roof',
    ),
    text: fr(
      'Architectes, ingénieurs, spécialistes BIM et techniciens travaillent ensemble selon une méthode commune, avec 9 expertises intégrées.',
      'Architects, engineers, BIM specialists and technicians work together with a shared method, across 9 integrated areas of expertise.',
    ),
    icon: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20a6 6 0 0 1 12 0M10 20a6 6 0 0 1 12 0',
  },
  {
    value: 'Dakar',
    unit: fr('depuis 2018', 'since 2018'),
    title: fr(
      'Savoir-faire italien, ancrage local',
      'Italian know-how, local roots',
    ),
    text: fr(
      'Notre bureau de Mermoz connaît le terrain, les réglementations et les entreprises du Sénégal et de l’Afrique de l’Ouest.',
      'Our Mermoz office knows the ground, the regulations and the contractors of Senegal and West Africa.',
    ),
    icon: 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  },
  {
    value: 'ISO',
    unit: '9001 · 14001 · 45001',
    title: fr('Une qualité certifiée', 'Certified quality'),
    text: fr(
      'Les systèmes de management de CAIREPRO sont certifiés pour la qualité, l’environnement, la santé et la sécurité au travail.',
      'CAIREPRO’s management systems are certified for quality, environment, and occupational health and safety.',
    ),
    icon: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zm-3 9l2 2 4-4',
  },
  {
    value: String(references.length),
    unit: fr(
      `références · ${countries} pays`,
      `references · ${countries} countries`,
    ),
    title: fr(
      'Des projets qui parlent pour nous',
      'Projects that speak for us',
    ),
    text: fr(
      'Campus, résidences, cliniques, bureaux, infrastructures : des réalisations au Sénégal, en Gambie, au Bénin, en Côte d’Ivoire et au-delà.',
      'Campuses, residences, clinics, offices, infrastructure: work in Senegal, The Gambia, Benin, Côte d’Ivoire and beyond.',
    ),
    icon: 'M4 21V9l8-6 8 6v12M9 21v-6h6v6',
  },
]

// Répartition des arguments selon la maquette
const LEFT_REASONS = [
  REASONS[0],
  REASONS[3],
  REASONS[4],
]

const RIGHT_REASONS = [
  REASONS[2],
  REASONS[1],
  REASONS[5],
]

// Composant : argument sans carte
function ReasonItem({ reason, side, pick }) {
  const isLeft = side === 'left'

  const accent = isLeft
    ? 'text-brand-red'
    : 'text-brand-green'

  const accentBorder = isLeft
    ? 'border-brand-red'
    : 'border-brand-green'

  return (
    <li
      className="
        group flex flex-col justify-center
        border-b border-ink/20
        py-7 last:border-b-0
        first:pt-0 last:pb-0
        lg:py-8
      "
    >
      {/* Icône, chiffre clé et unité */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="
            h-9 w-9 shrink-0 text-ink
            transition-transform duration-300
            motion-safe:group-hover:scale-110
          "
          aria-hidden="true"
        >
          <path d={reason.icon} />
        </svg>

        <div
          className={`
            flex flex-wrap items-baseline
            gap-x-4 gap-y-1 border-l-2 pl-4
            ${accentBorder}
          `}
        >
          <span
            className={`
              font-display text-4xl font-extrabold
              leading-none xl:text-5xl
              ${accent}
            `}
          >
            {reason.value}
          </span>

          <span className="
            text-[10px] uppercase
            tracking-[0.18em] text-ink/65
            xl:text-[11px]
          ">
            {typeof reason.unit === 'string'
              ? reason.unit
              : pick(reason.unit)}
          </span>
        </div>
      </div>

      {/* Titre */}
      <h3 className="
        mt-4 font-display text-xl
        font-extrabold leading-snug
        text-ink xl:text-[22px]
      ">
        {pick(reason.title)}
      </h3>

      {/* Description */}
      <p className="
        mt-2 text-[15px] leading-relaxed
        text-ink/75
      ">
        {pick(reason.text)}
      </p>
    </li>
  )
}

// Logo central et arcs décoratifs
function CentralLogo() {
  return (
    <div className="
      relative mx-auto flex w-full
      max-w-[340px] items-center justify-center
      lg:max-w-none
    ">
      <svg
        viewBox="0 0 400 460"
        className="h-auto w-full"
        role="img"
        aria-label="CAIREAFRICA"
      >
        {/* Arcs décoratifs supérieurs */}
        <g
          fill="none"
          stroke="#C8C1B7"
          strokeWidth="0.9"
          opacity="0.7"
          aria-hidden="true"
        >
          <path d="M 24 116 A 200 200 0 0 1 180 12" />

          <path d="M 220 12 A 200 200 0 0 1 376 116" />

          {/* Arcs décoratifs inférieurs */}
          <path d="M 24 344 A 200 200 0 0 0 180 448" />

          <path d="M 220 448 A 200 200 0 0 0 376 344" />
        </g>

        {/* Symbole géométrique CAIREAFRICA */}
        <g transform="translate(55 103) scale(0.725)">

          {/* Structure noire */}
          <polygon
            points="100,0 300,0 400,175 300,350 100,350 0,175"
            fill="#080808"
          />

          {/* Partie rouge */}
          <polygon
            points="114,25 285,25 365,167 112,167 74,95"
            fill="#D41217"
          />

          {/* Petit triangle jaune */}
          <polygon
            points="64,112 30,173 95,173"
            fill="#FFB500"
          />

          {/* Partie jaune inférieure */}
          <polygon
            points="33,184 194,184 279,325 113,325"
            fill="#FFB500"
          />

          {/* Partie verte */}
          <polygon
            points="211,177 368,177 291,312"
            fill="#388C32"
          />

        </g>
      </svg>
    </div>
  )
}

export default function WhyUs() {
  const { pick } = useLanguage()

  return (
    <section
      id="confiance"
      className="
        section theme-light relative
        scroll-mt-[72px] overflow-hidden
        !bg-[#F6F3EF]
      "
    >
      <div className="container-x max-w-[1500px]">

        {/* Titre principal */}
        <div className="text-center">
          <h2 className="section-title">
            {pick(fr('Pourquoi nous faire', 'Why trust'))}{' '}
            <em className="text-brand-red">
              {pick(fr('confiance ?', 'us?'))}
            </em>
          </h2>

          <BrandBar className="mx-auto mt-6" />
        </div>

        {/* Composition principale : texte / logo / texte */}
        <div className="
          mt-12 grid grid-cols-1
          items-stretch gap-10
          md:grid-cols-2
          lg:mt-16
          lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1fr)]
          lg:gap-8
          xl:gap-12
        ">

          {/* Colonne gauche : rouge */}
          <ul className="
            order-2 grid grid-rows-3
            lg:order-1
          ">
            {LEFT_REASONS.map((reason) => (
              <ReasonItem
                key={reason.value}
                reason={reason}
                side="left"
                pick={pick}
              />
            ))}
          </ul>

          {/* Logo au milieu sur ordinateur,
              au-dessus des arguments sur mobile */}
          <div className="
            order-1 flex items-center justify-center
            px-12 py-2
            md:col-span-2
            md:px-0
            lg:order-2
            lg:col-span-1
          ">
            <CentralLogo />
          </div>

          {/* Colonne droite : vert */}
          <ul className="
            order-3 grid grid-rows-3
          ">
            {RIGHT_REASONS.map((reason) => (
              <ReasonItem
                key={reason.value}
                reason={reason}
                side="right"
                pick={pick}
              />
            ))}
          </ul>

        </div>

        {/* Boutons d'action */}
        <div className="
          mt-12 flex flex-wrap
          items-center gap-x-8 gap-y-4
          lg:mt-16
        ">
          <Link
            to="/contact"
            className="
              btn rounded-full bg-ink
              text-ivory hover:bg-brand-red
            "
          >
            {pick(
              fr(
                'Parlons de votre projet',
                'Let’s discuss your project',
              ),
            )} →
          </Link>

          <Link
            to="/a-propos"
            className="link-line"
          >
            {pick(
              fr(
                'Découvrir CAIREAFRICA',
                'Discover CAIREAFRICA',
              ),
            )}
          </Link>
        </div>

      </div>
    </section>
  )
}
