"use client"

import { useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { DraggableWidget } from "@/components/widgets/draggable-widget"
import { StatsCard } from "@/components/widgets/stats-card"
import { LineChartWidget } from "@/components/widgets/line-chart-widget"
import { BarChartWidget } from "@/components/widgets/bar-chart-widget"
import { ActivityFeed } from "@/components/widgets/activity-feed"
import { QuickActions } from "@/components/widgets/quick-actions"
import { NotificationsWidget } from "@/components/widgets/notifications-widget"
import { Button } from "@/components/ui/button"
import { Plus, Users, DollarSign } from "lucide-react"

const defaultWidgets = [
  { id: "stats-1", title: "User Stats", type: "stats" },
  { id: "chart-1", title: "Revenue Chart", type: "line-chart" },
  { id: "chart-2", title: "Activity Chart", type: "bar-chart" },
  { id: "feed-1", title: "Activity Feed", type: "activity" },
  { id: "actions-1", title: "Quick Actions", type: "actions" },
  { id: "notifications-1", title: "Notifications", type: "notifications" },
]

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState(defaultWidgets)

  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id))
  }

  const handleAddWidget = () => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      title: "New Widget",
      type: "stats",
    }
    setWidgets([...widgets, newWidget])
  }

  const renderWidgetContent = (type: string) => {
    switch (type) {
      case "stats":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatsCard title="Users" value="1,234" change={5.2} icon={<Users className="h-4 w-4" />} />
            <StatsCard title="Revenue" value="$9,876" change={-2.1} icon={<DollarSign className="h-4 w-4" />} />
          </div>
        )
      case "line-chart":
        return <LineChartWidget />
      case "bar-chart":
        return <BarChartWidget />
      case "activity":
        return <ActivityFeed />
      case "actions":
        return <QuickActions />
      case "notifications":
        return <NotificationsWidget />
      default:
        return <p className="text-muted-foreground text-sm">Widget content</p>
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeader title="Widget Panel" description="Customize your dashboard with draggable widgets">
        <Button onClick={handleAddWidget} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Widget
        </Button>
      </SectionHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        {widgets.map((widget) => (
          <DraggableWidget
            key={widget.id}
            id={widget.id}
            title={widget.title}
            onRemove={handleRemoveWidget}
            className="min-w-0"
          >
            {renderWidgetContent(widget.type)}
          </DraggableWidget>
        ))}
      </div>

      {widgets.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-xl">
          <p className="text-muted-foreground mb-4">No widgets added yet</p>
          <Button onClick={handleAddWidget} variant="outline" className="gap-2 bg-transparent">
            <Plus className="h-4 w-4" />
            Add your first widget
          </Button>
        </div>
      )}
    </div>
  )
}
