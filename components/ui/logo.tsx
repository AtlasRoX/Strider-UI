'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface LogoProps {
  className?: string
  /** Optional link URL. If omitted, renders plain element without <a> */
  linkTo?: string
  width?: number
  height?: number
  showTagline?: boolean
  /** Force specific theme logo: 'light' | 'dark' */
  forceTheme?: 'light' | 'dark'
}

export function Logo({
  className,
  linkTo,
  width = 140,
  height = 32,
  showTagline = true,
  forceTheme,
}: LogoProps) {
  // If forceTheme is explicitly provided
  if (forceTheme === 'dark') {
    const img = (
      <Image
        src="/images/logo-light.png"
        alt="Strider UI"
        width={width}
        height={height}
        className={cn('h-7 w-auto object-contain', className)}
        priority
      />
    )
    return linkTo ? (
      <Link href={linkTo} className={cn('flex items-center gap-2', className)}>
        {img}
      </Link>
    ) : (
      <div className={cn('flex items-center gap-2', className)}>{img}</div>
    )
  }

  if (forceTheme === 'light') {
    const img = (
      <Image
        src="/images/logo-dark.png"
        alt="Strider UI"
        width={width}
        height={height}
        className={cn('h-7 w-auto object-contain', className)}
        priority
      />
    )
    return linkTo ? (
      <Link href={linkTo} className={cn('flex items-center gap-2', className)}>
        {img}
      </Link>
    ) : (
      <div className={cn('flex items-center gap-2', className)}>{img}</div>
    )
  }

  // Automatic CSS-based dark/light mode switching:
  // In light mode: show logo-dark.png (dark text on light bg)
  // In dark mode: show logo-light.png (light text on dark bg)
  const content = (
    <div className="flex items-center">
      <Image
        src="/images/logo-dark.png"
        alt="Strider UI"
        width={width}
        height={height}
        className={cn('h-7 w-auto object-contain dark:hidden', className)}
        priority
      />
      <Image
        src="/images/logo-light.png"
        alt="Strider UI"
        width={width}
        height={height}
        className={cn('h-7 w-auto object-contain hidden dark:block', className)}
        priority
      />
    </div>
  )

  if (linkTo) {
    return (
      <Link href={linkTo} className={cn('flex items-center gap-2', className)}>
        {content}
      </Link>
    )
  }

  return <div className={cn('flex items-center gap-2', className)}>{content}</div>
}

// Compact version for collapsed sidebar
export function LogoIcon({ className, linkTo }: { className?: string; linkTo?: string }) {
  const content = (
    <div
      className={cn(
        'h-8 w-8 rounded-lg bg-[var(--brand-solid)] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm',
        className
      )}
    >
      <span>S</span>
    </div>
  )

  if (linkTo) {
    return (
      <Link href={linkTo} className="flex items-center justify-center">
        {content}
      </Link>
    )
  }

  return content
}
