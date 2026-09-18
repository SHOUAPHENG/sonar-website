import {
  camelotCompatible,
  camelotCounts,
  camelotSelected,
} from '@/lib/mockData';

/* ───────────────────────────────────────────────────────────────────────────
   Faithful static port of the in-app Camelot wheel: 24 wedges (outer ring = B
   major, inner = A minor), hue by Camelot position, glass dome sheen + central
   hub. Shows the reference key (8A, white ring) and its compatible keys
   (accent outline). Pure presentational mock — no interaction.
   ─────────────────────────────────────────────────────────────────────────── */

const CX = 96;
const CY = 96;
const R = { inner: [34, 60] as const, outer: [64, 91] as const };
const D2R = Math.PI / 180;

function wedgePath(r0: number, r1: number, a0: number, a1: number) {
  const p = (r: number, a: number) => [CX + r * Math.cos(a), CY + r * Math.sin(a)];
  const [x0, y0] = p(r0, a0);
  const [x1, y1] = p(r1, a0);
  const [x2, y2] = p(r1, a1);
  const [x3, y3] = p(r0, a1);
  return `M${x0},${y0} L${x1},${y1} A${r1},${r1} 0 0 1 ${x2},${y2} L${x3},${y3} A${r0},${r0} 0 0 0 ${x0},${y0} Z`;
}

type Wedge = {
  key: string;
  letter: 'A' | 'B';
  path: string;
  fill: string;
  lx: number;
  ly: number;
};

function buildWedges(): Wedge[] {
  const out: Wedge[] = [];
  for (let num = 1; num <= 12; num++) {
    const mid = ((num % 12) * 30 - 90) * D2R;
    const a0 = mid - 13.4 * D2R;
    const a1 = mid + 13.4 * D2R;
    const hue = (num - 1) * 30;
    const rings = [
      ['A', R.inner, 50, 45],
      ['B', R.outer, 66, 55],
    ] as const;
    for (const [letter, [r0, r1], sat, light] of rings) {
      const rm = (r0 + r1) / 2;
      out.push({
        key: `${num}${letter}`,
        letter,
        path: wedgePath(r0, r1, a0, a1),
        fill: `hsl(${hue}, ${sat}%, ${light}%)`,
        lx: CX + rm * Math.cos(mid),
        ly: CY + rm * Math.sin(mid),
      });
    }
  }
  return out;
}

const wedges = buildWedges();

export function CamelotWheelMock() {
  return (
    <div
      className="relative w-full max-w-[212px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 backdrop-blur-xl"
      style={
        {
          ['--accent' as string]: 'var(--c1)',
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(130px 130px at 50% 64%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 72%)',
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-slate-300">
          <span className="text-[8px] opacity-70">▾</span> ROUE CAMELOT
        </span>
        <span className="px-1.5 text-[9px]" style={{ color: 'var(--accent)' }}>
          ✕ tous
        </span>
      </div>

      <svg viewBox="0 0 192 192" className="relative mt-1 w-full select-none" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="cwm-dome" cx="50%" cy="22%" r="78%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.20)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id="cwm-vig" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(3,5,12,0.88)" />
            <stop offset="60%" stopColor="rgba(3,5,12,0.45)" />
            <stop offset="100%" stopColor="rgba(3,5,12,0)" />
          </radialGradient>
          <radialGradient id="cwm-hub" cx="42%" cy="34%" r="72%">
            <stop offset="0%" stopColor="rgba(20,26,44,0.96)" />
            <stop offset="100%" stopColor="rgba(4,6,14,0.97)" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={91.5} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* coloured wedges with per-state outline */}
        {wedges.map((w) => {
          const n = camelotCounts[w.key] ?? 0;
          const empty = n === 0;
          const isSel = camelotSelected === w.key;
          const compat = camelotCompatible.has(w.key);
          const dimmed = !isSel && !compat;
          const opacity = empty ? 0.07 : isSel ? 0.99 : compat ? 0.96 : dimmed ? 0.5 : 0.82;
          const stroke = isSel
            ? '#ffffff'
            : compat
              ? 'var(--accent)'
              : 'rgba(255,255,255,0.06)';
          const sw = isSel ? 2.2 : compat ? 1.7 : 0.6;
          const glow = isSel
            ? 'drop-shadow(0 0 6px rgba(255,255,255,0.9))'
            : compat
              ? 'drop-shadow(0 0 5px var(--accent))'
              : undefined;
          return (
            <path
              key={w.key}
              d={w.path}
              fill={w.fill}
              opacity={opacity}
              stroke={stroke}
              strokeWidth={sw}
              strokeLinejoin="round"
              style={{ filter: glow }}
            />
          );
        })}

        <circle cx={CX} cy={CY} r={91.5} fill="url(#cwm-dome)" style={{ mixBlendMode: 'soft-light' }} />
        <circle cx={CX} cy={CY} r={40} fill="url(#cwm-vig)" />

        {/* labels */}
        {wedges.map((w) => {
          const n = camelotCounts[w.key] ?? 0;
          const empty = n === 0;
          const isSel = camelotSelected === w.key;
          const compat = camelotCompatible.has(w.key);
          return (
            <text
              key={`t${w.key}`}
              x={w.lx}
              y={w.ly + 2.7}
              textAnchor="middle"
              fontSize={w.letter === 'B' ? 8.6 : 7.8}
              fontWeight={isSel ? 800 : 600}
              fill={empty ? 'rgba(255,255,255,0.2)' : isSel || compat ? '#fff' : 'rgba(255,255,255,0.84)'}
              style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.35)', strokeWidth: 0.6 }}
            >
              {w.key}
            </text>
          );
        })}

        {/* glass hub */}
        <circle
          cx={CX}
          cy={CY}
          r={27}
          fill="url(#cwm-hub)"
          stroke="color-mix(in srgb, var(--accent) 38%, rgba(255,255,255,0.1))"
          strokeWidth="1.1"
        />
        <text
          x={CX}
          y={CY + 5.5}
          textAnchor="middle"
          fontSize={17}
          fontWeight="800"
          style={{
            fill: 'var(--accent)',
            filter: 'drop-shadow(0 0 6px color-mix(in srgb, var(--accent) 60%, transparent))',
          }}
        >
          {camelotSelected}
        </text>
      </svg>

      <p className="relative mt-1.5 text-[8px] leading-tight text-slate-500">
        <span style={{ color: 'color-mix(in srgb, var(--accent) 85%, white)' }}>●</span> contour =
        clés mixables avec la sélection
      </p>
    </div>
  );
}
