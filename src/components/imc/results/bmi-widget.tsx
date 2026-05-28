"use client";

import { Scale } from "lucide-react";
import { BmiChart } from "@/components/imc/results/bmi-chart";
import { WidgetCard, WidgetLabel } from "@/components/imc/widget-card";
import { useLocale } from "@/contexts/locale-context";
import type { ImcResults } from "@/lib/imc/calculate";
import { cn } from "@/lib/utils";

type BmiWidgetProps = {
  results: ImcResults;
  className?: string;
};

export function BmiWidget({ results, className }: BmiWidgetProps) {
  const { t } = useLocale();

  return (
    <WidgetCard
      className={cn("flex h-full min-h-[220px] flex-col gap-4", className)}
    >
      <div className="flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Scale className="size-4" aria-hidden />
        </span>
        <WidgetLabel>{t.results.bmiLabel}</WidgetLabel>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-1">
        <p className="font-semibold text-5xl text-accent tracking-tight">
          {results.bmi}
        </p>
        <p className="font-medium text-foreground text-lg">
          {results.categoryLabel}
        </p>
      </div>

      <BmiChart bmi={results.bmi} className="aspect-auto h-[72px] w-full" />
    </WidgetCard>
  );
}
