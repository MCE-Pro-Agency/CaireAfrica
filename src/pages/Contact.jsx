import BookingForm from '../components/sections/BookingForm'
import Media from '../components/ui/Media'
import { site } from '../data/site'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  usePageMeta(t('contact.title'), t('contact.description'))

  return (
    <div className="grid min-h-screen lg:grid-cols-5">
      {/* Colonne gauche : coordonnées directes */}
      <aside className="relative flex items-end overflow-hidden lg:col-span-2">
        <Media src="/images/contact/table.jpg" alt="" eager className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="relative w-full px-6 pb-12 pt-36 md:px-10 lg:pb-20">
          <h1 className="text-4xl md:text-5xl">{t('contact.heading')}</h1>
          <p className="body-text mt-5 max-w-sm">{t('contact.text')}</p>
          <ul className="mt-8 max-w-sm divide-y divide-ivory/15 border-y border-ivory/15 font-serif text-xl">
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
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="block py-4 transition-colors hover:text-white">
                WhatsApp →
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Colonne droite : formulaire */}
      <section className="px-6 py-16 md:px-10 lg:col-span-3 lg:px-16 lg:pt-40">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h2 className="mt-5 text-4xl md:text-6xl">{t('contact.formHeading')}</h2>
          <p className="body-text mb-12 mt-5">{t('contact.formIntro')}</p>
          <BookingForm />
        </div>
      </section>
    </div>
  )
}
