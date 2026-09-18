import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-galaxy-violet/70 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  // Gradient pill with a soft outer glow that intensifies on hover.
  primary:
    'text-ink-500 bg-spectrum shadow-[0_8px_30px_-8px_rgba(167,139,250,0.6)] hover:shadow-[0_10px_40px_-6px_rgba(167,139,250,0.85)] hover:brightness-110 hover:-translate-y-0.5',
  // Frosted glass.
  secondary:
    'text-white glass hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5',
  // Minimal text button.
  ghost: 'text-white/70 hover:text-white hover:bg-white/[0.06]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Polymorphic button: renders a Next <Link> when given `href`, otherwise a
 * native <button>. Three premium variants. Marked as a cursor hover target.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);

    // Light "sheen" that sweeps across primary buttons on hover.
    const inner = (
      <>
        {variant === 'primary' && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.5),transparent)] transition-transform duration-700 ease-premium group-hover:translate-x-full"
          />
        )}
        <span className="relative inline-flex items-center gap-2">{children}</span>
      </>
    );

    if ('href' in props && props.href !== undefined) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...rest}
        >
          {inner}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonAsButton)}
      >
        {inner}
      </button>
    );
  },
);
Button.displayName = 'Button';
