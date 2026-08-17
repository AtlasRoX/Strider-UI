'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Send,
  Radio,
  CheckCircle2,
  AlertCircle,
  Clock,
  Code2,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react'
import { toast } from 'sonner'

export interface WebhookTesterProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultEndpoint?: string
  defaultEvent?: string
  onDispatch?: (endpoint: string, event: string, payload: any) => Promise<any>
}

const EVENTS = [
  'customer.subscription.created',
  'invoice.payment_succeeded',
  'deployment.pipeline_completed',
  'security.auth_challenge_failed',
]

const DEFAULT_PAYLOAD = {
  id: 'evt_984f1a20',
  type: 'invoice.payment_succeeded',
  created: Math.floor(Date.now() / 1000),
  data: {
    amount: 14850,
    currency: 'usd',
    customer: 'cus_89420ab',
    status: 'paid',
  },
}

export function WebhookTester({
  defaultEndpoint = 'https://api.strider.dev/v1/webhooks/receiver',
  defaultEvent = 'invoice.payment_succeeded',
  onDispatch,
  className,
  ...props
}: WebhookTesterProps) {
  const [endpoint, setEndpoint] = React.useState(defaultEndpoint)
  const [selectedEvent, setSelectedEvent] = React.useState(defaultEvent)
  const [payloadText, setPayloadText] = React.useState(JSON.stringify(DEFAULT_PAYLOAD, null, 2))
  const [isSending, setIsSending] = React.useState(false)
  const [responseLog, setResponseLog] = React.useState<{
    statusCode: number
    durationMs: number
    timestamp: string
    body: any
  } | null>(null)

  const handleSendTest = async () => {
    setIsSending(true)
    const startTime = performance.now()

    try {
      const parsed = JSON.parse(payloadText)
      await new Promise((r) => setTimeout(r, 650))
      const durationMs = Math.round(performance.now() - startTime)

      setResponseLog({
        statusCode: 200,
        durationMs,
        timestamp: new Date().toLocaleTimeString(),
        body: { received: true, event_id: parsed.id || 'evt_live', signature_verified: true },
      })
      toast.success(`Webhook delivered successfully (200 OK in ${durationMs}ms)`)
    } catch {
      setResponseLog({
        statusCode: 400,
        durationMs: 45,
        timestamp: new Date().toLocaleTimeString(),
        body: { error: 'Invalid JSON payload structure' },
      })
      toast.error('Failed to parse webhook JSON payload')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div
      data-slot="webhook-tester"
      className={cn(
        'flex flex-col gap-4 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold">
            <Radio className="size-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--ink-primary)]">Webhook Dispatch Simulator</h4>
            <span className="text-[11px] text-[var(--ink-muted)]">
              Test signed event delivery payloads and inspect responses
            </span>
          </div>
        </div>

        <Badge variant="subtle" theme="emerald" size="sm" dot>
          HMAC-SHA256 Ready
        </Badge>
      </div>

      {/* Target Endpoint Input */}
      <div className="flex flex-col gap-1.5 text-xs">
        <label className="font-bold text-[var(--ink-primary)]">Target Webhook Endpoint</label>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1.5 rounded-lg bg-[var(--surface-muted)] text-[11px] font-mono font-bold text-[var(--brand-solid)] border border-[var(--outline-base)]">
            POST
          </span>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)] text-xs font-mono text-[var(--ink-primary)] outline-hidden focus:border-[var(--brand-solid)]"
          />
        </div>
      </div>

      {/* Event Selection Pills */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[11px] font-semibold text-[var(--ink-muted)] mr-1">Event:</span>
        {EVENTS.map((ev) => (
          <button
            key={ev}
            type="button"
            onClick={() => {
              setSelectedEvent(ev)
              setPayloadText(
                JSON.stringify({ ...DEFAULT_PAYLOAD, type: ev, created: Math.floor(Date.now() / 1000) }, null, 2)
              )
            }}
            className={cn(
              'px-2 py-0.5 rounded-md text-[10px] font-mono transition-colors cursor-pointer border',
              selectedEvent === ev
                ? 'bg-[var(--brand-subtle)] text-[var(--brand-solid)] border-[var(--brand-solid)]/40 font-bold'
                : 'bg-[var(--surface-base)] text-[var(--ink-muted)] border-[var(--outline-base)] hover:text-[var(--ink-primary)]'
            )}
          >
            {ev}
          </button>
        ))}
      </div>

      {/* JSON Payload Textarea */}
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex items-center justify-between">
          <label className="font-bold text-[var(--ink-primary)]">JSON Body Payload</label>
          <span className="text-[10px] font-mono text-[var(--ink-muted)]">application/json</span>
        </div>
        <textarea
          rows={5}
          value={payloadText}
          onChange={(e) => setPayloadText(e.target.value)}
          className="w-full p-3 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)] font-mono text-xs text-[var(--ink-primary)] outline-hidden focus:border-[var(--brand-solid)] resize-y leading-relaxed"
        />
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between pt-1">
        <Button
          variant="solid"
          theme="brand"
          size="sm"
          disabled={isSending}
          onClick={handleSendTest}
          prefix={<Send className="size-3.5" />}
        >
          {isSending ? 'Sending Test Event...' : 'Dispatch Test Payload'}
        </Button>

        {responseLog && (
          <div className="flex items-center gap-2 text-xs font-mono">
            <Badge
              variant="solid"
              theme={responseLog.statusCode === 200 ? 'emerald' : 'rose'}
              size="sm"
            >
              {responseLog.statusCode} OK
            </Badge>
            <span className="text-[11px] text-[var(--ink-muted)]">{responseLog.durationMs}ms</span>
          </div>
        )}
      </div>

      {/* Response Preview Box */}
      {responseLog && (
        <div className="flex flex-col gap-1 p-3 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 shadow-inner animate-in fade-in-0 duration-200">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[10px] text-slate-400">
            <span>Server Response Preview</span>
            <span>{responseLog.timestamp}</span>
          </div>
          <pre className="text-[11px] text-emerald-400 pt-1 overflow-x-auto">
            {JSON.stringify(responseLog.body, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
