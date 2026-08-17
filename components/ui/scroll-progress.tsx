'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface ScrollProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: ThemeColor
  height?: number
  showPercentage?: boolean
  containerRef?: React.RefObject<HTMLElement | null>
}

export function ScrollProgress({
  theme = 'brand',
  height = 3,
  showPercentage = false,
  containerRef,
  className,
  ...props
}: ScrollProgressProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      let currentProgress = 0
      if (containerRef && containerRef.current) {
        const el = containerRef.current
        const scrollHeight = el.scrollHeight - el.clientHeight
        if (scrollHeight > 0) {
          currentProgress = (el.scrollTop / scrollHeight) * 100
        }
      } else {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight
        if (totalHeight > 0) {
          currentProgress = (window.scrollY / totalHeight) * 100
        }
      }
      setProgress(Math.max(0, Math.min(100, currentProgress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    if (containerRef?.current) {
      containerRef.current.addEventListener('scroll', handleScroll, { passive: true })
    }

    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (containerRef?.current) {
        containerRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [containerRef])

  return (
    <div
      data-slot="scroll-progress"
      className={cn('fixed top-0 inset-x-0 z-50 pointer-events-none select-none', className)}
      {...props}
    >
      {/* Progress Line */}
      <div
        className="transition-all duration-100 ease-out shadow-xs"
        style={{
          width: `${progress}%`,
          height: `${height}px`,
          backgroundColor: `var(--${theme}-solid, #3b82f6)`,
        }}
      />

      {/* Percentage Pill */}
      {showPercentage && progress > 2 && (
        <div
          className="absolute top-2 right-4 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--surface-contrast,rgba(0,0,0,0.85))] text-[var(--ink-inverse,#fff)] shadow-md"
        >
          {Math.round(progress)}%
        </div>
      )}
    </div>
  )
}
