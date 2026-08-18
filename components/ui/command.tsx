'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Kbd } from '@/components/ui/kbd'

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'flex h-full w-full flex-col overflow-hidden rounded-xl bg-[var(--surface-card)] text-[var(--ink-primary)]',
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command or item...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        size="lg"
        className={cn('overflow-hidden p-0 rounded-2xl border border-[var(--outline-base)] shadow-2xl', className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-[var(--ink-secondary)] **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-4 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-11 items-center gap-2.5 border-b border-[var(--outline-muted)] px-3.5"
    >
      <Search className="size-4 shrink-0 text-[var(--ink-muted)]" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          'w-full bg-transparent text-sm text-[var(--ink-primary)] outline-none placeholder:text-[var(--ink-muted)] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        'max-h-[320px] scroll-py-1 overflow-x-hidden overflow-y-auto p-1.5',
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-8 text-center text-xs text-[var(--ink-muted)]"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'overflow-hidden p-1 text-[var(--ink-primary)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[var(--ink-secondary)]',
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn('-mx-1 my-1 h-px bg-[var(--outline-muted)]', className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  prefix,
  shortcut,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CommandPrimitive.Item>, 'prefix'> & {
  prefix?: React.ReactNode
  shortcut?: string
}) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        'relative flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs outline-none transition-colors duration-150',
        'data-[selected=true]:bg-[var(--surface-muted)] data-[selected=true]:text-[var(--ink-primary)]',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        className
      )}
      {...props}
    >
      {prefix && <span className="shrink-0 text-[var(--ink-muted)]">{prefix}</span>}
      <span className="flex-1 truncate">{children}</span>
      {shortcut && <CommandShortcut combo={shortcut} />}
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  combo,
  children,
  ...props
}: React.ComponentProps<'span'> & { combo?: string }) {
  if (combo) {
    return <Kbd combo={combo} size="sm" className={cn('ml-auto text-[10px]', className)} />
  }

  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        'ml-auto text-[10px] tracking-widest text-[var(--ink-muted)]',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
