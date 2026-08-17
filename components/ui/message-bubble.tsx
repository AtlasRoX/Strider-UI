'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import {
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Bot,
  ChevronDown,
  ChevronUp,
  Brain,
} from 'lucide-react'
import { toast } from 'sonner'

export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role: 'user' | 'assistant' | 'system'
  content: string
  reasoning?: string
  model?: string
  systemName?: string
  timestamp?: string
  avatar?: string
  userName?: string
  isStreaming?: boolean
  onRegenerate?: () => void
  onFeedback?: (type: 'up' | 'down') => void
}

export function MessageBubble({
  role,
  content,
  reasoning,
  model,
  systemName = 'Strider AI',
  timestamp,
  avatar,
  userName = 'User',
  isStreaming = false,
  onRegenerate,
  onFeedback,
  className,
  ...props
}: MessageBubbleProps) {
  const [copied, setCopied] = React.useState(false)
  const [feedback, setFeedback] = React.useState<'up' | 'down' | null>(null)
  const [isReasoningOpen, setIsReasoningOpen] = React.useState(true)

  const isAssistant = role === 'assistant'
  const isUser = role === 'user'
  const displayName = isAssistant ? (model ?? systemName) : userName

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      toast.success('Message copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy message')
    }
  }

  const handleThumbs = (type: 'up' | 'down') => {
    const next = feedback === type ? null : type
    setFeedback(next)
    if (next) onFeedback?.(next)
  }

  return (
    <div
      data-slot="message-bubble"
      data-role={role}
      className={cn(
        'flex gap-3 w-full max-w-3xl group',
        isUser ? 'flex-row-reverse ml-auto' : 'mr-auto',
        className
      )}
      {...props}
    >
      {/* Avatar Icon */}
      <div className="shrink-0 pt-0.5">
        {isAssistant ? (
          <div className="size-8 rounded-xl bg-gradient-to-tr from-[var(--brand-solid)] to-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Bot className="size-4.5" />
          </div>
        ) : (
          <Avatar label={userName} size="sm" />
        )}
      </div>

      {/* Main Message Content */}
      <div className={cn('flex flex-col gap-1.5 min-w-0 max-w-[85%]', isUser ? 'items-end' : 'items-start')}>
        {/* Author Header */}
        <div className="flex items-center gap-2 text-xs text-[var(--ink-muted)]">
          <span className="font-semibold text-[var(--ink-primary)]">
            {displayName}
          </span>
          {timestamp && <span className="text-[10px]">{timestamp}</span>}
        </div>

        {/* Thought / Reasoning Stream Block */}
        {reasoning && (
          <div className="w-full rounded-2xl border-l-2 border-l-[var(--brand-solid)] border-y border-r border-[var(--outline-base)] bg-[var(--surface-muted)]/40 overflow-hidden text-xs my-1">
            <button
              type="button"
              onClick={() => setIsReasoningOpen(!isReasoningOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-left font-medium text-[var(--ink-secondary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 text-[var(--brand-solid)]">
                <Brain className="size-3.5" />
                <span className="text-xs font-semibold">Thought Process</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[var(--ink-muted)]">
                <span>{isReasoningOpen ? 'Hide' : 'Show'}</span>
                {isReasoningOpen ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
              </div>
            </button>

            {isReasoningOpen && (
              <div className="px-3.5 pb-3 pt-1 text-[11px] text-[var(--ink-muted)] font-mono leading-relaxed whitespace-pre-wrap border-t border-[var(--outline-base)]/30">
                {reasoning}
              </div>
            )}
          </div>
        )}

        {/* Message Bubble Body */}
        <div
          className={cn(
            'p-3.5 rounded-2xl text-sm leading-relaxed shadow-2xs whitespace-pre-wrap break-words',
            isUser
              ? 'bg-[var(--brand-solid)] text-white rounded-tr-xs'
              : 'bg-[var(--surface-card)] border border-[var(--outline-base)] text-[var(--ink-primary)] rounded-tl-xs'
          )}
        >
          {content}
          {isStreaming && (
            <span className="inline-block size-2 rounded-full bg-[var(--brand-solid)] animate-pulse ml-1 align-middle" />
          )}
        </div>

        {/* Action Footer (Copy, Feedback, Regenerate) */}
        {isAssistant && !isStreaming && (
          <div className="flex items-center gap-1 pt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleCopy}
              className="size-7 rounded-md hover:bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-colors cursor-pointer"
              title="Copy text"
              aria-label="Copy text"
            >
              {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            </button>

            <button
              type="button"
              onClick={() => handleThumbs('up')}
              className={cn(
                'size-7 rounded-md hover:bg-[var(--surface-muted)] flex items-center justify-center transition-colors cursor-pointer',
                feedback === 'up'
                  ? 'text-emerald-500 bg-emerald-500/10'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
              )}
              title="Good response"
              aria-label="Thumbs up"
            >
              <ThumbsUp className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={() => handleThumbs('down')}
              className={cn(
                'size-7 rounded-md hover:bg-[var(--surface-muted)] flex items-center justify-center transition-colors cursor-pointer',
                feedback === 'down'
                  ? 'text-rose-500 bg-rose-500/10'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
              )}
              title="Bad response"
              aria-label="Thumbs down"
            >
              <ThumbsDown className="size-3.5" />
            </button>

            {onRegenerate && (
              <button
                type="button"
                onClick={onRegenerate}
                className="size-7 rounded-md hover:bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-colors cursor-pointer"
                title="Regenerate response"
                aria-label="Regenerate response"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
