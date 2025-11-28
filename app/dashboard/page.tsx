import { Users, DollarSign, Activity, TrendingUp } from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"
import { StatsCard } from "@/components/widgets/stats-card"
import { LineChartWidget } from "@/components/widgets/line-chart-widget"
import { BarChartWidget } from "@/components/widgets/bar-chart-widget"
import { ActivityFeed } from "@/components/widgets/activity-feed"
import { QuickActions } from "@/components/widgets/quick-actions"
import { NotificationsWidget } from "@/components/widgets/notifications-widget"

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-20 md:pb-8">
      <SectionHeader title="Dashboard" description="Welcome back! Here's what's happening today." />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard title="Total Users" value="12,543" change={12.5} icon={<Users className="h-5 w-5" />} />
        <StatsCard title="Revenue" value="$48,234" change={8.2} icon={<DollarSign className="h-5 w-5" />} />
        <StatsCard title="Active Sessions" value="1,429" change={-3.1} icon={<Activity className="h-5 w-5" />} />
        <StatsCard title="Growth Rate" value="23.5%" change={15.3} icon={<TrendingUp className="h-5 w-5" />} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 min-w-0">
        <LineChartWidget title="Revenue Trend" className="min-w-0" />
        <BarChartWidget title="Weekly Activity" className="min-w-0" />
      </div>

      {/* Widgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 min-w-0">
        <ActivityFeed />
        <QuickActions />
        <NotificationsWidget />
      </div>
    </div>
  )
}
