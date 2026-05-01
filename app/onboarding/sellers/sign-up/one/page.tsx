"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CornerUpLeft } from "lucide-react";
import PrimaryButton from "@/app/components/PrimaryButton";

export default function SellerSignUpOnePage() {
  const router = useRouter();

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-satoshi font-medium tracking-tighter">
      <main className="flex flex-col max-w-md w-full justify-start pt-8 pb-12 overflow-y-auto">
        <section className="flex flex-col px-6 mt-6 w-full">
          <button
            onClick={() => router.back()}
            className="size-8 bg-white rounded-full border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition shrink-0 mb-4"
          >
            <CornerUpLeft size={18} />
          </button>
          <h1 className="text-[28px] leading-[1.1] font-bold text-black mb-6">
            Start selling on
            <br />
            Campus Mart in seconds.
          </h1>

          <div className="mb-8">
            <PrimaryButton href="/onboarding/sellers/sign-up/two" variant="seller">
              Sign up with email/number
            </PrimaryButton>
          </div>

          <p className="text-neutral-600 text-[12.5px] text-center mb-6 tracking-tight">
            Or use a social account to get started quickly.
          </p>

          <div className="flex flex-col justify-center gap-4 mb-6">
            <button className="flex items-center justify-center w-full tracking-tight bg-white text-[#13368B] py-2.5 border border-[#13368B] rounded-full font-medium text-[14px] hover:brightness-105 transition-all">
              Continue with Google
            </button>
          </div>

          <p className="text-neutral-600 text-[12.5px] text-center tracking-tight">
            Already have an account?{" "}
            <Link href="/onboarding/sellers/sign-in/one" className="text-[#13368B] hover:underline">
              Login here
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
