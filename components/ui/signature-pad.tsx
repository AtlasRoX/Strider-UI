'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Trash2, Download, Check, Palette } from 'lucide-react'

export interface SignaturePadProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number
  height?: number
  strokeColor?: string
  strokeWidth?: number
  backgroundColor?: string
  onEnd?: (dataUrl: string) => void
  onClear?: () => void
  disabled?: boolean
  readOnly?: boolean
  showActions?: boolean
  showColorPicker?: boolean
  clearLabel?: string
  saveLabel?: string
}

export function SignaturePad({
  width = 450,
  height = 180,
  strokeColor,
  strokeWidth = 2.5,
  backgroundColor = 'transparent',
  onEnd,
  onClear,
  disabled = false,
  readOnly = false,
  showActions = true,
  showColorPicker = true,
  clearLabel = 'Clear',
  saveLabel = 'Download PNG',
  className,
  ...props
}: SignaturePadProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = React.useState(false)
  const [isEmpty, setIsEmpty] = React.useState(true)
  const [activePenColor, setActivePenColor] = React.useState<string>(strokeColor || 'auto')

  const PEN_COLORS = [
    { label: 'Auto (High Contrast)', value: 'auto', hex: 'currentColor' },
    { label: 'Royal Blue', value: '#3b82f6', hex: '#3b82f6' },
    { label: 'Emerald', value: '#10b981', hex: '#10b981' },
    { label: 'Deep Purple', value: '#8b5cf6', hex: '#8b5cf6' },
  ]

  const resolveActualStroke = React.useCallback(() => {
    if (activePenColor && activePenColor !== 'auto') return activePenColor
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark')
      return isDark ? '#ffffff' : '#0f172a'
    }
    return '#0f172a'
  }, [activePenColor])

  // Initialize canvas
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = resolveActualStroke()
    ctx.lineWidth = strokeWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [resolveActualStroke, strokeWidth])

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()

    if ('touches' in e) {
      const touch = e.touches[0]
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled || readOnly) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = resolveActualStroke()
    ctx.lineWidth = strokeWidth

    setIsDrawing(true)
    setIsEmpty(false)
    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled || readOnly) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (!canvas) return
    onEnd?.(canvas.toDataURL('image/png'))
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setIsEmpty(true)
    onClear?.()
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas || isEmpty) return
    const link = document.createElement('a')
    link.download = 'signature.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div
      data-slot="signature-pad"
      className={cn('flex flex-col gap-2.5 w-full max-w-lg select-none', className)}
      {...props}
    >
      <div className="relative rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)] overflow-hidden shadow-xs">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className={cn(
            'w-full touch-none select-none block bg-[var(--surface-card)]',
            disabled || readOnly ? 'cursor-not-allowed opacity-60' : 'cursor-crosshair'
          )}
          style={{ backgroundColor }}
        />

        {/* Signature Baseline Guide & Placeholder */}
        {isEmpty && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-[var(--ink-muted)]">
            <span className="text-xs font-medium">Draw your digital signature above</span>
            <div className="w-4/5 border-b border-dashed border-[var(--outline-base)] mt-4" />
          </div>
        )}
      </div>

      {showActions && !readOnly && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Pen Color Selector */}
          {showColorPicker && (
            <div className="flex items-center gap-1.5">
              {PEN_COLORS.map((c) => {
                const isSelected = activePenColor === c.value
                return (
                  <button
                    key={c.value}
                    type="button"
                    title={c.label}
                    onClick={() => setActivePenColor(c.value)}
                    className={cn(
                      'size-5 rounded-full border transition-all cursor-pointer flex items-center justify-center',
                      isSelected
                        ? 'ring-2 ring-[var(--brand-solid)] ring-offset-2 ring-offset-[var(--surface-base)] scale-110'
                        : 'hover:scale-105 opacity-80'
                    )}
                    style={{
                      backgroundColor: c.value === 'auto' ? 'var(--ink-primary)' : c.hex,
                      borderColor: 'var(--outline-base)',
                    }}
                  />
                )
              })}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              theme="rose"
              size="xs"
              disabled={isEmpty || disabled}
              onClick={handleClear}
              prefix={<Trash2 className="size-3" />}
            >
              {clearLabel}
            </Button>

            <Button
              variant="solid"
              theme="brand"
              size="xs"
              disabled={isEmpty || disabled}
              onClick={handleDownload}
              prefix={<Download className="size-3" />}
            >
              {saveLabel}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
