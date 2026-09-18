'use client';

import { motion } from 'framer-motion';

/**
 * Word-by-word blur-in headline. Each word springs up from blur(10px)/opacity 0
 * through a 3-step keyframe, staggered by 100ms, when it scrolls into view
 * (~10% visible). Words use marginRight (not nbsp) so tight tracking stays clean.
 */
export function BlurText({
  text,
  className,
  as: Tag = 'p',
  center = true,
}: {
  text: string;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span';
  center?: boolean;
}) {
  const words = text.split(' ');

  return (
    <Tag
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: center ? 'center' : 'flex-start',
        rowGap: '0.1em',
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          whileInView={{
            filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
            opacity: [0, 0.5, 1],
            y: [50, -5, 0],
          }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: 'easeOut',
            delay: (i * 100) / 1000,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
