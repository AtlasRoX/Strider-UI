'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Laptop,
  Smartphone,
  Globe,
  MapPin,
  Clock,
  ShieldCheck,
  LogOut,
  Trash2,
} from 'lucide-react'

export interface SessionItem {
  id: string
  device: string
  browser: string
  os: 'mac' | 'windows' | 'linux' | 'ios' | 'android' | 'other'
  ipAddress: string
  location: string
  lastActive: string
  isCurrent?: boolean
}

export interface ActiveSessionsProps extends React.HTMLAttributes<HTMLDivElement> {
  sessions: SessionItem[]
  onRevoke?: (sessionId: string) => void
  onRevokeAll?: () => void
}

export function ActiveSessions({
  sessions = [],
  onRevoke,
  onRevokeAll,
  className,
  ...props
}: ActiveSessionsProps) {
  const getDeviceIcon = (os: SessionItem['os']) => {
    if (os === 'ios' || os === 'android') {
      return <Smartphone className="size-4 text-[var(--brand-solid)]" />
    }
    return <Laptop className="size-4 text-[var(--brand-solid)]" />
  }

  return (
    <div
      data-slot="active-sessions"
      className={cn('flex flex-col gap-4 w-full select-none', className)}
      {...props}
    >
      {/* Header with Revoke All Action */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-emerald-500" />
          <span className="font-bold text-[var(--ink-primary)]">Active Device Sessions</span>
          <span className="text-[10px] text-[var(--ink-muted)]">
            ({sessions.length} active)
          </span>
        </div>

        {onRevokeAll && sessions.length > 1 && (
          <Button
            variant="ghost"
            theme="rose"
            size="xs"
            onClick={onRevokeAll}
            prefix={<LogOut className="size-3" />}
          >
            Log Out Other Sessions
          </Button>
        )}
      </div>

      {/* Sessions List */}
      <div className="flex flex-col gap-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={cn(
              'flex items-center justify-between gap-4 p-3.5 rounded-2xl border bg-[var(--surface-card)] transition-all shadow-2xs',
              session.isCurrent
                ? 'border-[var(--brand-solid)]/60 bg-[var(--brand-subtle)]/20'
                : 'border-[var(--outline-base)] hover:border-[var(--outline-base)]/80'
            )}
          >
            {/* Left: Device Icon & Info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-9 rounded-xl bg-[var(--surface-muted)] flex items-center justify-center shrink-0 border border-[var(--outline-base)]">
                {getDeviceIcon(session.os)}
              </div>

              <div className="flex flex-col min-w-0 gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[var(--ink-primary)] truncate">
                    {session.device} · {session.browser}
                  </span>
                  {session.isCurrent && (
                    <Badge variant="solid" theme="emerald" size="sm" dot>
                      This Device
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3 text-[11px] text-[var(--ink-muted)] font-mono">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="size-3 shrink-0" />
                    {session.location} ({session.ipAddress})
                  </span>
                  <span className="flex items-center gap-1 shrink-0">
                    <Clock className="size-3 shrink-0" />
                    {session.lastActive}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Revoke Action */}
            {!session.isCurrent && onRevoke && (
              <Button
                variant="outline"
                theme="rose"
                size="xs"
                onClick={() => onRevoke(session.id)}
              >
                Revoke
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
