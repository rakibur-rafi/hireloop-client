"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { JobRecord } from "@/components/dashboard/job-update-dialog"
import { formatCompensation, formatDeadline } from "@/lib/format"

function Detail({
  label,
  value,
  wide,
}: {
  label: string
  value: string
  wide?: boolean
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="font-mono text-[10px] tracking-[0.08em] text-zinc-500 uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-[13px] leading-relaxed whitespace-pre-line text-zinc-200">
        {value || "—"}
      </dd>
    </div>
  )
}

export function JobViewDialog({
  job,
  open,
  onOpenChange,
}: {
  job: JobRecord
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-base text-white">
            {job.jobTitle}
          </DialogTitle>
          <DialogDescription className="text-[13px]">
            {job.jobCategory} · {job.jobType}
          </DialogDescription>
        </DialogHeader>

        <dl className="grid gap-4 sm:grid-cols-2">
          <Detail label="Company" value={job.companyName} />
          <Detail label="Location" value={job.jobLocation} />
          <Detail
            label="Remote Work"
            value={job.remoteWorkAllowed ? "Allowed" : "Not allowed"}
          />
          <Detail
            label="Compensation"
            value={formatCompensation(job)}
          />
          <Detail
            label="Application Deadline"
            value={formatDeadline(job.applicationDeadline)}
          />
          <Detail label="Salary Frequency" value={job.salaryFrequency} />
          <Detail label="Min Salary / Rate" value={`€${job.minSalary || "—"}`} />
          <Detail label="Max Salary / Rate" value={`€${job.maxSalary || "—"}`} />
          <Detail label="Key Responsibilities" value={job.responsibilities} wide />
          <Detail
            label="Qualifications & Requirements"
            value={job.qualifications}
            wide
          />
        </dl>
      </DialogContent>
    </Dialog>
  )
}
