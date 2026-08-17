'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface FunnelStep {
  name: string
  value: number
  description?: string
  color?: string
  theme?: ThemeColor
}

export interface FunnelChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: FunnelStep[]
  theme?: ThemeColor
  valueFormatter?: (val: number) => string
  showPercentages?: boolean
  showDropoff?: boolean
  orientation?: 'vertical' | 'horizontal'
  onStepClick?: (step: FunnelStep, index: number) => void
}

export function FunnelChart({
  data = [],
  theme = 'brand',
  valueFormatter = (val) => val.toLocaleString(),
  showPercentages = true,
  showDropoff = true,
  orientation = 'vertical',
  onStepClick,
  className,
  ...props
}: FunnelChartProps) {
  const maxValue = data[0]?.value || 1

  return (
    <div
      data-slot="funnel-chart"
      className={cn('flex flex-col gap-3 w-full', className)}
      {...props}
    >
      {data.map((step, idx) => {
        const stepTheme = step.theme || theme
        const percentage = Math.max(8, Math.min(100, (step.value / maxValue) * 100))
        const prevValue = idx > 0 ? data[idx - 1].value : null
        const dropoffPercent =
          prevValue && prevValue > 0
            ? Math.round(((prevValue - step.value) / prevValue) * 100)
            : 0
        const conversionPercent = Math.round((step.value / maxValue) * 100)

        const stepColor = step.color || `var(--${stepTheme}-solid, #3b82f6)`

        return (
          <div
            key={step.name + idx}
            onClick={() => onStepClick?.(step, idx)}
            className={cn(
              'group relative flex flex-col gap-1.5 p-3 rounded-xl border border-[var(--outline-base)]/50 bg-[var(--surface-card)] transition-all hover:shadow-sm',
              onStepClick ? 'cursor-pointer hover:border-[var(--brand-solid)]' : ''
            )}
          >
            {/* Header: Title + Step Metric */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[10px] font-bold text-[var(--ink-secondary)]">
                  {idx + 1}
                </span>
                <span className="font-semibold text-[var(--ink-primary)] truncate">
                  {step.name}
                </span>
                {step.description && (
                  <span className="text-[var(--ink-muted)] truncate hidden sm:inline">
                    · {step.description}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {showPercentages && (
                  <span className="font-mono text-[11px] font-semibold text-[var(--ink-muted)]">
                    {conversionPercent}% of total
                  </span>
                )}
                <span className="font-mono font-bold text-sm text-[var(--ink-primary)] tabular-nums">
                  {valueFormatter(step.value)}
                </span>
              </div>
            </div>

            {/* Visual Funnel Bar */}
            <div className="relative h-3 w-full rounded-md bg-[var(--surface-muted)] overflow-hidden">
              <div
                className="h-full rounded-md transition-all duration-700 ease-out group-hover:brightness-110"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: stepColor,
                }}
              />
            </div>

            {/* Drop-off Callout (for steps > 0) */}
            {showDropoff && idx > 0 && dropoffPercent > 0 && (
              <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] pt-0.5">
                <span className="text-rose-500 font-medium">
                  ↓ {dropoffPercent}% drop-off from previous step
                </span>
                <span className="text-[var(--ink-muted)]">
                  {(prevValue! - step.value).toLocaleString()} lost
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
