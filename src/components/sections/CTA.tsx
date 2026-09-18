import { ArrowRight } from 'lucide-react';

import { site } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/** Final call-to-action band. */
export function CTA() {
  return (
    <section className="container-px py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] glass px-8 py-20 text-center md:px-16">
          {/* Glow field */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-galaxy-violet/30 blur-[120px]" />
            <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-galaxy-cyan/20 blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-galaxy-fuchsia/20 blur-[120px]" />
          </div>

          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-fluid-display font-bold text-balance">
              {site.slogan}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-fluid-lg text-white/60">
              Rejoignez les DJs, producteurs et labels qui voient enfin leur musique
              en entier.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/signup" size="lg" className="group">
                Commencer gratuitement
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button href="/download" size="lg" variant="secondary">
                Télécharger l’application
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
