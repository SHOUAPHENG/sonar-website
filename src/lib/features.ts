import {
  Waves,
  Zap,
  KeyRound,
  GitCompareArrows,
  Orbit,
  Sparkles,
  Headphones,
  Library,
  type LucideIcon,
} from 'lucide-react';

export type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** Accent color used for the icon halo + hover glow. */
  accent: string;
};

/**
 * The five exploration axes promised in the hero, plus the supporting
 * capabilities. Accents follow the brand spectrum.
 */
export const features: Feature[] = [
  {
    icon: Waves,
    title: 'Groove',
    desc: 'Un modèle contrastif entraîné sur le rythme regroupe vos morceaux par feeling — pas seulement par BPM.',
    accent: '#22d3ee',
  },
  {
    icon: Zap,
    title: 'Énergie',
    desc: 'Visualisez l’intensité de chaque titre et construisez des montées et des respirations parfaites.',
    accent: '#7db4ff',
  },
  {
    icon: KeyRound,
    title: 'Tonalité',
    desc: 'Détection de clé et roue de Camelot intégrée pour des mixes harmoniques sans fausse note.',
    accent: '#a78bfa',
  },
  {
    icon: GitCompareArrows,
    title: 'Similarité',
    desc: 'Plus proches voisins par embedding : trouvez instantanément les morceaux qui sonnent ensemble.',
    accent: '#c084fc',
  },
  {
    icon: Orbit,
    title: 'Compatibilité',
    desc: 'Transitions suggérées combinant tempo, énergie et harmonie pour enchaîner sans accroc.',
    accent: '#e879f9',
  },
  {
    icon: Sparkles,
    title: 'Carte 3D intelligente',
    desc: 'Toute votre bibliothèque devient une galaxie navigable où la distance traduit la ressemblance.',
    accent: '#ffd27a',
  },
];

export type Step = { n: string; title: string; desc: string; icon: LucideIcon };

/** "How it works" — three steps. */
export const steps: Step[] = [
  {
    n: '01',
    icon: Library,
    title: 'Importez votre bibliothèque',
    desc: 'Connectez Rekordbox, Serato ou un dossier de fichiers. SONAR lit vos playlists, crates et tags sans rien casser.',
  },
  {
    n: '02',
    icon: Sparkles,
    title: 'Laissez l’IA analyser',
    desc: 'Chaque morceau est encodé : groove, énergie, tonalité. Un embedding par titre positionne votre catalogue dans l’espace.',
  },
  {
    n: '03',
    icon: Headphones,
    title: 'Explorez la galaxie',
    desc: 'Naviguez en 3D, suivez les connexions, trouvez le morceau suivant. Réécrivez playlists et crates en un clic.',
  },
];
