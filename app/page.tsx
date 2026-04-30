"use client";

import { products, featuredStores } from "./components/data";
import Nav from "./components/nav";
import AppShell from "./components/AppShell";
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
      <AppShell>
        {/* Section 1: Search & Filter */}
        <section className="flex flex-col gap-5 bg-white pt-0 pb-2 px-4">
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
          {/* Carousel on mobile → grid on md+ */}
          <div className="flex gap-4 overflow-x-scroll pb-2 no-scrollbar px-4 md:overflow-x-visible md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredStores.map((store, index) => (
              <div key={index} className="shrink-0 md:shrink md:w-auto">
                <FeaturedStoreCard store={store} />
              </div>
            ))}
          </div>
        </section>
      </AppShell>

      {/* Mobile bottom nav — hidden on lg+ via its own lg:hidden */}
      <Nav />
    </>
  );
}