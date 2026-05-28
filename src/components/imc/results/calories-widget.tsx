"use client";

import { Flame } from "lucide-react";
import { WidgetCard, WidgetLabel } from "@/components/imc/widget-card";
import { useLocale } from "@/contexts/locale-context";
import { getCalorieFormat } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CaloriesWidgetProps = {
  dailyCalories: number;
  className?: string;
};

export function CaloriesWidget({
  dailyCalories,
  className,
}: CaloriesWidgetProps) {
  const { locale, t } = useLocale();
  const calorieFormatter = getCalorieFormat(locale);

  return (
    <WidgetCard className={cn("flex h-full flex-col gap-3", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-widget-orange/20 text-widget-orange">
          <Flame className="size-5" aria-hidden />
        </span>
        <div>
          <WidgetLabel>{t.results.caloriesLabel}</WidgetLabel>
          <p className="font-semibold text-2xl text-foreground tracking-tight">
            {calorieFormatter.format(dailyCalories)}
            <span className="ml-1 font-normal text-muted-foreground text-sm">
              {t.units.kcalPerDay}
            </span>
          </p>
        </div>
      </div>
      <p className="text-muted-foreground text-xs leading-relaxed">
        {t.results.caloriesHint}
      </p>
    </WidgetCard>
  );
}
