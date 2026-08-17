'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Users, ChevronDown, ChevronUp, Briefcase } from 'lucide-react'

export interface OrgNode {
  id: string
  name: string
  title: string
  department: string
  avatar?: string
  reports?: OrgNode[]
}

export interface OrgChartTreeProps extends React.HTMLAttributes<HTMLDivElement> {
  rootNode?: OrgNode
}

const DEFAULT_ORG_ROOT: OrgNode = {
  id: 'exec-1',
  name: 'Elena Rostova',
  title: 'Chief Technology Officer',
  department: 'Engineering',
  reports: [
    {
      id: 'lead-1',
      name: 'Marcus Chen',
      title: 'Principal Architect',
      department: 'Platform Architecture',
      reports: [
        { id: 'eng-1', name: 'David Kim', title: 'Senior Cloud Engineer', department: 'Infrastructure' },
        { id: 'eng-2', name: 'Sophia Taylor', title: 'Security Engineer', department: 'InfoSec' },
      ],
    },
    {
      id: 'lead-2',
      name: 'Sarah Connor',
      title: 'Head of Product Design',
      department: 'Design Systems',
      reports: [
        { id: 'des-1', name: 'Alex Rivera', title: 'Lead UI Engineer', department: 'Frontend Core' },
      ],
    },
  ],
}

function OrgCard({ node }: { node: OrgNode }) {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const hasReports = node.reports && node.reports.length > 0

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-[var(--surface-card)] border border-[var(--outline-base)] shadow-xs hover:border-[var(--brand-solid)] transition-all min-w-[200px] max-w-[240px] text-center">
        <div className="flex items-center justify-center">
          <Avatar label={node.name} size="sm" />
        </div>
        <span className="font-bold text-xs text-[var(--ink-primary)]">{node.name}</span>
        <span className="text-[11px] text-[var(--ink-muted)]">{node.title}</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--brand-subtle)] text-[var(--brand-solid)] font-medium self-center">
          {node.department}
        </span>

        {hasReports && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-1 mt-1 text-[10px] text-[var(--ink-muted)] hover:text-[var(--brand-solid)] cursor-pointer"
          >
            <span>{node.reports?.length} reports</span>
            {isExpanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          </button>
        )}
      </div>

      {/* Children connector lines and sub-nodes */}
      {hasReports && isExpanded && (
        <div className="flex flex-col items-center w-full pt-3">
          <div className="w-0.5 h-4 bg-[var(--outline-base)]" />
          <div className="flex items-start justify-center gap-6 relative before:absolute before:top-0 before:left-1/4 before:right-1/4 before:h-0.5 before:bg-[var(--outline-base)]">
            {node.reports?.map((child) => (
              <OrgCard key={child.id} node={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function OrgChartTree({
  rootNode = DEFAULT_ORG_ROOT,
  className,
  ...props
}: OrgChartTreeProps) {
  return (
    <div
      data-slot="org-chart-tree"
      className={cn(
        'flex flex-col gap-4 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none overflow-x-auto',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold">
            <Users className="size-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--ink-primary)]">Organization & Reporting Hierarchy</h4>
            <span className="text-[11px] text-[var(--ink-muted)]">
              Interactive departmental reporting lines and team distribution
            </span>
          </div>
        </div>

        <Badge variant="subtle" theme="brand" size="sm">
          Engineering Core
        </Badge>
      </div>

      {/* Chart Canvas */}
      <div className="min-w-[620px] flex justify-center py-4">
        <OrgCard node={rootNode} />
      </div>
    </div>
  )
}
