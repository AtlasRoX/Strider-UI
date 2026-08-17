'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: number | string
  children: React.ReactNode[]
}

export function MasonryGrid({
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = 16,
  children = [],
  className,
  ...props
}: MasonryGridProps) {
  const [colCount, setColCount] = React.useState(columns.default)

  React.useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth
      if (columns.xl && w >= 1280) setColCount(columns.xl)
      else if (columns.lg && w >= 1024) setColCount(columns.lg)
      else if (columns.md && w >= 768) setColCount(columns.md)
      else if (columns.sm && w >= 640) setColCount(columns.sm)
      else setColCount(columns.default)
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [columns])

  // Distribute children into column buckets
  const columnBuckets = React.useMemo(() => {
    const buckets: React.ReactNode[][] = Array.from({ length: colCount }, () => [])
    React.Children.forEach(children, (child, idx) => {
      buckets[idx % colCount].push(child)
    })
    return buckets
  }, [children, colCount])

  return (
    <div
      data-slot="masonry-grid"
      className={cn('flex w-full items-start', className)}
      style={{ gap }}
      {...props}
    >
      {columnBuckets.map((bucket, colIdx) => (
        <div
          key={colIdx}
          className="flex flex-col flex-1 min-w-0"
          style={{ gap }}
        >
          {bucket}
        </div>
      ))}
    </div>
  )
}
