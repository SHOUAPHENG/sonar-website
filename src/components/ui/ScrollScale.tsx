'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Scroll-scrubbed entrance: as the element scrolls into view it scales up,
 * fades in and settles upward — the "device rises into frame" reveal.
 */
export function ScrollScale({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.4'],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const scale = useTransform(p, [0, 1], [0.93, 1]);
  const opacity = useTransform(p, [0, 1], [0.45, 1]);
  const y = useTransform(p, [0, 1], [60, 0]);

  return (
    <div ref={ref}>
      <motion.div style={{ scale, opacity, y }} className={className}>
        {children}
      </motion.div>
    </div>
  );
}
