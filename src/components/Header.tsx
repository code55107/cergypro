"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SearchOverlay from "./SearchOverlay";

const megaMenuData: Record<string, { label: string; href: string }[]> = {
  Industries: [
    { label: "Energy & Utilities", href: "/industries" },
    { label: "Federal Health", href: "/industries" },
    { label: "Disaster Management", href: "/industries" },
    { label: "Transportation", href: "/industries" },
    { label: "Environmental Services", href: "/industries" },
    { label: "Climate Resilience", href: "/industries" },
    { label: "Aviation", href: "/industries" },
    { label: "U.S. Federal", href: "/industries" },
    { label: "Social Programs", href: "/industries" },
  ],
  Capabilities: [
    { label: "Digital Modernization", href: "/capabilities" },
    { label: "Artificial Intelligence", href: "/capabilities" },
    { label: "Data & Analytics", href: "/capabilities" },
    { label: "Cloud", href: "/capabilities" },
    { label: "Cybersecurity", href: "/capabilities" },
    { label: "Strategy & Innovation", href: "/capabilities" },
    { label: "Experience & Design", href: "/capabilities" },
    { label: "Strategic Communications", href: "/capabilities" },
  ],
  Insights: [
    { label: "All Topics", href: "/insights" },
    { label: "AI & Technology", href: "/insights" },
    { label: "Climate & Energy", href: "/insights" },
    { label: "Health", href: "/insights" },
    { label: "Policy", href: "/insights" },
    { label: "Client Stories", href: "/insights" },
  ],
  About: [
    { label: "Our Mission", href: "/about" },
    { label: "Leadership", href: "/about" },
    { label: "History", href: "/about" },
    { label: "Values", href: "/about" },
    { label: "Corporate Citizenship", href: "/about" },
    { label: "Careers", href: "/careers" },
  ],
};

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.3)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group" aria-label="CergyPro home">
            <svg
              width="40"
              height="28"
              viewBox="0 0 40 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
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

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown ? handleMouseEnter(item.label) : undefined}
                onMouseLeave={item.hasDropdown ? handleMouseLeave : undefined}
              >
                <Link
                  href={item.href}
                  className="relative flex items-center gap-1 px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors hover-underline"
                  aria-expanded={item.hasDropdown ? activeDropdown === item.label : undefined}
                  aria-haspopup={item.hasDropdown ? "true" : undefined}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      className={`w-3 h-3 opacity-60 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Mega Menu Dropdown */}
                {item.hasDropdown && megaMenuData[item.label] && (
                  <div
                    className="absolute top-full left-0 pt-2 transition-all duration-200"
                    style={{
                      opacity: activeDropdown === item.label ? 1 : 0,
                      pointerEvents: activeDropdown === item.label ? "auto" : "none",
                      transform: activeDropdown === item.label ? "translateY(0)" : "translateY(-8px)",
                    }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-black/95 backdrop-blur-md border border-white/10 rounded-sm min-w-[240px] py-3">
                      {megaMenuData[item.label].map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="block px-5 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {link.label}
                        </Link>
                      ))}
                      <div className="border-t border-white/10 mt-2 pt-2 px-5">
                        <Link
                          href={item.href}
                          className="text-xs text-accent-cyan hover:text-white transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          View all {item.label.toLowerCase()} →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="p-2 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Accordion */}
        <div
          id="mobile-menu"
          role="region"
          aria-label="Mobile navigation"
          className="lg:hidden overflow-hidden transition-all duration-500 ease-out"
          style={{
            maxHeight: mobileOpen ? "600px" : "0px",
            opacity: mobileOpen ? 1 : 0,
          }}
        >
          <div className="bg-black/95 backdrop-blur-md border-t border-white/5">
            <nav className="flex flex-col px-6 py-4" aria-label="Mobile navigation">
              {navItems.map((item, i) => (
                <div key={item.label}>
                  <div
                    className="flex items-center justify-between py-3 border-b border-white/5"
                    style={{
                      opacity: mobileOpen ? 1 : 0,
                      transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
                      transition: `opacity 300ms ease ${i * 50}ms, transform 300ms ease ${i * 50}ms`,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                    {item.hasDropdown && (
                      <button
                        onClick={() => setMobileAccordion(mobileAccordion === item.label ? null : item.label)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                        aria-expanded={mobileAccordion === item.label}
                        aria-label={`Expand ${item.label} submenu`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === item.label ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Accordion Sub-items */}
                  {item.hasDropdown && megaMenuData[item.label] && (
                    <div
                      className="overflow-hidden transition-all duration-300"
                      style={{
                        maxHeight: mobileAccordion === item.label ? `${megaMenuData[item.label].length * 40}px` : "0px",
                        opacity: mobileAccordion === item.label ? 1 : 0,
                      }}
                    >
                      <div className="pl-4 py-1">
                        {megaMenuData[item.label].map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-xs text-gray-500 hover:text-white transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
