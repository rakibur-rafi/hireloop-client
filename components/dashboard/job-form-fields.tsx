"use client"

import { Building2, CircleCheck, Globe, MapPin } from "lucide-react"

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
import type { JobFormData } from "@/lib/data/jobData"
import { cn } from "@/lib/utils"

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Marketing & Growth",
  "Sales & Business",
  "Customer Support",
  "Finance & Legal",
  "HR & Recruiting",
]

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

export const SALARY_FREQUENCIES = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
]

/** Values that live in React state because Base UI radios/selects/switches
 * don't submit through FormData. */
export type JobFormState = {
  jobType: string
  jobCategory: string
  salaryFrequency: string
  remoteAllowed: boolean
  status: boolean
}

const inputClasses =
  "h-10 rounded-lg border-white/[0.07] bg-white/[0.04] px-3 text-[13px] text-zinc-100 placeholder:text-zinc-600 focus-visible:border-brand/60 focus-visible:ring-brand/25 dark:bg-white/[0.04]"

const textareaClasses =
  "min-h-24 rounded-lg border-white/[0.07] bg-white/[0.04] px-3 py-2.5 text-[13px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus-visible:border-brand/60 focus-visible:ring-brand/25 dark:bg-white/[0.04]"

const labelClasses = "text-[13px] font-normal text-zinc-300"

const requiredMark = <span className="text-zinc-500">*</span>

export function JobFormFields({
  idPrefix,
  state,
  onStateChange,
  defaults,
  variant = "sections",
}: {
  idPrefix: string
  state: JobFormState
  onStateChange: (patch: Partial<JobFormState>) => void
  defaults?: Partial<JobFormData>
  variant?: "sections" | "compact"
}) {
  const id = (name: string) => `${idPrefix}-${name}`
  const span2 = variant === "compact" ? "sm:col-span-2" : undefined

  const basicFields = (
    <>
      <Field className={cn("gap-2", span2)}>
        <FieldLabel htmlFor={id("jobTitle")} className={labelClasses}>
          Job Title {requiredMark}
        </FieldLabel>
        <Input
          id={id("jobTitle")}
          name="jobTitle"
          required
          placeholder="Frontend Developer"
          defaultValue={defaults?.jobTitle}
          className={inputClasses}
        />
      </Field>

      <Field className="gap-2">
        <FieldLabel htmlFor={id("companyName")} className={labelClasses}>
          Company Name {requiredMark}
        </FieldLabel>
        <div className="relative">
          <Building2
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
            strokeWidth={1.75}
          />
          <Input
            id={id("companyName")}
            name="companyName"
            required
            placeholder="HirePulse Network"
            defaultValue={defaults?.companyName}
            className={cn(inputClasses, "pl-9")}
          />
        </div>
      </Field>

      <Field className="gap-2">
        <FieldLabel htmlFor={id("jobCategory")} className={labelClasses}>
          Job Category {requiredMark}
        </FieldLabel>
        <Select
          value={state.jobCategory}
          onValueChange={(value) => onStateChange({ jobCategory: value as string })}
        >
          <SelectTrigger
            id={id("jobCategory")}
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

      <Field className={cn("gap-2", span2)}>
        <FieldLabel className={labelClasses}>
          Job Type {requiredMark}
        </FieldLabel>
        <RadioGroup
          name="jobType"
          value={state.jobType}
          onValueChange={(value) => onStateChange({ jobType: value as string })}
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
    </>
  )

  const locationFields = (
    <>
      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-white/[0.03] p-4",
          span2,
        )}
      >
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
          checked={state.remoteAllowed}
          onCheckedChange={(checked) => onStateChange({ remoteAllowed: checked })}
          aria-label="Remote work allowed"
        />
      </div>

      <div
        className={cn(
          "flex items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-white/[0.03] p-4",
          span2,
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
            <CircleCheck className="size-4 text-zinc-300" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-[13px] text-zinc-200">
              Status <span className="text-zinc-500">({state.status ? "Active" : "Inactive"})</span>
            </p>
            <p className="mt-0.5 text-[11px] text-zinc-500">
              Active listings accept candidate applications.
            </p>
          </div>
        </div>
        <Switch
          checked={state.status}
          onCheckedChange={(checked) => onStateChange({ status: checked })}
          aria-label="Job status"
        />
      </div>

      <Field className="gap-2">
        <FieldLabel htmlFor={id("jobLocation")} className={labelClasses}>
          Job Location
        </FieldLabel>
        <div className="relative">
          <MapPin
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500"
            strokeWidth={1.75}
          />
          <Input
            id={id("jobLocation")}
            name="jobLocation"
            placeholder="New York, USA"
            defaultValue={defaults?.jobLocation}
            className={cn(inputClasses, "pl-9")}
          />
        </div>
      </Field>

      <Field className="gap-2">
        <FieldLabel htmlFor={id("applicationDeadline")} className={labelClasses}>
          Application Deadline
        </FieldLabel>
        <Input
          id={id("applicationDeadline")}
          name="applicationDeadline"
          type="date"
          defaultValue={defaults?.applicationDeadline}
          className={cn(inputClasses, "[color-scheme:dark]")}
        />
      </Field>

      <Field className="gap-2">
        <FieldLabel htmlFor={id("minSalary")} className={labelClasses}>
          Min Salary / Rate
        </FieldLabel>
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[13px] text-zinc-500">
            €
          </span>
          <Input
            id={id("minSalary")}
            name="minSalary"
            type="number"
            min={0}
            placeholder="25"
            defaultValue={defaults?.minSalary}
            className={cn(inputClasses, "pl-8")}
          />
        </div>
      </Field>

      <Field className="gap-2">
        <FieldLabel htmlFor={id("maxSalary")} className={labelClasses}>
          Max Salary / Rate
        </FieldLabel>
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[13px] text-zinc-500">
            €
          </span>
          <Input
            id={id("maxSalary")}
            name="maxSalary"
            type="number"
            min={0}
            placeholder="40"
            defaultValue={defaults?.maxSalary}
            className={cn(inputClasses, "pl-8")}
          />
        </div>
      </Field>

      <Field className={cn("gap-2", variant === "compact" && "sm:col-start-2")}>
        <FieldLabel htmlFor={id("salaryFrequency")} className={labelClasses}>
          Frequency
        </FieldLabel>
        <Select
          value={state.salaryFrequency}
          onValueChange={(value) => onStateChange({ salaryFrequency: value as string })}
        >
          <SelectTrigger
            id={id("salaryFrequency")}
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
    </>
  )

  const requirementFields = (
    <>
      <Field className={cn("gap-2", span2)}>
        <FieldLabel htmlFor={id("responsibilities")} className={labelClasses}>
          Key Responsibilities {requiredMark}
        </FieldLabel>
        <Textarea
          id={id("responsibilities")}
          name="responsibilities"
          required
          defaultValue={defaults?.responsibilities}
          className={textareaClasses}
          placeholder={
            "• Showcase your commitment to delivering exceptional user interfaces and digital experiences\n• Collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products"
          }
        />
      </Field>

      <Field className={cn("gap-2", span2)}>
        <FieldLabel htmlFor={id("qualifications")} className={labelClasses}>
          Qualifications & Requirements {requiredMark}
        </FieldLabel>
        <Textarea
          id={id("qualifications")}
          name="qualifications"
          required
          defaultValue={defaults?.qualifications}
          className={textareaClasses}
          placeholder={
            "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
          }
        />
      </Field>
    </>
  )

  if (variant === "compact") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {basicFields}
        {locationFields}
        {requirementFields}
      </div>
    )
  }

  return (
    <div className="grid gap-5">
      <Section index={1} title="Basic Information">
        {basicFields}
      </Section>
      <Section index={2} title="Location, Compensation & Timeline">
        {locationFields}
      </Section>
      <Section index={3} title="Responsibilities & Requirements">
        {requirementFields}
      </Section>
    </div>
  )
}

function Section({
  index,
  title,
  children,
}: {
  index: number
  title: string
  children: React.ReactNode
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
