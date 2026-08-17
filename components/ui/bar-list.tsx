'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface BarListItem {
  name: string
  value: number
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  theme?: ThemeColor
  color?: string
  subtitle?: string
}

export interface BarListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BarListItem[]
  valueFormatter?: (value: number) => string
  theme?: ThemeColor
  variant?: 'solid' | 'card' | 'minimal'
  showAnimation?: boolean
  showRank?: boolean
  showPercentage?: boolean
  sortOrder?: 'ascending' | 'descending' | 'none'
  onValueChange?: (item: BarListItem) => void
}

export function BarList({
  data = [],
  valueFormatter = (value: number) => value.toLocaleString(),
  theme = 'brand',
  variant = 'solid',
  showAnimation = true,
  showRank = true,
  showPercentage = true,
  sortOrder = 'descending',
  onValueChange,
  className,
  ...props
}: BarListProps) {
  const sortedData = React.useMemo(() => {
    if (sortOrder === 'none') return data
    return [...data].sort((a, b) => {
      return sortOrder === 'descending' ? b.value - a.value : a.value - b.value
    })
  }, [data, sortOrder])

  const maxValue = React.useMemo(() => {
    return Math.max(...data.map((item) => item.value), 0) || 1
  }, [data])

  const totalValue = React.useMemo(() => {
    return data.reduce((acc, item) => acc + item.value, 0) || 1
  }, [data])

  const getThemeGradient = (th: ThemeColor) => {
    switch (th) {
      case 'emerald':
        return 'from-emerald-500 to-teal-400 text-white'
      case 'violet':
        return 'from-violet-500 to-indigo-400 text-white'
      case 'amber':
        return 'from-amber-500 to-yellow-400 text-slate-900'
      case 'rose':
        return 'from-rose-500 to-pink-400 text-white'
      case 'blue':
        return 'from-blue-500 to-cyan-400 text-white'
      case 'gray':
        return 'from-slate-600 to-slate-400 text-white'
      default:
        return 'from-[var(--brand-solid)] to-indigo-500 text-white'
    }
  }

  const getAccentBadgeStyle = (th: ThemeColor) => {
    switch (th) {
      case 'emerald':
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
      case 'violet':
        return 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30'
      case 'amber':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
      case 'rose':
        return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
      case 'blue':
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
      case 'gray':
        return 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30'
      default:
        return 'bg-[var(--brand-subtle)] text-[var(--brand-solid)] border-[var(--brand-solid)]/30'
    }
  }

  return (
    <div
      data-slot="bar-list"
      className={cn('flex flex-col gap-2.5 w-full select-none', className)}
      {...props}
    >
      {sortedData.map((item, index) => {
        const itemTheme = item.theme || theme
        const percentage = Math.max(3, Math.min(100, Math.round((item.value / maxValue) * 100)))
        const shareOfTotal = Math.max(1, Math.round((item.value / totalValue) * 100))
        const Icon = item.icon

        return (
          <div
            key={item.name + index}
            onClick={() => onValueChange?.(item)}
            className={cn(
              'group relative flex flex-col gap-2 p-3 rounded-2xl border transition-all',
              'bg-[var(--surface-card)] border-[var(--outline-base)] hover:border-[var(--brand-solid)]/50 hover:shadow-xs',
              onValueChange || item.href ? 'cursor-pointer' : ''
            )}
          >
            {/* Top Row: Rank + Title + Metric Value + Share % */}
            <div className="flex items-center justify-between gap-3 text-xs">
              {/* Left Label */}
              <div className="flex items-center gap-2.5 min-w-0">
                {showRank && (
                  <span className="flex items-center justify-center size-5 rounded-md bg-[var(--surface-muted)] text-[10px] font-mono font-bold text-[var(--ink-muted)] border border-[var(--outline-base)]/60 shrink-0">
                    {index + 1}
                  </span>
                )}

                {Icon && (
                  <Icon className="size-4 shrink-0 text-[var(--brand-solid)]" />
                )}

                <div className="flex flex-col min-w-0">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-bold text-[var(--ink-primary)] hover:underline truncate"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="font-bold text-[var(--ink-primary)] truncate">
                      {item.name}
                    </span>
                  )}
                  {item.subtitle && (
                    <span className="text-[10px] text-[var(--ink-muted)] truncate">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Value and Percentage Badge */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono font-bold text-xs text-[var(--ink-primary)]">
                  {valueFormatter(item.value)}
                </span>

                {showPercentage && (
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full font-mono text-[10px] font-bold border shrink-0',
                      getAccentBadgeStyle(itemTheme)
                    )}
                  >
                    {percentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Solid Accent Progress Bar Track */}
            <div className="relative w-full h-2 rounded-full bg-[var(--surface-muted)] overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full bg-gradient-to-r shadow-xs transition-all duration-700 ease-out relative',
                  getThemeGradient(itemTheme),
                  showAnimation ? 'animate-in fade-in-0 duration-500' : ''
                )}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: item.color,
                }}
              >
                {/* Glowing Leading Accent Edge */}
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white/60 rounded-r-full shadow-xs" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
