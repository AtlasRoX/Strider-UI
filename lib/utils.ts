import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ThemeColor } from './theme-types'

/** Merge class names with Tailwind conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const warnedDeprecations = new Set<string>()

/**
 * Logs a one-time development deprecation warning (Principle P13).
 * Keeps old APIs working while notifying developers of the canonical replacement.
 */
export function warnDeprecated(
  component: string,
  oldName: string,
  newName: string,
  extra?: string
) {
  if (process.env.NODE_ENV === 'production') return
  const key = `${component}:${oldName}:${newName}`
  if (warnedDeprecations.has(key)) return
  warnedDeprecations.add(key)

  console.warn(
    `[Strider UI Deprecation] <${component}> prop '${oldName}' is deprecated and will be removed in the next major version. Use '${newName}' instead.${
      extra ? ` ${extra}` : ''
    }`
  )
}

/**
 * Returns focus-ring classes for a given theme
 */
export function getFocusRingClass(theme?: ThemeColor | string) {
  switch (theme) {
    case 'rose':
      return 'focus-visible:ring-2 focus-visible:ring-[var(--rose-solid)] focus-visible:ring-offset-2'
    case 'amber':
      return 'focus-visible:ring-2 focus-visible:ring-[var(--amber-solid)] focus-visible:ring-offset-2'
    case 'emerald':
      return 'focus-visible:ring-2 focus-visible:ring-[var(--emerald-solid)] focus-visible:ring-offset-2'
    case 'blue':
      return 'focus-visible:ring-2 focus-visible:ring-[var(--blue-solid)] focus-visible:ring-offset-2'
    case 'gray':
      return 'focus-visible:ring-2 focus-visible:ring-[var(--ink-secondary)] focus-visible:ring-offset-2'
    case 'brand':
    default:
      return 'focus-visible:ring-2 focus-visible:ring-[var(--outline-focus)] focus-visible:ring-offset-2'
  }
}
