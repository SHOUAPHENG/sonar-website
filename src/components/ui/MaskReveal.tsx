'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Line-mask reveal: the content rises from behind a clipping edge — the
 * signature "text slides up into view" effect of premium editorial sites.
 * Wrap each line/heading separately for a staggered cascade.
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
  as = 'span',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'span' | 'div';
}) {
  const Wrapper = as === 'div' ? motion.div : motion.span;
  return (
    <span className={cn('block overflow-hidden pb-[0.12em]', className)}>
      <Wrapper
        className="block"
        initial={{ y: '115%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </Wrapper>
    </span>
  );
}
