import type { Metadata } from 'next';

import { AuthForm } from '@/components/sections/AuthForm';

export const metadata: Metadata = {
  title: 'Se connecter',
  description: 'Connectez-vous à SONAR.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-32">
      <AuthForm mode="login" />
    </div>
  );
}
