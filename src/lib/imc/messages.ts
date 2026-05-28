import { getMessages, getNumberFormat } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import type { BmiCategory } from "./constants";

export type ImcInsightParams = {
  category: BmiCategory;
  bmi: number;
  minKg: number;
  maxKg: number;
  locale?: Locale;
};

export function getImcInsightMessage(params: ImcInsightParams): string {
  const locale = params.locale ?? "pt";
  const messages = getMessages(locale);
  const weightFmt = getNumberFormat(locale);
  const bmiFmt = getNumberFormat(locale);

  const formatted = {
    bmi: bmiFmt.format(params.bmi),
    min: `${weightFmt.format(params.minKg)} kg`,
    max: `${weightFmt.format(params.maxKg)} kg`,
  };

  return messages.insights[params.category](formatted);
}
