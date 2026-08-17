'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PartyPopper } from 'lucide-react'

export interface ConfettiProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger?: boolean
  particleCount?: number
  colors?: string[]
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotSpeed: number
  opacity: number
}

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4']

export function Confetti({
  trigger = false,
  particleCount = 80,
  colors = DEFAULT_COLORS,
  className,
  ...props
}: ConfettiProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = React.useState(false)

  const burst = React.useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.parentElement?.clientWidth || 300
    canvas.height = canvas.parentElement?.clientHeight || 200

    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      opacity: 1,
    }))

    setIsActive(true)

    let animationFrameId: number
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let livingCount = 0

      particles.forEach((p) => {
        if (p.opacity <= 0) return
        livingCount++

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.4 // gravity
        p.rotation += p.rotSpeed
        p.opacity -= 0.015

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      })

      if (livingCount > 0) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        setIsActive(false)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    render()

    return () => cancelAnimationFrame(animationFrameId)
  }, [particleCount, colors])

  React.useEffect(() => {
    if (trigger) {
      burst()
    }
  }, [trigger, burst])

  return (
    <div
      data-slot="confetti"
      className={cn(
        'relative flex flex-col items-center justify-center p-8 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none overflow-hidden min-h-[180px]',
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 size-full z-10"
      />

      <div className="flex flex-col items-center text-center gap-2 z-0">
        <div className="size-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shadow-xs">
          <PartyPopper className="size-5" />
        </div>
        <h4 className="font-bold text-sm text-[var(--ink-primary)]">Celebratory Confetti Cannon</h4>
        <p className="text-xs text-[var(--ink-muted)] max-w-xs">
          Physics particle burst for milestone completions, promotions, and onboarding.
        </p>

        <Button
          variant="solid"
          theme="brand"
          size="xs"
          onClick={burst}
          className="mt-2"
          prefix={<PartyPopper className="size-3" />}
        >
          Launch Confetti Burst
        </Button>
      </div>
    </div>
  )
}
