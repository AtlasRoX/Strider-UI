import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const notifications = [
  { id: 1, type: "success", title: "Task completed", message: "Your export is ready", time: "Just now" },
  { id: 2, type: "warning", title: "Storage alert", message: "80% storage used", time: "5 min ago" },
  { id: 3, type: "info", title: "New feature", message: "Check out widgets", time: "1 hour ago" },
]

const iconMap = {
  success: CheckCircle,
  warning: AlertCircle,
  info: Info,
}

const colorMap = {
  success: "text-emerald-600 bg-emerald-50",
  warning: "text-amber-600 bg-amber-50",
  info: "text-blue-600 bg-blue-50",
}

interface NotificationsWidgetProps {
  className?: string
}

export function NotificationsWidget({ className }: NotificationsWidgetProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3 flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Notifications</CardTitle>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => {
          const Icon = iconMap[notification.type as keyof typeof iconMap]
          return (
            <div key={notification.id} className="flex items-start gap-3">
              <div className={cn("p-1.5 rounded-lg", colorMap[notification.type as keyof typeof colorMap])}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
