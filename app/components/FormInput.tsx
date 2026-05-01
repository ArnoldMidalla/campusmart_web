"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

interface FormInputProps {
  /** Lucide icon shown on the left */
  icon: LucideIcon;
  /** Input type — use "password" to enable the show/hide toggle */
  type?: "text" | "email" | "password" | "tel" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Extra classes applied to the outer wrapper div */
  className?: string;
  name?: string;
  id?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function FormInput({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  name,
  id,
  autoComplete,
  required,
  disabled,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div
      className={`relative flex items-center transition-all duration-200 bg-[#f5f5f5] border border-transparent rounded-[12px] px-4 py-3 focus-within:bg-white focus-within:border-[#344054] focus-within:border-opacity-40 focus-within:shadow-sm ${className}`}
    >
      <Icon className="text-neutral-500 mr-3 shrink-0" size={20} />

      {isPassword ? (
        <>
          <div className="flex items-center w-full">
            <input
              type={resolvedType}
              name={name}
              id={id}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              autoComplete={autoComplete}
              required={required}
              disabled={disabled}
              className="bg-transparent border-none outline-none w-full text-[14px] font-medium text-neutral-800 placeholder-neutral-400"
            />
            <span className="text-neutral-300 mx-1 text-lg">|</span>
          </div>
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-neutral-500 ml-2 hover:text-neutral-800 transition-colors shrink-0"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </>
      ) : (
        <input
          type={resolvedType}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          className="bg-transparent border-none outline-none w-full text-[14px] font-medium text-neutral-800 placeholder-neutral-400"
        />
      )}
    </div>
  );
}
