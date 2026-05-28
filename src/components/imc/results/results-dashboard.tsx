"use client";

import { motion, useReducedMotion } from "motion/react";
import { BmiWidget } from "@/components/imc/results/bmi-widget";
import { CaloriesWidget } from "@/components/imc/results/calories-widget";
import { CategoryCarousel } from "@/components/imc/results/category-carousel";
import { CategoryGrid } from "@/components/imc/results/category-grid";
import { InsightCard } from "@/components/imc/results/insight-card";
import { ShareResultsActions } from "@/components/imc/results/share-results-actions";
import { WeightRangeWidget } from "@/components/imc/results/weight-range-widget";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/locale-context";
import type { ImcResults } from "@/lib/imc/calculate";
import {
  reducedMotionTransition,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/motion/presets";

type ResultsDashboardProps = {
  results: ImcResults;
  onRestart: () => void;
};

export function ResultsDashboard({
  results,
  onRestart,
}: ResultsDashboardProps) {
  const { t } = useLocale();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col gap-5 py-4"
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        variants={staggerItemVariants}
        className="px-1"
        transition={prefersReducedMotion ? reducedMotionTransition : undefined}
      >
        <h1
          tabIndex={-1}
          className="font-semibold text-2xl text-foreground tracking-tight outline-none"
        >
          {t.results.title}
        </h1>
        <p className="mt-1 text-muted-foreground text-sm">
          {t.results.subtitle}
        </p>
      </motion.header>

      <motion.div
        variants={staggerItemVariants}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-[auto_auto]"
        transition={prefersReducedMotion ? reducedMotionTransition : undefined}
      >
        <BmiWidget results={results} className="sm:row-span-2" />
        <CaloriesWidget dailyCalories={results.dailyCalories} />
        <WeightRangeWidget healthyWeight={results.healthyWeight} />
      </motion.div>

      <motion.section
        variants={staggerItemVariants}
        aria-labelledby="classification-heading"
        className="space-y-3"
        transition={prefersReducedMotion ? reducedMotionTransition : undefined}
      >
        <h2
          id="classification-heading"
          className="px-1 font-medium text-foreground text-sm"
        >
          {t.results.classification}
        </h2>
        <CategoryCarousel activeCategory={results.category} />
        <CategoryGrid activeCategory={results.category} />
      </motion.section>

      <motion.div
        variants={staggerItemVariants}
        transition={prefersReducedMotion ? reducedMotionTransition : undefined}
      >
        <InsightCard insight={results.insight} />
      </motion.div>

      <motion.div
        variants={staggerItemVariants}
        transition={prefersReducedMotion ? reducedMotionTransition : undefined}
      >
        <ShareResultsActions results={results} />
      </motion.div>

      <motion.div
        variants={staggerItemVariants}
        transition={prefersReducedMotion ? reducedMotionTransition : undefined}
      >
        <Button
          type="button"
          size="lg"
          className="h-12 min-h-11 w-full rounded-full"
          onClick={onRestart}
        >
          {t.common.newAssessment}
        </Button>
      </motion.div>
    </motion.div>
  );
}
