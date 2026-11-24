import { testimonials } from '../../data/testimonials'
import { useLanguage } from '../../i18n/LanguageContext'

// Les cartes reprennent à tour de rôle les trois couleurs du logo
const accents = ['border-t-brand-red', 'border-t-brand-yellow', 'border-t-brand-green']

function Card({ item, index, hidden = false, light }) {
  const { pick } = useLanguage()
  return (
    <figure
      aria-hidden={hidden || undefined}
      className={`flex w-[320px] shrink-0 flex-col p-7 md:w-[380px] ${
        light ? `border-t-4 bg-white shadow-sm ${accents[index % accents.length]}` : 'border border-ivory/10 bg-coal'
      }`}
    >
      <p className="flex items-center gap-2 text-sm">
        <span aria-hidden="true" className={light ? 'text-brand-yellow' : undefined}>★</span>
        <span className="font-serif text-xl">{item.rating}</span>
      </p>
      <blockquote className={`mt-4 flex-1 text-sm leading-relaxed ${light ? 'text-ink/75' : 'text-ivory/80'}`}>{item.text}</blockquote>
      <figcaption className={`mt-6 border-t pt-4 ${light ? 'border-ink/10' : 'border-ivory/10'}`}>
        <p className="text-sm">{item.author}</p>
        <p className={`mt-1 text-[11px] uppercase tracking-[0.2em] ${light ? 'text-ink/50' : 'text-ivory/50'}`}>{pick(item.date)}</p>
      </figcaption>
    </figure>
  )
}

// Bandeau d'avis défilant (pause au survol ; défilement manuel si animations réduites).
// light : version fond ivoire (page d'accueil).
export default function Testimonials({ eyebrow, light = false }) {
  const { t } = useLanguage()

  return (
    <section className={`section ${light ? 'theme-light border-t border-ink/10' : 'border-y border-ivory/10'}`}>
      <div className="container-x">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <p className="lead max-w-3xl">{t('ratingLine')}</p>
      </div>
      <div className="group mt-12 overflow-x-auto pb-2 [scrollbar-width:none]">
        <div className="flex w-max animate-marquee gap-6 px-6 group-hover:[animation-play-state:paused]">
          {testimonials.map((item, i) => (
            <Card key={item.author} item={item} index={i} light={light} />
          ))}
          {/* Copie décorative pour une boucle continue */}
          {testimonials.map((item, i) => (
            <Card key={`${item.author}-copie`} item={item} index={i} light={light} hidden />
          ))}
        </div>
      </div>
    </section>
  )
}