'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DockItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  active?: boolean
  onClick?: () => void
  badge?: string | number
}

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[]
  magnification?: number
  distance?: number
  direction?: 'bottom' | 'top'
}

export function Dock({
  items = [],
  magnification = 52,
  distance = 120,
  direction = 'bottom',
  className,
  ...props
}: DockProps) {
  const [mouseX, setMouseX] = React.useState<number | null>(null)

  return (
    <div
      data-slot="dock"
      onMouseMove={(e) => setMouseX(e.clientX)}
      onMouseLeave={() => setMouseX(null)}
      className={cn(
        'inline-flex items-end gap-3 px-3 py-2.5 rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-base)]/80 backdrop-blur-xl shadow-lg select-none',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <DockIcon
          key={item.id}
          item={item}
          mouseX={mouseX}
          magnification={magnification}
          distance={distance}
        />
      ))}
    </div>
  )
}

function DockIcon({
  item,
  mouseX,
  magnification,
  distance,
}: {
  item: DockItem
  mouseX: number | null
  magnification: number
  distance: number
}) {
  const iconRef = React.useRef<HTMLButtonElement>(null)
  const Icon = item.icon

  // Calculate dynamic size based on proximity to mouseX
  let scale = 1
  if (mouseX !== null && iconRef.current) {
    const rect = iconRef.current.getBoundingClientRect()
    const iconCenterX = rect.left + rect.width / 2
    const dist = Math.abs(mouseX - iconCenterX)
    if (dist < distance) {
      const factor = 1 - dist / distance
      scale = 1 + factor * 0.35 // Up to 35% larger
    }
  }

  const baseSize = 40
  const dynamicSize = baseSize * scale

  return (
    <div className="relative group flex flex-col items-center">
      {/* Floating Tooltip */}
      <div className="absolute -top-8 px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--surface-contrast,rgba(0,0,0,0.85))] text-[var(--ink-inverse,#fff)] shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0 whitespace-nowrap z-20">
        {item.label}
      </div>

      <button
        ref={iconRef}
        type="button"
        onClick={item.onClick}
        style={{
          width: dynamicSize,
          height: dynamicSize,
        }}
        className={cn(
          'relative rounded-xl flex items-center justify-center bg-[var(--surface-card)] hover:bg-[var(--surface-muted)] border border-[var(--outline-base)] text-[var(--ink-primary)] shadow-xs transition-all duration-100 cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)]',
          item.active ? 'border-[var(--brand-solid)] text-[var(--brand-solid)] shadow-sm' : ''
        )}
        aria-label={item.label}
      >
        <Icon className="size-5 transition-transform" />

        {/* Notification Badge */}
        {item.badge !== undefined && (
          <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-[var(--rose-solid,#ef4444)] text-[9px] font-bold text-white shadow-xs">
            {item.badge}
          </span>
        )}
      </button>

      {/* Active Dot Indicator */}
      {item.active && (
        <span className="size-1 rounded-full bg-[var(--brand-solid)] mt-1 animate-pulse" />
      )}
    </div>
  )
}
