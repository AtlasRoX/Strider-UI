'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import {
  Plus,
  MoveRight,
  MoveLeft,
  Clock,
  GripVertical,
} from 'lucide-react'
import { toast } from 'sonner'

export type KanbanPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface KanbanItem {
  id: string
  title: string
  description?: string
  priority: KanbanPriority
  assignee?: { name: string; avatar?: string }
  dueDate?: string
  tags?: string[]
}

export interface KanbanColumn {
  id: string
  title: string
  color?: string
  wipLimit?: number
  items: KanbanItem[]
}

export interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: KanbanColumn[]
  onItemMove?: (itemId: string, fromColId: string, toColId: string) => void
  onItemCreate?: (columnId: string, title: string) => void
  onItemDelete?: (itemId: string, columnId: string) => void
}

const DEFAULT_COLUMNS: KanbanColumn[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: 'slate',
    items: [
      { id: 't-1', title: 'Implement OKLCH color token contract', priority: 'medium', assignee: { name: 'Alex' }, dueDate: 'Oct 24', tags: ['Design System'] },
      { id: 't-2', title: 'Draft SOC2 compliance security policy', priority: 'high', assignee: { name: 'Sarah' }, dueDate: 'Oct 28', tags: ['Security'] },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: 'brand',
    wipLimit: 3,
    items: [
      { id: 't-3', title: 'Refactor FilterBuilder dropdowns with Radix UI', priority: 'urgent', assignee: { name: 'Marcus' }, dueDate: 'Today', tags: ['Core UI'] },
      { id: 't-4', title: 'Build Webhook dispatch event simulator', priority: 'medium', assignee: { name: 'Elena' }, dueDate: 'Tomorrow', tags: ['API'] },
    ],
  },
  {
    id: 'review',
    title: 'In Review',
    color: 'amber',
    items: [
      { id: 't-5', title: 'Audit Next.js hydration boundaries', priority: 'high', assignee: { name: 'David' }, dueDate: 'Oct 22', tags: ['Performance'] },
    ],
  },
  {
    id: 'done',
    title: 'Completed',
    color: 'emerald',
    items: [
      { id: 't-6', title: 'Initial setup of 100+ Strider UI components', priority: 'urgent', assignee: { name: 'Alex' }, dueDate: 'Done', tags: ['Milestone'] },
    ],
  },
]

export function KanbanBoard({
  columns: controlledColumns,
  onItemMove,
  onItemCreate,
  onItemDelete,
  className,
  ...props
}: KanbanBoardProps) {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(controlledColumns || DEFAULT_COLUMNS)
  const [newCardTitles, setNewCardTitles] = React.useState<Record<string, string>>({})
  const [activeAddColumn, setActiveAddColumn] = React.useState<string | null>(null)
  const [draggedItemId, setDraggedItemId] = React.useState<string | null>(null)
  const [dragOverColId, setDragOverColId] = React.useState<string | null>(null)

  const activeCols = controlledColumns || columns

  const moveItemDirect = (itemId: string, fromColId: string, toColId: string) => {
    if (fromColId === toColId) return

    const fromCol = activeCols.find((c) => c.id === fromColId)
    const toCol = activeCols.find((c) => c.id === toColId)
    if (!fromCol || !toCol) return

    const itemToMove = fromCol.items.find((i) => i.id === itemId)
    if (!itemToMove) return

    const updated = activeCols.map((col) => {
      if (col.id === fromColId) {
        return { ...col, items: col.items.filter((i) => i.id !== itemId) }
      }
      if (col.id === toColId) {
        return { ...col, items: [...col.items, itemToMove] }
      }
      return col
    })

    setColumns(updated)
    onItemMove?.(itemId, fromColId, toColId)
    toast.success(`Dropped "${itemToMove.title.slice(0, 24)}..." into ${toCol.title}`)
  }

  const moveItem = (itemId: string, fromColId: string, direction: 'left' | 'right') => {
    const fromColIndex = activeCols.findIndex((c) => c.id === fromColId)
    const toColIndex = direction === 'right' ? fromColIndex + 1 : fromColIndex - 1

    if (toColIndex < 0 || toColIndex >= activeCols.length) return
    const toCol = activeCols[toColIndex]
    moveItemDirect(itemId, fromColId, toCol.id)
  }

  const handleCreateCard = (colId: string) => {
    const title = newCardTitles[colId]?.trim()
    if (!title) return

    const newItem: KanbanItem = {
      id: `t-${Date.now()}`,
      title,
      priority: 'medium',
      dueDate: 'Soon',
      tags: ['Feature'],
    }

    const updated = activeCols.map((c) => (c.id === colId ? { ...c, items: [...c.items, newItem] } : c))
    setColumns(updated)
    onItemCreate?.(colId, title)
    setNewCardTitles((prev) => ({ ...prev, [colId]: '' }))
    setActiveAddColumn(null)
    toast.success('Task created')
  }

  const getPriorityBadge = (priority: KanbanPriority) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="solid" theme="rose" size="sm">Urgent</Badge>
      case 'high':
        return <Badge variant="subtle" theme="amber" size="sm">High</Badge>
      case 'medium':
        return <Badge variant="subtle" theme="brand" size="sm">Medium</Badge>
      default:
        return <Badge variant="subtle" theme="gray" size="sm">Low</Badge>
    }
  }

  return (
    <div
      data-slot="kanban-board"
      className={cn('flex flex-col gap-4 w-full select-none overflow-x-auto pb-2', className)}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 min-w-[760px]">
        {activeCols.map((col, colIdx) => {
          const isOverLimit = col.wipLimit && col.items.length > col.wipLimit
          const isAdding = activeAddColumn === col.id
          const isDragOver = dragOverColId === col.id

          return (
            <div
              key={col.id}
              onDragOver={(e) => {
                e.preventDefault()
                e.dataTransfer.dropEffect = 'move'
                if (dragOverColId !== col.id) {
                  setDragOverColId(col.id)
                }
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setDragOverColId(null)
                }
              }}
              onDrop={(e) => {
                e.preventDefault()
                setDragOverColId(null)
                const payload = e.dataTransfer.getData('text/plain')
                if (payload) {
                  try {
                    const { itemId, fromColId } = JSON.parse(payload)
                    moveItemDirect(itemId, fromColId, col.id)
                  } catch {}
                }
              }}
              className={cn(
                'flex flex-col gap-3 p-3.5 rounded-2xl border min-h-[380px] transition-all',
                isDragOver
                  ? 'bg-[var(--brand-subtle)]/20 border-[var(--brand-solid)] ring-2 ring-[var(--brand-solid)]/30'
                  : 'bg-[var(--surface-muted)]/40 border-[var(--outline-base)]/60'
              )}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-[var(--ink-primary)]">
                  <span>{col.title}</span>
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-mono',
                    isOverLimit
                      ? 'bg-rose-500 text-white'
                      : 'bg-[var(--surface-base)] text-[var(--ink-muted)] border border-[var(--outline-base)]'
                  )}>
                    {col.items.length}{col.wipLimit ? ` / ${col.wipLimit}` : ''}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveAddColumn(isAdding ? null : col.id)}
                  className="size-6 rounded-md hover:bg-[var(--surface-base)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
                  title="Add card"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

              {/* Quick Add Inline Form */}
              {isAdding && (
                <div className="flex flex-col gap-2 p-2.5 rounded-xl bg-[var(--surface-base)] border border-[var(--brand-solid)] shadow-sm animate-in fade-in-0 duration-150">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Task title..."
                    value={newCardTitles[col.id] || ''}
                    onChange={(e) => setNewCardTitles((prev) => ({ ...prev, [col.id]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateCard(col.id)
                      if (e.key === 'Escape') setActiveAddColumn(null)
                    }}
                    className="w-full text-xs bg-transparent border-none outline-hidden text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)]"
                  />
                  <div className="flex items-center justify-end gap-1.5 pt-1">
                    <Button
                      variant="ghost"
                      theme="gray"
                      size="xs"
                      onClick={() => setActiveAddColumn(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="solid"
                      theme="brand"
                      size="xs"
                      onClick={() => handleCreateCard(col.id)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              )}

              {/* Task Items List with Drag & Drop */}
              <div className="flex flex-col gap-2 flex-1">
                {col.items.map((item) => {
                  const isDragging = draggedItemId === item.id

                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', JSON.stringify({ itemId: item.id, fromColId: col.id }))
                        e.dataTransfer.effectAllowed = 'move'
                        setDraggedItemId(item.id)
                      }}
                      onDragEnd={() => {
                        setDraggedItemId(null)
                        setDragOverColId(null)
                      }}
                      className={cn(
                        'group relative flex flex-col gap-2 p-3 rounded-xl bg-[var(--surface-card)] border shadow-2xs transition-all cursor-grab active:cursor-grabbing',
                        isDragging
                          ? 'opacity-40 border-[var(--brand-solid)] scale-95'
                          : 'border-[var(--outline-base)] hover:border-[var(--brand-solid)]/40 hover:shadow-xs'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-1.5 min-w-0">
                          <GripVertical className="size-3.5 text-[var(--ink-muted)] shrink-0 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                          <span className="font-semibold text-xs text-[var(--ink-primary)] leading-snug">
                            {item.title}
                          </span>
                        </div>
                        {getPriorityBadge(item.priority)}
                      </div>

                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pl-5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] px-1.5 py-0.5 rounded-md bg-[var(--surface-muted)] text-[var(--ink-secondary)] font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Card Footer: Assignee, Due Date, Move Buttons */}
                      <div className="flex items-center justify-between pt-1 pl-5 border-t border-[var(--outline-base)]/40 text-[10px] text-[var(--ink-muted)]">
                        <div className="flex items-center gap-1.5">
                          {item.assignee && <Avatar label={item.assignee.name} size="xs" />}
                          {item.dueDate && (
                            <span className="flex items-center gap-0.5 font-mono">
                              <Clock className="size-2.5" /> {item.dueDate}
                            </span>
                          )}
                        </div>

                        {/* Direction Move Actions (Fallback) */}
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {colIdx > 0 && (
                            <button
                              type="button"
                              onClick={() => moveItem(item.id, col.id, 'left')}
                              className="size-5 rounded hover:bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] cursor-pointer"
                              title="Move left"
                            >
                              <MoveLeft className="size-3" />
                            </button>
                          )}
                          {colIdx < activeCols.length - 1 && (
                            <button
                              type="button"
                              onClick={() => moveItem(item.id, col.id, 'right')}
                              className="size-5 rounded hover:bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] cursor-pointer"
                              title="Move right"
                            >
                              <MoveRight className="size-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
