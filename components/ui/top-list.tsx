'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Trophy, Medal, Crown } from 'lucide-react'

export interface TopListItem {
  id: string
  title: string
  subtitle?: string
  value: number | string
  numericValue?: number
  avatar?: string
  badge?: string
}

export interface TopListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TopListItem[]
  title?: string
  showProgress?: boolean
  showMedals?: boolean
  maxValue?: number
  onItemClick?: (item: TopListItem, rank: number) => void
}

export function TopList({
  items = [],
  title,
  showProgress = true,
  showMedals = true,
  maxValue: explicitMax,
  onItemClick,
  className,
  ...props
}: TopListProps) {
  const calculatedMax = React.useMemo(() => {
    if (explicitMax) return explicitMax
    const vals = items.map((i) => (typeof i.value === 'number' ? i.value : i.numericValue ?? 0))
    return Math.max(...vals, 1)
  }, [items, explicitMax])

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="size-5 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-[10px] shadow-xs">
          1
        </span>
      )
    }
    if (rank === 2) {
      return (
        <span className="size-5 rounded-full bg-slate-300 text-slate-900 flex items-center justify-center font-bold text-[10px] shadow-xs">
          2
        </span>
      )
    }
    if (rank === 3) {
      return (
        <span className="size-5 rounded-full bg-amber-700/60 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
          3
        </span>
      )
    }
    return (
      <span className="size-5 rounded-full bg-[var(--surface-muted)] text-[var(--ink-muted)] flex items-center justify-center font-bold text-[10px] font-mono">
        {rank}
      </span>
    )
  }

  return (
    <div
      data-slot="top-list"
      className={cn('flex flex-col gap-2.5 w-full select-none', className)}
      {...props}
    >
      {title && (
        <div className="flex items-center justify-between pb-1 border-b border-[var(--outline-base)]/40 text-xs font-bold text-[var(--ink-primary)]">
          <span>{title}</span>
          <span className="text-[10px] text-[var(--ink-muted)] font-mono">Rankings</span>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        {items.map((item, idx) => {
          const rank = idx + 1
          const rawNum = typeof item.value === 'number' ? item.value : item.numericValue ?? 0
          const percent = Math.max(8, Math.min(100, (rawNum / calculatedMax) * 100))

          return (
            <div
              key={item.id || idx}
              onClick={() => onItemClick?.(item, rank)}
              className={cn(
                'group relative flex flex-col gap-1.5 p-2.5 rounded-xl border border-[var(--outline-base)]/60 bg-[var(--surface-card)] hover:border-[var(--brand-solid)] hover:shadow-xs transition-all overflow-hidden',
                onItemClick ? 'cursor-pointer' : ''
              )}
            >
              {/* Top Row: Rank + Avatar + Name + Value */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  {showMedals ? getRankBadge(rank) : <span className="font-mono text-xs">{rank}.</span>}
                  <Avatar label={item.title} size="xs" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-[var(--ink-primary)] truncate">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-[10px] text-[var(--ink-muted)] truncate">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--brand-subtle)] text-[var(--brand-solid)] font-semibold">
                      {item.badge}
                    </span>
                  )}
                  <span className="font-mono font-bold text-xs text-[var(--ink-primary)] tabular-nums">
                    {item.value}
                  </span>
                </div>
              </div>

              {/* Optional Progress Track */}
              {showProgress && (
                <div className="relative h-1.5 w-full rounded-full bg-[var(--surface-muted)] overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      rank === 1
                        ? 'bg-amber-500'
                        : rank === 2
                        ? 'bg-[var(--brand-solid)]'
                        : 'bg-[var(--emerald-solid,#10b981)]'
                    )}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
