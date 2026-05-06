"use client";

import { User, Lock, CornerUpLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import FormInput from "@/app/components/FormInput";
import PrimaryButton from "@/app/components/PrimaryButton";

export default function SignInPage() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      if (useAuthStore.getState().user?.role === "BUYER") {
        router.push("/");
      } else if (useAuthStore.getState().user?.role === "SELLER") {
        router.push("/onboarding/sellers/sign-up/one");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

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
            Welcome back!
            <br />
            Log in to continue.
          </h1>

          <div className="flex flex-col gap-4 mb-6">
            <FormInput
              icon={User}
              type="text"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
            <FormInput
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="mb-8">
            <PrimaryButton type="submit" onClick={handleLogin}>
              Sign in
            </PrimaryButton>
          </div>

          <p className="text-neutral-600 text-[12.5px] text-center mb-6 tracking-tight">
            Forgotten your password?{" "}
            <Link href="#" className="text-main hover:underline">
              Recover it here
            </Link>
          </p>

          <div className="flex flex-col justify-center gap-4 mb-6">
            <button className="flex items-center justify-center w-full tracking-tight bg-white text-main py-2.5 border border-main rounded-full font-medium text-[14px] hover:brightness-105 transition-all">
              Continue with Google
            </button>
          </div>

          <p className="text-neutral-600 text-[12.5px] text-center tracking-tight">
            Don&apos;t have an account?{" "}
            <Link href="/onboarding/buyers/sign-up/two" className="text-main hover:underline">
              Create one here
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
