import { useEffect } from 'react'

// Met à jour <title> et la meta description à chaque changement de page / de langue.
export default function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title
    if (description) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', description)
    }
  }, [title, description])
}
