"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, BarChart3, Boxes, Bell, Menu, User, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase/client"

const navItems = [
    {
        href: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
        activeIcon: LayoutDashboard
    },
    {
        href: "/dashboard/analytics",
        label: "Analytics",
        icon: BarChart3,
        activeIcon: BarChart3
    },
    {
        href: "/dashboard/widgets",
        label: "Widgets",
        icon: Boxes,
        activeIcon: Boxes
    },
    {
        href: "/dashboard/notifications",
        label: "Notifications",
        icon: Bell,
        activeIcon: Bell
    },
]

const menuItems = [
    {
        href: "/dashboard/profile",
        label: "Profile",
        icon: User,
    },
    {
        href: "/dashboard/settings",
        label: "Settings",
        icon: Settings,
    },
]

export function MobileNav() {
    const pathname = usePathname()
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push("/")
    }

    return (
        <nav
            className={cn(
                "fixed bottom-0 left-0 right-0 z-50",
                "md:hidden", // Only visible on mobile
                "bg-background/80 backdrop-blur-md border-t border-border",
                "mobile-nav-safe" // Safe area insets
            )}
            style={{
                paddingBottom: "env(safe-area-inset-bottom, 0px)"
            }}
        >
            <div className="flex items-center justify-around px-2 py-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"))
                    const Icon = isActive ? item.activeIcon : item.icon

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200",
                                "min-w-[64px] min-h-[56px]", // Ensure 44px+ touch target
                                "hover:bg-accent/50 active:scale-95",
                                isActive
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "h-5 w-5 transition-transform duration-200",
                                    isActive && "scale-110"
                                )}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className="text-xs truncate max-w-[64px]">{item.label}</span>
                        </Link>
                    )
                })}

                {/* Menu Button - Opens Sheet with all options */}
                <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                    <SheetTrigger asChild>
                        <button
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200",
                                "min-w-[64px] min-h-[56px]", // Ensure 44px+ touch target
                                "text-muted-foreground hover:text-foreground hover:bg-accent/50 active:scale-95"
                            )}
                        >
                            <Menu className="h-5 w-5" strokeWidth={2} />
                            <span className="text-xs">Menu</span>
                        </button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="px-0">
                        <SheetHeader className="px-6 pb-4">
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="space-y-1 px-4">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                                const Icon = item.icon

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                            "hover:bg-accent",
                                            isActive && "bg-accent text-primary font-medium"
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                )
                            })}

                            <div className="pt-4 border-t border-border mt-4">
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-destructive/10 text-destructive w-full"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span className="font-medium">Sign out</span>
                                </button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
