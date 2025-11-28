"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState, useCallback } from "react"
import { LayoutDashboard, Settings, User, Bell, BarChart3, Boxes, ChevronLeft, Menu, GripVertical, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/contexts/sidebar-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Logo, LogoIcon } from "@/components/ui/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/widgets", label: "Widgets", icon: Boxes },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const MIN_WIDTH = 200
const MAX_WIDTH = 320
const COLLAPSED_WIDTH = 64

interface SidebarProps {
  className?: string
  user?: {
    email?: string
    name?: string
    avatar?: string
  }
}

export function Sidebar({ className, user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen, sidebarWidth, setSidebarWidth } = useSidebar()
  const [isDragging, setIsDragging] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U"

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname, setMobileOpen])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || collapsed) return
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX))
      setSidebarWidth(newWidth)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging, collapsed, setSidebarWidth])

  const currentWidth = collapsed ? COLLAPSED_WIDTH : sidebarWidth

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        style={{ width: currentWidth }}
        className={cn(
          "fixed left-0 top-0 h-screen bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 border-r border-sidebar-border/50 backdrop-blur-xl z-40",
          "flex flex-col",
          "transition-all duration-300 ease-out",
          // Mobile: Hidden off-screen by default, slide in when mobileOpen
          // Desktop: Always visible
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0", // Always visible on desktop
          className,
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "h-16 flex items-center border-b border-sidebar-border/50 shrink-0 bg-sidebar/80 backdrop-blur-sm",
            collapsed ? "justify-center px-2" : "justify-between px-4",
          )}
        >
          {!collapsed ? (
            <Logo width={140} height={36} showTagline={false} />
          ) : (
            <div className="transition-transform hover:scale-110 duration-200">
              <LogoIcon />
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-8 w-8 hover:bg-sidebar-accent/80 transition-all hover:rotate-180 duration-300"
              onClick={() => setCollapsed(!collapsed)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Collapse button when collapsed */}
        {collapsed && (
          <div className="flex justify-center py-2 border-b border-sidebar-border/50 shrink-0 bg-sidebar/50">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-8 w-8 hover:bg-sidebar-accent/80 transition-all hover:rotate-180 duration-300"
              onClick={() => setCollapsed(!collapsed)}
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        )}

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-150",
                  "hover:bg-sidebar-accent",
                  isActive && "bg-sidebar-accent text-sidebar-primary font-medium",
                  collapsed && "justify-center px-2",
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive && "text-primary"
                  )}
                />
                {!collapsed && (
                  <span className="truncate">
                    {item.label}
                  </span>
                )}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return linkContent
          })}
        </nav>

        {/* User Section at Bottom */}
        <div className="mt-auto shrink-0">
          <div className={cn(
            "border-t border-sidebar-border/50 bg-gradient-to-b from-sidebar/50 to-sidebar backdrop-blur-sm",
            collapsed ? "p-3" : "p-4"
          )}>
            {collapsed ? (
              <div className="flex flex-col gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex justify-center group cursor-pointer">
                      <div className="relative">
                        <Avatar className="h-10 w-10 ring-2 ring-sidebar-border/50 group-hover:ring-primary/50 transition-all duration-300 group-hover:scale-110">
                          <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-bold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full ring-2 ring-sidebar" />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-popover/95 backdrop-blur-sm border-border/50">
                    <p className="font-semibold">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSignOut}
                      className="w-full h-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-105"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-popover/95 backdrop-blur-sm border-border/50">
                    Sign out
                  </TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent/40 transition-all duration-200 group cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-11 w-11 ring-2 ring-sidebar-border/50 group-hover:ring-primary/50 transition-all duration-300">
                      <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full ring-2 ring-sidebar" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-foreground">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-all duration-200 group"
                >
                  <LogOut className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  <span className="font-medium">Sign out</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {!collapsed && (
          <div
            onMouseDown={handleMouseDown}
            className={cn(
              "absolute top-0 right-0 w-1.5 h-full cursor-col-resize group hidden md:block",
              "hover:bg-primary/30 transition-all duration-200",
              isDragging && "bg-primary/50 w-2",
            )}
          >
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 scale-0 group-hover:scale-100">
              <div className="bg-primary/20 backdrop-blur-sm rounded-full p-1">
                <GripVertical className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        )}
      </aside>
    </TooltipProvider>
  )
}
