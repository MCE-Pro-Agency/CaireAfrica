// Traductions MCE — à faire valider par Sofia (cf. cahier des charges, § 3 et § 9).
export default {
  nav: {
    home: 'Home',
    about: 'About',
    expertise: 'Expertise',
    projects: 'Projects',
    team: 'Team',
    news: 'News',
    contact: 'Contact',
    homeAria: 'CAIREAFRICA — home',
    open: 'Open menu',
    close: 'Close menu',
    switchLang: 'Passer en français',
  },
  cta: {
    project: 'Let’s talk about your project',
    contact: 'Contact us',
    whatsapp: 'Message CAIREAFRICA on WhatsApp',
    whatsappMessage: 'Hello, I would like to talk to CAIREAFRICA about a project.',
  },
  home: {
    title: 'CAIREAFRICA — Architecture & Engineering',
    description:
      'CAIREAFRICA — architecture and engineering in Dakar. CAIREPRO’s Italian know-how with local roots: from concept to site supervision, in Senegal and West Africa.',
    heroTags: ['Architecture', 'Engineering', 'Dakar · West Africa'],
    heroTagline: 'Today we design the shape of tomorrow.',

    introLead:
      'Italian know-how, local roots. A single point of contact for your projects in Africa, from concept to site supervision.',
    introText:
      'Architects, engineers and designers: a multidisciplinary team bringing together, around a shared method, every skill your project needs.',
    introCta: 'Discover our expertise',

    aboutEyebrow: 'Who we are',
    aboutLead: 'A Senegalese company based in Dakar, wholly owned by its Italian parent company CAIREPRO.',
    aboutText:
      'For several years we have been working in Senegal and West Africa, combining the design excellence of a firm founded in 1947 with in-depth knowledge of the local market.',
    aboutLink: 'Learn more',
    aboutImageAlt: 'The CAIREAFRICA team',

    figuresEyebrow: 'Key figures',
    figuresLead: 'Solid experience, in numbers.',
    figures: [
      { value: '1947', label: 'CAIREPRO founded' },
      { value: '50+', label: 'Professionals' },
      { value: '3,000', label: 'Projects managed' },
      { value: '2', label: 'Offices · Reggio Emilia & Dakar' },
    ],
    figuresNote: 'Certified ISO 9001:2015 (quality), ISO 14001:2015 (environment) and UNI/PdR 125:2022 (gender equality).',

    expertiseEyebrow: 'Expertise',
    expertiseHeading: 'Integrated skills, global vision',
    expertiseText:
      'Every day, between Italy and Senegal, we give shape to ideas by integrating diverse skills through a shared, results-driven method.',
    expertiseLink: 'All our expertise',

    projectsEyebrow: 'Projects',
    projectsHeading: 'Concrete solutions for complex challenges',
    projectsText: 'From context analysis to final delivery: a selection of work in Senegal and West Africa.',
    projectsLink: 'See all projects',

    ctaTitle: 'A project in Africa? Let’s talk.',
    ctaText: 'Companies, institutions, developers: tell us where you stand and we will get back to you quickly.',

    links: [
      { title: 'Who we are', label: 'CAIREAFRICA · CAIREPRO', to: '/a-propos', image: '/images/home/a-propos.jpg' },
      { title: 'The team', label: 'Architects · Engineers', to: '/equipe', image: '/images/home/equipe.jpg' },
      { title: 'News', label: 'Sites · Events', to: '/actualites', image: '/images/home/actualites.jpg' },
    ],
  },
  projects: {
    status: { concept: 'Concept', ongoing: 'In progress' },
    creditPrefix: 'Render:',
  },
  comingSoon: {
    eyebrow: 'Coming soon',
    text: 'This page is being prepared. In the meantime, our team is happy to answer your questions.',
    back: 'Back to home',
  },
  contact: {
    title: 'Contact — CAIREAFRICA',
    description: 'Contact CAIREAFRICA in Dakar: contact details, WhatsApp and contact form.',
    heading: 'Let’s talk about your project.',
    text: 'Our Dakar office welcomes you and replies in French or English.',
    office: 'Dakar office',
    direct: 'Direct contact',
    directNote: 'Italian number: please say whether you prefer a call or a WhatsApp message.',
    map: 'View on map →',
    eyebrow: 'Form',
    formHeading: 'Write to us',
    formIntro: 'Describe your project in a few lines: we will get back to you quickly.',
  },
  form: {
    name: 'Full name',
    organisation: 'Company / institution',
    email: 'Email',
    phone: 'Phone',
    preferred: 'I prefer to be contacted by',
    channels: ['Email', 'Call', 'WhatsApp'],
    message: 'Your project',
    send: 'Send by email',
    sendWhatsapp: 'Send via WhatsApp',
    required: 'Please give your name, your message and at least one way to reach you (email or phone).',
    errorEmail: 'This email address looks incomplete.',
    mailSubject: 'Contact request — website',
    messageIntro: 'Hello, here is my request:',
    labels: {
      name: 'Name',
      organisation: 'Company',
      email: 'Email',
      phone: 'Phone',
      preferred: 'Preferred contact',
      message: 'Message',
    },
  },
  footer: {
    find: 'Follow us',
    baseline: 'Architecture · Engineering — a CAIREPRO group company',
    legal: 'Legal notice',
    cookies: 'Cookies',
  },
  cookies: {
    title: 'Cookies — CAIREAFRICA',
    banner: 'This site only uses technical data required for it to work (chosen language). No advertising cookies, no trackers.',
    more: 'Learn more',
    refuse: 'Decline',
    accept: 'Got it',
    heading: 'Cookies & technical data',
    paragraphs: [
      'This site sets no advertising cookies and uses no third-party analytics trackers.',
      'The only information stored in your browser is your display language (French or English), so it can be restored on your next visit. If you click “Decline”, this choice is not remembered: the site will open in French on each visit.',
      'You can clear this data at any time from your browser settings.',
    ],
  },
  legal: {
    title: 'Legal notice — CAIREAFRICA',
    heading: 'Legal notice',
    sections: [
      { title: 'Publisher', lines: ['CAIREAFRICA — [legal form to be completed]', 'Rue MZ 134, Mermoz, Dakar, Senegal', 'RCCM / NINEA: [to be completed]', 'Publication director: [to be completed]'] },
      { title: 'Hosting', lines: ['[Host name, address and phone number to be completed]'] },
      { title: 'Intellectual property', lines: ['The texts, images, renders and drawings on this site are the property of CAIREAFRICA, CAIREPRO or their authors. Any reproduction without permission is prohibited.'] },
      { title: 'Personal data', lines: ['Information entered in the contact form is used only to answer your request. It is never shared or sold. To exercise your rights of access, rectification or deletion, write to the email address shown on the Contact page.'] },
    ],
  },
  notFound: {
    title: 'Page not found — CAIREAFRICA',
    heading: 'This page does not exist.',
    text: 'The page you are looking for has moved or no longer exists.',
    back: 'Back to home',
  },
}