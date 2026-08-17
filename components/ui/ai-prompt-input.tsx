'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  ArrowUp,
  Square,
  Paperclip,
  Mic,
  Bot,
  X,
  FileText,
  Image as ImageIcon,
  ChevronDown,
} from 'lucide-react'

export interface PromptAttachment {
  id: string
  name: string
  size?: string
  type: 'image' | 'file'
  url?: string
}

export interface AiPromptInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'defaultValue' | 'onChange' | 'onSubmit'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSubmit?: (prompt: string, attachments: PromptAttachment[]) => void
  onStop?: () => void
  isStreaming?: boolean
  modelName?: string
  onModelClick?: () => void
  tokenCount?: number
  maxTokens?: number
  placeholder?: string
  attachments?: PromptAttachment[]
  onAttachmentsChange?: (attachments: PromptAttachment[]) => void
  allowAttachments?: boolean
  allowVoice?: boolean
}

export function AiPromptInput({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSubmit,
  onStop,
  isStreaming = false,
  modelName = 'Strider AI',
  onModelClick,
  tokenCount,
  maxTokens = 8192,
  placeholder = 'Ask anything or paste images, code, or documents...',
  attachments = [],
  onAttachmentsChange,
  allowAttachments = true,
  allowVoice = true,
  disabled = false,
  className,
  ...props
}: AiPromptInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [internalAttachments, setInternalAttachments] = React.useState<PromptAttachment[]>(attachments)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue
  const activeAttachments = onAttachmentsChange ? attachments : internalAttachments

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (!isControlled) setInternalValue(text)
    onChange?.(text)

    // Auto-grow height up to 220px
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(220, textareaRef.current.scrollHeight)}px`
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSend = () => {
    if (isStreaming) {
      onStop?.()
      return
    }
    if (!currentValue.trim() && activeAttachments.length === 0) return
    onSubmit?.(currentValue, activeAttachments)
    if (!isControlled) setInternalValue('')
    if (onAttachmentsChange) {
      onAttachmentsChange([])
    } else {
      setInternalAttachments([])
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newItems: PromptAttachment[] = Array.from(files).map((f) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: f.name,
      size: `${(f.size / 1024).toFixed(0)} KB`,
      type: f.type.startsWith('image/') ? 'image' : 'file',
      url: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
    }))

    const updated = [...activeAttachments, ...newItems]
    if (onAttachmentsChange) {
      onAttachmentsChange(updated)
    } else {
      setInternalAttachments(updated)
    }
    e.target.value = ''
  }

  const removeAttachment = (id: string) => {
    const updated = activeAttachments.filter((a) => a.id !== id)
    if (onAttachmentsChange) {
      onAttachmentsChange(updated)
    } else {
      setInternalAttachments(updated)
    }
  }

  const calculatedTokens = tokenCount ?? Math.max(0, Math.round(currentValue.length / 4))

  return (
    <div
      data-slot="ai-prompt-input"
      className={cn(
        'relative flex flex-col rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)] p-3 shadow-md transition-all focus-within:border-[var(--brand-solid)] focus-within:ring-2 focus-within:ring-[var(--brand-solid)]/20',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
    >
      {/* Top Attachment Chips */}
      {activeAttachments.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pb-2 mb-2 border-b border-[var(--outline-base)]/40">
          {activeAttachments.map((att) => (
            <div
              key={att.id}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--surface-muted)] border border-[var(--outline-base)] text-xs text-[var(--ink-primary)] animate-in fade-in-0 duration-150"
            >
              {att.type === 'image' ? (
                <ImageIcon className="size-3 text-[var(--brand-solid)]" />
              ) : (
                <FileText className="size-3 text-[var(--ink-secondary)]" />
              )}
              <span className="max-w-[140px] truncate font-medium">{att.name}</span>
              {att.size && <span className="text-[10px] text-[var(--ink-muted)]">({att.size})</span>}
              <button
                type="button"
                onClick={() => removeAttachment(att.id)}
                className="size-4 rounded hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center text-[var(--ink-muted)] hover:text-rose-500 cursor-pointer ml-1"
                aria-label="Remove attachment"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Textarea */}
      <textarea
        ref={textareaRef}
        value={currentValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={1}
        className="w-full resize-none border-none bg-transparent px-1 text-sm text-[var(--ink-primary)] outline-hidden placeholder:text-[var(--ink-muted)] min-h-[44px] max-h-[220px] leading-relaxed"
        {...props}
      />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Bottom Action & Status Bar */}
      <div className="flex items-center justify-between gap-2 pt-2 mt-1 border-t border-[var(--outline-base)]/40 select-none">
        <div className="flex items-center gap-1.5">
          {/* Model Selector Pill */}
          {modelName && (
            <button
              type="button"
              onClick={onModelClick}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-[var(--brand-subtle)] text-[var(--brand-solid)] hover:opacity-85 transition-opacity cursor-pointer"
            >
              <Bot className="size-3" />
              <span>{modelName}</span>
              {onModelClick && <ChevronDown className="size-3" />}
            </button>
          )}

          {/* Attach Button */}
          {allowAttachments && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
              title="Attach files or images"
              aria-label="Attach files"
            >
              <Paperclip className="size-4" />
            </button>
          )}

          {/* Voice Input Button */}
          {allowVoice && (
            <button
              type="button"
              className="p-1.5 rounded-lg text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
              title="Voice dictation"
              aria-label="Voice input"
            >
              <Mic className="size-4" />
            </button>
          )}
        </div>

        {/* Token Count & Send/Stop Button */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-[var(--ink-muted)]">
            {calculatedTokens} / {maxTokens} tokens
          </span>

          <button
            type="button"
            onClick={handleSend}
            disabled={(!currentValue.trim() && activeAttachments.length === 0 && !isStreaming) || disabled}
            className={cn(
              'size-8 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs',
              isStreaming
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-[var(--brand-solid)] text-white hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed'
            )}
            aria-label={isStreaming ? 'Stop generating' : 'Send message'}
          >
            {isStreaming ? (
              <Square className="size-3.5 fill-white" />
            ) : (
              <ArrowUp className="size-4 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
