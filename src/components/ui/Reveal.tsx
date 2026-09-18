'use client';

import { motion, type Variants } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

/**
 * Scroll-triggered reveal. Fades + slides in once when it enters the viewport.
 * `delay` staggers siblings; wrap a list with <Reveal stagger> to cascade
 * direct children automatically.
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  stagger = false,
  className,
  once = true,
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  stagger?: boolean;
  className?: string;
  once?: boolean;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: '-80px' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child for use inside <Reveal stagger>. */
export function RevealItem({
  children,
  direction = 'up',
  className,
}: {
  children: React.ReactNode;
  direction?: Direction;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset[direction] },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
