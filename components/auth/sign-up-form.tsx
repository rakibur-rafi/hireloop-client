"use client"

import { Building2, Shield, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

import { AuthInput, PasswordInput } from "@/components/auth/auth-input"
import { SocialButtons } from "@/components/auth/social-buttons"
import { validateEmail } from "@/components/auth/validation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const roleOptions = [
  { value: "seeker", label: "Seeker", icon: User },
  { value: "recruiter", label: "Recruiter", icon: Building2 },
  { value: "admin", label: "Admin", icon: Shield },
]

export function SignUpForm() {
  const router = useRouter()
  const [role, setRole] = useState("seeker")
  const [pending, setPending] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  function handleEmailChange(value: string) {
    setEmail(value)
    // Once the field has been touched, keep the error live as they type
    if (emailTouched) {
      setEmailError(validateEmail(value))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))

    const emailResult = validateEmail(email)
    const password = String(data.password ?? "")
    const passwordResult =
      password.length < 8 ? "Password must be at least 8 characters." : null

    setEmailTouched(true)
    setEmailError(emailResult)
    setPasswordError(passwordResult)

    if (emailResult || passwordResult) {
      return
    }

    setPending(true)
    setFormError(null)
    const { error } = await authClient.signUp.email({
      name: String(data.name ?? ""),
      email: email.trim(),
      password,
      role,
    })
    setPending(false)

    if (error) {
      setFormError(
        error.message ||
          "Something went wrong while creating your account. Please try again."
      )
      toast.add({
        title: "Error",
        description: error.message || "Failed to create your account.",
        type: "error",
      })
      return
    }

    toast.add({
      title: "Account created.",
      description: "Welcome to HireLoop!",
      type: "success",
    })
    router.refresh()
    router.push("/")
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

        <Field className="gap-2">
          <FieldLabel className="text-zinc-300">I am a</FieldLabel>
          <RadioGroup
            name="role"
            value={role}
            onValueChange={(value) => setRole(value as string)}
            className="grid-cols-3 gap-2.5"
          >
            {roleOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 text-center transition-colors has-data-checked:border-brand/60 has-data-checked:bg-brand/10 has-data-checked:[&_svg]:text-brand has-[button:focus-visible]:ring-3 has-[button:focus-visible]:ring-ring/50 hover:border-white/20"
              >
                <RadioGroupItem
                  value={option.value}
                  aria-label={option.label}
                  className="sr-only"
                />
                <option.icon
                  className="size-4.5 text-zinc-400"
                  strokeWidth={1.75}
                />
                <span className="text-xs font-medium text-zinc-300">
                  {option.label}
                </span>
              </label>
            ))}
          </RadioGroup>
        </Field>

        {formError ? <FieldError>{formError}</FieldError> : null}

        <Button
          type="submit"
          disabled={pending}
          className="h-11 w-full rounded-lg bg-brand text-sm text-white hover:bg-brand-hover"
        >
          {pending ? "Creating account…" : "Create Account"}
        </Button>

        <SocialButtons />
      </FieldGroup>
    </form>
  )
}
