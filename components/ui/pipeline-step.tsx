'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  SkipForward,
  ChevronRight,
  FileText,
  AlertTriangle,
} from 'lucide-react'

export type StepStatus = 'pending' | 'running' | 'success' | 'failed' | 'skipped'

export interface PipelineStepProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  status?: StepStatus
  duration?: string
  startedAt?: string
  error?: string
  onRetry?: () => void
  onSkip?: () => void
  onViewLogs?: () => void
  active?: boolean
}

export function PipelineStep({
  name,
  status = 'pending',
  duration,
  startedAt,
  error,
  onRetry,
  onSkip,
  onViewLogs,
  active = false,
  className,
  ...props
}: PipelineStepProps) {
  const statusConfig = {
    pending: {
      badgeTheme: 'gray' as const,
      icon: <Clock className="size-4 text-[var(--ink-muted)]" />,
      label: 'Pending',
    },
    running: {
      badgeTheme: 'brand' as const,
      icon: <Spinner size="xs" theme="brand" />,
      label: 'Running',
    },
    success: {
      badgeTheme: 'emerald' as const,
      icon: <CheckCircle2 className="size-4 text-emerald-500" />,
      label: 'Passed',
    },
    failed: {
      badgeTheme: 'rose' as const,
      icon: <XCircle className="size-4 text-rose-500" />,
      label: 'Failed',
    },
    skipped: {
      badgeTheme: 'amber' as const,
      icon: <SkipForward className="size-4 text-amber-500" />,
      label: 'Skipped',
    },
  }[status]

  return (
    <div
      data-slot="pipeline-step"
      data-status={status}
      className={cn(
        'group flex flex-col gap-2 p-3.5 rounded-2xl border bg-[var(--surface-card)] transition-all duration-200 shadow-2xs select-none',
        active ? 'border-[var(--brand-solid)] ring-2 ring-[var(--brand-solid)]/20' : 'border-[var(--outline-base)]',
        status === 'failed' ? 'border-rose-500/40 bg-rose-500/5' : '',
        className
      )}
      {...props}
    >
      {/* Header: Step Name + Status */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {statusConfig.icon}
          <span className="font-bold text-xs text-[var(--ink-primary)] truncate">
            {name}
          </span>
        </div>

        <Badge variant="subtle" theme={statusConfig.badgeTheme} size="sm">
          {statusConfig.label}
        </Badge>
      </div>

      {/* Error Callout (if failed) */}
      {error && (
        <div className="text-[11px] text-rose-600 dark:text-rose-400 bg-rose-500/10 p-2 rounded-lg font-mono">
          {error}
        </div>
      )}

      {/* Meta Footer & Action Buttons */}
      <div className="flex items-center justify-between pt-1 border-t border-[var(--outline-base)]/40 text-[11px] text-[var(--ink-muted)] font-mono">
        <div className="flex items-center gap-2">
          {duration && <span>⏱ {duration}</span>}
          {startedAt && <span>{startedAt}</span>}
        </div>

        <div className="flex items-center gap-1">
          {onViewLogs && (
            <button
              type="button"
              onClick={onViewLogs}
              className="p-1 rounded hover:bg-[var(--surface-muted)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] cursor-pointer"
              title="View step logs"
            >
              <FileText className="size-3.5" />
            </button>
          )}

          {status === 'failed' && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="p-1 rounded hover:bg-rose-500/10 text-rose-500 cursor-pointer font-sans font-semibold text-[10px] flex items-center gap-1"
              title="Retry step"
            >
              <RotateCcw className="size-3" /> Retry
            </button>
          )}

          {status === 'pending' && onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="p-1 rounded hover:bg-[var(--surface-muted)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)] cursor-pointer"
              title="Skip step"
            >
              <SkipForward className="size-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
