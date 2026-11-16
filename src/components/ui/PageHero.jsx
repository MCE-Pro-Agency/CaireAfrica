import Media from './Media'

// En-tête de page intérieure : sur-titre, grand titre, introduction, image de fond optionnelle.
export default function PageHero({ eyebrow, heading, intro, image, children }) {
  return (
    <section className="relative overflow-hidden">
      {image && (
        <>
          <Media src={image} alt="" eager className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
        </>
      )}
      <div className="container-x relative pb-16 pt-40 md:pb-20 md:pt-48">
        {eyebrow && <p className="eyebrow animate-fadeUp">{eyebrow}</p>}
        <h1 className="mt-5 max-w-3xl animate-fadeUp text-5xl leading-[1.05] md:text-7xl">{heading}</h1>
        {intro && <p className="body-text mt-8 max-w-2xl animate-fadeUp">{intro}</p>}
        {children}
      </div>
    </section>
  )
}
