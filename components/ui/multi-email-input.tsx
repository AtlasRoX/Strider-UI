'use client'

import * as React from 'react'
import { X, Mail, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form-control'
import { Badge } from '@/components/ui/badge'

export interface MultiEmailInputProps {
  label?: string
  description?: string
  error?: string
  required?: boolean
  value?: string[]
  defaultValue?: string[]
  onChange?: (emails: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * MultiEmailInput
 * Chip-based multiple email input with RFC-compliant validation and tag removal.
 */
export function MultiEmailInput({
  label,
  description,
  error: controlledError,
  required,
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = 'Add email and press Enter...',
  disabled = false,
  className,
}: MultiEmailInputProps) {
  const isControlled = controlledValue !== undefined
  const [internalEmails, setInternalEmails] = React.useState<string[]>(defaultValue)
  const [inputValue, setInputValue] = React.useState('')
  const [inputError, setInputError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const emails = isControlled ? controlledValue : internalEmails

  const addEmail = (raw: string) => {
    const trimmed = raw.trim().toLowerCase()
    if (!trimmed) return

    if (!EMAIL_REGEX.test(trimmed)) {
      setInputError(`"${trimmed}" is not a valid email address`)
      return
    }

    if (emails.includes(trimmed)) {
      setInputError(`"${trimmed}" is already added`)
      return
    }

    const next = [...emails, trimmed]
    if (!isControlled) setInternalEmails(next)
    onChange?.(next)
    setInputValue('')
    setInputError(null)
  }

  const removeEmail = (index: number) => {
    const next = emails.filter((_, i) => i !== index)
    if (!isControlled) setInternalEmails(next)
    onChange?.(next)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
      if (inputValue) {
        e.preventDefault()
        addEmail(inputValue)
      }
    } else if (e.key === 'Backspace' && !inputValue && emails.length > 0) {
      removeEmail(emails.length - 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text')
    const candidates = pasted.split(/[\s,;]+/).filter(Boolean)
    const validToAdd: string[] = []

    candidates.forEach((c) => {
      const clean = c.trim().toLowerCase()
      if (EMAIL_REGEX.test(clean) && !emails.includes(clean) && !validToAdd.includes(clean)) {
        validToAdd.push(clean)
      }
    })

    if (validToAdd.length > 0) {
      const next = [...emails, ...validToAdd]
      if (!isControlled) setInternalEmails(next)
      onChange?.(next)
      setInputValue('')
      setInputError(null)
    }
  }

  const displayError = controlledError || inputError

  return (
    <FormControl
      label={label}
      description={description}
      error={displayError || undefined}
      required={required}
    >
      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          'flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg border border-[var(--outline-base)] bg-[var(--surface-input)] px-2.5 py-1.5 text-xs transition-all',
          'focus-within:border-[var(--outline-focus)] focus-within:ring-2 focus-within:ring-[var(--outline-focus)]/20',
          displayError && 'border-[var(--rose-solid)] focus-within:border-[var(--rose-solid)] focus-within:ring-[var(--rose-solid)]/20',
          disabled && 'opacity-50 cursor-not-allowed bg-[var(--surface-muted)]',
          className
        )}
      >
        <Mail className="size-3.5 text-[var(--ink-muted)] shrink-0 mr-0.5" />

        {emails.map((email, idx) => (
          <Badge
            key={idx}
            size="sm"
            variant="subtle"
            theme="brand"
            removable={!disabled}
            onRemove={() => removeEmail(idx)}
            className="text-[11px] py-0.5"
          >
            {email}
          </Badge>
        ))}

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            if (inputError) setInputError(null)
          }}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => {
            if (inputValue) addEmail(inputValue)
          }}
          disabled={disabled}
          placeholder={emails.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[140px] bg-transparent outline-none placeholder:text-[var(--ink-muted)] text-[var(--ink-primary)]"
        />
      </div>
    </FormControl>
  )
}
