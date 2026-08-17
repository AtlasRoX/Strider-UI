'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { ThemeColor } from '@/lib/theme-types'

export interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  maxTags?: number
  placeholder?: string
  theme?: ThemeColor
  allowDuplicates?: boolean
  validateTag?: (tag: string) => boolean
}

export function TagInput({
  value: controlledValue,
  defaultValue = [],
  onChange,
  maxTags,
  placeholder = 'Add tag and press Enter...',
  theme = 'brand',
  allowDuplicates = false,
  validateTag,
  disabled = false,
  className,
  ...props
}: TagInputProps) {
  const [internalTags, setInternalTags] = React.useState<string[]>(
    controlledValue ?? defaultValue
  )
  const [inputValue, setInputValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const isControlled = controlledValue !== undefined
  const tags = isControlled ? controlledValue : internalTags

  const addTag = (rawTag: string) => {
    const trimmed = rawTag.trim()
    if (!trimmed) return
    if (maxTags && tags.length >= maxTags) return
    if (!allowDuplicates && tags.includes(trimmed)) return
    if (validateTag && !validateTag(trimmed)) return

    const newTags = [...tags, trimmed]
    if (!isControlled) {
      setInternalTags(newTags)
    }
    onChange?.(newTags)
    setInputValue('')
  }

  const removeTag = (index: number) => {
    if (disabled) return
    const newTags = tags.filter((_, i) => i !== index)
    if (!isControlled) {
      setInternalTags(newTags)
    }
    onChange?.(newTags)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      e.preventDefault()
      removeTag(tags.length - 1)
    }
  }

  return (
    <div
      data-slot="tag-input"
      onClick={() => inputRef.current?.focus()}
      className={cn(
        'flex flex-wrap items-center gap-1.5 min-h-10 w-full rounded-lg border border-[var(--outline-base)] bg-[var(--surface-base)] px-3 py-1.5 text-sm transition-colors focus-within:ring-2 focus-within:ring-[var(--brand-solid)] focus-within:border-transparent cursor-text',
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
        className
      )}
    >
      {tags.map((tag, index) => (
        <Badge
          key={`${tag}-${index}`}
          variant="subtle"
          theme={theme}
          size="sm"
          removable={!disabled}
          onRemove={() => removeTag(index)}
        >
          {tag}
        </Badge>
      ))}

      {(!maxTags || tags.length < maxTags) && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          disabled={disabled}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue.trim()) addTag(inputValue)
          }}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent outline-hidden text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] text-sm"
          {...props}
        />
      )}
    </div>
  )
}
