import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { MaskReveal } from '@/components/ui/MaskReveal';

/**
 * Consistent hero header for inner pages: pushes content below the fixed
 * navbar and centres an eyebrow + title + lead.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <header className="container-px pb-8 pt-36 text-center md:pt-44">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5">
        <Badge>{eyebrow}</Badge>
        <h1 className="font-display text-fluid-display font-bold text-balance">
          <MaskReveal>{title}</MaskReveal>
        </h1>
        {lead && (
          <p className="max-w-2xl text-fluid-lg text-white/60">{lead}</p>
        )}
      </Reveal>
    </header>
  );
}
