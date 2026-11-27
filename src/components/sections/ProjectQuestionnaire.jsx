import { useMemo, useState } from 'react'
import { expertises } from '../../data/expertises'
import { site, whatsappLink } from '../../data/site'
import { useLanguage } from '../../i18n/LanguageContext'

// Questionnaire de contact en 5 étapes (fond vert, textes dorés).
// Les réponses sont mises en forme puis envoyées par e-mail (à site.email) ou par WhatsApp.
// Pour un envoi sans quitter le site (Formspree, EmailJS…), remplacer le contenu de send().

const fr = (fr, en) => ({ fr, en })

const PROFILES = [
  fr('Entreprise / investisseur', 'Company / investor'),
  fr('Institution / organisme public', 'Institution / public body'),
  fr('Promoteur immobilier', 'Property developer'),
  fr('Particulier', 'Private client'),
  fr('Entreprise italienne / européenne', 'Italian / European company'),
  fr('Partenaire technique / bureau d’études', 'Technical partner / engineering firm'),
  fr('Autre', 'Other'),
]
const TYPES = [
  fr('Résidentiel', 'Residential'),
  fr('Éducation', 'Education'),
  fr('Santé', 'Healthcare'),
  fr('Bureaux et commerces', 'Offices & retail'),
  fr('Industrie et logistique', 'Industry & logistics'),
  fr('Bâtiment institutionnel', 'Institutional building'),
  fr('Hôtellerie et loisirs', 'Hospitality & leisure'),
  fr('Autre', 'Other'),
]
const NATURES = [fr('Construction neuve', 'New build'), fr('Réhabilitation', 'Refurbishment'), fr('Extension', 'Extension')]
const STAGES = [
  fr('Une idée à étudier', 'An idea to explore'),
  fr('Terrain identifié', 'Site identified'),
  fr('Études en cours', 'Studies under way'),
  fr('Permis obtenu', 'Permit granted'),
  fr('Travaux en cours', 'Works under way'),
]
const TIMINGS = [fr('Dès que possible', 'As soon as possible'), fr('Dans les 6 mois', 'Within 6 months'), fr('Dans 6 à 12 mois', 'In 6 to 12 months'), fr('Plus tard', 'Later')]
const BUDGETS = [
  fr('Moins de 330 M FCFA (500 k€)', 'Under 330M FCFA (€500k)'),
  fr('330 M à 1,3 Md FCFA (0,5 à 2 M€)', '330M to 1.3bn FCFA (€0.5–2M)'),
  fr('1,3 à 6,5 Md FCFA (2 à 10 M€)', '1.3 to 6.5bn FCFA (€2–10M)'),
  fr('Plus de 6,5 Md FCFA (10 M€)', 'Over 6.5bn FCFA (€10M)'),
  fr('À définir ensemble', 'To be discussed'),
]
const COUNTRIES = [
  fr('Sénégal', 'Senegal'),
  fr('Côte d’Ivoire', 'Côte d’Ivoire'),
  fr('Gambie', 'The Gambia'),
  fr('Bénin', 'Benin'),
  fr('Burkina Faso', 'Burkina Faso'),
  fr('Mali', 'Mali'),
  fr('Guinée', 'Guinea'),
  fr('Mauritanie', 'Mauritania'),
  fr('Autre pays', 'Other country'),
]
const CHANNELS = [fr('E-mail', 'E-mail'), fr('Appel', 'Call'), fr('WhatsApp', 'WhatsApp')]
const DONT_KNOW = fr('Je ne sais pas encore', 'Not sure yet')

const L = {
  step: fr('Étape', 'Step'),
  of: fr('sur', 'of'),
  titles: [
    fr('Vous êtes…', 'You are…'),
    fr('Votre projet', 'Your project'),
    fr('De quoi avez-vous besoin ?', 'What do you need?'),
    fr('Où en êtes-vous ?', 'Where do you stand?'),
    fr('Comment vous joindre ?', 'How can we reach you?'),
  ],
  hints: [
    fr('Choisissez la réponse qui vous correspond.', 'Choose the answer that fits you.'),
    fr('Le type de bâtiment et la nature de l’intervention.', 'The type of building and the kind of work.'),
    fr('Plusieurs réponses possibles.', 'Several answers possible.'),
    fr('Stade, lieu, calendrier et budget (facultatif).', 'Stage, location, timing and budget (optional).'),
    fr('Nous revenons vers vous rapidement.', 'We will get back to you quickly.'),
  ],
  type: fr('Type de bâtiment', 'Building type'),
  nature: fr('Nature de l’intervention', 'Type of work'),
  stage: fr('Avancement', 'Stage'),
  country: fr('Pays', 'Country'),
  city: fr('Ville / quartier', 'City / district'),
  timing: fr('Calendrier souhaité', 'Desired timing'),
  budget: fr('Budget estimé (facultatif)', 'Estimated budget (optional)'),
  name: fr('Nom et prénom *', 'Full name *'),
  org: fr('Société / institution', 'Company / institution'),
  email: fr('E-mail', 'E-mail'),
  phone: fr('Téléphone / WhatsApp', 'Phone / WhatsApp'),
  pref: fr('Je préfère être contacté par', 'I prefer to be contacted by'),
  message: fr('Quelques mots sur votre projet (facultatif)', 'A few words about your project (optional)'),
  prev: fr('Précédent', 'Back'),
  next: fr('Suivant', 'Next'),
  review: fr('Voir le récapitulatif', 'Review my answers'),
  summary: fr('Récapitulatif', 'Summary'),
  edit: fr('Modifier', 'Edit'),
  sendMail: fr('Envoyer par e-mail', 'Send by e-mail'),
  sendWa: fr('Envoyer par WhatsApp', 'Send via WhatsApp'),
  required: fr('Indiquez votre nom et au moins un moyen de vous joindre (e-mail ou téléphone).', 'Please give your name and at least one way to reach you (e-mail or phone).'),
  badEmail: fr('Cette adresse e-mail semble incomplète.', 'This e-mail address looks incomplete.'),
  thanks: fr('Merci ! Votre demande est prête.', 'Thank you! Your request is ready.'),
  thanksText: fr(
    'Votre messagerie (ou WhatsApp) s’est ouverte avec votre demande : il ne vous reste qu’à l’envoyer. Notre équipe vous répond rapidement.',
    'Your e-mail app (or WhatsApp) has opened with your request: just press send. Our team will reply quickly.',
  ),
  restart: fr('Nouvelle demande', 'New request'),
  subject: fr('Nouveau projet — demande depuis le site', 'New project — website enquiry'),
  intro: fr('Bonjour, voici ma demande :', 'Hello, here is my request:'),
}

// Toutes les options, pour retraduire une réponse enregistrée (clé = libellé français)
const ALL = [...PROFILES, ...TYPES, ...NATURES, ...STAGES, ...TIMINGS, ...BUDGETS, ...COUNTRIES, ...CHANNELS, DONT_KNOW, ...expertises.map((e) => e.title)]

const empty = {
  profile: '',
  type: '',
  nature: '',
  needs: [],
  stage: '',
  country: '',
  city: '',
  timing: '',
  budget: '',
  name: '',
  org: '',
  email: '',
  phone: '',
  pref: '',
  message: '',
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2.5 text-left text-sm transition ${
        active ? 'border-[#D9B36C] bg-[#D9B36C] text-forest' : 'border-[#D9B36C]/35 text-[#D9B36C] hover:border-[#D9B36C]'
      }`}
    >
      {active && <span aria-hidden="true">✓ </span>}
      {children}
    </button>
  )
}

function Group({ label, children }) {
  return (
    <fieldset className="mt-7 first:mt-0">
      {label && <legend className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#D9B36C]/75">{label}</legend>}
      <div className="flex flex-wrap gap-2.5">{children}</div>
    </fieldset>
  )
}

const fieldCls =
  'w-full border-b border-[#D9B36C]/35 bg-transparent py-3 text-base text-[#D9B36C] placeholder-[#D9B36C]/35 outline-none transition focus:border-[#D9B36C]'

export default function ProjectQuestionnaire() {
  const { pick } = useLanguage()
  const [step, setStep] = useState(0)
  const [a, setA] = useState(empty)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const total = 5
  const review = step === total

  const set = (k, v) => setA((s) => ({ ...s, [k]: v }))
  const one = (k, v) => set(k, a[k] === v ? '' : v)
  const many = (v) => set('needs', a.needs.includes(v) ? a.needs.filter((x) => x !== v) : [...a.needs, v])

  const canNext = [Boolean(a.profile), Boolean(a.type), a.needs.length > 0, Boolean(a.stage), true][step] ?? true

  const contactProblem = () => {
    if (!a.name.trim() || (!a.email.trim() && !a.phone.trim())) return pick(L.required)
    if (a.email.trim() && !/^\S+@\S+\.\S+$/.test(a.email.trim())) return pick(L.badEmail)
    return ''
  }

  const next = () => {
    if (step === total - 1) {
      const p = contactProblem()
      setError(p)
      if (p) return
    }
    setError('')
    setStep((s) => Math.min(total, s + 1))
  }

  const tr = (v) => (v ? pick(ALL.find((o) => o.fr === v) || v) : '')

  // Lignes du récapitulatif (et du message envoyé)
  const lines = useMemo(
    () =>
      [
        [L.titles[0], tr(a.profile)],
        [L.type, tr(a.type)],
        [L.nature, tr(a.nature)],
        [L.titles[2], a.needs.map(tr).join(', ')],
        [L.stage, tr(a.stage)],
        [L.country, [a.city, tr(a.country)].filter(Boolean).join(', ')],
        [L.timing, tr(a.timing)],
        [L.budget, tr(a.budget)],
        [L.name, a.name],
        [L.org, a.org],
        [L.email, a.email],
        [L.phone, a.phone],
        [L.pref, tr(a.pref)],
        [L.message, a.message],
      ].filter(([, v]) => v && String(v).trim()),
    [a, pick], // eslint-disable-line react-hooks/exhaustive-deps
  )
  const labelOf = (l) => pick(l).replace(/ \*|\s*\(.*\)$/g, '')

  const send = (channel) => {
    const body = [pick(L.intro), '', ...lines.map(([l, v]) => `• ${labelOf(l)} : ${String(v).trim()}`)].join('\n')
    if (channel === 'whatsapp') window.open(whatsappLink(body), '_blank', 'noopener')
    else window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(pick(L.subject))}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="py-8 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#D9B36C] text-2xl text-forest">✓</span>
        <h3 className="mt-6 font-display text-3xl font-extrabold">{pick(L.thanks)}</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#D9B36C]/80">{pick(L.thanksText)}</p>
        <button
          type="button"
          onClick={() => {
            setA(empty)
            setStep(0)
            setSent(false)
          }}
          className="btn mt-8 rounded-full border border-[#D9B36C] text-[#D9B36C] hover:bg-[#D9B36C] hover:text-forest"
        >
          {pick(L.restart)}
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Progression */}
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#D9B36C]/75">
        <span>{review ? pick(L.summary) : `${pick(L.step)} ${step + 1} ${pick(L.of)} ${total}`}</span>
        <span className="tabular-nums">{Math.round((Math.min(step, total) / total) * 100)} %</span>
      </div>
      <div className="mt-3 flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${pick(L.step)} ${i + 1}`}
            disabled={i > step}
            onClick={() => setStep(i)}
            className={`h-1.5 flex-1 rounded-full transition ${i < step || review ? 'bg-[#D9B36C]' : i === step ? 'bg-[#D9B36C]/60' : 'bg-[#D9B36C]/15'}`}
          />
        ))}
      </div>

      {!review ? (
        <div key={step} className="mt-8 animate-fadeUp">
          <h3 className="font-display text-2xl font-extrabold md:text-3xl">{pick(L.titles[step])}</h3>
          <p className="mt-1 text-sm text-[#D9B36C]/65">{pick(L.hints[step])}</p>

          <div className="mt-7">
            {step === 0 && (
              <Group>
                {PROFILES.map((o) => (
                  <Chip key={o.fr} active={a.profile === o.fr} onClick={() => one('profile', o.fr)}>
                    {pick(o)}
                  </Chip>
                ))}
              </Group>
            )}

            {step === 1 && (
              <>
                <Group label={pick(L.type)}>
                  {TYPES.map((o) => (
                    <Chip key={o.fr} active={a.type === o.fr} onClick={() => one('type', o.fr)}>
                      {pick(o)}
                    </Chip>
                  ))}
                </Group>
                <Group label={pick(L.nature)}>
                  {NATURES.map((o) => (
                    <Chip key={o.fr} active={a.nature === o.fr} onClick={() => one('nature', o.fr)}>
                      {pick(o)}
                    </Chip>
                  ))}
                </Group>
              </>
            )}

            {step === 2 && (
              <Group>
                {[...expertises.map((e) => e.title), DONT_KNOW].map((o) => (
                  <Chip key={o.fr} active={a.needs.includes(o.fr)} onClick={() => many(o.fr)}>
                    {pick(o)}
                  </Chip>
                ))}
              </Group>
            )}

            {step === 3 && (
              <>
                <Group label={pick(L.stage)}>
                  {STAGES.map((o) => (
                    <Chip key={o.fr} active={a.stage === o.fr} onClick={() => one('stage', o.fr)}>
                      {pick(o)}
                    </Chip>
                  ))}
                </Group>
                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <label>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9B36C]/75">{pick(L.country)}</span>
                    <select value={a.country} onChange={(e) => set('country', e.target.value)} className={`${fieldCls} cursor-pointer [&>option]:text-ink`}>
                      <option value="">—</option>
                      {COUNTRIES.map((o) => (
                        <option key={o.fr} value={o.fr}>
                          {pick(o)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9B36C]/75">{pick(L.city)}</span>
                    <input value={a.city} onChange={(e) => set('city', e.target.value)} className={fieldCls} placeholder="Dakar, Almadies…" />
                  </label>
                </div>
                <Group label={pick(L.timing)}>
                  {TIMINGS.map((o) => (
                    <Chip key={o.fr} active={a.timing === o.fr} onClick={() => one('timing', o.fr)}>
                      {pick(o)}
                    </Chip>
                  ))}
                </Group>
                <Group label={pick(L.budget)}>
                  {BUDGETS.map((o) => (
                    <Chip key={o.fr} active={a.budget === o.fr} onClick={() => one('budget', o.fr)}>
                      {pick(o)}
                    </Chip>
                  ))}
                </Group>
              </>
            )}

            {step === 4 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    ['name', L.name, 'text', 'name'],
                    ['org', L.org, 'text', 'organization'],
                    ['email', L.email, 'email', 'email'],
                    ['phone', L.phone, 'tel', 'tel'],
                  ].map(([k, label, type, auto]) => (
                    <label key={k}>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9B36C]/75">{pick(label)}</span>
                      <input type={type} autoComplete={auto} value={a[k]} onChange={(e) => set(k, e.target.value)} className={fieldCls} />
                    </label>
                  ))}
                </div>
                <Group label={pick(L.pref)}>
                  {CHANNELS.map((o) => (
                    <Chip key={o.fr} active={a.pref === o.fr} onClick={() => one('pref', o.fr)}>
                      {pick(o)}
                    </Chip>
                  ))}
                </Group>
                <label className="mt-7 block">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9B36C]/75">{pick(L.message)}</span>
                  <textarea rows="3" value={a.message} onChange={(e) => set('message', e.target.value)} className={`${fieldCls} resize-none`} />
                </label>
              </>
            )}
          </div>
        </div>
      ) : (
        /* Récapitulatif */
        <div className="mt-8 animate-fadeUp">
          <h3 className="font-display text-2xl font-extrabold md:text-3xl">{pick(L.summary)}</h3>
          <dl className="mt-6 divide-y divide-[#D9B36C]/15 border-y border-[#D9B36C]/15">
            {lines.map(([l, v]) => (
              <div key={l.fr} className="grid gap-1 py-3 sm:grid-cols-[180px_1fr] sm:gap-4">
                <dt className="text-[11px] uppercase tracking-[0.18em] text-[#D9B36C]/60">{labelOf(l)}</dt>
                <dd className="text-[15px] text-[#D9B36C]">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => send('email')} className="btn rounded-full bg-[#D9B36C] text-forest hover:bg-ivory">
              {pick(L.sendMail)}
            </button>
            <button type="button" onClick={() => send('whatsapp')} className="btn rounded-full border border-[#D9B36C] text-[#D9B36C] hover:bg-[#D9B36C] hover:text-forest">
              {pick(L.sendWa)}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-6 rounded-xl bg-brand-red/15 px-4 py-3 text-sm text-[#F3C9B8]">
          {error}
        </p>
      )}

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between gap-4 border-t border-[#D9B36C]/15 pt-6">
        <button
          type="button"
          onClick={() => {
            setError('')
            setStep((s) => Math.max(0, s - 1))
          }}
          className={`text-[11px] uppercase tracking-[0.2em] text-[#D9B36C]/75 transition hover:text-[#D9B36C] ${step === 0 ? 'invisible' : ''}`}
        >
          ← {review ? pick(L.edit) : pick(L.prev)}
        </button>
        {!review && (
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className="btn rounded-full bg-[#D9B36C] text-forest transition hover:bg-ivory disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-[#D9B36C]"
          >
            {step === total - 1 ? pick(L.review) : pick(L.next)} →
          </button>
        )}
      </div>
    </div>
  )
}
