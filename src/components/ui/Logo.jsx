// Logo CAIREAFRICA.
//   variant="mark"  → hexagone seul
//   variant="full"  → hexagone + nom + « Architecture Ingénierie »
// Les fichiers « -dark » sont la version pour fond sombre (contours et texte ivoire),
// générée à partir du logo officiel : à faire valider par CAIREAFRICA.
// Les originaux (fond clair) sont dans /images/brand/logo.png et mark.png.
const files = {
  mark: { src: '/images/brand/mark-dark.png', width: 455, height: 400 },
  full: { src: '/images/brand/logo-dark.png', width: 1635, height: 300 },
}

export default function Logo({ variant = 'mark', className = 'h-10 w-auto', alt = '' }) {
  const file = files[variant]
  return <img src={file.src} width={file.width} height={file.height} alt={alt} className={className} />
}