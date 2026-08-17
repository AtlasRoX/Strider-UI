'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  targetDate: string | Date
  onComplete?: () => void
  theme?: ThemeColor
  showDays?: boolean
  showLabels?: boolean
  variant?: 'flip' | 'card' | 'pill' | 'simple'
  size?: 'sm' | 'md' | 'lg'
}

export function Countdown({
  targetDate,
  onComplete,
  theme = 'brand',
  showDays = true,
  showLabels = true,
  variant = 'flip',
  size = 'md',
  className,
  ...props
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false,
  })

  React.useEffect(() => {
    const target = new Date(targetDate).getTime()

    const calculate = () => {
      const now = Date.now()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, completed: true })
        onComplete?.()
        return true
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, completed: false })
      return false
    }

    calculate()
    const timer = setInterval(() => {
      const isDone = calculate()
      if (isDone) clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  const pad = (n: number) => n.toString().padStart(2, '0')

  const timeUnits = [
    ...(showDays ? [{ label: 'Days', value: pad(timeLeft.days) }] : []),
    { label: 'Hours', value: pad(timeLeft.hours) },
    { label: 'Minutes', value: pad(timeLeft.minutes) },
    { label: 'Seconds', value: pad(timeLeft.seconds) },
  ]

  if (variant === 'simple') {
    return (
      <div
        data-slot="countdown"
        className={cn(
          'inline-flex items-center gap-1.5 font-mono font-bold text-base text-[var(--ink-primary)]',
          className
        )}
        {...props}
      >
        {timeUnits.map((u, i) => (
          <React.Fragment key={u.label}>
            <span className="tabular-nums">{u.value}</span>
            {i < timeUnits.length - 1 && (
              <span className="text-[var(--ink-muted)] animate-pulse">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }

  if (variant === 'pill') {
    return (
      <div
        data-slot="countdown"
        className={cn(
          'inline-flex items-center gap-1.5 p-1 rounded-full border border-[var(--outline-base)] bg-[var(--surface-muted)]/80 backdrop-blur-md select-none',
          className
        )}
        {...props}
      >
        {timeUnits.map((u, i) => (
          <div key={u.label} className="flex items-center">
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[var(--surface-base)] text-[var(--ink-primary)] shadow-xs">
              {u.value}
              <span className="ml-1 text-[9px] font-sans font-medium text-[var(--ink-muted)] uppercase">
                {u.label[0]}
              </span>
            </span>
            {i < timeUnits.length - 1 && (
              <span className="text-[var(--ink-muted)] text-xs mx-0.5">:</span>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Deluxe Flip Card & Card variant
  return (
    <div
      data-slot="countdown"
      className={cn('inline-flex items-center gap-3 select-none', className)}
      {...props}
    >
      {timeUnits.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1.5">
            {/* Flip Digit Card */}
            <div
              className={cn(
                'relative flex items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 bg-linear-to-b from-[var(--surface-card)] to-[var(--surface-muted)] shadow-md overflow-hidden',
                size === 'sm' && 'min-w-[48px] h-12 text-lg',
                size === 'md' && 'min-w-[62px] h-16 text-2xl',
                size === 'lg' && 'min-w-[76px] h-20 text-3xl'
              )}
            >
              {/* Top/Bottom Split Line */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/15 dark:bg-white/10 z-10" />

              {/* Side Pin Notches */}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 size-2 rounded-full bg-[var(--surface-base)] border border-[var(--outline-base)] z-20" />
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 size-2 rounded-full bg-[var(--surface-base)] border border-[var(--outline-base)] z-20" />

              {/* Glowing Ambient Gradient */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, var(--${theme}-solid, #3b82f6), transparent 70%)`,
                }}
              />

              <span className="font-mono font-black tracking-tight text-[var(--ink-primary)] tabular-nums z-0">
                {u.value}
              </span>
            </div>

            {/* Sub-label */}
            {showLabels && (
              <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--ink-muted)] font-mono">
                {u.label}
              </span>
            )}
          </div>

          {/* Colon Separator */}
          {i < timeUnits.length - 1 && (
            <div className="flex flex-col gap-1 text-[var(--ink-muted)] mb-4 select-none">
              <span className="size-1.5 rounded-full bg-[var(--outline-base)]" />
              <span className="size-1.5 rounded-full bg-[var(--outline-base)]" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
