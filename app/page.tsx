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
        {/**<section className="flex flex-col gap-3 bg-white py-5">
          <SectionHeader title="Featured Store" href="/stores" />
          <div className="flex gap-4 overflow-x-scroll pb-2 no-scrollbar px-4 md:overflow-x-visible md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredStores.map((store, index) => (
              <div key={index} className="shrink-0 md:shrink md:w-auto">
                <FeaturedStoreCard store={store} />
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* Section 6: Campus Essentials */}
        <section className="flex flex-col gap-3 bg-white py-5">
          <SectionHeader title="Campus Essentials" href="/categories" />
          <ProductCarousel products={products.slice(0, 5)} />
        </section>

        <SectionDivider />

        {/* Section 7: Study & Creative Picks */}
        <section className="flex flex-col gap-3 bg-white py-5">
          <SectionHeader title="Study & Creative Picks" href="/favourites" />
          <ProductCarousel products={products.slice(1, 6)} />
        </section>

        <SectionDivider />

        {/* Section 8: Home Calm Zone */}
        <section className="flex flex-col gap-3 bg-white py-5">
          <SectionHeader title="Home Calm Zone" href="/cart" />
          <ProductCarousel products={products.slice(2, 6)} />
        </section>

        <SectionDivider />

        {/* Section 9: Weekend Drop */}
        <section className="flex flex-col gap-3 bg-white py-5">
          <SectionHeader title="Weekend Drop" href="/pickup-station" />
          <ProductCarousel products={products.slice(0, 4)} />
        </section>

        <SectionDivider />

        {/* Section 10: Fresh Finds */}
        <section className="flex flex-col gap-3 bg-white py-5">
          <SectionHeader title="Fresh Finds" href="/new" />
          <ProductCarousel products={products.slice(3, 6)} />
        </section>

        <SectionDivider />

      </AppShell>

      {/* Mobile bottom nav — hidden on lg+ via its own lg:hidden */}
      <Nav />
    </>
  );
}