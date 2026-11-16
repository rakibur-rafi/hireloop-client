import { Hero } from "@/components/home/hero"
import { Roles } from "@/components/home/roles"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <div className="dark min-h-svh bg-ink font-sans text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <Roles />
      </main>
    </div>
  )
}
