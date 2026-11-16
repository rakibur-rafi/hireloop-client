import type { ReactNode } from "react"

import { Card, CardContent } from "@/components/ui/card"

export function AuthCard({
  label,
  title,
  description,
  children,
  footer,
}: {
  label: string
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <Card className="gap-0 rounded-2xl bg-[#151518] p-2 shadow-[0_24px_60px_rgba(0,0,0,0.5)] ring-white/[0.06]">
      <CardContent className="gap-0 p-6 sm:p-8">
        <p className="flex items-center justify-center gap-2.5 font-mono text-[12px] font-medium tracking-[0.2em] text-brand uppercase">
          <span aria-hidden className="size-1.5 rounded-[2px] bg-brand" />
          {label}
          <span aria-hidden className="size-1.5 rounded-[2px] bg-brand" />
        </p>

        <h1 className="mt-4 text-center text-2xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-500">{description}</p>

        <div className="mt-8">{children}</div>

        <p className="mt-8 text-center text-sm text-zinc-400">{footer}</p>
      </CardContent>
    </Card>
  )
}
