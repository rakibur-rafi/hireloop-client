const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: string): string | null {
  if (!value.trim()) {
    return "Email is required."
  }

  return EMAIL_PATTERN.test(value.trim())
    ? null
    : "Enter a valid email address."
}
