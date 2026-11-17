"use client"

import { useState, type FormEvent } from "react"

import {
  JobFormFields,
  type JobFormState,
} from "@/components/dashboard/job-form-fields"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/toast"
import { JobFormData } from "@/lib/data/jobData"
import { updateJob } from "@/lib/actions/jobs"


export type JobRecord = JobFormData & { _id: string }

export function JobUpdateDialog({
  job,
  open,
  onOpenChange,
  onSaved,
}: {
  job: JobRecord
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Called after a successful PATCH — the list can refresh itself. */
  onSaved?: () => void
}) {
  const [state, setState] = useState<JobFormState>({
    jobType: job.jobType,
    jobCategory: job.jobCategory,
    salaryFrequency: job.salaryFrequency,
    remoteAllowed: job.remoteWorkAllowed,
    status: job.status ?? true,
  })

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))

    const jobData: JobFormData = {
      jobTitle: String(formData.jobTitle ?? ""),
      companyName: String(formData.companyName ?? ""),
      jobCategory: state.jobCategory,
      jobType: state.jobType,
      remoteWorkAllowed: state.remoteAllowed,
      jobLocation: String(formData.jobLocation ?? ""),
      applicationDeadline: String(formData.applicationDeadline ?? ""),
      minSalary: String(formData.minSalary ?? ""),
      maxSalary: String(formData.maxSalary ?? ""),
      salaryFrequency: state.salaryFrequency,
      responsibilities: String(formData.responsibilities ?? ""),
      qualifications: String(formData.qualifications ?? ""),
      status: state.status,
      // ownership never changes on edit — keep the original poster
      userName: job.userName,
      userEmail: job.userEmail,
    }

    const res = await updateJob(job._id, jobData)
    if (!res.ok) {
      toast.add({
        title: "Error",
        description: `Could not update the job (HTTP ${res.status}).`,
        type: "error",
      })
      return
    }
    toast.add({
      title: "Job updated.",
      description: `"${jobData.jobTitle}" was saved.`,
      type: "success",
    })
    onSaved?.()
    onOpenChange(false)

  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100svh-2rem)] gap-5 overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-base text-white">
            Update Job Post
          </DialogTitle>
          <DialogDescription className="text-[13px]">
            Edit the listing details for{" "}
            <span className="text-zinc-300">{job.jobTitle}</span> and save your
            changes.
          </DialogDescription>
        </DialogHeader>

        <form
          id="update-job-form"
          onSubmit={handleSubmit}
          noValidate
          className="grid"
        >
          <JobFormFields
            idPrefix="update-job"
            variant="compact"
            defaults={job}
            state={state}
            onStateChange={(patch) =>
              setState((prev) => ({ ...prev, ...patch }))
            }
          />
          <DialogFooter className="mt-6 border-t border-white/[0.06] pt-4">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 rounded-lg border-white/[0.08] bg-white/[0.03] px-4 text-[13px] text-zinc-300 hover:bg-white/[0.07] hover:text-white"
                />
              }
            >
              Cancel
            </DialogClose>
            <Button
              type="submit"
              className="h-9 rounded-lg bg-brand px-4 text-[13px] font-medium text-white hover:bg-brand-hover"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
