'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import { navLinks } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { ThemeSwitcher } from '@/components/layout/ThemeSwitcher';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Add the glass treatment only once the user has scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-px">
        <nav
          className={cn(
            'mt-3 flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ease-premium md:px-5',
            scrolled
              ? 'glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]'
              : 'border border-transparent bg-transparent',
          )}
        >
          <Logo />

          {/* Center links */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="hover"
                    className={cn(
                      'group relative rounded-full px-4 py-2 text-sm transition-colors',
                      active ? 'text-white' : 'text-white/60 hover:text-white',
                    )}
                  >
                    {link.label}
                    {/* Animated underline */}
                    <span
                      className={cn(
                        'absolute inset-x-4 -bottom-0.5 h-px origin-left bg-spectrum transition-transform duration-300 ease-premium',
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeSwitcher />
            <Button href="/login" variant="ghost" size="sm">
              Se connecter
            </Button>
            <Magnetic strength={0.5}>
              <Button href="/signup" variant="primary" size="sm">
                Commencer gratuitement
              </Button>
            </Magnetic>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitcher />
            <button
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen((v) => !v)}
              data-cursor="hover"
              className="grid h-10 w-10 place-items-center rounded-xl glass"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="container-px md:hidden"
          >
            <div className="mt-2 flex flex-col gap-1 rounded-2xl glass p-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button href="/login" variant="secondary" size="sm">
                  Se connecter
                </Button>
                <Button href="/signup" variant="primary" size="sm">
                  S’inscrire
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
