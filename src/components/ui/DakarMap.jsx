// Plan stylisé de la presqu'île de Dakar (aucune requête externe) :
// affiché à la place de Google Maps tant que le visiteur n'a pas chargé la carte.
// Cadre 2400 × 520, centré sur le bureau (x = 1200, y = 215) pour qu'il reste visible
// quel que soit le format d'écran (le plan est recadré sur les côtés, jamais en hauteur).
const W = 2400
const H = 520
const P = (lon, lat) => [((lon + 17.4721) * 5000 + 1200).toFixed(0), ((14.7059 - lat) * 5170 + 215).toFixed(0)]
const path = (pts, close = true) => 'M' + pts.map(([lon, lat]) => P(lon, lat).join(',')).join(' L') + (close ? ' Z' : '')

// Côte (approximative), dans le sens des aiguilles d'une montre depuis la pointe des Almadies
const LAND = path([
  [-17.532, 14.745], [-17.522, 14.752], [-17.512, 14.754], [-17.495, 14.757], [-17.475, 14.762],
  [-17.45, 14.767], [-17.42, 14.773], [-17.38, 14.785], [-17.1, 14.84], [-17.1, 14.75], [-17.3, 14.742],
  [-17.37, 14.737], [-17.4, 14.728], [-17.42, 14.722], [-17.426, 14.705], [-17.423, 14.688],
  [-17.425, 14.674], [-17.432, 14.655], [-17.442, 14.66], [-17.452, 14.672], [-17.465, 14.684],
  [-17.478, 14.696], [-17.49, 14.712], [-17.505, 14.722], [-17.518, 14.73], [-17.532, 14.745],
])

const ROADS = [
  // Corniche Ouest
  path([[-17.448, 14.668], [-17.466, 14.688], [-17.49, 14.714], [-17.51, 14.728], [-17.525, 14.744]], false),
  // VDN
  path([[-17.455, 14.69], [-17.468, 14.71], [-17.468, 14.73], [-17.455, 14.75], [-17.43, 14.765]], false),
  // Route de Ouakam / aéroport
  path([[-17.44, 14.685], [-17.47, 14.715], [-17.49, 14.735], [-17.5, 14.75]], false),
  // Autoroute
  path([[-17.432, 14.69], [-17.41, 14.72], [-17.37, 14.745], [-17.3, 14.765], [-17.15, 14.78]], false),
]

const PLACES = [
  ['Almadies', -17.51, 14.737],
  ['Yoff', -17.465, 14.742],
  ['Ouakam', -17.492, 14.724],
  ['Fann', -17.457, 14.684],
  ['Plateau', -17.438, 14.672],
  ['Hann', -17.418, 14.73],
  ['Pikine', -17.37, 14.755],
]

const OFFICE = P(-17.4721, 14.7059) // Rue MZ 134, Mermoz

export default function DakarMap() {
  const [ox, oy] = OFFICE
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="dk-waves" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(243,241,236,.16)" />
        </pattern>
        <pattern id="dk-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="rgba(243,241,236,.06)" strokeWidth="1" />
        </pattern>
        <radialGradient id="dk-glow" cx={ox} cy={oy} r="260" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FAB40E" stopOpacity=".28" />
          <stop offset="1" stopColor="#FAB40E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Océan */}
      <rect width={W} height={H} fill="#4c4d4f" />
      <rect width={W} height={H} fill="url(#dk-waves)" />

      {/* Terre */}
      <path d={LAND} fill="#6a6b6d" />
      <path d={LAND} fill="url(#dk-grid)" />
      <path d={LAND} fill="none" stroke="rgba(243,241,236,.35)" strokeWidth="1.5" />
      <rect width={W} height={H} fill="url(#dk-glow)" />

      {/* Grands axes */}
      {ROADS.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(243,241,236,.28)" strokeWidth={i === 3 ? 3 : 2} strokeLinecap="round" strokeDasharray={i === 3 ? '0' : '1 0'} />
      ))}

      {/* Quartiers */}
      {PLACES.map(([name, lon, lat]) => {
        const [x, y] = P(lon, lat)
        return (
          <text key={name} x={x} y={y} textAnchor="middle" fill="rgba(243,241,236,.55)" fontSize="13" letterSpacing="3" style={{ textTransform: 'uppercase' }}>
            {name.toUpperCase()}
          </text>
        )
      })}
      <text {...{ x: P(-17.56, 14.66)[0], y: P(-17.56, 14.66)[1] }} textAnchor="middle" fill="rgba(243,241,236,.3)" fontSize="14" letterSpacing="6" fontStyle="italic">
        OCÉAN ATLANTIQUE
      </text>

      {/* Bureau CAIREAFRICA */}
      <g transform={`translate(${ox} ${oy})`}>
        <circle r="10" fill="none" stroke="#FAB40E" strokeWidth="2" className="nm-ring" style={{ transformOrigin: '0 0' }} />
        <circle r="10" fill="none" stroke="#FAB40E" strokeWidth="2" className="nm-ring" style={{ transformOrigin: '0 0', animationDelay: '1.3s' }} />
        <path d="M0 0c-9-12-14-19-14-26a14 14 0 0 1 28 0c0 7-5 14-14 26z" transform="translate(0 -2)" fill="#FAB40E" />
        <circle cy="-28" r="5" fill="#0E0E0E" />
        <text y="26" textAnchor="middle" fill="#FAB40E" fontSize="15" fontWeight="600" letterSpacing="3">
          CAIREAFRICA
        </text>
        <text y="44" textAnchor="middle" fill="rgba(243,241,236,.75)" fontSize="12" letterSpacing="2">
          MERMOZ
        </text>
      </g>
    </svg>
  )
}