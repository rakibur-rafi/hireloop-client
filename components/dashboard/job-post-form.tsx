"use client"

import { ArrowRight, Building2, Globe, MapPin } from "lucide-react"
import Link from "next/link"
import { useState, type FormEvent, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { createJob, type JobFormData } from "@/lib/actions/jobs"

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Marketing & Growth",
  "Sales & Business",
  "Customer Support",
  "Finance & Legal",
  "HR & Recruiting",
]

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

const SALARY_FREQUENCIES = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
]

const inputClasses =
  "h-10 rounded-lg border-white/[0.07] bg-white/[0.04] px-3 text-[13px] text-zinc-100 placeholder:text-zinc-600 focus-visible:border-brand/60 focus-visible:ring-brand/25 dark:bg-white/[0.04]"

const textareaClasses =
  "min-h-28 rounded-lg border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-[13px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus-visible:border-brand/60 focus-visible:ring-brand/25 dark:bg-white/[0.04]"

const labelClasses = "text-[13px] font-normal text-zinc-300"

const requiredMark = <span className="text-zinc-500">*</span>

function Section({
  index,
  title,
  children,
}: {
  index: number
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-xl border border-white/[0.06] bg-panel p-5 sm:p-6">
      <header className="flex items-center gap-2.5">
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand" />
        <h2 className="text-sm font-medium text-zinc-100">
          {index}. {title}
        </h2>
        <span aria-hidden className="ml-1 h-px flex-1 bg-white/[0.05]" />
      </header>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  )
}

export function JobPostForm() {
  const [jobType, setJobType] = useState("Full-time")
  const [jobCategory, setJobCategory] = useState(JOB_CATEGORIES[0])
  const [salaryFrequency, setSalaryFrequency] = useState(SALARY_FREQUENCIES[0])
  const [remoteAllowed, setRemoteAllowed] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))

    const jobData: JobFormData = {
      jobTitle: String(formData.jobTitle ?? ""),
      companyName: String(formData.companyName ?? ""),
      jobCategory,
      jobType,
      remoteWorkAllowed: remoteAllowed,
      jobLocation: String(formData.jobLocation ?? ""),
      applicationDeadline: String(formData.applicationDeadline ?? ""),
      minSalary: String(formData.minSalary ?? ""),
      maxSalary: String(formData.maxSalary ?? ""),
      salaryFrequency,
      responsibilities: String(formData.responsibilities ?? ""),
      qualifications: String(formData.qualifications ?? ""),
    }

    const result = await createJob(jobData)

    console.log(result)
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
        <Section index={1} title="Basic Information">
          <Field className="gap-2">
            <FieldLabel htmlFor="jobTitle" className={labelClasses}>
              Job Title {requiredMark}
            </FieldLabel>
            <Input
              id="jobTitle"
              name="jobTitle"
              required
              placeholder="Frontend Developer"
              className={inputClasses}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field className="gap-2">
              <FieldLabel htmlFor="companyName" className={labelClasses}>
                Company Name {requiredMark}
              </FieldLabel>
              <div className="relative">
                <Building2
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
                  strokeWidth={1.75}
                />
                <Input
                  id="companyName"
                  name="companyName"
                  required
                  placeholder="HirePulse Network"
                  className={cn(inputClasses, "pl-9")}
                />
              </div>
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="jobCategory" className={labelClasses}>
                Job Category {requiredMark}
              </FieldLabel>
              <Select
                value={jobCategory}
                onValueChange={(value) => setJobCategory(value as string)}
              >
                <SelectTrigger
                  id="jobCategory"
                  className={cn(inputClasses, "w-full justify-between")}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field className="gap-2">
            <FieldLabel className={labelClasses}>
              Job Type {requiredMark}
            </FieldLabel>
            <RadioGroup
              name="jobType"
              value={jobType}
              onValueChange={(value) => setJobType(value as string)}
              className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
            >
              {JOB_TYPES.map((type) => (
                <label
                  key={type}
                  className="flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.04] text-[13px] text-zinc-400 transition-colors hover:border-white/15 has-data-checked:border-brand/60 has-data-checked:bg-brand/10 has-data-checked:text-white has-[button:focus-visible]:ring-3 has-[button:focus-visible]:ring-ring/50"
                >
                  <RadioGroupItem
                    value={type}
                    aria-label={type}
                    className="sr-only"
                  />
                  {type}
                </label>
              ))}
            </RadioGroup>
          </Field>
        </Section>

        <Section index={2} title="Location, Compensation & Timeline">
          <div className="flex items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                <Globe className="size-4 text-zinc-300" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[13px] text-zinc-200">
                  Remote Work Allowed{" "}
                  <span className="text-zinc-500">(Optional)</span>
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Enable worldwide or distributed candidate applications.
                </p>
              </div>
            </div>
            <Switch
              checked={remoteAllowed}
              onCheckedChange={setRemoteAllowed}
              aria-label="Remote work allowed"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field className="gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <FieldLabel htmlFor="jobLocation" className={labelClasses}>
                  Job Location
                </FieldLabel>
                <span className="text-[11px] text-zinc-500">Required</span>
              </div>
              <div className="relative">
                <MapPin
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
                  strokeWidth={1.75}
                />
                <Input
                  id="jobLocation"
                  name="jobLocation"
                  placeholder="New York, USA"
                  className={cn(inputClasses, "pl-9")}
                />
              </div>
            </Field>

            <Field className="gap-2">
              <FieldLabel
                htmlFor="applicationDeadline"
                className={labelClasses}
              >
                Application Deadline
              </FieldLabel>
              <Input
                id="applicationDeadline"
                name="applicationDeadline"
                type="date"
                className={cn(inputClasses, "[color-scheme:dark]")}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field className="gap-2">
              <FieldLabel htmlFor="minSalary" className={labelClasses}>
                Min Salary / Rate
              </FieldLabel>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[13px] text-zinc-500">
                  €
                </span>
                <Input
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  min={0}
                  placeholder="25"
                  className={cn(inputClasses, "pl-8")}
                />
              </div>
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="maxSalary" className={labelClasses}>
                Max Salary / Rate
              </FieldLabel>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[13px] text-zinc-500">
                  €
                </span>
                <Input
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  min={0}
                  placeholder="40"
                  className={cn(inputClasses, "pl-8")}
                />
              </div>
            </Field>

            <Field className="gap-2 sm:col-start-2">
              <FieldLabel htmlFor="salaryFrequency" className={labelClasses}>
                Frequency
              </FieldLabel>
              <Select
                value={salaryFrequency}
                onValueChange={(value) => setSalaryFrequency(value as string)}
              >
                <SelectTrigger
                  id="salaryFrequency"
                  className={cn(inputClasses, "w-full justify-between")}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SALARY_FREQUENCIES.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </Section>

        <Section index={3} title="Responsibilities & Requirements">
          <Field className="gap-2">
            <FieldLabel htmlFor="responsibilities" className={labelClasses}>
              Key Responsibilities {requiredMark}
            </FieldLabel>
            <Textarea
              id="responsibilities"
              name="responsibilities"
              required
              className={textareaClasses}
              placeholder={
                "• Showcase your commitment to delivering exceptional user interfaces and digital experiences\n• Collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products"
              }
            />
          </Field>

          <Field className="gap-2">
            <FieldLabel htmlFor="qualifications" className={labelClasses}>
              Qualifications & Requirements {requiredMark}
            </FieldLabel>
            <Textarea
              id="qualifications"
              name="qualifications"
              required
              className={textareaClasses}
              placeholder={
                "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
              }
            />
          </Field>
        </Section>
      </form>
    </div>
  )
}
