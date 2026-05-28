import type { BmiCategory } from "@/lib/imc/constants";
import type { ImcWizardStep } from "@/lib/imc/schema";

export type Locale = "pt" | "en";

export type WizardStepCopy = {
  title: string;
  subtitle?: string;
  ariaLabel: string;
};

export type LocaleMessages = {
  meta: {
    title: string;
    description: string;
  };
  common: {
    next: string;
    calculate: string;
    back: string;
    newAssessment: string;
    share: string;
    download: string;
  };
  toast: {
    validationError: string;
    formError: string;
    calculateError: string;
    unexpectedError: string;
    shareSuccess: string;
    shareCopied: string;
    shareFailed: string;
    downloadSuccess: string;
  };
  wizard: Record<ImcWizardStep, WizardStepCopy>;
  sex: Record<"male" | "female", string>;
  activity: Record<
    import("@/lib/imc/constants").ActivityLevel,
    { label: string; description: string }
  >;
  categories: Record<BmiCategory, string>;
  categoryRanges: Record<BmiCategory, string>;
  categoryActive: string;
  units: {
    years: string;
    cm: string;
    kg: string;
    lb: string;
    kcalPerDay: string;
  };
  sliders: {
    age: string;
    height: string;
    weightKg: string;
    weightLb: string;
  };
  fieldsets: {
    sex: string;
    activity: string;
  };
  results: {
    title: string;
    subtitle: string;
    classification: string;
    bmiLabel: string;
    caloriesLabel: string;
    caloriesHint: string;
    weightRangeLabel: string;
    weightRangeHint: string;
    insightTitle: string;
    insightDisclaimer: string;
    shareTitle: string;
    shareTextTitle: string;
  };
  insights: Record<
    BmiCategory,
    (params: { bmi: string; min: string; max: string }) => string
  >;
  export: {
    header: string;
    bmi: string;
    category: string;
    calories: string;
    weightRange: string;
    insight: string;
  };
};
