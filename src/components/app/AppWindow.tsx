import { cn } from '@/lib/utils';

/**
 * Premium app-window chrome used to frame the product mockups like a real
 * screenshot: rounded glass shell, traffic-light dots, a faux title bar and a
 * soft outer glow. The brand spectrum vars feed the app's --accent tokens so
 * the mockups also follow the active theme.
 */
export function AppWindow({
  title = 'SONAR',
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('relative rounded-2xl', className)}
      style={
        {
          // Map the marketing spectrum onto the app's accent tokens.
          ['--accent' as string]: 'var(--c1)',
          ['--accent2' as string]: 'var(--c2)',
        } as React.CSSProperties
      }
    >
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-spectrum opacity-20 blur-xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#04060f]/90 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <span className="rounded-md bg-white/[0.04] px-3 py-0.5 text-[11px] text-white/40">
              {title}
            </span>
          </div>
          <div className="w-12" />
        </div>

        {children}
      </div>
    </div>
  );
}
