import PageHeader from "@/app/components/PageHeader";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const imageDimensions = 150;
  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-satoshi font-medium tracking-tighter">
      <main className="flex flex-col max-w-md w-full justify-start pt-8 pb-12 overflow-y-auto">
        <section className="bg-white px-4">
          <PageHeader />
        </section>

        <section className="flex flex-col items-center justify-center pt-8 pb-6 px-4">
          <Image
            src="/login.png"
            alt="login image"
            height={imageDimensions * 1.66667}
            width={imageDimensions}
            className="object-contain"
            priority
          />
        </section>

        <section className="flex flex-col px-6 w-full">
          <h1 className="text-[32px] font-bold text-center text-[#1c1c1c] mb-8">
            Gets you back in
          </h1>

          <div className="flex flex-col gap-4">
            <button className="flex items-center justify-center gap-3 w-full py-[14px] px-6 border border-neutral-100 rounded-2xl hover:bg-neutral-50 transition-colors shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <Image src="/google.png" alt="Google" width={24} height={24} />
              <span className="font-medium text-[15px] text-neutral-700">Continue with Google</span>
            </button>

            <button className="flex items-center justify-center gap-3 w-full py-[14px] px-6 border border-neutral-100 rounded-2xl hover:bg-neutral-50 transition-colors shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
              <svg viewBox="0 0 384 512" width="22" height="22" className="fill-black">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <span className="font-medium text-[15px] text-neutral-700">Continue with Apple</span>
            </button>
          </div>

          <div className="flex items-center w-full gap-4 my-7 relative">
            <div className="flex-1 h-px bg-neutral-200"></div>
            <span className="text-neutral-500 text-[14px]">or</span>
            <div className="flex-1 h-px bg-neutral-200"></div>
          </div>

          <div className="p-1 border border-neutral-200 rounded-full w-full mb-6 relative hover:shadow-sm transition-all focus-within:ring-2 focus-within:ring-main/20">
            <Link href="/onboarding/sellers/two" className="flex items-center justify-center w-full bg-[#13368B] text-white py-3.5 rounded-full font-medium text-[15px] hover:brightness-105 transition-all">
              Sign in with email/number
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center mt-2">
            <span className="text-neutral-500 text-[13.5px] mb-1.5 font-medium">
              You do not have an account yet? No worries
            </span>
            <Link href="/onboarding/buyers/two" className="flex items-center justify-center w-full">
              <span className="text-[#13368B] text-[14.5px] font-semibold hover:underline">
                Create an account with us here
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
