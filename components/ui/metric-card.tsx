'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkline } from '@/components/ui/sparkline'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  change?: string | number
  changeType?: 'increase' | 'decrease' | 'neutral'
  changePeriod?: string
  icon?: React.ComponentType<{ className?: string }>
  sparklineData?: number[]
  sparklineType?: 'area' | 'line' | 'bar'
  progressValue?: number
  targetValue?: string | number
  theme?: ThemeColor
  description?: string
  badgeVariant?: 'subtle' | 'solid' | 'outline'
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'increase',
  changePeriod = 'vs last month',
  icon: Icon,
  sparklineData,
  sparklineType = 'area',
  progressValue,
  targetValue,
  theme = 'brand',
  description,
  badgeVariant = 'subtle',
  className,
  ...props
}: MetricCardProps) {
  const isPositive = changeType === 'increase'
  const isNegative = changeType === 'decrease'
  const deltaTheme: ThemeColor = isPositive ? 'emerald' : isNegative ? 'rose' : 'gray'
  const DeltaIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus

  return (
    <Card
      data-slot="metric-card"
      className={cn('p-5 flex flex-col justify-between gap-4 transition-all hover:shadow-md', className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)] truncate">
          {title}
        </span>
        {Icon && (
          <div
            className="size-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: `color-mix(in oklch, var(--${theme}-solid, #3b82f6) 15%, transparent)`,
              color: `var(--${theme}-solid, #3b82f6)`,
            }}
          >
            <Icon className="size-4" />
          </div>
        )}
      </div>

      {/* Main Value & Sparkline Section */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink-primary)] font-mono truncate">
            {value}
          </span>
          {description && (
            <p className="text-xs text-[var(--ink-muted)] line-clamp-1">{description}</p>
          )}
        </div>

        {sparklineData && sparklineData.length > 0 && (
          <div className="shrink-0">
            <Sparkline
              data={sparklineData}
              type={sparklineType}
              theme={theme}
              width={100}
              height={36}
            />
          </div>
        )}
      </div>

      {/* Optional Progress Bar */}
      {progressValue !== undefined && (
        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex justify-between text-xs font-medium text-[var(--ink-muted)]">
            <span>Progress</span>
            <span>{progressValue}% {targetValue ? `/ ${targetValue}` : ''}</span>
          </div>
          <Progress value={progressValue} theme={theme} className="h-1.5" />
        </div>
      )}

      {/* Footer Delta */}
      {change !== undefined && (
        <div className="flex items-center gap-2 pt-1 border-t border-[var(--outline-base)]/40 text-xs">
          <Badge
            variant={badgeVariant}
            theme={deltaTheme}
            size="sm"
            prefix={<DeltaIcon className="size-3" />}
          >
            {change}
          </Badge>
          <span className="text-[var(--ink-muted)] truncate">{changePeriod}</span>
        </div>
      )}
    </Card>
  )
}
