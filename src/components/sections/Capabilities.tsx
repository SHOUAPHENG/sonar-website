import { Orbit, KeyRound, GitCompareArrows, type LucideIcon } from 'lucide-react';

import { FadingVideo } from '@/components/ui/FadingVideo';
import { BlurText } from '@/components/ui/BlurText';
import { Reveal, RevealItem } from '@/components/ui/Reveal';

const CAPABILITIES_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4';

type Card = {
  icon: LucideIcon;
  tags: string[];
  title: string;
  body: string;
};

const cards: Card[] = [
  {
    icon: Orbit,
    tags: ['Groove', 'Énergie', 'Tonalité', 'Similarité'],
    title: 'Carte 3D',
    body: 'Toute votre bibliothèque devient une galaxie navigable où la distance entre deux étoiles traduit leur ressemblance sonore.',
  },
  {
    icon: KeyRound,
    tags: ['Roue Camelot', 'Clés compatibles', 'Transitions', 'Sans fausse note'],
    title: 'Mix harmonique',
    body: 'La roue de Camelot met en avant les clés mixables avec votre sélection pour enchaîner sans le moindre accroc.',
  },
  {
    icon: GitCompareArrows,
    tags: ['Embeddings', 'Plus proches voisins', 'Par feeling', 'En un clic'],
    title: 'Similarité IA',
    body: 'Un modèle contrastif encode chaque morceau ; trouvez instantanément les titres qui sonnent ensemble.',
  },
];

/**
 * Full-height cinematic section: a crossfading background video (no overlay)
 * with all contrast carried by the liquid-glass chrome. Heading animates in
 * word-by-word; the three capability cards reveal on scroll.
 */
export function Capabilities() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <FadingVideo
        src={CAPABILITIES_VIDEO}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex min-h-screen flex-col px-8 pb-10 pt-28 md:px-16 lg:px-20">
        {/* Header */}
        <div className="mb-auto">
          <p className="mb-6 font-sans text-sm text-white/80">// Capacités</p>
          <BlurText
            as="h2"
            text="Une exploration augmentée"
            className="max-w-3xl font-serif-display text-5xl italic leading-[0.9] tracking-tight text-white md:text-7xl lg:text-[6rem] !justify-start"
          />
        </div>

        {/* Cards */}
        <Reveal stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <RevealItem key={card.title}>
              <article className="liquid-glass flex min-h-[360px] flex-col rounded-[1.25rem] p-6">
                {/* Top: icon + tags */}
                <div className="flex items-start justify-between gap-4">
                  <div className="liquid-glass grid h-11 w-11 place-items-center rounded-[0.75rem]">
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex max-w-[70%] flex-wrap justify-end gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass whitespace-nowrap rounded-full px-3 py-1 font-sans text-[11px] text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Bottom: title + body */}
                <div className="mt-6">
                  <h3 className="font-serif-display text-3xl italic leading-none tracking-tight text-white md:text-4xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] font-sans text-sm font-light leading-snug text-white/90">
                    {card.body}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
