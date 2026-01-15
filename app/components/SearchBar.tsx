"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();

  return (
    <div className="border border-neutral-200 shadow-lg/5 flex w-full h-12 rounded-full justify-between pl-4">
      <input
        type="search"
        placeholder="Search on Campusmart"
        className="text-sm font-medium w-full  focus:outline-none"
      />
      <button
        className="bg-main flex justify-center items-center px-4 rounded-full"
        onClick={() => router.push("/search")}
      >
        <Search color="white" size={17} strokeWidth={3} />
      </button>
    </div>
  );
}
