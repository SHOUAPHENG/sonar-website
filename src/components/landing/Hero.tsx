'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';

import { BlurText } from '@/components/ui/BlurText';
import { GalaxyShaderBackground } from './GalaxyShaderBackground';
import { fadeUp } from './util';

const STATS = [
  { big: '20K+', label: 'Tracks analyzed' },
  { big: '3D', label: 'Map · Music universe' },
  { big: 'AI', label: 'Recommendations · Audio similarity' },
  { big: '4', label: 'Workflows · DJ, producer, label, A&R' },
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <GalaxyShaderBackground intensity="high" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-32 text-center">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full liquid-glass px-2 py-1"
        >
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">New</span>
          <span className="pr-3 text-sm text-white/90">Music Intelligence for DJs, Producers &amp; Labels</span>
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.2 }}
          className="mb-[18px] mt-7 font-barlow text-xs uppercase tracking-[0.45em] text-white/60"
        >
          Music Intelligence Platform
        </motion.p>

        <BlurText
          as="h1"
          text="Explore Your Music Like a Galaxy"
          className="mx-auto max-w-4xl font-serif-display text-6xl italic leading-[0.82] tracking-[-4px] text-white md:text-7xl lg:text-[6.4rem]"
        />

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl font-barlow text-base font-light leading-tight text-white/72 md:text-lg"
        >
          SONAR transforme votre bibliothèque musicale en une carte 3D intelligente capable de révéler des
          connexions invisibles entre les morceaux, les artistes, les grooves et les émotions.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full liquid-glass-strong px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Enter the Galaxy
            <ArrowUpRight className="h-5 w-5" />
          </a>
          <a
            href="#product"
            className="inline-flex items-center gap-2 rounded-full liquid-glass px-6 py-3 text-sm text-white/90 transition-transform hover:scale-[1.03]"
          >
            Watch Demo
            <Play className="h-4 w-4" fill="currentColor" />
          </a>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.65 }}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="rounded-[1.25rem] liquid-glass p-5 text-left">
              <div className="font-serif-display text-4xl italic text-white">{s.big}</div>
              <div className="mt-2 font-barlow text-xs text-white/60">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.8 }}
          className="mt-10 flex justify-center"
        >
          <span className="rounded-full liquid-glass px-4 py-2 font-barlow text-xs text-white/70">
            Built for Rekordbox, Serato, producers, beatmakers and music teams.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
