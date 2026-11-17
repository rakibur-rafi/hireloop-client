"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Banknote,
  Bookmark,
  Briefcase,
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutGrid,
  LogOut,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react"

import logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type Role = "seeker" | "recruiter" | "admin"

type NavItem = {
  href: string
  label: string
  icon: typeof LayoutGrid
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  seeker: [
    { href: "/dashboard/seeker", label: "Dashboard", icon: LayoutGrid },
    { href: "/dashboard/seeker/jobs", label: "Jobs", icon: Briefcase },
    { href: "/dashboard/seeker/saved", label: "Saved Jobs", icon: Bookmark },
    {
      href: "/dashboard/seeker/applications",
      label: "Applications",
      icon: FileText,
    },
    { href: "/dashboard/seeker/billing", label: "Billing", icon: Banknote },
    { href: "/dashboard/seeker/settings", label: "Settings", icon: Settings },
  ],
  recruiter: [
    { href: "/dashboard/recruiter", label: "Dashboard", icon: LayoutGrid },
    {
      href: "/dashboard/recruiter/jobs",
      label: "Manage Jobs",
      icon: ClipboardList,
    },
    {
      href: "/dashboard/recruiter/jobs/add-jobs",
      label: "Add Jobs",
      icon: PlusCircle
    },
    {
      href: "/dashboard/recruiter/applications",
      label: "Applications",
      icon: FileText,
    },
    { href: "/dashboard/recruiter/settings", label: "Settings", icon: Settings },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutGrid },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
    { href: "/dashboard/admin/companies", label: "Companies", icon: Building2 },
    { href: "/dashboard/admin/jobs", label: "Jobs", icon: Briefcase },
    { href: "/dashboard/admin/payments", label: "Payments", icon: CreditCard },
    { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  ],
}

const PORTAL_LABEL: Record<Role, string> = {
  seeker: "Seeker Portal",
  recruiter: "Recruiter Portal",
  admin: "Admin Console",
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/")
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const user = session?.user
  const role = (user?.role as Role | undefined) ?? "seeker"

  const items = NAV_BY_ROLE[role] ?? NAV_BY_ROLE.seeker
  const initials = (user?.name || user?.email || "?")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  async function handleSignOut() {
    await authClient.signOut()
    router.push("/")
  }

  return (
    <div className="flex h-full flex-col bg-panel">
      {/* Logo */}
      <div className="p-5">
        <Link href="/" aria-label="HireLoop home" onClick={onNavigate}>
          <Image src={logo} alt="HireLoop" className="h-6 w-auto" />
        </Link>
      </div>

      {/* User card */}
      <div className="flex items-center gap-3 px-5 pb-5">
        {user?.image ? (
          <Image
            src={user.image}
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/20 text-xs font-semibold text-brand">
            {initials}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-white">
            {user?.name || "Loading…"}
          </p>
          <p className="text-[11px] text-zinc-500">{PORTAL_LABEL[role]}</p>
        </div>
      </div>

      {/* Nav items */}
      <nav
        aria-label="Dashboard"
        className="flex flex-1 flex-col gap-1 px-3"
      >
        {items.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={cn(
                "flex h-9 items-center gap-2.5 rounded-lg border px-3 text-[13px] font-medium transition-colors border-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-white"
              )}
            >
              <item.icon className="size-4" strokeWidth={1.75} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-3 p-4">
        {role === "seeker" ? (
          <Button
            nativeButton={false}
            render={<Link href="/dashboard/seeker/resume" />}
            className="h-10 w-full rounded-lg bg-white text-[13px] font-medium text-zinc-950 hover:bg-zinc-200"
          >
            Post Resume
          </Button>
        ) : null}
        <button
          type="button"
          onClick={handleSignOut}
          className="flex h-8 items-center gap-2.5 rounded-lg px-3 text-[13px] text-zinc-500 transition-colors hover:text-white"
        >
          <LogOut className="size-4" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </div>
  )
}
