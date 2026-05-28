"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MetricSlider } from "@/components/imc/metric-slider";
import { UnitToggle } from "@/components/imc/unit-toggle";
import { Field, FieldError } from "@/components/ui/field";
import { useLocale } from "@/contexts/locale-context";
import { FORM_LIMITS } from "@/lib/imc/constants";
import type { ImcFormValues } from "@/lib/imc/schema";

const KG_TO_LB = 2.20462;

function kgToLb(kg: number) {
  return Math.round(kg * KG_TO_LB * 10) / 10;
}

function lbToKg(lb: number) {
  return Math.round((lb / KG_TO_LB) * 10) / 10;
}

export function StepWeight() {
  const { t } = useLocale();
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ImcFormValues>();

  const weightKg = watch("weightKg");
  const displayMin =
    unit === "kg" ? FORM_LIMITS.weightKg.min : kgToLb(FORM_LIMITS.weightKg.min);
  const displayMax =
    unit === "kg" ? FORM_LIMITS.weightKg.max : kgToLb(FORM_LIMITS.weightKg.max);
  const displayValue = unit === "kg" ? weightKg : kgToLb(weightKg);

  const unitOptions = [
    { value: "kg" as const, label: t.units.kg },
    { value: "lb" as const, label: t.units.lb },
  ];

  return (
    <Field data-invalid={!!errors.weightKg}>
      <div className="flex flex-col items-center gap-6">
        <UnitToggle value={unit} options={unitOptions} onChange={setUnit} />

        <MetricSlider
          value={displayValue}
          onChange={(value) => {
            const rounded = Math.round(value * 10) / 10;
            const nextKg = unit === "kg" ? rounded : lbToKg(rounded);
            setValue("weightKg", nextKg, { shouldDirty: true });
          }}
          min={displayMin}
          max={displayMax}
          step={unit === "kg" ? 0.5 : 1}
          unit={unit}
          ariaLabel={unit === "kg" ? t.sliders.weightKg : t.sliders.weightLb}
          formatValue={(v) => (unit === "kg" ? v.toFixed(1) : Math.round(v))}
          showRuler
        />
      </div>
      <FieldError errors={errors.weightKg ? [errors.weightKg] : undefined} />
    </Field>
  );
}
