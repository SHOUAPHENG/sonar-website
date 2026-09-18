import type { Metadata } from 'next';

import { AuthForm } from '@/components/sections/AuthForm';

export const metadata: Metadata = {
  title: 'Créer un compte',
  description: 'Créez votre compte SONAR et explorez votre musique comme une galaxie.',
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-32">
      <AuthForm mode="signup" />
    </div>
  );
}
