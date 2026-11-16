// Monogramme « K » cerclé
export default function Logo({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="25" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <text x="32" y="42" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="28" fill="currentColor">
        K
      </text>
    </svg>
  )
}
