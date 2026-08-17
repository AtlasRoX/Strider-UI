'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

export interface AccordionItemProps
  extends React.ComponentProps<typeof AccordionPrimitive.Item> {
  variant?: 'default' | 'separated' | 'subtle'
}

function AccordionItem({
  className,
  variant = 'default',
  ...props
}: AccordionItemProps) {
  const variantClasses = {
    default: 'border-b border-[var(--outline-base)] last:border-b-0',
    separated: 'border border-[var(--outline-base)] rounded-xl mb-2 bg-[var(--surface-card)] shadow-2xs overflow-hidden',
    subtle: 'bg-[var(--surface-muted)] rounded-xl mb-2 overflow-hidden',
  }[variant]

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      data-variant={variant}
      className={cn(variantClasses, className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'flex flex-1 items-center justify-between gap-4 py-3.5 px-4 text-left text-xs font-semibold text-[var(--ink-primary)] transition-all outline-none select-none',
          'hover:bg-[var(--surface-subtle)] focus-visible:ring-2 focus-visible:ring-[var(--outline-focus)] focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 shrink-0 text-[var(--ink-muted)] transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-xs text-[var(--ink-secondary)]"
      {...props}
    >
      <div className={cn('px-4 pb-4 pt-1 leading-relaxed', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
