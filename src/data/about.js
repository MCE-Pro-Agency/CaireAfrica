// Contenus « À propos » : utilisés sur l'accueil (section Qui sommes-nous) et sur la page /a-propos.
// Sources : texte CAIREAFRICA (11/2026), https://www.cairepro.it/fr/historie/ et /fr/equipe/
const fr = (fr, en) => ({ fr, en })

// ---------- Qui sommes-nous ? ----------
export const about = {
 
  titleStart: fr('Nous concevons aujourd’hui', 'Today, we design'),
  titleEnd: fr('la forme de demain.', 'the shape of tomorrow.'),
  tagline: 'CAIREAFRICA · Groupe CAIREPRO · Dakar',
  blocks: [
    {
      color: 'bg-brand-red',
      title: fr('Un savoir-faire italien, un ancrage local.', 'Italian know-how, local roots.'),
      text: [
        fr(
          'CAIREAFRICA est une société sénégalaise basée à Dakar, filiale de CAIREPRO, groupe italien bénéficiant de plus de 78 ans d’expérience dans les domaines de l’architecture et de l’ingénierie.',
          'CAIREAFRICA is a Senegalese company based in Dakar, a subsidiary of CAIREPRO, an Italian group with more than 78 years of experience in architecture and engineering.',
        ),
        fr(
          'Présents depuis plusieurs années au Sénégal et en Afrique de l’Ouest, nous associons l’excellence du savoir-faire italien à une connaissance approfondie des réalités, des enjeux et des besoins du marché local.',
          'Active for several years in Senegal and West Africa, we combine the excellence of Italian know-how with an in-depth understanding of the realities, challenges and needs of the local market.',
        ),
      ],
    },
    {
      color: 'bg-brand-yellow',
      title: fr('De la conception à la réalisation : une expertise globale.', 'From design to delivery: end-to-end expertise.'),
      text: [
        fr(
          'Forts de nombreux projets réalisés et en cours, nous intervenons à chaque étape du cycle de développement, de la conception initiale à la direction des travaux.',
          'With many projects completed and under way, we work at every stage of the development cycle, from initial design to site supervision.',
        ),
        fr(
          'Notre groupe rassemble plus de 50 professionnels aux compétences complémentaires, réunis autour d’une méthodologie commune garantissant la maîtrise technique et économique des projets ainsi que le respect de standards de qualité élevés.',
          'Our group brings together more than 50 professionals with complementary skills, united by a shared methodology that ensures technical and financial control of projects and high quality standards.',
        ),
      ],
    },
    {
      color: 'bg-brand-green',
      title: fr('Des compétences intégrées au service de vos projets.', 'Integrated skills for your projects.'),
      text: [
        fr(
          'Notre appartenance à un groupe fondé en 1947 nous permet de nous positionner comme un interlocuteur unique, capable de mobiliser des expertises pluridisciplinaires pour répondre aux exigences de chaque projet.',
          'Belonging to a group founded in 1947 allows us to act as a single point of contact, able to bring together multidisciplinary expertise to meet the requirements of each project.',
        ),
        fr(
          'En conjuguant héritage, innovation et expertise opérationnelle sur le terrain, nous transformons les ambitions en réalisations concrètes et contribuons à façonner les espaces et les infrastructures de demain.',
          'By combining heritage, innovation and operational expertise on the ground, we turn ambitions into concrete achievements and help shape the spaces and infrastructure of tomorrow.',
        ),
      ],
    },
  ],
}

// ---------- Histoire de CAIREPRO (cairepro.it/fr/historie) ----------
export const history = [
  {
    year: '1947',
    title: fr('Les origines de CAIREPRO', 'The origins of CAIREPRO'),
    text: fr(
      'Le 28 novembre 1947, un groupe de jeunes diplômés du Politecnico di Milano fonde le Studio Cooperativo di Costruzioni Civili, aujourd’hui CAIREPRO — première coopérative de professions intellectuelles en Europe, et probablement dans le monde.',
      'On 28 November 1947, a group of young Politecnico di Milano graduates founded the Studio Cooperativo di Costruzioni Civili, today CAIREPRO — the first cooperative of intellectual professions in Europe, and probably in the world.',
    ),
  },
  {
    year: '1952',
    title: fr('Une nouvelle identité', 'A new identity'),
    text: fr(
      'La société devient la Cooperativa Architetti e Ingegneri di Reggio Emilia et formalise une approche intégrée réunissant architecture et ingénierie.',
      'The company becomes the Cooperativa Architetti e Ingegneri di Reggio Emilia, formalising an integrated approach bringing architecture and engineering together.',
    ),
  },
  {
    year: '1961',
    title: fr('Reconnaissance nationale', 'National recognition'),
    text: fr(
      'L’Unité d’habitation de Nebbiara (Villaggio Architetti) reçoit le Prix Émilie-Romagne de l’INARCH (Istituto Nazionale di Architettura).',
      'The Nebbiara housing unit (Villaggio Architetti) receives the INARCH Emilia-Romagna Prize (Istituto Nazionale di Architettura).',
    ),
  },
  {
    year: '1962',
    title: fr('Prix d’architecture', 'Architecture award'),
    text: fr(
      'La valeur sociale et qualitative des projets est récompensée par la Médaille d’Or d’Architecture de la Province de Reggio Emilia.',
      'The social value and quality of the projects are recognised with the Gold Medal for Architecture of the Province of Reggio Emilia.',
    ),
  },
  {
    year: fr('Années 1970', '1970s'),
    title: fr('Ouverture internationale', 'Going international'),
    text: fr(
      'Projets hospitaliers et hôteliers au Kenya et en Somalie ; concours internationaux remportés en Turquie, en Espagne (Tenerife), en Algérie et au Maroc.',
      'Hospital and hotel projects in Kenya and Somalia; international competitions won in Turkey, Spain (Tenerife), Algeria and Morocco.',
    ),
  },
  {
    year: '1986',
    title: fr('Structure opérationnelle', 'Operational structure'),
    text: fr(
      'L’organisation s’articule en deux pôles — urbanisme et bâtiment — pour traiter des interventions de plus grande complexité et de plus grande échelle.',
      'The organisation is split into two divisions — urban planning and building — to handle more complex, larger-scale work.',
    ),
  },
  {
    year: '1993',
    title: fr('Culture et mémoire du projet', 'Design culture and memory'),
    text: fr(
      'Création de la fondation Archivio Osvaldo Piacentini, dédiée à la recherche et à la culture architecturale, en mémoire de l’associé fondateur.',
      'The Archivio Osvaldo Piacentini foundation is created, dedicated to research and architectural culture, in memory of the founding partner.',
    ),
  },
  {
    year: '2007',
    title: fr('Énergie et durabilité', 'Energy and sustainability'),
    text: fr(
      'L’activité s’étend à l’énergie : trigénération et rénovation énergétique de bâtiments complexes.',
      'Activities extend to energy: trigeneration and energy retrofitting of complex buildings.',
    ),
  },
  {
    year: '2018',
    highlight: true,
    title: fr('Naissance de CAIREAFRICA', 'CAIREAFRICA is born'),
    text: fr(
      'Création de CAIREAFRICA, société de droit sénégalais entièrement détenue par CAIREPRO et basée à Dakar : lancement des premiers projets au Sénégal et en Afrique de l’Ouest.',
      'CAIREAFRICA is founded, a Senegalese company wholly owned by CAIREPRO and based in Dakar: the first projects in Senegal and West Africa begin.',
    ),
  },
  {
    year: '2025',
    title: fr('Société d’ingénierie', 'Engineering company'),
    text: fr(
      'CAIREPRO devient société d’ingénierie et renforce son rôle d’interlocuteur unique, du pilotage technique à la maîtrise économique du projet.',
      'CAIREPRO becomes an engineering company, strengthening its role as a single point of contact, from technical management to cost control.',
    ),
  },
  {
    year: fr('Aujourd’hui', 'Today'),
    title: fr('Conception intégrée', 'Integrated design'),
    text: fr(
      'Une structure multidisciplinaire qui allie conception, technologie et attention au contexte pour traduire des visions complexes en projets concrets.',
      'A multidisciplinary practice combining design, technology and attention to context to turn complex visions into concrete projects.',
    ),
  },
]

// ---------- Conseil d'administration CAIREPRO (cairepro.it/fr/equipe) ----------
export const board = [
  { name: 'Antonio Armaroli', role: fr('Président', 'Chairman'), discipline: fr('Architecte', 'Architect'), photo: '/images/equipe/antonio-armaroli.jpg' },
  { name: 'Giulio Zanni', role: fr('Vice-président', 'Vice-Chairman'), discipline: fr('Architecte · Appels d’offres', 'Architect · Tenders'), photo: '/images/cairepro/giulio-zanni.jpg' },
  { name: 'Gabriele Zambelli', role: fr('Administrateur', 'Board member'), discipline: fr('Géomètre', 'Surveyor'), photo: '/images/cairepro/gabriele-zambelli.jpg' },
  { name: 'Luca Zanni', role: fr('Administrateur', 'Board member'), discipline: fr('Ingénieur électricité', 'Electrical systems designer'), photo: '/images/cairepro/luca-zanni.jpg' },
]
