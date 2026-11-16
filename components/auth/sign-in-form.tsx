"use client"

import { useState, type FormEvent } from "react"

import { AuthInput, PasswordInput } from "@/components/auth/auth-input"
import { SocialButtons } from "@/components/auth/social-buttons"
import { validateEmail } from "@/components/auth/validation"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { authClient } from "@/lib/auth-client"
import { toast } from "../ui/toast"
import { redirect } from "next/navigation"

export function SignInForm() {
  const {
      data: session,
      isPending,
    } = authClient.useSession()
  
  if(session) {
    redirect("/")
  }
  const [email, setEmail] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  function handleEmailChange(value: string) {
    setEmail(value)
    if (emailTouched) {
      setEmailError(validateEmail(value))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const userData = Object.fromEntries(new FormData(event.currentTarget)) as {
      email: string
      password: string
    }

    const emailResult = validateEmail(email)
    const password = String(userData.password ?? "")
    const passwordResult = password
      ? null
      : "Password is required."

    setEmailTouched(true)
    setEmailError(emailResult)
    setPasswordError(passwordResult)

    if (emailResult || passwordResult) {
      return
    }

    const { data, error } = await authClient.signIn.email({
      ...userData,
    });
     if(data) { 
      toast.add({
        title: "Signed in.",
        description: "You can now apply for jobs.",
        type: "success",
      })
    }

    if (error) {
      toast.add({
        title: "Error",
        description: error.message,
        type: "error",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup className="gap-5">
        <Field data-invalid={emailError ? true : undefined} className="gap-2">
          <FieldLabel htmlFor="email" className="text-zinc-300">
            Email
          </FieldLabel>
          <AuthInput
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            aria-invalid={emailError ? true : undefined}
            onChange={(event) => handleEmailChange(event.target.value)}
            onBlur={() => {
              setEmailTouched(true)
              setEmailError(validateEmail(email))
            }}
          />
          {emailError ? <FieldError>{emailError}</FieldError> : null}
        </Field>

        <Field data-invalid={passwordError ? true : undefined} className="gap-2">
          <FieldLabel htmlFor="password" className="text-zinc-300">
            Password
          </FieldLabel>
          <PasswordInput
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            autoComplete="current-password"
            aria-invalid={passwordError ? true : undefined}
          />
          {passwordError ? <FieldError>{passwordError}</FieldError> : null}
        </Field>

        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-brand text-sm text-white hover:bg-brand-hover"
        >
          Sign In
        </Button>

        <SocialButtons context="sign-in" />
      </FieldGroup>
    </form>
  )
}
