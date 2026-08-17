'use client'

import * as React from 'react'

/**
 * useKeyboardShortcut
 * Hook to bind keyboard combos (e.g., 'Mod+K', 'Mod+Shift+P', 'Escape', 'Enter')
 * Normalizes Mod -> Meta on Mac / Ctrl on Windows.
 */
export function useKeyboardShortcut(
  combo: string,
  callback: (e: KeyboardEvent) => void,
  options: { enabled?: boolean; preventDefault?: boolean } = {}
) {
  const { enabled = true, preventDefault = true } = options

  React.useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't fire inside input/textarea unless Escape
      const target = e.target as HTMLElement
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      if (isInput && combo.toLowerCase() !== 'escape') {
        return
      }

      const isMac =
        typeof window !== 'undefined' &&
        /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)

      const parts = combo
        .split('+')
        .map((p) => p.trim().toLowerCase())

      const needsMod = parts.includes('mod') || parts.includes('cmd') || parts.includes('ctrl')
      const needsShift = parts.includes('shift')
      const needsAlt = parts.includes('alt')

      const mainKey = parts.find(
        (p) => !['mod', 'cmd', 'ctrl', 'shift', 'alt'].includes(p)
      )

      const modPressed = isMac ? e.metaKey : e.ctrlKey
      const shiftPressed = e.shiftKey
      const altPressed = e.altKey

      const modMatch = needsMod ? modPressed : !e.metaKey && !e.ctrlKey
      const shiftMatch = needsShift ? shiftPressed : !e.shiftKey
      const altMatch = needsAlt ? altPressed : !e.altKey

      const keyMatch = mainKey
        ? e.key.toLowerCase() === mainKey || e.code.toLowerCase() === `key${mainKey}`
        : true

      if (modMatch && shiftMatch && altMatch && keyMatch) {
        if (preventDefault) {
          e.preventDefault()
        }
        callback(e)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [combo, callback, enabled, preventDefault])
}

/**
 * useDebounce
 * Debounce a state value with delay ms.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * useAutofocusOnOpen
 * Automatically focuses the ref element when an open state transitions to true.
 */
export function useAutofocusOnOpen<T extends HTMLElement = HTMLInputElement>(
  isOpen: boolean
) {
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        ref.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return ref
}
