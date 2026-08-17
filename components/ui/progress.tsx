'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

const progressVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-[var(--surface-muted)]',
  {
    variants: {
      size: {
        xs: 'h-1',
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  theme?: ThemeColor
  showValue?: boolean
  label?: string
}

function Progress({
  className,
  value = 0,
  max = 100,
  size = 'md',
  theme = 'brand',
  showValue = false,
  label,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max(0, Math.round(((value || 0) / max) * 100)), 100)

  const indicatorColor = {
    brand: 'bg-[var(--brand-solid)]',
    gray: 'bg-[var(--ink-primary)]',
    blue: 'bg-[var(--blue-solid)]',
    emerald: 'bg-[var(--emerald-solid)]',
    amber: 'bg-[var(--amber-solid)]',
    rose: 'bg-[var(--rose-solid)]',
    violet: 'bg-[var(--violet-solid)]',
  }[theme]

  return (
    <div className="w-full flex flex-col gap-1.5">
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-medium text-[var(--ink-secondary)]">
          {label && <span>{label}</span>}
          {showValue && <span>{percentage}%</span>}
        </div>
      )}

      <ProgressPrimitive.Root
        data-slot="progress"
        data-theme={theme}
        data-size={size}
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn('h-full w-full flex-1 transition-all duration-300', indicatorColor)}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

export { Progress, progressVariants }
