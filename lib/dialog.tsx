'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { AlertCircle, CheckCircle2, HelpCircle, Info, Loader2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type {
  ConfirmOptions,
  DangerOptions,
  DialogControl,
  PromptOptions,
  PromptField,
  ThemeColor,
  ActionConfig,
} from './theme-types'

// Internal state of an active modal request
interface ActiveDialogState {
  id: string
  type: 'confirm' | 'prompt'
  title: string
  message?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  theme: ThemeColor
  size: 'sm' | 'md' | 'lg'
  dismissible: boolean
  fields?: PromptField[]
  actions?: ActionConfig[]
  onConfirm?: (ctx: DialogControl) => void | Promise<void>
  onCancel?: () => void | Promise<void>
  onSubmit?: (values: Record<string, any>, ctx: DialogControl) => void | Promise<void>
  // Runtime reactive state
  isOpen: boolean
  isLoading: boolean
  error: string | null
  formValues: Record<string, any>
  resolve: (value: any) => void
}

import { moduleSingleton } from './singleton'

interface DialogStackState {
  activeListener: ((state: ActiveDialogState | null) => void) | null
  currentDialogState: ActiveDialogState | null
}

const dialogStack = moduleSingleton<DialogStackState>('dialog-stack', () => ({
  activeListener: null,
  currentDialogState: null,
}))

function notifyListener(state: ActiveDialogState | null) {
  dialogStack.currentDialogState = state
  if (dialogStack.activeListener) {
    dialogStack.activeListener(state)
  }
}

function makeDialogPromise<T>(promise: Promise<T>, close: () => void): Promise<T> & { close: () => void; promise: Promise<T> } {
  const enhanced = promise as Promise<T> & { close: () => void; promise: Promise<T> }
  enhanced.close = close
  enhanced.promise = promise
  return enhanced
}

/**
 * Imperative Dialog Service (Principle P9)
 * Zero-boilerplate one-shot dialog helpers with async promise tracking and inline errors.
 */
export const dialog = {
  /**
   * Show an imperative confirmation dialog.
   * Awaitable directly: `const confirmed = await dialog.confirm({...})`
   */
  confirm: (options: ConfirmOptions) => {
    let closeHandle = () => {}
    const promise = new Promise<boolean>((resolve) => {
      const id = Math.random().toString(36).substring(2, 9)
      const state: ActiveDialogState = {
        id,
        type: 'confirm',
        title: options.title,
        message: options.message,
        confirmLabel: options.confirmLabel ?? 'Confirm',
        cancelLabel: options.cancelLabel ?? 'Cancel',
        theme: options.theme ?? 'brand',
        size: options.size ?? 'md',
        dismissible: options.dismissible ?? true,
        actions: options.actions,
        onConfirm: options.onConfirm,
        onCancel: options.onCancel,
        isOpen: true,
        isLoading: false,
        error: null,
        formValues: {},
        resolve,
      }

      closeHandle = () => {
        if (dialogStack.currentDialogState?.id === id) {
          notifyListener(null)
          resolve(false)
        }
      }

      notifyListener(state)
    })

    return makeDialogPromise(promise, closeHandle)
  },

  /**
   * Shortcut for destructive actions (theme="rose").
   */
  danger: (options: DangerOptions) => {
    return dialog.confirm({
      ...options,
      theme: 'rose',
      confirmLabel: options.confirmLabel ?? 'Delete',
    })
  },

  /**
   * Show an input prompt modal with one or more fields.
   * Awaitable directly: `const values = await dialog.prompt({...})`
   */
  prompt: (options: PromptOptions) => {
    let closeHandle = () => {}
    const initialValues: Record<string, any> = {}
    options.fields?.forEach((f) => {
      initialValues[f.name] = f.defaultValue ?? ''
    })

    const promise = new Promise<Record<string, any> | null>((resolve) => {
      const id = Math.random().toString(36).substring(2, 9)
      const state: ActiveDialogState = {
        id,
        type: 'prompt',
        title: options.title,
        message: options.message,
        confirmLabel: options.confirmLabel ?? 'Submit',
        cancelLabel: options.cancelLabel ?? 'Cancel',
        theme: options.theme ?? 'brand',
        size: options.size ?? 'md',
        dismissible: options.dismissible ?? true,
        fields: options.fields,
        onSubmit: options.onSubmit,
        onCancel: options.onCancel,
        isOpen: true,
        isLoading: false,
        error: null,
        formValues: initialValues,
        resolve,
      }

      closeHandle = () => {
        if (dialogStack.currentDialogState?.id === id) {
          notifyListener(null)
          resolve(null)
        }
      }

      notifyListener(state)
    })

    return makeDialogPromise(promise, closeHandle)
  },
}

/**
 * Provider that renders active imperative dialogs.
 * Must be mounted once inside `<StriderUIProvider>`.
 */
export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [activeDialog, setActiveDialog] = useState<ActiveDialogState | null>(null)

  useEffect(() => {
    dialogStack.activeListener = (state) => setActiveDialog(state ? { ...state } : null)
    return () => {
      dialogStack.activeListener = null
    }
  }, [])

  const closeDialog = useCallback((result: any = false) => {
    if (!activeDialog) return
    activeDialog.resolve(result)
    notifyListener(null)
  }, [activeDialog])

  const createControl = useCallback((): DialogControl => ({
    close: () => closeDialog(true),
    setError: (msg) => {
      setActiveDialog((prev) => (prev ? { ...prev, error: msg ?? null, isLoading: false } : null))
    },
    setLoading: (loading) => {
      setActiveDialog((prev) => (prev ? { ...prev, isLoading: loading } : null))
    },
  }), [closeDialog])

  const handleConfirm = async () => {
    if (!activeDialog) return
    const ctrl = createControl()

    if (activeDialog.type === 'prompt') {
      if (activeDialog.onSubmit) {
        try {
          setActiveDialog((prev) => (prev ? { ...prev, isLoading: true, error: null } : null))
          await activeDialog.onSubmit(activeDialog.formValues, ctrl)
          closeDialog(activeDialog.formValues)
        } catch (err: any) {
          ctrl.setError(err.message || 'Validation or submission failed')
        }
      } else {
        closeDialog(activeDialog.formValues)
      }
      return
    }

    if (activeDialog.onConfirm) {
      try {
        setActiveDialog((prev) => (prev ? { ...prev, isLoading: true, error: null } : null))
        await activeDialog.onConfirm(ctrl)
        closeDialog(true)
      } catch (err: any) {
        ctrl.setError(err.message || 'Operation failed. Please try again.')
      }
    } else {
      closeDialog(true)
    }
  }

  const handleCancel = async () => {
    if (!activeDialog) return
    if (activeDialog.onCancel) {
      try {
        await activeDialog.onCancel()
      } catch {
        // Ignored on cancel
      }
    }
    closeDialog(activeDialog.type === 'prompt' ? null : false)
  }

  const handleActionClick = async (action: ActionConfig) => {
    const ctrl = createControl()
    if (action.onClick) {
      try {
        setActiveDialog((prev) => (prev ? { ...prev, isLoading: true, error: null } : null))
        await action.onClick(ctrl)
        closeDialog(true)
      } catch (err: any) {
        ctrl.setError(err.message || 'Action failed')
      }
    } else {
      closeDialog(true)
    }
  }

  // Determine Dialog icon based on theme
  const getThemeIcon = (theme: ThemeColor) => {
    switch (theme) {
      case 'rose':
        return <AlertCircle className="size-5 text-[var(--rose-solid)] shrink-0" />
      case 'amber':
        return <HelpCircle className="size-5 text-[var(--amber-solid)] shrink-0" />
      case 'emerald':
        return <CheckCircle2 className="size-5 text-[var(--emerald-solid)] shrink-0" />
      case 'blue':
      case 'brand':
      default:
        return <Info className="size-5 text-[var(--brand-solid)] shrink-0" />
    }
  }

  return (
    <>
      {children}
      {activeDialog && (
        <DialogPrimitive.Root
          open={activeDialog.isOpen}
          onOpenChange={(open) => {
            if (!open) {
              if (activeDialog.dismissible && !activeDialog.isLoading) {
                handleCancel()
              }
            }
          }}
        >
          <DialogPrimitive.Portal>
            {/* Backdrop Overlay */}
            <DialogPrimitive.Overlay
              className={cn(
                'fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity',
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
              )}
            />

            {/* Dialog Content Shell */}
            <DialogPrimitive.Content
              data-slot="imperative-dialog"
              data-theme={activeDialog.theme}
              className={cn(
                'fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border border-[var(--outline-base)] bg-[var(--surface-card)] p-6 shadow-xl duration-200',
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                {
                  'max-w-sm': activeDialog.size === 'sm',
                  'max-w-md': activeDialog.size === 'md',
                  'max-w-lg': activeDialog.size === 'lg',
                }
              )}
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                {getThemeIcon(activeDialog.theme)}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <DialogPrimitive.Title className="text-base font-semibold text-[var(--ink-primary)]">
                    {activeDialog.title}
                  </DialogPrimitive.Title>
                  {activeDialog.message && (
                    <DialogPrimitive.Description className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                      {activeDialog.message}
                    </DialogPrimitive.Description>
                  )}
                </div>
                {activeDialog.dismissible && !activeDialog.isLoading && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-md p-1 text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--outline-focus)]"
                  >
                    <X className="size-4" />
                    <span className="sr-only">Close</span>
                  </button>
                )}
              </div>

              {/* Prompt Fields (if prompt mode) */}
              {activeDialog.type === 'prompt' && activeDialog.fields && (
                <div className="flex flex-col gap-3 my-1">
                  {activeDialog.fields.map((field) => (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      {field.label && (
                        <label className="text-xs font-medium text-[var(--ink-primary)]">
                          {field.label}
                          {field.required && <span className="text-[var(--rose-solid)] ml-0.5">*</span>}
                        </label>
                      )}
                      {field.type === 'textarea' ? (
                        <textarea
                          placeholder={field.placeholder}
                          value={activeDialog.formValues[field.name] || ''}
                          onChange={(e) =>
                            setActiveDialog((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    formValues: { ...prev.formValues, [field.name]: e.target.value },
                                  }
                                : null
                            )
                          }
                          disabled={activeDialog.isLoading}
                          className="w-full rounded-md border border-[var(--outline-base)] bg-[var(--surface-base)] px-3 py-2 text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--outline-focus)] disabled:opacity-50"
                          rows={3}
                        />
                      ) : (
                        <input
                          type={field.type ?? 'text'}
                          placeholder={field.placeholder}
                          value={activeDialog.formValues[field.name] || ''}
                          onChange={(e) =>
                            setActiveDialog((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    formValues: { ...prev.formValues, [field.name]: e.target.value },
                                  }
                                : null
                            )
                          }
                          disabled={activeDialog.isLoading}
                          className="w-full rounded-md border border-[var(--outline-base)] bg-[var(--surface-base)] px-3 py-2 text-sm text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--outline-focus)] disabled:opacity-50"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Inline Error Display */}
              {activeDialog.error && (
                <div className="flex items-center gap-2 p-3 text-xs font-medium rounded-lg bg-[var(--rose-subtle)] text-[var(--rose-ink)] border border-[var(--rose-outline)]">
                  <AlertCircle className="size-4 shrink-0 text-[var(--rose-solid)]" />
                  <span>{activeDialog.error}</span>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--outline-muted)]">
                {activeDialog.actions ? (
                  activeDialog.actions.map((action, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={activeDialog.isLoading}
                      onClick={() => handleActionClick(action)}
                      className={cn(
                        'inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-md transition-all outline-none focus-visible:ring-2 disabled:opacity-50',
                        action.variant === 'ghost'
                          ? 'hover:bg-[var(--surface-subtle)] text-[var(--ink-secondary)]'
                          : action.variant === 'outline'
                          ? 'border border-[var(--outline-base)] bg-transparent hover:bg-[var(--surface-muted)] text-[var(--ink-primary)]'
                          : 'bg-[var(--brand-solid)] text-white hover:opacity-90'
                      )}
                    >
                      {activeDialog.isLoading && <Loader2 className="size-3.5 animate-spin" />}
                      {action.label}
                    </button>
                  ))
                ) : (
                  <>
                    <button
                      type="button"
                      disabled={activeDialog.isLoading}
                      onClick={handleCancel}
                      className="inline-flex items-center justify-center px-3.5 py-1.5 text-sm font-medium rounded-md text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--surface-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--outline-focus)] disabled:opacity-50"
                    >
                      {activeDialog.cancelLabel}
                    </button>

                    <button
                      type="button"
                      disabled={activeDialog.isLoading}
                      onClick={handleConfirm}
                      className={cn(
                        'inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-md text-white shadow-xs transition-all outline-none focus-visible:ring-2 disabled:opacity-50',
                        activeDialog.theme === 'rose'
                          ? 'bg-[var(--rose-solid)] hover:opacity-90 focus-visible:ring-[var(--rose-solid)]'
                          : activeDialog.theme === 'amber'
                          ? 'bg-[var(--amber-solid)] text-[var(--ink-primary)] hover:opacity-90 focus-visible:ring-[var(--amber-solid)]'
                          : activeDialog.theme === 'emerald'
                          ? 'bg-[var(--emerald-solid)] hover:opacity-90 focus-visible:ring-[var(--emerald-solid)]'
                          : 'bg-[var(--brand-solid)] hover:opacity-90 focus-visible:ring-[var(--outline-focus)]'
                      )}
                    >
                      {activeDialog.isLoading && <Loader2 className="size-3.5 animate-spin" />}
                      {activeDialog.confirmLabel}
                    </button>
                  </>
                )}
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </>
  )
}
