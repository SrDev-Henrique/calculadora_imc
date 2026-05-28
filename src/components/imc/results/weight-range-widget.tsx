"use client";

import { Weight } from "lucide-react";
import { WidgetCard, WidgetLabel } from "@/components/imc/widget-card";
import { useLocale } from "@/contexts/locale-context";
import { getNumberFormat } from "@/lib/i18n";
import type { HealthyWeightRange } from "@/lib/imc/calculate";
import { cn } from "@/lib/utils";

type WeightRangeWidgetProps = {
  healthyWeight: HealthyWeightRange;
  className?: string;
};

export function WeightRangeWidget({
  healthyWeight,
  className,
}: WeightRangeWidgetProps) {
  const { locale, t } = useLocale();
  const weightFormatter = getNumberFormat(locale);

  return (
    <WidgetCard className={cn("flex h-full flex-col gap-3", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-widget-teal/25 text-widget-teal">
          <Weight className="size-5" aria-hidden />
        </span>
        <div>
          <WidgetLabel>{t.results.weightRangeLabel}</WidgetLabel>
          <p className="font-semibold text-foreground text-xl tracking-tight">
            {weightFormatter.format(healthyWeight.minKg)}
            <span className="mx-1 font-normal text-muted-foreground">–</span>
            {weightFormatter.format(healthyWeight.maxKg)}
            <span className="ml-1 font-normal text-muted-foreground text-sm">
              {t.units.kg}
            </span>
          </p>
        </div>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        {t.results.weightRangeHint}
      </p>
    </WidgetCard>
  );
}
