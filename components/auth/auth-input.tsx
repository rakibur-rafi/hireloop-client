"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const authInputClasses =
  "h-11 rounded-lg border-white/[0.08] bg-[#0d0d12] text-zinc-100 placeholder:text-zinc-600 focus-visible:border-brand/60 focus-visible:ring-brand/25 dark:bg-[#0d0d12]"

export function AuthInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return <Input className={cn(authInputClasses, className)} {...props} />
}

export function PasswordInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <AuthInput
        type={visible ? "text" : "password"}
        className={cn("pr-11", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onClick={() => setVisible((value) => !value)}
        className="absolute top-1/2 right-1.5 size-7 -translate-y-1/2 rounded-md text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
      >
        {visible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  )
}
