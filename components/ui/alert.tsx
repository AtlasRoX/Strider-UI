'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

const alertVariants = cva(
  'relative w-full rounded-xl border p-4 text-sm transition-all duration-200',
  {
    variants: {
      theme: {
        brand:
          'bg-[var(--brand-subtle)] text-[var(--brand-ink)] border-[var(--brand-outline)]',
        gray:
          'bg-[var(--surface-muted)] text-[var(--ink-primary)] border-[var(--outline-base)]',
        blue:
          'bg-[var(--blue-subtle)] text-[var(--blue-ink)] border-[var(--blue-outline)]',
        emerald:
          'bg-[var(--emerald-subtle)] text-[var(--emerald-ink)] border-[var(--emerald-outline)]',
        amber:
          'bg-[var(--amber-subtle)] text-[var(--amber-ink)] border-[var(--amber-outline)]',
        rose:
          'bg-[var(--rose-subtle)] text-[var(--rose-ink)] border-[var(--rose-outline)]',
      },
    },
    defaultVariants: {
      theme: 'brand',
    },
  }
)

export interface AlertAction {
  label: string
  onClick: () => void
}

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    Omit<VariantProps<typeof alertVariants>, 'theme'> {
  theme?: 'brand' | 'gray' | 'blue' | 'emerald' | 'amber' | 'rose'
  variant?: 'default' | 'destructive' // Backward compat
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: LucideIcon | React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  primaryAction?: AlertAction
  secondaryAction?: AlertAction
}

function Alert({
  className,
  theme = 'brand',
  variant,
  title,
  description,
  icon,
  dismissible = false,
  onDismiss,
  primaryAction,
  secondaryAction,
  children,
  ...props
}: AlertProps) {
  // Backward compatibility
  let resolvedTheme = theme
  if (variant === 'destructive') {
    resolvedTheme = 'rose'
  }

  // Automatic content-driven layout determination
  const hasDescription = Boolean(description) || Boolean(children)
  const isBanner = hasDescription || Boolean(secondaryAction)
  const layout = isBanner ? 'banner' : 'row'

  const renderDefaultIcon = () => {
    switch (resolvedTheme) {
      case 'rose':
        return <AlertCircle className="size-4 shrink-0 text-[var(--rose-solid)]" />
      case 'amber':
        return <AlertTriangle className="size-4 shrink-0 text-[var(--amber-solid)]" />
      case 'emerald':
        return <CheckCircle2 className="size-4 shrink-0 text-[var(--emerald-solid)]" />
      case 'blue':
        return <Info className="size-4 shrink-0 text-[var(--blue-solid)]" />
      case 'gray':
        return <Info className="size-4 shrink-0 text-[var(--ink-secondary)]" />
      case 'brand':
      default:
        return <Info className="size-4 shrink-0 text-[var(--brand-solid)]" />
    }
  }

  const renderIcon = () => {
    if (icon === null) return null
    if (icon) {
      if (typeof icon === 'function') {
        const IconComponent = icon as LucideIcon
        return <IconComponent className="size-4 shrink-0" />
      }
      return icon
    }
    return renderDefaultIcon()
  }

  return (
    <div
      role="alert"
      data-slot="alert"
      data-theme={resolvedTheme}
      data-layout={layout}
      className={cn(
        alertVariants({ theme: resolvedTheme }),
        'flex items-start gap-3',
        className
      )}
      {...props}
    >
      {renderIcon()}

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        {title && (
          <div className="font-semibold leading-tight tracking-tight text-current">
            {title}
          </div>
        )}
        {description && (
          <div className="text-xs opacity-90 leading-relaxed text-current">
            {description}
          </div>
        )}
        {children}

        {/* Action Row */}
        {(primaryAction || secondaryAction) && (
          <div className="flex items-center gap-2 mt-2 pt-1">
            {primaryAction && (
              <button
                type="button"
                onClick={primaryAction.onClick}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-current/10 hover:bg-current/20 transition-colors"
              >
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="px-2.5 py-1 text-xs font-medium opacity-80 hover:opacity-100 transition-opacity"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md p-1 opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-opacity"
          aria-label="Dismiss alert"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('font-semibold leading-tight tracking-tight', className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-xs opacity-90 leading-relaxed', className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
