'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Layers,
} from 'lucide-react'

export type MilestoneStatus = 'completed' | 'in_progress' | 'planned' | 'delayed'

export interface RoadmapMilestone {
  id: string
  title: string
  category: string
  startMonth: number // 1 - 12 (Jan - Dec)
  durationMonths: number // 1 - 6
  progress: number // 0 - 100
  status: MilestoneStatus
  owner?: { name: string; avatar?: string }
}

export interface RoadmapGanttProps extends React.HTMLAttributes<HTMLDivElement> {
  milestones?: RoadmapMilestone[]
  year?: number
  onMilestoneClick?: (milestone: RoadmapMilestone) => void
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const DEFAULT_MILESTONES: RoadmapMilestone[] = [
  {
    id: 'm-1',
    title: 'Core Design Tokens & OKLCH Engine',
    category: 'Foundation',
    startMonth: 1,
    durationMonths: 2,
    progress: 100,
    status: 'completed',
    owner: { name: 'Alex' },
  },
  {
    id: 'm-2',
    title: 'Multi-Tenant Authentication & 2FA Vault',
    category: 'Security',
    startMonth: 2,
    durationMonths: 3,
    progress: 90,
    status: 'in_progress',
    owner: { name: 'Sarah' },
  },
  {
    id: 'm-3',
    title: 'AI Copilot & Query Intelligence',
    category: 'AI Platform',
    startMonth: 4,
    durationMonths: 4,
    progress: 45,
    status: 'in_progress',
    owner: { name: 'Marcus' },
  },
  {
    id: 'm-4',
    title: 'Global Edge Cache & Real-time Webhooks',
    category: 'Infrastructure',
    startMonth: 7,
    durationMonths: 3,
    progress: 10,
    status: 'planned',
    owner: { name: 'Elena' },
  },
  {
    id: 'm-5',
    title: 'Enterprise Billing & Custom Invoicing',
    category: 'FinOps',
    startMonth: 9,
    durationMonths: 3,
    progress: 0,
    status: 'planned',
    owner: { name: 'David' },
  },
]

export function RoadmapGantt({
  milestones = DEFAULT_MILESTONES,
  year = 2026,
  onMilestoneClick,
  className,
  ...props
}: RoadmapGanttProps) {
  const [selectedMilestone, setSelectedMilestone] = React.useState<RoadmapMilestone | null>(milestones[1] || null)

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return <Badge variant="solid" theme="emerald" size="sm">Complete</Badge>
      case 'in_progress':
        return <Badge variant="solid" theme="brand" size="sm">In Progress</Badge>
      case 'delayed':
        return <Badge variant="solid" theme="rose" size="sm">Delayed</Badge>
      default:
        return <Badge variant="subtle" theme="gray" size="sm">Planned</Badge>
    }
  }

  const getBarGradient = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return 'from-emerald-500 to-teal-600 text-white'
      case 'in_progress':
        return 'from-[var(--brand-solid)] to-indigo-600 text-white'
      case 'delayed':
        return 'from-rose-500 to-amber-600 text-white'
      default:
        return 'from-slate-700 to-slate-800 text-slate-200'
    }
  }

  return (
    <div
      data-slot="roadmap-gantt"
      className={cn(
        'flex flex-col gap-4 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none overflow-x-auto',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold">
            <Layers className="size-3.5" />
          </div>
          <span className="font-bold text-[var(--ink-primary)]">Product Roadmap & Sprints</span>
          <span className="font-mono text-[10px] text-[var(--ink-muted)] px-2 py-0.5 rounded-md bg-[var(--surface-muted)]">
            FY {year}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[var(--ink-muted)]">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span>Complete</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[var(--brand-solid)]" />
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-slate-500" />
            <span>Planned</span>
          </div>
        </div>
      </div>

      {/* Gantt Timeline Grid */}
      <div className="min-w-[680px] flex flex-col gap-2">
        {/* Month Header Axis */}
        <div className="grid grid-cols-12 gap-1 text-[10px] font-mono font-bold text-[var(--ink-muted)] uppercase border-b border-[var(--outline-base)]/40 pb-2">
          {MONTHS.map((m) => (
            <div key={m} className="text-center">
              {m}
            </div>
          ))}
        </div>

        {/* Milestone Rows */}
        <div className="flex flex-col gap-3 pt-2">
          {milestones.map((ms) => {
            const startCol = ms.startMonth
            const colSpan = ms.durationMonths
            const isSelected = selectedMilestone?.id === ms.id

            return (
              <div
                key={ms.id}
                onClick={() => {
                  setSelectedMilestone(ms)
                  onMilestoneClick?.(ms)
                }}
                className={cn(
                  'flex flex-col gap-1.5 p-2.5 rounded-2xl border transition-all cursor-pointer',
                  isSelected
                    ? 'bg-[var(--brand-subtle)]/20 border-[var(--brand-solid)] shadow-xs'
                    : 'bg-[var(--surface-muted)]/30 border-[var(--outline-base)] hover:border-[var(--brand-solid)]/40'
                )}
              >
                {/* Milestone Info */}
                <div className="flex items-center justify-between text-xs px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--ink-primary)]">{ms.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--surface-base)] text-[var(--ink-muted)] font-mono border border-[var(--outline-base)]">
                      {ms.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {ms.owner && <Avatar label={ms.owner.name} size="xs" />}
                    {getStatusBadge(ms.status)}
                  </div>
                </div>

                {/* Horizontal Gantt Bar Track */}
                <div className="grid grid-cols-12 gap-1 relative h-6 bg-[var(--surface-base)] rounded-xl border border-[var(--outline-base)]/40 p-0.5 overflow-hidden">
                  <div
                    className={cn(
                      'relative rounded-lg bg-gradient-to-r shadow-xs flex items-center justify-between px-2 text-[10px] font-bold overflow-hidden transition-all',
                      getBarGradient(ms.status)
                    )}
                    style={{
                      gridColumnStart: startCol,
                      gridColumnEnd: `span ${colSpan}`,
                    }}
                  >
                    <span className="truncate">{ms.progress}%</span>
                    <span className="text-[9px] opacity-80 uppercase tracking-wider font-mono">
                      {MONTHS[ms.startMonth - 1]} - {MONTHS[ms.startMonth + ms.durationMonths - 2]}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
