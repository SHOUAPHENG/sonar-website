'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Glass card with a gentle, non-aggressive hover lift (scale 1.015, y -3). */
export function LiquidCard({
  strong = false,
  hover = true,
  className,
  style,
  children,
}: {
  strong?: boolean;
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={cn(strong ? 'liquid-glass-strong' : 'liquid-glass', className)}
      style={style}
      whileHover={hover ? { scale: 1.015, y: -3 } : undefined}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
    >
      {children}
    </motion.div>
  );
}
