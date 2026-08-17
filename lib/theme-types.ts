import type * as React from 'react'

/** Canonical theme color palette */
export type ThemeColor =
  | 'brand'
  | 'gray'
  | 'blue'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'violet'

/** Canonical visual variant axis */
export type ComponentVariant =
  | 'solid'
  | 'outline'
  | 'subtle'
  | 'ghost'
  | 'link'

/** Canonical size scale */
export type ComponentSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'icon'
  | 'icon-sm'
  | 'icon-lg'

/** Interface passed to imperative dialog handlers */
export interface DialogControl {
  close: () => void
  setError: (message: string | null | undefined) => void
  setLoading: (loading: boolean) => void
}

/** Configuration for an action button in dialogs / alerts */
export interface ActionConfig {
  label: string
  theme?: ThemeColor
  variant?: ComponentVariant
  loading?: boolean
  onClick?: (ctx: DialogControl) => void | Promise<void>
}

/** Imperative confirm dialog options */
export interface ConfirmOptions {
  title: string
  message?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  theme?: ThemeColor
  size?: 'sm' | 'md' | 'lg'
  dismissible?: boolean
  onConfirm?: (ctx: DialogControl) => void | Promise<void>
  onCancel?: () => void | Promise<void>
  actions?: ActionConfig[]
}

/** Imperative danger dialog options */
export interface DangerOptions extends Omit<ConfirmOptions, 'theme'> {
  theme?: 'rose'
}

/** Field definition for imperative prompt dialog */
export interface PromptField {
  name: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select'
  placeholder?: string
  defaultValue?: string
  required?: boolean
  options?: Array<{ label: string; value: string }>
}

/** Imperative prompt dialog options */
export interface PromptOptions extends Omit<ConfirmOptions, 'onConfirm'> {
  fields?: PromptField[]
  onSubmit?: (values: Record<string, any>, ctx: DialogControl) => void | Promise<void>
}
