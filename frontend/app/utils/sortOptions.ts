/**
 * Sort options and labels for the search page
 */

export type SortOption = "relevant" | "price-low" | "price-high" | "rating";

export interface SortLabel {
  value: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortLabel[] = [
  {
    value: "relevant",
    label: "Relevant",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
  {
    value: "rating",
    label: "Highest Rated",
  },
];

/**
 * Get the label for a sort option
 */
export const getSortLabel = (sortBy: SortOption): string => {
  const option = SORT_OPTIONS.find((opt) => opt.value === sortBy);
  return option?.label || "Relevant";
};
