"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";
import { LOCALES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <fieldset
      className={cn(
        "inline-flex rounded-full border-0 bg-secondary p-1",
        className,
      )}
    >
      <legend className="sr-only">Idioma / Language</legend>
      {LOCALES.map((code) => (
        <Button
          key={code}
          type="button"
          variant={locale === code ? "default" : "ghost"}
          size="sm"
          className={cn(
            "min-h-9 rounded-full px-3 text-xs",
            locale === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground",
          )}
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
        >
          {code.toUpperCase()}
        </Button>
      ))}
    </fieldset>
  );
}
