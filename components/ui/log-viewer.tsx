'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Terminal,
  Search,
  Trash2,
  Download,
  ArrowDownCircle,
  Check,
  Copy,
  AlertTriangle,
  Info,
  Bug,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'

export type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export interface LogEntry {
  id: string
  timestamp: string
  level: LogLevel
  message: string
  source?: string
  metadata?: Record<string, any>
}

export interface LogViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  logs: LogEntry[]
  title?: string
  autoScroll?: boolean
  maxHeight?: string | number
  onClear?: () => void
  showLevelTabs?: boolean
  showSearch?: boolean
}

export function LogViewer({
  logs = [],
  title = 'Server Logs',
  autoScroll: defaultAutoScroll = true,
  maxHeight = 360,
  onClear,
  showLevelTabs = true,
  showSearch = true,
  className,
  ...props
}: LogViewerProps) {
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [autoScroll, setAutoScroll] = React.useState(defaultAutoScroll)
  const [copied, setCopied] = React.useState(false)
  const logsContainerRef = React.useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new logs
  React.useEffect(() => {
    if (autoScroll && logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
    }
  }, [logs, autoScroll])

  const filteredLogs = React.useMemo(() => {
    return logs.filter((log) => {
      const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel
      const matchesQuery =
        !searchQuery ||
        log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.source && log.source.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesLevel && matchesQuery
    })
  }, [logs, selectedLevel, searchQuery])

  const handleCopyLogs = async () => {
    const text = filteredLogs
      .map((l) => `[${l.timestamp}] [${l.level.toUpperCase()}] ${l.source ? `(${l.source}) ` : ''}${l.message}`)
      .join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success('Logs copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy logs')
    }
  }

  const handleDownload = () => {
    const text = filteredLogs
      .map((l) => `[${l.timestamp}] [${l.level.toUpperCase()}] ${l.source ? `(${l.source}) ` : ''}${l.message}`)
      .join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `logs-${Date.now()}.log`
    a.click()
  }

  const levelColor = {
    info: 'text-blue-500 dark:text-blue-400 bg-blue-500/10',
    warn: 'text-amber-500 dark:text-amber-400 bg-amber-500/10',
    error: 'text-rose-500 dark:text-rose-400 bg-rose-500/10',
    debug: 'text-violet-500 dark:text-violet-400 bg-violet-500/10',
  }

  const levelIcons = {
    info: <Info className="size-3 shrink-0" />,
    warn: <AlertTriangle className="size-3 shrink-0" />,
    error: <AlertCircle className="size-3 shrink-0" />,
    debug: <Bug className="size-3 shrink-0" />,
  }

  return (
    <div
      data-slot="log-viewer"
      className={cn(
        'flex flex-col rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-muted)] overflow-hidden font-mono text-xs shadow-md select-none',
        className
      )}
      {...props}
    >
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[var(--surface-base)] border-b border-[var(--outline-base)]">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-[var(--brand-solid)]" />
          <span className="font-bold text-xs text-[var(--ink-primary)]">{title}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--ink-muted)] font-mono">
            {filteredLogs.length} events
          </span>
        </div>

        {/* Level Filters */}
        {showLevelTabs && (
          <div className="flex items-center gap-1 bg-[var(--surface-muted)] p-0.5 rounded-lg">
            {['all', 'info', 'warn', 'error', 'debug'].map((lvl) => {
              const count = lvl === 'all' ? logs.length : logs.filter((l) => l.level === lvl).length
              const isSelected = selectedLevel === lvl
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={cn(
                    'px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-colors cursor-pointer',
                    isSelected
                      ? 'bg-[var(--surface-base)] text-[var(--ink-primary)] shadow-xs'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink-secondary)]'
                  )}
                >
                  {lvl} ({count})
                </button>
              )
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-[var(--ink-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter logs..."
                className="pl-7 pr-2 py-1 text-[11px] rounded-md border border-[var(--outline-base)] bg-[var(--surface-muted)] text-[var(--ink-primary)] outline-hidden focus:border-[var(--brand-solid)] w-32 sm:w-40"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => setAutoScroll(!autoScroll)}
            className={cn(
              'size-7 rounded-md flex items-center justify-center border border-[var(--outline-base)] transition-colors cursor-pointer',
              autoScroll
                ? 'bg-[var(--brand-subtle)] text-[var(--brand-solid)]'
                : 'bg-[var(--surface-base)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
            )}
            title={autoScroll ? 'Auto-scroll enabled' : 'Auto-scroll disabled'}
            aria-label="Toggle auto scroll"
          >
            <ArrowDownCircle className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={handleCopyLogs}
            className="size-7 rounded-md bg-[var(--surface-base)] hover:bg-[var(--surface-muted)] border border-[var(--outline-base)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors cursor-pointer"
            title="Copy logs"
            aria-label="Copy logs"
          >
            {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="size-7 rounded-md bg-[var(--surface-base)] hover:bg-[var(--surface-muted)] border border-[var(--outline-base)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] transition-colors cursor-pointer"
            title="Download log file"
            aria-label="Download logs"
          >
            <Download className="size-3.5" />
          </button>

          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="size-7 rounded-md bg-[var(--surface-base)] hover:bg-rose-500/10 border border-[var(--outline-base)] flex items-center justify-center text-[var(--ink-muted)] hover:text-rose-500 transition-colors cursor-pointer"
              title="Clear logs"
              aria-label="Clear logs"
            >
              <Trash2 className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Log Console Body */}
      <div
        ref={logsContainerRef}
        className="overflow-y-auto p-3 flex flex-col gap-1 select-text"
        style={{ maxHeight }}
      >
        {filteredLogs.length === 0 ? (
          <div className="py-8 text-center text-xs text-[var(--ink-muted)] font-sans">
            No matching log events recorded.
          </div>
        ) : (
          filteredLogs.map((log, idx) => (
            <div
              key={log.id || idx}
              className="flex items-start gap-2.5 py-0.5 px-2 rounded-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors leading-relaxed group"
            >
              {/* Timestamp */}
              <span className="text-[11px] text-[var(--ink-muted)] shrink-0 font-mono select-none">
                {log.timestamp}
              </span>

              {/* Level Badge */}
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded text-[10px] uppercase font-bold tracking-wider shrink-0 flex items-center gap-1 select-none',
                  levelColor[log.level]
                )}
              >
                {levelIcons[log.level]}
                {log.level}
              </span>

              {/* Source Tag */}
              {log.source && (
                <span className="text-[11px] font-semibold text-[var(--ink-secondary)] shrink-0">
                  [{log.source}]
                </span>
              )}

              {/* Message */}
              <span className="text-xs text-[var(--ink-primary)] font-mono whitespace-pre-wrap break-all flex-1">
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
