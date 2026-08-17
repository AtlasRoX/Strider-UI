'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table as TableIcon,
  Download,
  ChevronRight,
  ChevronDown,
  Calculator,
  ArrowUpDown,
} from 'lucide-react'
import { toast } from 'sonner'

export interface PivotRowGroup {
  id: string
  name: string
  items?: {
    id: string
    name: string
    q1: number
    q2: number
    q3: number
    q4: number
  }[]
  q1: number
  q2: number
  q3: number
  q4: number
}

export interface PivotTableProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: PivotRowGroup[]
  currencySymbol?: string
  title?: string
}

const DEFAULT_PIVOT_DATA: PivotRowGroup[] = [
  {
    id: 'na',
    name: 'North America (US/CA)',
    q1: 184500,
    q2: 212000,
    q3: 245000,
    q4: 298000,
    items: [
      { id: 'na-enterprise', name: 'Enterprise SaaS', q1: 120000, q2: 145000, q3: 172000, q4: 210000 },
      { id: 'na-growth', name: 'Growth & Mid-Market', q1: 64500, q2: 67000, q3: 73000, q4: 88000 },
    ],
  },
  {
    id: 'eu',
    name: 'EMEA (Europe/Middle East)',
    q1: 142000,
    q2: 158000,
    q3: 189000,
    q4: 224000,
    items: [
      { id: 'eu-enterprise', name: 'Enterprise SaaS', q1: 95000, q2: 108000, q3: 130000, q4: 155000 },
      { id: 'eu-growth', name: 'Growth & Mid-Market', q1: 47000, q2: 50000, q3: 59000, q4: 69000 },
    ],
  },
  {
    id: 'apac',
    name: 'Asia-Pacific (APAC)',
    q1: 88000,
    q2: 104000,
    q3: 128000,
    q4: 162000,
    items: [
      { id: 'apac-enterprise', name: 'Enterprise SaaS', q1: 52000, q2: 64000, q3: 81000, q4: 105000 },
      { id: 'apac-growth', name: 'Growth & Mid-Market', q1: 36000, q2: 40000, q3: 47000, q4: 57000 },
    ],
  },
]

export function PivotTable({
  data = DEFAULT_PIVOT_DATA,
  currencySymbol = '$',
  title = 'Annual Revenue Cross-Tabulation',
  className,
  ...props
}: PivotTableProps) {
  const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({ na: true, eu: true })

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const formatNumber = (num: number) => {
    return `${currencySymbol}${num.toLocaleString()}`
  }

  // Calculate Column Grand Totals
  const grandTotal = React.useMemo(() => {
    return data.reduce(
      (acc, r) => ({
        q1: acc.q1 + r.q1,
        q2: acc.q2 + r.q2,
        q3: acc.q3 + r.q3,
        q4: acc.q4 + r.q4,
        total: acc.total + r.q1 + r.q2 + r.q3 + r.q4,
      }),
      { q1: 0, q2: 0, q3: 0, q4: 0, total: 0 }
    )
  }, [data])

  const handleExportCsv = () => {
    const header = 'Region,Segment,Q1,Q2,Q3,Q4,Total\n'
    let rows = ''
    data.forEach((r) => {
      rows += `"${r.name}","Total",${r.q1},${r.q2},${r.q3},${r.q4},${r.q1 + r.q2 + r.q3 + r.q4}\n`
      r.items?.forEach((sub) => {
        rows += `"${r.name}","${sub.name}",${sub.q1},${sub.q2},${sub.q3},${sub.q4},${sub.q1 + sub.q2 + sub.q3 + sub.q4}\n`
      })
    })
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `strider-pivot-table-${Date.now()}.csv`
    a.click()
    toast.success('Exported Pivot Table CSV')
  }

  return (
    <div
      data-slot="pivot-table"
      className={cn(
        'flex flex-col gap-3 p-5 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-md select-none overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center font-bold">
            <Calculator className="size-3.5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--ink-primary)]">{title}</h4>
            <span className="text-[11px] text-[var(--ink-muted)]">Sum of quarterly booked ARR</span>
          </div>
        </div>

        <Button
          variant="outline"
          theme="gray"
          size="xs"
          onClick={handleExportCsv}
          prefix={<Download className="size-3" />}
        >
          Export CSV
        </Button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-[var(--outline-base)]/60 bg-[var(--surface-base)]">
        <table className="w-full text-xs text-left border-collapse min-w-[620px]">
          {/* Table Header */}
          <thead>
            <tr className="bg-[var(--surface-muted)] text-[var(--ink-secondary)] font-bold text-[11px] uppercase tracking-wider border-b border-[var(--outline-base)]">
              <th className="py-2.5 px-3 w-64">Dimensions / Segment</th>
              <th className="py-2.5 px-3 text-right">Q1 Revenue</th>
              <th className="py-2.5 px-3 text-right">Q2 Revenue</th>
              <th className="py-2.5 px-3 text-right">Q3 Revenue</th>
              <th className="py-2.5 px-3 text-right">Q4 Revenue</th>
              <th className="py-2.5 px-3 text-right font-black text-[var(--brand-solid)]">Annual Total</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[var(--outline-base)]/40 font-mono text-xs">
            {data.map((row) => {
              const isExpanded = Boolean(expandedRows[row.id])
              const rowTotal = row.q1 + row.q2 + row.q3 + row.q4

              return (
                <React.Fragment key={row.id}>
                  {/* Top-Level Group Header */}
                  <tr
                    onClick={() => toggleRow(row.id)}
                    className="bg-[var(--surface-muted)]/40 hover:bg-[var(--surface-muted)]/70 transition-colors cursor-pointer font-sans"
                  >
                    <td className="py-2 px-3 flex items-center gap-1.5 font-bold text-[var(--ink-primary)]">
                      {isExpanded ? (
                        <ChevronDown className="size-3.5 text-[var(--brand-solid)] shrink-0" />
                      ) : (
                        <ChevronRight className="size-3.5 text-[var(--ink-muted)] shrink-0" />
                      )}
                      <span>{row.name}</span>
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-semibold">{formatNumber(row.q1)}</td>
                    <td className="py-2 px-3 text-right font-mono font-semibold">{formatNumber(row.q2)}</td>
                    <td className="py-2 px-3 text-right font-mono font-semibold">{formatNumber(row.q3)}</td>
                    <td className="py-2 px-3 text-right font-mono font-semibold">{formatNumber(row.q4)}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-[var(--brand-solid)]">
                      {formatNumber(rowTotal)}
                    </td>
                  </tr>

                  {/* Sub-Rows if expanded */}
                  {isExpanded &&
                    row.items?.map((sub) => {
                      const subTotal = sub.q1 + sub.q2 + sub.q3 + sub.q4
                      return (
                        <tr key={sub.id} className="hover:bg-[var(--surface-muted)]/20 transition-colors">
                          <td className="py-1.5 px-3 pl-8 text-[var(--ink-secondary)] font-sans">
                            ↳ {sub.name}
                          </td>
                          <td className="py-1.5 px-3 text-right text-[var(--ink-muted)]">{formatNumber(sub.q1)}</td>
                          <td className="py-1.5 px-3 text-right text-[var(--ink-muted)]">{formatNumber(sub.q2)}</td>
                          <td className="py-1.5 px-3 text-right text-[var(--ink-muted)]">{formatNumber(sub.q3)}</td>
                          <td className="py-1.5 px-3 text-right text-[var(--ink-muted)]">{formatNumber(sub.q4)}</td>
                          <td className="py-1.5 px-3 text-right font-semibold text-[var(--ink-primary)]">
                            {formatNumber(subTotal)}
                          </td>
                        </tr>
                      )
                    })}
                </React.Fragment>
              )
            })}

            {/* Grand Total Row */}
            <tr className="bg-[var(--brand-subtle)]/30 font-bold border-t-2 border-[var(--outline-base)]">
              <td className="py-2.5 px-3 font-sans text-[var(--ink-primary)]">Global Grand Total</td>
              <td className="py-2.5 px-3 text-right">{formatNumber(grandTotal.q1)}</td>
              <td className="py-2.5 px-3 text-right">{formatNumber(grandTotal.q2)}</td>
              <td className="py-2.5 px-3 text-right">{formatNumber(grandTotal.q3)}</td>
              <td className="py-2.5 px-3 text-right">{formatNumber(grandTotal.q4)}</td>
              <td className="py-2.5 px-3 text-right text-[var(--brand-solid)] font-black text-sm">
                {formatNumber(grandTotal.total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
