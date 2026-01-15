"use client";

import Nav from "../components/nav";
import PageHeader from "../components/PageHeader";

export default function Search() {
  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
      <main className="flex flex-col gap-8 max-w-md w-full pb-28 px-6 pt-12">
        <PageHeader title="Search Products" />
        <p className="text-sm text-neutral-600">Search functionality coming soon</p>
      </main>
      <Nav />
    </div>
  );
}
