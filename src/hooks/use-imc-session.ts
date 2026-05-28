"use client";

import { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { type ImcFormValues, imcFormSchema } from "@/lib/imc/schema";
import {
  clearImcSession,
  loadImcSession,
  saveImcSession,
} from "@/lib/imc/storage";

type UseImcSessionOptions = {
  form: UseFormReturn<ImcFormValues>;
  stepIndex: number;
  resultInput: ImcFormValues | null;
  setResultInput: (input: ImcFormValues | null) => void;
  goToStep: (index: number) => void;
};

export function useImcSession({
  form,
  stepIndex,
  resultInput,
  setResultInput,
  goToStep,
}: UseImcSessionOptions) {
  const hydrated = useRef(false);
  const showResults = resultInput !== null;

  useEffect(() => {
    const saved = loadImcSession();
    if (saved) {
      form.reset(saved.formValues);
      goToStep(saved.stepIndex);
      if (saved.showResults) {
        const parsed = imcFormSchema.safeParse(saved.formValues);
        if (parsed.success) {
          setResultInput(parsed.data);
        }
      }
    }
    hydrated.current = true;
  }, [form, goToStep, setResultInput]);

  useEffect(() => {
    if (!hydrated.current) return;

    const subscription = form.watch((values) => {
      saveImcSession({
        formValues: values as ImcFormValues,
        stepIndex,
        showResults,
      });
    });

    return () => subscription.unsubscribe();
  }, [form, stepIndex, showResults]);

  useEffect(() => {
    if (!hydrated.current) return;
    saveImcSession({
      formValues: form.getValues(),
      stepIndex,
      showResults,
    });
  }, [form, stepIndex, showResults]);
}

export function clearImcSessionState(): void {
  clearImcSession();
}
