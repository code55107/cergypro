"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "Industries", href: "/industries", hasDropdown: true },
  { label: "Capabilities", href: "/capabilities", hasDropdown: true },
  { label: "Insights", href: "/insights", hasDropdown: true },
  { label: "About", href: "/about", hasDropdown: true },
  { label: "Careers", href: "/careers", hasDropdown: false },
  { label: "Investors", href: "/investors", hasDropdown: false },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.3)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            width="40"
            height="28"
            viewBox="0 0 40 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:scale-110 transition-transform duration-300"
          >
            <path
              d="M8 4L4 14L8 24M16 4H24M16 14H22M16 24H24M32 4L36 14L32 24"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-white font-bold text-lg tracking-tight">
            CergyPro
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex items-center gap-1 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors hover-underline"
            >
              {item.label}
              {item.hasDropdown && (
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className="lg:hidden overflow-hidden transition-all duration-500 ease-out"
        style={{
          maxHeight: mobileOpen ? "400px" : "0px",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div className="bg-black/95 backdrop-blur-md border-t border-white/5">
          <nav className="flex flex-col px-6 py-4">
            {navItems.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3 text-sm text-gray-300 hover:text-white border-b border-white/5 transition-colors"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 300ms ease ${i * 50}ms, transform 300ms ease ${i * 50}ms`,
                }}
              >
                {item.label}
                {item.hasDropdown && (
                  <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
