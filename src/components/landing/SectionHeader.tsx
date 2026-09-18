'use client';

import { motion } from 'framer-motion';

import { BlurText } from '@/components/ui/BlurText';
import { fadeUp } from './util';

/** Landing section header: kicker + word-by-word two-line heading + lead. */
export function SectionHeader({
  kicker,
  lines,
  subheading,
  center = false,
  accentSecond = true,
}: {
  kicker: string;
  lines: string[];
  subheading?: string;
  center?: boolean;
  accentSecond?: boolean;
}) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <motion.p {...fadeUp} className="mb-5 font-barlow text-sm tracking-wide text-white/60">
        {kicker}
      </motion.p>
      <h2 className="font-serif-display text-5xl italic leading-[0.9] tracking-tight text-white md:text-6xl lg:text-7xl">
        {lines.map((ln, i) => (
          <BlurText
            key={i}
            as="span"
            text={ln}
            center={center}
            className={`block ${i === 1 && accentSecond ? 'text-white/70' : ''}`}
          />
        ))}
      </h2>
      {subheading && (
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
          className={`mt-6 max-w-2xl font-barlow font-light leading-snug text-white/70 ${center ? 'mx-auto' : ''}`}
        >
          {subheading}
        </motion.p>
      )}
    </div>
  );
}
