import Link from 'next/link';
import { Github, Twitter, Youtube, Mail } from 'lucide-react';

import { footerGroups, site } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';

const socials = [
  { icon: Twitter, href: '#', label: 'X / Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: `mailto:${site.email}`, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10">
      {/* Spectrum hairline along the top edge */}
      <div className="spectrum-rule absolute inset-x-0 top-0 opacity-60" />

      <div className="container-px py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              {site.slogan} Transformez votre bibliothèque en une carte 3D vivante
              et explorez-la par groove, énergie et compatibilité.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  data-cursor="hover"
                  className="grid h-10 w-10 place-items-center rounded-xl glass text-white/60 transition-all hover:-translate-y-0.5 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {footerGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      data-cursor="hover"
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-white/70">
              Confidentialité
            </Link>
            <Link href="#" className="transition-colors hover:text-white/70">
              Conditions
            </Link>
            <span className="text-white/30">{site.overline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
