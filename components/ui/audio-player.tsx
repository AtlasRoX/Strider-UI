'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react'

export interface AudioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  title?: string
  artist?: string
  waveformData?: number[]
  autoPlay?: boolean
}

export function AudioPlayer({
  src,
  title = 'Voice Message',
  artist = '0:42 duration',
  waveformData = [20, 45, 60, 80, 40, 90, 75, 50, 30, 85, 95, 65, 45, 70, 85, 60, 40, 25, 65, 80, 55, 35, 20],
  className,
  ...props
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(35) // 0 to 100
  const [isMuted, setIsMuted] = React.useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div
      data-slot="audio-player"
      className={cn(
        'flex items-center gap-4 p-3.5 rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-xs select-none max-w-md w-full',
        className
      )}
      {...props}
    >
      {/* Play/Pause Button */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        className="size-10 rounded-full flex items-center justify-center bg-[var(--brand-solid)] text-white shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
      >
        {isPlaying ? (
          <Pause className="size-4 fill-white" />
        ) : (
          <Play className="size-4 fill-white ml-0.5" />
        )}
      </button>

      {/* Track Info & Waveform */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[var(--ink-primary)] truncate">
            {title}
          </span>
          <span className="font-mono text-[10px] text-[var(--ink-muted)] shrink-0">
            {artist}
          </span>
        </div>

        {/* Waveform Bars */}
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const clickX = e.clientX - rect.left
            const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
            setProgress(percent)
          }}
          className="flex items-center gap-[3px] h-6 cursor-pointer group"
        >
          {waveformData.map((height, idx) => {
            const barPercent = (idx / waveformData.length) * 100
            const isPlayed = barPercent <= progress

            return (
              <div
                key={idx}
                className={cn(
                  'w-1 rounded-full transition-all duration-150',
                  isPlayed
                    ? 'bg-[var(--brand-solid)]'
                    : 'bg-[var(--surface-muted)] group-hover:bg-[var(--outline-base)]'
                )}
                style={{ height: `${Math.max(15, height)}%` }}
              />
            )
          })}
        </div>
      </div>

      {/* Mute Toggle */}
      <button
        type="button"
        onClick={() => setIsMuted(!isMuted)}
        className="size-8 rounded-lg flex items-center justify-center text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer shrink-0"
        aria-label="Toggle mute"
      >
        {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  )
}
