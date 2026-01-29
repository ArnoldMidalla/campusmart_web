"use client";

import { products, featuredStores } from "./components/data";
import Nav from "./components/nav";
import SearchBar from "./components/SearchBar";
import CategoryList from "./components/CategoryList";
import SectionHeader from "./components/SectionHeader";
import ProductCarousel from "./components/ProductCarousel";
import FeaturedBanner from "./components/FeaturedBanner";
import SectionDivider from "./components/SectionDivider";
import FeaturedStoreCard from "./components/FeaturedStoreCard";

export default function Home() {
  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
      <main className="flex flex-col max-w-md w-full pb-28">
        
        {/* Section 1: Search & Filter */}
        <section className="flex flex-col gap-5 bg-white pt-12 pb-2 px-5">
          <SearchBar />
          <CategoryList />
        </section>

        <SectionDivider />

        {/* Section 2: Featured */}
        <FeaturedBanner />

        <SectionDivider />

        {/* Section 3: Recommendations */}
        <section className="flex flex-col gap-3 bg-white py-5">
          <SectionHeader title="You Might Need" href="/recommendations" />
          <ProductCarousel products={products} />
        </section>

        <SectionDivider />

        {/* Section 4: New Stocks */}
        <section className="flex flex-col gap-3 bg-white py-5">
          <SectionHeader title="New in Stock" href="/new" />
          <ProductCarousel products={products} />
        </section>

        <SectionDivider />

        {/* Section 5: Featured Store */}
        <section className="flex flex-col gap-3 bg-white py-5 px-5">
          <SectionHeader title="Featured Store" href="/stores" />
          <div className="flex gap-4 overflow-x-scroll pb-2 no-scrollbar">
             {featuredStores.map((store, index) => (
                <FeaturedStoreCard key={index} store={store} />
             ))}
          </div>
        </section>

      </main>
      <Nav />
    </div>
  );
}