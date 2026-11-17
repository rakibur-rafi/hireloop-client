"use client"

import {
  Briefcase,
  Brush,
  Code2,
  Eye,
  Headset,
  Layers,
  MapPin,
  Megaphone,
  Pencil,
  Plus,
  Scale,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState, type ComponentType } from "react"

import { getJobs } from "@/lib/api/jobs"
import { deleteJob } from "@/lib/actions/jobs"
import { JobViewDialog } from "@/components/dashboard/job-view-dialog"
import {
  JobUpdateDialog,
  type JobRecord,
} from "@/components/dashboard/job-update-dialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/toast"
import { formatCompensation, formatDeadline } from "@/lib/format"
import { cn } from "@/lib/utils"

const CATEGORY_META: Record<string, { icon: ComponentType<{ className?: string; strokeWidth?: number }>; className: string }> = {
  "Engineering & Tech": { icon: Code2, className: "text-sky-400" },
  "Design & Creative": { icon: Brush, className: "text-orange-400" },
  "Product & Management": { icon: Layers, className: "text-violet-400" },
  "Marketing & Growth": { icon: Megaphone, className: "text-pink-400" },
  "Sales & Business": { icon: TrendingUp, className: "text-emerald-400" },
  "Customer Support": { icon: Headset, className: "text-cyan-400" },
  "Finance & Legal": { icon: Scale, className: "text-amber-400" },
  "HR & Recruiting": { icon: Users, className: "text-indigo-400" },
}

const headClasses =
  "h-11 px-4 font-mono text-[10px] font-medium tracking-[0.08em] text-zinc-500 uppercase"
const cellClasses = "px-4 py-3.5"

export function ManageJobs() {
  const [jobs, setJobs] = useState<JobRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updateTarget, setUpdateTarget] = useState<JobRecord | null>(null)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [viewTarget, setViewTarget] = useState<JobRecord | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  // bumped on every open so the edit form remounts with fresh prefill
  const [updateKey, setUpdateKey] = useState(0)

  function loadJobs() {
    getJobs()
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
    loadJobs()
  }, [])

  function handleUpdate(job: JobRecord) {
    setUpdateTarget(job)
    setUpdateKey((k) => k + 1)
    setUpdateOpen(true)
  }

  function handleView(job: JobRecord) {
    setViewTarget(job)
    setViewOpen(true)
  }

  async function handleDelete(job: JobRecord) {
    const res = await deleteJob(job._id)
    if (!res.ok) {
      toast.add({
        title: "Error",
        description: `Could not delete the job (HTTP ${res.status}).`,
        type: "error",
      })
      return
    }

    setJobs((prev) => prev.filter((entry) => entry._id !== job._id))
    toast.add({
      title: "Job deleted.",
      description: `"${job.jobTitle}" was removed from your listings.`,
      type: "success",
    })
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[11px] tracking-wide text-zinc-500"
          >
            <span>Manage Jobs</span>
            <span className="mx-1.5 text-zinc-600">&gt;</span>
            <span className="text-zinc-300">Job Listings &amp; Postings</span>
          </nav>
          <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
            Manage Job Posts
          </h1>
          <p className="mt-1.5 text-[13px] text-zinc-500">
            Review live listings and update job details across your
            organization.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/jobs/new" />}
          className="h-9 gap-1.5 rounded-lg bg-brand px-3.5 text-[13px] font-medium text-white hover:bg-brand-hover"
        >
          <Plus data-icon="inline-start" />
          New Job Post
        </Button>
      </header>

      {isLoading ? (
        <p className="mt-7 text-sm text-zinc-500">Loading job posts…</p>
      ) : jobs.length === 0 ? (
        <div className="mt-7 rounded-xl border border-white/[0.06] bg-panel px-6 py-16 text-center">
          <p className="text-sm text-zinc-400">No job posts yet.</p>
          <Link
            href="/dashboard/recruiter/jobs/new"
            className="mt-2 inline-block text-[13px] text-brand hover:text-brand-hover"
          >
            Create your first listing →
          </Link>
        </div>
      ) : (
        <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.06] bg-panel">
          <Table>
            <TableHeader>
              <TableRow className="border-white/[0.06] hover:bg-transparent">
                <TableHead className={cn(headClasses, "pl-5")}>
                  Job Title &amp; Dept
                </TableHead>
                <TableHead className={headClasses}>Company &amp; Location</TableHead>
                <TableHead className={headClasses}>Type</TableHead>
                <TableHead className={headClasses}>Compensation</TableHead>
                <TableHead className={headClasses}>Status</TableHead>
                <TableHead className={headClasses}>Deadline</TableHead>
                <TableHead className={cn(headClasses, "pr-5 text-right")}>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => {
                const meta =
                  CATEGORY_META[job.jobCategory] ?? {
                    icon: Briefcase,
                    className: "text-zinc-400",
                  }
                const initial = job.companyName.charAt(0).toUpperCase()
                return (
                  <TableRow
                    key={job._id}
                    className="border-white/[0.04] hover:bg-white/[0.02]"
                  >
                    <TableCell className={cn(cellClasses, "pl-5")}>
                      <div className="flex items-center gap-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03]">
                          <meta.icon
                            className={cn("size-4", meta.className)}
                            strokeWidth={1.75}
                          />
                        </span>
                        <div className="grid">
                          <span className="text-[13px] font-medium text-zinc-100">
                            {job.jobTitle}
                          </span>
                          <span
                            className={cn("text-[11px]", meta.className)}
                          >
                            {job.jobCategory}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={cellClasses}>
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[11px] font-semibold text-zinc-300 ring-1 ring-white/[0.08] ring-inset">
                          {initial}
                        </span>
                        <div className="grid">
                          <span className="text-[13px] text-zinc-200">
                            {job.companyName}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                            <MapPin className="size-3" strokeWidth={1.75} />
                            {job.jobLocation || "—"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={cellClasses}>
                      <span className="inline-flex rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-zinc-300 ring-1 ring-white/[0.06] ring-inset">
                        {job.jobType || "—"}
                      </span>
                    </TableCell>
                    <TableCell className={cn(cellClasses, "text-[13px] text-zinc-200")}>
                      {formatCompensation(job)}
                    </TableCell>
                    <TableCell className={cellClasses}>
                      {typeof job.status === "boolean" ? (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 text-[12px]",
                            job.status ? "text-emerald-400" : "text-zinc-500"
                          )}
                        >
                          <span
                            aria-hidden
                            className="size-1.5 rounded-full bg-current"
                          />
                          {job.status ? "Active" : "Inactive"}
                        </span>
                      ) : (
                        <span className="text-[13px] text-zinc-600">—</span>
                      )}
                    </TableCell>
                    <TableCell className={cn(cellClasses, "text-[13px] text-zinc-200")}>
                      {formatDeadline(job.applicationDeadline)}
                    </TableCell>
                    <TableCell className={cn(cellClasses, "pr-5")}>
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          type="button"
                          onClick={() => handleUpdate(job)}
                          className="h-7 gap-1.5 rounded-md bg-brand px-2.5 text-xs font-medium text-white hover:bg-brand-hover"
                        >
                          <Pencil />
                          Update
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          aria-label={`View ${job.jobTitle}`}
                          onClick={() => handleView(job)}
                          className="size-7 rounded-md border-white/10 bg-white/[0.03] p-0 text-zinc-400 hover:bg-white/[0.07] hover:text-white"
                        >
                          <Eye />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          aria-label={`Delete ${job.jobTitle}`}
                          onClick={() => handleDelete(job)}
                          className="size-7 rounded-md border-white/10 bg-white/[0.03] p-0 text-zinc-400 hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {updateTarget ? (
        <JobUpdateDialog
          key={updateKey}
          job={updateTarget}
          open={updateOpen}
          onOpenChange={setUpdateOpen}
          onSaved={loadJobs}
        />
      ) : null}
      {viewTarget ? (
        <JobViewDialog
          key={viewTarget._id}
          job={viewTarget}
          open={viewOpen}
          onOpenChange={setViewOpen}
        />
      ) : null}
    </div>
  )
}
