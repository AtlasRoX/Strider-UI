'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '@/lib/utils'

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  label?: React.ReactNode
  labelPosition?: 'left' | 'center' | 'right'
  dashed?: boolean
}

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  label,
  labelPosition = 'center',
  dashed = false,
  ...props
}: SeparatorProps) {
  if (label && orientation === 'horizontal') {
    return (
      <div
        data-slot="divider"
        role="separator"
        aria-orientation="horizontal"
        className={cn('relative flex items-center w-full my-2 select-none', className)}
      >
        <div
          className={cn(
            'grow border-t border-[var(--outline-base)]',
            dashed && 'border-dashed'
          )}
        />
        <span
          className={cn(
            'px-2.5 text-xs text-[var(--ink-secondary)] bg-[var(--surface-base)] font-medium shrink-0',
            {
              'mr-auto pl-0': labelPosition === 'left',
              'ml-auto pr-0': labelPosition === 'right',
            }
          )}
        >
          {label}
        </span>
        <div
          className={cn(
            'grow border-t border-[var(--outline-base)]',
            dashed && 'border-dashed'
          )}
        />
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-[var(--outline-base)] shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        dashed &&
          'bg-transparent border-dashed data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-[var(--outline-base)] data-[orientation=vertical]:border-l data-[orientation=vertical]:border-[var(--outline-base)]',
        className
      )}
      {...props}
    />
  )
}

export { Separator, Separator as Divider }
