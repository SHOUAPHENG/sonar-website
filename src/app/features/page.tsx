import type { Metadata } from 'next';

import { PageHeader } from '@/components/layout/PageHeader';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Showcase } from '@/components/sections/Showcase';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Fonctionnalités',
  description:
    'Groove, énergie, tonalité, similarité, compatibilité : découvrez chaque dimension de la carte 3D SONAR.',
};

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fonctionnalités"
        title={
          <>
            Votre musique, vue <span className="text-gradient">en entier</span>
          </>
        }
        lead="Cinq dimensions d’analyse, une carte 3D, et une intégration profonde avec vos outils. Voici ce que SONAR met entre vos mains."
      />
      <Features />
      <Showcase />
      <HowItWorks />
      <CTA />
    </>
  );
}
