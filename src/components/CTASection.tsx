"use client";

import Link from "next/link";
import AnimateIn from "./AnimateIn";

export default function CTASection() {
  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimateIn animation="fadeUp" delay={0}>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Our client stories
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Discover how we help clients achieve success.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:gap-3 transition-all"
              >
                LEARN MORE
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn animation="fadeUp" delay={150}>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Insights in your inbox
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Receive perspectives on the industries and issues that matter.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:gap-3 transition-all"
              >
                SUBSCRIBE
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
