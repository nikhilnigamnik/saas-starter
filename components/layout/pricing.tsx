import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with SEO tracking.',
      features: [
        'Up to 100 keywords',
        'Basic analytics dashboard',
        'Weekly reports',
        'Email support',
      ],
      cta: 'Get Started',
      ctaVariant: 'outline' as const,
      popular: false,
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      description: 'For developers who need advanced SEO tools.',
      features: [
        'Unlimited keywords',
        'Advanced analytics dashboard',
        'Real-time reports',
        '20 reports per month',
        'API access',
        'Competitor analysis',
        'Site audits',
        'Priority support',
      ],
      cta: 'Get Started',
      ctaVariant: 'default' as const,
      popular: true,
    },
  ];

  return (
    <section id="pricing">
      <div className="max-w-4xl mx-auto border-x border-dotted">
        <div className="pt-12">
          <div className="text-center space-y-4 mb-12">
            <h2 className="md:text-3xl text-xl font-medium text-foreground">
              Simple, transparent <span className="text-brand">pricing</span>
            </h2>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Choose the plan that works best for you. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={cn(
                  'p-6 border-r border-y first:border-r-0 border-dotted last:border-r last:border-l space-y-4 flex flex-col justify-between',
                  plan.popular && 'border-brand/50 border-dotted',
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
                    {plan.popular && (
                      <span className="text-xs px-2 py-0.5 bg-brand/10 text-brand rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-medium text-foreground">{plan.price}</span>
                    {plan.period && (
                      <span className="text-xs text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <span className="text-xs text-brand mt-0.5">✓</span>
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button variant={plan.ctaVariant} className="w-full" asChild>
                  <Link href="/dashboard">{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
