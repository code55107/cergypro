"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

export default function HighlightBanner({
  title,
  href = "#",
  bgColor = "bg-emerald-400",
  textColor = "text-black",
}: {
  title: string;
  href?: string;
  bgColor?: string;
  textColor?: string;
}) {
  const { ref, isInView } = useInView(0.2);

  return (
    <section ref={ref} className={`${bgColor} ${textColor} overflow-hidden`}>
      <Link
        href={href}
        className="group max-w-[1400px] mx-auto px-6 py-16 md:py-20 flex items-center justify-between"
      >
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light max-w-3xl leading-tight"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateX(0)" : "translateX(-60px)",
            transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {title}
        </h2>
        <svg
          className="w-10 h-10 shrink-0 ml-8 group-hover:translate-x-2 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateX(0)" : "translateX(30px)",
            transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 200ms",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </section>
  );
}
