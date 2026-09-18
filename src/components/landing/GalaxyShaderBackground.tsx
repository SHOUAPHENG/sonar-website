import { det } from './util';

/**
 * Lumenshaders-style backdrop, dependency-free: large blurred vertical light
 * beams (cyan/violet/magenta/blue/gold) in mix-blend-screen, a radial glow,
 * deterministic star particles and a noise overlay. `intensity` scales opacity
 * per section. Pure CSS animations (beamDrift / twinkle in globals.css).
 */
const BEAMS = [
  { left: '8%', w: 170, color: '#7db4ff', dur: 22, delay: 0, o: 0.3 },
  { left: '24%', w: 120, color: '#22d3ee', dur: 18, delay: 2, o: 0.34 },
  { left: '46%', w: 220, color: '#a78bfa', dur: 26, delay: 1, o: 0.3 },
  { left: '66%', w: 150, color: '#e879f9', dur: 20, delay: 3, o: 0.26 },
  { left: '83%', w: 120, color: '#ffd27a', dur: 24, delay: 1.5, o: 0.16 },
];

const STARS = Array.from({ length: 46 }, (_, i) => ({
  top: det(i, 1) * 100,
  left: det(i, 2) * 100,
  s: det(i, 3) * 1.6 + 0.6,
  d: det(i, 4) * 6 + 3,
  delay: det(i, 5) * 6,
}));

export function GalaxyShaderBackground({
  intensity = 'high',
  glow = true,
}: {
  intensity?: 'high' | 'medium' | 'low';
  glow?: boolean;
}) {
  const mult = intensity === 'high' ? 1 : intensity === 'medium' ? 0.6 : 0.32;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {glow && intensity === 'high' && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 36%, rgba(34,211,238,0.16), rgba(167,139,250,0.10) 42%, transparent 72%)',
          }}
        />
      )}

      {BEAMS.map((b, i) => (
        <div
          key={i}
          className="absolute top-[-22%] h-[144%]"
          style={{
            left: b.left,
            width: b.w,
            opacity: b.o * mult,
            mixBlendMode: 'screen',
            filter: 'blur(72px)',
            background: `linear-gradient(180deg, transparent, ${b.color}, transparent)`,
            animation: `beamDrift ${b.dur}s ease-in-out ${b.delay}s infinite`,
          }}
        />
      ))}

      {STARS.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${st.top}%`,
            left: `${st.left}%`,
            width: st.s,
            height: st.s,
            opacity: 0.4 * mult,
            animation: `twinkle ${st.d}s ease-in-out ${st.delay}s infinite`,
          }}
        />
      ))}

      <div className="noise absolute inset-0" />
    </div>
  );
}
