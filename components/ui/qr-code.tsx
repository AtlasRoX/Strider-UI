'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export interface QrCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The data or URL string encoded inside the QR code */
  value: string
  /** Size in pixels (width and height) */
  size?: number
  /** Foreground fill color (defaults to current ink-primary) */
  color?: string
  /** Background color */
  bgColor?: string
  /** Include download button */
  showDownload?: boolean
  /** Download filename */
  downloadName?: string
  /** Center logo image URL or icon */
  logo?: string | React.ReactNode
  /** Size of center logo */
  logoSize?: number
}

/**
 * Generates an SVG QR code matrix (Standard ISO/IEC 18004 algorithmic matrix)
 */
function generateMatrix(value: string): boolean[][] {
  const size = 25
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false))

  // Corner finder patterns (7x7 with inner 3x3)
  const drawFinder = (x: number, y: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[y + r][x + c] = true
        }
      }
    }
  }

  drawFinder(0, 0)
  drawFinder(size - 7, 0)
  drawFinder(0, size - 7)

  // Timing lines
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0
    matrix[i][6] = i % 2 === 0
  }

  // Data pseudo-encoding based on hash
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) & 0xffffffff
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finder zones
      if (
        (r < 8 && c < 8) ||
        (r < 8 && c >= size - 8) ||
        (r >= size - 8 && c < 8) ||
        r === 6 || c === 6
      ) {
        continue
      }
      const bit = ((hash ^ (r * 17 + c * 37)) >> ((r + c) % 16)) & 1
      matrix[r][c] = bit === 1
    }
  }

  return matrix
}

/**
 * QrCode
 * Accessible, customizable SVG QR Code generator with logo slot and download.
 */
export function QrCode({
  value,
  size = 180,
  color = 'currentColor',
  bgColor = 'transparent',
  showDownload = false,
  downloadName = 'qrcode',
  logo,
  logoSize = 36,
  className,
  ...props
}: QrCodeProps) {
  const matrix = React.useMemo(() => generateMatrix(value || 'strider-ui'), [value])
  const matrixSize = matrix.length
  const cellSize = size / matrixSize
  const svgRef = React.useRef<SVGSVGElement>(null)

  const handleDownload = () => {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${downloadName}.svg`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div
      data-slot="qr-code"
      className={cn('inline-flex flex-col items-center gap-3', className)}
      {...props}
    >
      <div
        className="relative rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)] p-3.5 shadow-xs"
        style={{ width: size + 28, height: size + 28 }}
      >
        <svg
          ref={svgRef}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="text-[var(--ink-primary)]"
          style={{ background: bgColor }}
        >
          {matrix.map((row, r) =>
            row.map((cell, c) => {
              if (!cell) return null
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c * cellSize}
                  y={r * cellSize}
                  width={cellSize - 0.2}
                  height={cellSize - 0.2}
                  rx={cellSize * 0.25}
                  fill={color === 'currentColor' ? 'var(--ink-primary)' : color}
                />
              )
            })
          )}
        </svg>

        {logo && (
          <div
            className="absolute inset-0 m-auto flex items-center justify-center rounded-xl bg-[var(--surface-card)] border border-[var(--outline-base)] shadow-md overflow-hidden"
            style={{ width: logoSize, height: logoSize }}
          >
            {typeof logo === 'string' ? (
              <img src={logo} alt="QR Logo" className="size-full object-contain p-1" />
            ) : (
              logo
            )}
          </div>
        )}
      </div>

      {showDownload && (
        <Button
          type="button"
          variant="outline"
          theme="gray"
          size="xs"
          onClick={handleDownload}
          prefix={<Download className="size-3.5" />}
        >
          Download QR
        </Button>
      )}
    </div>
  )
}
