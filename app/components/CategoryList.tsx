"use client";

import { useState } from "react";
import { categories } from "../components/data";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {
  const [pressed, setPressed] = useState<any>(null);

  const handlePress = (name: any) => {
    setPressed((prev: any) => (prev === name ? null : name));
  };

  return (
    <div className="flex justify-between overflow-x-scroll">
      {categories.map((category) => {
        const isActive = pressed === category.name;

        return (
          <CategoryItem
            key={category.name}
            category={category}
            isActive={isActive}
            onClick={() => handlePress(category.name)}
          />
        );
      })}
    </div>
  );
}
