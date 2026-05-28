export const BMI_THRESHOLDS = {
  underweight: 18.5,
  normal: 25,
  overweight: 30,
} as const;

export const BMI_CATEGORY_KEYS = [
  "underweight",
  "normal",
  "overweight",
  "obese",
] as const;

export type BmiCategory = (typeof BMI_CATEGORY_KEYS)[number];

export const BMI_CATEGORY_LABELS: Record<BmiCategory, string> = {
  underweight: "Magreza",
  normal: "Normal",
  overweight: "Sobrepeso",
  obese: "Obesidade",
};

export const BMI_CATEGORY_SHORT_LABELS: Record<BmiCategory, string> = {
  underweight: "< 18,5",
  normal: "18,5 – 24,9",
  overweight: "25 – 29,9",
  obese: "≥ 30",
};

/** Cores dos widgets de resultado (referência fitness) */
export const BMI_CATEGORY_WIDGET_COLORS: Record<BmiCategory, string> = {
  underweight: "var(--widget-teal)",
  normal: "var(--widget-teal)",
  overweight: "var(--widget-orange)",
  obese: "var(--widget-coral)",
};

export const SEX_KEYS = ["male", "female"] as const;
export type Sex = (typeof SEX_KEYS)[number];

export const SEX_LABELS: Record<Sex, string> = {
  male: "Masculino",
  female: "Feminino",
};

export const ACTIVITY_LEVEL_KEYS = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "very_active",
] as const;

export type ActivityLevel = (typeof ACTIVITY_LEVEL_KEYS)[number];

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentário",
  light: "Levemente ativo",
  moderate: "Moderadamente ativo",
  active: "Muito ativo",
  very_active: "Extremamente ativo",
};

export const ACTIVITY_DESCRIPTIONS: Record<ActivityLevel, string> = {
  sedentary: "Pouco ou nenhum exercício",
  light: "Exercício leve, 1–3 dias por semana",
  moderate: "Exercício moderado, 3–5 dias por semana",
  active: "Exercício intenso, 6–7 dias por semana",
  very_active: "Exercício muito intenso ou trabalho físico",
};

export const FORM_LIMITS = {
  age: { min: 13, max: 120 },
  heightCm: { min: 100, max: 250 },
  weightKg: { min: 30, max: 300 },
} as const;
