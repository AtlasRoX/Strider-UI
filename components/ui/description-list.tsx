import * as React from 'react'
import { cn } from '@/lib/utils'
import { CopyButton } from '@/components/ui/copy-button'

export interface DescriptionItem {
  id?: string
  label: React.ReactNode
  value: React.ReactNode
  copyable?: boolean | string
  helperText?: React.ReactNode
  span?: 1 | 2 | 3
}

export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[]
  columns?: 1 | 2 | 3 | 4
  layout?: 'horizontal' | 'vertical' | 'striped'
  density?: 'compact' | 'normal' | 'relaxed'
}

const densityMap = {
  compact: 'py-2 px-3',
  normal: 'py-3 px-4',
  relaxed: 'py-4 px-5',
}

/**
 * DescriptionList
 * Structured Key-Value Property List / Spec Card for customer data,
 * server telemetry, and transaction receipts.
 */
export function DescriptionList({
  items = [],
  columns = 2,
  layout = 'horizontal',
  density = 'normal',
  className,
  ...props
}: DescriptionListProps) {
  const colGridMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  if (layout === 'striped') {
    return (
      <dl
        data-slot="description-list"
        className={cn(
          'divide-y divide-[var(--outline-base)]/50 rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)] overflow-hidden shadow-2xs text-xs',
          className
        )}
        {...props}
      >
        {items.map((item, i) => {
          const copyVal = typeof item.copyable === 'string' ? item.copyable : typeof item.value === 'string' ? item.value : ''
          return (
            <div
              key={item.id || i}
              className={cn(
                'flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 transition-colors',
                densityMap[density],
                i % 2 === 1 ? 'bg-[var(--surface-muted)]/40' : 'bg-transparent'
              )}
            >
              <dt className="font-semibold text-[var(--ink-secondary)] shrink-0 min-w-[140px]">
                {item.label}
              </dt>
              <dd className="flex items-center gap-2 text-[var(--ink-primary)] font-medium">
                <span>{item.value}</span>
                {item.copyable && copyVal && (
                  <CopyButton value={copyVal} size="xs" />
                )}
              </dd>
            </div>
          )
        })}
      </dl>
    )
  }

  return (
    <dl
      data-slot="description-list"
      className={cn(
        'grid gap-4 rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)] p-5 shadow-2xs text-xs',
        colGridMap[columns] || 'grid-cols-1 sm:grid-cols-2',
        className
      )}
      {...props}
    >
      {items.map((item, i) => {
        const copyVal = typeof item.copyable === 'string' ? item.copyable : typeof item.value === 'string' ? item.value : ''
        return (
          <div
            key={item.id || i}
            className={cn(
              'flex flex-col gap-1',
              item.span === 2 && 'sm:col-span-2',
              item.span === 3 && 'sm:col-span-2 lg:col-span-3'
            )}
          >
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              {item.label}
            </dt>
            <dd className="flex items-center gap-2 text-[var(--ink-primary)] font-medium text-sm">
              <span>{item.value}</span>
              {item.copyable && copyVal && (
                <CopyButton value={copyVal} size="xs" />
              )}
            </dd>
            {item.helperText && (
              <span className="text-[11px] text-[var(--ink-muted)]">{item.helperText}</span>
            )}
          </div>
        )
      })}
    </dl>
  )
}
