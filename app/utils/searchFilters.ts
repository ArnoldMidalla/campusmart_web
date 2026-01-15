/**
 * Search and filter utilities for the product search functionality
 */

export type SortOption = "relevant" | "price-low" | "price-high" | "rating";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  avgRating: number;
  [key: string]: any;
}

/**
 * Filters products based on search query
 * Searches in product name and category
 */
export const filterBySearchQuery = (
  products: Product[],
  searchQuery: string
): Product[] => {
  if (!searchQuery.trim()) {
    return products;
  }

  const query = searchQuery.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  );
};

/**
 * Filters products by selected category
 */
export const filterByCategory = (
  products: Product[],
  category: string | null
): Product[] => {
  if (!category) {
    return products;
  }

  return products.filter((product) => product.category === category);
};

/**
 * Sorts products based on the selected sort option
 */
export const sortProducts = (
  products: Product[],
  sortBy: SortOption
): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.avgRating - a.avgRating);
    case "relevant":
    default:
      return sorted;
  }
};

/**
 * Applies all filters and sorting to products
 * Returns filtered and sorted product list
 */
export const applySearchFilters = (
  products: Product[],
  searchQuery: string,
  selectedCategory: string | null,
  sortBy: SortOption
): Product[] => {
  let results = products;

  // Apply search filter
  results = filterBySearchQuery(results, searchQuery);

  // Apply category filter
  results = filterByCategory(results, selectedCategory);

  // Apply sorting
  results = sortProducts(results, sortBy);

  return results;
};
