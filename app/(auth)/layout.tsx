import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark relative flex min-h-svh flex-col items-center justify-center bg-ink px-4 pt-28 pb-16 font-sans antialiased">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(79,70,229,0.09),transparent_70%)]"
      />

      <main className="relative w-full max-w-[440px]">{children}</main>
    </div>
  )
}
