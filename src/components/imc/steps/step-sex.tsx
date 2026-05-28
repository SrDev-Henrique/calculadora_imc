"use client";

import { useFormContext } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { useLocale } from "@/contexts/locale-context";
import { SEX_KEYS } from "@/lib/imc/constants";
import type { ImcFormValues } from "@/lib/imc/schema";
import { cn } from "@/lib/utils";

export function StepSex() {
  const { t } = useLocale();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ImcFormValues>();

  const sex = watch("sex");

  return (
    <Field data-invalid={!!errors.sex}>
      <fieldset className="grid grid-cols-2 gap-3 border-0 p-0">
        <legend className="sr-only">{t.fieldsets.sex}</legend>
        {SEX_KEYS.map((option) => {
          const isSelected = sex === option;

          return (
            <label
              key={option}
              className={cn(
                "flex min-h-11 cursor-pointer items-center justify-center rounded-2xl border-2 px-4 py-8 font-medium text-lg transition-colors",
                isSelected
                  ? "border-accent bg-accent/5 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent/40",
              )}
            >
              <input
                type="radio"
                name="sex"
                value={option}
                checked={isSelected}
                onChange={() => setValue("sex", option, { shouldDirty: true })}
                className="sr-only"
              />
              {t.sex[option]}
            </label>
          );
        })}
      </fieldset>
      <FieldError errors={errors.sex ? [errors.sex] : undefined} />
    </Field>
  );
}
