/**
 * Mock library used by the app-UI mockups (DJ Dock, PlayerBar, Camelot wheel).
 * Mirrors the real app's data shapes closely enough to look authentic.
 */

export type MockTrack = {
  title: string;
  artist: string;
  bpm: number;
  camelot: string;
  color: string;
};

export type PlaylistNode =
  | { type: 'folder'; name: string; children: PlaylistNode[] }
  | { type: 'playlist'; name: string; n: number; total: number; active?: boolean };

// Cluster-ish colours echoing the in-app palette.
const C = {
  cyan: '#22d3ee',
  blue: '#7db4ff',
  violet: '#a78bfa',
  fuchsia: '#e879f9',
  teal: '#2dd4bf',
  gold: '#ffd27a',
};

export const playlistTree: PlaylistNode[] = [
  {
    type: 'folder',
    name: 'Sets 2026',
    children: [
      { type: 'playlist', name: 'Warm-up · Sunset', n: 42, total: 48 },
      { type: 'playlist', name: 'Peak Time', n: 63, total: 71, active: true },
      { type: 'playlist', name: 'Closing · Deep', n: 38, total: 38 },
    ],
  },
  {
    type: 'folder',
    name: 'Crates',
    children: [
      { type: 'playlist', name: 'Melodic Techno', n: 128, total: 140 },
      { type: 'playlist', name: 'Organic House', n: 96, total: 104 },
      { type: 'playlist', name: 'Afro / Downtempo', n: 54, total: 60 },
    ],
  },
  { type: 'playlist', name: 'Coups de cœur', n: 31, total: 31 },
];

export const favorites: MockTrack[] = [
  { title: 'Nightdrive', artist: 'Auralis', bpm: 124, camelot: '8A', color: C.cyan },
  { title: 'Violet Hour', artist: 'Sundae', bpm: 126, camelot: '9A', color: C.violet },
  { title: 'Lunar Tide', artist: 'Mørk', bpm: 122, camelot: '8A', color: C.blue },
  { title: 'Parallax', artist: 'Nova Set', bpm: 125, camelot: '8B', color: C.fuchsia },
];

export const history: MockTrack[] = [
  { title: 'Echo Chamber', artist: 'KLN', bpm: 123, camelot: '7A', color: C.teal },
  { title: 'Stardust FM', artist: 'Hélios', bpm: 121, camelot: '8A', color: C.gold },
  { title: 'Gravity Well', artist: 'Oort', bpm: 127, camelot: '9A', color: C.violet },
];

/** Currently "playing" track for the PlayerBar mock. */
export const nowPlaying: MockTrack = {
  title: 'Nightdrive',
  artist: 'Auralis',
  bpm: 124,
  camelot: '8A',
  color: C.cyan,
};

/**
 * Camelot key → number of tracks. Drives the wheel mock (non-zero = lit).
 * The reference key is 8A; compatible keys are 7A, 9A and 8B.
 */
export const camelotCounts: Record<string, number> = {
  '1A': 24, '1B': 12, '2A': 31, '2B': 8, '3A': 44, '3B': 19,
  '4A': 52, '4B': 22, '5A': 67, '5B': 28, '6A': 73, '6B': 30,
  '7A': 88, '7B': 26, '8A': 142, '8B': 61, '9A': 97, '9B': 34,
  '10A': 58, '10B': 20, '11A': 41, '11B': 15, '12A': 29, '12B': 9,
};

export const camelotSelected = '8A';
export const camelotCompatible = new Set(['7A', '9A', '8B']);
