'use client';

import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';

import { SectionHeader } from './SectionHeader';
import { fadeUp } from './util';

const COLS = ['Rekordbox', 'Serato', 'Spotify', 'SONAR'];
const ROWS: [string, string, string, string, string][] = [
  ['Browser musical', 'check', 'check', 'check', 'check'],
  ['BPM / Key', 'check', 'check', 'minus', 'check'],
  ['Map 3D', 'minus', 'minus', 'minus', 'check'],
  ['Groove DNA', 'minus', 'minus', 'minus', 'check'],
  ['AI Copilot', 'minus', 'minus', 'minus', 'check'],
  ['Similarité audio', 'minus', 'minus', 'Basic', 'Advanced'],
  ['Recommandations avancées', 'minus', 'minus', 'check', 'Advanced'],
  ['Analyse structure morceau', 'minus', 'minus', 'minus', 'check'],
  ['Outils label / A&R', 'minus', 'minus', 'minus', 'Advanced'],
];

function Cell({ v, highlight }: { v: string; highlight: boolean }) {
  let inner: React.ReactNode;
  if (v === 'check')
    inner = <Check className={`mx-auto h-4 w-4 ${highlight ? 'text-galaxy-cyan' : 'text-galaxy-green'}`} />;
  else if (v === 'minus') inner = <Minus className="mx-auto h-4 w-4 text-white/25" />;
  else inner = <span className={`text-xs font-semibold ${highlight ? 'text-gradient' : 'text-white/70'}`}>{v}</span>;
  return <td className={`px-4 py-3.5 text-center ${highlight ? 'bg-[rgba(34,211,238,0.06)]' : ''}`}>{inner}</td>;
}

export function Comparison() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(50% 40% at 50% 30%, rgba(167,139,250,0.10), transparent 70%)' }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 md:px-8">
        <SectionHeader
          kicker="// Comparison"
          lines={['Beyond Rekordbox.', 'Beyond Serato.']}
          subheading="SONAR ne remplace pas seulement un browser : il ajoute une couche d’intelligence musicale au-dessus de tes bibliothèques DJ, studio et label."
        />

        <motion.div {...fadeUp} className="mt-14 overflow-x-auto rounded-[1.5rem] liquid-glass">
          <table className="w-full min-w-[640px] border-collapse font-barlow text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-4 py-4 font-medium text-white/60">Feature</th>
                {COLS.map((c) => {
                  const hl = c === 'SONAR';
                  return (
                    <th
                      key={c}
                      className={`px-4 py-4 text-center font-semibold ${hl ? 'text-gradient bg-[rgba(34,211,238,0.06)]' : 'text-white/70'}`}
                    >
                      {c}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} className="border-b border-white/[0.06] last:border-0">
                  <td className="px-4 py-3.5 text-white/85">{r[0]}</td>
                  {r.slice(1).map((v, j) => (
                    <Cell key={j} v={v} highlight={COLS[j] === 'SONAR'} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
