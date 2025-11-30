"use client"

import { SearchBar } from "@/components/ui/search-bar"
import { SearchDialog } from "@/components/ui/search-dialog"
import { NotificationCenter } from "@/components/ui/notification-center"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Logo } from "@/components/ui/logo"
import { useSidebar } from "@/contexts/sidebar-context"

export function TopNavbar() {
  const { collapsed, sidebarWidth, isMobile } = useSidebar()

  return (
    <header
      className="fixed top-0 right-0 h-16 bg-background/95 backdrop-blur-sm border-b border-border z-30 flex items-center justify-between px-4 md:px-6 transition-all duration-300 max-md:left-0"
      style={{ left: isMobile ? 0 : (collapsed ? 64 : sidebarWidth) }}
    >
      {/* Desktop Search */}
      <div className="hidden md:flex flex-1 max-w-3xl">
        <SearchBar placeholder="Search anything..." />
      </div>

      {/* Mobile: Logo Branding */}
      <div className="md:hidden flex-1">
        <Logo width={140} height={35} showTagline={false} />
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        {/* Mobile Search Dialog - Only visible on mobile */}
        <div className="md:hidden">
          <SearchDialog />
        </div>
        <ThemeToggle />
        <NotificationCenter />
      </div>
    </header>
  )
}
