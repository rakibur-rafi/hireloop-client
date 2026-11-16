"use client"

import Image from "next/image"

import google from "@/app/images/logos/google.png"
import { Button } from "@/components/ui/button"
import { FieldSeparator } from "@/components/ui/field"
import { authClient } from "@/lib/auth-client"
import { toast } from "../ui/toast"

const providers = [
  { name: "Google", logo: google },
]

export function SocialButtons({ context }: { context: string }) {
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
    provider: "google",
    });
  }
  
  return (
    <>
      <FieldSeparator className="-my-1 [&>span]:bg-[#151518]">
        or continue with
      </FieldSeparator>
      <div className="flex flex-col gap-3">
        {providers.map((provider) => (
          <Button
            key={provider.name}
            type="button"
            variant="outline"
            className="h-11 rounded-lg border-white/[0.08] bg-white/[0.03] text-[13px] text-zinc-200 hover:bg-white/[0.07] hover:text-white"
            onClick={handleGoogleLogin}
          >
            <Image src={provider.logo} alt="" className="size-4! object-contain" />
            {provider.name}
          </Button>
        ))}
      </div>
    </>
  )
}
