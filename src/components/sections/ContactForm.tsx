'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input, Textarea, Label } from '@/components/ui/Field';

/**
 * Contact form. Posts to /api/contact (server-validated). Shows loading,
 * error and success states. Swap the route handler for a real provider later.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const payload = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Échec de l’envoi.');
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl glass p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-10 text-center"
          >
            <CheckCircle2 className="h-12 w-12 text-galaxy-cyan" />
            <h3 className="font-display text-xl font-semibold text-white">Message envoyé</h3>
            <p className="max-w-sm text-sm text-white/55">
              Merci ! Notre équipe vous répondra sous 24 heures à l’adresse indiquée.
            </p>
            <Button variant="secondary" size="sm" onClick={() => setSent(false)}>
              Envoyer un autre message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Nom</Label>
                <Input id="name" name="name" placeholder="Votre nom" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="vous@email.com" required />
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Sujet</Label>
              <Input id="subject" name="subject" placeholder="En quoi pouvons-nous aider ?" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} placeholder="Votre message…" required />
            </div>
            {error && (
              <p className="flex items-center gap-2 text-sm text-rose-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </p>
            )}

            <Button type="submit" className="group self-start" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Envoyer le message
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
