/**
 * Central site configuration: brand strings, navigation, and shared copy.
 * Keeping it here means pages/components never hardcode marketing strings.
 */
export const site = {
  name: 'SONAR',
  overline: 'Music Intelligence',
  slogan: 'Explore your music like a galaxy.',
  description:
    'SONAR transforme votre bibliothèque musicale en carte 3D intelligente. Explorez vos morceaux par groove, énergie, tonalité, similarité et compatibilité.',
  url: 'https://sonar.app',
  email: 'hello@sonar.app',
} as const;

export type NavLink = { label: string; href: string };

/** Primary navigation, rendered centered in the navbar. */
export const navLinks: NavLink[] = [
  { label: 'Fonctionnalités', href: '/features' },
  { label: 'Tarifs', href: '/pricing' },
  { label: 'Télécharger', href: '/download' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

/** Footer link groups. */
export const footerGroups: { title: string; links: NavLink[] }[] = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', href: '/features' },
      { label: 'Tarifs', href: '/pricing' },
      { label: 'Télécharger', href: '/download' },
      { label: 'Tableau de bord', href: '/dashboard' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
      { label: 'Se connecter', href: '/login' },
      { label: 'Créer un compte', href: '/signup' },
    ],
  },
  {
    title: 'Compatibilité',
    links: [
      { label: 'Rekordbox', href: '/features' },
      { label: 'Serato', href: '/features' },
      { label: 'Producteurs', href: '/features' },
      { label: 'Labels', href: '/features' },
    ],
  },
];

/** Logos shown in the "compatible with" marquee on the home page. */
export const compatibility = [
  'Rekordbox',
  'Serato',
  'Traktor',
  'Ableton Live',
  'FL Studio',
  'Logic Pro',
  'Engine DJ',
  'iTunes',
];
