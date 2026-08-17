'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Search, ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft } from 'lucide-react'

export interface TransferListItem {
  id: string
  label: string
  description?: string
  disabled?: boolean
}

export interface TransferListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  items: TransferListItem[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (selectedIds: string[]) => void
  leftTitle?: string
  rightTitle?: string
  showSearch?: boolean
}

export function TransferList({
  items = [],
  value: controlledValue,
  defaultValue = [],
  onChange,
  leftTitle = 'Available Items',
  rightTitle = 'Selected Items',
  showSearch = true,
  className,
  ...props
}: TransferListProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(
    controlledValue ?? defaultValue
  )
  const [leftSearch, setLeftSearch] = React.useState('')
  const [rightSearch, setRightSearch] = React.useState('')
  const [checkedIds, setCheckedIds] = React.useState<Set<string>>(new Set())

  const isControlled = controlledValue !== undefined
  const selectedIds = isControlled ? controlledValue : internalValue

  const leftItems = React.useMemo(() => {
    return items
      .filter((item) => !selectedIds.includes(item.id))
      .filter((item) => item.label.toLowerCase().includes(leftSearch.toLowerCase()))
  }, [items, selectedIds, leftSearch])

  const rightItems = React.useMemo(() => {
    return items
      .filter((item) => selectedIds.includes(item.id))
      .filter((item) => item.label.toLowerCase().includes(rightSearch.toLowerCase()))
  }, [items, selectedIds, rightSearch])

  const toggleCheck = (id: string) => {
    const next = new Set(checkedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setCheckedIds(next)
  }

  const transferToRight = () => {
    const toTransfer = leftItems.filter((i) => checkedIds.has(i.id)).map((i) => i.id)
    const next = [...selectedIds, ...toTransfer]
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
    setCheckedIds(new Set())
  }

  const transferToLeft = () => {
    const next = selectedIds.filter((id) => !checkedIds.has(id))
    if (!isControlled) setInternalValue(next)
    onChange?.(next)
    setCheckedIds(new Set())
  }

  const transferAllToRight = () => {
    const all = items.map((i) => i.id)
    if (!isControlled) setInternalValue(all)
    onChange?.(all)
    setCheckedIds(new Set())
  }

  const transferAllToLeft = () => {
    if (!isControlled) setInternalValue([])
    onChange?.([])
    setCheckedIds(new Set())
  }

  const renderPanel = (
    title: string,
    panelItems: TransferListItem[],
    searchVal: string,
    onSearchChange: (v: string) => void
  ) => (
    <div className="flex-1 flex flex-col rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] overflow-hidden shadow-2xs">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface-muted)]/60 border-b border-[var(--outline-base)] text-xs font-semibold text-[var(--ink-primary)]">
        <span>{title}</span>
        <span className="font-mono text-[10px] text-[var(--ink-muted)]">
          {panelItems.length} items
        </span>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className="relative p-2 border-b border-[var(--outline-base)]/50">
          <Search className="size-3.5 absolute left-4 top-3.5 text-[var(--ink-muted)] pointer-events-none" />
          <input
            type="text"
            placeholder="Filter..."
            value={searchVal}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-7 pl-7 pr-2 text-xs bg-[var(--surface-base)] border border-[var(--outline-base)] rounded-md outline-hidden text-[var(--ink-primary)]"
          />
        </div>
      )}

      {/* Item List */}
      <div className="flex-1 max-h-56 overflow-y-auto p-1 flex flex-col gap-0.5 min-h-[160px]">
        {panelItems.length === 0 ? (
          <div className="flex items-center justify-center h-full text-xs text-[var(--ink-muted)] py-8">
            No items
          </div>
        ) : (
          panelItems.map((item) => {
            const isChecked = checkedIds.has(item.id)
            return (
              <label
                key={item.id}
                className={cn(
                  'flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer select-none',
                  isChecked ? 'bg-[var(--brand-subtle)] text-[var(--brand-solid)] font-medium' : 'hover:bg-[var(--surface-muted)] text-[var(--ink-primary)]'
                )}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleCheck(item.id)}
                  theme="brand"
                />
                <div className="flex flex-col min-w-0">
                  <span className="truncate">{item.label}</span>
                  {item.description && (
                    <span className="text-[10px] text-[var(--ink-muted)] truncate">
                      {item.description}
                    </span>
                  )}
                </div>
              </label>
            )
          })
        )}
      </div>
    </div>
  )

  return (
    <div
      data-slot="transfer-list"
      className={cn('flex flex-col sm:flex-row items-center gap-3 w-full', className)}
      {...props}
    >
      {renderPanel(leftTitle, leftItems, leftSearch, setLeftSearch)}

      {/* Control Buttons */}
      <div className="flex sm:flex-col gap-1.5 shrink-0">
        <Button
          variant="outline"
          theme="gray"
          size="xs"
          onClick={transferAllToRight}
          disabled={leftItems.length === 0}
          title="Move all right"
        >
          <ChevronsRight className="size-3.5" />
        </Button>
        <Button
          variant="solid"
          theme="brand"
          size="xs"
          onClick={transferToRight}
          disabled={!leftItems.some((i) => checkedIds.has(i.id))}
          title="Move selected right"
        >
          <ChevronRight className="size-3.5" />
        </Button>
        <Button
          variant="solid"
          theme="brand"
          size="xs"
          onClick={transferToLeft}
          disabled={!rightItems.some((i) => checkedIds.has(i.id))}
          title="Move selected left"
        >
          <ChevronLeft className="size-3.5" />
        </Button>
        <Button
          variant="outline"
          theme="gray"
          size="xs"
          onClick={transferAllToLeft}
          disabled={rightItems.length === 0}
          title="Move all left"
        >
          <ChevronsLeft className="size-3.5" />
        </Button>
      </div>

      {renderPanel(rightTitle, rightItems, rightSearch, setRightSearch)}
    </div>
  )
}
