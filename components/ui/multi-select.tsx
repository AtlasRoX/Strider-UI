'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { FormControl } from '@/components/ui/form-control'

export interface MultiSelectOption {
  label: string
  value: string
  description?: string
  prefix?: React.ReactNode
  disabled?: boolean
}

export interface MultiSelectProps {
  id?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean | null
  required?: boolean
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (values: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export function MultiSelect({
  id: customId,
  label,
  description,
  error,
  required,
  options,
  value,
  defaultValue = [],
  onChange,
  placeholder = 'Select items...',
  searchPlaceholder = 'Search items...',
  size = 'md',
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [internalVal, setInternalVal] = React.useState<string[]>(defaultValue)

  const isControlled = value !== undefined
  const currentValues = isControlled ? value : internalVal

  const handleToggle = (optVal: string) => {
    const next = currentValues.includes(optVal)
      ? currentValues.filter((v) => v !== optVal)
      : [...currentValues, optVal]

    if (!isControlled) {
      setInternalVal(next)
    }
    onChange?.(next)
  }

  const handleRemove = (optVal: string, e?: React.MouseEvent) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
    }
    const next = currentValues.filter((v) => v !== optVal)
    if (!isControlled) {
      setInternalVal(next)
    }
    onChange?.(next)
  }

  const handleClearAll = (e?: React.MouseEvent) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation()
    }
    if (!isControlled) {
      setInternalVal([])
    }
    onChange?.([])
  }

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase()) ||
      opt.description?.toLowerCase().includes(query.toLowerCase())
  )

  const sizeClasses = {
    sm: 'min-h-8 text-xs px-2 py-1 rounded-md gap-1',
    md: 'min-h-9 text-sm px-2.5 py-1.5 rounded-md gap-1.5',
    lg: 'min-h-10 text-base px-3 py-2 rounded-lg gap-2',
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
          aria-haspopup="listbox"
          aria-invalid={fieldProps?.['aria-invalid']}
          aria-describedby={fieldProps?.['aria-describedby']}
          aria-required={fieldProps?.['aria-required'] || required}
          data-slot="multi-select-trigger"
          className={cn(
            'flex w-full items-center justify-between border border-[var(--outline-base)] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-xs transition-colors select-none outline-none cursor-pointer',
            'hover:bg-[var(--surface-subtle)] focus:border-[var(--outline-focus)] focus:ring-2 focus:ring-[var(--outline-focus)]/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            Boolean(error) && 'border-[var(--rose-solid)] focus:ring-[var(--rose-solid)]/20',
            sizeClasses,
            className
          )}
        >
          <div className="flex flex-wrap items-center gap-1 flex-1 min-w-0">
            {currentValues.length === 0 ? (
              <span className="text-[var(--ink-muted)] text-xs">{placeholder}</span>
            ) : (
              currentValues.map((val) => {
                const opt = options.find((o) => o.value === val)
                return (
                  <Badge
                    key={val}
                    size="sm"
                    variant="subtle"
                    theme="brand"
                    removable={!disabled}
                    onRemove={(e) => handleRemove(val, e)}
                  >
                    {opt?.label || val}
                  </Badge>
                )
              })
            )}
          </div>

          <div className="flex items-center gap-1 ml-2 shrink-0">
            {currentValues.length > 0 && !disabled && (
              <button
                type="button"
                onClick={handleClearAll}
                className="p-0.5 rounded-xs text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Clear all"
              >
                <X className="size-3.5" />
              </button>
            )}
            <ChevronDown className="size-4 opacity-50 shrink-0" />
          </div>
        </div>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          data-slot="multi-select-content"
          className="z-50 w-[var(--radix-popover-trigger-width)] min-w-[14rem] overflow-hidden rounded-lg border border-[var(--outline-base)] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 p-1"
        >
          {/* Search Bar */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-[var(--outline-muted)] mb-1">
            <Search className="size-3.5 text-[var(--ink-muted)] shrink-0" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-xs outline-none placeholder:text-[var(--ink-muted)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-[var(--ink-muted)] hover:text-[var(--ink-primary)]"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto flex flex-col gap-0.5 p-0.5">
            {filteredOptions.length === 0 ? (
              <div className="py-4 text-center text-xs text-[var(--ink-muted)]">
                No items found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected = currentValues.includes(opt.value)
                return (
                  <div
                    key={opt.value}
                    data-slot="multi-select-item"
                    data-selected={isSelected ? 'true' : undefined}
                    onClick={() => !opt.disabled && handleToggle(opt.value)}
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
