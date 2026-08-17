'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Zap, Search, ArrowDown } from 'lucide-react'

export interface VirtualListItem {
  id: string
  title: string
  subtitle?: string
  badge?: string
  status?: string
}

export interface VirtualListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: VirtualListItem[]
  itemHeight?: number
  containerHeight?: number
  renderItem?: (item: VirtualListItem, index: number) => React.ReactNode
}

// Generate default 1,000 records
const GENERATED_ITEMS: VirtualListItem[] = Array.from({ length: 1000 }).map((_, i) => ({
  id: `log-${i + 1}`,
  title: `Edge Request Payload #${i + 1042}`,
  subtitle: `Node us-east-1 · latency: ${(Math.random() * 80 + 10).toFixed(1)}ms · status: 200 OK`,
  badge: i % 7 === 0 ? 'WARN' : 'INFO',
  status: 'active',
}))

export function VirtualList({
  items = GENERATED_ITEMS,
  itemHeight = 44,
  containerHeight = 320,
  renderItem,
  className,
  ...props
}: VirtualListProps) {
  const [scrollTop, setScrollTop] = React.useState(0)
  const [search, setSearch] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)

  const filteredItems = React.useMemo(() => {
    if (!search.trim()) return items
    const q = search.toLowerCase()
    return items.filter((item) => item.title.toLowerCase().includes(q) || item.subtitle?.toLowerCase().includes(q))
  }, [items, search])

  const totalHeight = filteredItems.length * itemHeight

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  // Calculate visible range + overscan buffer of 5 items
  const overscan = 5
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const visibleCount = Math.ceil(containerHeight / itemHeight) + 2 * overscan
  const endIndex = Math.min(filteredItems.length, startIndex + visibleCount)

  const visibleItems = filteredItems.slice(startIndex, endIndex)
  const offsetY = startIndex * itemHeight

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = totalHeight
    }
  }

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

  return (
    <div
      data-slot="virtual-list"
      className={cn(
        'flex flex-col gap-3 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none',
        className
      )}
      {...props}
    >
      {/* Header with Search & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold">
            <Zap className="size-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--ink-primary)]">Virtual Scroll Engine</h4>
            <span className="text-[11px] text-[var(--ink-muted)]">
              Rendering {filteredItems.length.toLocaleString()} items at 60 FPS
            </span>
          </div>
        </div>

        {/* Quick Search and Jump Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-[var(--ink-muted)]" />
            <input
              type="text"
              placeholder="Search 1,000+ items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-7 pl-7 pr-2.5 text-xs rounded-lg border border-[var(--outline-base)] bg-[var(--surface-base)] text-[var(--ink-primary)] outline-hidden focus:border-[var(--brand-solid)] w-44"
            />
          </div>

          <button
            type="button"
            onClick={scrollToBottom}
            className="size-7 rounded-lg border border-[var(--outline-base)] bg-[var(--surface-base)] hover:bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
            title="Scroll to bottom"
          >
            <ArrowDown className="size-3" />
          </button>
        </div>
      </div>

      {/* Virtual Viewport Container */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        style={{ height: containerHeight }}
        className="relative overflow-y-auto rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-base)] shadow-inner divide-y divide-[var(--outline-base)]/30"
      >
        {/* Full scroll canvas */}
        <div style={{ height: totalHeight, position: 'relative' }}>
          {/* Virtual slice offset container */}
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map((item, idx) => {
              const actualIndex = startIndex + idx

              if (renderItem) return renderItem(item, actualIndex)

              return (
                <div
                  key={item.id}
                  style={{ height: itemHeight }}
                  className="flex items-center justify-between px-3.5 hover:bg-[var(--surface-muted)]/50 transition-colors border-b border-[var(--outline-base)]/20 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-[10px] text-[var(--ink-muted)] w-10 shrink-0">
                      #{actualIndex + 1}
                    </span>
                    <span className="font-semibold text-[var(--ink-primary)] truncate">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[var(--ink-muted)] truncate hidden md:inline">
                      {item.subtitle}
                    </span>
                  </div>

                  {item.badge && (
                    <Badge
                      variant="subtle"
                      theme={item.badge === 'WARN' ? 'amber' : 'brand'}
                      size="sm"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
