"use client";

interface BarData {
  label: string;
  value: number;
  active?: boolean;
}

interface RevenueBarChartProps {
  data: BarData[];
  /** Height of the SVG drawing area in px */
  height?: number;
}

const ACTIVE_COLOR = "#13368B";   // --seller-main
const INACTIVE_COLOR = "#a8b4d8"; // muted blue

function formatYLabel(value: number): string {
  if (value >= 1_000_000) return `${value / 1_000_000}M`;
  if (value >= 1_000) return `${value / 1_000}K`;
  return String(value);
}

export default function RevenueBarChart({
  data,
  height = 180,
}: RevenueBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  // Round the ceiling up to a "nice" step so the top gridline sits cleanly
  const step = 100_000;
  const chartMax = Math.ceil(maxValue / step) * step;

  // Y-axis gridlines (4 intermediate lines + 0 baseline)
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((t) =>
    Math.round(chartMax * t)
  );

  // Layout constants (in SVG user-units = px)
  const paddingLeft = 44;   // room for Y-axis labels
  const paddingRight = 8;
  const paddingTop = 8;
  const paddingBottom = 28; // room for X-axis labels
  const barGap = 6;

  const totalWidth = 320; // fixed, will scale with viewBox
  const drawWidth = totalWidth - paddingLeft - paddingRight;
  const drawHeight = height - paddingTop - paddingBottom;

  const barWidth = (drawWidth - barGap * (data.length - 1)) / data.length;

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${height}`}
      width="100%"
      aria-label="Revenue trend bar chart"
    >
      {/* ── Gridlines & Y-axis labels ── */}
      {gridLines.map((val) => {
        const y = paddingTop + drawHeight - (val / chartMax) * drawHeight;
        return (
          <g key={val}>
            <line
              x1={paddingLeft}
              y1={y}
              x2={totalWidth - paddingRight}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
            <text
              x={paddingLeft - 6}
              y={y + 4}
              textAnchor="end"
              fontSize={9}
              fill="#9ca3af"
              fontFamily="inherit"
            >
              {formatYLabel(val)}
            </text>
          </g>
        );
      })}

      {/* ── Bars ── */}
      {data.map((bar, i) => {
        const barHeight = Math.max(
          4,
          (bar.value / chartMax) * drawHeight
        );
        const x = paddingLeft + i * (barWidth + barGap);
        const y = paddingTop + drawHeight - barHeight;
        const isActive = !!bar.active;

        return (
          <g key={bar.label}>
            {/* Bar */}
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={5}
              ry={5}
              fill={isActive ? ACTIVE_COLOR : INACTIVE_COLOR}
            />

            {/* X-axis label */}
            <text
              x={x + barWidth / 2}
              y={height - 6}
              textAnchor="middle"
              fontSize={10}
              fontWeight={isActive ? 700 : 400}
              fill={isActive ? ACTIVE_COLOR : "#9ca3af"}
              fontFamily="inherit"
            >
              {bar.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
