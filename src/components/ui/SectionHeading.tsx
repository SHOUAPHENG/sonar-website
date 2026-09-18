import { Badge } from './Badge';
import { Reveal } from './Reveal';
import { MaskReveal } from './MaskReveal';
import { cn } from '@/lib/utils';

/**
 * Standard centered section header: eyebrow badge + large title + lead text.
 * Wrapped in Reveal so it animates on scroll.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        'flex max-w-3xl flex-col gap-5',
        align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2 className="font-display text-fluid-display font-bold text-balance">
        <MaskReveal>{title}</MaskReveal>
      </h2>
      {lead && (
        <p className="max-w-2xl text-fluid-lg text-white/60">{lead}</p>
      )}
    </Reveal>
  );
}
