"use client";

import PageHeader from "@/app/components/PageHeader";
import { User, Mail, Phone, CreditCard, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function SellerSignUpTwoPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-satoshi font-medium tracking-tighter">
      <main className="flex flex-col max-w-md w-full justify-start pt-8 pb-12 overflow-y-auto">
        <section className="bg-white px-4">
          <PageHeader />
        </section>

        <section className="flex flex-col px-6 mt-12 w-full">
          <h1 className="text-[40px] leading-[1.1] font-bold text-[#1c1c1c] mb-10">
            Start selling
            <br />
            on Campus Mart
            <br />
            in seconds.
          </h1>

          <div className="flex flex-col gap-4">
            {/* Store / Business Name */}
            <div className="relative flex items-center transition-all duration-200 bg-[#f5f5f5] border border-transparent rounded-[18px] px-4 py-4.5 focus-within:bg-white focus-within:border-[#344054] focus-within:border-opacity-40 focus-within:shadow-sm">
              <User className="text-neutral-500 mr-3" size={20} />
              <input
                type="text"
                className="bg-transparent border-none outline-none w-full text-[15px] font-medium text-neutral-800 placeholder-neutral-400"
                placeholder="Store / business name"
              />
            </div>

            {/* Personal Email */}
            <div className="relative flex items-center transition-all duration-200 bg-[#f5f5f5] border border-transparent rounded-[18px] px-4 py-4.5 focus-within:bg-white focus-within:border-[#344054] focus-within:border-opacity-40 focus-within:shadow-sm">
              <Mail className="text-neutral-500 mr-3" size={20} />
              <input
                type="email"
                className="bg-transparent border-none outline-none w-full text-[15px] font-medium text-neutral-800 placeholder-neutral-400"
                placeholder="Personal email address"
              />
            </div>

            {/* School Email */}
            <div className="relative flex items-center transition-all duration-200 bg-[#f5f5f5] border border-transparent rounded-[18px] px-4 py-4.5 focus-within:bg-white focus-within:border-[#344054] focus-within:border-opacity-40 focus-within:shadow-sm">
              <Mail className="text-neutral-500 mr-3" size={20} />
              <input
                type="email"
                className="bg-transparent border-none outline-none w-full text-[15px] font-medium text-neutral-800 placeholder-neutral-400"
                placeholder="School email address"
              />
            </div>

            {/* Matric Number */}
            <div className="relative flex items-center transition-all duration-200 bg-[#f5f5f5] border border-transparent rounded-[18px] px-4 py-4.5 focus-within:bg-white focus-within:border-[#344054] focus-within:border-opacity-40 focus-within:shadow-sm">
              <CreditCard className="text-neutral-500 mr-3" size={20} />
              <input
                type="text"
                className="bg-transparent border-none outline-none w-full text-[15px] font-medium text-neutral-800 placeholder-neutral-400"
                placeholder="Matric / student ID number"
              />
            </div>

            {/* Phone Number */}
            <div className="relative flex items-center transition-all duration-200 bg-[#f5f5f5] border border-transparent rounded-[18px] px-4 py-4.5 focus-within:bg-white focus-within:border-[#344054] focus-within:border-opacity-40 focus-within:shadow-sm">
              <Phone className="text-neutral-500 mr-3" size={20} />
              <input
                type="tel"
                className="bg-transparent border-none outline-none w-full text-[15px] font-medium text-neutral-800 placeholder-neutral-400"
                placeholder="Phone number"
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center transition-all duration-200 bg-[#f5f5f5] border border-transparent rounded-[18px] px-4 py-4.5 focus-within:bg-white focus-within:border-[#344054] focus-within:border-opacity-40 focus-within:shadow-sm">
              <Lock className="text-neutral-800 mr-3" size={20} />
              <div className="flex items-center w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  className="bg-transparent border-none outline-none w-full text-[15px] font-medium text-neutral-800 placeholder-neutral-400"
                  placeholder="Password"
                />
                <span className="text-neutral-300 mx-1 text-lg">|</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-800 ml-2"
              >
                {!showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative flex items-center transition-all duration-200 bg-[#f5f5f5] border border-transparent rounded-[18px] px-4 py-4.5 focus-within:bg-white focus-within:border-[#344054] focus-within:border-opacity-40 focus-within:shadow-sm">
              <Lock className="text-neutral-800 mr-3" size={20} />
              <div className="flex items-center w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="bg-transparent border-none outline-none w-full text-[15px] font-medium text-neutral-800 placeholder-neutral-400"
                  placeholder="Confirm password"
                />
                <span className="text-neutral-300 mx-1 text-lg">|</span>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-neutral-800 ml-2"
              >
                {!showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="p-1 border border-neutral-200 rounded-full w-full relative">
              <button className="flex items-center justify-center w-full bg-[#13368B] text-white py-3.5 rounded-full font-medium text-[16px] hover:brightness-105 transition-all">
                Create an Account
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-6">
            <span className="text-neutral-500 text-[14px] mb-1 font-medium text-center">
              You have an account with us? Lovely!
            </span>
            <Link
              href="/onboarding/sellers/sign-in/two"
              className="text-[#13368B] text-[14.5px] font-semibold hover:underline"
            >
              Log into your account here
            </Link>
          </div>

          <div className="flex items-center w-full gap-4 my-10 relative px-6">
            <div className="flex-1 h-[0.5px] bg-neutral-300"></div>
            <span className="text-neutral-500 text-[14px] whitespace-nowrap">
              or continue with
            </span>
            <div className="flex-1 h-[0.5px] bg-neutral-300"></div>
          </div>

          <div className="flex justify-center gap-6 mb-10">
            <button className="p-4 flex items-center justify-center border border-neutral-100 rounded-[20px] shadow-sm hover:bg-neutral-50 transition-all w-[70px] h-[64px]">
              <Image src="/google.png" alt="Google" width={28} height={28} />
            </button>
            <button className="p-4 flex items-center justify-center border border-neutral-100 rounded-[20px] shadow-sm hover:bg-neutral-50 transition-all w-[70px] h-[64px]">
              <svg
                viewBox="0 0 384 512"
                width="28"
                height="28"
                className="fill-black"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
            </button>
          </div>

          <p className="text-neutral-400 text-[12.5px] text-center leading-relaxed">
            By clicking &ldquo;Create an Account&rdquo; you agree with
            <br />
            CampusMart{" "}
            <Link href="#" className="text-[#13368B] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-[#13368B] hover:underline">
              Privacy Policy
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
