"use client"

import { Banknote, Bookmark, CalendarDays, Clock, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import type { JobRecord } from "@/components/dashboard/job-update-dialog"
import { Button } from "@/components/ui/button"
import { getJob } from "@/lib/api/jobs"
import { formatCompensation, formatDeadline } from "@/lib/format"
import { cn } from "@/lib/utils"

/** Textarea content → bullet lines (strips "-"/"•" prefixes the poster may have typed). */
function toList(text: string) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean)
}

export function JobDetail() {
  const { id } = useParams<{ id: string }>()
  const [job, setJob] = useState<JobRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getJob(id)
      .then((data) => {
        setJob(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Failed to load job:", error)
        setIsLoading(false)
      })
  }, [id])

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center text-[13px] text-zinc-500">
          Loading job…
        </p>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
        <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center text-[13px] text-zinc-500">
          Job not found.
        </p>
      </div>
    )
  }

  const responsibilities = toList(job.responsibilities)
  const qualifications = toList(job.qualifications)
  const stats = [
    { icon: Banknote, label: "Salary Range", value: formatCompensation(job) },
    {
      icon: MapPin,
      label: "Location",
      value: `${job.jobLocation}${job.remoteWorkAllowed ? " (Remote)" : ""}`,
    },
    { icon: Clock, label: "Job Type", value: job.jobType },
    { icon: CalendarDays, label: "Application Deadline", value: formatDeadline(job.applicationDeadline) },
  ]

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      {/* Header card */}
      <div className="flex flex-wrap items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.06] text-lg font-medium text-zinc-300">
          {job.companyName.charAt(0).toUpperCase() || "?"}
        </span>

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white">{job.jobTitle}</h1>
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[13px] text-zinc-400">
            {job.companyName}
            <span aria-hidden className="text-zinc-600">•</span>
            {job.status ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span aria-hidden className="size-1.5 rounded-full bg-current" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-zinc-500">
                <span aria-hidden className="size-1.5 rounded-full bg-current" />
                Inactive
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Save job"
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-2.5 text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-zinc-200"
          >
            <Bookmark className="size-4" />
          </button>
          <Button className="h-9 rounded-lg bg-white px-5 text-[13px] font-medium text-zinc-900 hover:bg-zinc-200">
            Apply Now
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <p className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500">
              <stat.icon aria-hidden className="size-3.5" />
              {stat.label}
            </p>
            <p className="mt-1.5 text-[14px] font-medium text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Responsibilities */}
      {responsibilities.length > 0 ? (
        <section className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="text-lg font-semibold text-white">Responsibilities</h2>
          <ul className="mt-3 grid gap-2.5">
            {responsibilities.map((line, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-zinc-400">
                <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-zinc-600" />
                {line}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Requirements */}
      {qualifications.length > 0 ? (
        <section className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h2 className="text-lg font-semibold text-white">Requirements</h2>
          <ul className="mt-3 grid gap-2.5">
            {qualifications.map((line, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-zinc-400">
                <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-zinc-600" />
                {line}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Category + posted info footer */}
      <p className={cn("mt-4 text-center text-[12px] text-zinc-600")}>
        Posted under {job.jobCategory} • Apply before {formatDeadline(job.applicationDeadline)}
      </p>
    </div>
  )
}
