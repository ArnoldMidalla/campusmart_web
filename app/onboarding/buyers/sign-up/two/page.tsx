"use client";

import { User, Mail, Phone, Lock, CornerUpLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormInput from "@/app/components/FormInput";
import PrimaryButton from "@/app/components/PrimaryButton";

export default function SignUpTwoPage() {
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
            Join your campus
            <br />
            marketplace in seconds.
          </h1>

          <div className="flex flex-col gap-4 mb-6">
            <FormInput icon={User} type="text" placeholder="Username" autoComplete="username" />
            <FormInput icon={Mail} type="email" placeholder="Email address" autoComplete="email" />
            <FormInput icon={Phone} type="tel" placeholder="Phone number" autoComplete="tel" />
            <FormInput icon={Lock} type="password" placeholder="Password" autoComplete="new-password" />
            <FormInput icon={Lock} type="password" placeholder="Confirm password" autoComplete="new-password" />
          </div>

          <div className="mb-8">
            <PrimaryButton>Create an Account</PrimaryButton>
          </div>

          <p className="text-neutral-600 text-[12.5px] text-center mb-6 tracking-tight">
            By clicking &ldquo;Create an Account&rdquo; you agree with
            <br />
            CampusMart{" "}
            <Link href="#" className="text-main hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-main hover:underline">
              Privacy Policy
            </Link>
          </p>

          <div className="flex flex-col justify-center gap-4 mb-6">
            <button className="flex items-center justify-center w-full tracking-tight bg-white text-main py-2.5 border border-main rounded-full font-medium text-[14px] hover:brightness-105 transition-all">
              Continue with Google
            </button>
          </div>

          <p className="text-neutral-600 text-[12.5px] text-center tracking-tight">
            You have an account with us? Lovely!{" "}
            <Link href="/onboarding/buyers/sign-in/two" className="text-main hover:underline">
              Login here
            </Link>
          </p>
          
        </section>
      </main>
    </div>
  );
}
