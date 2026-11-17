import { authClient } from "../auth-client"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const getJobs = async (query= "") => {
    const res = await fetch(`${BASE_URL}/jobs?${query}`)
    return res.json()
}

export const getJob = async (id: string) => {
    const res = await fetch(`${BASE_URL}/jobs/${id}`)
    return res.json()
}

export const getJobById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/jobs/${id}`)
    return res.json()
}

export const getJobsByUser = async () => {
    const { data: session } = await authClient.getSession()
    const res = await fetch(`${BASE_URL}/jobs/users/${session?.user.email}`)
    return res.json()
}
