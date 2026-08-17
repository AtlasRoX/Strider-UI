'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface TrendProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'prefix'> {
  value: number | string
  direction?: 'up' | 'down' | 'neutral'
  theme?: ThemeColor
  variant?: 'subtle' | 'solid' | 'ghost'
  size?: 'xs' | 'sm' | 'md'
  showIcon?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  inverted?: boolean // e.g. lower error rate is positive
}

export function Trend({
  value,
  direction = 'up',
  theme,
  variant = 'subtle',
  size = 'sm',
  showIcon = true,
  prefix,
  suffix,
  inverted = false,
  className,
  ...props
}: TrendProps) {
  // Compute resolved positive/negative direction
  const isPositive = inverted ? direction === 'down' : direction === 'up'
  const isNegative = inverted ? direction === 'up' : direction === 'down'
  const isNeutral = direction === 'neutral'

  const resolvedTheme: ThemeColor =
    theme || (isPositive ? 'emerald' : isNegative ? 'rose' : 'gray')

  const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 gap-1',
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-sm px-2.5 py-1 gap-1.5',
  }[size]

  const variantStyles = {
    solid: `bg-[var(--${resolvedTheme}-solid)] text-white`,
    subtle: `bg-[var(--${resolvedTheme}-subtle)] text-[var(--${resolvedTheme}-solid)]`,
    ghost: `bg-transparent text-[var(--${resolvedTheme}-solid)]`,
  }[variant]

  return (
    <span
      data-slot="trend"
      className={cn(
        'inline-flex items-center font-mono font-semibold rounded-md select-none transition-colors tabular-nums',
        sizeClasses,
        variantStyles,
        className
      )}
      {...props}
    >
      {prefix}
      {showIcon && <Icon className="size-3 shrink-0 stroke-[2.5]" />}
      <span>{value}</span>
      {suffix}
    </span>
  )
}
