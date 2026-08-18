import * as React from 'react'
import { cn } from '@/lib/utils'

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  spacing?: 0 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse'
  divider?: React.ReactNode
}

const spacingMap: Record<number, string> = {
  0: 'gap-0',
  1: 'gap-1',
  1.5: 'gap-1.5',
  2: 'gap-2',
  2.5: 'gap-2.5',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
}

const alignMap: Record<string, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const justifyMap: Record<string, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const directionMap: Record<string, string> = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
}

/**
 * Stack Primitive
 * Foundational flexbox layout builder with spacing, alignment, and dividers.
 */
export function Stack({
  direction = 'column',
  align = 'stretch',
  justify = 'start',
  spacing = 4,
  wrap = false,
  divider,
  className,
  children,
  ...props
}: StackProps) {
  const items = React.Children.toArray(children).filter(Boolean)

  return (
    <div
      data-slot="stack"
      className={cn(
        'flex',
        directionMap[direction] || 'flex-col',
        alignMap[align] || 'items-stretch',
        justifyMap[justify] || 'justify-start',
        spacingMap[spacing] || 'gap-4',
        wrap === true || wrap === 'wrap' ? 'flex-wrap' : wrap === 'wrap-reverse' ? 'flex-wrap-reverse' : 'flex-nowrap',
        className
      )}
      {...props}
    >
      {divider
        ? items.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < items.length - 1 && <span className="shrink-0 flex items-center justify-center">{divider}</span>}
            </React.Fragment>
          ))
        : children}
    </div>
  )
}

/**
 * VStack - Vertical Stack Layout (flex-col)
 */
export function VStack({
  className,
  ...props
}: Omit<StackProps, 'direction'>) {
  return <Stack direction="column" className={className} {...props} />
}

/**
 * HStack - Horizontal Stack Layout (flex-row items-center)
 */
export function HStack({
  align = 'center',
  className,
  ...props
}: Omit<StackProps, 'direction'>) {
  return <Stack direction="row" align={align} className={className} {...props} />
}

export interface SimpleGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | { sm?: number; md?: number; lg?: number; xl?: number }
  spacing?: 0 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  minChildWidth?: string
}

/**
 * SimpleGrid
 * Responsive CSS Grid container with fixed column counts or auto-fill responsive widths.
 */
export function SimpleGrid({
  columns = 1,
  spacing = 4,
  minChildWidth,
  className,
  style,
  children,
  ...props
}: SimpleGridProps) {
  let gridColsClass = 'grid-cols-1'

  if (typeof columns === 'number') {
    const colMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
      6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
      12: 'grid-cols-12',
    }
    gridColsClass = colMap[columns] || 'grid-cols-1'
  }

  const customStyle: React.CSSProperties = {
    ...style,
    ...(minChildWidth
      ? { gridTemplateColumns: `repeat(auto-fit, minmax(${minChildWidth}, 1fr))` }
      : {}),
  }

  return (
    <div
      data-slot="simple-grid"
      className={cn('grid w-full', !minChildWidth && gridColsClass, spacingMap[spacing] || 'gap-4', className)}
      style={customStyle}
      {...props}
    >
      {children}
    </div>
  )
}
