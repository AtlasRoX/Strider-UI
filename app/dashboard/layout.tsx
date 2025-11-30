import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/layout/sidebar"
import { TopNavbar } from "@/components/layout/top-navbar"
import { MobileNav } from "@/components/layout/mobile-nav"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { ModalProvider } from "@/contexts/modal-context"
import { ChatPanel } from "@/components/chat/chat-panel"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <SidebarProvider>
      <ModalProvider>
        <div className="min-h-screen bg-background" suppressHydrationWarning>
          <Sidebar
            user={{
              email: user.email,
              name: user.user_metadata?.name || user.email?.split("@")[0],
            }}
          />
          <TopNavbar />
          <DashboardShell>{children}</DashboardShell>
          <MobileNav />
          <ChatPanel />
        </div>
      </ModalProvider>
    </SidebarProvider>
  )
}
