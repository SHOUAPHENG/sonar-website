import { SkipBack, SkipForward, Pause, Volume2 } from 'lucide-react';

import { nowPlaying } from '@/lib/mockData';

/* ───────────────────────────────────────────────────────────────────────────
   Faithful static port of the in-app PlayerBar: artwork, now-playing meta,
   transport, a waveform (played portion lit in accent with a centred playhead),
   a real-time spectrum stub and a volume control. Presentational only.
   ─────────────────────────────────────────────────────────────────────────── */

// Deterministic pseudo-waveform so SSR and client render identically.
const BARS = Array.from({ length: 72 }, (_, i) => {
  const v =
    Math.abs(Math.sin(i * 0.5) * 0.6 + Math.sin(i * 0.17) * 0.4 + Math.cos(i * 0.9) * 0.25) /
    1.25;
  return 0.12 + v * 0.88;
});
const PLAYHEAD = 0.42; // fraction played

const SPECTRUM = [0.4, 0.7, 0.55, 0.9, 0.65, 0.8, 0.5, 0.72, 0.6, 0.85, 0.45, 0.6, 0.75, 0.5, 0.68, 0.4];

export function PlayerBarMock() {
  return (
    <footer
      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-xl"
      style={
        {
          ['--accent' as string]: 'var(--c1)',
        } as React.CSSProperties
      }
    >
      {/* artwork */}
      <div
        className="h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-white/10"
        style={{ background: `radial-gradient(circle at 30% 30%, ${nowPlaying.color}55, #0a0c14 75%)` }}
      />

      {/* now playing */}
      <div className="w-40 min-w-0 shrink-0">
        <p className="truncate text-[12px] tracking-wide text-slate-200">{nowPlaying.title}</p>
        <p className="truncate font-mono text-[9px] tracking-widest text-slate-500">
          {nowPlaying.artist} · {nowPlaying.bpm} BPM · {nowPlaying.camelot}
        </p>
      </div>

      {/* transport */}
      <div className="flex shrink-0 items-center gap-1.5 text-slate-300">
        <SkipBack className="h-3.5 w-3.5" fill="currentColor" />
        <span
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03]"
          style={{ color: 'var(--accent)' }}
        >
          <Pause className="h-4 w-4" fill="currentColor" />
        </span>
        <SkipForward className="h-3.5 w-3.5" fill="currentColor" />
      </div>

      {/* time + waveform */}
      <span className="w-9 shrink-0 text-right font-mono text-[9px] tabular-nums text-slate-500">
        2:34
      </span>
      <div className="relative h-10 min-w-0 flex-1">
        <div className="flex h-full items-center gap-[1.5px]">
          {BARS.map((h, i) => {
            const played = i / BARS.length < PLAYHEAD;
            return (
              <span
                key={i}
                className="flex-1 rounded-[1px]"
                style={{
                  height: `${(h * 100).toFixed(2)}%`,
                  background: played
                    ? 'var(--accent)'
                    : 'rgba(122,136,172,0.45)',
                  opacity: played ? 0.95 : 0.6,
                  boxShadow: played ? '0 0 6px color-mix(in srgb, var(--accent) 45%, transparent)' : undefined,
                }}
              />
            );
          })}
        </div>
        {/* playhead */}
        <span
          className="absolute top-0 h-full w-px bg-white/90"
          style={{ left: `${PLAYHEAD * 100}%`, boxShadow: '0 0 6px rgba(255,255,255,0.6)' }}
        />
      </div>
      <span className="w-9 shrink-0 font-mono text-[9px] tabular-nums text-slate-500">6:02</span>

      {/* spectrum */}
      <div className="hidden h-[30px] shrink-0 items-end gap-[2px] lg:flex">
        {SPECTRUM.map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-sm"
            style={{ height: `${(h * 100).toFixed(2)}%`, background: 'var(--accent)', opacity: 0.35 + h * 0.6 }}
          />
        ))}
      </div>

      {/* volume */}
      <div className="hidden w-24 shrink-0 items-center gap-2 text-slate-500 xl:flex">
        <Volume2 className="h-3.5 w-3.5 shrink-0" />
        <span className="relative h-1 flex-1 rounded-full bg-white/10">
          <span className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-spectrum" />
          <span className="absolute left-3/4 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </span>
      </div>
    </footer>
  );
}
