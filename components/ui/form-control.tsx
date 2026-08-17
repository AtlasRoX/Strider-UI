'use client'

import * as React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FormControlProps {
  id?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean | null
  required?: boolean
  className?: string
  children:
    | React.ReactNode
    | ((props: {
        id: string
        'aria-invalid'?: boolean
        'aria-describedby'?: string
        'aria-required'?: boolean
      }) => React.ReactNode)
}

/**
 * FormControl
 * Encapsulates Principle P5 (Uniform Labeling Contract):
 * Automatically generates stable IDs, connects htmlFor, aria-describedby, and aria-errormessage,
 * and renders uniform labels, descriptions, and error states.
 */
export function FormControl({
  id: customId,
  label,
  description,
  error,
  required = false,
  className,
  children,
}: FormControlProps) {
  const autoId = React.useId()
  const id = customId || autoId
  const descriptionId = `${id}-desc`
  const errorId = `${id}-err`

  const hasError = Boolean(error)
  const errorMessage = typeof error === 'string' ? error : null

  const ariaDescribedBy = hasError && errorMessage
    ? errorId
    : description
    ? descriptionId
    : undefined

  const fieldProps = {
    id,
    'aria-invalid': hasError ? true : undefined,
    'aria-describedby': ariaDescribedBy,
    'aria-required': required ? true : undefined,
  }

  return (
    <div
      data-slot="form-control"
      data-invalid={hasError ? 'true' : undefined}
      data-required={required ? 'true' : undefined}
      className={cn('flex flex-col gap-1.5 w-full', className)}
    >
      {label && (
        <label
          htmlFor={id}
          data-slot="form-label"
          className="text-xs font-medium text-[var(--ink-primary)] flex items-center gap-1 select-none"
        >
          {label}
          {required && (
            <span
              className="text-[var(--rose-solid)] leading-none"
              title="Required field"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      {typeof children === 'function' ? children(fieldProps) : children}

      {description && !hasError && (
        <p
          id={descriptionId}
          data-slot="form-description"
          className="text-xs text-[var(--ink-secondary)] leading-normal"
        >
          {description}
        </p>
      )}

      {hasError && errorMessage && (
        <div
          id={errorId}
          role="alert"
          data-slot="form-error"
          className="flex items-center gap-1 text-xs font-medium text-[var(--rose-solid)] leading-normal"
        >
          <AlertCircle className="size-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}

export function FormLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<'label'> & { required?: boolean }) {
  return (
    <label
      data-slot="form-label"
      className={cn('text-xs font-medium text-[var(--ink-primary)] flex items-center gap-1 select-none', className)}
      {...props}
    >
      {children}
      {required && (
        <span className="text-[var(--rose-solid)]" aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
}

export function FormDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="form-description"
      className={cn('text-xs text-[var(--ink-secondary)] leading-normal', className)}
      {...props}
    />
  )
}

export function FormErrorMessage({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  if (!children) return null
  return (
    <div
      role="alert"
      data-slot="form-error"
      className={cn('flex items-center gap-1 text-xs font-medium text-[var(--rose-solid)] leading-normal', className)}
      {...props}
    >
      <AlertCircle className="size-3.5 shrink-0" />
      <span>{children}</span>
    </div>
  )
}

export {
  FormControl as FieldControl,
  FormLabel as FieldLabel,
  FormDescription as FieldDescription,
  FormErrorMessage as FieldErrorMessage,
}
