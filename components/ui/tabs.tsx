'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  )
}

export interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List> {
  variant?: 'subtle' | 'segmented' | 'line' | 'pills'
  size?: 'sm' | 'md' | 'lg'
}

function TabsList({
  className,
  variant = 'subtle',
  size = 'md',
  ...props
}: TabsListProps) {
  const variantClasses = {
    subtle: 'bg-[var(--surface-muted)]/70 p-1.5 rounded-2xl border border-[var(--outline-base)] shadow-2xs backdrop-blur-xs gap-1.5',
    segmented: 'bg-[var(--surface-muted)] p-1 rounded-xl border border-[var(--outline-base)]/60 shadow-inner gap-0.5',
    line: 'bg-transparent border-b border-[var(--outline-base)] p-0 rounded-none gap-6',
    pills: 'bg-transparent p-0 gap-2',
  }[variant]

  const sizeClasses = {
    sm: 'min-h-9 text-xs',
    md: 'min-h-10 text-xs',
    lg: 'min-h-12 text-sm',
  }[size]

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-size={size}
      className={cn(
        'group/tabs-list flex flex-wrap items-center justify-start text-[var(--ink-secondary)] select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
        variantClasses,
        sizeClasses,
        className
      )}
      {...props}
    />
  )
}

export interface TabsTriggerProps
  extends Omit<React.ComponentProps<typeof TabsPrimitive.Trigger>, 'prefix'> {
  prefix?: React.ReactNode
  badge?: React.ReactNode
}

function TabsTrigger({
  className,
  prefix,
  badge,
  children,
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 font-semibold transition-all outline-none cursor-pointer shrink-0',
        'text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-base)]/40',
        'focus-visible:ring-2 focus-visible:ring-[var(--outline-focus)]',
        'disabled:pointer-events-none disabled:opacity-50',
        // Subtle variant (Elevated floating tab card with crisp border)
        'group-data-[variant=subtle]/tabs-list:data-[state=active]:bg-[var(--surface-card)] group-data-[variant=subtle]/tabs-list:data-[state=active]:text-[var(--ink-primary)] group-data-[variant=subtle]/tabs-list:data-[state=active]:border group-data-[variant=subtle]/tabs-list:data-[state=active]:border-[var(--outline-base)] group-data-[variant=subtle]/tabs-list:data-[state=active]:shadow-xs',
        // Segmented variant (macOS style high contrast inset toggle)
        'group-data-[variant=segmented]/tabs-list:rounded-lg group-data-[variant=segmented]/tabs-list:px-3 group-data-[variant=segmented]/tabs-list:py-1 group-data-[variant=segmented]/tabs-list:data-[state=active]:bg-[var(--surface-card)] group-data-[variant=segmented]/tabs-list:data-[state=active]:text-[var(--ink-primary)] group-data-[variant=segmented]/tabs-list:data-[state=active]:shadow-xs group-data-[variant=segmented]/tabs-list:data-[state=active]:font-bold',
        // Line variant (Underline active indicator with glowing border)
        'group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:border-b-2 group-data-[variant=line]/tabs-list:border-transparent group-data-[variant=line]/tabs-list:data-[state=active]:border-[var(--brand-solid)] group-data-[variant=line]/tabs-list:data-[state=active]:text-[var(--brand-solid)] group-data-[variant=line]/tabs-list:px-1 group-data-[variant=line]/tabs-list:pb-2.5 group-data-[variant=line]/tabs-list:hover:bg-transparent',
        // Pills variant (Vibrant solid active pill with accent shadow)
        'group-data-[variant=pills]/tabs-list:data-[state=active]:bg-[var(--brand-solid)] group-data-[variant=pills]/tabs-list:data-[state=active]:text-white group-data-[variant=pills]/tabs-list:data-[state=active]:shadow-md group-data-[variant=pills]/tabs-list:data-[state=active]:shadow-[var(--brand-solid)]/25',
        className
      )}
      {...props}
    >
      {prefix && <span className="shrink-0 size-4 flex items-center justify-center">{prefix}</span>}
      <span>{children}</span>
      {badge && <span className="shrink-0">{badge}</span>}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none mt-2 animate-in fade-in-0 duration-200', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
