"use client";

import { CategoryCard } from "@/components/imc/results/category-card";
import { BMI_CATEGORY_KEYS, type BmiCategory } from "@/lib/imc/constants";

type CategoryGridProps = {
  activeCategory: BmiCategory;
};

export function CategoryGrid({ activeCategory }: CategoryGridProps) {
  return (
    <div className="hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
      {BMI_CATEGORY_KEYS.map((category) => (
        <CategoryCard
          key={category}
          category={category}
          isActive={category === activeCategory}
          className="min-w-0"
        />
      ))}
    </div>
  );
}
