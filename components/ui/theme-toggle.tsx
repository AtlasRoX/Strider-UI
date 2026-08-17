'use client'

import * as React from 'react'
import { Moon, Sun, Monitor, Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface ThemeToggleProps {
  /**
   * Display mode:
   * - 'toggle': Direct 1-click toggle between light and dark with tooltip (default)
   * - 'dropdown': Dropdown menu with Light, Dark, System options
   * - 'segmented': Segmented 3-button control (Light / Dark / System)
   */
  variant?: 'toggle' | 'dropdown' | 'segmented'
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon'
  /** Additional CSS class names */
  className?: string
}

/**
 * ThemeToggle
 * Versatile Light / Dark / System theme switcher for Strider UI.
 * By default, provides an instant 1-click toggle between light and dark mode with smooth icon transitions.
 */
export function ThemeToggle({
  variant = 'toggle',
  size = 'sm',
  className,
}: ThemeToggleProps) {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        theme="gray"
        size={size === 'icon' ? 'sm' : size}
        className={cn('size-9 p-0', className)}
        disabled
        aria-label="Toggle theme"
      >
        <span className="size-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  // Variant 1: Direct 1-click toggle (Default)
  if (variant === 'toggle') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            theme="gray"
            size={size === 'icon' ? 'sm' : size}
            className={cn(
              'size-9 p-0 rounded-xl relative overflow-hidden transition-all duration-200 hover:border-[var(--brand-solid)]',
              className
            )}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
          >
            <Sun
              className={cn(
                'size-4 text-amber-500 transition-all duration-300 transform',
                isDark ? 'rotate-90 scale-0 opacity-0 absolute' : 'rotate-0 scale-100 opacity-100'
              )}
            />
            <Moon
              className={cn(
                'size-4 text-[var(--brand-solid)] transition-all duration-300 transform',
                isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0 absolute'
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <span>{isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}</span>
        </TooltipContent>
      </Tooltip>
    )
  }

  // Variant 2: Segmented 3-button control
  if (variant === 'segmented') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-0.5 p-1 rounded-xl bg-[var(--surface-muted)] border border-[var(--outline-base)] text-xs',
          className
        )}
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all duration-150',
            theme === 'light'
              ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-sm'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
          )}
        >
          <Sun className="size-3.5 text-amber-500" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all duration-150',
            theme === 'dark'
              ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-sm'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
          )}
        >
          <Moon className="size-3.5 text-[var(--brand-solid)]" />
          <span>Dark</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme('system')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all duration-150',
            theme === 'system'
              ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-sm'
              : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
          )}
        >
          <Monitor className="size-3.5 text-[var(--ink-secondary)]" />
          <span>System</span>
        </button>
      </div>
    )
  }

  // Variant 3: Dropdown Menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          theme="gray"
          size={size === 'icon' ? 'sm' : size}
          className={cn('size-9 p-0 rounded-xl relative overflow-hidden', className)}
          aria-label="Toggle theme menu"
        >
          <Sun
            className={cn(
              'size-4 text-amber-500 transition-all duration-300 transform',
              isDark ? 'rotate-90 scale-0 opacity-0 absolute' : 'rotate-0 scale-100 opacity-100'
            )}
          />
          <Moon
            className={cn(
              'size-4 text-[var(--brand-solid)] transition-all duration-300 transform',
              isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0 absolute'
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="gap-2 cursor-pointer"
        >
          <Sun className="size-4 text-amber-500" />
          <span className="flex-1">Light</span>
          {theme === 'light' && <Check className="size-3.5 text-[var(--brand-solid)]" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="gap-2 cursor-pointer"
        >
          <Moon className="size-4 text-[var(--brand-solid)]" />
          <span className="flex-1">Dark</span>
          {theme === 'dark' && <Check className="size-3.5 text-[var(--brand-solid)]" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="gap-2 cursor-pointer"
        >
          <Monitor className="size-4 text-[var(--ink-secondary)]" />
          <span className="flex-1">System</span>
          {theme === 'system' && <Check className="size-3.5 text-[var(--brand-solid)]" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
