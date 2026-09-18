import { NextResponse } from 'next/server';

const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Contact endpoint. Validates the payload and returns a JSON result.
 * Swap the TODO for a real email/CRM integration (Resend, Postmark, …).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }

  const { name, email, message } = body;

  if (typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ ok: false, error: 'Nom requis.' }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Email invalide.' }, { status: 400 });
  }
  if (typeof message !== 'string' || message.trim().length < 5) {
    return NextResponse.json({ ok: false, error: 'Message trop court.' }, { status: 400 });
  }

  // TODO: send the message (email provider / database).
  console.log('[contact]', { name, email });

  return NextResponse.json({ ok: true });
}
