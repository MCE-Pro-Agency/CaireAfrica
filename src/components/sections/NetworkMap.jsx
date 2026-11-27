import { useLanguage } from '../../i18n/LanguageContext'
import Flag from '../ui/Flag'

// Carte des liaisons (bandeau de la page Expertises) : toutes les liaisons
// convergent vers le Sénégal (Dakar), en bas au centre. Chaque pays : nom + drapeau.
const W = 1400 // cadre élargi : la carte occupe toute la largeur utile
const H = 600
const GOLD = '#D9B36C' // jaune doré

const HUB = { name: { fr: 'Sénégal', en: 'Senegal' }, code: 'sn', at: [700, 535] }
// at : position dans le cadre 1400 × 600 · side : position du nom par rapport au point
// code : drapeau (voir ui/Flag.jsx) · flag : drapeau au-dessus ('top') ou au-dessous ('bottom') du nom
const PLACES = [
  { name: { fr: 'Burkina Faso', en: 'Burkina Faso' }, code: 'bf', at: [168, 120], side: 't', flag: 'top' },
  { name: { fr: 'Côte d’Ivoire', en: 'Côte d’Ivoire' }, code: 'ci', at: [133, 255], side: 'b', flag: 'bottom' },
  { name: { fr: 'Bénin', en: 'Benin' }, code: 'bj', at: [420, 190], side: 't', flag: 'top' },
  { name: { fr: 'Gambie', en: 'The Gambia' }, code: 'gm', at: [518, 345], side: 'l', flag: 'bottom' },
  { name: { fr: 'Libye', en: 'Libya' }, code: 'ly', at: [896, 250], side: 'l', flag: 'top' },
  { name: { fr: 'Italie', en: 'Italy' }, code: 'it', at: [1106, 85], side: 't', flag: 'top' },
  { name: { fr: 'Oman', en: 'Oman' }, code: 'om', at: [1281, 200], side: 'r', flag: 'bottom' },
]

// Courbe d'un lieu vers Dakar (même tracé que la carte REVA)
function arc([x, y]) {
  const [hx, hy] = HUB.at
  const mx = (hx + x) / 2
  const my = (hy + y) / 2
  const dx = x - hx
  const len = Math.hypot(dx, y - hy)
  const cx = mx + (dx > 0 ? -1 : 1) * len * 0.08
  const cy = my - Math.abs(dx / len) * len * 0.28 - 30
  return `M${hx},${hy} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x},${y}`
}

const SIDE = {
  t: 'left-1/2 bottom-4 -translate-x-1/2',
  b: 'left-1/2 top-4 -translate-x-1/2',
  l: 'right-5 top-1/2 -translate-y-1/2',
  r: 'left-5 top-1/2 -translate-y-1/2',
}
// alignement du drapeau et du nom selon le côté
const ALIGN = { t: 'items-center', b: 'items-center', l: 'items-end', r: 'items-start' }

export default function NetworkMap() {
  const { pick } = useLanguage()

  return (
    <div className="px-10 sm:px-8 md:px-0">
      <div
        className="relative mx-auto aspect-[1400/600] w-full max-w-[1600px]"
        role="img"
        aria-label={pick({ fr: 'Liaisons entre Dakar et les lieux des projets', en: 'Links between Dakar and project locations' })}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <pattern id="nm-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.3" fill="rgba(217,179,108,.28)" />
            </pattern>
            <radialGradient id="nm-fade" cx="50%" cy="60%" r="65%">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="nm-mask">
              <rect width={W} height={H} fill="url(#nm-fade)" />
            </mask>
            <linearGradient id="nm-arc" x1="0" x2="1">
              <stop offset="0" stopColor={GOLD} stopOpacity=".55" />
              <stop offset=".5" stopColor={GOLD} />
              <stop offset="1" stopColor={GOLD} stopOpacity=".55" />
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill="url(#nm-dots)" mask="url(#nm-mask)" />

          {PLACES.map((p, i) => {
            const d = arc(p.at)
            return (
              <g key={p.code}>
                <path d={d} fill="none" stroke={GOLD} strokeOpacity=".12" strokeWidth="9" strokeLinecap="round" />
                <path
                  d={d}
                  fill="none"
                  stroke="url(#nm-arc)"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeDasharray="9 8"
                  className="nm-arc"
                  style={{ animationDelay: `${0.3 + i * 0.15}s` }}
                />
                <circle r="5" fill="#FFE3A3" style={{ filter: `drop-shadow(0 0 8px ${GOLD})` }}>
                  <animateMotion
                    dur={`${3.2 + i * 0.45}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.5}s`}
                    path={d}
                    keyPoints={i % 2 ? '1;0' : '0;1'}
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                </circle>
              </g>
            )
          })}

          {[HUB, ...PLACES].map((p, i) => (
            <g key={p.code}>
              <circle
                cx={p.at[0]}
                cy={p.at[1]}
                r={i ? 13 : 24}
                fill="none"
                stroke={GOLD}
                strokeWidth="1.8"
                strokeOpacity=".85"
                className="nm-ring"
                style={{ animationDelay: `${i * 0.35}s`, transformOrigin: `${p.at[0]}px ${p.at[1]}px` }}
              />
              <circle cx={p.at[0]} cy={p.at[1]} r={i ? 6.5 : 10} fill={GOLD} style={{ filter: `drop-shadow(0 0 6px ${GOLD})` }} />
            </g>
          ))}
        </svg>

        {/* Noms des lieux */}
        {PLACES.map((p, i) => (
          <span key={p.code} className="absolute z-10" style={{ left: `${(p.at[0] / W) * 100}%`, top: `${(p.at[1] / H) * 100}%` }}>
            <span
              className={`nm-tag absolute flex gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] sm:gap-2 sm:text-base lg:text-lg ${
                p.flag === 'bottom' ? 'flex-col-reverse' : 'flex-col'
              } ${ALIGN[p.side]} ${SIDE[p.side]}`}
              style={{ color: GOLD, animationDelay: `${0.5 + i * 0.12}s` }}
            >
              <Flag code={p.code} className="h-3.5 w-[21px] sm:h-5 sm:w-[30px]" />
              <span className="hidden sm:inline">{pick(p.name)}</span>
            </span>
          </span>
        ))}
        <span className="absolute z-10" style={{ left: `${(HUB.at[0] / W) * 100}%`, top: `${(HUB.at[1] / H) * 100}%` }}>
          <span
            className="nm-tag absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap font-display text-2xl font-extrabold uppercase tracking-[0.15em] sm:text-4xl"
            style={{ color: GOLD, animationDelay: '0.4s' }}
          >
            <Flag code={HUB.code} className="h-4 w-6 sm:h-6 sm:w-9" />
            {pick(HUB.name)}
          </span>
        </span>
      </div>

      {/* Mobile : légende des drapeaux (les noms ne tiennent pas sur la carte) */}
      <ul className="mx-auto mt-14 grid max-w-sm grid-cols-2 gap-x-6 gap-y-3 sm:hidden">
        {PLACES.map((p) => (
          <li key={p.code} className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: GOLD }}>
            <Flag code={p.code} className="h-3.5 w-[21px]" />
            {pick(p.name)}
          </li>
        ))}
      </ul>
    </div>
  )
}
