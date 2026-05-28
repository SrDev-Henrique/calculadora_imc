"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { CategoryCard } from "@/components/imc/results/category-card";
import { BMI_CATEGORY_KEYS, type BmiCategory } from "@/lib/imc/constants";

type CategoryCarouselProps = {
  activeCategory: BmiCategory;
};

export function CategoryCarousel({ activeCategory }: CategoryCarouselProps) {
  const activeIndex = BMI_CATEGORY_KEYS.indexOf(activeCategory);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(activeIndex, true);
  }, [emblaApi, activeIndex]);

  return (
    <div className="sm:hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-3">
          {BMI_CATEGORY_KEYS.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              isActive={category === activeCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
