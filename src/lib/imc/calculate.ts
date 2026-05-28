import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import {
  ACTIVITY_MULTIPLIERS,
  type ActivityLevel,
  type BmiCategory,
  type Sex,
} from "./constants";
import { getImcInsightMessage } from "./messages";
import type { ImcFormValues } from "./schema";

export type HealthyWeightRange = {
  minKg: number;
  maxKg: number;
};

export type ImcResults = {
  bmi: number;
  category: BmiCategory;
  categoryLabel: string;
  healthyWeight: HealthyWeightRange;
  bmr: number;
  dailyCalories: number;
  insight: string;
};

export function calculateBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return roundToOneDecimal(bmi);
}

export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

export function getHealthyWeightRange(heightCm: number): HealthyWeightRange {
  const heightM = heightCm / 100;
  const heightSquared = heightM * heightM;

  return {
    minKg: roundToOneDecimal(18.5 * heightSquared),
    maxKg: roundToOneDecimal(24.9 * heightSquared),
  };
}

export function calculateBmr(
  sex: Sex,
  weightKg: number,
  heightCm: number,
  age: number,
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

export function calculateTdee(
  bmr: number,
  activityLevel: ActivityLevel,
): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}

export function calculateImcResults(
  input: ImcFormValues,
  locale: Locale = "pt",
): ImcResults {
  const bmi = calculateBmi(input.weightKg, input.heightCm);
  const category = getBmiCategory(bmi);
  const healthyWeight = getHealthyWeightRange(input.heightCm);
  const bmr = calculateBmr(
    input.sex,
    input.weightKg,
    input.heightCm,
    input.age,
  );
  const dailyCalories = calculateTdee(bmr, input.activityLevel);
  const messages = getMessages(locale);

  return {
    bmi,
    category,
    categoryLabel: messages.categories[category],
    healthyWeight,
    bmr: Math.round(bmr),
    dailyCalories,
    insight: getImcInsightMessage({
      category,
      bmi,
      minKg: healthyWeight.minKg,
      maxKg: healthyWeight.maxKg,
      locale,
    }),
  };
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}
