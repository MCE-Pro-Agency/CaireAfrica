import { history } from '../../data/about'
import { useLanguage } from '../../i18n/LanguageContext'

// Frise chronologique « serpentin » (ordinateur) : 4 dates par ligne, la ligne
// fait demi-tour en bout de rangée. Mobile / tablette : liste verticale compacte.

const PER_ROW = 4
const TOP = 235 // hauteur de la zone de texte au-dessus de la ligne (px)
const LINE = 10 // épaisseur de la ligne
const ROW = TOP * 2 + LINE // hauteur d'une rangée
const R = ROW / 2 // rayon des virages

// Une couleur par date, dans l'ordre du serpentin
const COLORS = ['#CD1719', '#E04A1B', '#F07A12', '#FAB40E', '#D9B36C', '#B9A24A', '#8FA33F', '#5E9E3B', '#3A9437', '#2F8A6B', '#2B7A8C']

// Pictogrammes (traits, 24 × 24) pour chaque date
const ICONS = [
  'M5 21V4l7 3 7-3v11l-7 3-7-3', // 1947 · fondation (drapeau)
  'M4 6h16v12H4zM8 10h8M8 14h5', // 1952 · identité
  'M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4', // 1961 · prix
  'M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM9 14l-2 7 5-3 5 3-2-7', // 1962 · médaille
  'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18', // 1970 · international
  'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z', // 1986 · organisation
  'M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5zM18 19v2H6', // 1993 · archives
  'M13 2L4 14h7l-1 8 9-12h-7l1-8z', // 2007 · énergie
  'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', // 2018 · Dakar
  'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2-1-1-3-2 .5-1.5-1.5.5-2-3-1-1 2h-2l-1-2-3 1 .5 2L6 7.5 4 7 3 10l2 1v2l-2 1 1 3 2-.5L7.5 18 7 20l3 1 1-2h2l1 2 3-1-.5-2 1.5-1.5 2 .5 1-3-2-1z', // 2025 · ingénierie
  'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', // aujourd'hui
]

function Icon({ i, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICONS[i] || ICONS[0]} />
    </svg>
  )
}

function Entry({ h, i, pick, align }) {
  const c = COLORS[i % COLORS.length]
  return (
    <div className={`flex h-full flex-col px-3 text-center ${align === 'bottom' ? 'justify-end pb-6' : 'justify-start pt-6'}`}>
      <p className="font-display text-3xl font-extrabold leading-none" style={{ color: c }}>
        {pick(h.year)}
      </p>
      <h3 className="mt-2 text-[15px] font-medium leading-snug text-ivory">{pick(h.title)}</h3>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory/65">{pick(h.text)}</p>
    </div>
  )
}

export default function HistorySnake() {
  const { pick } = useLanguage()
  const rows = []
  for (let k = 0; k < history.length; k += PER_ROW) rows.push(history.slice(k, k + PER_ROW))

  return (
    <>
      {/* ---------- Ordinateur : serpentin ---------- */}
      <div className="relative hidden lg:block" style={{ paddingInline: R }}>
        {rows.map((row, r) => {
          const reverse = r % 2 === 1
          const first = r * PER_ROW
          const last = first + row.length - 1
          const from = COLORS[first % COLORS.length]
          const to = COLORS[Math.min(first + PER_ROW, history.length - 1) % COLORS.length]
          const lastRow = r === rows.length - 1
          // la dernière rangée s'arrête au dernier point
          const span = lastRow ? `${((row.length - 0.5) / PER_ROW) * 100}%` : '100%'
          return (
            <div key={r} className="relative" style={{ height: ROW }}>
              {/* ligne de la rangée */}
              <div
                className="absolute rounded-full"
                style={{
                  top: TOP,
                  height: LINE,
                  width: span,
                  [reverse ? 'right' : 'left']: r === 0 ? `${(0.5 / PER_ROW) * 100}%` : 0,
                  ...(r === 0 ? { width: `calc(100% - ${(0.5 / PER_ROW) * 100}%)` } : {}),
                  background: `linear-gradient(${reverse ? 270 : 90}deg, ${from}, ${to})`,
                }}
              />
              {/* virage vers la rangée suivante */}
              {!lastRow && (
                <div
                  className="absolute"
                  style={{
                    top: TOP,
                    height: ROW + LINE,
                    width: R,
                    [reverse ? 'right' : 'left']: '100%',
                    ...(reverse ? { right: '100%', left: 'auto' } : {}),
                    border: `${LINE}px solid ${to}`,
                    [reverse ? 'borderRight' : 'borderLeft']: 'none',
                    borderRadius: reverse ? `${R}px 0 0 ${R}px` : `0 ${R}px ${R}px 0`,
                  }}
                />
              )}
              {/* étapes */}
              <ol className={`relative grid h-full grid-cols-4 ${reverse ? '[direction:rtl]' : ''}`}>
                {row.map((h, k) => {
                  const i = first + k
                  // colonne affichée (de gauche à droite) : texte au-dessus pour les colonnes paires,
                  // en dessous pour les impaires — les textes de deux rangées voisines ne se superposent pas
                  const col = reverse ? PER_ROW - 1 - k : k
                  const up = col % 2 === 0
                  const c = COLORS[i % COLORS.length]
                  return (
                    <li key={i} className="relative [direction:ltr]">
                      <div className="absolute inset-x-0 top-0" style={{ height: TOP }}>
                        {up && <Entry h={h} i={i} pick={pick} align="bottom" />}
                      </div>
                      {/* point sur la ligne */}
                      <span
                        className={`absolute left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest ${
                          h.highlight ? 'h-14 w-14 ring-4 ring-brand-yellow/40' : 'h-11 w-11'
                        }`}
                        style={{ top: TOP + LINE / 2, border: `3px solid ${c}`, color: c }}
                      >
                        <Icon i={i} className={h.highlight ? 'h-6 w-6' : 'h-5 w-5'} />
                      </span>
                      <div className="absolute inset-x-0 bottom-0" style={{ height: TOP }}>
                        {!up && <Entry h={h} i={i} pick={pick} align="top" />}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          )
        })}
      </div>

      {/* ---------- Mobile / tablette : liste verticale ---------- */}
      <ol className="relative lg:hidden">
        <span aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-1 rounded-full bg-gradient-to-b from-brand-red via-brand-yellow to-brand-green" />
        {history.map((h, i) => {
          const c = COLORS[i % COLORS.length]
          return (
            <li key={i} className="relative flex gap-4 pb-7">
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-forest" style={{ border: `3px solid ${c}`, color: c }}>
                <Icon i={i} className="h-4 w-4" />
              </span>
              <div className={`pt-1 ${h.highlight ? 'rounded-xl bg-ink/50 p-3 ring-1 ring-brand-yellow/50' : ''}`}>
                <p className="font-display text-2xl font-extrabold leading-none" style={{ color: c }}>
                  {pick(h.year)}
                </p>
                <h3 className="mt-1.5 text-[15px] font-medium text-ivory">{pick(h.title)}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-ivory/65">{pick(h.text)}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </>
  )
}
