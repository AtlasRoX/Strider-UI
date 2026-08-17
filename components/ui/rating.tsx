'use client'

import * as React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface RatingProps {
  value?: number
  defaultValue?: number
  max?: number
  onChange?: (value: number) => void
  readOnly?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  theme?: ThemeColor
  allowHalf?: boolean
  className?: string
}

export function Rating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  onChange,
  readOnly = false,
  disabled = false,
  size = 'md',
  theme = 'amber',
  className,
}: RatingProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [hoverValue, setHoverValue] = React.useState<number | null>(null)

  const currentValue = isControlled ? controlledValue : internalValue
  const displayValue = hoverValue !== null ? hoverValue : currentValue

  const sizeClasses = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  }[size]

  const activeThemeColor = {
    brand: 'text-[var(--brand-solid)] fill-[var(--brand-solid)]',
    gray: 'text-[var(--ink-primary)] fill-[var(--ink-primary)]',
    blue: 'text-[var(--blue-solid)] fill-[var(--blue-solid)]',
    emerald: 'text-[var(--emerald-solid)] fill-[var(--emerald-solid)]',
    amber: 'text-[var(--amber-solid)] fill-[var(--amber-solid)]',
    rose: 'text-[var(--rose-solid)] fill-[var(--rose-solid)]',
    violet: 'text-[var(--violet-solid)] fill-[var(--violet-solid)]',
  }[theme]

  const handleClick = (val: number) => {
    if (readOnly || disabled) return
    if (!isControlled) setInternalValue(val)
    onChange?.(val)
  }

  return (
    <div
      role="radiogroup"
      aria-label={`Rating: ${currentValue} of ${max} stars`}
      className={cn(
        'inline-flex items-center gap-1',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onMouseLeave={() => !readOnly && !disabled && setHoverValue(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const starNumber = i + 1
        const isFilled = starNumber <= displayValue

        return (
          <button
            key={i}
            type="button"
            disabled={disabled || readOnly}
            aria-label={`${starNumber} star${starNumber > 1 ? 's' : ''}`}
            className={cn(
              'rounded-xs transition-transform duration-100 outline-none focus-visible:ring-2 focus-visible:ring-[var(--outline-focus)]',
              !readOnly && !disabled && 'cursor-pointer hover:scale-110'
            )}
            onClick={() => handleClick(starNumber)}
            onMouseEnter={() => !readOnly && !disabled && setHoverValue(starNumber)}
          >
            <Star
              className={cn(
                sizeClasses,
                isFilled
                  ? activeThemeColor
                  : 'text-[var(--outline-base)] fill-transparent'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
