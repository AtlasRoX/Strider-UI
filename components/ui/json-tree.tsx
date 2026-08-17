'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

export interface JsonTreeProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any
  defaultExpandDepth?: number
  showItemCount?: boolean
  rootName?: string
}

export function JsonTree({
  data,
  defaultExpandDepth = 2,
  showItemCount = true,
  rootName = 'root',
  className,
  ...props
}: JsonTreeProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      setCopied(true)
      toast.success('JSON copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy JSON')
    }
  }

  return (
    <div
      data-slot="json-tree"
      className={cn(
        'relative rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-muted)] p-4 font-mono text-xs shadow-2xs overflow-x-auto select-none',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--outline-base)]/40">
        <span className="font-bold text-[11px] text-[var(--ink-secondary)] uppercase tracking-wider">
          JSON Object Inspector
        </span>
        <button
          type="button"
          onClick={handleCopyAll}
          className="size-6 rounded-md hover:bg-[var(--surface-base)] border border-[var(--outline-base)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] cursor-pointer"
          title="Copy full JSON"
        >
          {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
        </button>
      </div>

      <JsonNode
        name={rootName}
        value={data}
        depth={0}
        maxDepth={defaultExpandDepth}
        showItemCount={showItemCount}
        isLast
      />
    </div>
  )
}

function JsonNode({
  name,
  value,
  depth,
  maxDepth,
  showItemCount,
  isLast,
}: {
  name?: string
  value: any
  depth: number
  maxDepth: number
  showItemCount: boolean
  isLast: boolean
}) {
  const [isExpanded, setIsExpanded] = React.useState(depth < maxDepth)

  const isObject = value !== null && typeof value === 'object'
  const isArray = Array.isArray(value)

  if (!isObject) {
    let valueColor = 'text-amber-600 dark:text-amber-400' // string
    let displayValue = `"${value}"`

    if (typeof value === 'number') {
      valueColor = 'text-blue-600 dark:text-blue-400 font-bold'
      displayValue = String(value)
    } else if (typeof value === 'boolean') {
      valueColor = 'text-violet-600 dark:text-violet-400 font-bold'
      displayValue = String(value)
    } else if (value === null) {
      valueColor = 'text-rose-600 dark:text-rose-400 font-bold'
      displayValue = 'null'
    }

    return (
      <div className="flex items-center gap-1 py-0.5 leading-relaxed pl-4">
        {name && <span className="text-[var(--ink-primary)] font-semibold">{name}:</span>}
        <span className={cn('select-text font-mono', valueColor)}>{displayValue}</span>
        {!isLast && <span className="text-[var(--ink-muted)]">,</span>}
      </div>
    )
  }

  const keys = Object.keys(value)
  const count = keys.length
  const bracketOpen = isArray ? '[' : '{'
  const bracketClose = isArray ? ']' : '}'

  return (
    <div className="flex flex-col py-0.5 leading-relaxed">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-sm px-1 -ml-1 cursor-pointer transition-colors w-fit"
      >
        <span className="text-[var(--ink-muted)]">
          {isExpanded ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
        </span>

        {name && <span className="text-[var(--ink-primary)] font-semibold">{name}:</span>}

        <span className="text-[var(--ink-secondary)] font-bold">{bracketOpen}</span>

        {!isExpanded && (
          <span className="text-[10px] text-[var(--ink-muted)] px-1 font-sans">
            ... {count} {count === 1 ? 'item' : 'items'} ...
          </span>
        )}

        {!isExpanded && <span className="text-[var(--ink-secondary)] font-bold">{bracketClose}</span>}
        {!isExpanded && !isLast && <span className="text-[var(--ink-muted)]">,</span>}

        {isExpanded && showItemCount && (
          <span className="text-[10px] text-[var(--ink-muted)] font-mono">
            // {count} {count === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {isExpanded && (
        <div className="pl-4 border-l border-[var(--outline-base)]/40 ml-1.5 flex flex-col">
          {keys.map((k, i) => (
            <JsonNode
              key={k}
              name={isArray ? undefined : k}
              value={value[k]}
              depth={depth + 1}
              maxDepth={maxDepth}
              showItemCount={showItemCount}
              isLast={i === keys.length - 1}
            />
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="pl-3">
          <span className="text-[var(--ink-secondary)] font-bold">{bracketClose}</span>
          {!isLast && <span className="text-[var(--ink-muted)]">,</span>}
        </div>
      )}
    </div>
  )
}
