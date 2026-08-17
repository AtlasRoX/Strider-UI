'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor, ComponentVariant } from '@/lib/theme-types'
import { X, Bell } from 'lucide-react'

export interface BannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  theme?: ThemeColor
  variant?: ComponentVariant
  action?: React.ReactNode
  closable?: boolean
  onClose?: () => void
}

export function Banner({
  title,
  description,
  icon,
  theme = 'brand',
  variant = 'subtle',
  action,
  closable = true,
  onClose,
  className,
  children,
  ...props
}: BannerProps) {
  const [isOpen, setIsOpen] = React.useState(true)

  if (!isOpen) return null

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  const variantStyles: Record<ComponentVariant, string> = {
    solid: `bg-[var(--${theme}-solid)] text-white border-transparent`,
    subtle: `bg-[var(--${theme}-subtle)] text-[var(--${theme}-solid)] border-[var(--${theme}-solid)]/20`,
    outline: `bg-transparent text-[var(--${theme}-solid)] border-[var(--${theme}-solid)]`,
    ghost: `bg-transparent text-[var(--${theme}-solid)] border-transparent`,
    link: `bg-transparent text-[var(--${theme}-solid)] border-transparent underline`,
  }

  return (
    <aside
      data-slot="banner"
      role="region"
      aria-label="Announcement"
      className={cn(
        'relative flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg border text-sm transition-all',
        variantStyles,
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="shrink-0">
          {icon ?? <Bell className="size-4" />}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 min-w-0">
          {title && <strong className="font-semibold">{title}</strong>}
          {description && <span className="opacity-90">{description}</span>}
          {children}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {action}
        {closable && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Dismiss banner"
            className="p-1 rounded-md opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-opacity cursor-pointer"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    </aside>
  )
}
