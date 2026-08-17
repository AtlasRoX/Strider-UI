'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'
import { Check, Circle } from 'lucide-react'

export interface TimelineItemProps {
  title: React.ReactNode
  description?: React.ReactNode
  timestamp?: string
  icon?: React.ReactNode
  theme?: ThemeColor
  status?: 'completed' | 'current' | 'upcoming' | 'error'
  children?: React.ReactNode
  className?: string
}

export function TimelineItem({
  title,
  description,
  timestamp,
  icon,
  theme = 'brand',
  status = 'completed',
  children,
  className,
}: TimelineItemProps) {
  const statusTheme: ThemeColor =
    status === 'completed' ? (theme || 'emerald') : status === 'current' ? 'brand' : status === 'error' ? 'rose' : 'gray'

  return (
    <div
      data-slot="timeline-item"
      className={cn('relative flex gap-4 pb-8 last:pb-0 group', className)}
    >
      {/* Connector Line */}
      <div
        className="absolute left-3.5 top-7 -bottom-1 w-0.5 bg-[var(--outline-base)] group-last:hidden"
        aria-hidden="true"
      />

      {/* Node / Icon */}
      <div
        className="relative z-10 size-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold shadow-xs transition-transform group-hover:scale-105"
        style={{
          background:
            status === 'completed'
              ? `var(--${statusTheme}-solid, #10b981)`
              : status === 'current'
              ? `var(--${statusTheme}-subtle, rgba(59, 130, 246, 0.15))`
              : `var(--surface-muted, #f1f5f9)`,
          color:
            status === 'completed'
              ? '#ffffff'
              : `var(--${statusTheme}-solid, #3b82f6)`,
          border: `2px solid ${
            status === 'current'
              ? `var(--${statusTheme}-solid, #3b82f6)`
              : status === 'completed'
              ? `var(--${statusTheme}-solid, #10b981)`
              : 'var(--outline-base, #cbd5e1)'
          }`,
        }}
      >
        {icon ? (
          icon
        ) : status === 'completed' ? (
          <Check className="size-3.5 stroke-[2.5]" />
        ) : status === 'current' ? (
          <div className="size-2 rounded-full bg-[var(--brand-solid)] animate-pulse" />
        ) : (
          <Circle className="size-2.5 opacity-40" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 pt-0.5 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="font-medium text-sm text-[var(--ink-primary)]">
            {title}
          </div>
          {timestamp && (
            <time className="text-xs text-[var(--ink-muted)] font-mono shrink-0">
              {timestamp}
            </time>
          )}
        </div>
        {description && (
          <div className="text-xs text-[var(--ink-secondary)] mt-1 leading-relaxed">
            {description}
          </div>
        )}
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  )
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
  children: React.ReactNode
}

export function Timeline({
  orientation = 'vertical',
  children,
  className,
  ...props
}: TimelineProps) {
  return (
    <div
      data-slot="timeline"
      className={cn(
        orientation === 'vertical' ? 'flex flex-col' : 'flex flex-row overflow-x-auto pb-4 gap-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
