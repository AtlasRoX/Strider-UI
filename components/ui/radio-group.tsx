'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  theme?: ThemeColor
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, theme = 'brand', ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      data-theme={theme}
      className={cn('grid gap-2', className)}
      {...props}
    />
  )
})
RadioGroup.displayName = 'RadioGroup'

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: React.ReactNode
  description?: React.ReactNode
  theme?: ThemeColor
  card?: boolean
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(
  (
    {
      id: customId,
      className,
      label,
      description,
      theme = 'brand',
      card = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId()
    const id = customId || autoId

    const themeClasses = {
      brand: 'data-[state=checked]:border-[var(--brand-solid)] text-[var(--brand-solid)] focus-visible:ring-[var(--outline-focus)]',
      gray: 'data-[state=checked]:border-[var(--gray-solid)] text-[var(--gray-solid)] focus-visible:ring-[var(--ink-secondary)]',
      blue: 'data-[state=checked]:border-[var(--blue-solid)] text-[var(--blue-solid)] focus-visible:ring-[var(--blue-solid)]',
      emerald: 'data-[state=checked]:border-[var(--emerald-solid)] text-[var(--emerald-solid)] focus-visible:ring-[var(--emerald-solid)]',
      amber: 'data-[state=checked]:border-[var(--amber-solid)] text-[var(--amber-solid)] focus-visible:ring-[var(--amber-solid)]',
      rose: 'data-[state=checked]:border-[var(--rose-solid)] text-[var(--rose-solid)] focus-visible:ring-[var(--rose-solid)]',
      violet: 'data-[state=checked]:border-[var(--violet-solid)] text-[var(--violet-solid)] focus-visible:ring-[var(--violet-solid)]',
    }[theme]

    const radioControl = (
      <RadioGroupPrimitive.Item
        ref={ref}
        id={id}
        disabled={disabled}
        data-slot="radio-group-item"
        data-theme={theme}
        className={cn(
          'peer size-4 shrink-0 rounded-full border border-[var(--outline-base)] bg-[var(--surface-card)] hover:border-[var(--outline-focus)] shadow-2xs transition-all select-none outline-none cursor-pointer',
          'focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          themeClasses,
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="flex items-center justify-center"
        >
          <Circle className="size-2 fill-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    )

    if (!label && !description) {
      return radioControl
    }

    if (card) {
      return (
        <label
          htmlFor={id}
          className={cn(
            'flex items-start gap-3 p-3 rounded-lg border border-[var(--outline-base)] bg-[var(--surface-card)] hover:bg-[var(--surface-subtle)] transition-colors cursor-pointer select-none',
            'has-[:checked]:border-[var(--brand-solid)] has-[:checked]:bg-[var(--brand-subtle)]/30',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="pt-0.5 shrink-0">{radioControl}</div>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            {label && (
              <span className="text-xs font-medium text-[var(--ink-primary)]">
                {label}
              </span>
            )}
            {description && (
              <span className="text-[11px] text-[var(--ink-secondary)] leading-normal">
                {description}
              </span>
            )}
          </div>
        </label>
      )
    }

    const hasExtra = Boolean(description)

    return (
      <div
        className={cn(
          'flex select-none gap-2.5',
          hasExtra ? 'items-start' : 'items-center'
        )}
      >
        <div className={cn('shrink-0', hasExtra ? 'pt-0.5' : 'flex items-center')}>
          {radioControl}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                'text-xs font-medium text-[var(--ink-primary)] cursor-pointer select-none',
                hasExtra ? 'leading-tight' : 'leading-none',
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
      </div>
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'

export { RadioGroup, RadioGroupItem, RadioGroupItem as Radio }
