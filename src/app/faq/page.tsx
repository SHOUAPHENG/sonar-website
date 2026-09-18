import type { Metadata } from 'next';

import { faqs } from '@/lib/faq';
import { PageHeader } from '@/components/layout/PageHeader';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Toutes les réponses sur SONAR : compatibilité, sécurité, similarité, abonnements.',
};

export default function FAQPage() {
  return (
    <>
      <PageHeader
        eyebrow="Aide"
        title={
          <>
            Questions <span className="text-gradient">fréquentes</span>
          </>
        }
        lead="Une question ? La réponse est probablement ici. Sinon, l’équipe vous répond sous 24 h."
      />

      <section className="container-px py-12">
        <Reveal className="mx-auto max-w-3xl">
          <Accordion items={faqs} />
        </Reveal>
      </section>

      <CTA />
    </>
  );
}
