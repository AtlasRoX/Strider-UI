'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const buttonGroupVariants = cva(
  'inline-flex items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative',
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      attached: {
        true: '',
        false: 'gap-2',
      },
      fluid: {
        true: 'w-full [&>*]:flex-1',
        false: 'w-fit',
      },
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        attached: true,
        className:
          '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:-ml-[1px] [&>*:not(:last-child)]:rounded-r-none',
      },
      {
        orientation: 'vertical',
        attached: true,
        className:
          '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:-mt-[1px] [&>*:not(:last-child)]:rounded-b-none',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      attached: true,
      fluid: false,
    },
  }
)

export interface ButtonGroupProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof buttonGroupVariants> {}

function ButtonGroup({
  className,
  orientation = 'horizontal',
  attached = true,
  fluid = false,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      data-attached={attached ? 'true' : undefined}
      data-fluid={fluid ? 'true' : undefined}
      className={cn(buttonGroupVariants({ orientation, attached, fluid }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-slot="button-group-text"
      className={cn(
        'bg-[var(--surface-muted)] text-[var(--ink-secondary)] flex items-center gap-2 rounded-md border border-[var(--outline-base)] px-3 text-sm font-medium shadow-xs select-none',
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        'bg-[var(--outline-base)] relative !m-0 self-stretch data-[orientation=vertical]:h-auto',
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
