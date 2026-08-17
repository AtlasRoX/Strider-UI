'use client'

import * as React from 'react'
import { Timer } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { FormControl } from '@/components/ui/form-control'

export interface DurationProps {
  id?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean | null
  required?: boolean
  /** Value in total seconds */
  value?: number
  defaultValue?: number
  /** Emits total seconds */
  onChange?: (seconds: number) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/** Formats total seconds to "1h 30m" string */
function formatSeconds(seconds?: number): string {
  if (!seconds || seconds <= 0) return ''
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  const parts = []
  if (h > 0) parts.push(`${h}h`)
  if (m > 0) parts.push(`${m}m`)
  if (s > 0 && h === 0) parts.push(`${s}s`)
  return parts.join(' ')
}

/** Parses string like "2h 30m" or "45s" into total seconds */
function parseDurationString(str: string): number {
  if (!str) return 0
  let total = 0
  const hourMatch = str.match(/(\d+)\s*h/i)
  const minMatch = str.match(/(\d+)\s*m/i)
  const secMatch = str.match(/(\d+)\s*s/i)

  if (hourMatch) total += parseInt(hourMatch[1], 10) * 3600
  if (minMatch) total += parseInt(minMatch[1], 10) * 60
  if (secMatch) total += parseInt(secMatch[1], 10)

  if (!hourMatch && !minMatch && !secMatch) {
    const rawNum = parseInt(str, 10)
    if (!isNaN(rawNum)) total = rawNum * 60 // default to minutes if raw number
  }

  return total
}

export function Duration({
  id: customId,
  label,
  description,
  error,
  required,
  value,
  defaultValue = 0,
  onChange,
  disabled = false,
  size = 'md',
  className,
}: DurationProps) {
  const [internalSeconds, setInternalSeconds] = React.useState(defaultValue)
  const [textVal, setTextVal] = React.useState(formatSeconds(value ?? defaultValue))

  const isControlled = value !== undefined
  const currentSeconds = isControlled ? value : internalSeconds

  React.useEffect(() => {
    setTextVal(formatSeconds(currentSeconds))
  }, [currentSeconds])

  const handleBlur = () => {
    const parsed = parseDurationString(textVal)
    if (!isControlled) {
      setInternalSeconds(parsed)
    }
    setTextVal(formatSeconds(parsed))
    onChange?.(parsed)
  }

  const controlElement = (fieldProps?: {
    id: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
    'aria-required'?: boolean
  }) => (
    <Input
      id={fieldProps?.id || customId}
      disabled={disabled}
      aria-invalid={fieldProps?.['aria-invalid']}
      aria-describedby={fieldProps?.['aria-describedby']}
      aria-required={fieldProps?.['aria-required'] || required}
      placeholder="e.g. 2h 30m"
      value={textVal}
      onChange={(e) => setTextVal(e.target.value)}
      onBlur={handleBlur}
      size={size}
      prefix={<Timer className="size-4 text-[var(--ink-muted)] shrink-0" />}
      className={className}
    />
  )

  if (label || description || error || required) {
    return (
      <FormControl
        id={customId}
        label={label}
        description={description}
        error={error}
        required={required}
      >
        {(fieldProps) => controlElement(fieldProps)}
      </FormControl>
    )
  }

  return controlElement()
}
