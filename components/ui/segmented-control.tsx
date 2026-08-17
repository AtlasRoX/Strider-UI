'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface SegmentedControlOption<T extends string = string> {
  value: T
  label: React.ReactNode
  icon?: React.ComponentType<{ className?: string }>
  disabled?: boolean
}

export interface SegmentedControlProps<T extends string = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options: SegmentedControlOption<T>[]
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
  theme?: ThemeColor
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
}

export function SegmentedControl<T extends string = string>({
  options = [],
  value: controlledValue,
  defaultValue,
  onChange,
  theme = 'brand',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className,
  ...props
}: SegmentedControlProps<T>) {
  const [internalValue, setInternalValue] = React.useState<T>(
    controlledValue ?? defaultValue ?? (options[0]?.value as T)
  )

  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const activeIndex = options.findIndex((opt) => opt.value === currentValue)

  const handleSelect = (option: SegmentedControlOption<T>) => {
    if (disabled || option.disabled) return
    if (!isControlled) {
      setInternalValue(option.value)
    }
    onChange?.(option.value)
  }

  const sizeClasses = {
    sm: 'h-7 text-xs p-0.5 gap-0.5',
    md: 'h-9 text-xs p-1 gap-1',
    lg: 'h-11 text-sm p-1.5 gap-1.5',
  }[size]

  const itemPadding = {
    sm: 'px-2.5 py-0.5',
    md: 'px-3 py-1',
    lg: 'px-4 py-1.5',
  }[size]

  return (
    <div
      data-slot="segmented-control"
      role="radiogroup"
      aria-disabled={disabled}
      className={cn(
        'relative inline-flex items-center rounded-lg bg-[var(--surface-muted)] border border-[var(--outline-base)]/50 select-none shadow-2xs',
        sizeClasses,
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 pointer-events-none' : '',
        className
      )}
      {...props}
    >
      {options.map((option, idx) => {
        const isSelected = option.value === currentValue
        const Icon = option.icon

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={disabled || option.disabled}
            onClick={() => handleSelect(option)}
            className={cn(
              'relative z-10 flex items-center justify-center gap-1.5 font-medium rounded-md transition-all duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)]',
              itemPadding,
              fullWidth ? 'flex-1' : '',
              isSelected
                ? 'bg-[var(--surface-base)] text-[var(--ink-primary)] shadow-xs font-semibold'
                : 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-black/5 dark:hover:bg-white/5',
              option.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
            )}
          >
            {Icon && <Icon className="size-3.5 shrink-0" />}
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
