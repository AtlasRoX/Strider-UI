import * as React from 'react'
import { Check, X, HelpCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tooltip } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface ComparisonTier {
  id: string
  name: string
  price?: string
  description?: string
  popular?: boolean
  ctaLabel?: string
  onCtaClick?: () => void
}

export interface ComparisonFeature {
  name: string
  tooltip?: string
  category?: string
  values: Record<string, boolean | string>
}

export interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  tiers: ComparisonTier[]
  features: ComparisonFeature[]
}

/**
 * ComparisonTable
 * Multi-tier feature comparison matrix with category group headers,
 * boolean checkmarks, and responsive horizontal scrolling.
 */
export function ComparisonTable({
  tiers = [],
  features = [],
  className,
  ...props
}: ComparisonTableProps) {
  // Group features by category
  const categories = React.useMemo(() => {
    const map = new Map<string, ComparisonFeature[]>()
    for (const f of features) {
      const cat = f.category || 'General Features'
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(f)
    }
    return Array.from(map.entries())
  }, [features])

  return (
    <div
      data-slot="comparison-table"
      className={cn('w-full overflow-x-auto select-none rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-xs', className)}
      {...props}
    >
      <table className="w-full border-collapse text-left text-xs">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-[var(--outline-base)] bg-[var(--surface-muted)]/50">
            <th className="p-4 sm:p-6 font-bold text-[var(--ink-primary)] min-w-[200px]">
              Features & Capabilities
            </th>
            {tiers.map((tier) => (
              <th
                key={tier.id}
                className={cn(
                  'p-4 sm:p-6 text-center min-w-[150px] relative',
                  tier.popular && 'bg-[var(--brand-subtle)]/30'
                )}
              >
                {tier.popular && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2">
                    <Badge variant="solid" theme="brand" size="sm">
                      Popular
                    </Badge>
                  </div>
                )}
                <div className="flex flex-col items-center gap-1 mt-2">
                  <span className="font-extrabold text-sm text-[var(--ink-primary)]">
                    {tier.name}
                  </span>
                  {tier.price && (
                    <span className="text-base font-black text-[var(--ink-primary)]">
                      {tier.price}
                    </span>
                  )}
                  {tier.description && (
                    <span className="text-[11px] text-[var(--ink-muted)] font-normal">
                      {tier.description}
                    </span>
                  )}
                  {tier.ctaLabel && (
                    <Button
                      variant={tier.popular ? 'solid' : 'outline'}
                      theme="brand"
                      size="xs"
                      className="mt-2 w-full max-w-[130px]"
                      onClick={tier.onCtaClick}
                    >
                      {tier.ctaLabel}
                    </Button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body grouped by Category */}
        <tbody className="divide-y divide-[var(--outline-base)]/40">
          {categories.map(([category, catFeatures]) => (
            <React.Fragment key={category}>
              <tr className="bg-[var(--surface-muted)]/80">
                <td
                  colSpan={tiers.length + 1}
                  className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)]"
                >
                  {category}
                </td>
              </tr>

              {catFeatures.map((feat, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-[var(--surface-muted)]/30 transition-colors"
                >
                  <td className="p-3 sm:p-4 font-medium text-[var(--ink-primary)]">
                    <div className="flex items-center gap-1.5">
                      <span>{feat.name}</span>
                      {feat.tooltip && (
                        <Tooltip content={feat.tooltip}>
                          <HelpCircle className="size-3 text-[var(--ink-muted)] cursor-help" />
                        </Tooltip>
                      )}
                    </div>
                  </td>

                  {tiers.map((tier) => {
                    const val = feat.values[tier.id]
                    return (
                      <td
                        key={tier.id}
                        className={cn(
                          'p-3 sm:p-4 text-center font-medium',
                          tier.popular && 'bg-[var(--brand-subtle)]/15'
                        )}
                      >
                        {typeof val === 'boolean' ? (
                          val ? (
                            <Check className="size-4 text-[var(--emerald-solid)] mx-auto" />
                          ) : (
                            <X className="size-4 text-[var(--ink-muted)]/40 mx-auto" />
                          )
                        ) : (
                          <span className="text-[var(--ink-secondary)] text-[11px]">
                            {val ?? '—'}
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
