'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface SparklineProps extends React.SVGProps<SVGSVGElement> {
  data: number[]
  width?: number
  height?: number
  type?: 'line' | 'area' | 'bar'
  theme?: ThemeColor
  color?: string
  strokeWidth?: number
  showGradient?: boolean
  showDots?: boolean
  showMinMax?: boolean
  showCursor?: boolean
  className?: string
  valueFormatter?: (value: number) => string
}

export function Sparkline({
  data = [],
  width = 120,
  height = 36,
  type = 'area',
  theme = 'brand',
  color,
  strokeWidth = 2,
  showGradient = true,
  showDots = false,
  showMinMax = false,
  showCursor = true,
  className,
  valueFormatter = (v) => `${v}`,
  ...props
}: SparklineProps) {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null)
  const id = React.useId().replace(/:/g, '')

  if (!data || data.length === 0) {
    return <div className={cn('h-9 w-28 bg-[var(--surface-muted)] rounded-md animate-pulse', className)} />
  }

  const padding = 4
  const innerWidth = width - padding * 2
  const innerHeight = height - padding * 2

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min === 0 ? 1 : max - min

  // Theme color resolution
  const resolvedColor = color || `var(--${theme}-solid, #3b82f6)`

  // Generate SVG coordinates
  const points = data.map((val, idx) => {
    const x = padding + (idx / Math.max(data.length - 1, 1)) * innerWidth
    const y = height - padding - ((val - min) / range) * innerHeight
    return { x, y, val }
  })

  // Smooth bezier curve path
  const linePath = points.reduce((path, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x},${pt.y}`
    const prev = arr[idx - 1]
    const cx = (prev.x + pt.x) / 2
    return `${path} C ${cx},${prev.y} ${cx},${pt.y} ${pt.x},${pt.y}`
  }, '')

  // Area path closing to bottom
  const areaPath = `${linePath} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`

  const minPoint = points.reduce((minP, p) => (p.val < minP.val ? p : minP), points[0])
  const maxPoint = points.reduce((maxP, p) => (p.val > maxP.val ? p : maxP), points[0])

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!showCursor) return
    const rect = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const relativeX = Math.max(0, Math.min(1, (mouseX - padding) / innerWidth))
    const index = Math.round(relativeX * (data.length - 1))
    setHoverIndex(index)
  }

  const handleMouseLeave = () => {
    setHoverIndex(null)
  }

  return (
    <div className={cn('relative inline-flex flex-col items-center group select-none', className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="overflow-visible"
        {...props}
      >
        <defs>
          <linearGradient id={`sparkline-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={resolvedColor} stopOpacity={0.35} />
            <stop offset="100%" stopColor={resolvedColor} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {type === 'bar' ? (
          data.map((val, idx) => {
            const barWidth = Math.max(2, (innerWidth / data.length) - 2)
            const barX = padding + idx * (innerWidth / data.length)
            const barHeight = Math.max(2, ((val - min) / range) * innerHeight)
            const barY = height - padding - barHeight
            const isHovered = hoverIndex === idx

            return (
              <rect
                key={idx}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                rx={1.5}
                fill={resolvedColor}
                opacity={isHovered ? 1 : hoverIndex !== null ? 0.4 : 0.85}
                className="transition-opacity duration-150"
              />
            )
          })
        ) : (
          <>
            {/* Area fill */}
            {type === 'area' && showGradient && (
              <path d={areaPath} fill={`url(#sparkline-grad-${id})`} />
            )}

            {/* Line stroke */}
            <path
              d={linePath}
              fill="none"
              stroke={resolvedColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Dots */}
            {showDots &&
              points.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r={hoverIndex === idx ? 4 : 2}
                  fill="var(--surface-card, #fff)"
                  stroke={resolvedColor}
                  strokeWidth={2}
                  className="transition-all duration-150"
                />
              ))}

            {/* Min / Max Indicators */}
            {showMinMax && !showDots && (
              <>
                <circle cx={minPoint.x} cy={minPoint.y} r={2.5} fill="var(--rose-solid, #ef4444)" />
                <circle cx={maxPoint.x} cy={maxPoint.y} r={2.5} fill="var(--emerald-solid, #10b981)" />
              </>
            )}

            {/* Hover Cursor */}
            {hoverIndex !== null && points[hoverIndex] && (
              <g>
                <line
                  x1={points[hoverIndex].x}
                  y1={0}
                  x2={points[hoverIndex].x}
                  y2={height}
                  stroke="var(--outline-base, #94a3b8)"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  opacity={0.8}
                />
                <circle
                  cx={points[hoverIndex].x}
                  cy={points[hoverIndex].y}
                  r={4}
                  fill={resolvedColor}
                  stroke="var(--surface-base, #fff)"
                  strokeWidth={2}
                />
              </g>
            )}
          </>
        )}
      </svg>

      {/* Floating tooltip */}
      {hoverIndex !== null && points[hoverIndex] && (
        <div
          className="absolute -top-7 px-1.5 py-0.5 rounded text-[10px] font-medium font-mono bg-[var(--surface-contrast,rgba(0,0,0,0.85))] text-[var(--ink-inverse,#fff)] shadow-md pointer-events-none transition-transform -translate-x-1/2 whitespace-nowrap z-20"
          style={{ left: points[hoverIndex].x }}
        >
          {valueFormatter(points[hoverIndex].val)}
        </div>
      )}
    </div>
  )
}
