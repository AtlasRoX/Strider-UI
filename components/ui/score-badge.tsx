'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Award, ShieldCheck, TrendingUp, CheckCircle2 } from 'lucide-react'

export type ScoreTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

export interface ScoreBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  score?: number
  maxScore?: number
  tier?: ScoreTier
  title?: string
  subtitle?: string
}

export function ScoreBadge({
  score = 94,
  maxScore = 100,
  tier = 'diamond',
  title = 'Enterprise Trust & Security Score',
  subtitle = 'Evaluated against 42 automated SOC2 and NIST compliance criteria',
  className,
  ...props
}: ScoreBadgeProps) {
  const percentage = Math.round((score / maxScore) * 100)

  // Circular progress SVG constants
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getTierGradient = (t: ScoreTier) => {
    switch (t) {
      case 'diamond':
        return 'from-sky-400 via-indigo-400 to-purple-500 text-white'
      case 'platinum':
        return 'from-slate-200 via-slate-400 to-slate-600 text-slate-900'
      case 'gold':
        return 'from-amber-300 via-amber-500 to-yellow-600 text-amber-950'
      case 'silver':
        return 'from-slate-300 to-slate-400 text-slate-800'
      default:
        return 'from-amber-700 to-amber-900 text-amber-100'
    }
  }

  const getScoreColor = (p: number) => {
    if (p >= 90) return 'text-emerald-500'
    if (p >= 70) return 'text-amber-500'
    return 'text-rose-500'
  }

  return (
    <div
      data-slot="score-badge"
      className={cn(
        'flex flex-col sm:flex-row items-center gap-5 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none',
        className
      )}
      {...props}
    >
      {/* Circular Progress Gauge */}
      <div className="relative size-24 shrink-0 flex items-center justify-center">
        <svg className="size-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-[var(--outline-base)]/40 fill-none"
            strokeWidth="8"
          />
          {/* Active progress arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={cn('fill-none stroke-current transition-all duration-700', getScoreColor(percentage))}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Score Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
          <span className="text-xl font-black text-[var(--ink-primary)] leading-none">{score}</span>
          <span className="text-[10px] text-[var(--ink-muted)] font-sans font-semibold">/ {maxScore}</span>
        </div>
      </div>

      {/* Description & Tier Badge */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0 text-center sm:text-left text-xs">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <h4 className="font-bold text-sm text-[var(--ink-primary)] truncate">{title}</h4>
          <span
            className={cn(
              'px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r shadow-2xs',
              getTierGradient(tier)
            )}
          >
            ★ {tier} Tier
          </span>
        </div>

        <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">{subtitle}</p>

        {/* Verification Checkpoints */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-[10px] text-[var(--ink-secondary)]">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="size-3" /> MFA Enforced
          </span>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="size-3" /> TLS 1.3 Strict
          </span>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="size-3" /> 0 CVE Breaches
          </span>
        </div>
      </div>
    </div>
  )
}
