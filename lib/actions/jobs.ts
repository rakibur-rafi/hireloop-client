import type { JobFormData } from "@/lib/data/jobData"

export type { JobFormData }

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createJob = async (data: JobFormData) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res
}

export const updateJob = async (id: string, data: JobFormData) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res
}

export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: 'DELETE',
  })
  return res
}