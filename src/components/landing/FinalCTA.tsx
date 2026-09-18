'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';

import { BlurText } from '@/components/ui/BlurText';
import { GalaxyShaderBackground } from './GalaxyShaderBackground';
import { fadeUp } from './util';

export function FinalCTA() {
  return (
    <section id="cta" className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden">
      <GalaxyShaderBackground intensity="high" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <motion.p {...fadeUp} className="mb-5 font-barlow text-xs uppercase tracking-[0.45em] text-white/60">
          Join the Private Beta
        </motion.p>

        <h2 className="font-serif-display text-6xl italic leading-[0.9] tracking-tight text-white md:text-7xl">
          <BlurText as="span" text="Ready to Navigate" className="block" />
          <BlurText as="span" text="Your Music Universe?" className="block text-white/70" />
        </h2>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
          className="mx-auto mt-6 max-w-2xl font-barlow font-light leading-snug text-white/72"
        >
          SONAR est conçu pour les DJs, producteurs, beatmakers, labels et maisons de disques qui veulent
          comprendre leur catalogue comme jamais auparavant.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full liquid-glass-strong px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Request Access
            <ArrowUpRight className="h-5 w-5" />
          </a>
          <a
            href="#product"
            className="inline-flex items-center gap-2 rounded-full liquid-glass px-7 py-3.5 text-sm text-white/90 transition-transform hover:scale-[1.03]"
          >
            View Product Preview
            <Play className="h-4 w-4" fill="currentColor" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
