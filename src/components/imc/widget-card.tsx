import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type WidgetCardProps = {
  children: ReactNode;
  className?: string;
};

export function WidgetCard({ children, className }: WidgetCardProps) {
  return (
    <div
      className={cn(
        "rounded-widget bg-card p-4 shadow-sm ring-1 ring-foreground/8",
        className,
      )}
    >
      {children}
    </div>
  );
}

type WidgetLabelProps = {
  children: ReactNode;
  className?: string;
};

export function WidgetLabel({ children, className }: WidgetLabelProps) {
  return (
    <p className={cn("font-medium text-muted-foreground text-sm", className)}>
      {children}
    </p>
  );
}
