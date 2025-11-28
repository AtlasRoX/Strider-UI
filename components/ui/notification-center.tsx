"use client"

import { useState } from "react"
import { Bell, CheckCircle, AlertCircle, Info, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  type: "success" | "warning" | "info"
  title: string
  message: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Export completed",
    message: "Your data export is ready",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Storage limit",
    message: "You've used 80% of storage",
    time: "1h ago",
    read: false,
  },
  { id: "3", type: "info", title: "New feature", message: "Check out our new widgets", time: "3h ago", read: true },
]

const iconMap = {
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
}

const colorMap = {
  success: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
  warning: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
  info: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
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
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[90vw] max-w-sm p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead} className="h-auto px-2 py-1 text-xs">
              <Check className="mr-1 h-3 w-3" />
              <span className="hidden sm:inline">Mark all read</span>
              <span className="sm:hidden">Mark read</span>
            </Button>
          )}
        </div>
        <ScrollArea className="h-[50vh] max-h-[320px] md:max-h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Bell className="mb-3 h-10 w-10 opacity-50" />
              <p className="text-sm font-medium">No notifications</p>
              <p className="text-xs mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => {
                const Icon = iconMap[notification.type]
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "relative flex gap-3 p-4 transition-colors hover:bg-muted/50 cursor-pointer",
                      !notification.read && "bg-primary/5",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {!notification.read && (
                      <span className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary" />
                    )}
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ml-3",
                        colorMap[notification.type],
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold leading-tight flex-1 min-w-0 pr-2">{notification.title}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            dismissNotification(notification.id)
                          }}
                          className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          aria-label="Dismiss notification"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground leading-snug break-words pr-2 mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground/80 mt-2">{notification.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>
        <div className="border-t border-border p-2">
          <Button variant="ghost" className="w-full text-sm font-medium" asChild>
            <a href="/dashboard/notifications">View all notifications</a>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
