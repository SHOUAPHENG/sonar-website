'use client';

import dynamic from 'next/dynamic';
import { Search, Sparkles } from 'lucide-react';

import { AppWindow } from './AppWindow';
import { DjDockMock } from './DjDockMock';
import { CamelotWheelMock } from './CamelotWheelMock';
import { PlayerBarMock } from './PlayerBarMock';

// The real galaxy canvas, reused as the map background (client-only).
const GalaxyHero = dynamic(() => import('@/components/three/GalaxyHero'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_45%,#15224a,#03050f_70%)]" />
  ),
});

/**
 * A faithful, composited "screenshot" of the SONAR desktop app inside a
 * window chrome: the 3D galaxy map as the canvas, the DJ dock on the left, the
 * Camelot wheel and a search HUD floating on the right, and the PlayerBar
 * docked at the bottom. All pieces follow the active accent theme.
 */
export function AppShowcase({ className }: { className?: string }) {
  return (
    <AppWindow className={className}>
      <div className="relative h-[30rem] w-full md:h-[36rem]">
        {/* Galaxy map */}
        <div className="absolute inset-0">
          <GalaxyHero />
        </div>
        {/* Depth vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_40%,transparent_50%,rgba(3,5,15,0.7)_100%)]" />

        {/* Left dock */}
        <DjDockMock className="absolute left-3 top-3 hidden max-h-[calc(100%-5.5rem)] [mask-image:linear-gradient(to_bottom,#000_82%,transparent)] md:flex" />

        {/* Top search HUD */}
        <div className="absolute left-1/2 top-3 hidden w-72 -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-xl lg:flex">
          <Search className="h-3.5 w-3.5 text-white/40" />
          <span className="text-xs text-white/40">Rechercher par groove, clé, énergie…</span>
        </div>

        {/* Right column: stats chip + Camelot wheel */}
        <div className="absolute right-3 top-3 hidden flex-col items-end gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/60 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-galaxy-cyan" />
            4 218 morceaux · 37 playlists
          </div>
          <CamelotWheelMock />
        </div>

        {/* Bottom player */}
        <div className="absolute inset-x-3 bottom-3">
          <PlayerBarMock />
        </div>
      </div>
    </AppWindow>
  );
}
