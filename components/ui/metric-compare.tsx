'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Trend } from '@/components/ui/trend'
import { ArrowRight, Trophy, TrendingUp, TrendingDown } from 'lucide-react'

export interface MetricCompareProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  baselineLabel?: string
  baselineValue: number | string
  variantLabel?: string
  variantValue: number | string
  change: string
  direction?: 'up' | 'down' | 'neutral'
  isWinner?: boolean
  confidence?: string
  sampleSize?: string
  unit?: string
}

export function MetricCompare({
  title,
  baselineLabel = 'Control (A)',
  baselineValue,
  variantLabel = 'Variant (B)',
  variantValue,
  change,
  direction = 'up',
  isWinner = true,
  confidence = '99.4% confidence',
  sampleSize = '14,200 users',
  unit,
  className,
  ...props
}: MetricCompareProps) {
  return (
    <div
      data-slot="metric-compare"
      className={cn(
        'flex flex-col gap-3 p-4 rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-xs select-none',
        className
      )}
      {...props}
    >
      {/* Header: Title + Winner Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-xs text-[var(--ink-primary)]">{title}</span>
        {isWinner ? (
          <Badge variant="solid" theme="emerald" size="sm" dot>
            Statistically Significant
          </Badge>
        ) : (
          <Badge variant="subtle" theme="gray" size="sm">
            Inconclusive
          </Badge>
        )}
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[var(--surface-muted)]/50 border border-[var(--outline-base)]/40">
        {/* Baseline (Control) */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)] font-mono">
            {baselineLabel}
          </span>
          <span className="font-mono text-base font-extrabold text-[var(--ink-secondary)]">
            {baselineValue} {unit}
          </span>
        </div>

        {/* Variant (Experiment) */}
        <div className="flex flex-col gap-0.5 border-l border-[var(--outline-base)]/60 pl-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-solid)] font-mono">
              {variantLabel}
            </span>
            <Trend value={change} direction={direction} size="xs" />
          </div>
          <span className="font-mono text-base font-extrabold text-[var(--ink-primary)]">
            {variantValue} {unit}
          </span>
        </div>
      </div>

      {/* Statistical Footprint */}
      <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] font-mono pt-0.5">
        <span>{confidence}</span>
        <span>N = {sampleSize}</span>
      </div>
    </div>
  )
}
