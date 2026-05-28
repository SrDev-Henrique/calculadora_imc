"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UnitToggleProps<T extends string> = {
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
  className?: string;
};

export function UnitToggle<T extends string>({
  value,
  options,
  onChange,
  className,
}: UnitToggleProps<T>) {
  return (
    <div className={cn("inline-flex rounded-full bg-secondary p-1", className)}>
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <Button
            key={option.value}
            type="button"
            variant={isActive ? "default" : "ghost"}
            size="sm"
            className={cn(
              "min-h-11 min-w-12 rounded-full px-4",
              isActive
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-muted-foreground hover:bg-transparent hover:text-foreground",
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
