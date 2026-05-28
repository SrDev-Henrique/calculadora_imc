import { describe, expect, test } from "bun:test";
import {
  calculateBmi,
  calculateBmr,
  calculateImcResults,
  calculateTdee,
  getBmiCategory,
  getHealthyWeightRange,
} from "./calculate";

describe("calculateBmi", () => {
  test("calculates BMI with one decimal", () => {
    expect(calculateBmi(70, 170)).toBe(24.2);
    expect(calculateBmi(93.9, 179)).toBe(29.3);
  });
});

describe("getBmiCategory", () => {
  test("classifies WHO ranges", () => {
    expect(getBmiCategory(17)).toBe("underweight");
    expect(getBmiCategory(22)).toBe("normal");
    expect(getBmiCategory(27)).toBe("overweight");
    expect(getBmiCategory(32)).toBe("obese");
  });
});

describe("getHealthyWeightRange", () => {
  test("returns min/max for height 179cm", () => {
    const range = getHealthyWeightRange(179);
    expect(range.minKg).toBe(59.3);
    expect(range.maxKg).toBe(79.8);
  });
});

describe("calculateBmr", () => {
  test("differs by sex at same inputs", () => {
    const male = calculateBmr("male", 70, 170, 30);
    const female = calculateBmr("female", 70, 170, 30);
    expect(male).toBeGreaterThan(female);
  });
});

describe("calculateTdee", () => {
  test("applies activity multiplier", () => {
    const bmr = 1800;
    expect(calculateTdee(bmr, "sedentary")).toBe(2160);
    expect(calculateTdee(bmr, "moderate")).toBe(2790);
  });
});

describe("calculateImcResults", () => {
  const input = {
    age: 30,
    sex: "male" as const,
    heightCm: 179,
    weightKg: 93.9,
    activityLevel: "moderate" as const,
  };

  test("returns full result in Portuguese", () => {
    const result = calculateImcResults(input, "pt");
    expect(result.bmi).toBe(29.3);
    expect(result.category).toBe("overweight");
    expect(result.categoryLabel).toBe("Sobrepeso");
    expect(result.dailyCalories).toBe(2965);
    expect(result.insight).toContain("Organização Mundial da Saúde");
  });

  test("returns localized labels in English", () => {
    const result = calculateImcResults(input, "en");
    expect(result.categoryLabel).toBe("Overweight");
    expect(result.insight).toContain("World Health Organization");
  });
});
