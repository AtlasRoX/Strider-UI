'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check, ShieldCheck, RefreshCw, RotateCcw } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'

export interface CaptchaProps extends React.HTMLAttributes<HTMLDivElement> {
  onVerify?: (token: string) => void
  onReset?: () => void
  label?: string
  siteName?: string
  allowReset?: boolean
}

export function Captcha({
  onVerify,
  onReset,
  label = 'Verify you are human',
  siteName = 'Strider Shield',
  allowReset = true,
  className,
  ...props
}: CaptchaProps) {
  const [status, setStatus] = React.useState<'idle' | 'verifying' | 'verified'>('idle')

  const handleTrigger = () => {
    if (status !== 'idle') return
    setStatus('verifying')

    setTimeout(() => {
      setStatus('verified')
      onVerify?.(`token_${Math.random().toString(36).substring(2, 10)}`)
    }, 1000)
  }

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation()
    setStatus('idle')
    onReset?.()
  }

  return (
    <div
      data-slot="captcha"
      className={cn(
        'inline-flex items-center justify-between gap-6 px-4 py-3 rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-xs select-none min-w-[300px]',
        className
      )}
      {...props}
    >
      {/* Checkbox Trigger */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleTrigger}
          disabled={status !== 'idle'}
          className={cn(
            'size-7 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)]',
            status === 'idle'
              ? 'border-[var(--outline-base)] hover:border-[var(--brand-solid)] bg-[var(--surface-base)]'
              : status === 'verifying'
              ? 'border-[var(--brand-solid)] bg-[var(--surface-base)]'
              : 'border-emerald-500 bg-emerald-500 text-white'
          )}
          aria-label={label}
        >
          {status === 'verifying' && <Spinner size="xs" theme="brand" />}
          {status === 'verified' && <Check className="size-4 stroke-[3]" />}
        </button>

        <span className="text-xs font-semibold text-[var(--ink-primary)]">
          {status === 'verified' ? 'Verification complete' : status === 'verifying' ? 'Verifying challenge...' : label}
        </span>
      </div>

      {/* Brand Badge & Reset Action */}
      <div className="flex items-center gap-3">
        {status === 'verified' && allowReset && (
          <button
            type="button"
            onClick={handleReset}
            className="size-6 rounded-md hover:bg-[var(--surface-muted)] flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink-primary)] transition-colors cursor-pointer"
            title="Reset verification challenge"
            aria-label="Reset challenge"
          >
            <RotateCcw className="size-3" />
          </button>
        )}

        <div className="flex flex-col items-end gap-0.5 text-[9px] text-[var(--ink-muted)]">
          <div className="flex items-center gap-1 font-bold tracking-wider text-[var(--ink-secondary)]">
            <ShieldCheck className="size-3 text-[var(--brand-solid)]" />
            <span>{siteName}</span>
          </div>
          <span>Enterprise AI Guard</span>
        </div>
      </div>
    </div>
  )
}
