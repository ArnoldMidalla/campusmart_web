"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CornerUpLeft } from "lucide-react";
import Button from "@/app/components/Button";
import Image from "next/image";

export default function SellerWelcomePage() {
  const router = useRouter();

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-medium tracking-tighter">
      <main className="flex flex-col max-w-md w-full justify-start pt-8 pb-12 overflow-y-auto">
        <section className="flex flex-col px-6 mt-6 w-full">
          <button
            onClick={() => router.back()}
            className="size-8 bg-white rounded-full border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition shrink-0 mb-4"
          >
            <CornerUpLeft size={18} />
          </button>

          <div className="h-56 relative mb-8">
            <Image src="/login.png" alt="" fill className="object-contain" />
          </div>
          <h1 className="text-[28px] leading-[1.1] font-bold text-black mb-6">
            Gets you back in.
          </h1>

          <div className="mb-8">
            <Button href="/onboarding/sellers/sign-in" outerRing roleType="seller">
              Sign in with email/number
            </Button>
          </div>

          <p className="text-neutral-600 text-[12.5px] text-center mb-6 tracking-tight">
            Or use a social account to sign in quickly.
          </p>

          <div className="flex flex-col justify-center gap-4 mb-6">
            <Button variant="secondary" roleType="seller">
              Continue with Google
            </Button>
          </div>

          <p className="text-neutral-600 text-[12.5px] text-center tracking-tight">
            Don&apos;t have an account?{" "}
            <Link href="/onboarding/sellers/sign-up" className="text-[#13368B] hover:underline">
              Create one here
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
