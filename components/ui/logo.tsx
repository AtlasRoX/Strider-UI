"use client"

import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  linkTo?: string
  width?: number
  height?: number
  showTagline?: boolean
}

export function Logo({ className, linkTo = "/", width = 180, height = 50, showTagline = true }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className={cn("flex items-center", className)} style={{ width, height }} />
  }

  const logoSrc = resolvedTheme === "dark" ? "/images/logo-dark.png" : "/images/logo-light.png"

  const content = (
    <Image
      src={logoSrc || "/placeholder.svg"}
      alt="StriderBoard"
      width={width}
      height={height}
      className={cn("object-contain", showTagline ? "" : "object-left")}
      priority
    />
  )

  if (linkTo) {
    return (
      <Link href={linkTo} className={cn("flex items-center", className)}>
        {content}
      </Link>
    )
  }

  return <div className={cn("flex items-center", className)}>{content}</div>
}

// Compact version for collapsed sidebar
export function LogoIcon({ className, linkTo = "/" }: { className?: string; linkTo?: string }) {
  const content = (
    <div className={cn("h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0", className)}>
      <span className="text-primary-foreground font-bold text-sm">S</span>
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
