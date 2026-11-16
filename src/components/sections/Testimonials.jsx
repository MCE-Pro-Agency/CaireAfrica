import { testimonials } from '../../data/testimonials'
import { useLanguage } from '../../i18n/LanguageContext'

function Card({ item, hidden = false }) {
  const { pick } = useLanguage()
  return (
    <figure aria-hidden={hidden || undefined} className="flex w-[320px] shrink-0 flex-col border border-ivory/10 bg-coal p-7 md:w-[380px]">
      <p className="flex items-center gap-2 text-sm">
        <span aria-hidden="true">★</span>
        <span className="font-serif text-xl">{item.rating}</span>
      </p>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ivory/80">{item.text}</blockquote>
      <figcaption className="mt-6 border-t border-ivory/10 pt-4">
        <p className="text-sm">{item.author}</p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ivory/50">{pick(item.date)}</p>
      </figcaption>
    </figure>
  )
}

// Bandeau d'avis défilant (pause au survol ; défilement manuel si animations réduites).
export default function Testimonials({ eyebrow }) {
  const { t } = useLanguage()

  return (
    <section className="section border-y border-ivory/10">
      <div className="container-x">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <p className="lead max-w-3xl">{t('ratingLine')}</p>
      </div>
      <div className="group mt-12 overflow-x-auto [scrollbar-width:none]">
        <div className="flex w-max animate-marquee gap-6 px-6 group-hover:[animation-play-state:paused]">
          {testimonials.map((item) => (
            <Card key={item.author} item={item} />
          ))}
          {/* Copie décorative pour une boucle continue */}
          {testimonials.map((item) => (
            <Card key={`${item.author}-copie`} item={item} hidden />
          ))}
        </div>
      </div>
    </section>
  )
}
