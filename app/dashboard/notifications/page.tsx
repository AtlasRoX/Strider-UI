import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, CheckCircle, AlertCircle, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Export completed",
    message: "Your data export is ready for download",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Storage limit",
    message: "You've used 80% of your storage quota",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "New feature",
    message: "Check out our new widget builder",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "success",
    title: "Team invite accepted",
    message: "John Doe joined your workspace",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "info",
    title: "Weekly report",
    message: "Your weekly activity report is ready",
    time: "2 days ago",
    read: true,
  },
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

export default function NotificationsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <SectionHeader title="Notifications" description="Stay updated with your latest alerts">
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </SectionHeader>

      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = iconMap[notification.type as keyof typeof iconMap]
          return (
            <Card key={notification.id} className={cn(!notification.read && "border-primary/30 bg-primary/5")}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={cn("p-2 rounded-lg", colorMap[notification.type as keyof typeof colorMap])}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-16">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      )}
    </div>
  )
}
