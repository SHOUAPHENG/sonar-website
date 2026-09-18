import { compatibility } from '@/lib/site';

/**
 * Infinite, edge-faded marquee of compatible apps. The track is duplicated and
 * translated -50% so the loop is seamless.
 */
export function LogoMarquee() {
  const items = [...compatibility, ...compatibility];

  return (
    <section className="relative py-14">
      <p className="container-px mb-8 text-center text-xs uppercase tracking-[0.3em] text-white/35">
        Conçu pour s’intégrer à votre flux de travail
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-14 pr-14">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none whitespace-nowrap font-display text-xl font-semibold text-white/30 transition-colors hover:text-white/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
