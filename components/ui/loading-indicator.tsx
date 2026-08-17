'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface LoadingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean
  theme?: ThemeColor
}

export function LoadingIndicator({
  className,
  fixed = false,
  theme = 'brand',
  ...props
}: LoadingIndicatorProps) {
  const themeBg = {
    brand: 'bg-[var(--brand-solid)]',
    gray: 'bg-[var(--ink-secondary)]',
    blue: 'bg-[var(--blue-solid)]',
    emerald: 'bg-[var(--emerald-solid)]',
    amber: 'bg-[var(--amber-solid)]',
    rose: 'bg-[var(--rose-solid)]',
    violet: 'bg-[var(--violet-solid)]',
  }[theme]

  return (
    <div
      role="progressbar"
      aria-label="Loading..."
      data-slot="loading-indicator"
      className={cn(
        'h-0.5 w-full overflow-hidden bg-[var(--surface-muted)]',
        fixed && 'fixed top-0 left-0 right-0 z-50',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'h-full w-full origin-left-right animate-[indeterminate_1.5s_infinite_linear]',
          themeBg
        )}
      />
    </div>
  )
}
