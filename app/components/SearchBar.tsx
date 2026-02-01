"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();

  return (
    <div className="border border-neutral-200 shadow-lg/5 flex w-full h-12 rounded-full justify-between items-center pl-4 pr-2">
      <input
        type="search"
        placeholder="Search on Campusmart"
        className="text-xs tracking-tight font-medium w-full  focus:outline-none"
      />
      <button
        className="bg-main flex justify-center items-center py-1.5 px-3 shrink rounded-full"
        onClick={() => router.push("/categories")}
      >
        <Search color="white" size={17} strokeWidth={3} />
      </button>
    </div>
  );
}
