'use client'

import * as React from 'react'

export interface UseInputLabelingProps {
  id?: string
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  disabled?: boolean
}

export interface UseInputLabelingReturn {
  inputId: string
  labelId: string
  descriptionId: string
  errorMessageId: string
  describedBy: string | undefined
  hasError: boolean
  showDescription: boolean
  inputAriaAttrs: {
    id: string
    'aria-invalid'?: true
    'aria-errormessage'?: string
    'aria-describedby'?: string
    'aria-required'?: true
    disabled?: boolean
  }
}

/**
 * useInputLabeling (Principle P5 Shared Engine)
 * Generates stable IDs and computed ARIA attributes for form controls.
 */
export function useInputLabeling(props: UseInputLabelingProps): UseInputLabelingReturn {
  const generatedId = React.useId()
  const inputId = props.id || generatedId
  const labelId = `${inputId}-label`
  const descriptionId = `${inputId}-desc`
  const errorMessageId = `${inputId}-err`

  const hasError = Boolean(props.error)
  const showDescription = Boolean(props.description)

  const describedByParts: string[] = []
  if (showDescription) describedByParts.push(descriptionId)
  if (hasError) describedByParts.push(errorMessageId)
  const describedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined

  const inputAriaAttrs: UseInputLabelingReturn['inputAriaAttrs'] = {
    id: inputId,
    'aria-invalid': hasError ? true : undefined,
    'aria-errormessage': hasError ? errorMessageId : undefined,
    'aria-describedby': describedBy,
    'aria-required': props.required ? true : undefined,
    disabled: props.disabled,
  }

  return {
    inputId,
    labelId,
    descriptionId,
    errorMessageId,
    describedBy,
    hasError,
    showDescription,
    inputAriaAttrs,
  }
}
