import type { Metadata } from 'next';
import { Apple, Monitor, Download as DownloadIcon, Cpu, HardDrive, Wand2 } from 'lucide-react';

import { PageHeader } from '@/components/layout/PageHeader';
import { Reveal, RevealItem } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { GlowCard } from '@/components/ui/GlowCard';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Télécharger',
  description: 'Téléchargez SONAR pour Windows et macOS et transformez votre bibliothèque en galaxie 3D.',
};

const platforms = [
  {
    icon: Monitor,
    name: 'Windows',
    detail: 'Windows 10 / 11 · 64-bit',
    file: 'SONAR-Setup-0.2.0.exe',
    accent: '#22d3ee',
  },
  {
    icon: Apple,
    name: 'macOS',
    detail: 'macOS 12+ · Apple Silicon & Intel',
    file: 'SONAR-0.2.0.dmg',
    accent: '#a78bfa',
  },
];

const requirements = [
  { icon: Cpu, label: 'Processeur', value: 'Quad-core récent (Apple Silicon recommandé)' },
  { icon: HardDrive, label: 'Stockage', value: '500 Mo + cache d’analyse' },
  { icon: Wand2, label: 'GPU', value: 'Carte compatible WebGL2 pour la carte 3D' },
];

export default function DownloadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Application de bureau"
        title={
          <>
            Téléchargez <span className="text-gradient">SONAR</span>
          </>
        }
        lead="Une application native, rapide et privée. Toute l’analyse s’effectue sur votre machine."
      />

      <section className="container-px py-12">
        <Reveal stagger className="grid gap-5 md:grid-cols-2">
          {platforms.map((p) => (
            <RevealItem key={p.name}>
              <GlowCard accent={p.accent} className="h-full">
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-14 w-14 place-items-center rounded-2xl"
                    style={{ background: `${p.accent}1f`, boxShadow: `0 0 30px -10px ${p.accent}` }}
                  >
                    <p.icon className="h-7 w-7" style={{ color: p.accent }} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">{p.name}</h3>
                    <p className="text-sm text-white/50">{p.detail}</p>
                  </div>
                </div>
                <Button href="#" className="mt-7 w-full">
                  <DownloadIcon className="h-4 w-4" />
                  Télécharger pour {p.name}
                </Button>
                <p className="mt-3 text-center text-xs text-white/35">{p.file} · gratuit</p>
              </GlowCard>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-12">
          <div className="rounded-3xl glass p-8">
            <h2 className="font-display text-lg font-semibold text-white">
              Configuration recommandée
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {requirements.map((r) => (
                <div key={r.label} className="flex items-start gap-3">
                  <r.icon className="mt-0.5 h-5 w-5 text-galaxy-cyan" />
                  <div>
                    <div className="text-sm font-medium text-white">{r.label}</div>
                    <div className="text-sm text-white/55">{r.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <CTA />
    </>
  );
}
