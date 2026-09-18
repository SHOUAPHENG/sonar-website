import { faqs } from '@/lib/faq';
import { Accordion } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

/** Home-page FAQ teaser — first few questions + link to the full page. */
export function FAQPreview() {
  return (
    <section className="container-px py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title={
            <>
              Les questions <span className="text-gradient">fréquentes</span>
            </>
          }
          lead="Tout ce qu’il faut savoir avant de lancer votre première galaxie."
          className="lg:sticky lg:top-28"
        />
        <div>
          <Reveal>
            <Accordion items={faqs.slice(0, 5)} />
          </Reveal>
          <Reveal className="mt-6">
            <Button href="/faq" variant="ghost" size="sm">
              Voir toutes les questions →
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
