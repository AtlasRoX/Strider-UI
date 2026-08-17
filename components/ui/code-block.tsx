'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check, Copy, ChevronDown, ChevronUp } from 'lucide-react'
import { toast } from 'sonner'

export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  collapsible?: boolean
  defaultCollapsed?: boolean
  maxHeight?: string
}

export function CodeBlock({
  code = '',
  language = 'typescript',
  filename,
  showLineNumbers = true,
  collapsible = false,
  defaultCollapsed = false,
  maxHeight = '400px',
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success('Code copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy code')
    }
  }

  const lines = code.trim().split('\n')
  const hasHeader = Boolean(filename || language || collapsible)

  return (
    <div
      data-slot="code-block"
      className={cn(
        'relative rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)] overflow-hidden font-mono text-xs shadow-2xs group',
        className
      )}
      {...props}
    >
      {/* Header bar */}
      {hasHeader && (
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--surface-base)] border-b border-[var(--outline-base)] select-none">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
            {filename && (
              <span className="ml-2 font-sans font-medium text-[var(--ink-secondary)] text-xs">
                {filename}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {language && (
              <span className="text-[10px] uppercase font-semibold text-[var(--ink-muted)] bg-[var(--surface-muted)] px-2 py-0.5 rounded">
                {language}
              </span>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="size-6 rounded-md hover:bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors cursor-pointer"
              aria-label="Copy code"
            >
              {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
            </button>

            {collapsible && (
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="size-6 hover:bg-[var(--surface-muted)] rounded flex items-center justify-center text-[var(--ink-secondary)] cursor-pointer"
                aria-label="Toggle code collapse"
              >
                {isCollapsed ? (
                  <ChevronDown className="size-3.5" />
                ) : (
                  <ChevronUp className="size-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Copy button only if no header */}
      {!hasHeader && (
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 z-10 size-7 rounded-md bg-[var(--surface-base)]/80 hover:bg-[var(--surface-base)] border border-[var(--outline-base)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-xs"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
        </button>
      )}

      {/* Code contents */}
      {!isCollapsed && (
        <div
          className="overflow-auto p-4 text-[var(--ink-primary)] leading-relaxed"
          style={{ maxHeight }}
        >
          <pre className="flex">
            {showLineNumbers && (
              <div
                className="flex flex-col select-none pr-4 text-right text-[var(--ink-muted)] border-r border-[var(--outline-base)]/40 shrink-0"
                aria-hidden="true"
              >
                {lines.map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
            )}
            <code className={cn('block flex-1', showLineNumbers ? 'pl-4' : '')}>
              {lines.map((line, idx) => (
                <div key={idx} className="whitespace-pre">
                  {line || ' '}
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}
