'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Breadcrumbs, type BreadcrumbItemConfig } from '@/components/ui/breadcrumb'

export interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItemConfig[]
  badge?: React.ReactNode
  actions?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

/**
 * PageHeader
 * Unified enterprise page header with breadcrumb navigation, badge, subtitle, and action button bar.
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  badge,
  actions,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-3 pb-6 border-b border-[var(--outline-base)]', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} className="mb-1" />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--ink-primary)] sm:text-3xl">
              {title}
            </h1>
            {badge}
          </div>
          {description && (
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {actions}
          </div>
        )}
      </div>

      {children}
    </div>
  )
}
