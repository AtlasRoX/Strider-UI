'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface KbdProps extends React.ComponentProps<'kbd'> {
  combo?: string
  keys?: string | string[]
  size?: 'sm' | 'md'
}

/** Formats a key token to macOS or Windows symbol */
function formatKeyToken(token: string): string {
  const isMac = typeof window !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const t = token.trim()

  switch (t.toLowerCase()) {
    case 'mod':
    case 'cmd':
    case 'meta':
      return isMac ? '⌘' : 'Ctrl'
    case 'ctrl':
    case 'control':
      return isMac ? '⌃' : 'Ctrl'
    case 'alt':
    case 'option':
      return isMac ? '⌥' : 'Alt'
    case 'shift':
      return '⇧'
    case 'enter':
    case 'return':
      return '↵'
    case 'backspace':
      return '⌫'
    case 'esc':
    case 'escape':
      return 'Esc'
    case 'tab':
      return '⇥'
    case 'space':
      return '␣'
    case 'arrowup':
    case 'up':
      return '↑'
    case 'arrowdown':
    case 'down':
      return '↓'
    case 'arrowleft':
    case 'left':
      return '←'
    case 'arrowright':
    case 'right':
      return '→'
    default:
      return t.toUpperCase()
  }
}

function Kbd({
  className,
  combo,
  keys,
  size = 'md',
  children,
  ...props
}: KbdProps) {
  // Parse tokens from combo string (e.g. "Mod+Shift+K") or keys array
  let tokenList: string[] = []
  if (combo) {
    tokenList = combo.split('+').map((s) => formatKeyToken(s))
  } else if (keys) {
    tokenList = (Array.isArray(keys) ? keys : [keys]).map((s) => formatKeyToken(s))
  }

  const sizeClasses = {
    sm: 'h-4 min-w-4 text-[10px] px-1',
    md: 'h-5 min-w-5 text-xs px-1.5',
  }[size]

  if (tokenList.length > 1) {
    return (
      <span data-slot="kbd-group" className="inline-flex items-center gap-0.5">
        {tokenList.map((token, idx) => (
          <kbd
            key={idx}
            data-slot="kbd"
            className={cn(
              'bg-[var(--surface-muted)] text-[var(--ink-secondary)] border border-[var(--outline-base)] pointer-events-none inline-flex items-center justify-center rounded-sm font-sans font-medium select-none shadow-2xs',
              sizeClasses,
              className
            )}
          >
            {token}
          </kbd>
        ))}
      </span>
    )
  }

  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'bg-[var(--surface-muted)] text-[var(--ink-secondary)] border border-[var(--outline-base)] pointer-events-none inline-flex items-center justify-center gap-1 rounded-sm font-sans font-medium select-none shadow-2xs',
        sizeClasses,
        className
      )}
      {...props}
    >
      {tokenList.length === 1 ? tokenList[0] : children}
    </kbd>
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="kbd-group"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
