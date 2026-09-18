export type Plan = {
  id: string;
  name: string;
  tagline: string;
  /** Monthly price in EUR, or null for custom (Enterprise). */
  monthly: number | null;
  /** Yearly-billed monthly-equivalent price (≈ 2 months free). */
  yearly: number | null;
  cta: string;
  href: string;
  features: string[];
  highlighted?: boolean;
  accent: string;
};

/** Pricing tiers — values provided by the product brief. */
export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Pour tester la galaxie',
    monthly: 0,
    yearly: 0,
    cta: 'Commencer gratuitement',
    href: '/signup',
    accent: '#7db4ff',
    features: [
      'Jusqu’à 500 morceaux',
      'Carte 3D interactive',
      'Recherche par similarité',
      'Roue de Camelot',
    ],
  },
  {
    id: 'dj',
    name: 'DJ',
    tagline: 'Pour mixer en harmonie',
    monthly: 9.99,
    yearly: 7.99,
    cta: 'Choisir DJ',
    href: '/signup?plan=dj',
    accent: '#22d3ee',
    features: [
      'Bibliothèque illimitée',
      'Sync Rekordbox & Serato',
      'Transitions compatibles',
      'Export playlists & crates',
      'Suggestions de set',
    ],
  },
  {
    id: 'producer',
    name: 'Producer',
    tagline: 'Pour créer et explorer',
    monthly: 19.99,
    yearly: 15.99,
    cta: 'Choisir Producer',
    href: '/signup?plan=producer',
    accent: '#a78bfa',
    highlighted: true,
    features: [
      'Tout DJ, plus :',
      'Analyse groove avancée',
      'Export M3U & chemins fichiers',
      'Référencement de samples',
      'Comparateur de morceaux',
      'Support prioritaire',
    ],
  },
  {
    id: 'label',
    name: 'Label / Pro',
    tagline: 'Pour gérer un catalogue',
    monthly: 49.99,
    yearly: 39.99,
    cta: 'Choisir Label',
    href: '/signup?plan=label',
    accent: '#e879f9',
    features: [
      'Tout Producer, plus :',
      'Vue catalogue & A&R',
      'Multi-bibliothèques',
      'Collaboration d’équipe',
      'Statistiques avancées',
      'API d’export',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Pour les grandes structures',
    monthly: null,
    yearly: null,
    cta: 'Nous contacter',
    href: '/contact',
    accent: '#ffd27a',
    features: [
      'Déploiement sur mesure',
      'SSO & sécurité avancée',
      'Intégrations dédiées',
      'SLA & accompagnement',
      'Volume illimité',
    ],
  },
];
