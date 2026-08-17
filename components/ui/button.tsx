'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeColor, ComponentVariant } from '@/lib/theme-types'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all select-none rounded-md outline-none shrink-0 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        solid: 'text-white shadow-xs focus-visible:ring-2 focus-visible:ring-offset-2',
        outline: 'border bg-transparent shadow-xs hover:bg-[var(--surface-subtle)] focus-visible:ring-2 focus-visible:ring-offset-2',
        subtle: 'focus-visible:ring-2 focus-visible:ring-offset-2',
        ghost: 'bg-transparent hover:bg-[var(--surface-subtle)] text-[var(--ink-primary)] focus-visible:ring-2',
        link: 'underline-offset-4 hover:underline p-0 h-auto font-normal focus-visible:ring-2',
        // Backward-compat aliases
        default: 'bg-[var(--brand-solid)] text-white shadow-xs hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--outline-focus)]',
        destructive: 'bg-[var(--rose-solid)] text-white shadow-xs hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--rose-solid)]',
        secondary: 'bg-[var(--surface-muted)] text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] border border-[var(--outline-base)]',
      },
      theme: {
        brand: 'focus-visible:ring-[var(--outline-focus)]',
        gray: 'focus-visible:ring-[var(--ink-secondary)]',
        blue: 'focus-visible:ring-[var(--blue-solid)]',
        emerald: 'focus-visible:ring-[var(--emerald-solid)]',
        amber: 'focus-visible:ring-[var(--amber-solid)]',
        rose: 'focus-visible:ring-[var(--rose-solid)]',
        violet: 'focus-visible:ring-[var(--violet-solid)]',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs gap-1.5 rounded-sm',
        sm: 'h-8 px-3 text-xs gap-1.5 rounded-md',
        md: 'h-9 px-4 text-sm gap-2 rounded-md',
        lg: 'h-10 px-5 text-base gap-2.5 rounded-lg',
        default: 'h-9 px-4 py-2 text-sm gap-2 rounded-md',
        icon: 'size-9 p-0 rounded-md',
        'icon-sm': 'size-8 p-0 rounded-md',
        'icon-lg': 'size-10 p-0 rounded-lg',
      },
    },
    compoundVariants: [
      // Solid Variants
      { variant: 'solid', theme: 'brand', className: 'bg-[var(--brand-solid)] text-white hover:opacity-90' },
      { variant: 'solid', theme: 'gray', className: 'bg-[var(--gray-solid)] text-white hover:opacity-90' },
      { variant: 'solid', theme: 'blue', className: 'bg-[var(--blue-solid)] text-white hover:opacity-90' },
      { variant: 'solid', theme: 'emerald', className: 'bg-[var(--emerald-solid)] text-white hover:opacity-90' },
      { variant: 'solid', theme: 'amber', className: 'bg-[var(--amber-solid)] text-[var(--ink-primary)] hover:opacity-90' },
      { variant: 'solid', theme: 'rose', className: 'bg-[var(--rose-solid)] text-white hover:opacity-90' },
      { variant: 'solid', theme: 'violet', className: 'bg-[var(--violet-solid)] text-white hover:opacity-90' },

      // Outline Variants
      { variant: 'outline', theme: 'brand', className: 'border-[var(--brand-outline)] text-[var(--brand-solid)] hover:bg-[var(--brand-subtle)]' },
      { variant: 'outline', theme: 'gray', className: 'border-[var(--outline-base)] text-[var(--ink-primary)] hover:bg-[var(--surface-muted)]' },
      { variant: 'outline', theme: 'blue', className: 'border-[var(--blue-outline)] text-[var(--blue-solid)] hover:bg-[var(--blue-subtle)]' },
      { variant: 'outline', theme: 'emerald', className: 'border-[var(--emerald-outline)] text-[var(--emerald-solid)] hover:bg-[var(--emerald-subtle)]' },
      { variant: 'outline', theme: 'amber', className: 'border-[var(--amber-outline)] text-[var(--amber-solid)] hover:bg-[var(--amber-subtle)]' },
      { variant: 'outline', theme: 'rose', className: 'border-[var(--rose-outline)] text-[var(--rose-solid)] hover:bg-[var(--rose-subtle)]' },
      { variant: 'outline', theme: 'violet', className: 'border-[var(--violet-outline)] text-[var(--violet-solid)] hover:bg-[var(--violet-subtle)]' },

      // Subtle Variants
      { variant: 'subtle', theme: 'brand', className: 'bg-[var(--brand-subtle)] text-[var(--brand-ink)] hover:bg-[var(--brand-subtle-hover)]' },
      { variant: 'subtle', theme: 'gray', className: 'bg-[var(--gray-subtle)] text-[var(--gray-ink)] hover:bg-[var(--gray-subtle-hover)]' },
      { variant: 'subtle', theme: 'blue', className: 'bg-[var(--blue-subtle)] text-[var(--blue-ink)] hover:bg-[var(--blue-subtle-hover)]' },
      { variant: 'subtle', theme: 'emerald', className: 'bg-[var(--emerald-subtle)] text-[var(--emerald-ink)] hover:bg-[var(--emerald-subtle-hover)]' },
      { variant: 'subtle', theme: 'amber', className: 'bg-[var(--amber-subtle)] text-[var(--amber-ink)] hover:bg-[var(--amber-subtle-hover)]' },
      { variant: 'subtle', theme: 'rose', className: 'bg-[var(--rose-subtle)] text-[var(--rose-ink)] hover:bg-[var(--rose-subtle-hover)]' },
      { variant: 'subtle', theme: 'violet', className: 'bg-[var(--violet-subtle)] text-[var(--violet-ink)] hover:bg-[var(--violet-subtle-hover)]' },

      // Ghost Variants
      { variant: 'ghost', theme: 'brand', className: 'text-[var(--brand-solid)] hover:bg-[var(--brand-subtle)]' },
      { variant: 'ghost', theme: 'rose', className: 'text-[var(--rose-solid)] hover:bg-[var(--rose-subtle)]' },
      { variant: 'ghost', theme: 'emerald', className: 'text-[var(--emerald-solid)] hover:bg-[var(--emerald-subtle)]' },
      { variant: 'ghost', theme: 'blue', className: 'text-[var(--blue-solid)] hover:bg-[var(--blue-subtle)]' },

      // Link Variants
      { variant: 'link', theme: 'brand', className: 'text-[var(--brand-solid)]' },
      { variant: 'link', theme: 'gray', className: 'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]' },
      { variant: 'link', theme: 'blue', className: 'text-[var(--blue-solid)]' },
      { variant: 'link', theme: 'rose', className: 'text-[var(--rose-solid)]' },
    ],
    defaultVariants: {
      variant: 'solid',
      theme: 'brand',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'>,
    Omit<VariantProps<typeof buttonVariants>, 'variant' | 'theme'> {
  variant?: ComponentVariant | 'default' | 'destructive' | 'secondary'
  theme?: ThemeColor
  asChild?: boolean
  loading?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  icon?: LucideIcon | React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'solid',
      theme = 'brand',
      size = 'md',
      asChild = false,
      loading = false,
      prefix,
      suffix,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    // Backward-compat mapping for legacy variant strings
    let resolvedVariant: any = variant
    let resolvedTheme: any = theme

    if (variant === 'destructive') {
      resolvedVariant = 'solid'
      resolvedTheme = 'rose'
    } else if (variant === 'secondary') {
      resolvedVariant = 'subtle'
      resolvedTheme = 'gray'
    } else if (variant === 'default') {
      resolvedVariant = 'solid'
      resolvedTheme = 'brand'
    }

    const isIconOnly = size === 'icon' || size === 'icon-sm' || size === 'icon-lg'

    const renderIcon = () => {
      if (!icon) return null
      if (typeof icon === 'function') {
        const IconComponent = icon as LucideIcon
        return <IconComponent className="size-4 shrink-0" />
      }
      return icon
    }

    if (asChild) {
      return (
        <Slot
          ref={ref}
          data-slot="button"
          data-variant={resolvedVariant}
          data-theme={resolvedTheme}
          data-loading={loading ? 'true' : undefined}
          aria-busy={loading ? 'true' : undefined}
          className={cn(
            buttonVariants({
              variant: resolvedVariant,
              theme: resolvedTheme,
              size,
              className,
            })
          )}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        ref={ref}
        data-slot="button"
        data-variant={resolvedVariant}
        data-theme={resolvedTheme}
        data-loading={loading ? 'true' : undefined}
        aria-busy={loading ? 'true' : undefined}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({
            variant: resolvedVariant,
            theme: resolvedTheme,
            size,
            className,
          })
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin shrink-0" />
        ) : (
          prefix || renderIcon()
        )}
        {!isIconOnly && children}
        {!loading && suffix}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { buttonVariants }
