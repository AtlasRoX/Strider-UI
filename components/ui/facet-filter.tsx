'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Search, ChevronDown, Check, X, Filter } from 'lucide-react'

export interface FacetOption {
  value: string
  label: string
  count?: number
  icon?: React.ReactNode
}

export interface FacetFilterProps {
  title: string
  options: FacetOption[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (selected: string[]) => void
  searchPlaceholder?: string
  className?: string
}

export function FacetFilter({
  title,
  options = [],
  value: controlledValue,
  defaultValue = [],
  onChange,
  searchPlaceholder = 'Search options...',
  className,
}: FacetFilterProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue)
  const [search, setSearch] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)

  const isControlled = controlledValue !== undefined
  const selectedValues = isControlled ? controlledValue : internalValue

  const filteredOptions = React.useMemo(() => {
    if (!search) return options
    const q = search.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, search])

  const toggleOption = (val: string) => {
    const next = selectedValues.includes(val)
      ? selectedValues.filter((v) => v !== val)
      : [...selectedValues, val]

    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  const clearAll = () => {
    if (!isControlled) setInternalValue([])
    onChange?.([])
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-slot="facet-filter"
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] hover:bg-[var(--surface-muted)] text-xs font-semibold text-[var(--ink-primary)] shadow-2xs transition-colors cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)] select-none',
            selectedValues.length > 0 ? 'border-[var(--brand-solid)] bg-[var(--brand-subtle)]/30' : '',
            className
          )}
        >
          <Filter className="size-3 text-[var(--brand-solid)]" />
          <span>{title}</span>

          {selectedValues.length > 0 && (
            <Badge variant="solid" theme="brand" size="sm">
              {selectedValues.length}
            </Badge>
          )}

          <ChevronDown className="size-3 text-[var(--ink-muted)] ml-0.5" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-2 flex flex-col gap-2 z-50">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-[var(--ink-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-[var(--outline-base)] bg-[var(--surface-muted)] text-xs text-[var(--ink-primary)] outline-hidden focus:border-[var(--brand-solid)]"
          />
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pt-1">
          {filteredOptions.length === 0 ? (
            <div className="py-4 text-center text-xs text-[var(--ink-muted)]">
              No matching options found.
            </div>
          ) : (
            filteredOptions.map((opt) => {
              const isSelected = selectedValues.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleOption(opt.value)}
                  className={cn(
                    'flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer w-full',
                    isSelected
                      ? 'bg-[var(--brand-subtle)] text-[var(--brand-solid)] font-semibold'
                      : 'hover:bg-[var(--surface-muted)] text-[var(--ink-primary)]'
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={cn(
                        'size-4 rounded border flex items-center justify-center transition-colors shrink-0',
                        isSelected
                          ? 'border-[var(--brand-solid)] bg-[var(--brand-solid)] text-white'
                          : 'border-[var(--outline-base)] bg-[var(--surface-base)]'
                      )}
                    >
                      {isSelected && <Check className="size-3 stroke-[3]" />}
                    </span>
                    <span className="truncate">{opt.label}</span>
                  </div>

                  {opt.count !== undefined && (
                    <span className="font-mono text-[10px] text-[var(--ink-muted)] shrink-0">
                      {opt.count}
                    </span>
                  )}
                </button>
              )
            })
          )}
        </div>

        {/* Footer Actions */}
        {selectedValues.length > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-[var(--outline-base)]/40 text-xs">
            <span className="text-[10px] text-[var(--ink-muted)]">
              {selectedValues.length} selected
            </span>
            <button
              type="button"
              onClick={clearAll}
              className="text-[10px] font-semibold text-rose-500 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
