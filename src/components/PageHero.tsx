"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function PageHero({
  breadcrumb,
  breadcrumbHref = "/",
  tag,
  title,
  subtitle,
  bgGradient = "from-purple-950/50 via-black to-black",
}: {
  breadcrumb?: string;
  breadcrumbHref?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  bgGradient?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className={`relative pt-32 pb-20 bg-gradient-to-br ${bgGradient} overflow-hidden`}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {breadcrumb && (
          <Link
            href={breadcrumbHref}
            className="inline-flex items-center gap-2 text-gray-400 text-sm mb-6 hover:text-white transition-colors"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1) 100ms, transform 500ms cubic-bezier(0.16,1,0.3,1) 100ms",
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {breadcrumb}
          </Link>
        )}
        {tag && (
          <p
            className="text-accent-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 500ms cubic-bezier(0.16,1,0.3,1) 200ms",
            }}
          >
            {tag}
          </p>
        )}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1] mb-6 max-w-3xl"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1) 300ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 300ms",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-gray-400 text-lg max-w-2xl"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1) 500ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 500ms",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
