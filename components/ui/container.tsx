import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  gutter?: boolean
}

const sizeMap: Record<string, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-(--breakpoint-xl)',
  '2xl': 'max-w-(--breakpoint-2xl)',
  full: 'max-w-full',
}

/**
 * Container
 * Responsive max-width wrapper with standardized gutters.
 */
export function Container({
  size = 'lg',
  gutter = true,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(
        'mx-auto w-full',
        sizeMap[size] || 'max-w-7xl',
        gutter && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  surface?: 'base' | 'card' | 'muted' | 'subtle'
}

const sectionPaddingMap: Record<string, string> = {
  sm: 'py-6 md:py-8',
  md: 'py-10 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-20 md:py-32',
}

const surfaceMap: Record<string, string> = {
  base: 'bg-[var(--surface-base)]',
  card: 'bg-[var(--surface-card)] border-y border-[var(--outline-base)]/60',
  muted: 'bg-[var(--surface-muted)] border-y border-[var(--outline-base)]',
  subtle: 'bg-[var(--surface-subtle)]',
}

/**
 * Section
 * Semantic `<section>` primitive with vertical rhythmic spacing and surface coloring.
 */
export function Section({
  size = 'md',
  surface = 'base',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(
        'w-full relative',
        sectionPaddingMap[size] || 'py-10 md:py-16',
        surfaceMap[surface] || 'bg-[var(--surface-base)]',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
