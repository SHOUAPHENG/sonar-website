'use client';

import { Sparkles, LayoutGrid, MessageSquare, type LucideIcon } from 'lucide-react';

import { GalaxyShaderBackground } from './GalaxyShaderBackground';
import { SectionHeader } from './SectionHeader';
import { LiquidCard } from './LiquidCard';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { det } from './util';

const PALETTE = ['#22d3ee', '#7db4ff', '#a78bfa', '#e879f9', '#ffd27a'];
const MINI_DOTS = Array.from({ length: 46 }, (_, i) => ({
  top: det(i, 7) * 100,
  left: det(i, 11) * 100,
  s: det(i, 13) * 3 + 1.5,
  c: PALETTE[Math.floor(det(i, 17) * PALETTE.length)],
}));

function MiniGalaxy() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18), transparent 65%)' }}
      />
      {MINI_DOTS.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.s,
            height: d.s,
            background: d.c,
            boxShadow: `0 0 ${d.s * 3}px ${d.c}`,
          }}
        />
      ))}
    </div>
  );
}

function MiniBrowser() {
  const rows = [
    ['Nightdrive', '124', '8A', '0.81'],
    ['Lunar Tide', '122', '8A', '0.76'],
    ['Violet Hour', '126', '9A', '0.84'],
    ['Echo Chamber', '123', '7A', '0.69'],
    ['Parallax', '125', '8B', '0.79'],
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-2 font-barlow text-[10px] uppercase tracking-wide text-white/40">
        <span>Track</span>
        <span>BPM</span>
        <span>Key</span>
        <span>Energy</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-2 rounded-lg bg-white/[0.04] px-2 py-1.5 font-barlow text-[11px] text-white/80"
        >
          <span className="truncate">{r[0]}</span>
          <span className="tabular-nums text-white/60">{r[1]}</span>
          <span className="text-galaxy-cyan">{r[2]}</span>
          <span className="tabular-nums text-white/60">{r[3]}</span>
        </div>
      ))}
    </div>
  );
}

function MiniCopilot() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 font-barlow">
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-white/[0.06] px-3 py-2 text-[11px] text-white/85">
        Trouve 20 tracks comme Anyma, plus mélodiques, 124–126 BPM.
      </div>
      <div className="mr-auto max-w-[88%] rounded-2xl rounded-bl-sm liquid-glass px-3 py-2 text-[11px] text-white/85">
        <span className="text-galaxy-cyan">●</span> 20 morceaux trouvés · clé compatible · énergie 0.7–0.8
      </div>
      <div className="flex flex-wrap gap-1.5">
        {['Melodic', '124 BPM', '8A', 'Deep'].map((t) => (
          <span key={t} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] text-white/70">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

type Feature = {
  title: string;
  Icon: LucideIcon;
  tags: string[];
  desc: string;
  Visual: () => React.ReactElement;
};

const FEATURES: Feature[] = [
  {
    title: 'Galaxy Map',
    Icon: Sparkles,
    tags: ['3D', 'Clusters', 'Genres', 'Energy'],
    desc: 'Visualisez des milliers de morceaux sous forme de constellations interactives. Chaque point représente une track, un artiste, un genre ou un cluster sonore.',
    Visual: MiniGalaxy,
  },
  {
    title: 'Smart Browser',
    Icon: LayoutGrid,
    tags: ['BPM', 'Key', 'Mood', 'Waveform'],
    desc: 'Un browser musical nouvelle génération avec BPM, tonalité, énergie, groove, humeur, tags, waveforms et recommandations instantanées.',
    Visual: MiniBrowser,
  },
  {
    title: 'AI Copilot',
    Icon: MessageSquare,
    tags: ['Search', 'Playlist', 'A&R', 'DJ Set'],
    desc: 'Posez des questions à votre bibliothèque : « trouve-moi 20 tracks comme Anyma mais plus mélodiques entre 124 et 126 BPM ».',
    Visual: MiniCopilot,
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative min-h-screen overflow-hidden bg-black">
      <GalaxyShaderBackground intensity="low" glow={false} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:px-8">
        <SectionHeader kicker="// Capabilities" lines={['Music Discovery,', 'Rebuilt for Professionals']} />

        <Reveal stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <RevealItem key={f.title}>
              <LiquidCard className="flex min-h-[390px] flex-col rounded-[1.5rem] p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-[0.75rem] liquid-glass">
                    <f.Icon className="h-6 w-6 text-white" />
                  </span>
                  <div className="flex max-w-[68%] flex-wrap justify-end gap-1.5">
                    {f.tags.map((t) => (
                      <span key={t} className="rounded-full liquid-glass px-2.5 py-1 font-barlow text-[11px] text-white/85">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="my-5 flex-1 rounded-2xl border border-white/[0.06] bg-black/30 p-3">
                  <f.Visual />
                </div>

                <div>
                  <h3 className="font-serif-display text-3xl italic tracking-tight text-white md:text-4xl">{f.title}</h3>
                  <p className="mt-3 font-barlow text-sm font-light leading-snug text-white/75">{f.desc}</p>
                </div>
              </LiquidCard>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
