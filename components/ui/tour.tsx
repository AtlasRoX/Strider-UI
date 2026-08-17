'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react'

export interface TourStep {
  title: string
  description: string
  targetSelector?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export interface TourProps {
  steps: TourStep[]
  open: boolean
  onClose: () => void
  onComplete?: () => void
  currentStep?: number
  onStepChange?: (step: number) => void
}

export function Tour({
  steps = [],
  open,
  onClose,
  onComplete,
  currentStep: controlledStep,
  onStepChange,
}: TourProps) {
  const [internalStep, setInternalStep] = React.useState(0)
  const isControlled = controlledStep !== undefined
  const activeStepIdx = isControlled ? controlledStep : internalStep

  if (!open || steps.length === 0) return null

  const step = steps[activeStepIdx] || steps[0]
  const isLast = activeStepIdx === steps.length - 1
  const isFirst = activeStepIdx === 0

  const handleNext = () => {
    if (isLast) {
      onComplete?.()
      onClose()
    } else {
      const next = activeStepIdx + 1
      if (!isControlled) setInternalStep(next)
      onStepChange?.(next)
    }
  }

  const handlePrev = () => {
    if (!isFirst) {
      const prev = activeStepIdx - 1
      if (!isControlled) setInternalStep(prev)
      onStepChange?.(prev)
    }
  }

  return (
    <div
      data-slot="tour-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in-0 duration-200"
    >
      <div
        data-slot="tour-dialog"
        className="relative w-full max-w-md rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-base)] p-6 shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col gap-4"
      >
        {/* Header: Step counter + close */}
        <div className="flex items-center justify-between text-xs text-[var(--ink-muted)]">
          <span className="font-semibold uppercase tracking-wider text-[var(--brand-solid)] font-mono">
            Step {activeStepIdx + 1} of {steps.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md hover:bg-[var(--surface-muted)] text-[var(--ink-secondary)] cursor-pointer"
            aria-label="Close tour"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <h4 className="text-base font-bold text-[var(--ink-primary)]">
            {step.title}
          </h4>
          <p className="text-xs text-[var(--ink-secondary)] leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex items-center gap-1.5 py-1">
          {steps.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === activeStepIdx
                  ? 'w-6 bg-[var(--brand-solid)]'
                  : 'w-1.5 bg-[var(--outline-base)]'
              )}
            />
          ))}
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--outline-base)]/50">
          <Button
            variant="ghost"
            theme="gray"
            size="xs"
            onClick={onClose}
          >
            Skip Tour
          </Button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <Button
                variant="outline"
                theme="gray"
                size="xs"
                onClick={handlePrev}
                prefix={<ChevronLeft className="size-3" />}
              >
                Back
              </Button>
            )}

            <Button
              variant="solid"
              theme="brand"
              size="xs"
              onClick={handleNext}
              suffix={isLast ? <Check className="size-3" /> : <ChevronRight className="size-3" />}
            >
              {isLast ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
