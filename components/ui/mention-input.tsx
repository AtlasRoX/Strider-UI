'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

export interface MentionItem {
  id: string
  label: string
  detail?: string
  avatar?: string
  trigger?: string
}

export interface MentionInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'defaultValue' | 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  mentions: MentionItem[]
  triggerChar?: string
  placeholder?: string
  label?: string
  description?: string
  error?: string
}

export function MentionInput({
  value: controlledValue,
  defaultValue = '',
  onChange,
  mentions = [],
  triggerChar = '@',
  placeholder = 'Type @ to mention someone...',
  label,
  description,
  error,
  disabled = false,
  className,
  ...props
}: MentionInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [mentionQuery, setMentionQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const filteredMentions = React.useMemo(() => {
    if (!mentionQuery) return mentions
    const q = mentionQuery.toLowerCase()
    return mentions.filter(
      (m) =>
        m.label.toLowerCase().includes(q) ||
        (m.detail && m.detail.toLowerCase().includes(q))
    )
  }, [mentions, mentionQuery])

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    const cursor = e.target.selectionStart

    if (!isControlled) setInternalValue(text)
    onChange?.(text)

    // Check if user is typing a mention
    const beforeCursor = text.slice(0, cursor)
    const triggerIndex = beforeCursor.lastIndexOf(triggerChar)

    if (triggerIndex !== -1 && (triggerIndex === 0 || /\s/.test(beforeCursor[triggerIndex - 1]))) {
      const query = beforeCursor.slice(triggerIndex + 1)
      if (!/\s/.test(query)) {
        setMentionQuery(query)
        setIsPopoverOpen(true)
        setSelectedIndex(0)
        return
      }
    }

    setIsPopoverOpen(false)
  }

  const insertMention = (item: MentionItem) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const cursor = textarea.selectionStart
    const beforeCursor = currentValue.slice(0, cursor)
    const triggerIndex = beforeCursor.lastIndexOf(triggerChar)
    const afterCursor = currentValue.slice(cursor)

    const nextValue =
      beforeCursor.slice(0, triggerIndex) +
      `${triggerChar}${item.label} ` +
      afterCursor

    if (!isControlled) setInternalValue(nextValue)
    onChange?.(nextValue)
    setIsPopoverOpen(false)

    setTimeout(() => {
      textarea.focus()
      const nextPos = triggerIndex + item.label.length + 2
      textarea.setSelectionRange(nextPos, nextPos)
    }, 10)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isPopoverOpen || filteredMentions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % filteredMentions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredMentions.length) % filteredMentions.length)
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      insertMention(filteredMentions[selectedIndex])
    } else if (e.key === 'Escape') {
      setIsPopoverOpen(false)
    }
  }

  return (
    <div className={cn('relative flex flex-col gap-1.5 w-full', className)}>
      {label && (
        <label className="text-xs font-semibold text-[var(--ink-primary)]">
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={currentValue}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          rows={3}
          className={cn(
            'w-full rounded-lg border border-[var(--outline-base)] bg-[var(--surface-base)] p-3 text-sm text-[var(--ink-primary)] outline-hidden transition-all focus:ring-2 focus:ring-[var(--brand-solid)] focus:border-transparent placeholder:text-[var(--ink-muted)] resize-y shadow-2xs leading-relaxed',
            error ? 'border-rose-500 focus:ring-rose-500' : '',
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          )}
          {...props}
        />

        {/* Mention Suggestions Floating Dropdown */}
        {isPopoverOpen && filteredMentions.length > 0 && (
          <div className="absolute left-3 bottom-full mb-1 w-64 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] p-1 shadow-lg z-30 max-h-48 overflow-y-auto flex flex-col gap-0.5 animate-in fade-in-0 duration-150">
            {filteredMentions.map((item, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => insertMention(item)}
                  className={cn(
                    'flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer w-full',
                    isSelected
                      ? 'bg-[var(--brand-subtle)] text-[var(--brand-solid)] font-semibold'
                      : 'hover:bg-[var(--surface-muted)] text-[var(--ink-primary)]'
                  )}
                >
                  <Avatar label={item.label} size="xs" />
                  <div className="flex flex-col min-w-0">
                    <span className="truncate">{item.label}</span>
                    {item.detail && (
                      <span className="text-[10px] text-[var(--ink-muted)] truncate font-normal">
                        {item.detail}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {description && !error && (
        <span className="text-[11px] text-[var(--ink-muted)]">{description}</span>
      )}
      {error && <span className="text-[11px] text-rose-500 font-medium">{error}</span>}
    </div>
  )
}
