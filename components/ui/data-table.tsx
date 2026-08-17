'use client'

import * as React from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { EmptyState } from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

export interface DataTableColumn<T> {
  key: string
  header: React.ReactNode
  render?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  className?: string
  headerClassName?: string
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  rowKey?: (row: T) => string
  selectable?: boolean
  selectedKeys?: string[]
  onSelectionChange?: (keys: string[]) => void
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  onSortChange?: (key: string, dir: 'asc' | 'desc') => void
  pagination?: {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
  }
  loading?: boolean
  emptyState?: React.ReactNode
  onRowClick?: (row: T) => void
  density?: 'compact' | 'normal' | 'relaxed'
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  rowKey = (row) => row.id || JSON.stringify(row),
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  sortKey,
  sortDirection,
  onSortChange,
  pagination,
  loading = false,
  emptyState,
  onRowClick,
  density = 'normal',
  className,
}: DataTableProps<T>) {
  const isAllSelected =
    data.length > 0 && data.every((row) => selectedKeys.includes(rowKey(row)))
  const isPartiallySelected =
    data.some((row) => selectedKeys.includes(rowKey(row))) && !isAllSelected

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange?.([])
    } else {
      onSelectionChange?.(data.map((row) => rowKey(row)))
    }
  }

  const handleSelectRow = (key: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedKeys.includes(key)) {
      onSelectionChange?.(selectedKeys.filter((k) => k !== key))
    } else {
      onSelectionChange?.([...selectedKeys, key])
    }
  }

  const handleSort = (colKey: string) => {
    if (!onSortChange) return
    if (sortKey === colKey) {
      onSortChange(colKey, sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      onSortChange(colKey, 'asc')
    }
  }

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1

  return (
    <div className={cn('flex flex-col gap-3 w-full', className)}>
      <Table density={density}>
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="w-10 px-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isPartiallySelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </TableHead>
            )}
            {columns.map((col) => {
              const isSorted = sortKey === col.key
              return (
                <TableHead
                  key={col.key}
                  className={cn(
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    col.sortable && 'cursor-pointer select-none hover:text-[var(--ink-primary)]',
                    col.headerClassName
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div
                    className={cn(
                      'inline-flex items-center gap-1.5',
                      col.align === 'center' && 'justify-center',
                      col.align === 'right' && 'justify-end'
                    )}
                  >
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-[var(--ink-muted)]">
                        {isSorted ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="size-3 text-[var(--brand-solid)]" />
                          ) : (
                            <ArrowDown className="size-3 text-[var(--brand-solid)]" />
                          )
                        ) : (
                          <ArrowUpDown className="size-3 opacity-40" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {selectable && (
                  <TableCell className="w-10 px-3">
                    <Skeleton className="size-4 rounded-xs" />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="py-12 text-center"
              >
                {emptyState || <EmptyState title="No records found" />}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => {
              const key = rowKey(row)
              const isSelected = selectedKeys.includes(key)

              return (
                <TableRow
                  key={key}
                  data-state={isSelected ? 'selected' : undefined}
                  onClick={() => onRowClick?.(row)}
                  className={cn(onRowClick && 'cursor-pointer')}
                >
                  {selectable && (
                    <TableCell className="w-10 px-3" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleSelectRow(key, {} as any)}
                        aria-label={`Select row ${idx + 1}`}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={cn(
                        col.align === 'center' && 'text-center',
                        col.align === 'right' && 'text-right',
                        col.className
                      )}
                    >
                      {col.render ? col.render(row, idx) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination Footer */}
      {pagination && (
        <div className="flex items-center justify-between px-2 text-xs text-[var(--ink-secondary)]">
          <div>
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} entries
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="xs"
              theme="gray"
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
            >
              <ChevronLeft className="size-3 mr-1" />
              Previous
            </Button>
            <span className="px-2 text-xs font-medium text-[var(--ink-primary)]">
              {pagination.page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="xs"
              theme="gray"
              disabled={pagination.page >= totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            >
              Next
              <ChevronRight className="size-3 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
