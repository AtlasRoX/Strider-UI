'use client'

import * as React from 'react'
import { useIsMobile } from '@/components/ui/use-mobile'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'

export interface ResponsiveDialogProps {
  /** Controls open visibility */
  open?: boolean
  /** Initial open state in uncontrolled mode */
  defaultOpen?: boolean
  /** Callback on visibility change */
  onOpenChange?: (open: boolean) => void
  /** Dialog / Drawer title */
  title?: React.ReactNode
  /** Dialog / Drawer description */
  description?: React.ReactNode
  /** Trigger element opening the modal */
  trigger?: React.ReactNode
  /** Main body content */
  children?: React.ReactNode
  /** Footer content (buttons/actions) */
  footer?: React.ReactNode
  /** Dialog size on desktop: 'sm' | 'md' | 'lg' | 'xl' */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Whether modal closes on backdrop click / Escape */
  dismissible?: boolean
  /** Custom wrapper class */
  className?: string
}

/**
 * ResponsiveDialog
 * Seamlessly adapts between a Radix Modal Dialog on desktop (≥768px) and a gesture-driven
 * Vaul Bottom Drawer on mobile touch devices. Eliminates responsive modal boilerplate.
 */
export function ResponsiveDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  title,
  description,
  trigger,
  children,
  footer,
  size = 'md',
  dismissible = true,
  className,
}: ResponsiveDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={handleOpenChange}
        dismissible={dismissible}
      >
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent className={cn('p-4', className)}>
          {(title || description) && (
            <DrawerHeader>
              {title && <DrawerTitle>{title}</DrawerTitle>}
              {description && <DrawerDescription>{description}</DrawerDescription>}
            </DrawerHeader>
          )}
          <DrawerBody className="p-0 py-3">{children}</DrawerBody>
          {footer && <DrawerFooter className="p-0 pt-3">{footer}</DrawerFooter>}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent size={size} dismissible={dismissible} className={className}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <DialogBody>{children}</DialogBody>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
