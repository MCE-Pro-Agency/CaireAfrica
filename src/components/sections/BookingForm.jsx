import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getMenu, menus } from '../../data/menus'
import { site, whatsappLink } from '../../data/site'
import { useLanguage } from '../../i18n/LanguageContext'

const emptyForm = { occasion: '', date: '', guests: '', city: '', menu: '', notes: '', name: '', email: '', phone: '', message: '' }

// Formulaire de réservation en 4 étapes.
// Pas de serveur : la demande part par WhatsApp ou par e-mail, pré-remplie.
// Pour brancher un back-end (Supabase, Formspree…), remplacer les liens de l'étape 4
// par un envoi dans une fonction handleSubmit.
export default function BookingForm() {
  const { t } = useLanguage()
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    menu: getMenu(params.get('menu')) ? params.get('menu') : params.get('menu') === 'sur-mesure' ? 'sur-mesure' : '',
  }))

  const steps = t('form.steps')
  const labels = t('form.labels')
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const menuLabel = form.menu === 'sur-mesure' ? t('form.menuCustom') : getMenu(form.menu)?.name ?? ''

  // Récapitulatif : uniquement les champs renseignés
  const summary = useMemo(
    () =>
      [
        [labels.occasion, form.occasion],
        [labels.date, form.date],
        [labels.guests, form.guests],
        [labels.city, form.city],
        [labels.menu, menuLabel],
        [labels.notes, form.notes],
        [labels.name, form.name],
        [labels.email, form.email],
        [labels.phone, form.phone],
        [labels.message, form.message],
      ].filter(([, value]) => value),
    [form, labels, menuLabel],
  )

  const message = [t('form.messageIntro'), '', ...summary.map(([label, value]) => `${label} : ${value}`)].join('\n')
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`${t('form.mailSubject')} — ${form.name}`)}&body=${encodeURIComponent(message)}`

  const validate = () => {
    if (step === 0 && !form.occasion) return t('form.errorOccasion')
    if (step === 2) {
      if (!form.name.trim() || (!form.email.trim() && !form.phone.trim())) return t('form.errorIdentity')
      if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) return t('form.errorEmail')
    }
    return ''
  }

  const next = (e) => {
    e.preventDefault()
    const problem = validate()
    setError(problem)
    if (!problem) setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const back = () => {
    setError('')
    setStep((s) => Math.max(s - 1, 0))
  }

  return (
    <form onSubmit={next} noValidate>
      {/* Progression */}
      <ol className="grid grid-cols-4 gap-3">
        {steps.map((label, i) => (
          <li key={label} aria-current={i === step ? 'step' : undefined} className={`border-t pt-3 transition-colors ${i <= step ? 'border-ivory' : 'border-ivory/15'}`}>
            <span className={`block text-xs ${i <= step ? 'text-ivory' : 'text-ivory/40'}`}>{i + 1}</span>
            <span className={`mt-1 hidden text-xs sm:block ${i === step ? 'text-ivory' : 'text-ivory/40'}`}>{label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 min-h-[300px]">
        {step === 0 && (
          <fieldset>
            <legend className="font-serif text-3xl">{t('form.occasionTitle')}</legend>
            <p className="mt-2 text-sm text-ivory/60">{t('form.occasionHint')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {t('form.occasions').map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={form.occasion === option}
                  onClick={() => {
                    setForm((f) => ({ ...f, occasion: option }))
                    setError('')
                  }}
                  className={`border px-5 py-3 text-sm transition-colors ${
                    form.occasion === option ? 'border-ivory bg-ivory text-ink' : 'border-ivory/25 hover:border-ivory'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="font-serif text-3xl">{t('form.detailsTitle')}</legend>
            <p className="mt-2 text-sm text-ivory/60">{t('form.detailsHint')}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <label>
                <span className="field-label">{t('form.date')}</span>
                <input type="date" className="field [color-scheme:dark]" value={form.date} onChange={update('date')} />
              </label>
              <label>
                <span className="field-label">{t('form.guests')}</span>
                <input type="number" min="1" inputMode="numeric" className="field" value={form.guests} onChange={update('guests')} />
              </label>
              <label>
                <span className="field-label">{t('form.city')}</span>
                <input type="text" className="field" autoComplete="address-level2" value={form.city} onChange={update('city')} />
              </label>
              <label>
                <span className="field-label">{t('form.menu')}</span>
                <select className="field [color-scheme:dark]" value={form.menu} onChange={update('menu')}>
                  <option value="">{t('form.menuNone')}</option>
                  {menus.map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {m.name}
                    </option>
                  ))}
                  <option value="sur-mesure">{t('form.menuCustom')}</option>
                </select>
              </label>
              <label className="sm:col-span-2">
                <span className="field-label">{t('form.notes')}</span>
                <textarea rows="3" className="field resize-none" value={form.notes} onChange={update('notes')} />
              </label>
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-serif text-3xl">{t('form.youTitle')}</legend>
            <p className="mt-2 text-sm text-ivory/60">{t('form.youHint')}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="field-label">{t('form.name')} *</span>
                <input type="text" className="field" autoComplete="name" value={form.name} onChange={update('name')} />
              </label>
              <label>
                <span className="field-label">{t('form.email')}</span>
                <input type="email" className="field" autoComplete="email" value={form.email} onChange={update('email')} />
              </label>
              <label>
                <span className="field-label">{t('form.phone')}</span>
                <input type="tel" className="field" autoComplete="tel" value={form.phone} onChange={update('phone')} />
              </label>
              <label className="sm:col-span-2">
                <span className="field-label">{t('form.message')}</span>
                <textarea rows="3" className="field resize-none" value={form.message} onChange={update('message')} />
              </label>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-serif text-3xl">{t('form.reviewTitle')}</h3>
            <p className="mt-2 text-sm text-ivory/60">{t('form.reviewHint')}</p>
            <dl className="mt-6 divide-y divide-ivory/10 border-y border-ivory/10">
              {summary.map(([label, value]) => (
                <div key={label} className="grid grid-cols-3 gap-4 py-3 text-sm">
                  <dt className="text-ivory/50">{label}</dt>
                  <dd className="col-span-2 whitespace-pre-line">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-[#E8B4A0]">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {step > 0 && (
          <button type="button" onClick={back} className="btn-ghost">
            {t('form.back')}
          </button>
        )}
        {step < steps.length - 1 ? (
          <button type="submit" className="btn-solid">
            {t('form.next')}
          </button>
        ) : (
          <>
            <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-solid">
              {t('form.sendWhatsapp')}
            </a>
            <a href={mailto} className="btn-ghost">
              {t('form.sendEmail')}
            </a>
          </>
        )}
      </div>
    </form>
  )
}
