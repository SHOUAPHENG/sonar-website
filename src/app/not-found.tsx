import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-[7rem] font-extrabold leading-none text-gradient">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">
        Vous voilà hors de la galaxie
      </h1>
      <p className="mt-2 max-w-md text-sm text-white/55">
        Cette page n’existe pas ou a dérivé dans le vide spatial. Revenons en
        terrain connu.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Retour à l’accueil</Button>
        <Button href="/features" variant="secondary">
          Voir les fonctionnalités
        </Button>
      </div>
      <Link href="/dashboard" className="mt-6 text-xs text-white/40 hover:text-white">
        Ou explorer la démo →
      </Link>
    </div>
  );
}
