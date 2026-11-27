// Les neuf expertises.
// title / text : libellé et résumé (accueil) — brochure CAIREAFRICA 06/2026.
// heading / body : texte complet de la page /expertises — repris de https://www.cairepro.it/fr/expertise/
// (et /en/expertise/ pour l'anglais).
const fr = (fr, en) => ({ fr, en })

export const expertises = [
  {
    key: 'design',
    title: fr('Conception', 'Design'),
    text: fr(
      'Développer des solutions intégrées, de l’architecture aux structures, en cohérence avec les besoins, le contexte et la faisabilité.',
      'Developing integrated solutions, from architecture to structures, consistent with needs, context and feasibility.',
    ),
    heading: fr('Approche intégrée et multidisciplinaire', 'Integrated and multidisciplinary approach'),
    body: [
      fr(
        'Architectes, ingénieurs et techniciens spécialisés collaborent dès les premières phases afin de définir des solutions de conception en adéquation avec les besoins du maître d’ouvrage.',
        'Architects, engineers and specialised technicians work together from the earliest stages to outline design solutions aligned with the client’s needs.',
      ),
      fr(
        'La conception couvre l’ensemble des disciplines — architecturale, structurelle et technique — et concerne des interventions dans les secteurs public et privé, tant pour des constructions neuves que pour le bâti existant.',
        'The design process covers all disciplines – architectural, structural and building systems – and applies to both public and private projects, including new developments and existing buildings.',
      ),
      fr(
        'Les activités incluent également des projets de restauration, de réhabilitation fonctionnelle et énergétique, ainsi que des interventions sur des bâtiments soumis à des contraintes techniques ou réglementaires.',
        'Activities also include restoration projects, functional and energy refurbishment, and interventions on buildings subject to historical or regulatory constraints.',
      ),
      fr(
        'La méthodologie BIM et la modélisation 3D soutiennent le développement du projet et permettent une vérification en amont des choix de conception.',
        'BIM methodology and 3D modelling support project development and enable the early approval of design decisions.',
      ),
    ],
  },
  {
    key: 'bim',
    title: fr('BIM Management', 'BIM Management'),
    text: fr(
      'Coordonner modèles, données et flux numériques pour anticiper les interférences et renforcer le contrôle du projet.',
      'Coordinating models, data and digital workflows to anticipate clashes and strengthen project control.',
    ),
    heading: fr('Optimisation des flux numériques et gestion des modèles', 'Digital workflows and model management'),
    body: [
      fr(
        'La méthodologie BIM est adoptée pour gérer de manière structurée l’ensemble des phases du projet et assurer la coordination entre disciplines — architecture, structures, systèmes techniques — au sein d’un environnement de travail partagé.',
        'BIM methodology is adopted to manage all project phases in a structured way and ensure coordination across disciplines – architecture, structures and building systems – within a shared working environment.',
      ),
      fr(
        'Les activités comprennent la modélisation des informations, la gestion centralisée des données, la détection des interférences et l’organisation des flux documentaires via des plateformes collaboratives.',
        'Activities include information modelling, centralised data management, early detection of problems and the organisation of document workflows through collaborative platforms.',
      ),
      fr(
        'Le processus est supervisé par une équipe spécialisée composée d’un BIM Manager, de deux BIM Coordinateurs et de trois BIM Specialists, garantissant la cohérence des modèles, la mise à jour continue des informations et le respect des standards numériques.',
        'The process is overseen by a specialised team consisting of a BIM Manager, two BIM Coordinators and three BIM Specialists, ensuring model consistency, continuous data updates and compliance with digital standards.',
      ),
    ],
  },
  {
    key: 'sustainability',
    title: fr('Durabilité', 'Sustainability'),
    text: fr(
      'Orienter les choix architecturaux et techniques vers performance, confort, efficacité énergétique et réduction de l’impact environnemental.',
      'Steering architectural and technical choices towards performance, comfort, energy efficiency and a lower environmental impact.',
    ),
    heading: fr('Performances mesurables, choix éclairés', 'Measurable performance, informed choices'),
    body: [
      fr(
        'La durabilité est appliquée comme un critère opérationnel afin de maximiser le confort des espaces et de réduire l’empreinte écologique globale de l’ouvrage.',
        'Sustainability is applied as an operational criterion to maximise user comfort and reduce the overall environmental footprint of the project.',
      ),
      fr(
        'Les solutions de conception sont orientées vers l’efficacité et l’utilisation de sources d’énergie renouvelables, à travers des choix architecturaux et techniques adaptés aux caractéristiques de l’intervention et à son usage dans le temps.',
        'Design solutions are oriented towards efficiency and the use of renewable energy sources, through architectural and building systems choices tailored to the specific characteristics of the project and its long-term use.',
      ),
      fr(
        'L’approche s’inscrit dans les objectifs de l’Agenda 2030, avec une attention particulière portée à la réduction des émissions, à l’efficacité des ressources et à la qualité de vie dans l’environnement bâti.',
        'The approach aligns with the goals of the 2030 Agenda, with particular focus on reducing emissions, resource efficiency and quality of life within the built environment.',
      ),
    ],
  },
  {
    key: 'fire',
    title: fr('Prévention incendie', 'Fire prevention'),
    text: fr(
      'Intégrer la sécurité incendie au projet, de l’évaluation du risque aux procédures d’autorisation.',
      'Building fire safety into the project, from risk assessment to permitting procedures.',
    ),
    heading: fr('Conformité et efficacité en matière de sécurité incendie', 'Fire safety compliance and efficiency'),
    body: [
      fr(
        'Les mesures de sécurité incendie sont définies afin de garantir la conformité réglementaire du bâtiment et sont intégrées au projet architectural et aux systèmes techniques.',
        'Fire safety measures are defined to ensure regulatory compliance and are integrated into the architectural and building systems design.',
      ),
      fr(
        'Les activités comprennent l’évaluation du risque incendie, la préparation de la documentation technique et l’accompagnement dans les procédures d’autorisation.',
        'Activities include fire risk assessment, preparation of technical documentation, and support throughout the approval process.',
      ),
    ],
  },
  {
    key: 'seismic',
    title: fr('Vulnérabilité sismique', 'Seismic vulnerability'),
    text: fr(
      'Analyser les structures existantes pour définir des interventions adaptées d’amélioration ou de mise en conformité.',
      'Assessing existing structures to define suitable upgrade or compliance works.',
    ),
    heading: fr('Maîtrise du risque et réponse de conception', 'Risk control and design response'),
    body: [
      fr(
        'Sur les bâtiments existants, la vulnérabilité sismique est évaluée à travers l’analyse du comportement structurel dans son état actuel.',
        'For existing buildings, seismic vulnerability is assessed through analysis of structural behavior in its current condition.',
      ),
      fr(
        'Les résultats des analyses constituent la base de la conception d’interventions d’amélioration ou de mise en conformité sismique, définies en fonction des caractéristiques constructives et de l’usage du bâtiment.',
        'The results of these analyses form the basis for designing seismic improvement or retrofit interventions, based on the building’s construction characteristics and intended use.',
      ),
    ],
  },
  {
    key: 'supervision',
    title: fr('Direction des travaux', 'Site supervision'),
    text: fr(
      'Suivre la réalisation de l’ouvrage en vérifiant qualité technique, délais, coûts et conformité au projet.',
      'Overseeing construction while checking technical quality, schedule, costs and compliance with the design.',
    ),
    heading: fr('Gestion stratégique du chantier', 'Strategic site management'),
    body: [
      fr(
        'La phase de réalisation est suivie à travers la direction des travaux, garantissant l’exécution de l’ouvrage dans le respect du projet, des délais et des coûts.',
        'The construction phase is overseen through construction supervision, ensuring that the works are carried out in compliance with the design, schedule and budget.',
      ),
      fr(
        'Les activités comprennent le suivi des travaux, la vérification de la qualité technique, la coordination des entreprises, la gestion des modifications et le respect de la conformité réglementaire.',
        'Activities include monitoring construction works, verifying technical quality, coordinating contractors, managing variations and ensuring regulatory compliance.',
      ),
      fr(
        'Un suivi constant protège les intérêts du maître d’ouvrage et assure une réalisation conforme aux prévisions de conception et aux exigences de performance.',
        'Continuous oversight safeguards the client’s interests and ensures delivery aligned with design specifications and performance requirements.',
      ),
    ],
  },
  {
    key: 'safety',
    title: fr('Coordination de la sécurité', 'Safety coordination'),
    text: fr(
      'Prévenir les risques en phase de conception et d’exécution, par le contrôle, la documentation et le dialogue avec les entreprises.',
      'Preventing risks during design and construction through control, documentation and dialogue with contractors.',
    ),
    heading: fr('Prévention et contrôle tout au long du processus', 'Prevention and control throughout the process'),
    body: [
      fr(
        'En phase de conception, les risques potentiels sont analysés et le contenu du plan de sécurité et de coordination est défini, en l’intégrant aux choix techniques et organisationnels du projet.',
        'During the design phase, potential risks are assessed and the contents of the safety and coordination plan are outlined, integrating them into the technical and organizational choices of the project.',
      ),
      fr(
        'En phase d’exécution, l’activité se poursuit par le contrôle des conditions opérationnelles sur le chantier, la vérification de la mise en œuvre des mesures prévues et la mise à jour de la documentation, à travers un échange constant avec les entreprises et les maîtres d’ouvrage.',
        'During construction, activities continue with monitoring site conditions, ensuring the implementation of the prescribed measures, and updating documentation, through ongoing coordination with contractors and clients.',
      ),
      fr(
        'L’objectif est de garantir des environnements de travail conformes et de prévenir les situations à risque pour l’ensemble des parties impliquées.',
        'The aim is to ensure compliant working environments and prevent risks for all parties involved.',
      ),
    ],
  },
  {
    key: 'refurbishment',
    title: fr('Réhabilitation des bâtiments', 'Building refurbishment'),
    text: fr(
      'Redonner valeur et fonction aux bâtiments existants, en améliorant performances, qualité des espaces et durée de vie.',
      'Restoring value and function to existing buildings by improving performance, spatial quality and lifespan.',
    ),
    heading: fr('Valoriser l’existant par des interventions ciblées', 'Renovation of existing buildings'),
    body: [
      fr(
        'La réhabilitation des bâtiments redonne valeur et fonctionnalité aux structures existantes, y compris celles désaffectées ou devenues inadaptées aux besoins actuels.',
        'Building renovation restores value and functionality to existing structures, including those that are disused or no longer suited to current needs.',
      ),
      fr(
        'Nous intervenons pour améliorer les performances structurelles, énergétiques et techniques, ainsi que la qualité architecturale et le confort des espaces.',
        'We work to improve structural, energy and building systems performance, alongside architectural quality and user comfort.',
      ),
      fr(
        'De l’analyse de l’existant à la définition des solutions de conception, jusqu’à la coordination technique des travaux, nous accompagnons chaque phase du processus de régénération, en prolongeant la durée de vie des bâtiments et en leur donnant une nouvelle fonction.',
        'From the analysis of existing conditions to the development of design solutions and the technical coordination of works, we support every stage of the regeneration process, extending the lifecycle of buildings and giving them a new purpose.',
      ),
    ],
  },
  {
    key: 'validation',
    title: fr('Vérification et validation', 'Design review & validation'),
    text: fr(
      'Évaluer la fiabilité globale du projet, en identifiant les criticités techniques, réglementaires et économiques avant sa mise en œuvre.',
      'Assessing the overall reliability of the project by identifying technical, regulatory and financial issues before implementation.',
    ),
    heading: fr('De l’analyse technique à la fiabilité du résultat', 'From technical analysis to reliable outcomes'),
    body: [
      fr(
        'En tant que société certifiée UNI EN ISO 9001:2015, CAIREPRO réalise des activités de vérification en tant que tiers indépendant sur les projets architecturaux, structurels et techniques, ainsi que sur les aspects réglementaires et administratifs.',
        'As a UNI EN ISO 9001:2015-certified company, CAIREPRO carries out audits of activities as an independent third party on architectural, structural and building systems design, as well as on regulatory and administrative aspects.',
      ),
      fr(
        'La vérification s’applique à des opérations jusqu’à 20 millions d’euros et est menée selon des méthodologies structurées afin d’évaluer la fiabilité globale du projet et sa cohérence technico-économique.',
        'Authorisation applies to projects with a value of up to €20 million and is conducted using structured methodologies to assess overall reliability and technical-economic consistency.',
      ),
      fr(
        'Cette analyse permet d’éclairer les décisions et d’identifier d’éventuelles criticités, en garantissant des documents complets et prêts à être mis en œuvre.',
        'This analysis supports informed decision-making and enables the identification of potential issues, ensuring complete and actionable project documentation.',
      ),
    ],
  },
]
