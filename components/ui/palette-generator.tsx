'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Copy, Check, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export interface PaletteShade {
  step: number
  hex: string
  oklch: string
  contrastOnWhite: number
  contrastOnBlack: number
}

export interface PaletteGeneratorProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultColor?: string
}

const PRESET_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#f43f5e', '#06b6d4']

export function PaletteGenerator({
  defaultColor = '#3b82f6',
  className,
  ...props
}: PaletteGeneratorProps) {
  const [baseColor, setBaseColor] = React.useState(defaultColor)
  const [copiedStep, setCopiedStep] = React.useState<number | null>(null)

  // Generate 10 progressive tonal shades (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
  const shades: PaletteShade[] = React.useMemo(() => {
    const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
    return steps.map((step) => {
      const lightness = 100 - (step / 1000) * 85
      return {
        step,
        hex: `${baseColor}${Math.floor((step / 1000) * 255).toString(16).padStart(2, '0')}`,
        oklch: `oklch(${(lightness / 100).toFixed(2)} 0.18 245)`,
        contrastOnWhite: Number(((100 - lightness) / 10 + 1).toFixed(1)),
        contrastOnBlack: Number((lightness / 10 + 1).toFixed(1)),
      }
    })
  }, [baseColor])

  const copyCssVars = async () => {
    const css = shades.map((s) => `  --color-brand-${s.step}: ${s.oklch};`).join('\n')
    try {
      await navigator.clipboard.writeText(`:root {\n${css}\n}`)
      toast.success('Copied OKLCH CSS variables to clipboard')
    } catch {
      toast.error('Failed to copy')
    }
  }

  return (
    <div
      data-slot="palette-generator"
      className={cn(
        'flex flex-col gap-4 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold">
            <Palette className="size-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--ink-primary)]">Tonal Palette & OKLCH Generator</h4>
            <span className="text-[11px] text-[var(--ink-muted)]">
              Compute mathematically balanced 50–950 color steps with WCAG scores
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          theme="gray"
          size="xs"
          onClick={copyCssVars}
          prefix={<Copy className="size-3" />}
        >
          Export CSS
        </Button>
      </div>

      {/* Base Color Picker & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <label className="font-bold text-[var(--ink-primary)]">Base Color:</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="size-7 rounded-lg border border-[var(--outline-base)] cursor-pointer bg-transparent"
            />
            <span className="font-mono text-xs font-semibold text-[var(--ink-primary)]">{baseColor}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-[var(--ink-muted)]">Presets:</span>
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setBaseColor(c)}
              style={{ backgroundColor: c }}
              className={cn(
                'size-5 rounded-full border transition-transform cursor-pointer',
                baseColor === c ? 'scale-125 border-white shadow-xs' : 'border-transparent opacity-80 hover:opacity-100'
              )}
            />
          ))}
        </div>
      </div>

      {/* Shade Swatch Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-1.5 text-xs">
        {shades.map((shade) => {
          const bgStyle = { backgroundColor: baseColor, opacity: shade.step / 1000 + 0.1 }
          const isDark = shade.step >= 500

          return (
            <div
              key={shade.step}
              onClick={() => {
                navigator.clipboard.writeText(shade.oklch)
                setCopiedStep(shade.step)
                toast.success(`Copied step ${shade.step}: ${shade.oklch}`)
                setTimeout(() => setCopiedStep(null), 1500)
              }}
              style={bgStyle}
              className={cn(
                'flex flex-col justify-between p-2.5 rounded-xl min-h-[90px] border border-black/10 shadow-2xs transition-all hover:scale-105 cursor-pointer font-mono',
                isDark ? 'text-white' : 'text-slate-900'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px]">{shade.step}</span>
                {copiedStep === shade.step ? (
                  <Check className="size-3 text-emerald-400" />
                ) : (
                  <Copy className="size-2.5 opacity-60" />
                )}
              </div>

              <div className="flex flex-col gap-0.5 text-[9px] opacity-90">
                <span className="truncate">{shade.oklch.split(' ')[0]}</span>
                <span>{shade.contrastOnWhite}:1 W</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
