'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronsUpDown, Loader2, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form-control'

export interface ComboboxOption {
  label: string
  value: string
  description?: string
  prefix?: React.ReactNode
  disabled?: boolean
}

export interface ComboboxProps {
  id?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean | null
  required?: boolean
  options?: ComboboxOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  query?: string
  onQueryChange?: (query: string) => void
  filterable?: boolean
  loading?: boolean
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Combobox({
  id: customId,
  label,
  description,
  error,
  required,
  options = [],
  value,
  defaultValue = '',
  onChange,
  query: controlledQuery,
  onQueryChange,
  filterable = true,
  loading = false,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  emptyText = 'No results found.',
  disabled = false,
  size = 'md',
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [internalVal, setInternalVal] = React.useState(defaultValue)
  const [internalQuery, setInternalQuery] = React.useState('')

  const isValControlled = value !== undefined
  const currentVal = isValControlled ? value : internalVal

  const isQueryControlled = controlledQuery !== undefined
  const currentQuery = isQueryControlled ? controlledQuery : internalQuery

  const handleQueryChange = (q: string) => {
    if (!isQueryControlled) {
      setInternalQuery(q)
    }
    onQueryChange?.(q)
  }

  const handleSelect = (optVal: string) => {
    if (!isValControlled) {
      setInternalVal(optVal)
    }
    onChange?.(optVal)
    setOpen(false)
    handleQueryChange('')
  }

  const selectedOption = options.find((o) => o.value === currentVal)

  const filteredOptions = filterable
    ? options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(currentQuery.toLowerCase()) ||
          opt.description?.toLowerCase().includes(currentQuery.toLowerCase())
      )
    : options

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
      <PopoverPrimitive.Trigger
        id={fieldProps?.id || customId}
        disabled={disabled}
        aria-invalid={fieldProps?.['aria-invalid']}
        aria-describedby={fieldProps?.['aria-describedby']}
        aria-required={fieldProps?.['aria-required'] || required}
        data-slot="combobox-trigger"
        className={cn(
          'flex w-full items-center justify-between border border-[var(--outline-base)] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-xs transition-colors select-none outline-none cursor-pointer',
          'hover:bg-[var(--surface-subtle)] focus:border-[var(--outline-focus)] focus:ring-2 focus:ring-[var(--outline-focus)]/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          Boolean(error) && 'border-[var(--rose-solid)] focus:ring-[var(--rose-solid)]/20',
          sizeClasses,
          className
        )}
      >
        <div className="flex items-center gap-2 truncate flex-1 min-w-0">
          {selectedOption?.prefix}
          <span className={cn('truncate', !selectedOption && 'text-[var(--ink-muted)]')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronsUpDown className="size-4 opacity-50 shrink-0 ml-2" />
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          data-slot="combobox-content"
          className="z-50 w-[var(--radix-popover-trigger-width)] min-w-[14rem] overflow-hidden rounded-lg border border-[var(--outline-base)] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 p-1"
        >
          {/* Search Input */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-[var(--outline-muted)] mb-1">
            <Search className="size-3.5 text-[var(--ink-muted)] shrink-0" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={currentQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="w-full bg-transparent text-xs outline-none placeholder:text-[var(--ink-muted)]"
              autoFocus
            />
            {loading ? (
              <Loader2 className="size-3.5 text-[var(--brand-solid)] animate-spin" />
            ) : currentQuery ? (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
              >
                <X className="size-3" />
              </button>
            ) : null}
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto flex flex-col gap-0.5 p-0.5">
            {filteredOptions.length === 0 ? (
              <div className="py-4 text-center text-xs text-[var(--ink-muted)]">
                {loading ? 'Searching...' : emptyText}
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === currentVal
                return (
                  <div
                    key={opt.value}
                    data-slot="combobox-item"
                    data-selected={isSelected ? 'true' : undefined}
                    onClick={() => !opt.disabled && handleSelect(opt.value)}
                    className={cn(
                      'flex items-center justify-between gap-2 px-2 py-1.5 text-xs rounded-md cursor-pointer select-none transition-colors',
                      'hover:bg-[var(--surface-muted)]',
                      isSelected && 'bg-[var(--brand-subtle)] text-[var(--brand-ink)] font-medium',
                      opt.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {opt.prefix}
                      <div className="flex flex-col min-w-0">
                        <span className="truncate">{opt.label}</span>
                        {opt.description && (
                          <span className="text-[10px] text-[var(--ink-muted)] truncate">
                            {opt.description}
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="size-3.5 text-[var(--brand-solid)] shrink-0" />
                    )}
                  </div>
                )
              })
            )}
          </div>
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
