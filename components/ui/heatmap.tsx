'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface HeatmapDataPoint {
  date: string // YYYY-MM-DD
  count: number
  metadata?: Record<string, any>
}

export interface HeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  data: HeatmapDataPoint[]
  startDate?: string | Date
  endDate?: string | Date
  theme?: ThemeColor
  cellSize?: number
  cellGap?: number
  cellRadius?: number
  showWeekdayLabels?: boolean
  showMonthLabels?: boolean
  showLegend?: boolean
  legendLabels?: [string, string]
  valueFormatter?: (count: number, date: string) => string
  onCellClick?: (point: HeatmapDataPoint) => void
}

export function Heatmap({
  data = [],
  startDate,
  endDate,
  theme = 'emerald',
  cellSize = 12,
  cellGap = 3,
  cellRadius = 2,
  showWeekdayLabels = true,
  showMonthLabels = true,
  showLegend = true,
  legendLabels = ['Less', 'More'],
  valueFormatter = (count, date) => `${count} activities on ${date}`,
  onCellClick,
  className,
  ...props
}: HeatmapProps) {
  const [hoveredCell, setHoveredCell] = React.useState<{
    x: number
    y: number
    date: string
    count: number
  } | null>(null)

  // Map data array to dictionary for O(1) lookup
  const dataMap = React.useMemo(() => {
    const map = new Map<string, HeatmapDataPoint>()
    for (const point of data) {
      map.set(point.date, point)
    }
    return map
  }, [data])

  // Calculate start and end dates (defaults to last 16 weeks ~ 112 days)
  const { weeks, monthHeaders } = React.useMemo(() => {
    const end = endDate ? new Date(endDate) : new Date()
    const start = startDate
      ? new Date(startDate)
      : new Date(end.getTime() - 112 * 24 * 60 * 60 * 1000)

    // Adjust start to previous Sunday/Monday
    const current = new Date(start)
    current.setDate(current.getDate() - current.getDay())

    const generatedWeeks: Array<Array<{ dateStr: string; date: Date; count: number; inRange: boolean }>> = []
    const months: Array<{ label: string; weekIndex: number }> = []

    let lastMonth = -1
    let weekIndex = 0

    while (current <= end || generatedWeeks.length % 7 !== 0) {
      const currentWeek: Array<{ dateStr: string; date: Date; count: number; inRange: boolean }> = []

      for (let day = 0; day < 7; day++) {
        const dateCopy = new Date(current)
        const dateStr = dateCopy.toISOString().split('T')[0]
        const inRange = dateCopy >= start && dateCopy <= end
        const count = dataMap.get(dateStr)?.count ?? 0

        currentWeek.push({
          dateStr,
          date: dateCopy,
          count,
          inRange,
        })

        if (day === 0 && dateCopy.getMonth() !== lastMonth && inRange) {
          months.push({
            label: dateCopy.toLocaleString('default', { month: 'short' }),
            weekIndex,
          })
          lastMonth = dateCopy.getMonth()
        }

        current.setDate(current.getDate() + 1)
      }

      generatedWeeks.push(currentWeek)
      weekIndex++
      if (current > end && generatedWeeks.length >= 16) break
    }

    return { weeks: generatedWeeks, monthHeaders: months }
  }, [startDate, endDate, dataMap])

  // Intensity level calculation (0 to 4)
  const maxCount = React.useMemo(() => {
    return Math.max(...data.map((d) => d.count), 4)
  }, [data])

  const getIntensity = (count: number) => {
    if (count === 0) return 0
    const ratio = count / maxCount
    if (ratio <= 0.25) return 1
    if (ratio <= 0.5) return 2
    if (ratio <= 0.75) return 3
    return 4
  }

  const getCellColor = (level: number) => {
    if (level === 0) return 'var(--surface-muted, rgba(148, 163, 184, 0.15))'
    if (level === 1) return `color-mix(in oklch, var(--${theme}-solid, #10b981) 25%, transparent)`
    if (level === 2) return `color-mix(in oklch, var(--${theme}-solid, #10b981) 50%, transparent)`
    if (level === 3) return `color-mix(in oklch, var(--${theme}-solid, #10b981) 75%, transparent)`
    return `var(--${theme}-solid, #10b981)`
  }

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div
      data-slot="heatmap"
      className={cn('relative flex flex-col gap-2 select-none overflow-x-auto pb-2', className)}
      {...props}
    >
      {/* Month Labels */}
      {showMonthLabels && (
        <div
          className="flex text-[10px] font-medium text-[var(--ink-muted)] relative h-4"
          style={{ paddingLeft: showWeekdayLabels ? 28 : 0 }}
        >
          {monthHeaders.map((m, idx) => (
            <span
              key={idx}
              className="absolute"
              style={{ left: (showWeekdayLabels ? 28 : 0) + m.weekIndex * (cellSize + cellGap) }}
            >
              {m.label}
            </span>
          ))}
        </div>
      )}

      {/* Grid Container */}
      <div className="flex gap-2">
        {/* Weekday Labels */}
        {showWeekdayLabels && (
          <div className="flex flex-col text-[9px] font-medium text-[var(--ink-muted)] justify-between py-0.5 w-6">
            <span style={{ height: cellSize }}>Mon</span>
            <span style={{ height: cellSize }}>Wed</span>
            <span style={{ height: cellSize }}>Fri</span>
          </div>
        )}

        {/* Grid Cells */}
        <div className="flex gap-[3px]" style={{ gap: cellGap }}>
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col" style={{ gap: cellGap }}>
              {week.map((cell, dIdx) => {
                const level = cell.inRange ? getIntensity(cell.count) : 0
                return (
                  <button
                    key={dIdx}
                    type="button"
                    disabled={!cell.inRange}
                    onClick={() => {
                      if (cell.inRange) {
                        const point = dataMap.get(cell.dateStr) || { date: cell.dateStr, count: cell.count }
                        onCellClick?.(point)
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (!cell.inRange) return
                      const rect = e.currentTarget.getBoundingClientRect()
                      setHoveredCell({
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                        date: cell.dateStr,
                        count: cell.count,
                      })
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: cellRadius,
                      backgroundColor: getCellColor(level),
                    }}
                    className={cn(
                      'transition-all duration-150 outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--brand-solid)]',
                      cell.inRange ? 'cursor-pointer hover:scale-125 hover:z-10' : 'opacity-20 cursor-default'
                    )}
                    aria-label={`${cell.count} activities on ${cell.dateStr}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredCell && (
        <div
          className="fixed -top-8 px-2 py-1 rounded-md text-[11px] font-medium bg-[var(--surface-contrast,rgba(0,0,0,0.9))] text-[var(--ink-inverse,#fff)] shadow-lg pointer-events-none -translate-x-1/2 -translate-y-full whitespace-nowrap z-50 animate-in fade-in-0 duration-150"
          style={{ left: hoveredCell.x, top: hoveredCell.y - 4 }}
        >
          {valueFormatter(hoveredCell.count, hoveredCell.date)}
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="flex items-center justify-end gap-1.5 text-[10px] text-[var(--ink-muted)] pt-2">
          <span>{legendLabels[0]}</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              style={{
                width: cellSize - 2,
                height: cellSize - 2,
                borderRadius: cellRadius,
                backgroundColor: getCellColor(level),
              }}
            />
          ))}
          <span>{legendLabels[1]}</span>
        </div>
      )}
    </div>
  )
}
