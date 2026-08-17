'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: React.ReactNode
  description?: React.ReactNode
  showValue?: boolean
  theme?: ThemeColor
  formatValue?: (val: number) => string
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      label,
      description,
      showValue = false,
      theme = 'brand',
      formatValue,
      value,
      defaultValue,
      min = 0,
      max = 100,
      disabled,
      ...props
    },
    ref
  ) => {
    const currentVal = (value || defaultValue || [min])[0]
    const displayValue = formatValue ? formatValue(currentVal) : currentVal

    const themeClasses = {
      brand: 'bg-[var(--brand-solid)]',
      gray: 'bg-[var(--ink-primary)]',
      blue: 'bg-[var(--blue-solid)]',
      emerald: 'bg-[var(--emerald-solid)]',
      amber: 'bg-[var(--amber-solid)]',
      rose: 'bg-[var(--rose-solid)]',
      violet: 'bg-[var(--violet-solid)]',
    }[theme]

    const sliderControl = (
      <SliderPrimitive.Root
        ref={ref}
        disabled={disabled}
        data-slot="slider"
        data-theme={theme}
        min={min}
        max={max}
        value={value}
        defaultValue={defaultValue}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[var(--surface-muted)]"
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn('absolute h-full', themeClasses)}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          className={cn(
            'block size-4 rounded-full border-2 border-[var(--surface-base)] bg-[var(--ink-primary)] shadow-sm transition-transform',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--outline-focus)] focus-visible:ring-offset-2',
            'disabled:pointer-events-none hover:scale-110 active:scale-95'
          )}
        />
      </SliderPrimitive.Root>
    )

    if (!label && !description && !showValue) {
      return sliderControl
    }

    return (
      <div className="flex flex-col gap-1.5 w-full select-none">
        {(label || showValue) && (
          <div className="flex items-center justify-between text-xs font-medium text-[var(--ink-primary)]">
            {label && <span>{label}</span>}
            {showValue && <span className="text-[var(--ink-secondary)]">{displayValue}</span>}
          </div>
        )}
        {sliderControl}
        {description && (
          <p className="text-[11px] text-[var(--ink-secondary)] leading-normal">
            {description}
          </p>
        )}
      </div>
    )
  }
)
Slider.displayName = 'Slider'

export { Slider }
