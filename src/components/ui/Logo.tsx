import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * SONAR wordmark. "SON" in white, "AR" in the brand gradient with a soft glow,
 * next to a sonar glyph (concentric ping rings + sweep) — mirrors the in-app identity.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="SONAR — accueil"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      {/* Sonar glyph */}
      <span className="relative grid h-8 w-8 place-items-center">
        <span className="absolute inset-0 rounded-full bg-spectrum opacity-30 blur-md transition-opacity group-hover:opacity-60" />
        <svg viewBox="0 0 32 32" className="relative h-8 w-8" fill="none">
          <circle cx="16" cy="16" r="13" stroke="url(#g)" strokeWidth="1.2" opacity="0.45" />
          <circle cx="16" cy="16" r="8.5" stroke="url(#g)" strokeWidth="1.2" opacity="0.7" />
          <circle cx="16" cy="16" r="4" stroke="url(#g)" strokeWidth="1.2" />
          <line x1="16" y1="16" x2="27" y2="9" stroke="url(#g)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="1.7" fill="#e8ebff" />
          <circle cx="23" cy="22" r="1.5" fill="#e879f9" />
          <defs>
            <linearGradient id="g" x1="3" y1="16" x2="29" y2="16">
              <stop stopColor="#22d3ee" />
              <stop offset="0.5" stopColor="#a78bfa" />
              <stop offset="1" stopColor="#e879f9" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-[0.18em]">
        <span className="text-white">SON</span>
        <span
          className="text-gradient"
          style={{ filter: 'drop-shadow(0 0 18px rgba(130,120,255,0.45))' }}
        >
          AR
        </span>
      </span>
    </Link>
  );
}
