"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickLinks = [
  { label: "AI & Analytics", href: "/capabilities" },
  { label: "Energy & Utilities", href: "/industries" },
  { label: "ServiceNow", href: "/capabilities" },
  { label: "Federal Health", href: "/industries" },
  { label: "Cloud Solutions", href: "/capabilities" },
  { label: "Contact Us", href: "/contact" },
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="max-w-[800px] mx-auto px-6 pt-24">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase">
            SEARCH
          </p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close search"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full bg-transparent border-b border-white/20 text-white text-2xl md:text-3xl font-light py-4 pr-12 placeholder:text-gray-600 focus:outline-none focus:border-white/40 transition-colors"
            aria-label="Search query"
          />
          <svg
            className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {!query && (
          <div className="mt-12">
            <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              POPULAR SEARCHES
            </p>
            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className="px-4 py-2 border border-white/10 text-gray-300 text-sm hover:text-white hover:border-white/30 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {query && (
          <div className="mt-8">
            <p className="text-gray-500 text-sm mb-4">
              Press Enter to search for &quot;{query}&quot;
            </p>
            <div className="space-y-2">
              {[
                { label: `Search "${query}" in Insights`, href: "/insights" },
                { label: `Search "${query}" in Industries`, href: "/industries" },
                { label: `Search "${query}" in Capabilities`, href: "/capabilities" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 py-3 text-gray-300 hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
