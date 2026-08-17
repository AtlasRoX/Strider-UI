'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form-control'

const textareaVariants = cva(
  'w-full min-w-0 transition-colors duration-150 outline-none text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] disabled:pointer-events-none disabled:opacity-50 p-3 text-sm rounded-md shadow-xs',
  {
    variants: {
      variant: {
        outline:
          'border border-[var(--outline-base)] bg-[var(--surface-card)] focus:border-[var(--outline-focus)] focus:ring-2 focus:ring-[var(--outline-focus)]/20',
        subtle:
          'border-transparent bg-[var(--surface-muted)] hover:bg-[var(--surface-subtle)] focus:bg-[var(--surface-card)] focus:border-[var(--outline-focus)] focus:ring-2 focus:ring-[var(--outline-focus)]/20',
        ghost:
          'border-transparent bg-transparent hover:bg-[var(--surface-subtle)] focus:border-[var(--outline-focus)] focus:ring-2 focus:ring-[var(--outline-focus)]/20',
      },
      hasError: {
        true: 'border-[var(--rose-solid)] focus:border-[var(--rose-solid)] focus:ring-[var(--rose-solid)]/20',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof textareaVariants>, 'hasError'> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean | null
  required?: boolean
  showCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id: customId,
      className,
      variant = 'outline',
      label,
      description,
      error,
      required,
      showCount = false,
      maxLength,
      value,
      defaultValue,
      onChange,
      rows = 3,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalVal, setInternalVal] = React.useState(defaultValue || '')
    const isControlled = value !== undefined
    const currentValue = String(isControlled ? value ?? '' : internalVal)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalVal(e.target.value)
      }
      onChange?.(e)
    }

    const textareaElement = (fieldProps?: {
      id: string
      'aria-invalid'?: boolean
      'aria-describedby'?: string
      'aria-required'?: boolean
    }) => (
      <div className="relative w-full flex flex-col">
        <textarea
          ref={ref}
          id={fieldProps?.id || customId}
          aria-invalid={fieldProps?.['aria-invalid']}
          aria-describedby={fieldProps?.['aria-describedby']}
          aria-required={fieldProps?.['aria-required'] || required}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          value={currentValue}
          onChange={handleChange}
          data-slot="textarea"
          data-variant={variant}
          className={cn(
            textareaVariants({
              variant,
              hasError: Boolean(error),
            }),
            className
          )}
          {...props}
        />

        {showCount && maxLength && (
          <div className="flex justify-end mt-1 text-[10px] text-[var(--ink-muted)]">
            {currentValue.length} / {maxLength}
          </div>
        )}
      </div>
    )

    if (label || description || error || required) {
      return (
        <FormControl
          id={customId}
          label={label}
          description={description}
          error={error}
          required={required}
        >
          {(fieldProps) => textareaElement(fieldProps)}
        </FormControl>
      )
    }

    return textareaElement()
  }
)
Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants }
