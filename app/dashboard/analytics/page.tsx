import { SectionHeader } from "@/components/ui/section-header"
import { LineChartWidget } from "@/components/widgets/line-chart-widget"
import { BarChartWidget } from "@/components/widgets/bar-chart-widget"
import { StatsCard } from "@/components/widgets/stats-card"
import { Users, Eye, Clock, MousePointer } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader title="Analytics" description="Track your performance metrics" />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Visitors" value="45,231" change={18.2} icon={<Users className="h-5 w-5" />} />
        <StatsCard title="Page Views" value="128,459" change={12.5} icon={<Eye className="h-5 w-5" />} />
        <StatsCard title="Avg. Session" value="4m 32s" change={-5.3} icon={<Clock className="h-5 w-5" />} />
        <StatsCard title="Bounce Rate" value="32.4%" change={-8.1} icon={<MousePointer className="h-5 w-5" />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartWidget title="Visitor Trend" />
        <BarChartWidget title="Traffic Sources" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartWidget title="Conversion Rate" />
        <BarChartWidget title="Top Pages" />
      </div>
    </div>
  )
}
