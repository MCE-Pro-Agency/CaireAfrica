import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import fr from './fr'
import en from './en'

const dictionaries = { fr, en }
const LANG_KEY = 'chefkara-lang'
const CONSENT_KEY = 'chefkara-consent' // 'accepted' | 'refused'

const LanguageContext = createContext(null)

// Accès au stockage protégé : il peut être indisponible (navigation privée, etc.)
const storage = {
  get(key) {
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      /* stockage indisponible : on continue sans mémoriser */
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* idem */
    }
  },
}

const resolve = (dict, key) => key.split('.').reduce((node, part) => node?.[part], dict)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => (storage.get(LANG_KEY) === 'en' ? 'en' : 'fr'))
  const [consent, setConsentState] = useState(() => storage.get(CONSENT_KEY))

  // La langue n'est mémorisée que si le visiteur n'a pas refusé.
  useEffect(() => {
    document.documentElement.lang = lang
    if (consent === 'refused') storage.remove(LANG_KEY)
    else storage.set(LANG_KEY, lang)
  }, [lang, consent])

  const setConsent = useCallback((value) => {
    setConsentState(value)
    storage.set(CONSENT_KEY, value)
  }, [])

  const value = useMemo(() => {
    // t('home.introLead') → chaîne, tableau ou objet ; repli sur le français
    const t = (key) => resolve(dictionaries[lang], key) ?? resolve(dictionaries.fr, key) ?? key
    // pick({ fr, en }) → valeur dans la langue courante (pour les données de src/data)
    const pick = (v) => (v && typeof v === 'object' && !Array.isArray(v) && 'fr' in v ? v[lang] ?? v.fr : v)
    return {
      lang,
      setLang,
      toggle: () => setLang((l) => (l === 'fr' ? 'en' : 'fr')),
      t,
      pick,
      consent,
      setConsent,
    }
  }, [lang, consent, setConsent])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage doit être utilisé dans <LanguageProvider>')
  return ctx
}
