import type { ImcFormValues, ImcWizardStep } from "./schema";

export const WIZARD_STEP_CONFIG: Record<
  ImcWizardStep,
  { title: string; subtitle?: string }
> = {
  age: {
    title: "Quantos anos você tem?",
    subtitle: "Usamos sua idade para calcular suas calorias diárias.",
  },
  sex: {
    title: "Qual é o seu sexo biológico?",
    subtitle: "Necessário para a estimativa de metabolismo basal.",
  },
  height: {
    title: "Qual é a sua altura?",
    subtitle: "Arraste para ajustar ou use o controle abaixo.",
  },
  weight: {
    title: "Qual é o seu peso atual?",
    subtitle: "Arraste para ajustar ou use o controle abaixo.",
  },
  activity: {
    title: "Quão ativo você é no dia a dia?",
    subtitle: "Isso define quantas calorias você precisa por dia.",
  },
};

export const WIZARD_STEP_ARIA_LABELS: Record<ImcWizardStep, string> = {
  age: "Idade",
  sex: "Sexo biológico",
  height: "Altura",
  weight: "Peso",
  activity: "Nível de atividade",
};

export const WIZARD_STEP_FIELDS: Record<
  ImcWizardStep,
  readonly (keyof ImcFormValues)[]
> = {
  age: ["age"],
  sex: ["sex"],
  height: ["heightCm"],
  weight: ["weightKg"],
  activity: ["activityLevel"],
};
