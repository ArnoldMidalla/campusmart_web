"use client";

import Link from "next/link";

type Variant = "buyer" | "seller";
type ButtonType = "button" | "submit" | "reset";

interface BaseProps {
  children: React.ReactNode;
  /** "buyer" = text-main (orange)  |  "seller" = text-[#13368B] (navy)  — defaults to "buyer" */
  variant?: Variant;
  /** Extra classes on the outer ring wrapper */
  className?: string;
  disabled?: boolean;
}

interface AsButton extends BaseProps {
  /** When provided the component renders as a <button> */
  onClick?: () => void;
  type?: ButtonType;
  href?: never;
}

interface AsLink extends BaseProps {
  /** When provided the component renders as a <Link> */
  href: string;
  onClick?: never;
  type?: never;
}

type SecondaryButtonProps = AsButton | AsLink;

const colorMap: Record<Variant, { ring: string; text: string; border: string }> = {
  buyer:  { ring: "border-neutral-200", text: "text-main", border: "border-main" },
  seller: { ring: "border-neutral-200", text: "text-[#13368B]", border: "border-[#13368B]" },
};

export default function SecondaryButton({
  children,
  variant = "buyer",
  className = "",
  disabled,
  onClick,
  type = "button",
  href,
}: SecondaryButtonProps) {
  const { ring, text, border } = colorMap[variant];

  const inner = (
    <span
      className={`flex items-center justify-center w-full bg-white ${text} border ${border} py-2.5 rounded-full font-medium text-[15px] hover:bg-neutral-50 transition-all ${
        disabled ? "opacity-40 pointer-events-none" : ""
      }`}
    >
      {children}
    </span>
  );

  return (
    <div className={`p-2 border ${ring} rounded-full w-full ${className}`}>
      {href ? (
        <Link href={href} className="block w-full">
          {inner}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className="w-full"
        >
          {inner}
        </button>
      )}
    </div>
  );
}
