'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';

import { applyTheme, defaultThemeId, themes, themeStorageKey } from '@/lib/themes';
import { cn } from '@/lib/utils';

/**
 * Accent-theme picker. Writes the selected spectrum to CSS variables and
 * persists it. A matching inline script in the layout applies the saved theme
 * before paint, so there's no flash.
 */
export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(defaultThemeId);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(themeStorageKey) ?? defaultThemeId;
    setActive(saved);
  }, []);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const select = (id: string) => {
    setActive(id);
    applyTheme(id);
    localStorage.setItem(themeStorageKey, id);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Changer de thème"
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
        className="grid h-9 w-9 place-items-center rounded-full glass text-white/70 transition-colors hover:text-white"
      >
        <Palette className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-12 w-52 rounded-2xl glass p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            <p className="px-2.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Thème d’accent
            </p>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => select(t.id)}
                data-cursor="hover"
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors',
                  active === t.id ? 'bg-white/[0.07] text-white' : 'text-white/65 hover:bg-white/5',
                )}
              >
                <span
                  className="h-4 w-8 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${t.stops[0]}, ${t.stops[1]}, ${t.stops[2]})`,
                  }}
                />
                <span className="flex-1 text-left">{t.label}</span>
                {active === t.id && <Check className="h-4 w-4 text-white/80" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
