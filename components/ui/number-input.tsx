'use client'

import * as React from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue' | 'prefix' | 'suffix'> {
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  precision?: number
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  stepperPosition?: 'both' | 'right'
}

/**
 * NumberInput
 * Precision numeric input with steppers, keyboard shortcuts, and P5 form contract.
 */
export function NumberInput({
  value: controlledValue,
  defaultValue = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision = 0,
  label,
  description,
  error,
  required,
  prefix,
  suffix,
  stepperPosition = 'right',
  disabled,
  className,
  id: customId,
  ...props
}: NumberInputProps) {
  const generatedId = React.useId()
  const id = customId || generatedId
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  const [value, setValue] = React.useState<number>(
    controlledValue !== undefined ? controlledValue : defaultValue
  )

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue)
    }
  }, [controlledValue])

  const clamp = (val: number) => {
    let num = Number(val.toFixed(precision))
    if (num < min) num = min
    if (num > max) num = max
    return num
  }

  const updateValue = (newVal: number) => {
    const clamped = clamp(newVal)
    if (controlledValue === undefined) {
      setValue(clamped)
    }
    onChange?.(clamped)
  }

  const handleIncrement = () => {
    if (disabled || value >= max) return
    updateValue(value + step)
  }

  const handleDecrement = () => {
    if (disabled || value <= min) return
    updateValue(value - step)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      handleIncrement()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      handleDecrement()
    }
  }

  return (
    <div data-slot="number-input-root" className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-[var(--ink-primary)] flex items-center gap-1"
        >
          {label}
          {required && <span className="text-[var(--rose-solid)]">*</span>}
        </label>
      )}

      <div
        className={cn(
          'relative flex items-center rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)] shadow-2xs transition-all duration-150',
          'focus-within:border-[var(--brand-solid)] focus-within:ring-2 focus-within:ring-[var(--brand-subtle)]',
          error && 'border-[var(--rose-solid)] focus-within:border-[var(--rose-solid)] focus-within:ring-[var(--rose-subtle)]',
          disabled && 'opacity-60 cursor-not-allowed bg-[var(--surface-muted)]',
          className
        )}
      >
        {prefix && (
          <span className="pl-3 text-xs text-[var(--ink-muted)] shrink-0 flex items-center">
            {prefix}
          </span>
        )}

        {stepperPosition === 'both' && (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled || value <= min}
            onClick={handleDecrement}
            className="p-2 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] disabled:opacity-30 disabled:pointer-events-none rounded-l-xl transition-colors cursor-pointer"
          >
            <Minus className="size-3.5" />
          </button>
        )}

        <input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => {
            const num = parseFloat(e.target.value)
            if (!isNaN(num)) {
              updateValue(num)
            }
          }}
          onKeyDown={handleKeyDown}
          aria-describedby={description ? descriptionId : undefined}
          aria-errormessage={error ? errorId : undefined}
          aria-invalid={!!error}
          className="flex-1 bg-transparent px-3 py-2 text-xs font-medium text-[var(--ink-primary)] outline-none text-center sm:text-left [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          {...props}
        />

        {suffix && (
          <span className="pr-2 text-xs text-[var(--ink-muted)] shrink-0 flex items-center">
            {suffix}
          </span>
        )}

        {stepperPosition === 'both' ? (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled || value >= max}
            onClick={handleIncrement}
            className="p-2 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] disabled:opacity-30 disabled:pointer-events-none rounded-r-xl transition-colors cursor-pointer"
          >
            <Plus className="size-3.5" />
          </button>
        ) : (
          <div className="flex flex-col border-l border-[var(--outline-base)]/50 shrink-0">
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled || value >= max}
              onClick={handleIncrement}
              className="px-2 py-0.5 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] disabled:opacity-30 disabled:pointer-events-none rounded-tr-xl transition-colors cursor-pointer"
            >
              <Plus className="size-2.5" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled || value <= min}
              onClick={handleDecrement}
              className="px-2 py-0.5 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] disabled:opacity-30 disabled:pointer-events-none rounded-br-xl transition-colors cursor-pointer border-t border-[var(--outline-base)]/40"
            >
              <Minus className="size-2.5" />
            </button>
          </div>
        )}
      </div>

      {description && !error && (
        <p id={descriptionId} className="text-[11px] text-[var(--ink-muted)]">
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-[11px] font-medium text-[var(--rose-solid)]">
          {error}
        </p>
      )}
    </div>
  )
}
