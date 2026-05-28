"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  reducedMotionTransition,
  resultsPanelVariants,
} from "@/lib/motion/presets";

type CalculatorViewTransitionProps = {
  viewKey: "wizard" | "results";
  children: ReactNode;
};

export function CalculatorViewTransition({
  viewKey,
  children,
}: CalculatorViewTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewKey}
        variants={resultsPanelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={prefersReducedMotion ? reducedMotionTransition : undefined}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
