import type { Metadata } from "next"
import Link from "next/link"

import { AuthCard } from "@/components/auth/auth-card"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up – HireLoop",
  description:
    "Create a free HireLoop account and connect with world-class companies.",
}

export default function SignUpPage() {
  return (
    <AuthCard
      label="Get started"
      title="Create your account"
      description="Join thousands of job seekers finding their dream roles."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-white transition-colors hover:text-brand"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthCard>
  )
}
