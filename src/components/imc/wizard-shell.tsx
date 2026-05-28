"use client";

import { ChevronLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { springSnappy } from "@/lib/motion/presets";
import { cn } from "@/lib/utils";

type WizardShellProps = {
  title: string;
  subtitle?: string;
  stepIndex: number;
  totalSteps: number;
  backLabel: string;
  progressLabel: (current: number, total: number) => string;
  formatStepAria: (
    index: number,
    isCurrent: boolean,
    isComplete: boolean,
  ) => string;
  isFirst: boolean;
  onBack: () => void;
  children: ReactNode;
  footer: ReactNode;
  stepRegionRef?: RefObject<HTMLDivElement | null>;
  className?: string;
};

export function WizardShell({
  title,
  subtitle,
  stepIndex,
  totalSteps,
  backLabel,
  progressLabel,
  formatStepAria,
  isFirst,
  onBack,
  children,
  footer,
  stepRegionRef,
  className,
}: WizardShellProps) {
  const prefersReducedMotion = useReducedMotion();
  const headingId = "wizard-step-title";

  return (
    <div className={cn("flex min-h-[calc(100dvh-3rem)] flex-col", className)}>
      <header className="flex items-center justify-between gap-4 py-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 shrink-0"
          onClick={onBack}
          disabled={isFirst}
          aria-label={backLabel}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </Button>

        <nav
          className="flex items-center gap-1.5"
          aria-label={progressLabel(stepIndex + 1, totalSteps)}
        >
          <ol className="flex list-none items-center gap-1.5 p-0">
            {Array.from({ length: totalSteps }, (_, index) => {
              const isCurrent = index === stepIndex;
              const isComplete = index < stepIndex;

              return (
                <li key={index.toString()}>
                  <motion.span
                    aria-current={isCurrent ? "step" : undefined}
                    aria-label={formatStepAria(index, isCurrent, isComplete)}
                    className={cn(
                      "block size-2.5 rounded-full",
                      isComplete || isCurrent ? "bg-foreground" : "bg-card",
                    )}
                    animate={{
                      scale: prefersReducedMotion ? 1 : isCurrent ? 1.35 : 1,
                    }}
                    transition={
                      prefersReducedMotion ? { duration: 0 } : springSnappy
                    }
                  />
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="size-11 shrink-0" aria-hidden />
      </header>

      <div className="flex flex-1 flex-col gap-8 pt-4 pb-6">
        <motion.div
          key={`${stepIndex}-${title}`}
          className="space-y-2 text-center"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.22 }}
        >
          <h1
            id={headingId}
            className="font-semibold text-3xl text-foreground tracking-tight"
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {subtitle}
            </p>
          ) : null}
        </motion.div>

        <section
          ref={stepRegionRef}
          aria-labelledby={headingId}
          aria-live="polite"
          className="flex flex-1 flex-col justify-center"
        >
          {children}
        </section>
      </div>

      <footer className="sticky bottom-0 bg-transparent pt-4 pb-2">
        {footer}
      </footer>
    </div>
  );
}
