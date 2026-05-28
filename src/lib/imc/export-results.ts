import { getCalorieFormat, getNumberFormat } from "@/lib/i18n";
import type { LocaleMessages } from "@/lib/i18n/types";
import type { ImcResults } from "@/lib/imc/calculate";

export function formatResultsForExport(
  results: ImcResults,
  messages: LocaleMessages,
  locale: "pt" | "en",
): string {
  const weightFmt = getNumberFormat(locale);
  const calorieFmt = getCalorieFormat(locale);
  const { healthyWeight } = results;

  const lines = [
    messages.export.header,
    "—".repeat(32),
    `${messages.export.bmi}: ${results.bmi}`,
    `${messages.export.category}: ${results.categoryLabel}`,
    `${messages.export.calories}: ${calorieFmt.format(results.dailyCalories)}`,
    `${messages.export.weightRange}: ${weightFmt.format(healthyWeight.minKg)} – ${weightFmt.format(healthyWeight.maxKg)} kg`,
    "",
    `${messages.export.insight}:`,
    results.insight,
  ];

  return lines.join("\n");
}

export async function shareResultsText(
  text: string,
  title: string,
): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text });
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "failed";
      }
    }
  }

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return "copied";
    } catch {
      return "failed";
    }
  }

  return "failed";
}

export function downloadResultsText(text: string, filename: string): void {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
