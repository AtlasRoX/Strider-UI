'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Check, ChevronDown, Search } from 'lucide-react'

export interface CountryOption {
  code: string
  name: string
  dialCode: string
  flag: string
}

export const COUNTRIES: CountryOption[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
]

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  value?: string
  defaultValue?: string
  defaultCountry?: string
  onChange?: (fullPhoneNumber: string, country: CountryOption) => void
  label?: string
  description?: string
  error?: string
}

export function PhoneInput({
  value: controlledValue,
  defaultValue = '',
  defaultCountry = 'US',
  onChange,
  label,
  description,
  error,
  disabled = false,
  className,
  ...props
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = React.useState<CountryOption>(
    COUNTRIES.find((c) => c.code === defaultCountry) || COUNTRIES[0]
  )
  const [nationalNumber, setNationalNumber] = React.useState(defaultValue)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)

  const filteredCountries = React.useMemo(() => {
    if (!searchQuery) return COUNTRIES
    const q = searchQuery.toLowerCase()
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const handleCountryChange = (country: CountryOption) => {
    setSelectedCountry(country)
    setIsOpen(false)
    onChange?.(`${country.dialCode} ${nationalNumber}`, country)
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9\s-]/g, '')
    setNationalNumber(raw)
    onChange?.(`${selectedCountry.dialCode} ${raw}`, selectedCountry)
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
          'flex items-center rounded-lg border border-[var(--outline-base)] bg-[var(--surface-base)] transition-all focus-within:ring-2 focus-within:ring-[var(--brand-solid)] focus-within:border-transparent overflow-hidden shadow-2xs',
          error ? 'border-rose-500 focus-within:ring-rose-500' : '',
          disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
        )}
      >
        {/* Country Selector Dropdown */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              className="flex items-center gap-1.5 px-3 py-2 bg-[var(--surface-muted)]/50 hover:bg-[var(--surface-muted)] border-r border-[var(--outline-base)] text-xs font-medium text-[var(--ink-primary)] transition-colors cursor-pointer outline-hidden shrink-0"
            >
              <span className="text-base leading-none">{selectedCountry.flag}</span>
              <span className="font-mono">{selectedCountry.dialCode}</span>
              <ChevronDown className="size-3 text-[var(--ink-muted)]" />
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-64 p-2 flex flex-col gap-2" align="start">
            {/* Search Input */}
            <div className="relative">
              <Search className="size-3.5 absolute left-2.5 top-2.5 text-[var(--ink-muted)] pointer-events-none" />
              <input
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-2 text-xs bg-[var(--surface-muted)] rounded-md outline-hidden text-[var(--ink-primary)]"
              />
            </div>

            {/* Countries List */}
            <div className="max-h-48 overflow-y-auto flex flex-col gap-0.5">
              {filteredCountries.map((country) => {
                const isSelected = country.code === selectedCountry.code
                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountryChange(country)}
                    className={cn(
                      'flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors text-left cursor-pointer',
                      isSelected
                        ? 'bg-[var(--brand-subtle)] text-[var(--brand-solid)] font-semibold'
                        : 'hover:bg-[var(--surface-muted)] text-[var(--ink-primary)]'
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span>{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 font-mono text-[var(--ink-muted)]">
                      <span>{country.dialCode}</span>
                      {isSelected && <Check className="size-3 text-[var(--brand-solid)] stroke-[3]" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </PopoverContent>
        </Popover>

        {/* National Number Input */}
        <input
          type="tel"
          disabled={disabled}
          value={nationalNumber}
          onChange={handleNumberChange}
          placeholder="234 567 8900"
          className="flex-1 px-3 py-2 text-sm bg-transparent outline-hidden font-mono text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
          {...props}
        />
      </div>

      {description && !error && (
        <span className="text-[11px] text-[var(--ink-muted)]">{description}</span>
      )}
      {error && <span className="text-[11px] text-rose-500 font-medium">{error}</span>}
    </div>
  )
}
