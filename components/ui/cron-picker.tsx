'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Copy, Check, Calendar, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'

export interface CronPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (cron: string, humanDescription: string) => void
}

interface CronPreset {
  label: string
  cron: string
  description: string
}

const CRON_PRESETS: CronPreset[] = [
  { label: 'Every 5 Min', cron: '*/5 * * * *', description: 'Every 5 minutes' },
  { label: 'Hourly', cron: '0 * * * *', description: 'At minute 0 of every hour' },
  { label: 'Daily (Midnight)', cron: '0 0 * * *', description: 'Every day at 00:00 UTC' },
  { label: 'Weekdays 9 AM', cron: '0 9 * * 1-5', description: 'At 09:00 UTC, Monday through Friday' },
  { label: 'Monthly (1st)', cron: '0 0 1 * *', description: 'At 00:00 on the 1st day of every month' },
]

export function CronPicker({
  value: controlledValue,
  defaultValue = '0 9 * * 1-5',
  onChange,
  className,
  ...props
}: CronPickerProps) {
  const [cron, setCron] = React.useState(controlledValue || defaultValue)
  const [copied, setCopied] = React.useState(false)

  const isControlled = controlledValue !== undefined
  const activeCron = isControlled ? controlledValue : cron

  // Parse simple cron parts
  const parts = activeCron.split(' ')
  const minute = parts[0] || '*'
  const hour = parts[1] || '*'
  const dayOfMonth = parts[2] || '*'
  const month = parts[3] || '*'
  const dayOfWeek = parts[4] || '*'

  const getHumanDescription = (expr: string): string => {
    const found = CRON_PRESETS.find((p) => p.cron === expr)
    if (found) return found.description
    if (expr === '* * * * *') return 'Every minute'
    if (expr.startsWith('*/')) return `Every ${expr.split(' ')[0].replace('*/', '')} minutes`
    return `Custom execution schedule: (${expr})`
  }

  const humanText = getHumanDescription(activeCron)

  const handlePresetSelect = (preset: CronPreset) => {
    if (!isControlled) setCron(preset.cron)
    onChange?.(preset.cron, preset.description)
    toast.info(`Selected schedule: ${preset.label}`)
  }

  const handleCopyCron = async () => {
    try {
      await navigator.clipboard.writeText(activeCron)
      setCopied(true)
      toast.success('Copied cron expression to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy cron')
    }
  }

  return (
    <div
      data-slot="cron-picker"
      className={cn(
        'flex flex-col gap-4 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold">
            <Clock className="size-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--ink-primary)]">Cron Schedule Builder</h4>
            <span className="text-[11px] text-[var(--ink-muted)]">
              Visual generator for recurring headless task runners
            </span>
          </div>
        </div>

        <Badge variant="subtle" theme="brand" size="sm">
          UTC Standard
        </Badge>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-semibold text-[var(--ink-muted)] mr-1">Presets:</span>
        {CRON_PRESETS.map((p) => (
          <button
            key={p.cron}
            type="button"
            onClick={() => handlePresetSelect(p)}
            className={cn(
              'px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer',
              activeCron === p.cron
                ? 'bg-[var(--brand-solid)] text-white border-[var(--brand-solid)] shadow-xs'
                : 'bg-[var(--surface-base)] text-[var(--ink-secondary)] border-[var(--outline-base)] hover:bg-[var(--surface-muted)]'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Cron Raw Segment Display */}
      <div className="grid grid-cols-5 gap-2 text-center text-xs">
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[var(--surface-base)] border border-[var(--outline-base)]">
          <span className="text-[10px] text-[var(--ink-muted)] uppercase tracking-wider">Minute</span>
          <span className="font-mono font-bold text-sm text-[var(--brand-solid)]">{minute}</span>
        </div>
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[var(--surface-base)] border border-[var(--outline-base)]">
          <span className="text-[10px] text-[var(--ink-muted)] uppercase tracking-wider">Hour</span>
          <span className="font-mono font-bold text-sm text-[var(--brand-solid)]">{hour}</span>
        </div>
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[var(--surface-base)] border border-[var(--outline-base)]">
          <span className="text-[10px] text-[var(--ink-muted)] uppercase tracking-wider">Day (Month)</span>
          <span className="font-mono font-bold text-sm text-[var(--brand-solid)]">{dayOfMonth}</span>
        </div>
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[var(--surface-base)] border border-[var(--outline-base)]">
          <span className="text-[10px] text-[var(--ink-muted)] uppercase tracking-wider">Month</span>
          <span className="font-mono font-bold text-sm text-[var(--brand-solid)]">{month}</span>
        </div>
        <div className="flex flex-col gap-1 p-2.5 rounded-xl bg-[var(--surface-base)] border border-[var(--outline-base)]">
          <span className="text-[10px] text-[var(--ink-muted)] uppercase tracking-wider">Day (Week)</span>
          <span className="font-mono font-bold text-sm text-[var(--brand-solid)]">{dayOfWeek}</span>
        </div>
      </div>

      {/* Natural Language Output Box & Copy */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[var(--surface-muted)]/70 border border-[var(--outline-base)] text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <Calendar className="size-4 text-[var(--brand-solid)] shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[var(--ink-primary)] truncate">{humanText}</span>
            <span className="font-mono text-[10px] text-[var(--ink-muted)] truncate">{activeCron}</span>
          </div>
        </div>

        <Button
          variant="outline"
          theme="gray"
          size="xs"
          onClick={handleCopyCron}
          prefix={copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  )
}
