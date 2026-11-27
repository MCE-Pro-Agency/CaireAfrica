import { Link } from 'react-router-dom'
import { team } from '../../data/team'
import { useLanguage } from '../../i18n/LanguageContext'
import BrandBar from '../ui/BrandBar'

// Section « L'équipe » de l'accueil.
// Ordinateur : grille 4 × 2, l'en-tête occupe la première case.
// Mobile / tablette : en-tête au-dessus, portraits qui défilent au doigt.

const copy = {
  eyebrow: { fr: 'L’équipe', en: 'The team' },
  title: { fr: 'Les visages de ', en: 'The faces' },
  titleAccent: { fr: ' CAIREAFRICA.', en: ' CAIREAFRICA.' },
  text: {
    fr: 'Architectes, ingénieurs et chefs de projet entre Dakar et l’Italie : une équipe pluridisciplinaire, un seul interlocuteur.',
    en: 'Architects, engineers and project managers between Dakar and Italy: one multidisciplinary team, a single point of contact.',
  },
  stat: { fr: 'professionnels avec CAIREPRO', en: 'professionals with CAIREPRO' },
  link: { fr: 'Contacter l’équipe', en: 'Contact the team' },
  swipe: { fr: 'Faites glisser', en: 'Swipe' },
}

// Filet de couleur sous chaque portrait, à tour de rôle
const accents = ['bg-brand-red', 'bg-brand-yellow', 'bg-brand-green']

function Intro({ pick }) {
  return (
    <div className="flex flex-col justify-between lg:pr-6">
      <div>
        <h2 className="mt-5 text-4xl leading-[1.05] md:text-5xl">
          {pick(copy.title)}
          <br />
          <em className="text-brand-red">{pick(copy.titleAccent)}</em>
        </h2>
        <BrandBar className="mt-7" />
        <p className="body-text mt-7 max-w-md">{pick(copy.text)}</p>
      </div>
      <div className="mt-10 flex items-end justify-between gap-6 border-t border-ink/15 pt-6 lg:flex-col lg:items-start">
        <p className="leading-none">
          <span className="font-serif text-5xl">+50</span>
          <span className="mt-2 block text-[10px] uppercase tracking-[0.25em] text-ink/60">{pick(copy.stat)}</span>
        </p>
        <Link to="/contact" className="link-line shrink-0">
          {pick(copy.link)} →
        </Link>
      </div>
    </div>
  )
}

function Member({ person, index, pick }) {
  const role = pick(person.role)
  return (
    <figure className="group relative">
      <div className="relative overflow-hidden bg-[#ececea]">
        <img
          src={person.photo}
          alt={person.name}
          width="500"
          height="600"
          loading="lazy"
          className="aspect-[5/6] w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 text-[10px] tracking-[0.25em] text-ink/50">
          {String(index + 1).padStart(2, '0')}
        </span>
        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn — ${person.name}`}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-ink text-[11px] font-medium text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus:opacity-100"
          >
            in
          </a>
        )}
        {/* filet qui se déploie au survol */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${accents[index % 3]}`}
        />
      </div>
      <figcaption className="mt-4">
        <p className="font-serif text-2xl leading-tight">{person.name}</p>
        {role && <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-ink/60">{role}</p>}
      </figcaption>
    </figure>
  )
}

export default function TeamSection() {
  const { pick } = useLanguage()

  return (
    <section id="equipe" className="section theme-light scroll-mt-[72px] overflow-hidden">
      {/* Ordinateur : grille 4 × 2 */}
      <div className="container-x hidden max-w-7xl gap-x-6 gap-y-14 lg:grid lg:grid-cols-4">
        <Intro pick={pick} />
        {team.map((person, i) => (
          <Member key={person.name} person={person} index={i} pick={pick} />
        ))}
      </div>

      {/* Mobile / tablette : défilement horizontal */}
      <div className="lg:hidden">
        <div className="container-x">
          <Intro pick={pick} />
        </div>
        <div className="mt-12 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-4 md:scroll-px-10 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden">
          {team.map((person, i) => (
            <div key={person.name} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] md:w-[30vw]">
              <Member person={person} index={i} pick={pick} />
            </div>
          ))}
          <span aria-hidden="true" className="w-1 shrink-0" />
        </div>
        <p className="container-x mt-4 text-[10px] uppercase tracking-[0.25em] text-ink/50">{pick(copy.swipe)} →</p>
      </div>
    </section>
  )
}