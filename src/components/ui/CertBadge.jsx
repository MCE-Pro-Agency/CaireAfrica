// Écusson de certification (forme de blason, coche « certifié »), dessiné en SVG.
// Props : norm (ex. « ISO 9001:2015 »), line (sous-titre), label (mot central), status (« CERTIFIÉ »), color
export default function CertBadge({ norm, line, label, status, color = '#A3222F', className = 'h-36 w-32' }) {
  const shield = 'M8 6h104v72c0 30-24 47-52 58C32 125 8 108 8 78z'
  const id = `cb-${norm.replace(/[^a-z0-9]/gi, '')}` // identifiant SVG valide (sans espace ni « : »)
  return (
    <svg viewBox="0 0 120 140" className={className} role="img" aria-label={`${norm} — ${label} — ${status}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".18" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={shield} fill={color} />
      <path d={shield} fill={`url(#${id})`} />
      <path d="M14 12h92v66c0 26-21 41-46 51C35 119 14 104 14 78z" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />

      <text x="60" y="30" textAnchor="middle" fill="#fff" fontSize={norm.length > 14 ? 10 : 11.5} fontWeight="700" letterSpacing=".3">
        {norm}
      </text>
      <text x="60" y="41" textAnchor="middle" fill="#fff" fillOpacity=".85" fontSize="5.6" letterSpacing="1">
        {line}
      </text>
      <line x1="22" y1="47" x2="98" y2="47" stroke="#fff" strokeOpacity=".5" strokeWidth=".8" />
      <text x="60" y="64" textAnchor="middle" fill="#fff" fontSize={label.length > 11 ? 9.2 : label.length > 8 ? 11 : 14} fontWeight="800" letterSpacing="1.2">
        {label}
      </text>
      <text x="60" y="75" textAnchor="middle" fill="#fff" fillOpacity=".9" fontSize="6.2" letterSpacing="1.6">
        {status}
      </text>
      <circle cx="60" cy="96" r="12" fill="none" stroke="#fff" strokeWidth="2.6" />
      <path d="M54 96l4.5 4.5L67 91" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
