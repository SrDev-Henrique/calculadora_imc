"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ImcFormValues } from "@/lib/imc/schema";
import {
  type ImcWizardStep,
  imcStepSchemas,
  WIZARD_STEPS,
} from "@/lib/imc/schema";
import { WIZARD_STEP_FIELDS } from "@/lib/imc/wizard";

export function useImcWizard(form: UseFormReturn<ImcFormValues>) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = WIZARD_STEPS[stepIndex] as ImcWizardStep;
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === WIZARD_STEPS.length - 1;
  const totalSteps = WIZARD_STEPS.length;

  const validateCurrentStep = useCallback(async () => {
    const schema = imcStepSchemas[step];
    const fields = WIZARD_STEP_FIELDS[step];
    const values = form.getValues();

    const stepValues = Object.fromEntries(
      fields.map((field) => [field, values[field]]),
    );

    const result = schema.safeParse(stepValues);

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && field in values) {
          form.setError(field as keyof ImcFormValues, {
            type: "manual",
            message: issue.message,
          });
        }
      }
      return false;
    }

    for (const field of fields) {
      form.clearErrors(field);
    }

    return true;
  }, [form, step]);

  const next = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return false;

    if (!isLast) {
      setStepIndex((index) => index + 1);
    }

    return true;
  }, [isLast, validateCurrentStep]);

  const prev = useCallback(() => {
    if (!isFirst) {
      setStepIndex((index) => index - 1);
    }
  }, [isFirst]);

  const reset = useCallback(() => {
    setStepIndex(0);
  }, []);

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < WIZARD_STEPS.length) {
      setStepIndex(index);
    }
  }, []);

  return {
    step,
    stepIndex,
    totalSteps,
    isFirst,
    isLast,
    next,
    prev,
    reset,
    goToStep,
    validateCurrentStep,
  };
}
