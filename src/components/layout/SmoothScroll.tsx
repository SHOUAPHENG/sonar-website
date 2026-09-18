'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Buttery momentum scrolling (Framer-style). Wraps the whole app; it adds a
 * RAF loop that drives Lenis and respects the user's reduced-motion setting.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      // Frame-rate-independent smoothing: a continuous, buttery glide that
      // keeps easing as you scroll (rather than a fixed per-gesture duration).
      lerp: 0.085,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
