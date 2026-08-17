'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

const spinnerVariants = cva('animate-spin shrink-0', {
  variants: {
    size: {
      xs: 'size-3.5',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-8',
    },
    theme: {
      brand: 'text-[var(--brand-solid)]',
      gray: 'text-[var(--ink-secondary)]',
      blue: 'text-[var(--blue-solid)]',
      emerald: 'text-[var(--emerald-solid)]',
      amber: 'text-[var(--amber-solid)]',
      rose: 'text-[var(--rose-solid)]',
      violet: 'text-[var(--violet-solid)]',
      current: 'text-current',
    },
  },
  defaultVariants: {
    size: 'sm',
    theme: 'current',
  },
})

export interface SpinnerProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

function Spinner({
  className,
  size = 'sm',
  theme = 'current',
  label = 'Loading...',
  ...props
}: SpinnerProps) {
  return (
    <svg
      role="status"
      aria-label={label}
      data-slot="spinner"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(spinnerVariants({ size, theme }), className)}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

export { Spinner, spinnerVariants }
