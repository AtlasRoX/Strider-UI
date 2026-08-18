'use client'

import * as React from 'react'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Select } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import type { ThemeColor } from '@/lib/theme-types'
import { toast } from 'sonner'

export interface AutoFormProps<T extends z.ZodObject<any>> extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** The Zod object schema defining form fields and validation */
  schema: T
  /** Initial default values */
  defaultValues?: Partial<z.infer<T>>
  /** Callback triggered upon valid form submission */
  onSubmit: (values: z.infer<T>) => void | Promise<void>
  /** Custom label for the submit button */
  submitLabel?: string
  /** Visual theme for the submit button */
  theme?: ThemeColor
  /** Optional custom field overrides */
  fieldOverrides?: Record<string, {
    label?: string
    description?: string
    placeholder?: string
    prefix?: React.ReactNode
    suffix?: React.ReactNode
  }>
}

/**
 * AutoForm
 * Generates fully accessible, P5-compliant Strider UI forms directly from a Zod schema.
 * Automatically selects the optimal input primitive (Input, PasswordInput, Textarea, Select, Switch, DatePicker),
 * manages controlled validation states, and displays error messages with zero boilerplate.
 */
export function AutoForm<T extends z.ZodObject<any>>({
  schema,
  defaultValues,
  onSubmit,
  submitLabel = 'Submit',
  theme = 'brand',
  fieldOverrides = {},
  className,
  ...props
}: AutoFormProps<T>) {
  const [formData, setFormData] = React.useState<Record<string, any>>(() => {
    const initial: Record<string, any> = { ...defaultValues }
    const shape = schema.shape
    for (const key of Object.keys(shape)) {
      if (initial[key] === undefined) {
        const fieldSchema = shape[key]
        if (fieldSchema instanceof z.ZodBoolean) {
          initial[key] = false
        } else if (fieldSchema instanceof z.ZodNumber) {
          initial[key] = 0
        } else {
          initial[key] = ''
        }
      }
    }
    return initial
  })

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const parseResult = schema.safeParse(formData)

    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parseResult.error.issues) {
        const path = issue.path[0]
        if (path && typeof path === 'string' && !fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      }
      setErrors(fieldErrors)
      setIsSubmitting(false)
      toast.error('Please fix the errors in the form')
      return
    }

    try {
      await onSubmit(parseResult.data)
    } catch (err: any) {
      toast.error(err?.message || 'Form submission failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  const shape = schema.shape

  return (
    <form
      data-slot="auto-form"
      onSubmit={handleSubmit}
      className={cn('flex flex-col gap-5 select-none', className)}
      {...props}
    >
      {Object.entries(shape).map(([key, fieldSchema]: [string, any]) => {
        // Unpack optional or default wrappers
        let innerSchema = fieldSchema
        let isRequired = true

        while (
          innerSchema instanceof z.ZodOptional ||
          innerSchema instanceof z.ZodNullable ||
          innerSchema instanceof z.ZodDefault
        ) {
          if (innerSchema instanceof z.ZodOptional || innerSchema instanceof z.ZodNullable) {
            isRequired = false
          }
          innerSchema = innerSchema._def.innerType
        }

        const override = fieldOverrides[key] || {}
        const rawLabel =
          override.label ||
          fieldSchema.description ||
          key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str: string) => str.toUpperCase())

        const error = errors[key]
        const value = formData[key]

        // 1. ZodEnum -> Select
        if (innerSchema instanceof z.ZodEnum) {
          const options = innerSchema._def.values.map((v: string) => ({
            label: v.charAt(0).toUpperCase() + v.slice(1),
            value: v,
          }))

          return (
            <Select
              key={key}
              label={rawLabel}
              description={override.description}
              error={error}
              required={isRequired}
              options={options}
              value={value}
              onValueChange={(val) => handleChange(key, val)}
              placeholder={override.placeholder || `Select ${rawLabel}...`}
            />
          )
        }

        // 2. ZodBoolean -> Switch
        if (innerSchema instanceof z.ZodBoolean) {
          return (
            <div key={key} className="flex items-center justify-between p-3 rounded-2xl border border-[var(--outline-base)] bg-[var(--surface-base)]">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[var(--ink-primary)]">
                  {rawLabel} {isRequired && <span className="text-[var(--rose-solid)]">*</span>}
                </span>
                {override.description && (
                  <span className="text-[11px] text-[var(--ink-muted)]">{override.description}</span>
                )}
                {error && <span className="text-[11px] font-medium text-[var(--rose-solid)] mt-0.5">{error}</span>}
              </div>
              <Switch
                checked={Boolean(value)}
                onCheckedChange={(checked) => handleChange(key, checked)}
              />
            </div>
          )
        }

        // 3. ZodDate -> DatePicker
        if (innerSchema instanceof z.ZodDate) {
          return (
            <DatePicker
              key={key}
              label={rawLabel}
              description={override.description}
              error={error}
              required={isRequired}
              value={value instanceof Date ? value : value ? new Date(value) : undefined}
              onChange={(date) => handleChange(key, date)}
              placeholder={override.placeholder || `Choose ${rawLabel}...`}
            />
          )
        }

        // 4. Password Input
        if (key.toLowerCase().includes('password')) {
          return (
            <PasswordInput
              key={key}
              label={rawLabel}
              description={override.description}
              error={error}
              required={isRequired}
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={override.placeholder || `Enter ${rawLabel}...`}
              prefix={override.prefix}
            />
          )
        }

        // 5. Multi-line Textarea
        if (
          key.toLowerCase().includes('bio') ||
          key.toLowerCase().includes('notes') ||
          key.toLowerCase().includes('message') ||
          key.toLowerCase().includes('description')
        ) {
          return (
            <Textarea
              key={key}
              label={rawLabel}
              description={override.description}
              error={error}
              required={isRequired}
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={override.placeholder || `Enter ${rawLabel}...`}
            />
          )
        }

        // 6. Number Input
        if (innerSchema instanceof z.ZodNumber) {
          return (
            <Input
              key={key}
              type="number"
              label={rawLabel}
              description={override.description}
              error={error}
              required={isRequired}
              value={value}
              onChange={(e) => handleChange(key, Number(e.target.value))}
              placeholder={override.placeholder || `0`}
              prefix={override.prefix}
              suffix={override.suffix}
            />
          )
        }

        // 7. Standard Text / Email Input
        const inputType = key.toLowerCase().includes('email') ? 'email' : 'text'

        return (
          <Input
            key={key}
            type={inputType}
            label={rawLabel}
            description={override.description}
            error={error}
            required={isRequired}
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            placeholder={override.placeholder || `Enter ${rawLabel}...`}
            prefix={override.prefix}
            suffix={override.suffix}
          />
        )
      })}

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="submit"
          variant="solid"
          theme={theme}
          loading={isSubmitting}
          className="w-full sm:w-auto"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
