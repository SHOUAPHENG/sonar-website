/**
 * Deterministic pseudo-random in [0,1) — used for background stars and mockup
 * dots so the server and client render identically (no hydration mismatch).
 */
export const det = (i: number, salt = 1) => {
  const x = Math.sin((i + 1) * 12.9898 * salt) * 43758.5453;
  return x - Math.floor(x);
};

/** Shared scroll-reveal preset for the landing route. */
export const fadeUp = {
  initial: { filter: 'blur(10px)', opacity: 0, y: 22 },
  whileInView: { filter: 'blur(0px)', opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.75, ease: 'easeOut' },
} as const;
