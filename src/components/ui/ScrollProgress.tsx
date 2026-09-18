'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin spectrum progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-spectrum shadow-[0_0_12px_rgba(167,139,250,0.6)]"
    />
  );
}
