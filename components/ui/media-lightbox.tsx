'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Info,
  Maximize2,
} from 'lucide-react'
import { toast } from 'sonner'

export interface MediaItem {
  id: string
  title: string
  url: string
  aspectRatio?: string
  dimensions: string
  size: string
  format: string
}

export interface MediaLightboxProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: MediaItem[]
}

const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: 'img-1',
    title: 'Cloud Cluster Topology Dark',
    url: '/images/logo-dark.png',
    dimensions: '1920 × 1080 px',
    size: '420 KB',
    format: 'PNG',
  },
  {
    id: 'img-2',
    title: 'Strider Brandmark Vector',
    url: '/images/logo-light.png',
    dimensions: '800 × 800 px',
    size: '180 KB',
    format: 'PNG',
  },
]

export function MediaLightbox({
  items = DEFAULT_MEDIA,
  className,
  ...props
}: MediaLightboxProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [showMetadata, setShowMetadata] = React.useState(true)
  const currentItem = items[activeIndex] || items[0]

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div
      data-slot="media-lightbox"
      className={cn(
        'flex flex-col rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-muted)] border-b border-[var(--outline-base)] text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <ImageIcon className="size-4 text-[var(--brand-solid)] shrink-0" />
          <span className="font-bold text-[var(--ink-primary)] truncate">{currentItem.title}</span>
          <span className="text-[10px] font-mono text-[var(--ink-muted)]">
            ({activeIndex + 1} of {items.length})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowMetadata(!showMetadata)}
            className={cn(
              'size-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer border',
              showMetadata
                ? 'bg-[var(--brand-subtle)] text-[var(--brand-solid)] border-[var(--brand-solid)]/40'
                : 'bg-[var(--surface-base)] text-[var(--ink-muted)] border-[var(--outline-base)]'
            )}
            title="Toggle metadata"
          >
            <Info className="size-3.5" />
          </button>
          <Button
            variant="outline"
            theme="gray"
            size="xs"
            onClick={() => toast.success(`Exported asset: ${currentItem.title}`)}
            prefix={<Download className="size-3" />}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="relative flex flex-col md:flex-row items-center bg-slate-950 min-h-[260px] p-6 text-slate-100">
        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-slate-900/80 hover:bg-slate-800 flex items-center justify-center text-slate-200 border border-slate-700 cursor-pointer z-10 shadow-md"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 size-8 rounded-full bg-slate-900/80 hover:bg-slate-800 flex items-center justify-center text-slate-200 border border-slate-700 cursor-pointer z-10 shadow-md"
        >
          <ChevronRight className="size-4" />
        </button>

        {/* Center Image Canvas */}
        <div className="flex-1 flex items-center justify-center p-4">
          <img
            src={currentItem.url}
            alt={currentItem.title}
            className="max-h-48 max-w-full object-contain rounded-xl drop-shadow-md"
          />
        </div>

        {/* Metadata Sidebar */}
        {showMetadata && (
          <div className="w-full md:w-56 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono flex flex-col gap-2">
            <span className="font-bold text-[11px] text-slate-300 font-sans uppercase tracking-wider">
              Asset Properties
            </span>
            <div className="flex flex-col gap-1.5 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Dimensions:</span>
                <span className="text-slate-100">{currentItem.dimensions}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>File Size:</span>
                <span className="text-slate-100">{currentItem.size}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Encoding:</span>
                <span className="text-emerald-400">{currentItem.format}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Filmstrip Carousel */}
      <div className="flex items-center gap-2 p-2.5 bg-[var(--surface-base)] border-t border-[var(--outline-base)] overflow-x-auto">
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={cn(
              'size-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-slate-900 p-1 flex items-center justify-center',
              activeIndex === idx
                ? 'border-[var(--brand-solid)] ring-2 ring-[var(--brand-solid)]/30'
                : 'border-[var(--outline-base)] opacity-60 hover:opacity-100'
            )}
          >
            <img src={item.url} alt={item.title} className="max-h-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  )
}
