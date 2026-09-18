'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Glass card with a pointer-following radial spotlight. The spotlight position
 * is written to CSS custom properties on pointer move, so the highlight tracks
 * the cursor across the surface — a hallmark of premium dark-SaaS UIs.
 */
export function GlowCard({
  children,
  className,
  accent = '#a78bfa',
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      data-cursor="hover"
      style={{ ['--accent' as string]: accent }}
      className={cn(
        'group relative overflow-hidden rounded-3xl glass p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-white/20',
        className,
      )}
    >
      {/* Pointer spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(240px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)',
        }}
      />
      {/* Bottom accent line on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-center scale-x-0 transition-transform duration-500 ease-premium group-hover:scale-x-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
