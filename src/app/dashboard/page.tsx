'use client';

import { motion } from 'framer-motion';
import {
  LayoutGrid,
  Orbit,
  Library,
  Settings,
  TrendingUp,
  Music2,
  Activity,
  Sparkles,
} from 'lucide-react';

import { Logo } from '@/components/ui/Logo';
import { AppShowcase } from '@/components/app/AppShowcase';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'Morceaux analysés', value: '4 218', icon: Music2, accent: '#22d3ee' },
  { label: 'Playlists', value: '37', icon: Library, accent: '#a78bfa' },
  { label: 'Compatibilité moy.', value: '92%', icon: TrendingUp, accent: '#e879f9' },
  { label: 'Énergie moy.', value: '0.74', icon: Activity, accent: '#7db4ff' },
];

const nav = [
  { label: 'Vue d’ensemble', icon: LayoutGrid, active: true },
  { label: 'Galaxie 3D', icon: Orbit },
  { label: 'Bibliothèque', icon: Library },
  { label: 'Réglages', icon: Settings },
];

export default function DashboardPage() {
  return (
    <div className="container-px pb-24 pt-28">
      {/* Demo banner */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-galaxy-violet/30 bg-galaxy-violet/10 px-4 py-2.5 text-sm text-white/70">
        <Sparkles className="h-4 w-4 text-galaxy-violet" />
        Aperçu de démonstration — données fictives.
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="hidden flex-col gap-6 lg:flex">
          <Logo />
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <button
                key={n.label}
                data-cursor="hover"
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors',
                  n.active
                    ? 'bg-white/[0.06] text-white'
                    : 'text-white/55 hover:bg-white/[0.04] hover:text-white',
                )}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl glass p-4">
            <p className="text-xs text-white/50">Offre Producer</p>
            <p className="mt-1 text-sm text-white">Bibliothèque illimitée</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-spectrum" />
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="rounded-2xl glass p-5"
              >
                <s.icon className="h-5 w-5" style={{ color: s.accent }} />
                <div className="mt-4 font-display text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/50">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* The app, live */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <AppShowcase />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
