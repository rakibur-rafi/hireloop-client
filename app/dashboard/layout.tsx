import type { ReactNode } from "react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark min-h-svh bg-ink font-sans text-foreground antialiased">
      <DashboardShell>{children}</DashboardShell>
    </div>
  )
}
