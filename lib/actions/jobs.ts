export type JobFormData = {
  jobTitle: string
  companyName: string
  jobCategory: string
  jobType: string
  remoteWorkAllowed: boolean
  jobLocation: string
  applicationDeadline: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  qualifications: string
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createJob = async (data: JobFormData) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return res.json()
}
