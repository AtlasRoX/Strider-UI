'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface WatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  subtext?: string
  gap?: [number, number]
  rotate?: number
  fontSize?: number
  fontColor?: string
  children?: React.ReactNode
}

export function Watermark({
  text = 'CONFIDENTIAL',
  subtext,
  gap = [120, 100],
  rotate = -22,
  fontSize = 13,
  fontColor = 'rgba(148, 163, 184, 0.16)',
  children,
  className,
  ...props
}: WatermarkProps) {
  const [base64Url, setBase64Url] = React.useState('')

  React.useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = 2 // Crisp HiDPI rendering
    const [gapX, gapY] = gap
    const logicalWidth = gapX + 140
    const logicalHeight = gapY + 70

    canvas.width = logicalWidth * dpr
    canvas.height = logicalHeight * dpr
    ctx.scale(dpr, dpr)

    ctx.translate(logicalWidth / 2, logicalHeight / 2)
    ctx.rotate((rotate * Math.PI) / 180)
    ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`
    ctx.fillStyle = fontColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 0, subtext ? -8 : 0)

    if (subtext) {
      ctx.font = `500 ${Math.max(9, fontSize - 3)}px system-ui, -apple-system, sans-serif`
      ctx.fillText(subtext, 0, 10)
    }

    setBase64Url(canvas.toDataURL())
  }, [text, subtext, gap, rotate, fontSize, fontColor])

  return (
    <div
      data-slot="watermark"
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      {children}

      {/* Watermark Repeating Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20 select-none"
        style={{
          backgroundImage: `url(${base64Url})`,
          backgroundSize: `${gap[0] + 140}px ${gap[1] + 70}px`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />
    </div>
  )
}
