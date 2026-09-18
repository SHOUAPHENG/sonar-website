'use client';

import { AudioWaveform, Disc3, LayoutGrid, Library, ArrowUpRight, type LucideIcon } from 'lucide-react';

import { GalaxyShaderBackground } from './GalaxyShaderBackground';
import { SectionHeader } from './SectionHeader';
import { LiquidCard } from './LiquidCard';
import { Reveal, RevealItem } from '@/components/ui/Reveal';

type Profile = {
  title: string;
  mode: string;
  accent: string;
  Icon: LucideIcon;
  desc: string;
  pills: string[];
};

const PROFILES: Profile[] = [
  {
    title: 'Producteur / Beatmaker',
    mode: 'Studio Mode',
    accent: '#a78bfa',
    Icon: AudioWaveform,
    desc: 'Analyse les stems, les samples, les grooves, l’harmonie et la structure pour comprendre chaque morceau comme une session de production.',
    pills: ['Stems', 'Groove DNA', 'Harmony', 'Samples'],
  },
  {
    title: 'Maison de disque / Label',
    mode: 'A&R Mode',
    accent: '#ffd27a',
    Icon: Disc3,
    desc: 'Classe un catalogue, repère les démos fortes, détecte les similarités et mesure le potentiel commercial d’un morceau.',
    pills: ['A&R', 'Catalog', 'Hit Score', 'Trends'],
  },
  {
    title: 'DJ — Rekordbox',
    mode: 'DJ Library Mode',
    accent: '#22d3ee',
    Icon: LayoutGrid,
    desc: 'Importe playlists, notes, couleurs et commentaires Rekordbox pour créer des sets plus fluides grâce à la compatibilité intelligente.',
    pills: ['BPM', 'Camelot', 'Energy', 'Playlists'],
  },
  {
    title: 'DJ — Serato',
    mode: 'Crate Mode',
    accent: '#34d399',
    Icon: Library,
    desc: 'Organise crates, tags ID3, morceaux favoris et préparations de set avec une analyse audio avancée et visuelle.',
    pills: ['Crates', 'ID3 Tags', 'Prep', 'Mix Path'],
  },
];

export function Profiles() {
  return (
    <section id="profiles" className="relative min-h-screen overflow-hidden">
      <GalaxyShaderBackground intensity="medium" glow={false} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:px-8">
        <SectionHeader
          kicker="// Choose Your Universe"
          lines={['Four Workflows.', 'One Music Brain.']}
          subheading="Chaque profil ouvre une expérience pensée pour un métier précis : préparer un set, analyser une production, organiser un catalogue ou repérer le prochain hit."
        />

        <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PROFILES.map((p) => (
            <RevealItem key={p.title}>
              <LiquidCard className="flex min-h-[220px] flex-col justify-between rounded-[1.75rem] p-7">
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full"
                    style={{ background: `${p.accent}1f`, boxShadow: `0 0 28px -8px ${p.accent}` }}
                  >
                    <p.Icon className="h-6 w-6" style={{ color: p.accent }} />
                  </span>
                  <span className="font-barlow text-xs uppercase tracking-[0.2em] text-white/55">{p.mode}</span>
                </div>

                <div className="mt-6">
                  <h3 className="font-barlow text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 font-barlow text-sm font-light leading-snug text-white/65">{p.desc}</p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.pills.map((t) => (
                      <span key={t} className="rounded-full liquid-glass px-2.5 py-1 font-barlow text-[11px] text-white/85">
                        {t}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0" style={{ color: p.accent }} />
                </div>
              </LiquidCard>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
