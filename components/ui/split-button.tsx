'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ThemeColor, ComponentVariant } from '@/lib/theme-types'
import { ChevronDown } from 'lucide-react'

export interface SplitButtonOption {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  destructive?: boolean
  disabled?: boolean
}

export interface SplitButtonProps {
  label: React.ReactNode
  onClick?: () => void
  options: SplitButtonOption[]
  theme?: ThemeColor
  variant?: ComponentVariant
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
}

export function SplitButton({
  label,
  onClick,
  options = [],
  theme = 'brand',
  variant = 'solid',
  size = 'sm',
  disabled = false,
  loading = false,
  className,
}: SplitButtonProps) {
  return (
    <div
      data-slot="split-button"
      className={cn('inline-flex items-stretch rounded-lg shadow-2xs', className)}
    >
      {/* Primary Action Button */}
      <Button
        variant={variant}
        theme={theme}
        size={size}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
        className="rounded-r-none border-r border-black/15 dark:border-white/15"
      >
        {label}
      </Button>

      {/* Dropdown Chevron Trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            theme={theme}
            size={size}
            disabled={disabled || loading}
            aria-label="More options"
            className="rounded-l-none px-2 shrink-0 border-l-0"
          >
            <ChevronDown className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={6} className="w-48 z-50">
          {options.map((opt, idx) => (
            <DropdownMenuItem
              key={opt.label + idx}
              onSelect={opt.onClick}
              onClick={opt.onClick}
              disabled={opt.disabled}
              variant={opt.destructive ? 'destructive' : 'default'}
              prefix={opt.icon}
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
