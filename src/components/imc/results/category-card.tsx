"use client";

import { useLocale } from "@/contexts/locale-context";
import {
  type BmiCategory,
} from "@/lib/imc/constants";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  category: BmiCategory;
  isActive: boolean;
  className?: string;
};

export function CategoryCard({
  category,
  isActive,
  className,
}: CategoryCardProps) {
  const { t } = useLocale();

  return (
    <div
      className={cn(
        "flex min-w-[140px] shrink-0 flex-col gap-1 rounded-2xl border-2 px-4 py-3 transition-colors",
        isActive
          ? "border-accent bg-accent/2 shadow-sm"
          : "border-transparent bg-card",
        className,
      )}
      aria-current={isActive ? "true" : undefined}
    >
      <span
        className={cn(
          "font-semibold text-sm",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {t.categories[category]}
      </span>
      <span className="text-muted-foreground text-xs">
        {t.categoryRanges[category]}
      </span>
      {isActive ? (
        <span
          className="mt-1 font-medium text-[0.65rem] text-accent uppercase tracking-wide"
        >
          {t.categoryActive}
        </span>
      ) : null}
    </div>
  );
}
