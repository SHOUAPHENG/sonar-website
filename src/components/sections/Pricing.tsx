'use client';

import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import { plans, type Plan } from '@/lib/pricing';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type Billing = 'monthly' | 'yearly';

function formatPrice(value: number) {
  // Show "9,99" style; drop decimals for whole numbers.
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace('.', ',');
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = billing === 'monthly' ? plan.monthly : plan.yearly;
  const isCustom = price === null;

  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-3xl p-7 transition-all duration-500 ease-premium hover:-translate-y-1',
        plan.highlighted
          ? 'ring-spectrum glass shadow-glow'
          : 'glass hover:border-white/20',
      )}
      data-cursor="hover"
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-spectrum px-3 py-1 text-xs font-semibold text-ink-500">
          <Sparkles className="mr-1 inline h-3 w-3" />
          Le plus populaire
        </span>
      )}

      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: plan.accent, boxShadow: `0 0 12px ${plan.accent}` }}
        />
        <h3 className="font-display text-lg font-semibold text-white">{plan.name}</h3>
      </div>
      <p className="mt-1 text-sm text-white/50">{plan.tagline}</p>

      <div className="mt-6 flex items-end gap-1.5">
        {isCustom ? (
          <span className="font-display text-3xl font-bold text-white">Sur devis</span>
        ) : (
          <>
            <span className="font-display text-4xl font-bold text-white">
              {formatPrice(price as number)}&nbsp;€
            </span>
            {(price as number) > 0 && (
              <span className="mb-1.5 text-sm text-white/45">/mois</span>
            )}
          </>
        )}
      </div>
      {billing === 'yearly' && !isCustom && (plan.monthly ?? 0) > 0 && (
        <p className="mt-1 text-xs text-galaxy-cyan">Facturé annuellement · 2 mois offerts</p>
      )}

      <Button
        href={plan.href}
        variant={plan.highlighted ? 'primary' : 'secondary'}
        className="mt-6 w-full"
      >
        {plan.cta}
      </Button>

      <ul className="mt-7 flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ color: plan.accent }}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Billing toggle + plan grid. The first four tiers sit in a responsive grid;
 * Enterprise gets a full-width banner. Reused on the home preview and /pricing.
 */
export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly');
  const grid = plans.filter((p) => p.id !== 'enterprise');
  const enterprise = plans.find((p) => p.id === 'enterprise')!;

  return (
    <div>
      {/* Toggle */}
      <div className="mb-12 flex justify-center">
        <div className="relative grid grid-cols-2 rounded-full glass p-1">
          {/* Sliding indicator */}
          <motion.span
            aria-hidden
            className="absolute inset-y-1 left-1 z-0 w-[calc(50%-0.25rem)] rounded-full bg-spectrum"
            animate={{ x: billing === 'monthly' ? 0 : '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
          {(['monthly', 'yearly'] as Billing[]).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              data-cursor="hover"
              className="relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors"
            >
              <span className={billing === b ? 'text-ink-500' : 'text-white/60'}>
                {b === 'monthly' ? 'Mensuel' : 'Annuel'}
              </span>
              {b === 'yearly' && (
                <span
                  className={cn(
                    'ml-1.5 text-xs',
                    billing === b ? 'text-ink-500/80' : 'text-galaxy-cyan',
                  )}
                >
                  −20%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {grid.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} />
        ))}
      </div>

      {/* Enterprise banner */}
      <div className="mt-5 flex flex-col items-center justify-between gap-6 rounded-3xl glass p-8 md:flex-row">
        <div className="flex items-center gap-4">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: enterprise.accent, boxShadow: `0 0 12px ${enterprise.accent}` }}
          />
          <div>
            <h3 className="font-display text-xl font-semibold text-white">
              {enterprise.name}
            </h3>
            <p className="text-sm text-white/55">
              {enterprise.tagline} · {enterprise.features.slice(0, 3).join(' · ')}
            </p>
          </div>
        </div>
        <Button href={enterprise.href} variant="secondary">
          {enterprise.cta}
        </Button>
      </div>
    </div>
  );
}
