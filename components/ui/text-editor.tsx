'use client'

import * as React from 'react'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Eye,
  Edit3,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FormControl } from '@/components/ui/form-control'

export interface TextEditorProps {
  label?: string
  description?: string
  error?: string
  required?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  minHeight?: string
  disabled?: boolean
  className?: string
}

/**
 * TextEditor
 * Markdown / rich formatting text editor with interactive toolbar and live markdown preview.
 */
export function TextEditor({
  label,
  description,
  error,
  required,
  value: controlledValue,
  defaultValue = '',
  onChange,
  placeholder = 'Write content here (supports Markdown)...',
  minHeight = '180px',
  disabled = false,
  className,
}: TextEditorProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [isPreview, setIsPreview] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const text = isControlled ? controlledValue : internalValue

  const updateText = (next: string) => {
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
  }

  const applyFormatting = (prefix: string, suffix: string = '', defaultSelection = 'text') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const current = textarea.value
    const selection = current.substring(start, end) || defaultSelection

    const formatted = `${prefix}${selection}${suffix}`
    const nextText = current.substring(0, start) + formatted + current.substring(end)

    updateText(nextText)

    // Restore selection inside formatting
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selection.length
      )
    }, 10)
  }

  const insertAtCursor = (prefix: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const current = textarea.value
    const nextText = `${current.substring(0, start)}\n${prefix} ${current.substring(start)}`

    updateText(nextText)
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length + 2, start + prefix.length + 2)
    }, 10)
  }

  return (
    <FormControl
      label={label}
      description={description}
      error={error}
      required={required}
    >
      <div
        className={cn(
          'flex flex-col rounded-xl border border-[var(--outline-base)] bg-[var(--surface-input)] overflow-hidden transition-all focus-within:border-[var(--outline-focus)] focus-within:ring-2 focus-within:ring-[var(--outline-focus)]/20',
          disabled && 'opacity-50 pointer-events-none bg-[var(--surface-muted)]',
          className
        )}
      >
        {/* Editor Toolbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--outline-base)] bg-[var(--surface-muted)]/50 px-2 py-1.5 gap-1">
          <div className="flex flex-wrap items-center gap-0.5">
            <button
              type="button"
              title="Bold (Mod+B)"
              onClick={() => applyFormatting('**', '**', 'bold text')}
              className="p-1.5 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <Bold className="size-3.5" />
            </button>
            <button
              type="button"
              title="Italic (Mod+I)"
              onClick={() => applyFormatting('*', '*', 'italic text')}
              className="p-1.5 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <Italic className="size-3.5" />
            </button>
            <button
              type="button"
              title="Strikethrough"
              onClick={() => applyFormatting('~~', '~~', 'strikethrough')}
              className="p-1.5 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <Strikethrough className="size-3.5" />
            </button>
            <button
              type="button"
              title="Inline Code"
              onClick={() => applyFormatting('`', '`', 'code')}
              className="p-1.5 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <Code className="size-3.5" />
            </button>

            <div className="h-4 w-[1px] bg-[var(--outline-base)] mx-1" />

            <button
              type="button"
              title="Heading 1"
              onClick={() => insertAtCursor('#')}
              className="p-1.5 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <Heading1 className="size-3.5" />
            </button>
            <button
              type="button"
              title="Heading 2"
              onClick={() => insertAtCursor('##')}
              className="p-1.5 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <Heading2 className="size-3.5" />
            </button>
            <button
              type="button"
              title="Bullet List"
              onClick={() => insertAtCursor('-')}
              className="p-1.5 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <List className="size-3.5" />
            </button>
            <button
              type="button"
              title="Numbered List"
              onClick={() => insertAtCursor('1.')}
              className="p-1.5 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <ListOrdered className="size-3.5" />
            </button>
            <button
              type="button"
              title="Quote"
              onClick={() => insertAtCursor('>')}
              className="p-1.5 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <Quote className="size-3.5" />
            </button>
            <button
              type="button"
              title="Insert Link"
              onClick={() => applyFormatting('[', '](https://example.com)', 'link title')}
              className="p-1.5 rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors"
            >
              <LinkIcon className="size-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              size="xs"
              variant={isPreview ? 'solid' : 'ghost'}
              theme={isPreview ? 'brand' : 'gray'}
              onClick={() => setIsPreview(!isPreview)}
              prefix={isPreview ? <Edit3 className="size-3" /> : <Eye className="size-3" />}
            >
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>

        {/* Editor Body or Live Preview */}
        {isPreview ? (
          <div
            style={{ minHeight }}
            className="p-4 text-xs text-[var(--ink-primary)] leading-relaxed bg-[var(--surface-base)] prose prose-sm max-w-none overflow-y-auto"
          >
            {text ? (
              <div className="whitespace-pre-wrap font-sans">{text}</div>
            ) : (
              <span className="text-[var(--ink-muted)] italic">No content to preview.</span>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => updateText(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            style={{ minHeight }}
            className="w-full resize-y bg-transparent p-3 text-xs text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] outline-none font-mono"
          />
        )}
      </div>
    </FormControl>
  )
}

export const Editor = TextEditor
