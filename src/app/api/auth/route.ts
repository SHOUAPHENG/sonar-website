import { NextResponse } from 'next/server';

const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Demo auth endpoint (login / signup). Validates input and returns a fake
 * session. Replace with real authentication (NextAuth, Clerk, custom JWT…).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }

  const { mode, email, password, name } = body;

  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Email invalide.' }, { status: 400 });
  }
  if (typeof password !== 'string' || password.length < 6) {
    return NextResponse.json(
      { ok: false, error: 'Le mot de passe doit faire au moins 6 caractères.' },
      { status: 400 },
    );
  }
  if (mode === 'signup' && (typeof name !== 'string' || name.trim().length < 2)) {
    return NextResponse.json({ ok: false, error: 'Nom requis.' }, { status: 400 });
  }

  // TODO: create / verify the user and issue a real session.
  return NextResponse.json({
    ok: true,
    user: { email, name: typeof name === 'string' ? name : email },
  });
}
