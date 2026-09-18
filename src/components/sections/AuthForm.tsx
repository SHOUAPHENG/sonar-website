'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input, Label } from '@/components/ui/Field';
import { Logo } from '@/components/ui/Logo';

type Mode = 'login' | 'signup';

/**
 * Login / signup form. Posts to /api/auth (server-validated) then routes to the
 * demo dashboard. Replace the route handler with real authentication later.
 */
export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSignup = mode === 'signup';

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const payload = { mode, ...Object.fromEntries(new FormData(e.currentTarget)) };
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Échec de l’authentification.');
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md rounded-3xl glass p-8 shadow-glow"
    >
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <Logo />
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            {isSignup ? 'Créer votre compte' : 'Bon retour'}
          </h1>
          <p className="mt-1 text-sm text-white/50">
            {isSignup
              ? 'Commencez gratuitement, sans carte bancaire.'
              : 'Reconnectez-vous à votre galaxie.'}
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-4">
        {isSignup && (
          <div>
            <Label htmlFor="name">Nom</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <Input id="name" name="name" placeholder="Votre nom" className="pl-10" required />
            </div>
          </div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <Input id="email" name="email" type="email" placeholder="vous@email.com" className="pl-10" required />
          </div>
        </div>
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-10" required />
          </div>
        </div>

        {!isSignup && (
          <div className="flex justify-end">
            <Link href="#" className="text-xs text-white/50 transition-colors hover:text-white">
              Mot de passe oublié ?
            </Link>
          </div>
        )}

        {error && (
          <p className="flex items-center gap-2 text-sm text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </p>
        )}

        <Button type="submit" className="group mt-2 w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {isSignup ? 'Commencer gratuitement' : 'Se connecter'}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-white/30">
        <span className="h-px flex-1 bg-white/10" />
        OU
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <Button variant="secondary" className="w-full">
        Continuer avec Google
      </Button>

      <p className="mt-6 text-center text-sm text-white/50">
        {isSignup ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}
        <Link
          href={isSignup ? '/login' : '/signup'}
          className="font-medium text-galaxy-violet transition-colors hover:text-galaxy-fuchsia"
        >
          {isSignup ? 'Se connecter' : 'Créer un compte'}
        </Link>
      </p>
    </motion.div>
  );
}
