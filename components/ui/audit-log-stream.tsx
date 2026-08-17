'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { ShieldCheck, ChevronDown, ChevronRight, Filter, Globe, Laptop } from 'lucide-react'

export interface AuditLogItem {
  id: string
  action: string
  actor: { name: string; email: string }
  target: string
  ipAddress: string
  location: string
  timestamp: string
  severity: 'info' | 'warn' | 'critical'
  metadata?: Record<string, any>
}

export interface AuditLogStreamProps extends React.HTMLAttributes<HTMLDivElement> {
  logs?: AuditLogItem[]
}

const DEFAULT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-1',
    action: 'org.member_role.updated',
    actor: { name: 'Sarah Connor', email: 'sarah@strider.dev' },
    target: 'user_99214 (Marcus Chen) → Admin',
    ipAddress: '198.51.100.45',
    location: 'San Francisco, US',
    timestamp: '3 mins ago',
    severity: 'warn',
    metadata: { previousRole: 'member', newRole: 'admin', authorizedBy: '2fa_totp' },
  },
  {
    id: 'aud-2',
    action: 'api_key.created',
    actor: { name: 'Alex Rivera', email: 'alex@strider.dev' },
    target: 'Production Ingestion (str_live_•••)',
    ipAddress: '203.0.113.19',
    location: 'Frankfurt, DE',
    timestamp: '18 mins ago',
    severity: 'info',
    metadata: { scopes: ['write:events', 'read:metrics'], ttlDays: 90 },
  },
  {
    id: 'aud-3',
    action: 'security.mfa_challenge_failed',
    actor: { name: 'Unknown User', email: 'david@strider.dev' },
    target: 'Session / Console Auth',
    ipAddress: '192.0.2.148',
    location: 'Singapore, SG',
    timestamp: '1 hour ago',
    severity: 'critical',
    metadata: { attempts: 3, blockedUntil: '15:30 UTC' },
  },
]

export function AuditLogStream({
  logs = DEFAULT_LOGS,
  className,
  ...props
}: AuditLogStreamProps) {
  const [expandedLogId, setExpandedLogId] = React.useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedLogId(expandedLogId === id ? null : id)
  }

  const getSeverityBadge = (sev: AuditLogItem['severity']) => {
    switch (sev) {
      case 'critical':
        return <Badge variant="solid" theme="rose" size="sm">Critical</Badge>
      case 'warn':
        return <Badge variant="solid" theme="amber" size="sm">Notice</Badge>
      default:
        return <Badge variant="subtle" theme="gray" size="sm">Info</Badge>
    }
  }

  return (
    <div
      data-slot="audit-log-stream"
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
            <ShieldCheck className="size-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--ink-primary)]">SOC2 Audit Log Trail</h4>
            <span className="text-[11px] text-[var(--ink-muted)]">
              Immutable stream of privileged system events and security operations
            </span>
          </div>
        </div>

        <Badge variant="subtle" theme="emerald" size="sm" dot>
          Live Ingestion
        </Badge>
      </div>

      {/* Stream List */}
      <div className="flex flex-col gap-2">
        {logs.map((log) => {
          const isExpanded = expandedLogId === log.id

          return (
            <div
              key={log.id}
              onClick={() => toggleExpand(log.id)}
              className={cn(
                'flex flex-col p-3 rounded-2xl border transition-colors cursor-pointer text-xs',
                isExpanded
                  ? 'bg-[var(--surface-muted)]/60 border-[var(--brand-solid)]/60'
                  : 'bg-[var(--surface-base)] border-[var(--outline-base)] hover:border-[var(--brand-solid)]/40'
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar label={log.actor.name} size="xs" />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[var(--brand-solid)] text-[11px]">
                        {log.action}
                      </span>
                      {getSeverityBadge(log.severity)}
                    </div>
                    <span className="text-[11px] text-[var(--ink-secondary)] truncate">
                      {log.actor.name} ({log.actor.email}) → <strong className="text-[var(--ink-primary)]">{log.target}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[10px] text-[var(--ink-muted)] font-mono self-end sm:self-center">
                  <span className="flex items-center gap-1">
                    <Globe className="size-2.5" /> {log.location}
                  </span>
                  <span>{log.timestamp}</span>
                  {isExpanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
                </div>
              </div>

              {/* JSON Metadata Drawer */}
              {isExpanded && log.metadata && (
                <div className="mt-2.5 pt-2 border-t border-[var(--outline-base)]/40 font-mono text-[11px] text-[var(--ink-muted)] bg-[var(--surface-card)] p-2.5 rounded-xl">
                  <pre className="text-emerald-500 font-mono overflow-x-auto">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
