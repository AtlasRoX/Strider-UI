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
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2 min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{title}</p>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight truncate">{value}</p>
            {change !== undefined && (
              <div className={cn("flex items-center gap-1 text-xs sm:text-sm", isPositive ? "text-emerald-600" : "text-rose-600")}>
                {isPositive ? <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" /> : <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />}
                <span className="font-medium">{Math.abs(change)}%</span>
                <span className="text-muted-foreground truncate hidden sm:inline">vs last month</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
