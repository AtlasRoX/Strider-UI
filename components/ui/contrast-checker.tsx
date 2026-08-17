'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Check, X, Eye } from 'lucide-react'

export interface ContrastCheckerProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultForeground?: string
  defaultBackground?: string
}

function getLuminance(hex: string): number {
  let color = hex.replace('#', '')
  if (color.length === 3) {
    color = color.split('').map((c) => c + c).join('')
  }
  const r = parseInt(color.substring(0, 2), 16) / 255
  const g = parseInt(color.substring(2, 4), 16) / 255
  const b = parseInt(color.substring(4, 6), 16) / 255

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

function getContrastRatio(hex1: string, hex2: string): number {
  try {
    const l1 = getLuminance(hex1)
    const l2 = getLuminance(hex2)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
  } catch {
    return 1
  }
}

export function ContrastChecker({
  defaultForeground = '#0f172a',
  defaultBackground = '#ffffff',
  className,
  ...props
}: ContrastCheckerProps) {
  const [fg, setFg] = React.useState(defaultForeground)
  const [bg, setBg] = React.useState(defaultBackground)

  const ratio = React.useMemo(() => {
    return getContrastRatio(fg, bg)
  }, [fg, bg])

  const formattedRatio = ratio.toFixed(2)
  const passAALarge = ratio >= 3.0
  const passAA = ratio >= 4.5
  const passAAA = ratio >= 7.0

  return (
    <div
      data-slot="contrast-checker"
      className={cn(
        'flex flex-col gap-4 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-xs select-none max-w-md w-full',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40">
        <div className="flex items-center gap-2">
          <Eye className="size-4 text-[var(--brand-solid)]" />
          <span className="font-bold text-xs text-[var(--ink-primary)]">
            WCAG 2.2 Contrast Ratio Evaluator
          </span>
        </div>

        <span className="font-mono font-extrabold text-sm text-[var(--ink-primary)]">
          {formattedRatio} : 1
        </span>
      </div>

      {/* Live Sample Box */}
      <div
        className="p-5 rounded-2xl border border-black/10 flex flex-col gap-1 transition-colors text-center shadow-inner"
        style={{ backgroundColor: bg, color: fg }}
      >
        <span className="text-lg font-bold">Designing Iconic Interfaces</span>
        <span className="text-xs opacity-90 font-medium">
          Readable text with verified WCAG compliance score.
        </span>
      </div>

      {/* Color Inputs */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[var(--ink-secondary)]">Text Color</label>
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)]">
            <input
              type="color"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="size-6 rounded border-none bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="w-full font-mono text-xs text-[var(--ink-primary)] uppercase outline-hidden"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-[var(--ink-secondary)]">Background Color</label>
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)]">
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="size-6 rounded border-none bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="w-full font-mono text-xs text-[var(--ink-primary)] uppercase outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Compliance Badges Grid */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[var(--outline-base)]/40 text-center">
        <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--surface-muted)]/60">
          <span className="text-[10px] font-bold text-[var(--ink-muted)]">AA Large</span>
          <Badge variant={passAALarge ? 'solid' : 'subtle'} theme={passAALarge ? 'emerald' : 'gray'} size="sm">
            {passAALarge ? 'Pass' : 'Fail'}
          </Badge>
        </div>

        <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--surface-muted)]/60">
          <span className="text-[10px] font-bold text-[var(--ink-muted)]">AA Normal</span>
          <Badge variant={passAA ? 'solid' : 'subtle'} theme={passAA ? 'emerald' : 'gray'} size="sm">
            {passAA ? 'Pass' : 'Fail'}
          </Badge>
        </div>

        <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--surface-muted)]/60">
          <span className="text-[10px] font-bold text-[var(--ink-muted)]">AAA Normal</span>
          <Badge variant={passAAA ? 'solid' : 'subtle'} theme={passAAA ? 'emerald' : 'gray'} size="sm">
            {passAAA ? 'Pass' : 'Fail'}
          </Badge>
        </div>
      </div>
    </div>
  )
}
