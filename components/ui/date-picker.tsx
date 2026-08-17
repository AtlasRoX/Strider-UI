'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { FormControl } from '@/components/ui/form-control'
import { Button } from '@/components/ui/button'

export interface DatePickerProps {
  id?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean | null
  required?: boolean
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  dateFormat?: string
  disabled?: boolean
  clearable?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function DatePicker({
  id: customId,
  label,
  description,
  error,
  required,
  value,
  defaultValue,
  onChange,
  placeholder = 'Pick a date...',
  dateFormat = 'PPP',
  disabled = false,
  clearable = true,
  size = 'md',
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(defaultValue)

  const isControlled = value !== undefined
  const currentDate = isControlled ? value : internalDate

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!isControlled) {
      setInternalDate(selectedDate)
    }
    onChange?.(selectedDate)
    setOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isControlled) {
      setInternalDate(undefined)
    }
    onChange?.(undefined)
  }

  const sizeClasses = {
    sm: 'h-8 text-xs px-2.5 rounded-md gap-1.5',
    md: 'h-9 text-sm px-3 rounded-md gap-2',
    lg: 'h-10 text-base px-3.5 rounded-lg gap-2.5',
  }[size]

  const controlElement = (fieldProps?: {
    id: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
    'aria-required'?: boolean
  }) => (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <div
          id={fieldProps?.id || customId}
          role="combobox"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-invalid={fieldProps?.['aria-invalid']}
          aria-describedby={fieldProps?.['aria-describedby']}
          aria-required={fieldProps?.['aria-required'] || required}
          data-slot="date-picker-trigger"
          className={cn(
            'flex w-full items-center justify-between border border-[var(--outline-base)] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-xs transition-colors select-none outline-none cursor-pointer',
            'hover:bg-[var(--surface-subtle)] focus:border-[var(--outline-focus)] focus:ring-2 focus:ring-[var(--outline-focus)]/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            Boolean(error) && 'border-[var(--rose-solid)] focus:ring-[var(--rose-solid)]/20',
            sizeClasses,
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="size-4 text-[var(--ink-muted)] shrink-0" />
            <span className={cn(!currentDate && 'text-[var(--ink-muted)]')}>
              {currentDate ? format(currentDate, dateFormat) : placeholder}
            </span>
          </div>

          {clearable && currentDate && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 rounded-xs text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors ml-2"
              aria-label="Clear date"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          data-slot="date-picker-content"
          className="z-50 w-auto overflow-hidden rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] p-3 text-[var(--ink-primary)] shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-[var(--outline-muted)]">
            <Button
              size="xs"
              variant="subtle"
              theme="gray"
              onClick={() => handleSelect(new Date())}
            >
              Today
            </Button>
            <Button
              size="xs"
              variant="subtle"
              theme="gray"
              onClick={() => {
                const d = new Date()
                d.setDate(d.getDate() + 1)
                handleSelect(d)
              }}
            >
              Tomorrow
            </Button>
            <Button
              size="xs"
              variant="subtle"
              theme="gray"
              onClick={() => {
                const d = new Date()
                d.setDate(d.getDate() + 7)
                handleSelect(d)
              }}
            >
              In a week
            </Button>
          </div>

          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
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
