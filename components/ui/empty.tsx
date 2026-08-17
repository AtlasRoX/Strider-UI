'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Inbox, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Empty({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[var(--outline-base)] bg-[var(--surface-card)]/50 p-8 text-center',
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-header"
      className={cn('flex max-w-sm flex-col items-center gap-1.5 text-center', className)}
      {...props}
    />
  )
}

const emptyMediaVariants = cva(
  'flex shrink-0 items-center justify-center mb-1',
  {
    variants: {
      variant: {
        default: 'text-[var(--ink-muted)]',
        icon: 'size-12 rounded-2xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] shadow-2xs [&_svg]:size-6',
        subtle: 'size-12 rounded-2xl bg-[var(--surface-muted)] text-[var(--ink-secondary)] [&_svg]:size-6',
      },
    },
    defaultVariants: {
      variant: 'icon',
    },
  }
)

function EmptyMedia({
  className,
  variant = 'icon',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="empty-title"
      className={cn('text-sm font-semibold text-[var(--ink-primary)] tracking-tight', className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="empty-description"
      className={cn('text-xs text-[var(--ink-secondary)] leading-relaxed max-w-xs', className)}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-content"
      className={cn('flex w-full max-w-sm flex-col items-center gap-3 text-xs', className)}
      {...props}
    />
  )
}

export interface EmptyStateProps {
  icon?: LucideIcon | React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  secondaryAction?: React.ReactNode
  className?: string
}

/**
 * EmptyState
 * Quick shorthand helper component for standard empty states.
 */
export function EmptyState({
  icon,
  title = 'No items found',
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const renderIcon = () => {
    if (!icon) return <Inbox className="size-6" />
    if (typeof icon === 'function') {
      const IconComp = icon as LucideIcon
      return <IconComp className="size-6" />
    }
    return icon
  }

  return (
    <Empty className={className}>
      <EmptyMedia variant="icon">{renderIcon()}</EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>{title}</EmptyTitle>
        {description && <EmptyDescription>{description}</EmptyDescription>}
      </EmptyHeader>
      {(action || secondaryAction) && (
        <EmptyContent>
          <div className="flex items-center gap-2 mt-1">
            {secondaryAction}
            {action}
          </div>
        </EmptyContent>
      )}
    </Empty>
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
