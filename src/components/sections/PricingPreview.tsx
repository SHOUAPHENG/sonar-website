import { SectionHeading } from '@/components/ui/SectionHeading';
import { Pricing } from '@/components/sections/Pricing';
import { Reveal } from '@/components/ui/Reveal';

/** Home-page pricing section. */
export function PricingPreview() {
  return (
    <section id="pricing" className="container-px py-28">
      <SectionHeading
        eyebrow="Tarifs"
        title={
          <>
            Un plan pour chaque <span className="text-gradient">explorateur</span>
          </>
        }
        lead="Commencez gratuitement. Évoluez quand votre bibliothèque grandit. Sans engagement."
      />
      <Reveal className="mt-16">
        <Pricing />
      </Reveal>
    </section>
  );
}
