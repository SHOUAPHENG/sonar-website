import type { Metadata } from 'next';

import { Hero } from '@/components/landing/Hero';
import { Profiles } from '@/components/landing/Profiles';
import { Capabilities } from '@/components/landing/Capabilities';
import { ProductSection } from '@/components/landing/ProductSection';
import { Comparison } from '@/components/landing/Comparison';
import { FinalCTA } from '@/components/landing/FinalCTA';

export const metadata: Metadata = {
  title: 'Music Intelligence Platform',
  description:
    'SONAR transforme votre bibliothèque musicale en une carte 3D intelligente. Music intelligence for DJs, producers, beatmakers and labels.',
};

/**
 * Cinematic single-page landing (ported from the standalone HTML into the Next
 * design system). Wrapped in solid black so the global navy/aurora backdrop
 * doesn't bleed through — each section paints its own GalaxyShaderBackground.
 */
export default function LandingPage() {
  return (
    <div className="relative bg-black font-barlow">
      <Hero />
      <Profiles />
      <Capabilities />
      <ProductSection />
      <Comparison />
      <FinalCTA />
    </div>
  );
}
