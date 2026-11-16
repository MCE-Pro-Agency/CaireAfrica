import { useEffect, useState } from 'react'

// Image avec repli : tant que le fichier n'existe pas dans /public/images,
// on affiche un bloc neutre portant la légende. Le site reste présentable.
export default function Media({ src, alt, className = '', eager = false }) {
  const [failed, setFailed] = useState(!src)

  useEffect(() => setFailed(!src), [src])

  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`placeholder ${className}`}>
        <span>{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
