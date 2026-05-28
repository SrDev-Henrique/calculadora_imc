"use client";

import { HeartPulse } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";
import { cn } from "@/lib/utils";

type InsightCardProps = {
  insight: string;
  className?: string;
};

export function InsightCard({ insight, className }: InsightCardProps) {
  const { t } = useLocale();

  return (
    <div
      className={cn(
        "rounded-widget bg-card p-5 text-foreground shadow-md",
        className,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-accent/10 text-accent">
          <HeartPulse className="size-4" aria-hidden />
        </span>
        <p className="font-medium text-sm text-foreground">
          {t.results.insightTitle}
        </p>
      </div>
      <p className="text-sm text-foreground leading-relaxed">{insight}</p>
      <p className="mt-3 text-muted-foreground text-xs">
        {t.results.insightDisclaimer}
      </p>
    </div>
  );
}
