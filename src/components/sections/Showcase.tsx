import { GitCompareArrows, Disc3, KeyRound, AudioWaveform } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Tilt } from '@/components/ui/Tilt';
import { ScrollScale } from '@/components/ui/ScrollScale';
import { AppShowcase } from '@/components/app/AppShowcase';
import { CamelotWheelMock } from '@/components/app/CamelotWheelMock';
import { PlayerBarMock } from '@/components/app/PlayerBarMock';

/**
 * The product, shown for real: a composited screenshot of the desktop app,
 * then zoom-ins on its signature pieces (Camelot wheel, integrated player,
 * similarity matches).
 */
export function Showcase() {
  return (
    <section className="container-px py-28">
      <SectionHeading
        eyebrow="L’application"
        title={
          <>
            Votre studio, <span className="text-gradient">en orbite</span>
          </>
        }
        lead="La galaxie 3D, le dock de playlists, la roue de Camelot et le lecteur intégré — tout au même endroit, fluide et précis."
      />

      {/* Full app window — rises in on scroll, tilts toward the pointer */}
      <ScrollScale className="mt-16">
        <Tilt max={5}>
          <AppShowcase />
        </Tilt>
      </ScrollScale>

      {/* Integrated player */}
      <Reveal className="mt-5">
        <div className="rounded-3xl glass p-6">
          <div className="mb-4 flex items-center gap-2 text-white/50">
            <AudioWaveform className="h-4 w-4 text-galaxy-cyan" />
            <span className="text-xs font-medium uppercase tracking-[0.2em]">
              Lecteur intégré · waveform, BPM, clé
            </span>
          </div>
          <PlayerBarMock />
        </div>
      </Reveal>

      {/* Camelot + similarity */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col items-start gap-5 rounded-3xl glass p-7 sm:flex-row sm:items-center">
            <CamelotWheelMock />
            <div>
              <div className="flex items-center gap-2 text-white/50">
                <KeyRound className="h-4 w-4 text-galaxy-violet" />
                <span className="text-xs font-medium uppercase tracking-[0.2em]">Tonalité</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">
                Mix harmonique sans fausse note
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                La roue de Camelot met en avant les clés compatibles avec votre
                sélection. Filtrez votre galaxie d’un clic sur une clé.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl glass p-7">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-galaxy-fuchsia/15">
                <GitCompareArrows className="h-5 w-5 text-galaxy-fuchsia" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">
                  Morceaux similaires, en un clic
                </h3>
                <p className="text-sm text-white/55">
                  Plus proches voisins par embedding, triés par ressemblance.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {[
                ['Nightdrive — Auralis', 98],
                ['Lunar Tide — Mørk', 95],
                ['Violet Hour — Sundae', 91],
                ['Echo Chamber — KLN', 88],
              ].map(([label, match]) => (
                <div key={label as string} className="flex items-center gap-3">
                  <Disc3 className="h-4 w-4 shrink-0 text-white/40" />
                  <span className="min-w-0 flex-1 truncate text-sm text-white/75">{label}</span>
                  <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-white/10 sm:block">
                    <div className="h-full rounded-full bg-spectrum" style={{ width: `${match}%` }} />
                  </div>
                  <span className="w-9 text-right text-xs font-medium text-galaxy-cyan">
                    {match}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
