'use client'

import * as React from 'react'
import { Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { FormControl } from '@/components/ui/form-control'

export interface TimePickerProps {
  id?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean | null
  required?: boolean
  value?: string
  defaultValue?: string
  onChange?: (time: string) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function TimePicker({
  id: customId,
  label,
  description,
  error,
  required,
  value,
  defaultValue = '12:00',
  onChange,
  disabled = false,
  size = 'md',
  className,
}: TimePickerProps) {
  const [internalVal, setInternalVal] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentVal = isControlled ? value : internalVal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (!isControlled) {
      setInternalVal(val)
    }
    onChange?.(val)
  }

  const controlElement = (fieldProps?: {
    id: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
    'aria-required'?: boolean
  }) => (
    <Input
      type="time"
      id={fieldProps?.id || customId}
      disabled={disabled}
      aria-invalid={fieldProps?.['aria-invalid']}
      aria-describedby={fieldProps?.['aria-describedby']}
      aria-required={fieldProps?.['aria-required'] || required}
      value={currentVal}
      onChange={handleChange}
      size={size}
      prefix={<Clock className="size-4 text-[var(--ink-muted)] shrink-0" />}
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
