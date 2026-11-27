
import { useLanguage } from '../../i18n/LanguageContext'
import BrandBar from '../ui/BrandBar'

export default function Hero3D() {
  const { pick } = useLanguage()

  return (
    <section
      id="hero"
      className="
        relative isolate flex
        min-h-[calc(100svh-72px)]
        w-full items-center justify-center
        overflow-hidden bg-[#101010]
      "
    >
      {/* Image de fond */}
      <img
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="
          absolute inset-0 h-full w-full
          object-cover object-center
        "
      />

      {/* Voile sombre sur la photographie */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/50"
      />

      {/* Dégradé vers la section suivante */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(16, 16, 16, 0.05) 0%,
            rgba(16, 16, 16, 0.08) 40%,
            rgba(16, 16, 16, 0.45) 70%,
            #101010 100%
          )`,
        }}
      />

      {/* Contenu central */}
      <div
        className="
          relative z-10 mx-auto flex w-full
          max-w-6xl flex-col items-center
          px-5 py-16 text-center
          text-ivory md:pb-28
        "
      >

        {/* Symbole CAIREAFRICA */}
        <svg
          viewBox="0 0 400 350"
          className="
            mb-8 h-auto w-16
            md:mb-10 md:w-24
          "
          aria-hidden="true"
        >
          <polygon
            points="100,0 300,0 400,175 300,350 100,350 0,175"
            fill="#F8F4E9"
          />

          <polygon
            points="114,25 285,25 365,167 112,167 74,95"
            fill="#D41217"
          />

          <polygon
            points="64,112 30,173 95,173"
            fill="#FFB500"
          />

          <polygon
            points="33,184 194,184 279,325 113,325"
            fill="#FFB500"
          />

          <polygon
            points="211,177 368,177 291,312"
            fill="#388C32"
          />
        </svg>

        {/* Nom de l'entreprise */}
        <h1
          className="
            font-display font-normal
            text-[clamp(1.65rem,5.1vw,5.75rem)]
            leading-none tracking-[0.14em]
            md:tracking-[0.22em]
          "
        >
          CAIREAFRICA
        </h1>

        {/* Domaines d'activité */}
        <p
          className="
            mt-8 flex flex-wrap
            items-center justify-center
            gap-x-4 gap-y-3
            text-[9px] font-medium uppercase
            tracking-[0.18em] text-ivory/90
            md:mt-10 md:text-[11px]
            md:tracking-[0.25em]
          "
        >
          <span>
            {pick({
              fr: 'Architecture',
              en: 'Architecture',
            })}
          </span>

          <span className="text-ivory/40">|</span>

          <span>
            {pick({
              fr: 'Ingénierie',
              en: 'Engineering',
            })}
          </span>

          <span className="text-ivory/40">|</span>

          <span>
            {pick({
              fr: 'Dakar · Afrique de l’Ouest',
              en: 'Dakar · West Africa',
            })}
          </span>
        </p>

        {/* Barre aux couleurs de la marque */}
        <BrandBar className="mx-auto mt-8 md:mt-10" />

        
{/* Slogan */}
<p
  className="
    mt-8 max-w-3xl
    text-xl italic leading-relaxed
    text-ivory/95
    md:mt-9 md:text-[28px]
  "
  style={{
    fontFamily: '"Times New Roman", Georgia, serif',
    fontWeight: 400,
    fontStyle: 'italic',
    letterSpacing: '-0.5px',
  }}
>
  {pick({
    fr: 'L’excellence architecturale au service de vos ambitions.',
    en: 'Architectural excellence in service of your ambitions.',
  })}
</p>


      </div>
    </section>
  )
}
