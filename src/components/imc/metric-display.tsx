"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type MetricDisplayProps = {
  value: number | string;
  unit?: string;
  className?: string;
  editable?: boolean;
  isEditing?: boolean;
  editValue?: string;
  onEditStart?: () => void;
  onEditChange?: (value: string) => void;
  onEditCommit?: () => void;
  onEditCancel?: () => void;
  editAriaLabel?: string;
};

export function MetricDisplay({
  value,
  unit,
  className,
  editable = false,
  isEditing = false,
  editValue = "",
  onEditStart,
  onEditChange,
  onEditCommit,
  onEditCancel,
  editAriaLabel,
}: MetricDisplayProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div
        className={cn("flex items-baseline justify-center gap-2", className)}
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={editValue}
          onChange={(event) => onEditChange?.(event.target.value)}
          onBlur={() => onEditCommit?.()}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onEditCommit?.();
            }
            if (event.key === "Escape") {
              event.preventDefault();
              onEditCancel?.();
            }
          }}
          aria-label={editAriaLabel}
          className={cn(
            "w-[min(100%,12rem)] border-0 border-accent border-b-2 bg-transparent p-0",
            "text-center font-semibold text-6xl text-accent tracking-tight outline-none",
            "focus-visible:ring-0",
          )}
        />
        {unit ? (
          <span className="font-medium text-2xl text-accent">{unit}</span>
        ) : null}
      </div>
    );
  }

  if (editable) {
    return (
      <button
        type="button"
        onClick={onEditStart}
        aria-label={editAriaLabel}
        className={cn(
          "flex items-baseline justify-center gap-2 rounded-lg transition-colors",
          "hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          className,
        )}
      >
        <span className="font-semibold text-6xl text-accent tracking-tight">
          {value}
        </span>
        {unit ? (
          <span className="font-medium text-2xl text-accent">{unit}</span>
        ) : null}
      </button>
    );
  }

  return (
    <div className={cn("flex items-baseline justify-center gap-2", className)}>
      <span className="font-semibold text-6xl text-accent tracking-tight">
        {value}
      </span>
      {unit ? (
        <span className="font-medium text-2xl text-accent">{unit}</span>
      ) : null}
    </div>
  );
}
