"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function SectionHeading({
  label,
  title,
  linkText,
  linkHref,
}: {
  label?: string;
  title: string;
  linkText?: string;
  linkHref?: string;
}) {
  const { ref, isInView } = useInView(0.2);

  return (
    <div ref={ref} className="flex items-end justify-between mb-10">
      <div>
        {label && (
          <p
            className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {label}
          </p>
        )}
        <h2
          className="text-3xl md:text-4xl font-light text-gray-900"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1) 100ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 100ms",
          }}
        >
          {title}
        </h2>
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="hidden md:inline-flex items-center gap-2 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:gap-3 transition-all shrink-0"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateX(0)" : "translateX(20px)",
            transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 200ms",
          }}
        >
          {linkText}
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
