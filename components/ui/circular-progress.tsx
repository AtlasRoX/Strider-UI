'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // 0 to 100
  max?: number
  size?: number
  strokeWidth?: number
  theme?: ThemeColor
  showLabel?: boolean
  label?: string
  sublabel?: string
  icon?: React.ReactNode
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  theme = 'brand',
  showLabel = true,
  label,
  sublabel,
  icon,
  className,
  ...props
}: CircularProgressProps) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div
      data-slot="circular-progress"
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--surface-muted, #e2e8f0)"
          strokeWidth={strokeWidth}
          className="transition-colors"
        />

        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={`var(--${theme}-solid, #3b82f6)`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center Label / Icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
        {icon && <div className="text-[var(--brand-solid)] mb-0.5">{icon}</div>}

        {showLabel && (
          <span className="font-mono text-base font-extrabold text-[var(--ink-primary)] leading-none tabular-nums">
            {label ?? `${Math.round(percentage)}%`}
          </span>
        )}

        {sublabel && (
          <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--ink-muted)] mt-1 font-mono">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  )
}
