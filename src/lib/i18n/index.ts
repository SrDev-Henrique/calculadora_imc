import { en } from "@/lib/i18n/locales/en";
import { pt } from "@/lib/i18n/locales/pt";
import type { Locale, LocaleMessages } from "@/lib/i18n/types";

export type { Locale, LocaleMessages };

export const LOCALES = ["pt", "en"] as const satisfies readonly Locale[];

export const LOCALE_LABELS: Record<Locale, string> = {
  pt: "Português",
  en: "English",
};

export const messages: Record<Locale, LocaleMessages> = { pt, en };

export const DEFAULT_LOCALE: Locale = "pt";

export const LOCALE_STORAGE_KEY = "imc-locale";

export function getMessages(locale: Locale): LocaleMessages {
  return messages[locale];
}

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function getNumberFormat(locale: Locale) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function getCalorieFormat(locale: Locale) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US");
}
