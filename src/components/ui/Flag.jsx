// Petits drapeaux en SVG (nets à toutes les tailles, aucune image à charger).
// Usage : <Flag code="sn" className="h-4 w-6" />
// Codes : sn (Sénégal), bf (Burkina Faso), ci (Côte d'Ivoire), bj (Bénin), gm (Gambie),
//         ly (Libye), it (Italie), om (Oman).

// Étoile à 5 branches centrée en (cx, cy), rayon extérieur r
function star(cx, cy, r) {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 ? r * 0.382 : r
    const a = (Math.PI / 5) * i - Math.PI / 2
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`)
  }
  return pts.join(' ')
}

const FLAGS = {
  sn: (
    <>
      <rect width="10" height="20" fill="#00853F" />
      <rect x="10" width="10" height="20" fill="#FDEF42" />
      <rect x="20" width="10" height="20" fill="#E31B23" />
      <polygon points={star(15, 10.4, 3.6)} fill="#00853F" />
    </>
  ),
  bf: (
    <>
      <rect width="30" height="10" fill="#EF2B2D" />
      <rect y="10" width="30" height="10" fill="#009E49" />
      <polygon points={star(15, 10.3, 3.8)} fill="#FCD116" />
    </>
  ),
  ci: (
    <>
      <rect width="10" height="20" fill="#F77F00" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#009E60" />
    </>
  ),
  bj: (
    <>
      <rect width="12" height="20" fill="#008751" />
      <rect x="12" width="18" height="10" fill="#FCD116" />
      <rect x="12" y="10" width="18" height="10" fill="#E8112D" />
    </>
  ),
  gm: (
    <>
      <rect width="30" height="20" fill="#FFFFFF" />
      <rect width="30" height="6.4" fill="#CE1126" />
      <rect y="7.6" width="30" height="4.8" fill="#0C1C8C" />
      <rect y="13.6" width="30" height="6.4" fill="#3A7728" />
    </>
  ),
  ly: (
    <>
      <rect width="30" height="5" fill="#E70013" />
      <rect y="5" width="30" height="10" fill="#000000" />
      <rect y="15" width="30" height="5" fill="#239E46" />
      <circle cx="14.2" cy="10" r="3.1" fill="#FFFFFF" />
      <circle cx="15" cy="10" r="2.5" fill="#000000" />
      <polygon points={star(17.6, 10, 1.6)} fill="#FFFFFF" />
    </>
  ),
  it: (
    <>
      <rect width="10" height="20" fill="#009246" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#CE2B37" />
    </>
  ),
  om: (
    <>
      <rect width="30" height="20" fill="#DB161B" />
      <rect x="8" width="22" height="6.67" fill="#FFFFFF" />
      <rect x="8" y="13.33" width="22" height="6.67" fill="#008000" />
    </>
  ),
}

export default function Flag({ code, className = 'h-4 w-6', title }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`shrink-0 overflow-hidden rounded-[3px] shadow-[0_1px_4px_rgba(0,0,0,.45)] ring-1 ring-white/25 ${className}`}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : 'true'}
    >
      {FLAGS[code]}
    </svg>
  )
}
