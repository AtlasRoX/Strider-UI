'use client'

import * as React from 'react'
import { Copy, Check } from 'lucide-react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'onCopy'> {
  /** The text string to copy to the clipboard */
  value: string
  /** Toast message displayed upon successful copy (false to disable) */
  successMessage?: string | false
  /** Tooltip label before copying */
  tooltipLabel?: string
  /** Tooltip label after copying */
  copiedTooltipLabel?: string
  /** Timeout in ms to revert the check icon back to copy */
  timeout?: number
  /** Callback fired after successful copy */
  onCopy?: (value: string) => void
}

/**
 * CopyButton
 * Zero-boilerplate clipboard copy button with animated icon transition,
 * built-in tooltip, and toast feedback. Adheres to P4 2-Axis styling.
 */
export function CopyButton({
  value,
  successMessage = 'Copied to clipboard',
  tooltipLabel = 'Copy to clipboard',
  copiedTooltipLabel = 'Copied!',
  timeout = 2000,
  onCopy,
  variant = 'ghost',
  theme = 'gray',
  size = 'xs',
  className,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()

    try {
      await navigator.clipboard.writeText(value)
      setHasCopied(true)
      onCopy?.(value)

      if (successMessage) {
        toast.success(successMessage)
      }

      setTimeout(() => {
        setHasCopied(false)
      }, timeout)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  const button = (
    <Button
      type="button"
      data-slot="copy-button"
      variant={variant}
      theme={hasCopied ? 'emerald' : theme}
      size={size}
      aria-label={hasCopied ? copiedTooltipLabel : tooltipLabel}
      onClick={handleCopy}
      className={cn('transition-transform active:scale-95 shrink-0', className)}
      {...props}
    >
      {hasCopied ? (
        <Check className="size-3.5 text-emerald-500 animate-in zoom-in-50 duration-150" />
      ) : (
        <Copy className="size-3.5 transition-opacity" />
      )}
    </Button>
  )

  if (!tooltipLabel) return button

  return (
    <Tooltip content={hasCopied ? copiedTooltipLabel : tooltipLabel}>
      {button}
    </Tooltip>
  )
}
