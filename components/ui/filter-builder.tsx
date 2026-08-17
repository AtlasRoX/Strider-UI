'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import {
  Filter,
  Plus,
  Trash2,
  Type,
  Hash,
  ListFilter,
  ToggleLeft,
  Calendar,
} from 'lucide-react'

export interface FilterField {
  id: string
  label: string
  type: 'text' | 'number' | 'select' | 'boolean' | 'date'
  options?: { label: string; value: string }[]
  placeholder?: string
}

export type FilterOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'greater_than'
  | 'less_than'
  | 'is_empty'
  | 'is_not_empty'

export interface FilterRule {
  id: string
  field: string
  operator: FilterOperator
  value: string
}

export interface FilterBuilderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  fields: FilterField[]
  rules?: FilterRule[]
  defaultRules?: FilterRule[]
  onChange?: (rules: FilterRule[], logic: 'AND' | 'OR') => void
  logic?: 'AND' | 'OR'
}

const OPERATOR_LABELS: Record<FilterOperator, { label: string; supportedTypes: FilterField['type'][]; noValue?: boolean }> = {
  equals: { label: 'is', supportedTypes: ['text', 'number', 'select', 'boolean', 'date'] },
  not_equals: { label: 'is not', supportedTypes: ['text', 'number', 'select', 'boolean', 'date'] },
  contains: { label: 'contains', supportedTypes: ['text'] },
  greater_than: { label: 'is greater than', supportedTypes: ['number', 'date'] },
  less_than: { label: 'is less than', supportedTypes: ['number', 'date'] },
  is_empty: { label: 'is empty', supportedTypes: ['text', 'number', 'select', 'date'], noValue: true },
  is_not_empty: { label: 'is not empty', supportedTypes: ['text', 'number', 'select', 'date'], noValue: true },
}

export function FilterBuilder({
  fields = [],
  rules: controlledRules,
  defaultRules = [
    { id: '1', field: 'status', operator: 'equals', value: 'Active' },
    { id: '2', field: 'role', operator: 'contains', value: 'Engineer' },
  ],
  onChange,
  logic: defaultLogic = 'AND',
  className,
  ...props
}: FilterBuilderProps) {
  const [internalRules, setInternalRules] = React.useState<FilterRule[]>(defaultRules)
  const [logic, setLogic] = React.useState<'AND' | 'OR'>(defaultLogic)

  const isControlled = controlledRules !== undefined
  const activeRules = isControlled ? controlledRules : internalRules

  const updateRules = (next: FilterRule[]) => {
    if (!isControlled) setInternalRules(next)
    onChange?.(next, logic)
  }

  const addRule = () => {
    const firstField = fields[0] || { id: 'status', label: 'Field', type: 'text' as const }
    const newRule: FilterRule = {
      id: Math.random().toString(36).substring(2, 9),
      field: firstField.id,
      operator: 'equals',
      value: firstField.type === 'select' ? firstField.options?.[0]?.value || '' : '',
    }
    updateRules([...activeRules, newRule])
  }

  const removeRule = (id: string) => {
    updateRules(activeRules.filter((r) => r.id !== id))
  }

  const clearRules = () => {
    updateRules([])
  }

  const updateRuleField = (id: string, updates: Partial<FilterRule>) => {
    updateRules(activeRules.map((r) => (r.id === id ? { ...r, ...updates } : r)))
  }

  const getFieldIcon = (type?: FilterField['type']) => {
    switch (type) {
      case 'number':
        return <Hash className="size-3.5 text-sky-500 shrink-0" />
      case 'select':
        return <ListFilter className="size-3.5 text-violet-500 shrink-0" />
      case 'boolean':
        return <ToggleLeft className="size-3.5 text-emerald-500 shrink-0" />
      case 'date':
        return <Calendar className="size-3.5 text-amber-500 shrink-0" />
      default:
        return <Type className="size-3.5 text-indigo-500 shrink-0" />
    }
  }

  return (
    <div
      data-slot="filter-builder"
      className={cn(
        'flex flex-col gap-3 p-4 rounded-3xl border border-[var(--outline-base)] bg-[var(--surface-card)] shadow-xs select-none w-full',
        className
      )}
      {...props}
    >
      {/* Clean Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--outline-base)]/40 text-xs">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-[var(--brand-subtle)] text-[var(--brand-solid)] flex items-center justify-center">
            <Filter className="size-3.5" />
          </div>
          <span className="font-bold text-[var(--ink-primary)]">Filter Conditions</span>
          {activeRules.length > 0 && (
            <Badge variant="subtle" theme="gray" size="sm">
              {activeRules.length}
            </Badge>
          )}
        </div>

        {/* Logic Mode Match All vs Match Any */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 bg-[var(--surface-muted)] p-0.5 rounded-xl text-[11px] border border-[var(--outline-base)]/40">
            <button
              type="button"
              onClick={() => {
                setLogic('AND')
                onChange?.(activeRules, 'AND')
              }}
              className={cn(
                'px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer',
                logic === 'AND'
                  ? 'bg-[var(--surface-base)] text-[var(--brand-solid)] shadow-2xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
              )}
            >
              Match All (AND)
            </button>
            <button
              type="button"
              onClick={() => {
                setLogic('OR')
                onChange?.(activeRules, 'OR')
              }}
              className={cn(
                'px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer',
                logic === 'OR'
                  ? 'bg-[var(--surface-base)] text-[var(--brand-solid)] shadow-2xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
              )}
            >
              Match Any (OR)
            </button>
          </div>

          {activeRules.length > 0 && (
            <button
              type="button"
              onClick={clearRules}
              className="text-[11px] text-[var(--ink-muted)] hover:text-rose-500 transition-colors cursor-pointer px-1.5 py-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Rules List */}
      <div className="flex flex-col gap-2">
        {activeRules.length === 0 ? (
          <div className="py-6 text-center text-xs text-[var(--ink-muted)] border border-dashed border-[var(--outline-base)] rounded-2xl">
            No active filters. Click below to add a condition.
          </div>
        ) : (
          activeRules.map((rule, idx) => {
            const currentField = fields.find((f) => f.id === rule.field) || fields[0]
            const fieldType = currentField?.type || 'text'

            // Allowed operators for field data type
            const allowedOperators = (Object.keys(OPERATOR_LABELS) as FilterOperator[]).filter((opKey) =>
              OPERATOR_LABELS[opKey].supportedTypes.includes(fieldType)
            )

            const opConfig = OPERATOR_LABELS[rule.operator] || OPERATOR_LABELS.equals

            return (
              <div
                key={rule.id}
                className="flex flex-col sm:flex-row sm:items-center gap-2 p-2.5 rounded-2xl bg-[var(--surface-muted)]/50 border border-[var(--outline-base)]/60 text-xs"
              >
                {/* Prefix Label: Where / And / Or */}
                <span
                  className={cn(
                    'w-14 text-center font-bold font-mono text-[10px] py-1.5 px-2 rounded-xl shrink-0',
                    idx === 0
                      ? 'bg-[var(--brand-subtle)] text-[var(--brand-solid)] border border-[var(--brand-solid)]/30'
                      : 'bg-[var(--surface-base)] text-[var(--ink-secondary)] border border-[var(--outline-base)]'
                  )}
                >
                  {idx === 0 ? 'WHERE' : logic}
                </span>

                {/* Field Dropdown using custom Strider Radix UI Select */}
                <div className="w-full sm:w-44 shrink-0">
                  <Select
                    value={rule.field}
                    onValueChange={(newFieldId) => {
                      const newF = fields.find((f) => f.id === newFieldId)
                      const newType = newF?.type || 'text'
                      const ops = (Object.keys(OPERATOR_LABELS) as FilterOperator[]).filter((k) =>
                        OPERATOR_LABELS[k].supportedTypes.includes(newType)
                      )
                      const validOp = ops.includes(rule.operator) ? rule.operator : ops[0] || 'equals'
                      const nextVal = newType === 'select' ? newF?.options?.[0]?.value || '' : ''
                      updateRuleField(rule.id, { field: newFieldId, operator: validOp, value: nextVal })
                    }}
                    options={fields.map((f) => ({
                      value: f.id,
                      label: f.label,
                      prefix: getFieldIcon(f.type),
                    }))}
                    size="sm"
                    triggerClassName="h-8 bg-[var(--surface-base)] rounded-xl text-xs font-semibold"
                  />
                </div>

                {/* Operator Dropdown using custom Strider Radix UI Select */}
                <div className="w-full sm:w-36 shrink-0">
                  <Select
                    value={rule.operator}
                    onValueChange={(opVal) => updateRuleField(rule.id, { operator: opVal as FilterOperator })}
                    options={allowedOperators.map((opKey) => ({
                      value: opKey,
                      label: OPERATOR_LABELS[opKey].label,
                    }))}
                    size="sm"
                    triggerClassName="h-8 bg-[var(--surface-base)] rounded-xl text-xs text-[var(--ink-secondary)]"
                  />
                </div>

                {/* Value Input */}
                <div className="flex-1 min-w-0">
                  {opConfig.noValue ? (
                    <div className="h-8 px-3 rounded-xl border border-dashed border-[var(--outline-base)] bg-[var(--surface-base)]/50 flex items-center text-[11px] text-[var(--ink-muted)] italic">
                      No value needed
                    </div>
                  ) : currentField?.type === 'select' && currentField.options ? (
                    <Select
                      value={rule.value}
                      onValueChange={(val) => updateRuleField(rule.id, { value: val })}
                      options={currentField.options.map((opt) => ({
                        value: opt.value,
                        label: opt.label,
                      }))}
                      placeholder="Select value..."
                      size="sm"
                      triggerClassName="h-8 bg-[var(--surface-base)] rounded-xl text-xs font-medium"
                    />
                  ) : currentField?.type === 'boolean' ? (
                    <div className="flex items-center gap-1 h-8 bg-[var(--surface-base)] p-0.5 rounded-xl border border-[var(--outline-base)]">
                      <button
                        type="button"
                        onClick={() => updateRuleField(rule.id, { value: 'true' })}
                        className={cn(
                          'flex-1 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer',
                          rule.value === 'true'
                            ? 'bg-emerald-500 text-white shadow-2xs'
                            : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                        )}
                      >
                        True
                      </button>
                      <button
                        type="button"
                        onClick={() => updateRuleField(rule.id, { value: 'false' })}
                        className={cn(
                          'flex-1 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer',
                          rule.value === 'false'
                            ? 'bg-rose-500 text-white shadow-2xs'
                            : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                        )}
                      >
                        False
                      </button>
                    </div>
                  ) : (
                    <input
                      type={currentField?.type === 'number' ? 'number' : 'text'}
                      value={rule.value}
                      onChange={(e) => updateRuleField(rule.id, { value: e.target.value })}
                      placeholder={currentField?.placeholder || 'Enter value...'}
                      className="w-full h-8 px-3 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-base)] text-[var(--ink-primary)] text-xs outline-hidden focus:border-[var(--brand-solid)] focus:ring-2 focus:ring-[var(--brand-solid)]/20 transition-all placeholder:text-[var(--ink-muted)]"
                    />
                  )}
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeRule(rule.id)}
                  className="size-8 rounded-xl hover:bg-rose-500/10 flex items-center justify-center text-[var(--ink-muted)] hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                  title="Remove condition"
                  aria-label="Remove condition"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            )
          })
        )}
      </div>

      {/* Add Filter Button */}
      <div className="pt-1">
        <Button
          variant="outline"
          theme="brand"
          size="xs"
          onClick={addRule}
          prefix={<Plus className="size-3" />}
        >
          Add Filter
        </Button>
      </div>
    </div>
  )
}
