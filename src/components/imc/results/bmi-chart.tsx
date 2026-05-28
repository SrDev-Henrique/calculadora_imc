"use client";

import { Bar, BarChart, Cell, ReferenceLine, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BMI_CATEGORY_KEYS,
  BMI_CATEGORY_WIDGET_COLORS,
} from "@/lib/imc/constants";

const BMI_CHART_MIN = 15;
const BMI_CHART_MAX = 40;

const chartConfig = {
  underweight: {
    label: "Magreza",
    color: BMI_CATEGORY_WIDGET_COLORS.underweight,
  },
  normal: {
    label: "Normal",
    color: BMI_CATEGORY_WIDGET_COLORS.normal,
  },
  overweight: {
    label: "Sobrepeso",
    color: BMI_CATEGORY_WIDGET_COLORS.overweight,
  },
  obese: {
    label: "Obesidade",
    color: BMI_CATEGORY_WIDGET_COLORS.obese,
  },
} as const;

const RANGE_SEGMENTS = [
  {
    key: "underweight",
    span: 18.5 - BMI_CHART_MIN,
    rangeLabel: "< 18,5",
  },
  { key: "normal", span: 25 - 18.5, rangeLabel: "18,5 – 24,9" },
  { key: "overweight", span: 30 - 25, rangeLabel: "25 – 29,9" },
  { key: "obese", span: BMI_CHART_MAX - 30, rangeLabel: "≥ 30" },
] as const;

const chartData = [
  {
    label: "Faixas OMS",
    ...Object.fromEntries(RANGE_SEGMENTS.map((s) => [s.key, s.span])),
  },
];

type BmiChartProps = {
  bmi: number;
  className?: string;
};

export function BmiChart({ bmi, className }: BmiChartProps) {
  const clampedBmi = Math.min(Math.max(bmi, BMI_CHART_MIN), BMI_CHART_MAX);

  return (
    <ChartContainer
      config={chartConfig}
      className={className}
      initialDimension={{ width: 280, height: 72 }}
    >
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
        barCategoryGap={0}
        barSize={20}
      >
        <XAxis type="number" domain={[0, BMI_CHART_MAX - BMI_CHART_MIN]} hide />
        <YAxis type="category" dataKey="label" hide />
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value, name) => {
                const segment = RANGE_SEGMENTS.find((s) => s.key === name);
                return [
                  `${segment?.rangeLabel ?? ""} (extensão ${Number(value).toFixed(1)})`,
                  chartConfig[name as keyof typeof chartConfig]?.label ?? name,
                ];
              }}
            />
          }
        />
        {BMI_CATEGORY_KEYS.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            stackId="bmi"
            radius={
              key === "underweight"
                ? [6, 0, 0, 6]
                : key === "obese"
                  ? [0, 6, 6, 0]
                  : 0
            }
          >
            <Cell fill={`var(--color-${key})`} />
          </Bar>
        ))}
        <ReferenceLine
          x={clampedBmi - BMI_CHART_MIN}
          stroke="var(--foreground)"
          strokeWidth={2}
          ifOverflow="extendDomain"
          label={{
            value: bmi.toFixed(1),
            position: "top",
            fill: "var(--foreground)",
            fontSize: 11,
            fontWeight: 600,
          }}
        />
      </BarChart>
    </ChartContainer>
  );
}
