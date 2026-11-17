"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, type FormEvent } from "react"

import {
  JobFormFields,
  JOB_CATEGORIES,
  type JobFormState,
} from "@/components/dashboard/job-form-fields"
import { Button } from "@/components/ui/button"
import { createJob } from "@/lib/actions/jobs"
import type { JobFormData } from "@/lib/data/jobData"
import { toast } from "../ui/toast"
import { redirect } from "next/navigation"

export function JobPostForm() {
  const [state, setState] = useState<JobFormState>({
    jobType: "Full-time",
    jobCategory: JOB_CATEGORIES[0],
    salaryFrequency: "per hour",
    remoteAllowed: false,
    status: true,
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
    }

    const result = await createJob(jobData)

    if (result.ok) {
      toast.add({
        title: "Job posted.",
        description: "Your job listing has been created.",
        type: "success",
      })
      redirect("/dashboard/recruiter/jobs")
    } else {
      toast.add({
        title: "Error",
        description: `Could not post the job (HTTP ${result.status}).`,
        type: "error",
      })
    }

  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[11px] tracking-wide text-zinc-500"
          >
            <Link
              href="/dashboard/recruiter/jobs"
              className="transition-colors hover:text-zinc-300"
            >
              Manage Jobs
            </Link>
            <span className="mx-1.5 text-zinc-600">&gt;</span>
            <span className="text-zinc-300">Create New Listing</span>
          </nav>
          <h1 className="mt-2.5 text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
            Post a New Job
          </h1>
          <p className="mt-1.5 text-[13px] text-zinc-500">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>
        <Button
          type="submit"
          form="new-job-form"
          className="h-9 gap-1.5 rounded-lg bg-brand px-4 text-[13px] font-medium text-white hover:bg-brand-hover"
        >
          Publish Job
          <ArrowRight data-icon="inline-end" />
        </Button>
      </header>

      <form
        id="new-job-form"
        onSubmit={handleSubmit}
        noValidate
        className="mt-7 grid gap-5"
      >
        <JobFormFields
          idPrefix="new-job"
          variant="sections"
          state={state}
          onStateChange={(patch) => setState((prev) => ({ ...prev, ...patch }))}
        />
      </form>
    </div>
  )
}
