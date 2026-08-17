'use client'

import * as React from 'react'

/**
 * useEmptyValueMapping
 * Primitive overlays forbid empty string `""` as an item value (it denotes no selection).
 * This hook translates `""` <-> `"__empty_0"` internally so empty options can be selected cleanly.
 */
export function useEmptyValueMapping(prefix = '__empty_') {
  const toInternal = React.useCallback(
    (value: string | number | undefined, index = 0): string => {
      if (value === '' || value === undefined || value === null) {
        return `${prefix}${index}`
      }
      return String(value)
    },
    [prefix]
  )

  const toExternal = React.useCallback(
    (internalValue: string): string => {
      if (internalValue.startsWith(prefix)) {
        return ''
      }
      return internalValue
    },
    [prefix]
  )

  return { toInternal, toExternal }
}
