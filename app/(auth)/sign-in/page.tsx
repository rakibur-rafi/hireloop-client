import type { Metadata } from "next"
import Link from "next/link"

import { AuthCard } from "@/components/auth/auth-card"
import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign In – HireLoop",
  description:
    "Sign in to HireLoop to track applications, save jobs and land your next role.",
}

export default function SignInPage() {
  return (
    <AuthCard
      label="Welcome back"
      title="Sign in to HireLoop"
      description="Pick up right where you left off in your job search."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-white transition-colors hover:text-brand"
          >
            Sign up
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthCard>
  )
}
