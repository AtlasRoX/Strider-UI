'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Toaster } from '@/components/ui/sonner'
import { DialogProvider } from '@/lib/dialog'
import { AgentationToolbar } from '@/components/ui/agentation'

export interface StriderUIProviderProps {
  children: React.ReactNode
  /** Default theme: 'light' | 'dark' | 'system' */
  defaultTheme?: string
  /** Enable system color scheme sync */
  enableSystem?: boolean
  /** Tooltip hover delay in ms */
  tooltipDelayDuration?: number
  /** Position for toast notifications */
  toastPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
  /** Enable visual feedback toolbar for AI coding agents (defaults to true in dev) */
  enableAgentation?: boolean
}

/**
 * StriderUIProvider
 * The foundational root provider for Strider UI applications.
 * Mounts the Theme Engine, Global Tooltip Provider, Imperative Dialog Service, Toaster, and Agentation Feedback Toolbar.
 */
export function StriderUIProvider({
  children,
  defaultTheme = 'light',
  enableSystem = true,
  tooltipDelayDuration = 200,
  toastPosition = 'bottom-right',
  enableAgentation = true,
}: StriderUIProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={tooltipDelayDuration} skipDelayDuration={300}>
        <DialogProvider>
          {children}
          <Toaster position={toastPosition} richColors />
          {enableAgentation && <AgentationToolbar />}
        </DialogProvider>
      </TooltipProvider>
    </NextThemesProvider>
  )
}
