'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check, Copy, Terminal } from 'lucide-react'
import { toast } from 'sonner'

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

export interface SnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  command?: string
  packageCommands?: Partial<Record<PackageManager, string>>
  defaultManager?: PackageManager
  showPrefix?: boolean
  prefix?: string
}

export function Snippet({
  command = 'npm install @strider/ui',
  packageCommands,
  defaultManager = 'pnpm',
  showPrefix = true,
  prefix = '$',
  className,
  ...props
}: SnippetProps) {
  const [manager, setManager] = React.useState<PackageManager>(defaultManager)
  const [copied, setCopied] = React.useState(false)

  const activeCommand = packageCommands ? packageCommands[manager] || command : command

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCommand)
      setCopied(true)
      toast.success('Command copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy command')
    }
  }

  const managers: PackageManager[] = ['pnpm', 'npm', 'yarn', 'bun']

  return (
    <div
      data-slot="snippet"
      className={cn(
        'relative flex flex-col rounded-xl border border-[var(--outline-base)] bg-[var(--surface-muted)] overflow-hidden shadow-2xs font-mono text-xs',
        className
      )}
      {...props}
    >
      {/* Package Manager Tabs (if multi-manager provided) */}
      {packageCommands && (
        <div className="flex items-center gap-1 px-3 py-1.5 bg-[var(--surface-base)] border-b border-[var(--outline-base)] select-none">
          {managers.map((m) => {
            if (!packageCommands[m]) return null
            const isSelected = m === manager
            return (
              <button
                key={m}
                type="button"
                onClick={() => setManager(m)}
                className={cn(
                  'px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-[var(--brand-subtle)] text-[var(--brand-solid)] font-bold'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                )}
              >
                {m}
              </button>
            )
          })}
        </div>
      )}

      {/* Main Snippet Row */}
      <div className="flex items-center justify-between gap-3 p-3">
        <div className="flex items-center gap-2 overflow-x-auto min-w-0">
          {showPrefix && (
            <span className="text-[var(--ink-muted)] select-none font-bold">
              {prefix}
            </span>
          )}
          <span className="text-[var(--ink-primary)] select-all whitespace-pre">
            {activeCommand}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy snippet command"
          className="size-7 rounded-md bg-[var(--surface-base)] hover:bg-[var(--surface-muted)] border border-[var(--outline-base)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors shrink-0 cursor-pointer shadow-xs"
        >
          {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
        </button>
      </div>
    </div>
  )
}
