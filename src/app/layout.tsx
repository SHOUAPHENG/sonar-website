import type { Metadata, Viewport } from 'next';
import { Inter, Sora, Instrument_Serif, Barlow } from 'next/font/google';
import './globals.css';

import { site } from '@/lib/site';
import { themeMap, themeStorageKey, defaultThemeId } from '@/lib/themes';
import { SiteShell } from '@/components/layout/SiteShell';

// Body text — clean, neutral grotesk.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Display — geometric, premium headlines.
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

// Cinematic serif — used italic in the video-backed "Capacités" section.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

// Barlow — UI font for the /landing route (techy, professional).
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.slogan}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'SONAR',
    'music map',
    'DJ',
    'Rekordbox',
    'Serato',
    'groove',
    'harmonic mixing',
    'music intelligence',
    '3D library',
  ],
  openGraph: {
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#03050f',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Applies the saved accent theme before first paint (no flash of default).
  const themeInit = `(function(){try{var m=${JSON.stringify(
    themeMap,
  )};var t=localStorage.getItem('${themeStorageKey}')||'${defaultThemeId}';var c=m[t]||m['${defaultThemeId}'];var r=document.documentElement;r.style.setProperty('--c1',c[0]);r.style.setProperty('--c2',c[1]);r.style.setProperty('--c3',c[2]);}catch(e){}})();`;

  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} ${instrumentSerif.variable} ${barlow.variable}`}
    >
      <body className="min-h-screen bg-ink font-sans text-white/90 antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
