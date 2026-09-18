/**
 * Fixed ambient backdrop sitting behind every page: deep navy base, two slow
 * aurora blobs, a faint grid, a top spotlight and a film-grain layer.
 * Purely decorative — pointer-events disabled.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base vertical wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0a1026_0%,#03050f_45%,#020308_100%)]" />

      {/* Faint perspective grid, fading toward the bottom */}
      <div className="absolute inset-0 bg-grid [background-size:64px_64px] opacity-[0.35] mask-fade-b" />

      {/* Aurora blobs */}
      <div className="absolute -left-40 top-[-10%] h-[40rem] w-[40rem] rounded-full bg-galaxy-violet/20 blur-[140px] animate-pulse-glow" />
      <div className="absolute -right-32 top-[20%] h-[34rem] w-[34rem] rounded-full bg-galaxy-cyan/15 blur-[150px] animate-pulse-glow [animation-delay:1.5s]" />
      <div className="absolute bottom-[-15%] left-1/3 h-[36rem] w-[36rem] rounded-full bg-galaxy-fuchsia/10 blur-[160px] animate-pulse-glow [animation-delay:3s]" />

      {/* Top spotlight */}
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-radial-fade opacity-70" />

      {/* Grain */}
      <div className="absolute inset-0 grain opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}
