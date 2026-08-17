'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form-control'

const inputVariants = cva(
  'w-full min-w-0 transition-colors duration-150 outline-none text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        outline:
          'border border-[var(--outline-base)] bg-[var(--surface-card)] focus-within:border-[var(--outline-focus)] focus-within:ring-2 focus-within:ring-[var(--outline-focus)]/20',
        subtle:
          'border-transparent bg-[var(--surface-muted)] hover:bg-[var(--surface-subtle)] focus-within:bg-[var(--surface-card)] focus-within:border-[var(--outline-focus)] focus-within:ring-2 focus-within:ring-[var(--outline-focus)]/20',
        ghost:
          'border-transparent bg-transparent hover:bg-[var(--surface-subtle)] focus-within:border-[var(--outline-focus)] focus-within:ring-2 focus-within:ring-[var(--outline-focus)]/20',
      },
      size: {
        sm: 'h-8 text-xs px-2.5 rounded-md',
        md: 'h-9 text-sm px-3 rounded-md',
        lg: 'h-10 text-base px-3.5 rounded-lg',
      },
      hasError: {
        true: 'border-[var(--rose-solid)] focus-within:border-[var(--rose-solid)] focus-within:ring-[var(--rose-solid)]/20',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean | null
  required?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  icon?: LucideIcon | React.ReactNode
  clearable?: boolean
  onClear?: () => void
  containerClassName?: string
  size?: 'sm' | 'md' | 'lg' | number
  variant?: 'outline' | 'subtle' | 'ghost'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id: customId,
      className,
      containerClassName,
      type = 'text',
      variant = 'outline',
      size = 'md',
      label,
      description,
      error,
      required,
      prefix,
      suffix,
      icon,
      clearable = false,
      onClear,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalVal, setInternalVal] = React.useState(defaultValue || '')
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalVal

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalVal(e.target.value)
      }
      onChange?.(e)
    }

    const handleClear = () => {
      if (!isControlled) {
        setInternalVal('')
      }
      onClear?.()
    }

    const renderIcon = () => {
      if (!icon) return null
      if (typeof icon === 'function') {
        const IconComponent = icon as LucideIcon
        return <IconComponent className="size-4 text-[var(--ink-muted)] shrink-0" />
      }
      return icon
    }

    const showClearBtn = clearable && Boolean(currentValue) && !disabled

    const inputElement = (fieldProps?: {
      id: string
      'aria-invalid'?: boolean
      'aria-describedby'?: string
      'aria-required'?: boolean
    }) => (
      <div
        data-slot="input-container"
        data-variant={variant}
        data-size={size}
        className={cn(
          'relative flex items-center shadow-xs overflow-hidden',
          inputVariants({
            variant: variant === 'outline' || variant === 'subtle' || variant === 'ghost' ? variant : 'outline',
            size: typeof size === 'string' && (size === 'sm' || size === 'md' || size === 'lg') ? size : 'md',
            hasError: Boolean(error),
          }),
          containerClassName
        )}
      >
        {(prefix || icon) && (
          <div data-slot="input-prefix" className="flex items-center gap-1.5 mr-2 shrink-0">
            {prefix || renderIcon()}
          </div>
        )}

        <input
          ref={ref}
          type={type}
          id={fieldProps?.id || customId}
          aria-invalid={fieldProps?.['aria-invalid']}
          aria-describedby={fieldProps?.['aria-describedby']}
          aria-required={fieldProps?.['aria-required'] || required}
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          data-slot="input"
          className={cn('w-full h-full bg-transparent outline-none p-0 file:border-0 file:bg-transparent file:text-sm file:font-medium', className)}
          {...props}
        />

        {showClearBtn && (
          <button
            type="button"
            tabIndex={-1}
            onClick={handleClear}
            className="p-0.5 ml-1 rounded-xs text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Clear input"
          >
            <X className="size-3.5" />
          </button>
        )}

        {suffix && (
          <div data-slot="input-suffix" className="flex items-center gap-1.5 ml-2 shrink-0">
            {suffix}
          </div>
        )}
      </div>
    )

    // If P5 labeling props are passed, wrap automatically with FormControl
    if (label || description || error || required) {
      return (
        <FormControl
          id={customId}
          label={label}
          description={description}
          error={error}
          required={required}
        >
          {(fieldProps) => inputElement(fieldProps)}
        </FormControl>
      )
    }

    return inputElement()
  }
)
Input.displayName = 'Input'

export { Input, Input as TextInput, inputVariants }
