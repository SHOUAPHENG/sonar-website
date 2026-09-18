import { steps } from '@/lib/features';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealItem } from '@/components/ui/Reveal';

/**
 * Three-step flow: import → analyse → explore. A connecting line threads the
 * steps on desktop.
 */
export function HowItWorks() {
  return (
    <section className="container-px py-28">
      <SectionHeading
        eyebrow="En trois temps"
        title={
          <>
            De votre bibliothèque <span className="text-gradient">à la galaxie</span>
          </>
        }
        lead="Aucune réorganisation manuelle. Connectez, laissez l’IA travailler, puis explorez."
      />

      <div className="relative mt-16">
        {/* Connecting line (desktop) */}
        <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />

        <Reveal stagger className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <RevealItem key={s.n} className="relative">
              <div className="flex flex-col items-start gap-5">
                <div className="relative grid h-24 w-24 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-spectrum opacity-10 blur-xl" />
                  <div className="grid h-16 w-16 place-items-center rounded-2xl glass">
                    <s.icon className="h-7 w-7 text-galaxy-violet" />
                  </div>
                  <span className="absolute -right-1 -top-1 font-display text-sm font-bold text-white/30">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/55">{s.desc}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
