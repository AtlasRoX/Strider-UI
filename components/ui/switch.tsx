'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: React.ReactNode
  description?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  theme?: ThemeColor
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      id: customId,
      className,
      label,
      description,
      size = 'md',
      theme = 'brand',
      disabled,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId()
    const id = customId || autoId

    const sizeClasses = {
      sm: 'h-4 w-7 p-0.5',
      md: 'h-5 w-9 p-0.5',
      lg: 'h-6 w-11 p-0.5',
    }[size]

    const thumbSizes = {
      sm: 'size-3 data-[state=checked]:translate-x-3',
      md: 'size-4 data-[state=checked]:translate-x-4',
      lg: 'size-5 data-[state=checked]:translate-x-5',
    }[size]

    const themeClasses = {
      brand: 'data-[state=checked]:bg-[var(--brand-solid)] focus-visible:ring-[var(--outline-focus)]',
      gray: 'data-[state=checked]:bg-[var(--gray-solid)] focus-visible:ring-[var(--ink-secondary)]',
      blue: 'data-[state=checked]:bg-[var(--blue-solid)] focus-visible:ring-[var(--blue-solid)]',
      emerald: 'data-[state=checked]:bg-[var(--emerald-solid)] focus-visible:ring-[var(--emerald-solid)]',
      amber: 'data-[state=checked]:bg-[var(--amber-solid)] focus-visible:ring-[var(--amber-solid)]',
      rose: 'data-[state=checked]:bg-[var(--rose-solid)] focus-visible:ring-[var(--rose-solid)]',
      violet: 'data-[state=checked]:bg-[var(--violet-solid)] focus-visible:ring-[var(--violet-solid)]',
    }[theme]

    const switchElement = (
      <SwitchPrimitive.Root
        ref={ref}
        id={id}
        disabled={disabled}
        data-slot="switch"
        data-size={size}
        data-theme={theme}
        className={cn(
          'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-[var(--surface-muted)] transition-colors select-none outline-none shadow-2xs',
          'focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          sizeClasses,
          themeClasses,
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className={cn(
            'pointer-events-none block rounded-full bg-white shadow-sm ring-0 transition-transform data-[state=unchecked]:translate-x-0',
            thumbSizes
          )}
        />
      </SwitchPrimitive.Root>
    )

    if (!label && !description) {
      return switchElement
    }

    return (
      <div className="flex items-center justify-between gap-3 select-none">
        <div className="flex flex-col gap-0.5">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                'text-xs font-medium text-[var(--ink-primary)] cursor-pointer',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-[11px] text-[var(--ink-secondary)] leading-normal">
              {description}
            </p>
          )}
        </div>
        {switchElement}
      </div>
    )
  }
)
Switch.displayName = 'Switch'

export { Switch }
