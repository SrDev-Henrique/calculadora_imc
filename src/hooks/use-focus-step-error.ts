"use client";

import { useEffect, useRef } from "react";
import type { FieldErrors } from "react-hook-form";
import type { ImcFormValues } from "@/lib/imc/schema";

/**
 * Move o foco para o primeiro alerta de erro visível na etapa (após tentativa de avançar).
 */
export function useFocusStepError(
  errors: FieldErrors<ImcFormValues>,
  attempt: number,
) {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (attempt === 0 || Object.keys(errors).length === 0) return;

    const alert = regionRef.current?.querySelector<HTMLElement>(
      '[data-slot="field-error"]',
    );

    if (alert) {
      alert.setAttribute("tabindex", "-1");
      alert.focus({ preventScroll: true });
    }
  }, [errors, attempt]);

  return regionRef;
}
