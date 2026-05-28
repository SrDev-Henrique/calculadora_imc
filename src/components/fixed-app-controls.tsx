"use client";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function FixedAppControls() {
  return (
    <div
      className="fixed top-5 right-2 sm:right-5 md:right-30 z-50 flex items-center gap-2"
      role="toolbar"
      aria-label="Preferências do aplicativo"
    >
      <LocaleSwitcher className="bg-card shadow-md ring-1 ring-foreground/10" />
      <ThemeSwitcher />
    </div>
  );
}
