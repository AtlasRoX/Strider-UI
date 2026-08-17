'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface TreemapNode {
  name: string
  value: number
  category?: string
  color?: string
  theme?: ThemeColor
  children?: TreemapNode[]
}

export interface TreemapProps extends React.HTMLAttributes<HTMLDivElement> {
  data: TreemapNode[]
  theme?: ThemeColor
  valueFormatter?: (value: number) => string
  height?: number | string
  onNodeClick?: (node: TreemapNode) => void
}

export function Treemap({
  data = [],
  theme = 'brand',
  valueFormatter = (val) => val.toLocaleString(),
  height = 240,
  onNodeClick,
  className,
  ...props
}: TreemapProps) {
  const [hoveredNode, setHoveredNode] = React.useState<TreemapNode | null>(null)

  const totalValue = React.useMemo(() => {
    return data.reduce((sum, item) => sum + item.value, 0) || 1
  }, [data])

  const palette: ThemeColor[] = ['brand', 'violet', 'emerald', 'amber', 'blue', 'rose', 'gray']

  return (
    <div
      data-slot="treemap"
      className={cn('flex flex-wrap gap-2 w-full rounded-2xl overflow-hidden p-1 select-none', className)}
      style={{ height }}
      {...props}
    >
      {data.map((item, idx) => {
        const percentage = Math.max(10, (item.value / totalValue) * 100)
        const nodeTheme = item.theme || palette[idx % palette.length]
        const resolvedColor = item.color || `var(--${nodeTheme}-solid, #3b82f6)`

        return (
          <div
            key={item.name + idx}
            onClick={() => onNodeClick?.(item)}
            onMouseEnter={() => setHoveredNode(item)}
            onMouseLeave={() => setHoveredNode(null)}
            className={cn(
              'group relative flex flex-col justify-between p-3.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] transition-all duration-200 hover:shadow-md hover:border-[var(--brand-solid)] overflow-hidden',
              onNodeClick ? 'cursor-pointer' : ''
            )}
            style={{
              flex: `${percentage} 1 0%`,
              minWidth: '110px',
              background: `linear-gradient(135deg, color-mix(in oklch, ${resolvedColor} 10%, var(--surface-card, #fff)), var(--surface-card, #fff))`,
            }}
          >
            {/* Top Row: Category Tag + Dot Indicator */}
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="size-2 rounded-full shrink-0 shadow-2xs"
                  style={{ backgroundColor: resolvedColor }}
                />
                {item.category && (
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)] truncate font-mono">
                    {item.category}
                  </span>
                )}
              </div>

              <span className="text-[10px] font-mono font-bold text-[var(--ink-muted)] shrink-0">
                {Math.round((item.value / totalValue) * 100)}%
              </span>
            </div>

            {/* Middle Row: Name */}
            <span className="font-bold text-xs text-[var(--ink-primary)] truncate pt-1">
              {item.name}
            </span>

            {/* Bottom Row: Value */}
            <div className="flex items-center justify-between gap-1 pt-2 border-t border-[var(--outline-base)]/40 mt-1">
              <span className="font-mono text-xs font-extrabold text-[var(--ink-primary)]">
                {valueFormatter(item.value)}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
