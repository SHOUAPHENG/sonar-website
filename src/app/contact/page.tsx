import type { Metadata } from 'next';
import { Mail, MessageSquare, Building2 } from 'lucide-react';

import { site } from '@/lib/site';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Une question, une démo, un projet Enterprise ? Écrivez à l’équipe SONAR.',
};

const channels = [
  { icon: Mail, title: 'Email', value: site.email, hint: 'Réponse sous 24 h' },
  { icon: MessageSquare, title: 'Support', value: 'Chat dans l’app', hint: 'Offres payantes' },
  { icon: Building2, title: 'Enterprise', value: 'Devis sur mesure', hint: 'Équipes & labels' },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Parlons de votre <span className="text-gradient">musique</span>
          </>
        }
        lead="Une question, une démo ou un projet à grande échelle ? Nous sommes là."
      />

      <section className="container-px py-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal direction="right" className="flex flex-col gap-4">
            {channels.map((c) => (
              <div key={c.title} className="flex items-start gap-4 rounded-2xl glass p-5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-galaxy-violet/15">
                  <c.icon className="h-5 w-5 text-galaxy-violet" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{c.title}</div>
                  <div className="text-sm text-white/70">{c.value}</div>
                  <div className="text-xs text-white/40">{c.hint}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal direction="left">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
