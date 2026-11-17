import ContactForm from '../components/sections/ContactForm'
import Media from '../components/ui/Media'
import { site } from '../data/site'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  usePageMeta(t('contact.title'), t('contact.description'))

  return (
    <div className="grid min-h-screen lg:grid-cols-5">
      {/* Colonne gauche : coordonnées */}
      <aside className="relative flex items-end overflow-hidden lg:col-span-2">
        <Media src="/images/contact/bureau.jpg" alt="" eager className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
        <div className="relative w-full px-6 pb-12 pt-36 md:px-10 lg:pb-20">
          <h1 className="text-4xl md:text-5xl">{t('contact.heading')}</h1>
          <p className="body-text mt-5 max-w-sm">{t('contact.text')}</p>

          <p className="eyebrow mt-10">{t('contact.office')}</p>
          <ul className="mt-3 max-w-sm divide-y divide-ivory/15 border-y border-ivory/15 font-serif text-xl">
            <li className="py-4">
              {site.address}
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block font-sans text-xs text-ivory/60 hover:text-ivory">
                {t('contact.map')}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="block py-4 transition-colors hover:text-white">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="block break-all py-4 transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>

          <p className="eyebrow mt-10">{t('contact.direct')}</p>
          <ul className="mt-3 max-w-sm divide-y divide-ivory/15 border-y border-ivory/15 font-serif text-xl">
            <li className="py-4">
              {site.contactPerson}
              <a href={site.contactPhoneHref} className="mt-1 block transition-colors hover:text-white">
                {site.contactPhoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="block py-4 transition-colors hover:text-white">
                WhatsApp →
              </a>
            </li>
          </ul>
          <p className="mt-3 max-w-sm text-xs text-ivory/50">{t('contact.directNote')}</p>
        </div>
      </aside>

      {/* Colonne droite : formulaire */}
      <section className="px-6 py-16 md:px-10 lg:col-span-3 lg:px-16 lg:pt-40">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h2 className="mt-5 text-4xl md:text-6xl">{t('contact.formHeading')}</h2>
          <p className="body-text mb-12 mt-5">{t('contact.formIntro')}</p>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}