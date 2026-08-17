'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  value?: number
  defaultValue?: number
  onChange?: (amount: number) => void
  currency?: string
  currencySymbol?: string
  decimals?: number
  label?: string
  description?: string
  error?: string
  allowNegative?: boolean
}

export function CurrencyInput({
  value: controlledValue,
  defaultValue,
  onChange,
  currency = 'USD',
  currencySymbol = '$',
  decimals = 2,
  label,
  description,
  error,
  allowNegative = false,
  disabled = false,
  className,
  ...props
}: CurrencyInputProps) {
  const [internalValue, setInternalValue] = React.useState<string>(
    defaultValue !== undefined ? defaultValue.toFixed(decimals) : ''
  )

  const isControlled = controlledValue !== undefined
  const displayValue = isControlled
    ? controlledValue !== undefined
      ? controlledValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals })
      : ''
    : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^0-9.-]/g, '')
    if (!allowNegative) {
      raw = raw.replace(/-/g, '')
    }

    if (!isControlled) {
      setInternalValue(raw)
    }

    const numericValue = parseFloat(raw)
    onChange?.(isNaN(numericValue) ? 0 : numericValue)
  }

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && (
        <label className="text-xs font-semibold text-[var(--ink-primary)]">
          {label}
        </label>
      )}

      <div
        className={cn(
          'flex items-center rounded-lg border border-[var(--outline-base)] bg-[var(--surface-base)] px-3 py-1.5 transition-all focus-within:ring-2 focus-within:ring-[var(--brand-solid)] focus-within:border-transparent shadow-2xs',
          error ? 'border-rose-500 focus-within:ring-rose-500' : '',
          disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
        )}
      >
        <span className="font-mono text-sm font-semibold text-[var(--ink-muted)] select-none mr-1.5">
          {currencySymbol}
        </span>

        <input
          type="text"
          inputMode="decimal"
          disabled={disabled}
          value={displayValue}
          onChange={handleChange}
          placeholder="0.00"
          className="flex-1 bg-transparent text-sm font-mono font-medium text-[var(--ink-primary)] outline-hidden placeholder:text-[var(--ink-muted)]"
          {...props}
        />

        {currency && (
          <span className="font-mono text-[11px] uppercase font-bold text-[var(--ink-muted)] select-none ml-2 px-1.5 py-0.5 rounded bg-[var(--surface-muted)]">
            {currency}
          </span>
        )}
      </div>

      {description && !error && (
        <span className="text-[11px] text-[var(--ink-muted)]">{description}</span>
      )}
      {error && <span className="text-[11px] text-rose-500 font-medium">{error}</span>}
    </div>
  )
}
