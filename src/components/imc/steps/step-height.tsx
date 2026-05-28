"use client";

import { useFormContext } from "react-hook-form";
import { MetricSlider } from "@/components/imc/metric-slider";
import { Field, FieldError } from "@/components/ui/field";
import { useLocale } from "@/contexts/locale-context";
import { FORM_LIMITS } from "@/lib/imc/constants";
import type { ImcFormValues } from "@/lib/imc/schema";

export function StepHeight() {
  const { t } = useLocale();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ImcFormValues>();

  const heightCm = watch("heightCm");

  return (
    <Field data-invalid={!!errors.heightCm}>
      <MetricSlider
        value={heightCm}
        onChange={(value) =>
          setValue("heightCm", Math.round(value), { shouldDirty: true })
        }
        min={FORM_LIMITS.heightCm.min}
        max={FORM_LIMITS.heightCm.max}
        step={1}
        unit={t.units.cm}
        ariaLabel={t.sliders.height}
        showRuler
      />
      <FieldError errors={errors.heightCm ? [errors.heightCm] : undefined} />
    </Field>
  );
}
