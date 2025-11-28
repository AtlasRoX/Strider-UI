import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  className?: string
}

export function StatsCard({ title, value, change, icon, className }: StatsCardProps) {
  const isPositive = change && change > 0

  return (
    <Card className={cn("hover-lift hover-glow", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <p className="text-sm text-muted-foreground truncate">{title}</p>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight truncate">{value}</p>
            {change !== undefined && (
              <div className={cn("flex items-center gap-1 text-sm", isPositive ? "text-emerald-600" : "text-rose-600")}>
                {isPositive ? <TrendingUp className="h-4 w-4 shrink-0" /> : <TrendingDown className="h-4 w-4 shrink-0" />}
                <span className="font-medium">{Math.abs(change)}%</span>
                <span className="text-muted-foreground truncate hidden sm:inline">vs last month</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
