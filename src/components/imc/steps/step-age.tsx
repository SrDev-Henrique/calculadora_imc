"use client";

import { useFormContext } from "react-hook-form";
import { MetricSlider } from "@/components/imc/metric-slider";
import { Field, FieldError } from "@/components/ui/field";
import { useLocale } from "@/contexts/locale-context";
import { FORM_LIMITS } from "@/lib/imc/constants";
import type { ImcFormValues } from "@/lib/imc/schema";

export function StepAge() {
  const { t } = useLocale();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ImcFormValues>();

  const age = watch("age");

  return (
    <Field data-invalid={!!errors.age}>
      <MetricSlider
        value={age}
        onChange={(value) =>
          setValue("age", Math.round(value), { shouldDirty: true })
        }
        min={FORM_LIMITS.age.min}
        max={FORM_LIMITS.age.max}
        step={1}
        unit={t.units.years}
        ariaLabel={t.sliders.age}
      />
      <FieldError errors={errors.age ? [errors.age] : undefined} />
    </Field>
  );
}
