"use client"

import { useState, type FormEvent } from "react"

import { AuthInput, PasswordInput } from "@/components/auth/auth-input"
import { SocialButtons } from "@/components/auth/social-buttons"
import { validateEmail } from "@/components/auth/validation"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { authClient } from "@/lib/auth-client"
import { toast } from "@/components/ui/toast"
import { redirect } from "next/navigation"

export function SignUpForm() {
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
      name: string
      email: string
      password: string
    }

    const emailResult = validateEmail(email)
    const password = String(userData.password ?? "")
    const passwordResult =
      password.length < 8 ? "Password must be at least 8 characters." : null

    setEmailTouched(true)
    setEmailError(emailResult)
    setPasswordError(passwordResult)

    if (emailResult || passwordResult) {
      return
    }

    const { data, error } = await authClient.signUp.email({
        ...userData,
    });

    if(data) { 
      toast.add({
        title: "Account created.",
        description: "You can now sign in.",
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
        <Field className="gap-2">
          <FieldLabel htmlFor="name" className="text-zinc-300">
            Full name
          </FieldLabel>
          <AuthInput
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </Field>

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
            minLength={8}
            placeholder="Create a password"
            autoComplete="new-password"
            aria-invalid={passwordError ? true : undefined}
          />
          {passwordError ? (
            <FieldError>{passwordError}</FieldError>
          ) : (
            <FieldDescription className="text-zinc-500">
              Must be at least 8 characters.
            </FieldDescription>
          )}
        </Field>

        <Button
          type="submit"
          className="h-11 w-full rounded-lg bg-brand text-sm text-white hover:bg-brand-hover"
        >
          Create Account
        </Button>

        <SocialButtons context="sign-up" />
      </FieldGroup>
    </form>
  )
}
