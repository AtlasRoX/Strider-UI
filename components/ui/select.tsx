'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form-control'

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = 'md',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClasses = {
    sm: 'h-8 text-xs px-2.5 rounded-md gap-1.5',
    md: 'h-9 text-sm px-3 rounded-md gap-2',
    lg: 'h-10 text-base px-3.5 rounded-lg gap-2.5',
  }[size]

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        'flex w-full items-center justify-between border border-[var(--outline-base)] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-xs transition-colors select-none outline-none',
        'placeholder:text-[var(--ink-muted)]',
        'hover:bg-[var(--surface-subtle)] focus:border-[var(--outline-focus)] focus:ring-2 focus:ring-[var(--outline-focus)]/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-[var(--rose-solid)] aria-invalid:focus:ring-[var(--rose-solid)]/20',
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 opacity-50 shrink-0" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-[var(--outline-base)] bg-[var(--surface-card)] text-[var(--ink-primary)] shadow-lg',
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('px-2 py-1.5 text-xs font-semibold text-[var(--ink-secondary)] select-none', className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  prefix,
  description,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Item>, 'prefix'> & {
  prefix?: React.ReactNode
  description?: React.ReactNode
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-2 pr-8 text-xs outline-none transition-colors',
        'focus:bg-[var(--surface-muted)] focus:text-[var(--ink-primary)]',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4 text-[var(--brand-solid)]" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        {prefix && <div className="shrink-0">{prefix}</div>}
        <div className="flex flex-col min-w-0">
          <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
          {description && (
            <span className="text-[10px] text-[var(--ink-muted)] leading-tight truncate">
              {description}
            </span>
          )}
        </div>
      </div>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('-mx-1 my-1 h-px bg-[var(--outline-muted)]', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1 text-[var(--ink-muted)]', className)}
      {...props}
    >
      <ChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1 text-[var(--ink-muted)]', className)}
      {...props}
    >
      <ChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export interface SelectOption {
  label: string
  value: string
  description?: string
  prefix?: React.ReactNode
  disabled?: boolean
}

export interface SelectProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
  id?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: string | boolean | null
  required?: boolean
  placeholder?: string
  options?: SelectOption[]
  size?: 'sm' | 'md' | 'lg'
  triggerClassName?: string
}

/**
 * Select
 * Single selection component supporting both shorthand `options` prop and compound subcomponents.
 * Implements Principle P5 labeling contract.
 */
function Select({
  id: customId,
  label,
  description,
  error,
  required,
  placeholder = 'Select an option...',
  options,
  size = 'md',
  triggerClassName,
  children,
  ...props
}: SelectProps) {
  const selectElement = (fieldProps?: {
    id: string
    'aria-invalid'?: boolean
    'aria-describedby'?: string
    'aria-required'?: boolean
  }) => {
    // If options is provided, render shorthand SelectTrigger + SelectContent
    if (options) {
      const selectedOption = options.find((o) => o.value === props.value || o.value === props.defaultValue)

      return (
        <SelectPrimitive.Root {...props}>
          <SelectTrigger
            id={fieldProps?.id || customId}
            aria-invalid={fieldProps?.['aria-invalid']}
            aria-describedby={fieldProps?.['aria-describedby']}
            aria-required={fieldProps?.['aria-required'] || required}
            size={size}
            className={triggerClassName}
          >
            <div className="flex items-center gap-2 truncate flex-1 min-w-0">
              {selectedOption?.prefix && <span className="shrink-0">{selectedOption.prefix}</span>}
              <SelectValue placeholder={placeholder} />
            </div>
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                prefix={opt.prefix}
                description={opt.description}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPrimitive.Root>
      )
    }

    // Compound usage: children contains custom SelectTrigger, SelectContent, etc.
    return (
      <SelectPrimitive.Root {...props}>
        {children}
      </SelectPrimitive.Root>
    )
  }

  if (label || description || error || required) {
    return (
      <FormControl
        id={customId}
        label={label}
        description={description}
        error={error}
        required={required}
      >
        {(fieldProps) => selectElement(fieldProps)}
      </FormControl>
    )
  }

  return selectElement()
}

const SelectRoot = SelectPrimitive.Root

export {
  Select,
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
