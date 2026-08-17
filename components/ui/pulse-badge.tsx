'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export type SystemStatus = 'operational' | 'degraded' | 'outage' | 'maintenance'

export interface PulseBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: SystemStatus
  label?: string
  uptime?: string | number
  theme?: ThemeColor
  pulse?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function PulseBadge({
  status = 'operational',
  label,
  uptime,
  theme,
  pulse = true,
  size = 'md',
  className,
  ...props
}: PulseBadgeProps) {
  const statusThemeMap: Record<SystemStatus, { theme: ThemeColor; defaultLabel: string; dotColor: string }> = {
    operational: { theme: 'emerald', defaultLabel: 'All Systems Operational', dotColor: 'bg-emerald-500' },
    degraded: { theme: 'amber', defaultLabel: 'Degraded Performance', dotColor: 'bg-amber-500' },
    outage: { theme: 'rose', defaultLabel: 'Major Outage', dotColor: 'bg-rose-500' },
    maintenance: { theme: 'blue', defaultLabel: 'Scheduled Maintenance', dotColor: 'bg-blue-500' },
  }

  const activeConfig = statusThemeMap[status]
  const displayLabel = label ?? activeConfig.defaultLabel

  return (
    <div
      data-slot="pulse-badge"
      data-status={status}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-2xs select-none',
        size === 'sm' && 'px-2.5 py-1 text-xs',
        size === 'md' && 'px-3.5 py-1.5 text-xs',
        size === 'lg' && 'px-4 py-2 text-sm',
        className
      )}
      {...props}
    >
      {/* Live Beacon Dot with Ping Animation */}
      <span className="relative flex size-2.5 shrink-0">
        {pulse && (
          <span
            className={cn(
              'absolute inline-flex size-full animate-ping rounded-full opacity-75',
              activeConfig.dotColor
            )}
          />
        )}
        <span
          className={cn(
            'relative inline-flex size-2.5 rounded-full shadow-xs',
            activeConfig.dotColor
          )}
        />
      </span>

      {/* Status Label */}
      <span className="font-semibold text-[var(--ink-primary)]">
        {displayLabel}
      </span>

      {/* Uptime Metric */}
      {uptime !== undefined && (
        <span className="font-mono text-[10px] font-bold text-[var(--ink-muted)] border-l border-[var(--outline-base)] pl-2 ml-0.5">
          {typeof uptime === 'number' ? `${uptime}%` : uptime}
        </span>
      )}
    </div>
  )
}
