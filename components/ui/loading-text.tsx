'use client'

import * as React from 'react'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface LoadingTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  theme?: ThemeColor | 'current'
}

export function LoadingText({
  className,
  text = 'Loading...',
  size = 'sm',
  theme = 'brand',
  ...props
}: LoadingTextProps) {
  const textSizeClass = {
    xs: 'text-xs gap-1.5',
    sm: 'text-sm gap-2',
    md: 'text-base gap-2.5',
    lg: 'text-lg gap-3 font-medium',
  }[size]

  return (
    <div
      role="status"
      data-slot="loading-text"
      className={cn(
        'inline-flex items-center text-[var(--ink-secondary)] select-none',
        textSizeClass,
        className
      )}
      {...props}
    >
      <Spinner size={size} theme={theme} />
      <span>{text}</span>
    </div>
  )
}
