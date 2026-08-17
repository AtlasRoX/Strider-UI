'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Search,
  Command,
  ArrowRight,
  FileText,
  Settings,
  Users,
  Key,
  Shield,
  Zap,
  Clock,
} from 'lucide-react'
import { toast } from 'sonner'

export interface OmniItem {
  id: string
  title: string
  subtitle?: string
  category: 'Pages' | 'Actions' | 'Security' | 'Documentation'
  icon?: string
  shortcut?: string
}

export interface OmniSearchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items?: OmniItem[]
  onSelect?: (item: OmniItem) => void
}

const DEFAULT_OMNI_ITEMS: OmniItem[] = [
  { id: '1', title: 'Developer Console & API Tokens', subtitle: 'Manage machine secret credentials', category: 'Pages', shortcut: 'G P' },
  { id: '2', title: 'Deploy New Edge Worker', subtitle: 'Trigger production pipeline', category: 'Actions', shortcut: '⌘ D' },
  { id: '3', title: 'Revoke Inactive User Sessions', subtitle: 'Security compliance check', category: 'Security', shortcut: '⌘ R' },
  { id: '4', title: 'OKLCH Design System Tokens Guide', subtitle: 'Reference documentation', category: 'Documentation', shortcut: '?' },
  { id: '5', title: 'Audit Trail Logs', subtitle: 'SOC2 privileged immutable feed', category: 'Pages' },
]

export function OmniSearch({
  items = DEFAULT_OMNI_ITEMS,
  onSelect,
  className,
  ...props
}: OmniSearchProps) {
  const [query, setQuery] = React.useState('')
  const [activeCategory, setActiveCategory] = React.useState<string>('All')

  const filteredItems = React.useMemo(() => {
    let result = items
    if (activeCategory !== 'All') {
      result = result.filter((i) => i.category === activeCategory)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter((i) => i.title.toLowerCase().includes(q) || i.subtitle?.toLowerCase().includes(q))
    }
    return result
  }, [items, query, activeCategory])

  const categories = ['All', 'Pages', 'Actions', 'Security', 'Documentation']

  const handleItemClick = (item: OmniItem) => {
    onSelect?.(item)
    toast.success(`Action executed: "${item.title}"`)
  }

  return (
    <div
      data-slot="omni-search"
      className={cn(
        'flex flex-col rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-lg select-none overflow-hidden text-xs',
        className
      )}
      {...props}
    >
      {/* Search Input Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[var(--surface-base)] border-b border-[var(--outline-base)]">
        <Search className="size-4 text-[var(--brand-solid)] shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages, trigger actions, or type > for commands..."
          className="flex-1 bg-transparent border-none outline-hidden text-xs text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
        />
        <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--ink-muted)] bg-[var(--surface-muted)] px-2 py-0.5 rounded-md border border-[var(--outline-base)]">
          <Command className="size-2.5" /> K
        </div>
      </div>

      {/* Filter Category Chips */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-[var(--surface-muted)]/40 border-b border-[var(--outline-base)]/40 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer border',
              activeCategory === cat
                ? 'bg-[var(--brand-solid)] text-white border-[var(--brand-solid)] shadow-2xs'
                : 'bg-[var(--surface-base)] text-[var(--ink-secondary)] border-[var(--outline-base)] hover:bg-[var(--surface-muted)]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="flex flex-col p-2 max-h-[260px] overflow-y-auto divide-y divide-[var(--outline-base)]/20">
        {filteredItems.length === 0 ? (
          <div className="py-8 text-center text-xs text-[var(--ink-muted)]">
            No matching actions or pages found for &quot;{query}&quot;
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--brand-subtle)]/30 hover:text-[var(--brand-solid)] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-7 rounded-lg bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-muted)] group-hover:text-[var(--brand-solid)]">
                  {item.category === 'Security' ? (
                    <Shield className="size-3.5" />
                  ) : item.category === 'Actions' ? (
                    <Zap className="size-3.5" />
                  ) : item.category === 'Documentation' ? (
                    <FileText className="size-3.5" />
                  ) : (
                    <ArrowRight className="size-3.5" />
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-[var(--ink-primary)] truncate">{item.title}</span>
                  <span className="text-[10px] text-[var(--ink-muted)] truncate">{item.subtitle}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px]">
                <Badge variant="subtle" theme="gray" size="sm">
                  {item.category}
                </Badge>
                {item.shortcut && (
                  <span className="px-1.5 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--ink-muted)] border border-[var(--outline-base)]">
                    {item.shortcut}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
