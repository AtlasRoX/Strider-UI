'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-visible select-none',
  {
    variants: {
      size: {
        xs: 'size-5 text-[10px]',
        sm: 'size-7 text-xs',
        md: 'size-9 text-sm',
        lg: 'size-12 text-base',
        xl: 'size-16 text-lg font-semibold',
      },
      shape: {
        circle: 'rounded-full [&>[data-slot=avatar-inner]]:rounded-full',
        square: 'rounded-lg [&>[data-slot=avatar-inner]]:rounded-lg',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
)

/** Generate 1-2 letters initials from a name string */
function getInitials(name?: string): string {
  if (!name) return ''
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/** Deterministic color hash for fallback backgrounds */
const AVATAR_PALETTE = [
  'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
  'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300',
  'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
  'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300',
]

function getAvatarColor(str?: string): string {
  if (!str) return 'bg-[var(--surface-muted)] text-[var(--ink-primary)]'
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % AVATAR_PALETTE.length
  return AVATAR_PALETTE[index]
}

export interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  image?: string
  src?: string
  label?: string
  alt?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
}

function Avatar({
  className,
  size = 'md',
  shape = 'circle',
  image,
  src,
  label,
  alt,
  status,
  children,
  ...props
}: AvatarProps) {
  const effectiveImage = src || image
  const initials = getInitials(label || alt)
  const colorClass = getAvatarColor(label || alt)

  const statusDotSize = {
    xs: 'size-1.5 ring-1',
    sm: 'size-2 ring-1.5',
    md: 'size-2.5 ring-2',
    lg: 'size-3.5 ring-2',
    xl: 'size-4 ring-2',
  }[size || 'md']

  const statusColor = {
    online: 'bg-[var(--emerald-solid)]',
    away: 'bg-[var(--amber-solid)]',
    busy: 'bg-[var(--rose-solid)]',
    offline: 'bg-[var(--ink-muted)]',
  }[status || 'online']

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-shape={shape}
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    >
      <div
        data-slot="avatar-inner"
        className="size-full overflow-hidden flex items-center justify-center bg-[var(--surface-muted)]"
      >
        {effectiveImage && (
          <AvatarPrimitive.Image
            src={effectiveImage}
            alt={alt || label || 'Avatar'}
            className="size-full object-cover"
          />
        )}
        <AvatarPrimitive.Fallback
          data-slot="avatar-fallback"
          className={cn(
            'flex size-full items-center justify-center font-medium select-none',
            colorClass
          )}
        >
          {initials || children || '•'}
        </AvatarPrimitive.Fallback>
      </div>

      {status && (
        <span
          data-slot="avatar-status"
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-[var(--surface-base)]',
            statusDotSize,
            statusColor
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </AvatarPrimitive.Root>
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full object-cover', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-[var(--surface-muted)] text-[var(--ink-primary)] flex size-full items-center justify-center font-medium',
        className
      )}
      {...props}
    />
  )
}

/**
 * AvatarGroup
 * Renders multiple avatars overlapping with an optional limit and "+N" overflow bubble.
 */
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  limit?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

function AvatarGroup({
  className,
  limit,
  size = 'md',
  children,
  ...props
}: AvatarGroupProps) {
  const avatarList = React.Children.toArray(children)
  const visibleAvatars = limit ? avatarList.slice(0, limit) : avatarList
  const overflowCount = limit && avatarList.length > limit ? avatarList.length - limit : 0

  const overlapMargin = {
    xs: '-space-x-1.5',
    sm: '-space-x-2',
    md: '-space-x-2.5',
    lg: '-space-x-3',
    xl: '-space-x-4',
  }[size]

  return (
    <div
      data-slot="avatar-group"
      className={cn('flex items-center', overlapMargin, className)}
      {...props}
    >
      {visibleAvatars.map((child, idx) => (
        <div key={idx} className="relative ring-2 ring-[var(--surface-base)] rounded-full">
          {child}
        </div>
      ))}

      {overflowCount > 0 && (
        <div
          data-slot="avatar-group-overflow"
          className={cn(
            'relative flex items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--ink-secondary)] font-semibold ring-2 ring-[var(--surface-base)] select-none',
            avatarVariants({ size, shape: 'circle' })
          )}
        >
          +{overflowCount}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, avatarVariants }
