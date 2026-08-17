'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Kbd } from '@/components/ui/kbd'
import { Command } from 'lucide-react'

export interface ShortcutItem {
  id: string
  description: string
  keys: string[]
  category?: string
}

export interface KbdShortcutListProps extends React.HTMLAttributes<HTMLDivElement> {
  groups: {
    category: string
    shortcuts: ShortcutItem[]
  }[]
  title?: string
}

export function KbdShortcutList({
  groups = [],
  title,
  className,
  ...props
}: KbdShortcutListProps) {
  return (
    <div
      data-slot="kbd-shortcut-list"
      className={cn(
        'flex flex-col gap-6 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-xs select-none w-full max-w-2xl',
        className
      )}
      {...props}
    >
      {title && (
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--outline-base)]/40 text-xs font-bold text-[var(--ink-primary)]">
          <Command className="size-4 text-[var(--brand-solid)]" />
          <span>{title}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {groups.map((group) => (
          <div key={group.category} className="flex flex-col gap-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)] font-mono">
              {group.category}
            </span>

            <div className="flex flex-col gap-1.5">
              {group.shortcuts.map((sc) => (
                <div
                  key={sc.id}
                  className="flex items-center justify-between gap-3 p-2 rounded-xl bg-[var(--surface-muted)]/50 border border-[var(--outline-base)]/40 hover:bg-[var(--surface-muted)] transition-colors text-xs"
                >
                  <span className="text-[var(--ink-primary)] font-medium truncate">
                    {sc.description}
                  </span>

                  <div className="flex items-center gap-1 shrink-0">
                    {sc.keys.map((k, kIdx) => (
                      <Kbd key={kIdx} size="sm">
                        {k}
                      </Kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
