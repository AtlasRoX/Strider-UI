'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string
  indeterminate?: boolean
  theme?: ThemeColor
  size?: 'sm' | 'md' | 'lg'
  card?: boolean
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      id: customId,
      className,
      label,
      description,
      error,
      indeterminate = false,
      theme = 'brand',
      size = 'md',
      card = false,
      checked,
      disabled,
      ...props
    },
    ref
  ) => {
    const autoId = React.useId()
    const id = customId || autoId

    const rootCheckedProps = indeterminate
      ? { checked: 'indeterminate' as const }
      : checked !== undefined
      ? { checked }
      : {}

    const sizeClasses = {
      sm: 'size-3.5 rounded-[3px]',
      md: 'size-4 rounded-xs',
      lg: 'size-5 rounded-sm',
    }[size]

    const iconSizes = {
      sm: 'size-2.5 stroke-[3]',
      md: 'size-3 stroke-[3]',
      lg: 'size-3.5 stroke-[3]',
    }[size]

    const themeClasses = {
      brand:
        'data-[state=checked]:bg-[var(--brand-solid)] data-[state=checked]:border-[var(--brand-solid)] data-[state=indeterminate]:bg-[var(--brand-solid)] data-[state=indeterminate]:border-[var(--brand-solid)] focus-visible:ring-[var(--brand-solid)]',
      gray:
        'data-[state=checked]:bg-[var(--gray-solid)] data-[state=checked]:border-[var(--gray-solid)] data-[state=indeterminate]:bg-[var(--gray-solid)] data-[state=indeterminate]:border-[var(--gray-solid)] focus-visible:ring-[var(--gray-solid)]',
      blue:
        'data-[state=checked]:bg-[var(--blue-solid)] data-[state=checked]:border-[var(--blue-solid)] data-[state=indeterminate]:bg-[var(--blue-solid)] data-[state=indeterminate]:border-[var(--blue-solid)] focus-visible:ring-[var(--blue-solid)]',
      emerald:
        'data-[state=checked]:bg-[var(--emerald-solid)] data-[state=checked]:border-[var(--emerald-solid)] data-[state=indeterminate]:bg-[var(--emerald-solid)] data-[state=indeterminate]:border-[var(--emerald-solid)] focus-visible:ring-[var(--emerald-solid)]',
      amber:
        'data-[state=checked]:bg-[var(--amber-solid)] data-[state=checked]:border-[var(--amber-solid)] data-[state=indeterminate]:bg-[var(--amber-solid)] data-[state=indeterminate]:border-[var(--amber-solid)] focus-visible:ring-[var(--amber-solid)]',
      rose:
        'data-[state=checked]:bg-[var(--rose-solid)] data-[state=checked]:border-[var(--rose-solid)] data-[state=indeterminate]:bg-[var(--rose-solid)] data-[state=indeterminate]:border-[var(--rose-solid)] focus-visible:ring-[var(--rose-solid)]',
      violet:
        'data-[state=checked]:bg-[var(--violet-solid)] data-[state=checked]:border-[var(--violet-solid)] data-[state=indeterminate]:bg-[var(--violet-solid)] data-[state=indeterminate]:border-[var(--violet-solid)] focus-visible:ring-[var(--violet-solid)]',
    }[theme]

    const checkboxControl = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        disabled={disabled}
        data-slot="checkbox"
        data-size={size}
        data-theme={theme}
        className={cn(
          'peer shrink-0 border border-[var(--outline-base)] bg-[var(--surface-card)] hover:border-[var(--outline-focus)] text-white shadow-2xs transition-all select-none outline-none cursor-pointer',
          'focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          Boolean(error) && 'border-[var(--rose-solid)] focus-visible:ring-[var(--rose-solid)]',
          sizeClasses,
          themeClasses,
          className
        )}
        {...rootCheckedProps}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current"
        >
          {indeterminate ? (
            <Minus className={iconSizes} />
          ) : (
            <Check className={iconSizes} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )

    if (!label && !description && !error) {
      return checkboxControl
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
          <div className="pt-0.5 shrink-0">{checkboxControl}</div>
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
            {error && (
              <span className="text-[11px] font-medium text-[var(--rose-solid)]">
                {error}
              </span>
            )}
          </div>
        </label>
      )
    }

    const hasExtra = Boolean(description || error)

    return (
      <div
        className={cn(
          'flex select-none gap-2.5',
          hasExtra ? 'items-start' : 'items-center'
        )}
      >
        <div className={cn('shrink-0', hasExtra ? 'pt-0.5' : 'flex items-center')}>
          {checkboxControl}
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
          {error && (
            <p className="text-[11px] font-medium text-[var(--rose-solid)]">
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }

