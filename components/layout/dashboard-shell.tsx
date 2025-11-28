"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/contexts/sidebar-context"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const { collapsed, sidebarWidth, isMobile } = useSidebar()

  return (
    <main
      className={cn("pt-16 transition-all duration-300", "max-md:pl-0")}
      style={{ paddingLeft: isMobile ? 0 : (collapsed ? 64 : sidebarWidth) }}
    >
      <div className="p-6">{children}</div>
    </main>
  )
}
