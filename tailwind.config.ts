import type { Config } from 'tailwindcss';

/**
 * GALAXY IO design tokens.
 * Palette aligned with the in-app LUMEN background: deep navy/black base,
 * with a cyan → violet → fuchsia spectrum used across the brand.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds — from near-black to deep galactic navy.
        ink: {
          DEFAULT: '#03050f',
          50: '#0e1330',
          100: '#0a1026',
          200: '#070b1c',
          300: '#050813',
          400: '#03050f',
          500: '#020308',
        },
        // Brand spectrum.
        galaxy: {
          cyan: '#22d3ee',
          blue: '#7db4ff',
          violet: '#a78bfa',
          fuchsia: '#e879f9',
          gold: '#ffd27a',
          green: '#34d399',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'sans-serif'],
        'serif-display': ['var(--font-instrument)', 'Georgia', 'serif'],
        barlow: ['var(--font-barlow)', 'var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      // Fluid type scale — every size interpolates smoothly with the viewport
      // via clamp(min, preferred[vw], max). No breakpoint "jumps": text is
      // perfectly scaled at every width (the hallmark of premium Framer sites).
      fontSize: {
        'fluid-sm': ['clamp(0.8125rem, 0.79rem + 0.11vw, 0.875rem)', { lineHeight: '1.5' }],
        'fluid-base': ['clamp(1rem, 0.97rem + 0.16vw, 1.0625rem)', { lineHeight: '1.65' }],
        'fluid-lg': ['clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)', { lineHeight: '1.6' }],
        'fluid-xl': ['clamp(1.125rem, 1.02rem + 0.55vw, 1.4rem)', { lineHeight: '1.4' }],
        'fluid-2xl': ['clamp(1.35rem, 1.12rem + 1.1vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'fluid-3xl': [
          'clamp(1.6rem, 1.2rem + 1.9vw, 2.5rem)',
          { lineHeight: '1.12', letterSpacing: '-0.02em' },
        ],
        'fluid-display': [
          'clamp(2.25rem, 1.25rem + 4.6vw, 4.5rem)',
          { lineHeight: '1.04', letterSpacing: '-0.03em' },
        ],
        'fluid-hero': [
          'clamp(2.75rem, 1.05rem + 7.4vw, 6.5rem)',
          { lineHeight: '0.98', letterSpacing: '-0.035em' },
        ],
        'fluid-mega': [
          'clamp(3rem, 0.8rem + 9.2vw, 8rem)',
          { lineHeight: '1', letterSpacing: '-0.03em' },
        ],
      },
      backgroundImage: {
        // Spectrum reads CSS vars so the theme switcher can recolour it live.
        'spectrum':
          'linear-gradient(90deg, var(--c1, #22d3ee), var(--c2, #a78bfa), var(--c3, #e879f9))',
        'spectrum-soft':
          'linear-gradient(90deg, transparent, var(--c1, #22d3ee), var(--c2, #a78bfa), var(--c3, #e879f9), transparent)',
        'radial-fade':
          'radial-gradient(60% 60% at 50% 40%, rgba(125,180,255,0.18), transparent 70%)',
        'grid':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(130,120,255,0.55)',
        'glow-cyan': '0 0 50px -10px rgba(34,211,238,0.5)',
        'inner-line': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
