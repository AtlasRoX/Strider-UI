'use client'

import * as React from 'react'
import { Check, X, Edit2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface EditableProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  onSubmit?: (value: string) => void
  onCancel?: () => void
  disabled?: boolean
  autoSelect?: boolean
  showControls?: boolean
  className?: string
  inputClassName?: string
  previewClassName?: string
}

/**
 * Editable
 * Click-to-edit inline text primitive with keyboard shortcuts (Enter to save, Esc to cancel).
 */
export function Editable({
  value: controlledValue,
  defaultValue = '',
  placeholder = 'Click to edit...',
  onSubmit,
  onCancel,
  disabled = false,
  autoSelect = true,
  showControls = true,
  className,
  inputClassName,
  previewClassName,
}: EditableProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [value, setValue] = React.useState(
    controlledValue !== undefined ? controlledValue : defaultValue
  )
  const [previousValue, setPreviousValue] = React.useState(value)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue)
    }
  }, [controlledValue])

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      if (autoSelect) {
        inputRef.current?.select()
      }
    }
  }, [isEditing, autoSelect])

  const handleStartEdit = () => {
    if (disabled) return
    setPreviousValue(value)
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    onSubmit?.(value)
  }

  const handleCancel = () => {
    setValue(previousValue)
    setIsEditing(false)
    onCancel?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  if (isEditing) {
    return (
      <div
        data-slot="editable-edit"
        className={cn('inline-flex items-center gap-1.5', className)}
      >
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={cn(
            'rounded-lg border border-[var(--brand-solid)] bg-[var(--surface-base)] px-2 py-1 text-xs font-semibold text-[var(--ink-primary)] outline-none ring-2 ring-[var(--brand-subtle)] transition-all',
            inputClassName
          )}
        />
        {showControls && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleSave}
              className="rounded p-1 text-[var(--emerald-solid)] hover:bg-[var(--emerald-subtle)] transition-colors cursor-pointer"
              aria-label="Save"
            >
              <Check className="size-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleCancel}
              className="rounded p-1 text-[var(--rose-solid)] hover:bg-[var(--rose-subtle)] transition-colors cursor-pointer"
              aria-label="Cancel"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      data-slot="editable-preview"
      tabIndex={disabled ? -1 : 0}
      role="button"
      onClick={handleStartEdit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleStartEdit()
        }
      }}
      className={cn(
        'group inline-flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-medium transition-colors outline-none cursor-pointer',
        !disabled && 'hover:bg-[var(--surface-muted)] focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)]',
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      <span className={cn('truncate', !value && 'text-[var(--ink-muted)] italic', previewClassName)}>
        {value || placeholder}
      </span>
      {!disabled && (
        <Edit2 className="size-3 text-[var(--ink-muted)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" />
      )}
    </div>
  )
}
