// Filet aux trois couleurs du logo — seul accent coloré du site.
export default function BrandBar({ className = '' }) {
  return (
    <span aria-hidden="true" className={`flex h-[3px] w-16 ${className}`}>
      <span className="flex-1 bg-brand-red" />
      <span className="flex-1 bg-brand-yellow" />
      <span className="flex-1 bg-brand-green" />
    </span>
  )
}