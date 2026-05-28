import type { LocaleMessages } from "@/lib/i18n/types";

export const en: LocaleMessages = {
  meta: {
    title: "BMI Calculator",
    description:
      "Calculate your BMI, WHO classification, healthy weight range, and daily maintenance calories.",
  },
  common: {
    next: "Next",
    calculate: "Calculate",
    back: "Go to previous step",
    newAssessment: "New assessment",
    share: "Share",
    download: "Download summary",
  },
  toast: {
    validationError: "Please check your data before calculating.",
    formError: "Could not validate the form.",
    calculateError: "Fill in the fields correctly to continue.",
    unexpectedError: "An unexpected error occurred. Please try again.",
    shareSuccess: "Result shared successfully.",
    shareCopied: "Summary copied to clipboard.",
    shareFailed: "Could not share the result.",
    downloadSuccess: "Summary downloaded successfully.",
  },
  wizard: {
    age: {
      title: "How old are you?",
      subtitle: "We use your age to estimate your BMI and daily calories.",
      ariaLabel: "Age",
    },
    sex: {
      title: "What is your biological sex?",
      subtitle: "Required for basal metabolic rate estimation.",
      ariaLabel: "Biological sex",
    },
    height: {
      title: "What is your height?",
      subtitle: "Drag to adjust or use the control below.",
      ariaLabel: "Height",
    },
    weight: {
      title: "What is your current weight?",
      subtitle: "Drag to adjust or use the control below.",
      ariaLabel: "Weight",
    },
    activity: {
      title: "How active are you day to day?",
      subtitle: "This defines how many calories you need per day.",
      ariaLabel: "Activity level",
    },
  },
  sex: {
    male: "Male",
    female: "Female",
  },
  activity: {
    sedentary: {
      label: "Sedentary",
      description: "Little or no exercise",
    },
    light: {
      label: "Lightly active",
      description: "Light exercise, 1–3 days per week",
    },
    moderate: {
      label: "Moderately active",
      description: "Moderate exercise, 3–5 days per week",
    },
    active: {
      label: "Very active",
      description: "Hard exercise, 6–7 days per week",
    },
    very_active: {
      label: "Extremely active",
      description: "Very hard exercise or physical job",
    },
  },
  categories: {
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obese: "Obesity",
  },
  categoryRanges: {
    underweight: "< 18.5",
    normal: "18.5 – 24.9",
    overweight: "25 – 29.9",
    obese: "≥ 30",
  },
  categoryActive: "Your category",
  units: {
    years: "years",
    cm: "cm",
    kg: "kg",
    lb: "lb",
    kcalPerDay: "kcal/day",
  },
  sliders: {
    age: "Age in years",
    height: "Height in centimeters",
    weightKg: "Weight in kilograms",
    weightLb: "Weight in pounds",
  },
  fieldsets: {
    sex: "Biological sex",
    activity: "Physical activity level",
  },
  results: {
    title: "Your result",
    subtitle: "Summary of your body assessment",
    classification: "Classification",
    bmiLabel: "BMI",
    caloriesLabel: "Calories",
    caloriesHint: "Estimate to maintain your current weight (TDEE).",
    weightRangeLabel: "Ideal weight",
    weightRangeHint: "Weight range for a normal BMI at your height.",
    insightTitle: "WHO guidance",
    insightDisclaimer:
      "Educational information only. Consult a healthcare professional for personalized advice.",
    shareTitle: "My BMI result",
    shareTextTitle: "BMI Calculator — Summary",
  },
  insights: {
    underweight: ({ bmi, min, max }) =>
      `According to the World Health Organization, your BMI of ${bmi} is considered underweight for your height. To reach the normal range, your weight could be between ${min} and ${max}.`,
    normal: ({ bmi, min, max }) =>
      `According to the World Health Organization, your BMI of ${bmi} is considered normal for your height. To maintain a normal BMI, your weight can range between ${min} and ${max}.`,
    overweight: ({ bmi, min, max }) =>
      `According to the World Health Organization, your BMI of ${bmi} is considered overweight for your height. To return to the normal range, your weight could be between ${min} and ${max}.`,
    obese: ({ bmi, min, max }) =>
      `According to the World Health Organization, your BMI of ${bmi} is considered obesity for your height. To reach the normal range, your weight could be between ${min} and ${max}.`,
  },
  export: {
    header: "BMI Calculator — Summary",
    bmi: "BMI",
    category: "Classification",
    calories: "Daily calories (maintenance)",
    weightRange: "Ideal weight range",
    insight: "Guidance",
  },
};
