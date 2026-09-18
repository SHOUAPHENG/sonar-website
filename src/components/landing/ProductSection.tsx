'use client';

import { motion } from 'framer-motion';
import { Search, Play } from 'lucide-react';

import { GalaxyShaderBackground } from './GalaxyShaderBackground';
import { SectionHeader } from './SectionHeader';
import { det } from './util';

const PALETTE = ['#22d3ee', '#7db4ff', '#a78bfa', '#e879f9', '#ffd27a', '#34d399'];
const MAP_DOTS = Array.from({ length: 160 }, (_, i) => ({
  top: det(i, 3) * 100,
  left: det(i, 5) * 100,
  s: det(i, 9) * 2.4 + 1,
  c: PALETTE[Math.floor(det(i, 23) * PALETTE.length)],
}));

function CamelotMini() {
  return (
    <div className="relative mx-auto h-20 w-20">
      <div
        className="h-full w-full rounded-full"
        style={{
          background: 'conic-gradient(#e879f9,#ffd27a,#34d399,#22d3ee,#7db4ff,#a78bfa,#e879f9)',
          opacity: 0.55,
        }}
      />
      <div className="absolute inset-[28%] grid place-items-center rounded-full liquid-glass text-[11px] font-semibold text-galaxy-cyan">
        8A
      </div>
    </div>
  );
}

function ProductMockup() {
  const playlists = ['Peak Time', 'Warm-up', 'Closing', 'Melodic Techno', 'Organic House', 'Coups de cœur'];
  const playlistColors = ['#22d3ee', '#a78bfa', '#e879f9', '#34d399', '#ffd27a', '#7db4ff'];
  const browser = [
    ['Nightdrive — Auralis', '124', '8A'],
    ['Lunar Tide — Mørk', '122', '8A'],
    ['Violet Hour — Sundae', '126', '9A'],
    ['Parallax — Nova Set', '125', '8B'],
  ];
  return (
    <div className="flex h-full w-full flex-col overflow-hidden font-barlow text-white">
      {/* top bar */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="text-xs font-semibold tracking-[0.18em]">
          SON<span className="text-galaxy-cyan">AR</span>
        </span>
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1.5 text-[11px] text-white/45">
          <Search className="h-3.5 w-3.5" />
          Rechercher par groove, clé, énergie…
        </div>
        {['Genre', 'BPM', 'Key', 'Energy'].map((f) => (
          <span key={f} className="hidden rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] text-white/60 lg:inline">
            {f}
          </span>
        ))}
      </div>

      {/* body */}
      <div className="grid min-h-0 flex-1 grid-cols-[120px_1fr_150px]">
        <div className="hidden flex-col gap-1 border-r border-white/10 p-3 sm:flex">
          <div className="mb-1 text-[9px] uppercase tracking-wider text-white/40">Playlists</div>
          {playlists.map((p, i) => (
            <div
              key={p}
              className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] ${i === 0 ? 'bg-white/[0.07] text-white' : 'text-white/55'}`}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: playlistColors[i] }} />
              <span className="truncate">{p}</span>
            </div>
          ))}
        </div>

        <div className="relative border-r border-white/10">
          <div className="absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.16), rgba(167,139,250,0.10) 45%, transparent 72%)' }}
            />
            {MAP_DOTS.map((d, i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={{
                  top: `${d.top}%`,
                  left: `${d.left}%`,
                  width: d.s,
                  height: d.s,
                  background: d.c,
                  boxShadow: `0 0 ${d.s * 2.5}px ${d.c}`,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
          <span className="absolute left-3 top-3 rounded-full liquid-glass px-2.5 py-1 text-[10px] text-white/80">
            3D Galaxy Map
          </span>
        </div>

        <div className="hidden flex-col gap-3 p-3 md:flex">
          <div className="text-[9px] uppercase tracking-wider text-white/40">Compatibility</div>
          <CamelotMini />
          {[80, 64, 92, 48].map((w, i) => (
            <div key={i} className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${w}%`, background: 'linear-gradient(90deg,#22d3ee,#a78bfa)' }} />
            </div>
          ))}
        </div>
      </div>

      {/* browser */}
      <div className="border-t border-white/10 p-2">
        {browser.map((r, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-md px-2 py-1 text-[11px] text-white/75">
            <span className="truncate">{r[0]}</span>
            <span className="tabular-nums text-white/50">{r[1]}</span>
            <span className="text-galaxy-cyan">{r[2]}</span>
          </div>
        ))}
      </div>

      {/* player */}
      <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2.5">
        <Play className="h-3.5 w-3.5 text-galaxy-cyan" fill="currentColor" />
        <div className="flex h-7 flex-1 items-center gap-[2px]">
          {Array.from({ length: 64 }).map((_, i) => {
            const h = Math.abs(Math.sin(i * 0.5) * 0.7 + Math.cos(i * 0.2) * 0.3);
            const played = i < 26;
            return (
              <span
                key={i}
                className="flex-1 rounded-[1px]"
                style={{ height: `${20 + h * 80}%`, background: played ? '#22d3ee' : 'rgba(255,255,255,0.18)' }}
              />
            );
          })}
        </div>
        <span className="font-mono text-[10px] text-white/40">2:34 / 6:02</span>
      </div>
    </div>
  );
}

const BADGES = [
  { t: '3D Galaxy Map', c: 'absolute -left-3 top-10 hidden md:block' },
  { t: 'Groove DNA', c: 'absolute -right-3 top-16 hidden md:block' },
  { t: 'Camelot Wheel', c: 'absolute -right-4 top-1/2 hidden lg:block' },
  { t: 'AI Recommendations', c: 'absolute -right-3 bottom-16 hidden md:block' },
  { t: 'Smart Browser', c: 'absolute -left-3 bottom-20 hidden md:block' },
  { t: 'Stem Preview', c: 'absolute -left-4 top-1/2 hidden lg:block' },
  { t: 'Track Radar', c: 'absolute left-1/2 -top-3 -translate-x-1/2 hidden md:block' },
  { t: 'Label Intelligence', c: 'absolute left-1/2 -bottom-3 -translate-x-1/2 hidden md:block' },
];

export function ProductSection() {
  return (
    <section id="product" className="relative min-h-screen overflow-hidden bg-black">
      <GalaxyShaderBackground intensity="low" glow={false} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:px-8">
        <SectionHeader
          center
          kicker="// Product"
          lines={['One Interface.', 'Your Entire Music Universe.']}
          subheading="Une seule interface pour explorer, analyser, recommander et préparer la musique à partir de ta bibliothèque réelle."
        />

        <motion.div
          initial={{ filter: 'blur(12px)', opacity: 0, y: 30 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          {BADGES.map((b) => (
            <span key={b.t} className={`${b.c} z-20 rounded-full liquid-glass px-4 py-2 font-barlow text-xs text-white/80`}>
              {b.t}
            </span>
          ))}
          <div
            className="aspect-video overflow-hidden rounded-[2rem] liquid-glass-strong"
            style={{ boxShadow: '0 40px 140px -30px rgba(34,211,238,0.35), 0 40px 120px -40px rgba(167,139,250,0.4)' }}
          >
            <ProductMockup />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
