import { z } from "zod";
import { ACTIVITY_LEVEL_KEYS, FORM_LIMITS, SEX_KEYS } from "./constants";

export const imcFormSchema = z.object({
  age: z
    .number({ error: "Informe sua idade" })
    .int({ error: "A idade deve ser um número inteiro" })
    .min(FORM_LIMITS.age.min, {
      error: `A idade mínima é ${FORM_LIMITS.age.min} anos`,
    })
    .max(FORM_LIMITS.age.max, {
      error: `A idade máxima é ${FORM_LIMITS.age.max} anos`,
    }),
  sex: z.enum(SEX_KEYS, { error: "Selecione seu sexo" }),
  heightCm: z
    .number({ error: "Informe sua altura" })
    .min(FORM_LIMITS.heightCm.min, {
      error: `A altura mínima é ${FORM_LIMITS.heightCm.min} cm`,
    })
    .max(FORM_LIMITS.heightCm.max, {
      error: `A altura máxima é ${FORM_LIMITS.heightCm.max} cm`,
    }),
  weightKg: z
    .number({ error: "Informe seu peso" })
    .min(FORM_LIMITS.weightKg.min, {
      error: `O peso mínimo é ${FORM_LIMITS.weightKg.min} kg`,
    })
    .max(FORM_LIMITS.weightKg.max, {
      error: `O peso máximo é ${FORM_LIMITS.weightKg.max} kg`,
    }),
  activityLevel: z.enum(ACTIVITY_LEVEL_KEYS, {
    error: "Selecione seu nível de atividade",
  }),
});

export type ImcFormValues = z.infer<typeof imcFormSchema>;

export const imcStepSchemas = {
  age: imcFormSchema.pick({ age: true }),
  sex: imcFormSchema.pick({ sex: true }),
  height: imcFormSchema.pick({ heightCm: true }),
  weight: imcFormSchema.pick({ weightKg: true }),
  activity: imcFormSchema.pick({ activityLevel: true }),
} as const;

export type ImcWizardStep = keyof typeof imcStepSchemas;

export const WIZARD_STEPS: ImcWizardStep[] = [
  "age",
  "sex",
  "height",
  "weight",
  "activity",
];
