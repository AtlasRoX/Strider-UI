'use client'

import * as React from 'react'
import { ChevronRight, Folder, FolderOpen, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export interface TreeNodeData {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: string | number
  children?: TreeNodeData[]
  disabled?: boolean
}

export interface TreeProps {
  data: TreeNodeData[]
  selectedId?: string
  defaultSelectedId?: string
  onSelect?: (node: TreeNodeData) => void
  defaultExpandedIds?: string[]
  className?: string
}

export function Tree({
  data,
  selectedId: controlledSelectedId,
  defaultSelectedId,
  onSelect,
  defaultExpandedIds = [],
  className,
}: TreeProps) {
  const [selectedId, setSelectedId] = React.useState<string | undefined>(
    controlledSelectedId ?? defaultSelectedId
  )
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    new Set(defaultExpandedIds)
  )

  const activeId = controlledSelectedId !== undefined ? controlledSelectedId : selectedId

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleSelect = (node: TreeNodeData) => {
    if (node.disabled) return
    setSelectedId(node.id)
    onSelect?.(node)
  }

  return (
    <div
      role="tree"
      className={cn('flex flex-col select-none text-xs text-[var(--ink-primary)]', className)}
    >
      {data.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          level={0}
          selectedId={activeId}
          expandedIds={expandedIds}
          onToggle={toggleExpand}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}

interface TreeNodeItemProps {
  node: TreeNodeData
  level: number
  selectedId?: string
  expandedIds: Set<string>
  onToggle: (id: string) => void
  onSelect: (node: TreeNodeData) => void
}

function TreeNodeItem({
  node,
  level,
  selectedId,
  expandedIds,
  onToggle,
  onSelect,
}: TreeNodeItemProps) {
  const hasChildren = Boolean(node.children && node.children.length > 0)
  const isExpanded = expandedIds.has(node.id)
  const isSelected = selectedId === node.id

  return (
    <div className="flex flex-col">
      <div
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-disabled={node.disabled}
        onClick={() => {
          if (hasChildren) {
            onToggle(node.id)
          }
          onSelect(node)
        }}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        className={cn(
          'flex items-center gap-1.5 py-1.5 pr-2 rounded-lg cursor-pointer transition-colors outline-none',
          isSelected
            ? 'bg-[var(--brand-subtle)] text-[var(--brand-ink)] font-semibold'
            : 'hover:bg-[var(--surface-muted)] text-[var(--ink-primary)]',
          node.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
        )}
      >
        {/* Expand / Collapse Chevron */}
        <span
          onClick={(e) => {
            if (hasChildren) {
              e.stopPropagation()
              onToggle(node.id)
            }
          }}
          className={cn(
            'flex size-4 items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-transform',
            !hasChildren && 'invisible'
          )}
        >
          <ChevronRight
            className={cn('size-3.5 transition-transform duration-150', isExpanded && 'rotate-90')}
          />
        </span>

        {/* Node Icon */}
        <span className="text-[var(--ink-secondary)]">
          {node.icon ? (
            node.icon
          ) : hasChildren ? (
            isExpanded ? (
              <FolderOpen className="size-4 text-[var(--brand-solid)]" />
            ) : (
              <Folder className="size-4" />
            )
          ) : (
            <FileText className="size-4 text-[var(--ink-muted)]" />
          )}
        </span>

        {/* Node Label */}
        <span className="flex-1 truncate">{node.label}</span>

        {/* Badge */}
        {node.badge !== undefined && (
          <Badge size="sm" variant="subtle" theme="gray">
            {node.badge}
          </Badge>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="flex flex-col">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
