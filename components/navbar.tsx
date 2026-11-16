"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="relative mx-auto flex h-12 max-w-[1396px] items-center rounded-xl border border-white/[0.08] bg-panel/85 pr-2 pl-4 backdrop-blur-md md:h-[54px] md:pr-3 md:pl-6">
        <Link href="/" aria-label="HireLoop home" className="mr-auto">
          <Image
            src={logo}
            alt="HireLoop"
            priority
            className="h-6 w-auto md:h-7"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center md:flex">
          <nav aria-label="Main" className="flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Separator
            orientation="vertical"
            className="mx-5 bg-secondary"
          />
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="px-3 text-[13px] font-medium text-zinc-200 transition-colors hover:text-white"
            >
              Sign In
            </Link>
            <Button className="h-9 rounded-lg bg-brand px-4 text-[13px] text-white hover:bg-brand-hover">
              Get Started
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <Button
          variant="ghost"
          size="icon-sm"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-zinc-300 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>

        {open ? (
          <div className="absolute inset-x-0 top-[calc(100%+8px)] flex flex-col gap-1 rounded-xl border border-white/[0.08] bg-panel/95 p-3 backdrop-blur-md md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Separator className="my-2 bg-white/10" />
            <Link
              href="/signin"
              className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
            <Button
              className="mt-1 h-10 rounded-lg bg-brand text-sm text-white hover:bg-brand-hover"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  )
}
