"use client";

import { useFormContext } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { useLocale } from "@/contexts/locale-context";
import { ACTIVITY_LEVEL_KEYS } from "@/lib/imc/constants";
import type { ImcFormValues } from "@/lib/imc/schema";
import { cn } from "@/lib/utils";

export function StepActivity() {
  const { t } = useLocale();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ImcFormValues>();

  const activityLevel = watch("activityLevel");

  return (
    <Field data-invalid={!!errors.activityLevel}>
      <fieldset className="flex flex-col gap-2 border-0 p-0">
        <legend className="sr-only">{t.fieldsets.activity}</legend>
        {ACTIVITY_LEVEL_KEYS.map((level) => {
          const isSelected = activityLevel === level;
          const copy = t.activity[level];

          return (
            <label
              key={level}
              className={cn(
                "flex min-h-11 cursor-pointer flex-col rounded-2xl border-2 px-4 py-4 text-left transition-colors",
                isSelected
                  ? "border-accent bg-accent/5"
                  : "border-border bg-card hover:border-accent/40",
              )}
            >
              <input
                type="radio"
                name="activityLevel"
                value={level}
                checked={isSelected}
                onChange={() =>
                  setValue("activityLevel", level, { shouldDirty: true })
                }
                className="sr-only"
              />
              <span className="block font-medium text-foreground">
                {copy.label}
              </span>
              <span className="mt-0.5 block text-muted-foreground text-sm">
                {copy.description}
              </span>
            </label>
          );
        })}
      </fieldset>
      <FieldError
        errors={errors.activityLevel ? [errors.activityLevel] : undefined}
      />
    </Field>
  );
}
