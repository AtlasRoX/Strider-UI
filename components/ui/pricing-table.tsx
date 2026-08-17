'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Star } from 'lucide-react'

export interface PricingPlanFeature {
  text: string
  included: boolean
  highlight?: boolean
}

export interface PricingPlan {
  id: string
  name: string
  description?: string
  priceMonthly: number | string
  priceAnnual: number | string
  popular?: boolean
  ctaLabel?: string
  onCtaClick?: () => void
  features: PricingPlanFeature[]
}

export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingPlan[]
  annualDiscountBadge?: string
  currencySymbol?: string
}

export function PricingTable({
  plans = [],
  annualDiscountBadge = 'Save 20%',
  currencySymbol = '$',
  className,
  ...props
}: PricingTableProps) {
  const [isAnnual, setIsAnnual] = React.useState(true)

  return (
    <div
      data-slot="pricing-table"
      className={cn('flex flex-col items-center gap-8 w-full select-none', className)}
      {...props}
    >
      {/* Billing Switcher (Monthly / Annual) */}
      <div className="flex items-center gap-3 bg-[var(--surface-muted)] p-1 rounded-2xl border border-[var(--outline-base)] shadow-2xs">
        <button
          type="button"
          onClick={() => setIsAnnual(false)}
          className={cn(
            'px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer',
            !isAnnual
              ? 'bg-[var(--surface-base)] text-[var(--ink-primary)] shadow-xs font-bold'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-secondary)]'
          )}
        >
          Monthly Billing
        </button>

        <button
          type="button"
          onClick={() => setIsAnnual(true)}
          className={cn(
            'flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer',
            isAnnual
              ? 'bg-[var(--surface-base)] text-[var(--ink-primary)] shadow-xs font-bold'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-secondary)]'
          )}
        >
          <span>Annual Billing</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--emerald-subtle)] text-[var(--emerald-solid)]">
            {annualDiscountBadge}
          </span>
        </button>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {plans.map((plan) => {
          const price = isAnnual ? plan.priceAnnual : plan.priceMonthly

          return (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col justify-between p-6 rounded-3xl border bg-[var(--surface-card)] transition-all duration-200 shadow-sm',
                plan.popular
                  ? 'border-[var(--brand-solid)] ring-2 ring-[var(--brand-solid)]/20 shadow-lg -translate-y-1'
                  : 'border-[var(--outline-base)] hover:border-[var(--outline-base)]/80'
              )}
            >
              {/* Popular Ribbon */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--brand-solid)] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                  <Star className="size-3 fill-current" />
                  <span>Most Popular</span>
                </div>
              )}

              {/* Plan Header */}
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-extrabold text-[var(--ink-primary)]">
                  {plan.name}
                </h4>
                {plan.description && (
                  <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                    {plan.description}
                  </p>
                )}

                {/* Price Display */}
                <div className="flex items-baseline gap-1 py-4 border-b border-[var(--outline-base)]/40">
                  <span className="text-3xl font-black text-[var(--ink-primary)] font-mono">
                    {typeof price === 'number' ? `${currencySymbol}${price}` : price}
                  </span>
                  {typeof price === 'number' && (
                    <span className="text-xs text-[var(--ink-muted)]">
                      /{isAnnual ? 'mo (billed yearly)' : 'month'}
                    </span>
                  )}
                </div>

                {/* Feature Checklist */}
                <div className="flex flex-col gap-2.5 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)] font-mono">
                    Included Features
                  </span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs">
                      {feat.included ? (
                        <div className="size-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                          <Check className="size-3 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="size-4 rounded-full bg-black/5 dark:bg-white/5 text-[var(--ink-muted)] flex items-center justify-center shrink-0">
                          <X className="size-3 stroke-[2]" />
                        </div>
                      )}
                      <span
                        className={cn(
                          feat.included ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-muted)] line-through',
                          feat.highlight ? 'font-semibold text-[var(--brand-solid)]' : ''
                        )}
                      >
                        {feat.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-auto">
                <Button
                  variant={plan.popular ? 'solid' : 'outline'}
                  theme="brand"
                  size="md"
                  className="w-full"
                  onClick={plan.onCtaClick}
                >
                  {plan.ctaLabel ?? (plan.popular ? 'Start 14-Day Free Trial' : 'Get Started')}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
