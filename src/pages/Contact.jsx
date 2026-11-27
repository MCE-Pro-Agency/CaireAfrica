import { useEffect, useState } from 'react'
import ProjectQuestionnaire from '../components/sections/ProjectQuestionnaire'
import BrandBar from '../components/ui/BrandBar'
import DakarMap from '../components/ui/DakarMap'
import { site } from '../data/site'
import usePageMeta from '../hooks/usePageMeta'
import { useLanguage } from '../i18n/LanguageContext'

// Page /contact : bandeau (accès rapides + carte d'Antonio Armaroli), e-mails directs,
// bureaux, réseaux sociaux, formulaire, carte Google Maps chargée seulement au clic.

const L = {
  metaTitle: { fr: 'Contact — CAIREAFRICA', en: 'Contact — CAIREAFRICA' },
  metaDesc: {
    fr: 'Contactez CAIREAFRICA à Dakar : e-mail, appel ou WhatsApp, formulaire de contact et localisation du bureau de Mermoz.',
    en: 'Contact CAIREAFRICA in Dakar: e-mail, call or WhatsApp, contact form and location of the Mermoz office.',
  },
  eyebrow: { fr: 'Contact', en: 'Contact' },
  title1: { fr: 'Parlons de', en: 'Let’s talk about' },
  title2: { fr: 'votre projet.', en: 'your project.' },
  lead: {
    fr: 'Entreprises, institutions, promoteurs ou particuliers : dites-nous où vous en êtes. Notre équipe vous répond en français comme en anglais.',
    en: 'Companies, institutions, developers or private clients: tell us where you stand. Our team answers in French and in English.',
  },
  email: { fr: 'E-mail', en: 'E-mail' },
  call: { fr: 'Appeler', en: 'Call' },
  dakarNow: { fr: 'À Dakar, il est', en: 'In Dakar, it is' },
  open: { fr: 'bureau ouvert', en: 'office open' },
  closed: { fr: 'réponse dès l’ouverture', en: 'we reply when we open' },
  direct: { fr: 'Contact direct', en: 'Direct contact' },
  role: { fr: 'Responsable CAIREAFRICA · Architecte', en: 'Head of CAIREAFRICA · Architect' },
  italian: {
    fr: 'Numéro italien : précisez si vous souhaitez être contacté par appel ou par message WhatsApp.',
    en: 'Italian number: let us know whether you prefer a call or a WhatsApp message.',
  },
  mailsEyebrow: { fr: 'Écrivez directement', en: 'Write directly' },
  copy: { fr: 'Copier', en: 'Copy' },
  copied: { fr: 'Copié ✓', en: 'Copied ✓' },
  general: { fr: 'Contact général', en: 'General enquiries' },
  officesEyebrow: { fr: 'Nos bureaux', en: 'Our offices' },
  dakarOffice: { fr: 'Bureau CAIREAFRICA', en: 'CAIREAFRICA office' },
  italyOffice: { fr: 'Siège CAIREPRO', en: 'CAIREPRO head office' },
  itinerary: { fr: 'Itinéraire', en: 'Directions' },
  socialEyebrow: { fr: 'Suivez-nous', en: 'Follow us' },
  formEyebrow: { fr: '5 questions · 2 minutes', en: '5 questions · 2 minutes' },
  formTitle: { fr: 'Parlez-nous de votre projet', en: 'Tell us about your project' },
  formIntro: {
    fr: 'Répondez à quelques questions simples : nous recevons tout ce qu’il faut pour vous rappeler avec une première réponse adaptée.',
    en: 'Answer a few simple questions: we receive everything we need to call you back with a first, relevant answer.',
  },
  mapTitle: { fr: 'Nous trouver à Dakar', en: 'Find us in Dakar' },
  mapLoad: { fr: 'Afficher la carte', en: 'Show the map' },
  mapNote: {
    fr: 'La carte est fournie par Google Maps, qui peut déposer des cookies : elle ne se charge que si vous cliquez.',
    en: 'The map is provided by Google Maps, which may set cookies: it only loads if you click.',
  },
}

const PEOPLE = [
  { name: site.contactPerson, role: L.role, mail: 'antonio.armaroli@cairepro.it', photo: '/images/equipe/antonio-armaroli.jpg' },
  { name: 'Mario Trabucchi', role: { fr: 'Concepteur', en: 'Designer' }, mail: 'mario.trabucchi@cairepro.it', photo: '/images/equipe/mario-trabucchi.jpg' },
]

const OFFICES = [
  {
    label: L.dakarOffice,
    city: 'Dakar · Sénégal',
    address: site.address,
    phone: [site.phoneDisplay, site.phoneHref],
    maps: site.mapsUrl,
  },
  {
    label: L.italyOffice,
    city: 'Reggio Emilia · Italie',
    address: 'Via Meuccio Ruini, 6, Reggio Emilia',
    phone: ['+39 0522 1538501', 'tel:+3905221538501'],
    mail: 'segreteria@cairepro.it',
    maps: 'https://www.google.com/maps/search/?api=1&query=Via+Meuccio+Ruini+6+Reggio+Emilia',
  },
]

const MAP_EMBED = 'https://www.google.com/maps?q=Rue+MZ+134,+Mermoz,+Dakar&z=16&output=embed'

// Pictogrammes
const I = {
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  pin: 'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  wa: 'M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm4.3 12.3c-.2.6-1.1 1.1-1.6 1.1-.4.1-1 .1-3.1-.8a10.6 10.6 0 0 1-4-3.6 4.6 4.6 0 0 1-1-2.4 2.6 2.6 0 0 1 .8-1.9c.2-.2.4-.3.6-.3h.4c.2 0 .3 0 .5.4l.7 1.6c0 .2 0 .3 0 .4l-.3.5-.4.4c-.1.1-.2.3 0 .5a7 7 0 0 0 1.3 1.6 6.3 6.3 0 0 0 1.8 1.1c.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3a2 2 0 0 1-.1 1.2z',
}
const Icon = ({ d, className = 'h-5 w-5', fill = false }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

function useDakarClock(lang) {
  const read = () => {
    const now = new Date()
    const time = new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Dakar' }).format(now)
    const h = parseInt(new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hourCycle: 'h23', timeZone: 'Africa/Dakar' }).format(now), 10)
    const day = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'Africa/Dakar' }).format(now)
    return { time, open: h >= 9 && h < 18 && !['Sat', 'Sun'].includes(day) }
  }
  const [state, setState] = useState(read)
  useEffect(() => {
    setState(read())
    const id = setInterval(() => setState(read()), 30000)
    return () => clearInterval(id)
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps
  return state
}

function CopyMail({ mail, pick }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(mail)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      window.location.href = `mailto:${mail}`
    }
  }
  return (
    <button type="button" onClick={copy} className="shrink-0 rounded-full border border-ink/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-ink/60 transition hover:border-ink hover:text-ink">
      {done ? pick(L.copied) : pick(L.copy)}
    </button>
  )
}

export default function Contact() {
  const { pick, lang } = useLanguage()
  usePageMeta(pick(L.metaTitle), pick(L.metaDesc))
  const clock = useDakarClock(lang)
  const [mapOn, setMapOn] = useState(false)
  const socials = site.socials.filter((s) => s.href)

  return (
    <>
      {/* ---------- Bandeau ---------- */}
      <section className="relative overflow-hidden bg-[#4c4d4f] pb-20 pt-[72px] md:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_20%,rgba(250,180,14,.14),transparent_50%),radial-gradient(ellipse_at_0%_100%,rgba(58,148,55,.16),transparent_55%)]" />
        <div className="container-x relative grid max-w-7xl items-center gap-14 pt-14 md:pt-20 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-fadeUp">
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.02em] sm:text-7xl">
              {pick(L.title1)}
              <br />
              <em className="font-semibold text-brand-yellow">{pick(L.title2)}</em>
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ivory/75">{pick(L.lead)}</p>

            {/* Accès rapides */}
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn rounded-full bg-brand-yellow text-ink hover:bg-ivory">
                <Icon d={I.mail} className="h-4 w-4" /> {pick(L.email)}
              </a>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn rounded-full bg-[#25D366] text-ink hover:bg-ivory">
                <Icon d={I.wa} fill className="h-4 w-4" /> WhatsApp
              </a>
              <a href={site.contactPhoneHref} className="btn rounded-full border border-ivory/40 text-ivory hover:border-brand-yellow hover:text-brand-yellow">
                <Icon d={I.phone} className="h-4 w-4" /> {pick(L.call)}
              </a>
            </div>

            <p className="mt-10 flex items-center gap-3 text-sm text-ivory/60">
              <span className={`h-2 w-2 rounded-full ${clock.open ? 'animate-pulse bg-brand-green' : 'bg-ivory/30'}`} />
              {pick(L.dakarNow)} <b className="font-medium tabular-nums text-ivory">{clock.time}</b> — {pick(clock.open ? L.open : L.closed)}
            </p>
          </div>

          {/* Carte de contact direct */}
          <aside className="relative animate-fadeUp">
            <div aria-hidden="true" className="absolute -inset-3 -rotate-2 rounded-[2rem] bg-brand-yellow/15" />
            <div className="relative overflow-hidden rounded-3xl bg-ivory text-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
              <div className="flex items-end gap-5 bg-[#ececea] p-6 pb-0">
                <img src={PEOPLE[0].photo} alt={PEOPLE[0].name} width="500" height="600" className="h-40 w-32 object-cover object-top grayscale" />
                <div className="pb-6">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-brand-red">{pick(L.direct)}</p>
                  <p className="mt-2 font-display text-2xl font-extrabold leading-tight">{PEOPLE[0].name}</p>
                  <p className="mt-1 text-sm text-ink/60">{pick(L.role)}</p>
                </div>
              </div>
              <BrandBar className="!h-1 !w-full" />
              <div className="space-y-4 p-6">
                <a href={site.contactPhoneHref} className="flex items-center gap-4 text-2xl font-medium tracking-tight transition hover:text-brand-red">
                  <Icon d={I.phone} className="h-6 w-6 shrink-0" /> {site.contactPhoneDisplay}
                </a>
                <div className="flex flex-wrap gap-2">
                  <a href={site.contactPhoneHref} className="btn rounded-full bg-ink px-5 py-2.5 text-ivory hover:bg-brand-red">
                    <Icon d={I.phone} className="h-4 w-4" /> {pick(L.call)}
                  </a>
                  <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn rounded-full bg-[#25D366] px-5 py-2.5 text-ink hover:bg-ink hover:text-ivory">
                    <Icon d={I.wa} fill className="h-4 w-4" /> WhatsApp
                  </a>
                  <a href={`mailto:${PEOPLE[0].mail}`} className="btn rounded-full border border-ink/20 px-5 py-2.5 hover:border-ink">
                    <Icon d={I.mail} className="h-4 w-4" /> {pick(L.email)}
                  </a>
                </div>
                <p className="flex gap-2 rounded-xl bg-brand-yellow/20 p-3 text-[13px] leading-snug text-ink/80">
                  <span aria-hidden="true">🇮🇹</span>
                  {pick(L.italian)}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- Coordonnées + formulaire ---------- */}
      <section className="section theme-light">
        <div className="container-x grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div className="space-y-12">
            {/* E-mails */}
            <div>
              <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
                <li className="flex items-center gap-4 py-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-yellow">
                    <Icon d={I.mail} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50">{pick(L.general)}</p>
                    <a href={`mailto:${site.email}`} className="block truncate text-[17px] font-medium hover:text-brand-red">
                      {site.email}
                    </a>
                  </div>
                  <CopyMail mail={site.email} pick={pick} />
                </li>
                {PEOPLE.map((p) => (
                  <li key={p.mail} className="flex items-center gap-4 py-4">
                    <img src={p.photo} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover object-top grayscale" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
                        {p.name} · {pick(p.role)}
                      </p>
                      <a href={`mailto:${p.mail}`} className="block truncate text-[17px] font-medium hover:text-brand-red">
                        {p.mail}
                      </a>
                    </div>
                    <CopyMail mail={p.mail} pick={pick} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Bureaux */}
            <div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {OFFICES.map((o, i) => (
                  <div key={o.city} className="group relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl">
                    <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 ${i ? 'bg-brand-green' : 'bg-brand-red'}`} />
                    <p className="text-[10px] uppercase tracking-[0.25em] text-brand-red">{pick(o.label)}</p>
                    <p className="mt-2 font-display text-xl font-extrabold">{o.city}</p>
                    <p className="mt-3 flex gap-2 text-sm text-ink/70">
                      <Icon d={I.pin} className="mt-0.5 h-4 w-4 shrink-0" />
                      {o.address}
                    </p>
                    <a href={o.phone[1]} className="mt-2 flex gap-2 text-sm text-ink/70 hover:text-brand-red">
                      <Icon d={I.phone} className="mt-0.5 h-4 w-4 shrink-0" />
                      {o.phone[0]}
                    </a>
                    {o.mail && (
                      <a href={`mailto:${o.mail}`} className="mt-2 flex gap-2 text-sm text-ink/70 hover:text-brand-red">
                        <Icon d={I.mail} className="mt-0.5 h-4 w-4 shrink-0" />
                        {o.mail}
                      </a>
                    )}
                    <a href={o.maps} target="_blank" rel="noopener noreferrer" className="link-line mt-5 inline-block">
                      {pick(L.itinerary)} ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Réseaux sociaux */}
            {socials.length > 0 && (
              <div>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-forest px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#D9B36C] transition hover:bg-brand-green hover:text-ivory">
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Questionnaire (fond vert, textes dorés) */}
          <div id="formulaire" className="scroll-mt-24 rounded-3xl bg-forest p-7 text-[#D9B36C] shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)] md:p-12 lg:self-start">
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">{pick(L.formTitle)}</h2>
            <BrandBar className="mt-6" />
            <p className="mb-10 mt-6 text-base leading-relaxed text-[#D9B36C]/85">{pick(L.formIntro)}</p>
            <ProjectQuestionnaire />
          </div>
        </div>
      </section>

      {/* ---------- Carte ---------- */}
      <section className="relative h-[640px] overflow-hidden bg-[#4c4d4f] md:h-[520px]">
        {mapOn ? (
          <iframe
            title={pick(L.mapTitle)}
            src={MAP_EMBED}
            className="absolute inset-0 h-full w-full grayscale-[60%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <DakarMap />
        )}
        <div className="pointer-events-none absolute inset-0 flex items-end p-6 md:items-center md:p-16">
          <div className="pointer-events-auto max-w-sm rounded-2xl bg-ink/90 p-7 text-ivory shadow-2xl backdrop-blur">
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-brand-yellow">
              <Icon d={I.pin} className="h-4 w-4" /> {pick(L.mapTitle)}
            </p>
            <p className="mt-3 font-display text-2xl font-extrabold">{site.address}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {!mapOn && (
                <button type="button" onClick={() => setMapOn(true)} className="btn rounded-full bg-brand-yellow px-5 py-2.5 text-ink hover:bg-ivory">
                  {pick(L.mapLoad)}
                </button>
              )}
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn rounded-full border border-ivory/40 px-5 py-2.5 hover:border-brand-yellow hover:text-brand-yellow">
                {pick(L.itinerary)} ↗
              </a>
            </div>
            {!mapOn && <p className="mt-4 text-[11px] leading-snug text-ivory/50">{pick(L.mapNote)}</p>}
          </div>
        </div>
      </section>
    </>
  )
}
