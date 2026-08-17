'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TableProps extends React.ComponentProps<'table'> {
  density?: 'compact' | 'normal' | 'relaxed'
  striped?: boolean
  hoverable?: boolean
  containerClassName?: string
}

function Table({
  className,
  containerClassName,
  density = 'normal',
  striped = false,
  hoverable = true,
  ...props
}: TableProps) {
  return (
    <div
      data-slot="table-container"
      className={cn('relative w-full overflow-x-auto rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-xs', containerClassName)}
    >
      <table
        data-slot="table"
        data-density={density}
        data-striped={striped ? 'true' : undefined}
        data-hoverable={hoverable ? 'true' : undefined}
        className={cn(
          'w-full caption-bottom text-xs text-[var(--ink-primary)]',
          className
        )}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('bg-[var(--surface-muted)]/60 border-b border-[var(--outline-base)]', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        'divide-y divide-[var(--outline-muted)] [&_tr:last-child]:border-0',
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-[var(--surface-muted)]/50 border-t border-[var(--outline-base)] font-medium text-[var(--ink-secondary)]',
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'transition-colors duration-150',
        'hover:bg-[var(--surface-subtle)]/70',
        'data-[state=selected]:bg-[var(--brand-subtle)]/30',
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'h-9 px-3 text-left align-middle font-semibold text-[var(--ink-secondary)] text-[11px] uppercase tracking-wider whitespace-nowrap select-none',
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-3 align-middle text-xs whitespace-nowrap',
        'group-data-[density=compact]/table:p-2',
        'group-data-[density=relaxed]/table:p-4',
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-[11px] text-[var(--ink-muted)] mt-2 pb-2', className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
