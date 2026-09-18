'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

import { site } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Magnetic } from '@/components/ui/Magnetic';
import { MaskReveal } from '@/components/ui/MaskReveal';

// Three.js must stay client-only; render a gradient placeholder while it loads.
const GalaxyHero = dynamic(() => import('@/components/three/GalaxyHero'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_45%,#15224a_0%,#03050f_70%)]" />
  ),
});

// Staggered entrance for the hero copy.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden">
      {/* 3D galaxy canvas */}
      <div className="absolute inset-0">
        <GalaxyHero />
      </div>

      {/* Readability + seamless blend into the page below */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_30%,transparent_40%,rgba(3,5,15,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />

      {/* Hero content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-px relative z-10 flex flex-col items-center pt-24 text-center"
      >
        <motion.div variants={item}>
          <Badge>{site.overline}</Badge>
        </motion.div>

        <h1 className="mt-6 max-w-4xl font-display text-fluid-hero font-extrabold text-balance">
          <MaskReveal delay={0.15}>
            <span className="text-white">Explorez votre musique</span>
          </MaskReveal>
          <MaskReveal delay={0.3}>
            <span className="text-white">comme une </span>
            <span
              className="text-gradient"
              style={{ filter: 'drop-shadow(0 0 40px rgba(130,120,255,0.45))' }}
            >
              galaxie
            </span>
          </MaskReveal>
        </h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-fluid-lg text-white/65 text-balance"
        >
          {site.description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic strength={0.5}>
            <Button href="/signup" size="lg" className="group">
              Commencer gratuitement
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Magnetic>
          <Magnetic strength={0.5}>
            <Button href="/dashboard" size="lg" variant="secondary" className="group">
              <Play className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Voir la démo
            </Button>
          </Magnetic>
        </motion.div>

        {/* Tiny trust row */}
        <motion.p variants={item} className="mt-8 text-xs uppercase tracking-[0.25em] text-white/35">
          Rekordbox · Serato · Producteurs · Labels
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
