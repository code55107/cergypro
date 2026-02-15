"use client";

import { useInView } from "@/hooks/useInView";

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  tag: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const { ref, isInView } = useInView(0.2);

  const words = text.split(" ");

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="inline-block"
            style={{
              transform: isInView ? "translateY(0)" : "translateY(100%)",
              opacity: isInView ? 1 : 0,
              transition: `transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${
                delay + i * 40
              }ms, opacity 400ms ease ${delay + i * 40}ms`,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
