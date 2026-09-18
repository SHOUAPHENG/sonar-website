import { redirect } from 'next/navigation';

/** Keep shared pricing links on the current SONAR DJ lineup. */
export default function PricingPage() {
  redirect('/#plans');
}
