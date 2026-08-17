'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  min?: number
  max?: number
  size?: number
  strokeWidth?: number
  theme?: ThemeColor
  color?: string
  trackColor?: string
  showValue?: boolean
  label?: string
  sublabel?: string
  valueFormatter?: (value: number) => string
  type?: 'semicircle' | 'circle'
  variant?: 'solid' | 'minimal'
}

export function Gauge({
  value,
  min = 0,
  max = 100,
  size = 160,
  strokeWidth = 14,
  theme = 'brand',
  color,
  trackColor,
  showValue = true,
  label,
  sublabel,
  valueFormatter = (v) => `${Math.round(v)}%`,
  type = 'semicircle',
  variant = 'solid',
  className,
  ...props
}: GaugeProps) {
  const clampedValue = Math.min(Math.max(value, min), max)
  const normalizedValue = (clampedValue - min) / (max - min || 1)
  const percentage = Math.round(normalizedValue * 100)

  const radius = (size - strokeWidth) / 2
  const center = size / 2
  const id = React.useId().replace(/:/g, '')

  const getThemeGradient = (th: ThemeColor) => {
    switch (th) {
      case 'emerald':
        return { start: '#10b981', end: '#059669', glow: 'rgba(16, 185, 129, 0.4)' }
      case 'violet':
        return { start: '#8b5cf6', end: '#6366f1', glow: 'rgba(139, 92, 246, 0.4)' }
      case 'amber':
        return { start: '#f59e0b', end: '#d97706', glow: 'rgba(245, 158, 11, 0.4)' }
      case 'rose':
        return { start: '#f43f5e', end: '#e11d48', glow: 'rgba(244, 63, 94, 0.4)' }
      case 'blue':
        return { start: '#3b82f6', end: '#0284c7', glow: 'rgba(59, 130, 246, 0.4)' }
      default:
        return { start: 'var(--brand-solid, #3b82f6)', end: '#6366f1', glow: 'rgba(59, 130, 246, 0.4)' }
    }
  }

  const grad = getThemeGradient(theme)
  const resolvedTrack = trackColor || 'var(--outline-muted, rgba(148, 163, 184, 0.2))'

  if (type === 'circle') {
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - normalizedValue * circumference

    return (
      <div
        data-slot="gauge"
        className={cn(
          'inline-flex flex-col items-center justify-center relative select-none',
          variant === 'solid'
            ? 'p-4 rounded-3xl bg-[var(--surface-card)] border border-[var(--outline-base)] shadow-md hover:border-[var(--brand-solid)]/40 transition-colors'
            : '',
          className
        )}
        {...props}
      >
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <defs>
              <linearGradient id={`gauge-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={grad.start} />
                <stop offset="100%" stopColor={grad.end} />
              </linearGradient>
            </defs>

            {/* Background Solid Track */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={resolvedTrack}
              strokeWidth={strokeWidth}
            />

            {/* Active Accent Gradient Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={`url(#gauge-grad-${id})`}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              style={{ filter: `drop-shadow(0 0 6px ${grad.glow})` }}
            />
          </svg>

          {/* Central Value Card */}
          {showValue && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
              <span className="text-2xl font-extrabold tracking-tight text-[var(--ink-primary)] font-mono">
                {valueFormatter(clampedValue)}
              </span>
              {label && (
                <span className="text-xs font-bold text-[var(--ink-secondary)] mt-0.5">
                  {label}
                </span>
              )}
              {sublabel && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--ink-muted)] border border-[var(--outline-base)]/50 mt-1">
                  {sublabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Semicircle gauge
  const arcLength = Math.PI * radius
  const strokeDashoffset = arcLength - normalizedValue * arcLength
  const height = size / 2 + strokeWidth / 2 + 10

  return (
    <div
      data-slot="gauge"
      className={cn(
        'inline-flex flex-col items-center justify-center relative select-none',
        variant === 'solid'
          ? 'p-4 rounded-3xl bg-[var(--surface-card)] border border-[var(--outline-base)] shadow-md hover:border-[var(--brand-solid)]/40 transition-colors'
          : '',
        className
      )}
      {...props}
    >
      <div className="relative flex flex-col items-center justify-center" style={{ width: size }}>
        <svg width={size} height={height} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}>
          <defs>
            <linearGradient id={`gauge-semi-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={grad.start} />
              <stop offset="100%" stopColor={grad.end} />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <path
            d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
            fill="none"
            stroke={resolvedTrack}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Foreground Progress Arc */}
          <path
            d={`M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`}
            fill="none"
            stroke={`url(#gauge-semi-${id})`}
            strokeWidth={strokeWidth}
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            style={{ filter: `drop-shadow(0 0 6px ${grad.glow})` }}
          />
        </svg>

        {/* Center Value */}
        {showValue && (
          <div className="flex flex-col items-center justify-center text-center -mt-6 select-none">
            <span className="text-2xl font-black tracking-tight text-[var(--ink-primary)] font-mono">
              {valueFormatter(clampedValue)}
            </span>
            {label && (
              <span className="text-xs font-bold text-[var(--ink-secondary)]">
                {label}
              </span>
            )}
            {sublabel && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--ink-muted)] border border-[var(--outline-base)]/50 mt-1">
                {sublabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
