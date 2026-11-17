import type { JobFormData } from "@/lib/data/jobData"

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

const FREQUENCY_UNITS: Record<string, string> = {
  hour: "hr",
  day: "day",
  week: "wk",
  month: "mo",
  year: "yr",
}

/** "2026-12-30" → "Dec 30, 2026" (deterministic, SSR-safe). */
export function formatDeadline(value: string): string {
  if (!value) return "—"
  const [year, month, day] = value.split("-").map(Number)
  if (!year || !month || !day) return value
  return `${MONTHS[month - 1]} ${day}, ${year}`
}

/** 25 → "€25", 90000 → "€90k"; empty/invalid → "—". */
function formatSalaryPart(value: string): string {
  if (!value) return "—"
  const n = Number(value)
  if (Number.isNaN(n)) return `€${value}`
  return n >= 1000 ? `€${n / 1000}k` : `€${n}`
}

/** "€25 – €40 / hr" style compensation label from JobFormData fields. */
export function formatCompensation(
  job: Pick<JobFormData, "minSalary" | "maxSalary" | "salaryFrequency">,
): string {
  const min = formatSalaryPart(job.minSalary)
  const max = formatSalaryPart(job.maxSalary)
  if (min === "—" && max === "—") return "—"
  const unit = FREQUENCY_UNITS[job.salaryFrequency.replace(/^per /, "")] ?? job.salaryFrequency
  return `${min} – ${max} / ${unit}`
}
