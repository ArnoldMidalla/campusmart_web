"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type StoreProps = {
  store: {
    name: string;
    category: string;
    image: string;
    backgroundColor?: string;
  };
};

// Random background colors
const backgroundColors = [
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#F97316", // orange
  "#14B8A6", // teal
  "#6366F1", // indigo
  "#F43F5E", // rose
  "#06B6D4", // cyan
  "#F59E0B", // amber
  "#10B981", // emerald
];

// Helper function to get a random color
export function getRandomBackgroundColor() {
  return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
}

export default function FeaturedStoreCard({ store }: StoreProps) {
  const bgColor = store.backgroundColor || "#0F2868";
  
  return (
    <Link
      href="#"
      className="min-w-60 w-60 flex flex-col rounded-xl overflow-hidden border border-neutral-100"
    >
      {/* Top Half: Solid Color */}
      <div 
        className="relative h-12 w-full bg-blue-800"
        // style={{ backgroundColor: bgColor }}
      />

      {/* Bottom Half: White Body */}
      <div className="relative bg-white p-4 pt-10 flex flex-col">
        {/* Floating Circle Logo */}
        <div className="absolute -top-5 left-4 size-11 rounded-full border-3 border-white overflow-hidden bg-neutral-200 z-10">
          {/* <Image
            src={store.image}
            alt={store.name}
            width={64}
            height={64}
            className="object-cover h-full w-full"
          /> */}
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col flex-1">
            <h3 className="font-bold leading-tight text-neutral-900">
              {store.name}
            </h3>
            <p className="text-xs text-neutral-500 font-normal mt-0.5">
              {store.category}
            </p>
          </div>
          <button className="rounded-full p-2 shadow-lg/15 transition shrink-0">
            <ChevronRight size={18} className="text-neutral-700" />
          </button>
        </div>
      </div>
    </Link>
  );
}