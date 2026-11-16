import { Hero } from "@/components/home/hero"
import { Roles } from "@/components/home/roles"

export default function Page() {
  return (
    <div className="dark min-h-svh bg-ink font-sans text-foreground antialiased">
      <Hero />
      <Roles />
    </div>
  )
}
