"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CalculatorViewTransition } from "@/components/imc/calculator-view-transition";
import { ResultsDashboard } from "@/components/imc/results/results-dashboard";
import { StepActivity } from "@/components/imc/steps/step-activity";
import { StepAge } from "@/components/imc/steps/step-age";
import { StepHeight } from "@/components/imc/steps/step-height";
import { StepSex } from "@/components/imc/steps/step-sex";
import { StepWeight } from "@/components/imc/steps/step-weight";
import { WizardShell } from "@/components/imc/wizard-shell";
import { WizardStepTransition } from "@/components/imc/wizard-step-transition";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";
import { useFocusStepError } from "@/hooks/use-focus-step-error";
import { clearImcSessionState, useImcSession } from "@/hooks/use-imc-session";
import { useImcWizard } from "@/hooks/use-imc-wizard";
import { calculateImcResults } from "@/lib/imc/calculate";
import type { ImcWizardStep } from "@/lib/imc/schema";
import { type ImcFormValues, imcFormSchema } from "@/lib/imc/schema";

const defaultValues: ImcFormValues = {
  age: 25,
  sex: "male",
  heightCm: 170,
  weightKg: 70,
  activityLevel: "moderate",
};

const STEP_COMPONENTS = {
  age: StepAge,
  sex: StepSex,
  height: StepHeight,
  weight: StepWeight,
  activity: StepActivity,
} as const;

export function ImcCalculator() {
  const { locale, t } = useLocale();
  const [resultInput, setResultInput] = useState<ImcFormValues | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);
  const [validationAttempt, setValidationAttempt] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<ImcFormValues>({
    resolver: zodResolver(imcFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const wizard = useImcWizard(form);

  const results = useMemo(
    () => (resultInput ? calculateImcResults(resultInput, locale) : null),
    [resultInput, locale],
  );

  useImcSession({
    form,
    stepIndex: wizard.stepIndex,
    resultInput,
    setResultInput,
    goToStep: wizard.goToStep,
  });

  const stepRegionRef = useFocusStepError(
    form.formState.errors,
    validationAttempt,
  );

  const handleBack = () => {
    if (wizard.isFirst) return;
    setDirection(-1);
    wizard.prev();
  };

  const handleNext = async () => {
    setIsSubmitting(true);

    try {
      if (wizard.isLast) {
        const isValid = await wizard.validateCurrentStep();
        if (!isValid) {
          setValidationAttempt((n) => n + 1);
          toast.error(t.toast.validationError);
          return;
        }

        const parsed = imcFormSchema.safeParse(form.getValues());
        if (!parsed.success) {
          toast.error(t.toast.formError);
          return;
        }

        setDirection(1);
        setResultInput(parsed.data);
        requestAnimationFrame(() => {
          resultsRef.current
            ?.querySelector("h1")
            ?.focus({ preventScroll: true });
        });
        return;
      }

      const advanced = await wizard.next();
      if (!advanced) {
        setValidationAttempt((n) => n + 1);
        toast.error(t.toast.calculateError);
        return;
      }

      setDirection(1);
    } catch {
      toast.error(t.toast.unexpectedError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setDirection(-1);
    setResultInput(null);
    setValidationAttempt(0);
    form.reset(defaultValues);
    wizard.reset();
    clearImcSessionState();
  };

  const step = wizard.step as ImcWizardStep;
  const stepCopy = t.wizard[step];

  if (results) {
    return (
      <CalculatorViewTransition viewKey="results">
        <div ref={resultsRef}>
          <ResultsDashboard results={results} onRestart={handleRestart} />
        </div>
      </CalculatorViewTransition>
    );
  }

  const StepComponent = STEP_COMPONENTS[step];

  return (
    <CalculatorViewTransition viewKey="wizard">
      <FormProvider {...form}>
        <div className="flex flex-col gap-2">
          <WizardShell
            title={stepCopy.title}
            subtitle={stepCopy.subtitle}
            stepIndex={wizard.stepIndex}
            totalSteps={wizard.totalSteps}
            backLabel={t.common.back}
            progressLabel={(current, total) =>
              locale === "pt"
                ? `Progresso: etapa ${current} de ${total}`
                : `Progress: step ${current} of ${total}`
            }
            formatStepAria={(index, isCurrent, isComplete) => {
              const n = index + 1;
              if (locale === "pt") {
                if (isCurrent)
                  return `Etapa ${n}: ${stepCopy.ariaLabel} (atual)`;
                if (isComplete) return `Etapa ${n} (concluída)`;
                return `Etapa ${n}`;
              }
              if (isCurrent)
                return `Step ${n}: ${stepCopy.ariaLabel} (current)`;
              if (isComplete) return `Step ${n} (completed)`;
              return `Step ${n}`;
            }}
            isFirst={wizard.isFirst}
            onBack={handleBack}
            stepRegionRef={stepRegionRef}
            footer={
              <Button
                type="button"
                size="lg"
                className="h-12 min-h-11 w-full rounded-full"
                disabled={isSubmitting}
                onClick={handleNext}
              >
                {wizard.isLast ? t.common.calculate : t.common.next}
              </Button>
            }
          >
            <WizardStepTransition stepKey={step} direction={direction}>
              <StepComponent />
            </WizardStepTransition>
          </WizardShell>
        </div>
      </FormProvider>
    </CalculatorViewTransition>
  );
}
