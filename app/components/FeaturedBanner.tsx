"use client";

import { featuredDisplays } from "./data";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function FeaturedBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = featuredDisplays[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredDisplays.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredDisplays.length - 1 : prev - 1
    );
  };

  return (
    <section className="flex flex-col gap-2 bg-white py-4 px-6">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Featured</p>
        <div className="flex gap-1">
          {featuredDisplays.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-main w-6"
                  : "bg-neutral-300 w-1"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <Link href={featured.ctaLink || "/"}>
        <div
          className={`relative w-full h-40 rounded-lg overflow-hidden bg-gradient-to-r ${featured.backgroundColor} flex items-end justify-between p-4`}
        >
          {featured.image && (
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="absolute inset-0 object-cover opacity-60"
            />
          )}

          <div className="relative z-10 flex flex-col gap-1 flex-1">
            <p className={`${featured.textColor} text-lg font-semibold leading-tight`}>
              {featured.title}
            </p>
            <p className={`${featured.textColor} text-xs opacity-90`}>
              {featured.subtitle}
            </p>
          </div>

          <button
            className={`relative z-10 ${featured.textColor} flex items-center gap-1 px-3 py-1.5 rounded-full border border-current bg-white/10 backdrop-blur-sm hover:bg-white/20 transition text-xs font-medium`}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {featured.ctaText}
            <ChevronRight size={14} />
          </button>
        </div>
      </Link>

      {/* {featuredDisplays.length > 1 && (
        <div className="flex gap-2 justify-center mt-2">
          <button
            onClick={handlePrev}
            className="px-3 py-1 text-sm rounded-full border border-neutral-200 hover:bg-neutral-100 transition"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="px-3 py-1 text-sm rounded-full border border-neutral-200 hover:bg-neutral-100 transition"
          >
            →
          </button>
        </div>
      )} */}
    </section>
  );
}
