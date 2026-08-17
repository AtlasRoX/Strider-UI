'use client'

import * as React from 'react'
import { Agentation as AgentationBase } from 'agentation'

export interface AgentationToolbarProps {
  /** Force enable even in non-development environments */
  enabled?: boolean
  /** Whether to copy feedback markdown to clipboard on submit */
  copyToClipboard?: boolean
  /** Optional custom class name */
  className?: string
}

/**
 * AgentationToolbar
 * Visual annotation & feedback toolbar for AI coding agents (Claude Code, Antigravity, Cursor).
 * Allows clicking any UI element on localhost to annotate bugs, design tweaks, and code requests with
 * precise CSS selectors, component hierarchies, and computed DOM properties.
 */
export function AgentationToolbar({
  enabled,
  copyToClipboard = true,
  className,
}: AgentationToolbarProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!enabled && process.env.NODE_ENV === 'production') return null

  return <AgentationBase copyToClipboard={copyToClipboard} className={className} />
}

export { AgentationBase as Agentation }
