// Les cartes du Chef Kara.
// type : 'all' = menu tout compris · 'choice' = un plat au choix par service
// Les intitulés de plats restent en français (usage en gastronomie).
// courses : clés traduites dans i18n (menu.courses.<key>)

export const menus = [
  {
    slug: 'prestige',
    type: 'all',
    featured: true,
    name: 'Menu Prestige',
    tagline: {
      fr: "L'excellence sans détour — caviar, homard, wagyu et grands classiques sublimés.",
      en: 'Excellence, plain and simple — caviar, lobster, wagyu and elevated classics.',
    },
    courses: [
      {
        key: 'amuse',
        items: [
          'Caviar Osciètre, blini maison, crème crue',
          'Saint-Jacques snackée, beurre noisette',
          'Cappuccino de champignons de saison, écume truffée',
          'Huître fine de claire, vinaigrette passion',
          'Cromesquis de volaille fermière, crème légère aux herbes fraîches',
        ],
      },
      {
        key: 'starter',
        items: [
          "Langoustines confites au beurre d'herbes, fregola de carottes",
          'Asperges vertes rôties, sabayon au parmesan affiné 24 mois, noisettes torréfiées',
          'Carpaccio de Saint-Jacques, agrumes, huile vierge',
          'Foie gras mi-cuit maison, chutney mangue-gingembre',
          'Homard rôti, bisque montée au beurre, jeunes pousses',
        ],
      },
      {
        key: 'main',
        items: [
          "Filet ou côte de bœuf d'Argentine, pommes grenailles, sauce au poivre vert",
          'Paleron de bœuf confit thaï, mille-feuille de pomme de terre, jus de viande',
          "Magret de canard, croquettes de patate douce, demi-glace à l'orange",
          'Filet de bœuf Wagyu, purée truffée, jus corsé',
          'Turbot sauvage, asperges blanches, sauce champagne',
        ],
      },
      {
        key: 'dessert',
        items: [
          'Tarte fine rhubarbe, crème diplomate vanille',
          'Fraises fraîches, espuma mascarpone, zestes de citron vert',
          'Sablé breton, compotée fraise-rhubarbe, glace yaourt',
          'Pavlova fraises Gariguette & chantilly vanille Bourbon',
        ],
      },
    ],
  },
  {
    slug: 'royal-gourmet',
    type: 'all',
    featured: true,
    name: 'Menu Royal Gourmet',
    tagline: {
      fr: 'Généreux et raffiné, pensé pour les belles tablées.',
      en: 'Generous and refined, made for big, beautiful tables.',
    },
    courses: [
      {
        key: 'starter',
        items: [
          'Agnolotti, ricotta, échalotes caramélisées, pesto figue & menthe',
          'Œuf parfait, crème de champignons des bois, émulsion de parmesan',
          'Poulpe snacké, épis de maïs, émulsion de maïs au curcuma, huile de chorizo, pop-corn au paprika fumé',
          'Fenouil grillé, siphon stracciatella, huile habanero, vinaigrette miso',
        ],
      },
      {
        key: 'main',
        items: [
          "Filet ou côte de bœuf d'Argentine, pressé de grenailles, jus au poivre vert",
          'Dos de cabillaud, déclinaison de fèves, beurre citronné',
          "Joue de porc à l'orange et lait de coco, topinambours en deux façons, demi-glace",
          'Pavé de poisson sauvage, déclinaison de panais, espuma de pomme de terre, poêlée de morilles, jus crémé au vin jaune',
          "Magret de canard, croquettes de patate douce, demi-glace à l'orange",
        ],
      },
      {
        key: 'dessert',
        items: [
          'Baba au rhum, crème pâtissière vanille Tonka, chantilly légère',
          'Moelleux au chocolat Manjari, crème légère à la vanille, pralin aux noix de pécan',
          'Tiramisu café & vanille de Madagascar',
          'Pavlova hibiscus, fruits rouges, gingembre & fruits tropicaux',
        ],
      },
    ],
  },
  {
    slug: 'etoiles-fusion',
    type: 'choice',
    featured: true,
    name: 'Menu Étoiles Fusion',
    tagline: {
      fr: 'Le menu signature à composer — une création choisie à chaque service.',
      en: 'The signature menu to compose — one creation chosen for each course.',
    },
    courses: [
      {
        key: 'amuse',
        items: [
          "Accra de poisson, émulsion citron vert & gingembre, poudre d'herbes fraîches",
          'Cromesquis de pomme de terre à la truffe blanche, cœur fondant',
          'Arancini croustillant, mozzarella di bufala, coulis de tomate confite au basilic',
        ],
      },
      {
        key: 'starter',
        items: [
          'Agnolotti maison ricotta & herbes fraîches, échalotes caramélisées, pesto figue & menthe',
          'Œuf parfait, crème de champignons des bois, écume de parmesan affiné',
          'Tartare de crevettes, avocat, condiment agrumes, brioche toastée au beurre citronné',
          'Noix de Saint-Jacques snackées, crème de petits pois à la menthe, émulsion légère au wasabi',
          'Carpaccio de Saint-Jacques, vinaigrette yuzu, grenade fraîche, jeunes pousses',
          'Tartare de dorade royale, labneh fumé, vinaigrette miel & yuzu, petits pois croquants',
        ],
      },
      {
        key: 'main',
        items: [
          'Filet de bœuf rôti ou côte de bœuf argentin, pommes grenailles, sauce poivre vert flambée',
          "Magret de canard rôti, patate douce en textures croustillantes, jus à l'orange",
          'Paleron de bœuf confit façon thaï, mille-feuille de pomme de terre, jus corsé',
          'Joue de porc braisée orange & coco, topinambour en textures',
          'Suprême de volaille basse température, purée de panais, popcorn épicé signature, jus corsé',
          'Pavé de cabillaud nacré, beurre noisette, purée de patate douce, chips de kale',
          'Gnocchi verts aux épinards, crème légère, pignons grillés, stracciatella, tomates confites',
        ],
      },
      {
        key: 'dessert',
        items: [
          'Moelleux chocolat Manjari, crème vanille, praliné pécan, crumble cacao',
          'Pavlova hibiscus, fruits rouges & exotiques, crème légère',
          'Mousse chocolat noir intense, siphon café Touba, tuile cacao',
          'Tiramisu revisité café & vanille de Madagascar',
          'Cookie mi-cuit, crème montée vanille, compotée de rhubarbe acidulée',
          'Riz au lait crémeux, agrumes confits, ananas rôti, caramel léger',
        ],
      },
    ],
  },
  {
    slug: 'japonais-fusion',
    type: 'all',
    featured: true,
    name: 'Menu Japonais Fusion — Signature Chef Kara',
    tagline: {
      fr: 'Le Japon revisité par le chef : umami, agrumes et précision.',
      en: 'Japan revisited by the chef: umami, citrus and precision.',
    },
    courses: [
      {
        key: 'amuse',
        items: [
          'Tartare de thon rouge, sésame noir & huile de shiso',
          'Gyoza de canard confit, réduction soja & miel',
        ],
      },
      {
        key: 'starter',
        items: [
          "Carpaccio de dorade, vinaigrette yuzu & huile d'olive, pickles de légumes croquants",
          'Foie gras mi-cuit laqué au miso, brioche vapeur & chutney mangue-gingembre',
        ],
      },
      {
        key: 'main',
        items: [
          'Cabillaud nacré, bouillon dashi & beurre blanc, purée de patate douce & émulsion soja',
          'Filet de bœuf grillé façon tataki, sauce teriyaki au vin rouge, pommes fondantes & shiitake',
        ],
      },
      {
        key: 'dessert',
        items: [
          'Mille-feuille revisité au thé matcha, crème légère vanille & fraises fraîches',
          'Moelleux chocolat noir & cœur coulant au sésame, glace thé vert',
        ],
      },
    ],
  },
  {
    slug: 'mediterraneen',
    type: 'all',
    name: 'Menu Méditerranéen',
    tagline: {
      fr: "Le soleil dans l'assiette — huile d'olive, agrumes et herbes du Sud.",
      en: 'Sunshine on the plate — olive oil, citrus and southern herbs.',
    },
    courses: [
      {
        key: 'amuse',
        items: [
          "Houmous crémeux, huile d'olive & paprika fumé",
          'Mini-brochettes de poulpe grillé, citron & origan',
          'Arancini au parmesan, cœur fondant mozzarella',
        ],
      },
      {
        key: 'starter',
        items: [
          'Burrata des Pouilles, tomates anciennes, pesto basilic & pignons torréfiés',
          "Carpaccio de dorade, agrumes, huile d'olive vierge & fleur de sel",
        ],
      },
      {
        key: 'main',
        items: [
          'Filet de bar rôti, vierge de légumes, citron confit & herbes fraîches',
          "Épaule d'agneau confite, miel, thym & ail, jus réduit",
          'Risotto crémeux au safran, légumes du soleil grillés',
        ],
      },
      {
        key: 'dessert',
        items: [
          "Panna cotta à la fleur d'oranger, coulis d'abricot",
          'Baklava revisité, pistache & sirop léger',
        ],
      },
    ],
  },
  {
    slug: 'bien-etre',
    type: 'all',
    name: 'Menu Bien-être — Printemps / Été',
    tagline: {
      fr: 'Frais, léger et vibrant — une cuisine vivante, sans sucre ajouté.',
      en: 'Fresh, light and vibrant — lively cooking with no added sugar.',
    },
    courses: [
      {
        key: 'amuse',
        items: ["Perle de concombre & yaourt grec léger, huile d'herbes fraîches"],
      },
      {
        key: 'starter',
        items: [
          'Carpaccio de dorade, agrumes, fenouil croquant & vinaigrette citron vert',
          'Carpaccio de betterave, orange sanguine & noix torréfiées',
        ],
      },
      {
        key: 'main',
        items: [
          'Filet de bar vapeur, quinoa aux légumes verts & émulsion citronnée légère',
          'Risotto de quinoa aux asperges, petits pois & crème végétale légère',
        ],
      },
      {
        key: 'dessert',
        items: ['Salade de fruits rouges, infusion basilic & sorbet maison sans sucre ajouté'],
      },
    ],
  },
  {
    slug: 'fruits-de-mer',
    type: 'all',
    name: 'Menu Fruits de Mer — Expérience Gastronomique',
    tagline: {
      fr: 'La mer en majesté — huîtres, Saint-Jacques, turbot et homard.',
      en: 'The sea in all its majesty — oysters, scallops, turbot and lobster.',
    },
    courses: [
      {
        key: 'amuse',
        items: [
          'Huître fine de claire, gelée de concombre & vinaigre de riz',
          'Tartare de daurade, citron vert & perles de yuzu',
        ],
      },
      {
        key: 'starter',
        items: [
          "Carpaccio de Saint-Jacques, huile d'olive citronnée, zestes de combava",
          'Ceviche de bar, mangue fraîche & piment doux',
        ],
      },
      {
        key: 'main',
        items: [
          'Filet de turbot rôti, beurre blanc aux algues, légumes croquants & purée de céleri',
          "Homard grillé, jus corsé à l'estragon, risotto crémeux au parmesan & citron",
        ],
      },
      {
        key: 'dessert',
        items: [
          'Tarte fine aux agrumes, crème légère à la vanille',
          'Ananas rôti, caramel au rhum & sorbet coco',
        ],
      },
    ],
  },
  {
    // NB : ce menu ressemble à un doublon du « Menu Étoiles Fusion » (slug etoiles-fusion).
    // À confirmer avec le chef : fusionner les deux ou le renommer.
    slug: 'etoiles-fusionner',
    type: 'choice',
    name: 'Menu Étoiles Fusionner',
    tagline: {
      fr: 'La carte créative au choix — vos plats signature, composés ensemble.',
      en: 'The creative à-la-carte — your signature dishes, composed together.',
    },
    courses: [
      {
        key: 'amuse',
        items: [
          'Accras de poisson',
          'Arancini farcis à la mozzarella',
          'Mini-croquettes à la truffe blanche',
        ],
      },
      {
        key: 'starter',
        items: [
          "Tartare de crevettes, crème d'avocat, brioche toastée au beurre d'herbes",
          'Tartare de daurade, labneh au vinaigre de miel, petits pois, radis, sumac',
          'Agnolotti, ricotta, échalotes caramélisées, pesto figue & menthe',
          'Œuf parfait, crème de champignons des bois, émulsion de parmesan',
          'Saint-Jacques poêlées, crème de petits pois & menthe, émulsion de wasabi',
          'Fenouil grillé, siphon stracciatella, huile habanero, vinaigrette miso',
        ],
      },
      {
        key: 'main',
        items: [
          'Paleron de bœuf confit thaï, mille-feuille de pomme de terre, jus de viande',
          'Suprême de volaille basse température, siphon de panais, popcorn épicé, jus corsé',
          "Magret de canard, croquettes de patate douce, demi-glace à l'orange",
          'Gnocchi verts, crème aux épinards, pignons grillés, stracciatella, tomates séchées',
          "Filet ou côte de bœuf d'Argentine, pressé de grenailles, jus au poivre vert",
          "Joue de porc à l'orange et lait de coco, topinambours en deux façons, demi-glace",
          'Cabillaud nacré, beurre blanc citronné, asperges blanches & jeunes carottes',
          "Prince d'agneau aux cinq épices, crème de carotte fumée, jus corsé réduit 12 h",
        ],
      },
      {
        key: 'dessert',
        items: [
          'Moelleux au chocolat Manjari, crème légère vanille, pralin aux noix de pécan',
          'Pavlova hibiscus, fruits rouges, gingembre & fruits tropicaux',
          'Tiramisu café & vanille de Madagascar',
          'Baba au rhum, crème pâtissière vanille Tonka, chantilly légère',
          'Riz soufflé chocolat au lait, rhubarbe & gel de mangue',
          'Cookie mi-cuit, crème montée vanille, marmelade de fraises',
          'Mousse chocolat noir, siphon café Touba, tuile chocolat, biscuit croustillant',
        ],
      },
    ],
  },
]

export const getMenu = (slug) => menus.find((m) => m.slug === slug)
export const featuredMenus = menus.filter((m) => m.featured)
