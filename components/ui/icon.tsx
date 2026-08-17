'use client'

import * as React from 'react'
import * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string
  size?: number | string
  theme?: ThemeColor
  className?: string
}

/**
 * Icon
 * Dynamic icon component mapping name strings to Lucide icons.
 * Example: `<Icon name="check" size={16} theme="emerald" />`
 */
export function Icon({
  name,
  size = 16,
  theme,
  className,
  ...props
}: IconProps) {
  // Convert kebab-case or snake_case to PascalCase (e.g. 'check-circle' -> 'CheckCircle')
  const pascalName = name
    .replace(/(^\w|-\w|_\w)/g, (match) => match.replace(/-|_/, '').toUpperCase())

  const IconComponent = (LucideIcons as any)[pascalName] || (LucideIcons as any)[name] || LucideIcons.HelpCircle

  const themeClass = theme
    ? {
        brand: 'text-[var(--brand-solid)]',
        gray: 'text-[var(--ink-secondary)]',
        blue: 'text-[var(--blue-solid)]',
        emerald: 'text-[var(--emerald-solid)]',
        amber: 'text-[var(--amber-solid)]',
        rose: 'text-[var(--rose-solid)]',
        violet: 'text-[var(--violet-solid)]',
      }[theme]
    : ''

  return (
    <IconComponent
      size={size}
      className={cn('shrink-0', themeClass, className)}
      {...props}
    />
  )
}
