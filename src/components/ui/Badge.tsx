import { cn } from '@/lib/utils';

/**
 * Small glass pill used as a section eyebrow. Optionally shows a pulsing dot.
 */
export function Badge({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70',
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-galaxy-cyan opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-galaxy-cyan" />
        </span>
      )}
      {children}
    </span>
  );
}
