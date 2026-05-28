"use client";

import { ThemeProvider } from "@teispace/next-themes";
import { FixedAppControls } from "@/components/fixed-app-controls";
import { LocaleProvider } from "@/contexts/locale-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LocaleProvider>
        {children}
        <FixedAppControls />
      </LocaleProvider>
    </ThemeProvider>
  );
}
