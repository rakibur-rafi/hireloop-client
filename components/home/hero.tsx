import Image from "next/image"
import { Briefcase, Building2, MapPin, Search, Star } from "lucide-react"

import globe from "@/app/images/globe.png"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const trendingPositions = [
  "Product Designers",
  "AI Engineering",
  "DevOps Engineer",
]

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Search, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

const stars: Array<[number, number, number, number]> = [
  [4, 62, 2, 0.5], [9, 24, 2, 0.8], [14, 78, 2, 0.4], [19, 45, 2, 0.7],
  [24, 15, 2, 0.9], [29, 66, 2, 0.5], [34, 33, 2, 0.8], [40, 84, 2, 0.4],
  [46, 20, 2, 0.7], [52, 55, 2, 0.5], [58, 12, 2, 0.9], [64, 70, 2, 0.4],
  [69, 38, 2, 0.8], [75, 18, 2, 0.6], [81, 60, 2, 0.5], [87, 30, 2, 0.9],
  [93, 74, 2, 0.4], [97, 48, 2, 0.7],
]

const globeClipPath =
  "polygon(0% 46%, 10% 42.5%, 20% 39%, 30% 35.5%, 40% 32%, 50% 29.5%, 60% 32%, 70% 35.5%, 80% 39%, 90% 42.5%, 100% 46%, 100% 100%, 0% 100%)"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[640px] overflow-hidden sm:top-[560px] md:top-[700px]"
      >
        <Image
          src={globe}
          alt=""
          priority
          sizes="1150px"
          className="absolute top-[-620px] left-1/2 w-[1150px] max-w-none -translate-x-1/2"
          style={{ clipPath: globeClipPath }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 52% at 50% 40%, transparent 38%, #050507 82%), linear-gradient(to bottom, transparent 55%, #050507 96%)",
          }}
        />
        {/* Star specks above the dome */}
        {stars.map(([x, y, size, opacity], index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              opacity,
            }}
          />
        ))}
      </div>

      {/* Copy + search */}
      <div className="relative px-4 pt-36 text-center sm:pt-44 md:pt-[270px]">
        <div className="flex items-center justify-center gap-3">
          <span
            aria-hidden
            className="hidden h-px w-14 bg-gradient-to-l from-zinc-700/80 to-transparent md:block"
          />
          <Badge
            variant="outline"
            className="h-auto gap-2 rounded-full border-white/[0.09] bg-white/[0.03] py-[5px] pr-4 pl-[5px]"
          >
            <span className="flex size-[22px] items-center justify-center rounded-[7px] bg-white/[0.08]">
              <Briefcase className="text-zinc-300" />
            </span>
            <span className="font-mono text-[13px] font-semibold text-white">
              50,000+
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-zinc-500 uppercase">
              New jobs this month
            </span>
          </Badge>
          <span aria-hidden className="hidden items-center gap-1.5 md:flex">
            <span className="h-px w-14 bg-gradient-to-r from-zinc-700/80 to-transparent" />
            <span className="size-[3px] rounded-full bg-zinc-600" />
          </span>
        </div>

        <h1 className="mt-9 text-4xl font-semibold tracking-[-0.02em] text-white md:text-[56px] md:leading-[1.06]">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-relaxed text-zinc-400 md:text-lg">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role – faster.
        </p>

        <form
          action="/"
          method="get"
          role="search"
          className="mx-auto mt-10 flex h-[60px] w-full max-w-[720px] items-center gap-1.5 rounded-[14px] border border-white/[0.08] bg-[#0d0d12] p-2 pr-2 pl-4 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
        >
          <Search className="size-4 shrink-0 text-zinc-500" />
          <Input
            name="q"
            placeholder="Job title, skill or company"
            className="h-8 flex-1 border-none bg-transparent px-2 shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent md:text-sm"
          />
          <Separator orientation="vertical" className="shrink-0 bg-white/10" />
          <MapPin className="hidden size-4 shrink-0 text-zinc-500 sm:block" />
          <Input
            name="location"
            placeholder="Location or Remote"
            className="hidden h-8 w-[170px] border-none bg-transparent px-2 shadow-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent md:block"
          />
          <Button
            type="submit"
            aria-label="Search jobs"
            className="size-[42px] shrink-0 rounded-[10px] bg-brand p-0 text-white hover:bg-brand-hover"
          >
            <Search className="size-[18px]" />
          </Button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-[13px]">
          <span className="mr-1 text-zinc-500">Trending Position</span>
          {trendingPositions.map((position) => (
            <Button
              key={position}
              variant="secondary"
              size="xs"
              className="h-[22px] rounded-full border border-white/[0.08] bg-white/[0.05] px-3 text-xs text-zinc-300 hover:bg-white/[0.09] hover:text-white"
            >
              {position}
            </Button>
          ))}
        </div>
      </div>

      {/* Globe copy + stats */}
      <div className="relative px-3 pt-40 pb-6 sm:px-4 sm:pt-48 md:pt-[394px] md:pb-14">
        <p className="mx-auto max-w-[620px] text-center text-2xl leading-snug tracking-tight md:text-[32px] md:leading-[1.3]">
          <span className="text-zinc-300">Assisting over </span>
          <span className="font-semibold text-white">15,000 job seekers</span>
          <br className="hidden md:block" />
          <span className="text-zinc-300"> find their dream positions.</span>
        </p>

        <div className="mx-auto mt-10 grid max-w-[1396px] grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-5">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              size="sm"
              className="rounded-2xl px-4 border-0 bg-gradient-to-b from-[#010102] to-[#313131] py-5 shadow-none backdrop-blur-lg"
            >
              <CardContent className="min-h-[120px] gap-0 p-0 md:min-h-0">
                <stat.icon
                  className="size-5 text-zinc-400"
                  strokeWidth={1.75}
                />
                <p className="mt-auto pt-8 text-3xl font-semibold tracking-tight text-white md:pt-16 md:text-[44px]">
                  {stat.value}
                </p>
                <p className="mt-2.5 text-[13px] text-zinc-400 md:text-[15px]">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
