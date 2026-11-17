"use client"

import { Banknote, Bookmark, ChevronLeft, ChevronRight, Clock, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, type FormEvent } from "react"

import { JOB_TYPES } from "@/components/dashboard/job-form-fields"
import type { JobRecord } from "@/components/dashboard/job-update-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getJobs } from "@/lib/api/jobs"
import { formatCompensation } from "@/lib/format"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 6

const SORT_OPTIONS = ["Most Recent", "Oldest", "Salary: High to Low"]

const pillClasses =
  "inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-300"

export function BrowseJobs() {
  const [jobs, setJobs] = useState<JobRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  // one-click radio per filter group: click picks a value, clicking again clears it
  const [jobType, setJobType] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0])
  const [page, setPage] = useState(1)

  function loadJobs(query: string) {
    getJobs(query)
      .then((data) => {
        setJobs(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Failed to load jobs:", error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    loadJobs("")
  }, [])

  /** Query string for the /jobs endpoint (explicit args since state updates are async). */
  function buildQuery(searchText: string, type: string | null) {
    const params = new URLSearchParams()
    if (searchText.trim()) params.set("search", searchText.trim())
    if (type) params.set("jobType", type)
    return params.toString()
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPage(1)
    loadJobs(buildQuery(search, jobType))
  }

  const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE))
  const pageJobs = jobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const pages: (number | "…")[] =
    totalPages <= 6
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : [1, 2, 3, "…", totalPages]

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
      >
        <div className="relative min-w-0 flex-1">
          <Search
            aria-hidden
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title, keywords..."
            className="h-11 border-white/[0.08] bg-white/[0.03] pl-9 text-[13px]"
          />
        </div>
        <Button
          type="submit"
          className="h-11 rounded-lg bg-white px-5 text-[13px] font-medium text-zinc-900 hover:bg-zinc-200"
        >
          Search Jobs
        </Button>
      </form>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[240px_1fr]">
        {/* Filters */}
        <aside className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h2 className="text-[15px] font-medium text-white">Filters</h2>

          <h3 className="mt-4 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-zinc-500">
            Job Type
          </h3>
          <div className="mt-3 grid gap-2.5">
            {JOB_TYPES.map((type) => (
              <div key={type} className="flex items-center gap-2.5">
                <Checkbox
                  checked={jobType === type}
                  onCheckedChange={(checked) => {
                    const next = checked ? type : null
                    setJobType(next)
                    setPage(1)
                    loadJobs(buildQuery(search, next))
                  }}
                  aria-label={`Filter by ${type}`}
                />
                <span className="text-[13px] text-zinc-300">{type}</span>
                <span className="ml-auto text-[12px] text-zinc-500">
                  {jobs.filter((job) => job.jobType === type).length}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Results */}
        <main className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">
              Found {jobs.length} Professional Jobs
            </h2>
            <div className="flex items-center gap-2 text-[12px] text-zinc-500">
              Sort by:
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as string)}>
                <SelectTrigger className="h-8 w-[150px] rounded-lg border-white/[0.08] bg-white/[0.03] text-[12px] text-zinc-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 grid gap-4">
            {isLoading ? (
              <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center text-[13px] text-zinc-500">
                Loading jobs…
              </p>
            ) : pageJobs.length === 0 ? (
              <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center text-[13px] text-zinc-500">
                No jobs found.
              </p>
            ) : (
              pageJobs.map((job) => (
                <article
                  key={job._id}
                  className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.06] text-[15px] font-medium text-zinc-300">
                    {job.companyName.charAt(0).toUpperCase() || "?"}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-medium text-white">
                      <Link
                        href={`/jobs/${job._id}`}
                        className="transition-colors hover:text-zinc-300"
                      >
                        {job.jobTitle}
                      </Link>
                    </h3>
                    <p className="mt-1 text-[13px] text-zinc-400">
                      {job.companyName} • {job.jobLocation}
                      {job.remoteWorkAllowed ? " (Remote)" : ""}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className={pillClasses}>
                        <Banknote aria-hidden className="size-3.5 text-zinc-400" />
                        {formatCompensation(job)}
                      </span>
                      <span className={pillClasses}>
                        <Clock aria-hidden className="size-3.5 text-zinc-400" />
                        {job.jobType}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={`Save ${job.jobTitle}`}
                    className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
                  >
                    <Bookmark className="size-4" />
                  </button>
                </article>
              ))
            )}
          </div>

          {totalPages > 1 ? (
            <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-1.5">
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex size-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06]"
              >
                <ChevronLeft className="size-4" />
              </button>
              {pages.map((p, i) =>
                p === "…" ? (
                  <span key={`ellipsis-${i}`} className="px-1 text-[13px] text-zinc-600">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    aria-current={page === p ? "page" : undefined}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-lg text-[13px] transition-colors",
                      page === p
                        ? "bg-white font-medium text-zinc-900"
                        : "text-zinc-400 hover:bg-white/[0.06]",
                    )}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                type="button"
                aria-label="Next page"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex size-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06]"
              >
                <ChevronRight className="size-4" />
              </button>
            </nav>
          ) : null}
        </main>
      </div>
    </div>
  )
}
