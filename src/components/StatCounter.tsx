"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const { ref, isInView } = useInView(0.3);

  // Extract numeric part and suffix (e.g., "9,000+" → 9000, "+")
  const numericMatch = value.match(/^[$]?([\d,]+(?:\.\d+)?)/);
  const rawNumber = numericMatch ? parseFloat(numericMatch[1].replace(/,/g, "")) : 0;
  const prefix = value.match(/^(\$)/) ? "$" : "";
  const suffix = value.replace(/^[$]?[\d,.]+/, "");

  const count = useCountUp(rawNumber, 2000, isInView);

  // Format with commas
  const formatted = rawNumber >= 1000
    ? count.toLocaleString("en-US", { maximumFractionDigits: rawNumber % 1 !== 0 ? 2 : 0 })
    : rawNumber % 1 !== 0
    ? count.toFixed(1)
    : Math.round(count).toString();

  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      <p className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
        {prefix}{formatted}{suffix}
      </p>
      <p className="text-gray-600 text-sm">{label}</p>
    </div>
  );
}

export default function StatCounter({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={i * 150} />
      ))}
    </div>
  );
}
