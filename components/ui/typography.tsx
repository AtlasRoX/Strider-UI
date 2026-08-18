import * as React from 'react'
import { cn } from '@/lib/utils'
import type { ThemeColor } from '@/lib/theme-types'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
}

const headingSizeMap = {
  xs: 'text-xs font-semibold tracking-wide uppercase',
  sm: 'text-sm font-semibold tracking-tight',
  md: 'text-base font-bold tracking-tight',
  lg: 'text-lg font-bold tracking-tight sm:text-xl',
  xl: 'text-xl font-bold tracking-tight sm:text-2xl',
  '2xl': 'text-2xl font-extrabold tracking-tight sm:text-3xl',
  '3xl': 'text-3xl font-extrabold tracking-tight sm:text-4xl',
  '4xl': 'text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl',
}

const weightMap = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

/**
 * Heading
 * Typographic heading primitive with fluid scales and OKLCH color enforcement.
 */
export function Heading({
  as: Component = 'h2',
  size = 'xl',
  weight,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Component
      data-slot="heading"
      className={cn(
        'text-[var(--ink-primary)]',
        headingSizeMap[size] || headingSizeMap.xl,
        weight && weightMap[weight],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label' | 'small'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  tone?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'brand' | 'emerald' | 'amber' | 'rose'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  truncate?: boolean | 1 | 2 | 3
}

const textSizeMap = {
  xs: 'text-xs leading-relaxed',
  sm: 'text-sm leading-relaxed',
  md: 'text-base leading-relaxed',
  lg: 'text-lg leading-relaxed',
  xl: 'text-xl leading-relaxed',
}

const textToneMap = {
  primary: 'text-[var(--ink-primary)]',
  secondary: 'text-[var(--ink-secondary)]',
  muted: 'text-[var(--ink-muted)]',
  inverse: 'text-[var(--ink-inverse)]',
  brand: 'text-[var(--brand-solid)]',
  emerald: 'text-[var(--emerald-solid)]',
  amber: 'text-[var(--amber-solid)]',
  rose: 'text-[var(--rose-solid)]',
}

/**
 * Text
 * Standard paragraph & span typographic primitive.
 */
export function Text({
  as: Component = 'p' as any,
  size = 'sm',
  tone = 'primary',
  weight = 'normal',
  truncate,
  className,
  children,
  ...props
}: TextProps) {
  let lineClampClass = ''
  if (truncate === true || truncate === 1) lineClampClass = 'truncate'
  else if (truncate === 2) lineClampClass = 'line-clamp-2'
  else if (truncate === 3) lineClampClass = 'line-clamp-3'

  return (
    <Component
      data-slot="text"
      className={cn(
        textSizeMap[size] || textSizeMap.sm,
        textToneMap[tone] || textToneMap.primary,
        weightMap[weight] || 'font-normal',
        lineClampClass,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  theme?: ThemeColor
}

/**
 * Blockquote
 * Accessible quote callout with border accent.
 */
export function Blockquote({
  theme = 'brand',
  className,
  children,
  ...props
}: BlockquoteProps) {
  return (
    <blockquote
      data-slot="blockquote"
      className={cn(
        'border-l-4 pl-4 py-1 my-4 italic text-[var(--ink-secondary)] text-sm',
        theme === 'brand' && 'border-[var(--brand-solid)] bg-[var(--brand-subtle)]/30 rounded-r-lg',
        theme === 'blue' && 'border-[var(--blue-solid)] bg-[var(--blue-subtle)]/30 rounded-r-lg',
        theme === 'emerald' && 'border-[var(--emerald-solid)] bg-[var(--emerald-subtle)]/30 rounded-r-lg',
        theme === 'amber' && 'border-[var(--amber-solid)] bg-[var(--amber-subtle)]/30 rounded-r-lg',
        theme === 'rose' && 'border-[var(--rose-solid)] bg-[var(--rose-subtle)]/30 rounded-r-lg',
        theme === 'violet' && 'border-[var(--violet-solid)] bg-[var(--violet-subtle)]/30 rounded-r-lg',
        theme === 'gray' && 'border-[var(--outline-base)] bg-[var(--surface-muted)] rounded-r-lg',
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  )
}

export interface HighlightProps extends React.HTMLAttributes<HTMLElement> {
  theme?: ThemeColor
}

/**
 * Highlight
 * Inline text marker highlight using OKLCH colors.
 */
export function Highlight({
  theme = 'brand',
  className,
  children,
  ...props
}: HighlightProps) {
  return (
    <mark
      data-slot="highlight"
      className={cn(
        'px-1.5 py-0.5 rounded text-inherit font-semibold',
        theme === 'brand' && 'bg-[var(--brand-subtle)] text-[var(--brand-ink)]',
        theme === 'amber' && 'bg-[var(--amber-subtle)] text-[var(--amber-ink)]',
        theme === 'emerald' && 'bg-[var(--emerald-subtle)] text-[var(--emerald-ink)]',
        theme === 'blue' && 'bg-[var(--blue-subtle)] text-[var(--blue-ink)]',
        theme === 'rose' && 'bg-[var(--rose-subtle)] text-[var(--rose-ink)]',
        theme === 'violet' && 'bg-[var(--violet-subtle)] text-[var(--violet-ink)]',
        className
      )}
      {...props}
    >
      {children}
    </mark>
  )
}
