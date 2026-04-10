"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "browse" | "buy" | "sell" | null;

// ─── Role Card ────────────────────────────────────────────────────────────────

function RoleCard({
  role,
  title,
  description,
  imageSrc,
  isSelected,
  onClick,
}: {
  role: Role;
  title: string;
  description: string;
  imageSrc: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border-2 text-left
        transition-all duration-200 active:scale-[0.98]
        ${
          isSelected
            ? "border-main bg-orange-50 shadow-md"
            : "border-neutral-200 bg-white hover:border-neutral-300"
        }
      `}
    >
      {/* Text */}
      <div className="flex flex-col gap-0.5 flex-1">
        <p className="font-bold text-base text-neutral-900">{title}</p>
        <p className="text-sm text-neutral-500 leading-snug">{description}</p>
      </div>

      {/* Illustration */}
      <div
        className={`
          w-24 h-16 rounded-xl overflow-hidden shrink-0 transition-all duration-200
          ${isSelected ? "ring-2 ring-main/40" : ""}
        `}
        style={{ backgroundColor: "#FDE8D8" }}
      >
        <Image
          src={imageSrc}
          alt={title}
          width={96}
          height={64}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ROLES = [
  {
    role: "browse" as Role,
    title: "Browse Items",
    description: "Explore a wide range of items from sellers.",
    imageSrc:
      "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=200&auto=format&fit=crop&q=60",
  },
  {
    role: "buy" as Role,
    title: "Buy Items",
    description: "Purchase items from students on campus.",
    imageSrc:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&auto=format&fit=crop&q=60",
  },
  {
    role: "sell" as Role,
    title: "Sell Items",
    description: "List your items for sale to the purchasing community.",
    imageSrc:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&auto=format&fit=crop&q=60",
  },
];

export default function RoleSelectPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Role>(null);

  const handleContinue = () => {
    if (!selected) return;

    if (selected === "sell") {
      router.push("/onboarding/sellers/sign-up/one");
    } else {
      router.push("/onboarding/buyers/sign-up/one");
    }
  };

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-satoshi tracking-tight">
      <main className="flex flex-col max-w-md w-full min-h-dvh px-6 pt-16 pb-10">

        {/* Heading */}
        <h1 className="text-[32px] font-bold leading-tight text-neutral-900 mb-8">
          How do you want to use
          <br />
          CampusMart?
        </h1>

        {/* Role cards */}
        <div className="flex flex-col gap-4 flex-1">
          {ROLES.map(({ role, title, description, imageSrc }) => (
            <RoleCard
              key={role}
              role={role}
              title={title}
              description={description}
              imageSrc={imageSrc}
              isSelected={selected === role}
              onClick={() => setSelected(role)}
            />
          ))}
        </div>

        {/* Continue CTA */}
        <div className="mt-8">
          <div
            className={`p-1 rounded-full border transition-all duration-200 ${
              selected
                ? "border-main/30"
                : "border-neutral-200"
            }`}
          >
            <button
              onClick={handleContinue}
              disabled={!selected}
              className="w-full py-4 rounded-full bg-main text-white font-semibold text-[16px] disabled:opacity-40 transition-all duration-200 active:scale-[0.98] hover:brightness-105"
            >
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
