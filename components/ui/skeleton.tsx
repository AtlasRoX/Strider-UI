import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const skeletonVariants = cva('bg-[var(--surface-muted)] select-none', {
  variants: {
    variant: {
      text: 'h-4 w-full rounded-sm',
      circle: 'rounded-full aspect-square',
      rectangle: 'rounded-md',
    },
    animated: {
      true: 'animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'rectangle',
    animated: true,
  },
})

export interface SkeletonProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({
  className,
  variant = 'rectangle',
  animated = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      data-variant={variant}
      className={cn(skeletonVariants({ variant, animated }), className)}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
