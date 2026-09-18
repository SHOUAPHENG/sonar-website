import { features } from '@/lib/features';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlowCard } from '@/components/ui/GlowCard';
import { Reveal, RevealItem } from '@/components/ui/Reveal';

/**
 * The five exploration axes + the 3D map, as a responsive grid of glow cards.
 */
export function Features() {
  return (
    <section id="features" className="container-px py-28">
      <SectionHeading
        eyebrow="Cinq dimensions"
        title={
          <>
            Une seule carte,{' '}
            <span className="text-gradient">cinq façons</span> d’explorer
          </>
        }
        lead="SONAR ne trie pas votre musique en listes. Il la place dans un espace où chaque axe révèle une affinité différente entre vos morceaux."
      />

      <Reveal stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <RevealItem key={f.title}>
            <GlowCard accent={f.accent} className="h-full">
              <div
                className="mb-6 grid h-12 w-12 place-items-center rounded-2xl"
                style={{
                  background: `${f.accent}1f`,
                  boxShadow: `0 0 30px -10px ${f.accent}`,
                }}
              >
                <f.icon className="h-6 w-6" style={{ color: f.accent }} />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                {f.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/55">
                {f.desc}
              </p>
            </GlowCard>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
