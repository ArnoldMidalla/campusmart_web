"use client";

import { useState } from "react";
import { products } from "./components/data";
import Link from "next/link";
import Nav from "./components/nav";
import SearchBar from "./components/SearchBar";
import CategoryList from "./components/CategoryList";
import SectionHeader from "./components/SectionHeader";
import ProductCarousel from "./components/ProductCarousel";
import FeaturedBanner from "./components/FeaturedBanner";
import SectionDivider from "./components/SectionDivider";

export default function Home() {
  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
      <main className="flex flex-col max-w-md w-full pb-28">
        {/* section 1: Search & Filter */}
        <section className="flex flex-col gap-4 bg-white pt-12 pb-4 px-6">
          {/* search */}
          <SearchBar />

          {/* categories */}
          <CategoryList />
        </section>

        <SectionDivider />

        {/* section 2: Featured */}
        <FeaturedBanner />

        <SectionDivider />

        {/* section 3: Recommendations */}
        <section className="flex flex-col gap-2 bg-white py-4">
          <SectionHeader title="You Might Need" href="/" />
          <ProductCarousel products={products} />
        </section>

        <SectionDivider />

        {/* section 4: New Stocks */}
        <section className="flex flex-col gap-2 bg-white py-4">
          <SectionHeader title="New in Stock" href="/" />
          <ProductCarousel products={products} />
        </section>
      </main>
      <Nav />
    </div>
  );
}
