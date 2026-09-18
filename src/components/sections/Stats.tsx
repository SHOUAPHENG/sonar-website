'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

import { Reveal } from '@/components/ui/Reveal';

type Stat = { value: number; suffix?: string; prefix?: string; label: string };

const stats: Stat[] = [
  { value: 10, suffix: 'K+', label: 'morceaux cartographiés en secondes' },
  { value: 5, label: 'dimensions d’exploration' },
  { value: 24, label: 'clés harmoniques (Camelot)' },
  { value: 60, suffix: ' fps', label: 'galaxie 3D temps réel' },
];

/** Counts from 0 to `value` once it scrolls into view. */
function Counter({ value, prefix = '', suffix = '' }: Stat) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(display)}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="container-px py-20">
      <Reveal>
        <div className="grid grid-cols-2 gap-y-12 rounded-3xl glass px-6 py-12 md:grid-cols-4 md:px-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <div className="font-display text-fluid-display font-extrabold text-gradient">
                <Counter {...s} />
              </div>
              <div className="mt-3 max-w-[12rem] text-fluid-sm text-white/55">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
