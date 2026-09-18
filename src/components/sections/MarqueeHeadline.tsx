/**
 * Oversized scrolling headline band — two rows drifting in opposite directions.
 * Outline/ghost text in the brand spectrum; a recognizable editorial accent
 * between content sections.
 */
const PHRASE = 'Explore your music like a galaxy';

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = Array.from({ length: 4 });
  return (
    <div
      className={`flex w-max gap-10 whitespace-nowrap ${
        reverse ? 'animate-marquee [animation-direction:reverse]' : 'animate-marquee'
      }`}
    >
      {items.map((_, i) => (
        <span
          key={i}
          className="font-display text-fluid-mega font-extrabold text-white/[0.06]"
        >
          {PHRASE} <span className="text-gradient opacity-60">✦</span>
        </span>
      ))}
    </div>
  );
}

export function MarqueeHeadline() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] py-12">
      <div className="flex flex-col gap-3 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
