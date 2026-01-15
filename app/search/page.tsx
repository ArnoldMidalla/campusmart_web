"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import Nav from "../components/nav";
import PageHeader from "../components/PageHeader";
import ProductsCard from "../components/ProductsCard";
import { products, categories } from "../components/data";
import CategoryItem from "../components/CategoryItem";
import { applySearchFilters, SortOption } from "../utils/searchFilters";
import { SORT_OPTIONS } from "../utils/sortOptions";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("relevant");

  // Filter and search logic using utility function
  const filteredProducts = useMemo(() => {
    return applySearchFilters(products, searchQuery, selectedCategory, sortBy);
  }, [searchQuery, selectedCategory, sortBy]);

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative flex justify-center max-w-dvw min-h-dvh bg-white text-black font-dmSans tracking-tight">
      <main className="flex flex-col gap-6 max-w-md w-full pb-28 px-6 pt-12">
        <PageHeader title="Search Products" showBack={false} />

        {/* Search Input */}
        <div className="flex flex-col gap-4">
          <div className="border border-neutral-200 shadow-lg/5 flex w-full h-12 rounded-full justify-between pl-4 bg-white">
            <input
              type="text"
              placeholder="Search on Campusmart..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-sm font-medium w-full focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="px-3 flex items-center justify-center hover:bg-neutral-100 transition"
              >
                <X size={18} className="text-neutral-500" />
              </button>
            )}
            <div className="bg-main flex justify-center items-center px-4 rounded-full">
              <SearchIcon color="white" size={17} strokeWidth={3} />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="flex justify-between gap-2 overflow-x-auto pb-2 scroll-smooth">
            {categories.map((category) => {
              const isActive = selectedCategory === category.name;
              return (
                <div key={category.name} onClick={() => handleCategoryPress(category.name)}>
                  <CategoryItem
                    category={category}
                    isActive={isActive}
                    onClick={() => {}}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Sorting Options */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition border ${
                sortBy === option.value
                  ? "bg-main text-white border-main"
                  : "bg-white border-neutral-200 text-black hover:border-neutral-300"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-600">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setSortBy("relevant");
              }}
              className="text-xs text-main font-medium hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductsCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                category={product.category}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="size-16 rounded-full bg-neutral-100 flex items-center justify-center">
              <SearchIcon size={32} className="text-neutral-400" />
            </div>
            <div className="text-center">
              <p className="font-medium text-neutral-800">No products found</p>
              <p className="text-sm text-neutral-600">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Try searching or filtering by category"}
              </p>
            </div>
          </div>
        )}
      </main>
      <Nav />
    </div>
  );
}
