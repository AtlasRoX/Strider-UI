'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { X, Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeColor, ComponentVariant } from '@/lib/theme-types'
import { toast } from 'sonner'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium w-fit whitespace-nowrap shrink-0 transition-all select-none [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        solid: 'text-white border-transparent',
        outline: 'border bg-transparent',
        subtle: 'border-transparent',
        ghost: 'bg-transparent text-[var(--ink-primary)]',
        // Backward-compat aliases
        default: 'bg-[var(--brand-solid)] text-white border-transparent',
        secondary: 'bg-[var(--surface-muted)] text-[var(--ink-secondary)] border border-[var(--outline-base)]',
        destructive: 'bg-[var(--rose-solid)] text-white border-transparent',
      },
      theme: {
        brand: '',
        gray: '',
        blue: '',
        emerald: '',
        amber: '',
        rose: '',
        violet: '',
      },
      size: {
        sm: 'text-[10px] px-1.5 py-0.5 rounded-sm gap-1 [&>svg]:size-2.5',
        md: 'text-xs px-2 py-0.5 rounded-md gap-1.5 [&>svg]:size-3',
        lg: 'text-sm px-2.5 py-1 rounded-md gap-1.5 [&>svg]:size-3.5',
      },
    },
    compoundVariants: [
      // Solid
      { variant: 'solid', theme: 'brand', className: 'bg-[var(--brand-solid)] text-white shadow-xs' },
      { variant: 'solid', theme: 'gray', className: 'bg-[var(--gray-solid)] text-white shadow-xs' },
      { variant: 'solid', theme: 'blue', className: 'bg-[var(--blue-solid)] text-white shadow-xs' },
      { variant: 'solid', theme: 'emerald', className: 'bg-[var(--emerald-solid)] text-white shadow-xs' },
      { variant: 'solid', theme: 'amber', className: 'bg-[var(--amber-solid)] text-[var(--ink-primary)] shadow-xs' },
      { variant: 'solid', theme: 'rose', className: 'bg-[var(--rose-solid)] text-white shadow-xs' },
      { variant: 'solid', theme: 'violet', className: 'bg-[var(--violet-solid)] text-white shadow-xs' },

      // Outline
      { variant: 'outline', theme: 'brand', className: 'border-[var(--brand-outline)] text-[var(--brand-solid)]' },
      { variant: 'outline', theme: 'gray', className: 'border-[var(--outline-base)] text-[var(--ink-secondary)]' },
      { variant: 'outline', theme: 'blue', className: 'border-[var(--blue-outline)] text-[var(--blue-solid)]' },
      { variant: 'outline', theme: 'emerald', className: 'border-[var(--emerald-outline)] text-[var(--emerald-solid)]' },
      { variant: 'outline', theme: 'amber', className: 'border-[var(--amber-outline)] text-[var(--amber-ink)]' },
      { variant: 'outline', theme: 'rose', className: 'border-[var(--rose-outline)] text-[var(--rose-solid)]' },
      { variant: 'outline', theme: 'violet', className: 'border-[var(--violet-outline)] text-[var(--violet-solid)]' },

      // Subtle
      { variant: 'subtle', theme: 'brand', className: 'bg-[var(--brand-subtle)] text-[var(--brand-ink)]' },
      { variant: 'subtle', theme: 'gray', className: 'bg-[var(--gray-subtle)] text-[var(--gray-ink)]' },
      { variant: 'subtle', theme: 'blue', className: 'bg-[var(--blue-subtle)] text-[var(--blue-ink)]' },
      { variant: 'subtle', theme: 'emerald', className: 'bg-[var(--emerald-subtle)] text-[var(--emerald-ink)]' },
      { variant: 'subtle', theme: 'amber', className: 'bg-[var(--amber-subtle)] text-[var(--amber-ink)]' },
      { variant: 'subtle', theme: 'rose', className: 'bg-[var(--rose-subtle)] text-[var(--rose-ink)]' },
      { variant: 'subtle', theme: 'violet', className: 'bg-[var(--violet-subtle)] text-[var(--violet-ink)]' },
    ],
    defaultVariants: {
      variant: 'subtle',
      theme: 'brand',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'prefix'>,
    Omit<VariantProps<typeof badgeVariants>, 'variant' | 'theme'> {
  variant?: ComponentVariant | 'default' | 'secondary' | 'destructive'
  theme?: ThemeColor
  asChild?: boolean
  dot?: boolean | string
  pulse?: boolean
  removable?: boolean
  onRemove?: (e?: React.MouseEvent) => void
  copyable?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  label?: React.ReactNode
}

const DOT_THEMES: Record<string, string> = {
  brand: 'bg-[var(--brand-solid)]',
  gray: 'bg-[var(--ink-secondary)]',
  blue: 'bg-[var(--blue-solid)]',
  emerald: 'bg-[var(--emerald-solid)]',
  amber: 'bg-[var(--amber-solid)]',
  rose: 'bg-[var(--rose-solid)]',
  violet: 'bg-[var(--violet-solid)]',
}

function Badge({
  className,
  variant = 'subtle',
  theme = 'brand',
  size = 'md',
  asChild = false,
  dot,
  pulse = false,
  removable = false,
  onRemove,
  copyable = false,
  prefix,
  suffix,
  label,
  children,
  onClick,
  ...props
}: BadgeProps) {
  const [copied, setCopied] = React.useState(false)
  const Comp = asChild ? Slot : 'span'

  // Backward-compat mapping
  let resolvedVariant: any = variant
  let resolvedTheme: any = theme

  if (variant === 'destructive') {
    resolvedVariant = 'solid'
    resolvedTheme = 'rose'
  } else if (variant === 'secondary') {
    resolvedVariant = 'subtle'
    resolvedTheme = 'gray'
  } else if (variant === 'default') {
    resolvedVariant = 'subtle'
    resolvedTheme = 'brand'
  }

  const dotColorClass =
    typeof dot === 'string'
      ? dot
      : DOT_THEMES[resolvedTheme as string] || 'bg-current'

  const handleCopy = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!copyable) return
    const textToCopy = typeof children === 'string' ? children : String(label || '')
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      toast.success(`Copied "${textToCopy}"`)
      setTimeout(() => setCopied(false), 2000)
    }
    onClick?.(e)
  }

  if (asChild) {
    return (
      <Slot
        data-slot="badge"
        data-variant={resolvedVariant}
        data-theme={resolvedTheme}
        className={cn(badgeVariants({ variant: resolvedVariant, theme: resolvedTheme, size }), className)}
        {...props}
      >
        {children}
      </Slot>
    )
  }

  return (
    <span
      data-slot="badge"
      data-variant={resolvedVariant}
      data-theme={resolvedTheme}
      onClick={copyable ? handleCopy : onClick}
      className={cn(
        badgeVariants({ variant: resolvedVariant, theme: resolvedTheme, size }),
        copyable && 'cursor-pointer hover:opacity-85 active:scale-95 transition-transform',
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'size-1.5 rounded-full shrink-0',
            pulse ? 'animate-pulse' : '',
            dotColorClass
          )}
          aria-hidden="true"
        />
      )}
      {prefix}
      {label || children}
      {copyable && (
        <span className="ml-1 opacity-70">
          {copied ? <Check className="size-2.5 text-emerald-500" /> : <Copy className="size-2.5" />}
        </span>
      )}
      {suffix}
      {removable && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            onRemove?.(e as unknown as React.MouseEvent)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation()
              e.preventDefault()
              onRemove?.()
            }
          }}
          className="ml-0.5 -mr-0.5 rounded-xs p-0.5 opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 transition-opacity cursor-pointer"
        >
          <X className="size-2.5" />
        </span>
      )}
    </span>
  )
}

export { Badge, badgeVariants }
