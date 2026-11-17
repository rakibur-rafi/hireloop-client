"use client"

import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"

import { SidebarContent } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export function DashboardShell({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in")
    }
  }, [isPending, session, router])

  return (
    <div className="min-h-svh">
      {/* Desktop sidebar */}
      <aside
        aria-label="Dashboard sidebar"
        className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/[0.08] lg:block"
      >
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-12 items-center gap-3 border-b border-white/[0.08] bg-panel/90 px-4 backdrop-blur-md lg:hidden">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-expanded={drawerOpen}
          aria-label={drawerOpen ? "Close sidebar" : "Open sidebar"}
          className="text-zinc-300"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu />
        </Button>
        <span className="text-sm font-medium text-zinc-200">HireLoop</span>
      </header>

      {/* Mobile drawer */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 border-r border-white/[0.08] shadow-2xl">
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      ) : null}

      {/* Content */}
      <main className="pt-12 lg:pt-0 lg:pl-64">{children}</main>
    </div>
  )
}
