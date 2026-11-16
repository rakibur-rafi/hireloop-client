import Link from "next/link"
import { ArrowRight, Briefcase, CircleEuro, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const role = {
  title: "Frontend Developer",
  description:
    "Showcase your commitment to diversity and inclusion by highlighting initiatives",
  location: "New York, USA",
  workplace: "Hybrid",
  rate: "€25-€40/hour",
}

const roles = Array.from({ length: 6 }, () => role)

function RoleCard() {
  return (
    <Card className="min-h-[340px] gap-0 rounded-xl bg-[#151518] py-6 shadow-none ring-white/[0.06]">
      <CardContent className="flex h-full flex-col gap-0 p-0">
        <h3 className="text-2xl font-medium tracking-tight text-white md:text-[28px]">
          {role.title}
        </h3>
        <p className="mt-3 max-w-[320px] text-[15px] leading-relaxed text-zinc-500">
          {role.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="h-8 gap-1.5 rounded-full bg-white/[0.06] px-3.5 text-[13px] font-normal text-zinc-300"
          >
            <MapPin className="text-brand" />
            {role.location}
          </Badge>
          <Badge
            variant="secondary"
            className="h-8 gap-1.5 rounded-full bg-white/[0.06] px-3.5 text-[13px] font-normal text-zinc-300"
          >
            <Briefcase className="text-brand" />
            {role.workplace}
          </Badge>
          <Badge
            variant="secondary"
            className="h-8 gap-1.5 rounded-full bg-white/[0.06] px-3.5 text-[13px] font-normal text-zinc-300"
          >
            <CircleEuro className="text-brand" />
            {role.rate}
          </Badge>
        </div>

        <Button
          variant="ghost"
          render={<Link href="/jobs" />}
          className="group mt-auto px-0 text-[15px] font-medium text-white hover:bg-transparent hover:text-white [&_svg]:transition-transform group-hover:[&_svg]:translate-x-0.5"
        >
          Apply Now
          <ArrowRight data-icon="inline-end" />
        </Button>
      </CardContent>
    </Card>
  )
}

export function Roles() {
  return (
    <section className="relative py-24 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[1396px] px-4">
        <p className="flex items-center justify-center gap-2.5 font-mono text-[13px] font-medium tracking-[0.2em] text-brand uppercase">
          <span aria-hidden className="size-1.5 rounded-[2px] bg-brand" />
          Smart Job Discovery
          <span aria-hidden className="size-1.5 rounded-[2px] bg-brand" />
        </p>

        <h2 className="mx-auto mt-6 max-w-[620px] text-center text-4xl font-semibold tracking-[-0.02em] text-white md:text-[44px] md:leading-[1.15]">
          The roles you&apos;d never find by searching
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((_, index) => (
            <RoleCard key={index} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button className="h-11 rounded-lg bg-white px-6 text-sm font-medium text-zinc-950 hover:bg-zinc-200">
            View all job open
          </Button>
        </div>
      </div>
    </section>
  )
}
