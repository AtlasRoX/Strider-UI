'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Bold,
  Italic,
  Heading2,
  Code,
  List,
  Quote,
  Link as LinkIcon,
  Eye,
  Edit3,
  Columns,
} from 'lucide-react'

export interface MarkdownEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (val: string) => void
}

const DEFAULT_MD = `## Release Notes v2.4.0

### Highlights
- Added **20 new enterprise components** to Strider UI.
- Standardized all dropdown triggers with *Radix UI Select* primitives.
- Integrated OKLCH theme engine with strict 2-axis color contracts.

> "The unified developer console is now 100% production ready."

\`\`\`ts
import { Button, Badge } from '@strider/ui'
\`\`\`
`

export function MarkdownEditor({
  value: controlledValue,
  defaultValue = DEFAULT_MD,
  onChange,
  className,
  ...props
}: MarkdownEditorProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const [mode, setMode] = React.useState<'split' | 'write' | 'preview'>('split')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const isControlled = controlledValue !== undefined
  const content = isControlled ? controlledValue : internalValue

  const handleInput = (val: string) => {
    if (!isControlled) setInternalValue(val)
    onChange?.(val)
  }

  const insertSnippet = (prefix: string, suffix = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.substring(start, end)
    const replacement = `${prefix}${selected || 'text'}${suffix}`
    const newContent = content.substring(0, start) + replacement + content.substring(end)

    handleInput(newContent)
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 4))
    }, 10)
  }

  // Simple parser for demonstration preview
  const renderSimpleMarkdown = (md: string) => {
    const lines = md.split('\n')
    return lines.map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-base font-bold text-[var(--ink-primary)] my-1">{line.replace('## ', '')}</h2>
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-sm font-semibold text-[var(--ink-primary)] my-1">{line.replace('### ', '')}</h3>
      }
      if (line.startsWith('> ')) {
        return (
          <blockquote key={i} className="border-l-2 border-[var(--brand-solid)] pl-3 my-1 italic text-[var(--ink-secondary)] bg-[var(--surface-muted)]/40 py-1 rounded-r">
            {line.replace('> ', '')}
          </blockquote>
        )
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="ml-4 list-disc text-xs text-[var(--ink-secondary)]">{line.replace('- ', '')}</li>
      }
      if (line.startsWith('```')) {
        return null
      }
      if (!line.trim()) return <div key={i} className="h-2" />
      return <p key={i} className="text-xs text-[var(--ink-secondary)] leading-relaxed">{line}</p>
    })
  }

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0

  return (
    <div
      data-slot="markdown-editor"
      className={cn(
        'flex flex-col rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Top Formatting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[var(--surface-muted)] border-b border-[var(--outline-base)] text-xs">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => insertSnippet('**', '**')}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-base)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
            title="Bold"
          >
            <Bold className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('*', '*')}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-base)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
            title="Italic"
          >
            <Italic className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('### ')}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-base)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
            title="Heading"
          >
            <Heading2 className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('`', '`')}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-base)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
            title="Code"
          >
            <Code className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('- ')}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-base)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
            title="List"
          >
            <List className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('> ')}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-base)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
            title="Quote"
          >
            <Quote className="size-3.5" />
          </button>
        </div>

        {/* Mode Switcher & Stats */}
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[10px] font-mono text-[var(--ink-muted)] hidden sm:inline">
            {wordCount} words · {content.length} chars
          </span>

          <div className="flex items-center gap-0.5 bg-[var(--surface-base)] p-0.5 rounded-lg border border-[var(--outline-base)]">
            <button
              type="button"
              onClick={() => setMode('write')}
              className={cn(
                'px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer',
                mode === 'write' ? 'bg-[var(--brand-solid)] text-white' : 'text-[var(--ink-muted)]'
              )}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setMode('split')}
              className={cn(
                'px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer',
                mode === 'split' ? 'bg-[var(--brand-solid)] text-white' : 'text-[var(--ink-muted)]'
              )}
            >
              Split
            </button>
            <button
              type="button"
              onClick={() => setMode('preview')}
              className={cn(
                'px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer',
                mode === 'preview' ? 'bg-[var(--brand-solid)] text-white' : 'text-[var(--ink-muted)]'
              )}
            >
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Editor & Preview Panes */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--outline-base)] min-h-[220px]">
        {(mode === 'write' || mode === 'split') && (
          <div className="p-3 bg-[var(--surface-base)]">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="Write markdown here..."
              rows={8}
              className="w-full h-full min-h-[200px] bg-transparent border-none outline-hidden font-mono text-xs text-[var(--ink-primary)] resize-none leading-relaxed"
            />
          </div>
        )}

        {(mode === 'preview' || mode === 'split') && (
          <div className="p-4 bg-[var(--surface-muted)]/30 overflow-y-auto max-h-[300px]">
            {renderSimpleMarkdown(content)}
          </div>
        )}
      </div>
    </div>
  )
}
