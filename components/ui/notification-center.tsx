'use client'

import * as React from 'react'
import { Bell, CheckCircle, AlertCircle, Info, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

export interface NotificationItem {
  id: string
  type: 'success' | 'warning' | 'info'
  title: string
  message: string
  time: string
  read: boolean
}

const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'success',
    title: 'Export completed',
    message: 'Your data export is ready',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Storage limit',
    message: "You've used 80% of storage",
    time: '1h ago',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'New feature',
    message: 'Check out our new widgets',
    time: '3h ago',
    read: true,
  },
]

const iconMap = {
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
}

const colorMap = {
  success: 'text-[var(--emerald-solid)] bg-[var(--emerald-subtle)]',
  warning: 'text-[var(--amber-solid)] bg-[var(--amber-subtle)]',
  info: 'text-[var(--blue-solid)] bg-[var(--blue-subtle)]',
}

export function NotificationCenter() {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" theme="gray" size="icon" className="relative size-9">
          <Bell className="size-4 text-[var(--ink-secondary)]" />
          {unreadCount > 0 && (
            <Badge
              size="sm"
              variant="solid"
              theme="brand"
              className="absolute -top-1 -right-1 px-1 min-w-4 h-4 flex items-center justify-center text-[9px] rounded-full leading-none pointer-events-none"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[90vw] max-w-sm p-0 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--outline-muted)] px-4 py-3 bg-[var(--surface-muted)]/50">
          <h3 className="text-xs font-semibold text-[var(--ink-primary)]">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              theme="brand"
              size="xs"
              onClick={markAllRead}
              className="h-auto px-2 py-0.5 text-xs"
            >
              <Check className="size-3 mr-1" />
              <span>Mark all read</span>
            </Button>
          )}
        </div>
        <ScrollArea className="h-[50vh] max-h-[320px] md:max-h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-[var(--ink-muted)]">
              <Bell className="mb-2 size-8 opacity-40" />
              <p className="text-xs font-medium text-[var(--ink-primary)]">No notifications</p>
              <p className="text-[11px] text-[var(--ink-secondary)] mt-0.5">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--outline-muted)]">
              {notifications.map((notification) => {
                const Icon = iconMap[notification.type]
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      'relative flex gap-3 p-3.5 transition-colors hover:bg-[var(--surface-muted)]/50 cursor-pointer',
                      !notification.read && 'bg-[var(--brand-subtle)]/20'
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {!notification.read && (
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-[var(--brand-solid)]" />
                    )}
                    <div
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-lg ml-2',
                        colorMap[notification.type]
                      )}
                    >
                      <Icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-[var(--ink-primary)] leading-tight flex-1 min-w-0">
                          {notification.title}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            dismissNotification(notification.id)
                          }}
                          className="shrink-0 rounded-md p-0.5 text-[var(--ink-muted)] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[var(--ink-primary)] transition-colors"
                          aria-label="Dismiss"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-[var(--ink-secondary)] leading-snug mt-1">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-[var(--ink-muted)] mt-1.5">{notification.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>
        <div className="border-t border-[var(--outline-muted)] p-2 bg-[var(--surface-muted)]/30">
          <Button variant="ghost" theme="gray" size="sm" className="w-full text-xs" asChild>
            <a href="/dashboard/notifications">View all notifications</a>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
