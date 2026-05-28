"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  reducedMotionTransition,
  reducedMotionWizardStep,
  wizardStepTransition,
  wizardStepVariants,
} from "@/lib/motion/presets";

type WizardStepTransitionProps = {
  stepKey: string;
  direction: number;
  children: ReactNode;
};

export function WizardStepTransition({
  stepKey,
  direction,
  children,
}: WizardStepTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={stepKey}
        custom={direction}
        variants={
          prefersReducedMotion ? reducedMotionWizardStep : wizardStepVariants
        }
        initial="enter"
        animate="center"
        exit="exit"
        transition={
          prefersReducedMotion ? reducedMotionTransition : wizardStepTransition
        }
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
