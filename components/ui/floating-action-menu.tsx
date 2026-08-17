'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'
import { Plus, X } from 'lucide-react'

export interface FloatingActionItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  onClick: () => void
  theme?: ThemeColor
}

export interface FloatingActionMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: FloatingActionItem[]
  theme?: ThemeColor
  mainIcon?: React.ReactNode
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  inline?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function FloatingActionMenu({
  actions = [],
  theme = 'brand',
  mainIcon,
  position = 'bottom-right',
  inline = false,
  open: controlledOpen,
  onOpenChange,
  className,
  ...props
}: FloatingActionMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const next = !isOpen
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  const close = () => {
    if (!isControlled) setInternalOpen(false)
    onOpenChange?.(false)
  }

  // Handle click outside to close
  React.useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close()
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const positionClasses = inline
    ? 'relative'
    : {
        'bottom-right': 'fixed bottom-6 right-6 z-50',
        'bottom-left': 'fixed bottom-6 left-6 z-50',
        'top-right': 'fixed top-6 right-6 z-50',
        'top-left': 'fixed top-6 left-6 z-50',
      }[position]

  return (
    <div
      ref={menuRef}
      data-slot="floating-action-menu"
      className={cn('flex flex-col items-center gap-2 select-none', positionClasses, className)}
      {...props}
    >
      {/* Sub-Actions Stack */}
      {isOpen && (
        <div className="flex flex-col items-center gap-2.5 pb-2 animate-in fade-in-0 slide-in-from-bottom-3 duration-200">
          {actions.map((action, idx) => {
            const Icon = action.icon
            const actionTheme = action.theme || theme

            return (
              <div key={action.id || idx} className="flex items-center gap-2.5 group">
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[var(--surface-contrast,rgba(0,0,0,0.85))] text-[var(--ink-inverse,#fff)] shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {action.label}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    action.onClick()
                    close()
                  }}
                  className={cn(
                    'size-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)]',
                    `bg-[var(--${actionTheme}-solid,#3b82f6)] text-white`
                  )}
                  aria-label={action.label}
                >
                  <Icon className="size-4.5" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle action menu"
        aria-expanded={isOpen}
        className={cn(
          'size-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
          `bg-[var(--${theme}-solid,#3b82f6)] text-white focus-visible:ring-[var(--${theme}-solid)]`
        )}
      >
        <div className={cn('transition-transform duration-300', isOpen ? 'rotate-45' : '')}>
          {mainIcon ?? <Plus className="size-6 stroke-[2.5]" />}
        </div>
      </button>
    </div>
  )
}
