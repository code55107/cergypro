"use client";

import { useState } from "react";
import Link from "next/link";
import AnimateIn from "./AnimateIn";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setState("submitting");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setState("success");
  };

  if (state === "success") {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 animate-[scaleUp_400ms_ease-out]">
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-600 text-sm">You&apos;re subscribed! Check your inbox for a confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          disabled={state === "submitting"}
          aria-invalid={!!error}
          className={`w-full px-4 py-3 bg-white border text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none transition-colors ${error ? "border-red-400" : "border-gray-300 focus:border-gray-900"}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-shine px-6 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors disabled:opacity-50 shrink-0"
      >
        {state === "submitting" ? "SUBSCRIBING..." : "SUBSCRIBE"}
      </button>
    </form>
  );
}

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
                href="/insights"
                className="inline-flex items-center gap-2 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:gap-3 transition-all"
              >
                LEARN MORE
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
              <NewsletterForm />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
