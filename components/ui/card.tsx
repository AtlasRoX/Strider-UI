import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'flex flex-col rounded-2xl transition-all duration-150 text-[var(--ink-primary)]',
  {
    variants: {
      variant: {
        outline: 'border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-xs',
        subtle: 'border-transparent bg-[var(--surface-muted)]',
        elevated: 'border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-lg shadow-black/5 dark:shadow-black/20',
        ghost: 'border-transparent bg-transparent',
      },
      hoverable: {
        true: 'hover:border-[var(--outline-focus)]/50 hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'outline',
      hoverable: false,
    },
  }
)

export interface CardProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant = 'outline', hoverable = false, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      data-hoverable={hoverable ? 'true' : undefined}
      className={cn(cardVariants({ variant, hoverable }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-6 pb-3', className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn('text-base font-semibold leading-none text-[var(--ink-primary)] tracking-tight', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-xs text-[var(--ink-secondary)] leading-normal', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('flex items-center justify-end gap-2', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-6 pt-3 flex-1', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center gap-2 p-6 pt-3 border-t border-[var(--outline-muted)]', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
