'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
  Server,
  Database,
  Globe,
  Shield,
} from 'lucide-react'

export type ServiceHealthStatus = 'operational' | 'degraded' | 'outage' | 'maintenance'

export interface ServiceItem {
  id: string
  name: string
  description: string
  icon?: 'server' | 'database' | 'globe' | 'shield'
  uptimePercent: number
  status: ServiceHealthStatus
  latencyMs: number
  history90Days?: ('green' | 'amber' | 'red')[]
}

export interface ServiceStatusGridProps extends React.HTMLAttributes<HTMLDivElement> {
  services?: ServiceItem[]
  overallScore?: number
}

// Generate 45 status bars for demo
const generateBars = (type: 'healthy' | 'minor' = 'healthy') => {
  return Array.from({ length: 45 }).map((_, i) => {
    if (type === 'minor' && i === 38) return 'amber' as const
    if (type === 'minor' && i === 39) return 'amber' as const
    return 'green' as const
  })
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'edge-gw',
    name: 'Global Edge Gateway',
    description: 'Anycast DNS & Cloudflare Workers Layer',
    icon: 'globe',
    uptimePercent: 99.99,
    status: 'operational',
    latencyMs: 14,
    history90Days: generateBars('healthy'),
  },
  {
    id: 'auth-vault',
    name: 'Identity & JWT Auth Vault',
    description: 'OAuth2 session validation & RSA key signing',
    icon: 'shield',
    uptimePercent: 99.98,
    status: 'operational',
    latencyMs: 22,
    history90Days: generateBars('healthy'),
  },
  {
    id: 'db-cluster',
    name: 'PostgreSQL Database Shards',
    description: 'Multi-AZ replication cluster (AWS us-east-1)',
    icon: 'database',
    uptimePercent: 99.94,
    status: 'degraded',
    latencyMs: 78,
    history90Days: generateBars('minor'),
  },
  {
    id: 'cron-runner',
    name: 'Background Jobs & Worker Queue',
    description: 'Distributed BullMQ / Redis Task Runners',
    icon: 'server',
    uptimePercent: 100,
    status: 'operational',
    latencyMs: 8,
    history90Days: generateBars('healthy'),
  },
]

export function ServiceStatusGrid({
  services = DEFAULT_SERVICES,
  overallScore = 99.98,
  className,
  ...props
}: ServiceStatusGridProps) {
  const getIcon = (icon?: ServiceItem['icon']) => {
    switch (icon) {
      case 'database':
        return <Database className="size-4 text-violet-500" />
      case 'globe':
        return <Globe className="size-4 text-sky-500" />
      case 'shield':
        return <Shield className="size-4 text-emerald-500" />
      default:
        return <Server className="size-4 text-[var(--brand-solid)]" />
    }
  }

  const getStatusBadge = (st: ServiceHealthStatus) => {
    switch (st) {
      case 'operational':
        return <Badge variant="solid" theme="emerald" size="sm">Operational</Badge>
      case 'degraded':
        return <Badge variant="solid" theme="amber" size="sm">Degraded</Badge>
      case 'outage':
        return <Badge variant="solid" theme="rose" size="sm">Major Outage</Badge>
      default:
        return <Badge variant="subtle" theme="gray" size="sm">Maintenance</Badge>
    }
  }

  return (
    <div
      data-slot="service-status-grid"
      className={cn(
        'flex flex-col gap-4 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none',
        className
      )}
      {...props}
    >
      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="size-5 shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-sm">All Core Systems Operational</span>
            <span className="text-[11px] opacity-90">
              Live uptime over the past 90 days: <strong className="font-mono">{overallScore}%</strong>
            </span>
          </div>
        </div>

        <Badge variant="subtle" theme="emerald" size="sm" dot>
          SLA Guaranteed
        </Badge>
      </div>

      {/* Services List */}
      <div className="flex flex-col gap-3">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="flex flex-col gap-2 p-3.5 rounded-2xl bg-[var(--surface-base)] border border-[var(--outline-base)] text-xs shadow-2xs hover:border-[var(--brand-solid)]/40 transition-colors"
          >
            {/* Service Top Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-7 rounded-lg bg-[var(--surface-muted)] flex items-center justify-center">
                  {getIcon(svc.icon)}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[var(--ink-primary)]">{svc.name}</span>
                  <span className="text-[10px] text-[var(--ink-muted)]">{svc.description}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                  {svc.latencyMs}ms
                </span>
                {getStatusBadge(svc.status)}
              </div>
            </div>

            {/* 90-Day Status Timeline Bars */}
            <div className="flex flex-col gap-1 pt-1 border-t border-[var(--outline-base)]/40">
              <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] font-mono">
                <span>90 days ago</span>
                <span className="text-[var(--ink-primary)] font-bold">{svc.uptimePercent}% uptime</span>
                <span>Today</span>
              </div>

              {/* Status Bar Pills */}
              <div className="flex items-center gap-0.5 h-6">
                {svc.history90Days?.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    title={`Day ${dIdx + 1}: ${day === 'green' ? '100% Uptime' : 'Latency Spike Detected'}`}
                    className={cn(
                      'flex-1 h-5 rounded-xs transition-all cursor-pointer hover:scale-125',
                      day === 'green' && 'bg-emerald-500 hover:bg-emerald-400',
                      day === 'amber' && 'bg-amber-500 hover:bg-amber-400',
                      day === 'red' && 'bg-rose-500 hover:bg-rose-400'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
