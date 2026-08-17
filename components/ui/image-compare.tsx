'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronsLeftRight } from 'lucide-react'

export interface ImageCompareProps extends React.HTMLAttributes<HTMLDivElement> {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  defaultPosition?: number // 0 to 100
}

export function ImageCompare({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  defaultPosition = 50,
  className,
  ...props
}: ImageCompareProps) {
  const [sliderPosition, setSliderPosition] = React.useState(defaultPosition)
  const [isDragging, setIsDragging] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percent)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    handleMove(e.clientX)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}
  }

  return (
    <div
      ref={containerRef}
      data-slot="image-compare"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={cn(
        'relative w-full aspect-video rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[var(--outline-base)] shadow-sm bg-[var(--surface-muted)] flex items-center justify-center',
        className
      )}
      {...props}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 size-full object-contain p-6 pointer-events-none"
      />
      <span className="absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs pointer-events-none z-10">
        {afterLabel}
      </span>

      {/* Before Image with clip-path (Top Overlay) */}
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="absolute inset-0 size-full object-contain p-6 pointer-events-none"
        style={{
          clipPath: `inset(0 calc(100% - ${sliderPosition}%) 0 0)`,
        }}
      />
      <span
        className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs pointer-events-none z-10 transition-opacity"
        style={{ opacity: sliderPosition < 15 ? 0 : 1 }}
      >
        {beforeLabel}
      </span>

      {/* Split Divider Line & Handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white shadow-lg pointer-events-none -translate-x-1/2 z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 rounded-full bg-white text-zinc-900 shadow-xl flex items-center justify-center pointer-events-auto cursor-ew-resize">
          <ChevronsLeftRight className="size-4 stroke-[2.5]" />
        </div>
      </div>
    </div>
  )
}
