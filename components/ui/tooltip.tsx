'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { Kbd } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'

function TooltipProvider({
  delayDuration = 200,
  skipDelayDuration = 300,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    />
  )
}

function TooltipRoot({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  arrow?: boolean
  shortcut?: string
}

function TooltipContent({
  className,
  sideOffset = 6,
  arrow = true,
  shortcut,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'z-50 max-w-xs overflow-hidden rounded-md bg-[var(--ink-primary)] px-2.5 py-1.5 text-xs text-[var(--ink-inverse)] shadow-md select-none',
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-1.5 data-[side=left]:slide-in-from-right-1.5 data-[side=right]:slide-in-from-left-1.5 data-[side=top]:slide-in-from-bottom-1.5',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <span>{children}</span>
          {shortcut && (
            <Kbd
              combo={shortcut}
              size="sm"
              className="bg-white/20 text-white border-transparent shadow-none"
            />
          )}
        </div>
        {arrow && (
          <TooltipPrimitive.Arrow
            className="fill-[var(--ink-primary)]"
            width={8}
            height={4}
          />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

/**
 * Tooltip
 * High-level shorthand wrapper or Compound Component Root.
 * Shorthand usage:
 * `<Tooltip text="Quick search" shortcut="Mod+K"><Button .../></Tooltip>`
 */
export interface TooltipProps extends React.ComponentProps<typeof TooltipPrimitive.Root> {
  text?: React.ReactNode
  content?: React.ReactNode
  shortcut?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  arrow?: boolean
}

function Tooltip({
  text,
  content,
  shortcut,
  side = 'top',
  align = 'center',
  arrow = true,
  children,
  ...props
}: TooltipProps) {
  const tooltipBody = text || content

  // If used as a shorthand wrapper around a trigger child
  if (tooltipBody) {
    return (
      <TooltipRoot {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align} arrow={arrow} shortcut={shortcut}>
          {tooltipBody}
        </TooltipContent>
      </TooltipRoot>
    )
  }

  // Compound component mode
  return <TooltipRoot {...props}>{children}</TooltipRoot>
}

export {
  Tooltip,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
}
