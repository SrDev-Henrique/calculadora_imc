"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { MetricDisplay } from "./metric-display";

type MetricSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
  ariaLabel: string;
  showRuler?: boolean;
  formatValue?: (value: number) => string | number;
  parseInput?: (raw: string) => number | null;
  className?: string;
};

function defaultParseInput(raw: string): number | null {
  const normalized = raw.trim().replace(",", ".");
  if (normalized === "") return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function snapToStep(value: number, step: number): number {
  const decimals = step < 1 ? 1 : 0;
  const snapped = Math.round(value / step) * step;
  return Number(snapped.toFixed(decimals));
}

export function MetricSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  ariaLabel,
  showRuler = false,
  formatValue = (v) => v,
  parseInput = defaultParseInput,
  className,
}: MetricSliderProps) {
  const displayValue = formatValue(value);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const startEdit = () => {
    setEditValue(String(displayValue));
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditValue("");
  };

  const commitEdit = () => {
    const parsed = parseInput(editValue);
    if (parsed !== null) {
      const clamped = Math.min(max, Math.max(min, parsed));
      onChange(snapToStep(clamped, step));
    }
    setIsEditing(false);
    setEditValue("");
  };

  return (
    <div className={cn("flex w-full flex-col gap-8", className)}>
      <MetricDisplay
        value={displayValue}
        unit={unit}
        editable
        isEditing={isEditing}
        editValue={editValue}
        onEditStart={startEdit}
        onEditChange={setEditValue}
        onEditCommit={commitEdit}
        onEditCancel={cancelEdit}
        editAriaLabel={ariaLabel}
      />

      <div className="flex flex-col gap-4 px-2">
        {showRuler ? (
          <div aria-hidden className="relative mx-auto h-10 w-full opacity-40">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-muted-foreground/40" />
            <div className="flex h-full items-end justify-between px-1">
              {Array.from({ length: 21 }, (_, index) => (
                <span
                  key={index.toString()}
                  className={cn(
                    "w-px bg-muted-foreground/50",
                    index % 5 === 0 ? "h-6" : "h-3",
                  )}
                />
              ))}
            </div>
          </div>
        ) : null}

        <Slider
          value={[value]}
          onValueChange={([next]) => onChange(snapToStep(next, step))}
          min={min}
          max={max}
          step={step}
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${displayValue} ${unit}`}
          className={cn(
            "min-h-11 py-3",
            "**:data-[slot=slider-track]:h-2 **:data-[slot=slider-track]:bg-accent/20",
            "**:data-[slot=slider-range]:h-2 **:data-[slot=slider-range]:bg-accent!",
            "**:data-[slot=slider-thumb]:size-5 **:data-[slot=slider-thumb]:border-accent **:data-[slot=slider-thumb]:ring-accent/30",
          )}
        />

        <div className="flex justify-between text-muted-foreground text-xs">
          <span>
            {formatValue(min)} {unit}
          </span>
          <span>
            {formatValue(max)} {unit}
          </span>
        </div>
      </div>
    </div>
  );
}
