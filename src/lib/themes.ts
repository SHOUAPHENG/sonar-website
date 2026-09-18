/**
 * Accent themes — the brand "spectrum" (three colour stops) swapped at runtime
 * via CSS variables (--c1/--c2/--c3). Palettes echo the in-app universes and
 * map to the four user profiles plus a couple of vibes. The page stays deep
 * dark; only the accent spectrum changes.
 */
export type Theme = {
  id: string;
  label: string;
  /** Three gradient stops, cool → warm. */
  stops: [string, string, string];
};

export const themes: Theme[] = [
  { id: 'galaxy', label: 'Galaxy', stops: ['#22d3ee', '#a78bfa', '#e879f9'] },
  { id: 'dj', label: 'DJ', stops: ['#22d3ee', '#38bdf8', '#7db4ff'] },
  { id: 'producer', label: 'Producer', stops: ['#a78bfa', '#c084fc', '#e879f9'] },
  { id: 'label', label: 'Label', stops: ['#e879f9', '#f472b6', '#fb7185'] },
  { id: 'aurora', label: 'Aurora', stops: ['#2dd4bf', '#34d399', '#a78bfa'] },
  { id: 'eclat', label: 'Éclat', stops: ['#fbbf24', '#f59e0b', '#38bdf8'] },
];

export const defaultThemeId = 'galaxy';
export const themeStorageKey = 'galaxy-theme';

/** Map of id → stops, used both at runtime and by the no-flash init script. */
export const themeMap: Record<string, [string, string, string]> = Object.fromEntries(
  themes.map((t) => [t.id, t.stops]),
);

/** Apply a theme's stops to the document root as CSS variables. */
export function applyTheme(id: string) {
  const stops = themeMap[id] ?? themeMap[defaultThemeId];
  const root = document.documentElement;
  root.style.setProperty('--c1', stops[0]);
  root.style.setProperty('--c2', stops[1]);
  root.style.setProperty('--c3', stops[2]);
}
