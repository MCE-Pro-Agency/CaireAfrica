import { useState } from 'react'
import { site, whatsappLink } from '../../data/site'
import { useLanguage } from '../../i18n/LanguageContext'

const emptyForm = { name: '', organisation: '', email: '', phone: '', preferred: '', message: '' }

// Formulaire de contact.
// Pas de serveur : la demande s'ouvre dans la messagerie du visiteur (ou WhatsApp), pré-remplie,
// à destination de site.email. Pour un envoi direct sans quitter le site (Formspree, EmailJS,
// Supabase…), remplacer le contenu de handleSubmit par l'appel au service choisi.
export default function ContactForm() {
  const { t } = useLanguage()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  const labels = t('form.labels')
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    if (!form.name.trim() || !form.message.trim() || (!form.email.trim() && !form.phone.trim())) return t('form.required')
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return t('form.errorEmail')
    return ''
  }

  const buildMessage = () =>
    [
      t('form.messageIntro'),
      '',
      ...Object.keys(emptyForm)
        .filter((key) => form[key].trim())
        .map((key) => `${labels[key]} : ${form[key].trim()}`),
    ].join('\n')

  const send = (channel) => {
    const problem = validate()
    setError(problem)
    if (problem) return
    const message = buildMessage()
    if (channel === 'whatsapp') {
      window.open(whatsappLink(message), '_blank', 'noopener')
    } else {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(t('form.mailSubject'))}&body=${encodeURIComponent(message)}`
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    send('email')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <label>
          <span className="field-label">{t('form.name')} *</span>
          <input type="text" className="field" autoComplete="name" value={form.name} onChange={update('name')} />
        </label>
        <label>
          <span className="field-label">{t('form.organisation')}</span>
          <input type="text" className="field" autoComplete="organization" value={form.organisation} onChange={update('organisation')} />
        </label>
        <label>
          <span className="field-label">{t('form.email')}</span>
          <input type="email" className="field" autoComplete="email" value={form.email} onChange={update('email')} />
        </label>
        <label>
          <span className="field-label">{t('form.phone')}</span>
          <input type="tel" className="field" autoComplete="tel" value={form.phone} onChange={update('phone')} />
        </label>

        <fieldset className="sm:col-span-2">
          <legend className="field-label">{t('form.preferred')}</legend>
          <div className="mt-2 flex flex-wrap gap-3">
            {t('form.channels').map((channel) => (
              <button
                key={channel}
                type="button"
                aria-pressed={form.preferred === channel}
                onClick={() => setForm((f) => ({ ...f, preferred: f.preferred === channel ? '' : channel }))}
                className={`border px-5 py-2.5 text-sm transition-colors ${
                  form.preferred === channel ? 'border-ivory bg-ivory text-ink' : 'border-ivory/25 hover:border-ivory'
                }`}
              >
                {channel}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="sm:col-span-2">
          <span className="field-label">{t('form.message')} *</span>
          <textarea rows="5" className="field resize-none" value={form.message} onChange={update('message')} />
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-6 text-sm text-[#E8B4A0]">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
        <button type="submit" className="btn-solid">
          {t('form.send')}
        </button>
        <button type="button" className="btn-ghost" onClick={() => send('whatsapp')}>
          {t('form.sendWhatsapp')}
        </button>
      </div>
    </form>
  )
}