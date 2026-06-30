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
import { useRequireAuth } from "./hooks/useRequireAuth";

export default function Home() {
  useRequireAuth() // redirects to splash if not authenticated
  return (
    <>
      <main className="pb-28 pt-8 md:ml-64">
        {/* Section 1: Search & Filter */}
        <section className="flex flex-col gap-5 bg-white pt-0 pb-2 px-4 md:px-8">
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
        <section className="flex flex-col gap-3 bg-white py-5">
          <SectionHeader title="Featured Store" href="/stores" />
          {/* Carousel layout */}
          <div className="flex gap-4 md:gap-6 overflow-x-scroll pb-2 no-scrollbar px-4 md:px-8">
            {featuredStores.map((store, index) => (
              <div key={index} className="shrink-0">
                <FeaturedStoreCard store={store} />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Mobile bottom nav */}
      <Nav />
    </>
  );
}