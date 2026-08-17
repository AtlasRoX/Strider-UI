'use client'

import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface StepItem {
  title: string
  description?: string
  icon?: React.ReactNode
}

export interface StepperProps {
  steps: StepItem[]
  currentStep: number
  onChange?: (step: number) => void
  theme?: ThemeColor
  orientation?: 'horizontal' | 'vertical'
  clickable?: boolean
  className?: string
}

export function Stepper({
  steps,
  currentStep,
  onChange,
  theme = 'brand',
  orientation = 'horizontal',
  clickable = false,
  className,
}: StepperProps) {
  const activeBg = {
    brand: 'bg-[var(--brand-solid)] text-white ring-[var(--brand-subtle)]',
    gray: 'bg-[var(--ink-primary)] text-[var(--surface-base)] ring-[var(--surface-muted)]',
    blue: 'bg-[var(--blue-solid)] text-white ring-[var(--blue-subtle)]',
    emerald: 'bg-[var(--emerald-solid)] text-white ring-[var(--emerald-subtle)]',
    amber: 'bg-[var(--amber-solid)] text-[var(--ink-primary)] ring-[var(--amber-subtle)]',
    rose: 'bg-[var(--rose-solid)] text-white ring-[var(--rose-subtle)]',
    violet: 'bg-[var(--violet-solid)] text-white ring-[var(--violet-subtle)]',
  }[theme]

  const lineActiveBg = {
    brand: 'bg-[var(--brand-solid)]',
    gray: 'bg-[var(--ink-primary)]',
    blue: 'bg-[var(--blue-solid)]',
    emerald: 'bg-[var(--emerald-solid)]',
    amber: 'bg-[var(--amber-solid)]',
    rose: 'bg-[var(--rose-solid)]',
    violet: 'bg-[var(--violet-solid)]',
  }[theme]

  return (
    <div
      role="tablist"
      aria-label="Steps"
      className={cn(
        'flex w-full',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col gap-4',
        className
      )}
    >
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep
        const isCurrent = idx === currentStep
        const isUpcoming = idx > currentStep
        const isLast = idx === steps.length - 1

        return (
          <React.Fragment key={idx}>
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onChange?.(idx)}
              className={cn(
                'group flex items-center gap-3 text-left outline-none transition-all',
                clickable ? 'cursor-pointer' : 'cursor-default',
                orientation === 'horizontal' ? 'flex-1' : 'w-full'
              )}
            >
              {/* Step Circle Indicator */}
              <div
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200',
                  isCompleted && `${lineActiveBg} text-white shadow-xs`,
                  isCurrent && `${activeBg} ring-4`,
                  isUpcoming && 'border border-[var(--outline-base)] bg-[var(--surface-muted)] text-[var(--ink-muted)]'
                )}
              >
                {isCompleted ? (
                  <Check className="size-4 stroke-[2.5]" />
                ) : step.icon ? (
                  step.icon
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Step Title & Description */}
              <div className="flex flex-col">
                <span
                  className={cn(
                    'text-xs font-semibold transition-colors',
                    isCurrent ? 'text-[var(--ink-primary)]' : isCompleted ? 'text-[var(--ink-primary)]' : 'text-[var(--ink-muted)]'
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-[10px] text-[var(--ink-secondary)] line-clamp-1">
                    {step.description}
                  </span>
                )}
              </div>
            </button>

            {/* Connecting Line (Horizontal) */}
            {orientation === 'horizontal' && !isLast && (
              <div
                className={cn(
                  'mx-3 h-[2px] flex-1 rounded-full transition-colors duration-200',
                  idx < currentStep ? lineActiveBg : 'bg-[var(--outline-muted)]'
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
