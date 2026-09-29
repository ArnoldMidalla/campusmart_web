"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CornerUpLeft } from "lucide-react";
import Button from "./Button";
import TermsOverlay from "./TermsOverlay";
import PrivacyPolicyOverlay from "./PrivacyPolicyOverlay";

interface AuthContainerProps {
  roleType: "buyer" | "seller";
  type: "login" | "register";
  title: React.ReactNode;
  children: React.ReactNode;
  onSubmit: () => void;
  loading?: boolean;
}

export default function AuthContainer({
  roleType,
  type,
  title,
  children,
  onSubmit,
  loading = false,
}: AuthContainerProps) {
  const router = useRouter();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const mainTextColor = roleType === "buyer" ? "text-main" : "text-seller-main";

  return (
    <div className="flex flex-col md:px-8 pt-8 pb-12 w-full flex-1">
      <section className="flex flex-col px-6 mt-6 w-full">
        <button
          onClick={() => router.back()}
          className="size-8 bg-white rounded-full border border-neutral-200 flex justify-center items-center shadow-lg hover:bg-neutral-50 transition shrink-0 mb-4"
        >
          <CornerUpLeft size={18} />
        </button>
        
        <h1 className="text-[28px] leading-[1.1] font-bold text-black mb-6">
          {title}
        </h1>

        <div className="flex flex-col gap-4 mb-6">
          {children}
        </div>

        <div className="mb-8">
          <Button 
            onClick={onSubmit} 
            loading={loading} 
            outerRing 
            roleType={roleType}
          >
            {type === "login" ? "Sign in" : "Create an Account"}
          </Button>
        </div>

        {type === "register" ? (
          <p className="text-neutral-600 text-[12.5px] text-center mb-6 tracking-tight">
            By clicking &ldquo;Create an Account&rdquo; you agree with
            <br />
            CampusMart{" "}
            <button
              type="button"
              onClick={() => setIsTermsOpen(true)}
              className={`${mainTextColor} hover:underline font-medium`}
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className={`${mainTextColor} hover:underline font-medium`}
            >
              Privacy Policy
            </button>
          </p>
        ) : (
          <p className="text-neutral-600 text-[12.5px] text-center mb-6 tracking-tight">
            Forgotten your password?{" "}
            <Link href="#" className={`${mainTextColor} hover:underline`}>
              Recover it here
            </Link>
          </p>
        )}

        <div className="flex flex-col justify-center gap-4 mb-6">
          <Button variant="secondary" roleType={roleType}>
            Continue with Google
          </Button>
        </div>

        <p className="text-neutral-600 text-[12.5px] text-center tracking-tight">
          {type === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <Link href={`/onboarding/${roleType}s/sign-up`} className={`${mainTextColor} hover:underline`}>
                Create one here
              </Link>
            </>
          ) : (
            <>
              {roleType === "buyer" ? "You have an account with us? Lovely!" : "Already have an account?"}{" "}
              <Link href={`/onboarding/${roleType}s/sign-in`} className={`${mainTextColor} hover:underline`}>
                Login here
              </Link>
            </>
          )}
        </p>
      </section>

      {type === "register" && (
        <>
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
        </>
      )}
    </div>
  );
}
