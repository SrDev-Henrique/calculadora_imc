"use client";

import { useTheme } from "@teispace/next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme<"light" | "dark">();

  const isDark = resolvedTheme !== "light";
  const nextTheme = isDark ? "light" : "dark";

  return (
    <div className="flex items-center justify-center rounded-full bg-accent p-0.5 text-accent-foreground shadow-md ring-1 ring-accent-foreground/20">
      <button
        type="button"
        aria-label={`Ativar tema ${isDark ? "claro" : "escuro"}`}
        aria-pressed={isDark}
        className="relative h-9 w-14 rounded-full transition-colors duration-300 hover:bg-accent-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        onClick={() => setTheme(nextTheme)}
      >
        <motion.span
          className="absolute top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-background text-accent shadow-sm"
          initial={false}
          animate={{ x: isDark ? 2 : 24 }}
          transition={{ duration: 0.3, ease: "easeInOut", type: "spring" }}
        >
          {isDark ? (
            <Moon className="size-3.5 stroke-[2.4]" aria-hidden />
          ) : (
            <Sun className="size-3.5 stroke-[2.4]" aria-hidden />
          )}
        </motion.span>
      </button>
    </div>
  );
}
