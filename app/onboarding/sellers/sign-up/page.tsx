"use client";

import { User, Mail, Phone, CreditCard, Lock, CornerUpLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormInput from "@/app/components/FormInput";
import Button from "@/app/components/Button";
import TermsOverlay from "@/app/components/TermsOverlay";
import PrivacyPolicyOverlay from "@/app/components/PrivacyPolicyOverlay";

export default function SellerSignUpPage() {
  const router = useRouter();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

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
          <h1 className="text-[28px] leading-[1.1] font-bold text-black mb-6">
            Start selling on
            <br />
            Campus Mart in seconds.
          </h1>

          <div className="flex flex-col gap-4 mb-6">
            <FormInput icon={User} type="text" placeholder="Store / business name" autoComplete="organization" />
            <FormInput icon={Mail} type="email" placeholder="Personal email address" autoComplete="email" />
            <FormInput icon={Mail} type="email" placeholder="School email address" />
            <FormInput icon={CreditCard} type="text" placeholder="Matric / student ID number" />
            <FormInput icon={Phone} type="tel" placeholder="Phone number" autoComplete="tel" />
            <FormInput icon={Lock} type="password" placeholder="Password" autoComplete="new-password" />
            <FormInput icon={Lock} type="password" placeholder="Confirm password" autoComplete="new-password" />
          </div>

          <div className="mb-8">
            <Button outerRing roleType="seller">Create an Account</Button>
          </div>

          <p className="text-neutral-600 text-[12.5px] text-center mb-6 tracking-tight">
            By clicking &ldquo;Create an Account&rdquo; you agree with
            <br />
            CampusMart{" "}
            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className="text-[#13368B] hover:underline font-medium"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="text-[#13368B] hover:underline font-medium"
            >
              Privacy Policy
            </button>
          </p>

          <div className="flex flex-col justify-center gap-4 mb-6">
            <Button variant="secondary" roleType="seller">
              Continue with Google
            </Button>
          </div>

          <p className="text-neutral-600 text-[12.5px] text-center tracking-tight">
            Already have an account?{" "}
            <Link href="/onboarding/sellers/sign-in" className="text-[#13368B] hover:underline">
              Login here
            </Link>
          </p>
        </section>
      </main>

      <TermsOverlay
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAccept={() => setIsTermsOpen(false)}
      />

      <PrivacyPolicyOverlay
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        onAccept={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
