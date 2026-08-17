'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, Mail, MessageSquare, Phone, Webhook, Save } from 'lucide-react'
import { toast } from 'sonner'

export interface NotificationMatrixRow {
  id: string
  title: string
  description: string
  channels: {
    email: boolean
    slack: boolean
    sms: boolean
    inApp: boolean
  }
}

export interface NotificationPreferencesProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSettings?: NotificationMatrixRow[]
  onSave?: (settings: NotificationMatrixRow[]) => void
}

const DEFAULT_SETTINGS: NotificationMatrixRow[] = [
  {
    id: 'sec',
    title: 'Critical Security & 2FA Challenges',
    description: 'Suspicious logins, API key revocations, password changes',
    channels: { email: true, slack: true, sms: true, inApp: true },
  },
  {
    id: 'bill',
    title: 'Billing, Invoices & Payment Failures',
    description: 'Monthly statements, quota overages, expired credit cards',
    channels: { email: true, slack: true, sms: false, inApp: true },
  },
  {
    id: 'deploy',
    title: 'Deployment & CI/CD Pipeline Status',
    description: 'Build failures, edge cache invalidation, release tags',
    channels: { email: false, slack: true, sms: false, inApp: true },
  },
  {
    id: 'mention',
    title: 'Team Mentions & PR Reviews',
    description: 'Direct @mentions in discussion threads and assigned tasks',
    channels: { email: true, slack: true, sms: false, inApp: true },
  },
]

export function NotificationPreferences({
  defaultSettings = DEFAULT_SETTINGS,
  onSave,
  className,
  ...props
}: NotificationPreferencesProps) {
  const [settings, setSettings] = React.useState<NotificationMatrixRow[]>(defaultSettings)

  const toggleChannel = (rowId: string, channel: 'email' | 'slack' | 'sms' | 'inApp') => {
    setSettings((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? { ...row, channels: { ...row.channels, [channel]: !row.channels[channel] } }
          : row
      )
    )
  }

  const handleSave = () => {
    onSave?.(settings)
    toast.success('Notification preferences saved successfully')
  }

  return (
    <div
      data-slot="notification-preferences"
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
            <Bell className="size-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--ink-primary)]">Notification Matrix Settings</h4>
            <span className="text-[11px] text-[var(--ink-muted)]">
              Control delivery channels across alert categories
            </span>
          </div>
        </div>

        <Button
          variant="solid"
          theme="brand"
          size="xs"
          onClick={handleSave}
          prefix={<Save className="size-3" />}
        >
          Save Matrix
        </Button>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-[var(--outline-base)]/60 bg-[var(--surface-base)]">
        <table className="w-full text-xs text-left border-collapse min-w-[580px]">
          <thead>
            <tr className="bg-[var(--surface-muted)] text-[var(--ink-secondary)] font-bold text-[11px] uppercase tracking-wider border-b border-[var(--outline-base)]">
              <th className="py-3 px-4">Event Category</th>
              <th className="py-3 px-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Mail className="size-3 text-sky-500" />
                  <span>Email</span>
                </div>
              </th>
              <th className="py-3 px-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <MessageSquare className="size-3 text-emerald-500" />
                  <span>Slack</span>
                </div>
              </th>
              <th className="py-3 px-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Phone className="size-3 text-amber-500" />
                  <span>SMS</span>
                </div>
              </th>
              <th className="py-3 px-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Webhook className="size-3 text-violet-500" />
                  <span>In-App</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--outline-base)]/40">
            {settings.map((row) => (
              <tr key={row.id} className="hover:bg-[var(--surface-muted)]/30 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-xs text-[var(--ink-primary)]">{row.title}</span>
                    <span className="text-[11px] text-[var(--ink-muted)]">{row.description}</span>
                  </div>
                </td>

                <td className="py-3 px-3 text-center">
                  <div className="flex justify-center">
                    <Switch
                      checked={row.channels.email}
                      onCheckedChange={() => toggleChannel(row.id, 'email')}
                    />
                  </div>
                </td>

                <td className="py-3 px-3 text-center">
                  <div className="flex justify-center">
                    <Switch
                      checked={row.channels.slack}
                      onCheckedChange={() => toggleChannel(row.id, 'slack')}
                    />
                  </div>
                </td>

                <td className="py-3 px-3 text-center">
                  <div className="flex justify-center">
                    <Switch
                      checked={row.channels.sms}
                      onCheckedChange={() => toggleChannel(row.id, 'sms')}
                    />
                  </div>
                </td>

                <td className="py-3 px-3 text-center">
                  <div className="flex justify-center">
                    <Switch
                      checked={row.channels.inApp}
                      onCheckedChange={() => toggleChannel(row.id, 'inApp')}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
