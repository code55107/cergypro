"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import SearchOverlay from "./SearchOverlay";

/* ─────────────────────────────────────────────
   Mega Menu Data — structured for multi-column layout
   ───────────────────────────────────────────── */

interface MegaMenuColumn {
  heading: string;
  items: { label: string; href: string; desc?: string }[];
}

interface MegaMenuFeatured {
  tag: string;
  title: string;
  desc: string;
  href: string;
  color: string;
}

interface MegaMenuConfig {
  columns: MegaMenuColumn[];
  featured?: MegaMenuFeatured;
  viewAllLabel: string;
  viewAllHref: string;
}

const megaMenus: Record<string, MegaMenuConfig> = {
  Services: {
    columns: [
      {
        heading: "Capabilities",
        items: [
          { label: "Digital Transformation", href: "/capabilities#digital-transformation", desc: "IT strategy, platforms & operating models" },
          { label: "ServiceNow Consulting", href: "/capabilities#servicenow-consulting", desc: "Our flagship platform specialization" },
          { label: "AI & Data", href: "/capabilities#ai-data", desc: "ML, analytics & generative AI" },
          { label: "Cloud & Infrastructure", href: "/capabilities#cloud-infrastructure", desc: "Migration, DevSecOps & managed cloud" },
          { label: "Cybersecurity", href: "/capabilities#cybersecurity", desc: "Zero trust, SecOps & compliance" },
        ],
      },
      {
        heading: "Solutions",
        items: [
          { label: "Enterprise Workflow Automation", href: "/capabilities#servicenow-consulting", desc: "End-to-end process automation" },
          { label: "Platform Consolidation", href: "/capabilities#digital-transformation", desc: "Reduce tool sprawl & optimize" },
          { label: "AI-Powered Operations", href: "/capabilities#ai-data", desc: "AIOps & predictive intelligence" },
          { label: "Managed Services", href: "/capabilities#servicenow-consulting", desc: "CoE-as-a-Service & ongoing support" },
          { label: "Compliance & Risk", href: "/capabilities#cybersecurity", desc: "GRC, FedRAMP & zero trust" },
        ],
      },
      {
        heading: "Technology Partners",
        items: [
          { label: "ServiceNow", href: "/capabilities#servicenow-consulting" },
          { label: "AWS", href: "/capabilities#cloud-infrastructure" },
          { label: "Microsoft Azure", href: "/capabilities#cloud-infrastructure" },
          { label: "Google Cloud", href: "/capabilities#cloud-infrastructure" },
          { label: "Salesforce", href: "/capabilities#digital-transformation" },
          { label: "Palo Alto Networks", href: "/capabilities#cybersecurity" },
        ],
      },
    ],
    featured: {
      tag: "SPOTLIGHT",
      title: "ServiceNow Now Assist",
      desc: "Generative AI across the enterprise workflow platform. See how we deploy Now Assist for ITSM, HRSD, and CSM.",
      href: "/capabilities#servicenow-consulting",
      color: "from-cyan-500/20 to-emerald-500/20",
    },
    viewAllLabel: "View all capabilities",
    viewAllHref: "/capabilities",
  },
  Industries: {
    columns: [
      {
        heading: "Government",
        items: [
          { label: "Federal Civilian", href: "/industries", desc: "Modernizing federal agencies" },
          { label: "Defense & Intelligence", href: "/industries", desc: "Mission-critical systems" },
          { label: "State & Local", href: "/industries", desc: "Citizen service digitization" },
        ],
      },
      {
        heading: "Commercial",
        items: [
          { label: "Financial Services", href: "/industries", desc: "Digital banking & risk analytics" },
          { label: "Healthcare", href: "/industries", desc: "Clinical workflows & interoperability" },
          { label: "Energy & Utilities", href: "/industries", desc: "Grid modernization & CX platforms" },
        ],
      },
      {
        heading: "Enterprise",
        items: [
          { label: "Fortune 500", href: "/industries", desc: "Enterprise digital transformation" },
          { label: "Transportation", href: "/industries", desc: "Smart mobility & infrastructure" },
          { label: "Environmental", href: "/industries", desc: "Sustainability & compliance" },
        ],
      },
    ],
    featured: {
      tag: "CASE STUDY",
      title: "Federal ServiceNow Transformation",
      desc: "How we consolidated 12 legacy ITSM tools into a single ServiceNow platform for a major federal agency.",
      href: "/insights",
      color: "from-violet-500/20 to-blue-500/20",
    },
    viewAllLabel: "View all industries",
    viewAllHref: "/industries",
  },
  Perspectives: {
    columns: [
      {
        heading: "Topics",
        items: [
          { label: "AI & Technology", href: "/insights", desc: "GenAI, ML & emerging tech" },
          { label: "Digital Transformation", href: "/insights", desc: "Strategy & modernization" },
          { label: "Cybersecurity", href: "/insights", desc: "Threats, compliance & zero trust" },
          { label: "Cloud & Data", href: "/insights", desc: "Infrastructure & analytics" },
        ],
      },
      {
        heading: "Content",
        items: [
          { label: "All Articles", href: "/insights", desc: "Latest thought leadership" },
          { label: "Client Stories", href: "/insights", desc: "Real-world impact" },
          { label: "Research & Reports", href: "/insights", desc: "Industry analysis" },
          { label: "News & Events", href: "/insights", desc: "Company updates" },
        ],
      },
    ],
    viewAllLabel: "View all perspectives",
    viewAllHref: "/insights",
  },
  About: {
    columns: [
      {
        heading: "Company",
        items: [
          { label: "Our Mission", href: "/about", desc: "What drives us" },
          { label: "Leadership", href: "/about", desc: "Our executive team" },
          { label: "Values & Culture", href: "/about", desc: "How we work" },
          { label: "History", href: "/about", desc: "Our journey" },
        ],
      },
      {
        heading: "Join Us",
        items: [
          { label: "Careers", href: "/careers", desc: "Open positions" },
          { label: "Life at CergyPro", href: "/careers", desc: "Culture & benefits" },
          { label: "Investors", href: "/investors", desc: "Financial information" },
          { label: "Contact", href: "/contact", desc: "Get in touch" },
        ],
      },
    ],
    viewAllLabel: "Learn more about us",
    viewAllHref: "/about",
  },
};

const navItems = [
  { label: "Services", href: "/capabilities", hasDropdown: true },
  { label: "Industries", href: "/industries", hasDropdown: true },
  { label: "Perspectives", href: "/insights", hasDropdown: true },
  { label: "About", href: "/about", hasDropdown: true },
  { label: "Careers", href: "/careers", hasDropdown: false },
];

/* ─────────────────────────────────────────────
   SVG Icon components for capability areas
   ───────────────────────────────────────────── */

function CapIcon({ label }: { label: string }) {
  const base = "w-4 h-4 shrink-0 opacity-50 group-hover/link:opacity-100 transition-opacity";
  switch (label) {
    case "Digital Transformation":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case "ServiceNow Consulting":
    case "ServiceNow":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      );
    case "AI & Data":
    case "AI-Powered Operations":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      );
    case "Cloud & Infrastructure":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      );
    case "Cybersecurity":
    case "Compliance & Risk":
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      );
    default:
      return (
        <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      );
  }
}

/* ─────────────────────────────────────────────
   Header Component
   ───────────────────────────────────────────── */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleMouseEnter = useCallback((label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  }, []);

  const closeMega = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  const isActive = activeDropdown !== null;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled || isActive ? "rgba(0,0,0,0.97)" : "rgba(0,0,0,0.3)",
          backdropFilter: scrolled || isActive ? "blur(20px)" : "blur(8px)",
        }}
      >
        {/* ── Top Bar ── */}
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown ? handleMouseEnter(item.label) : undefined}
                onMouseLeave={item.hasDropdown ? handleMouseLeave : undefined}
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium tracking-wide transition-colors ${
                    activeDropdown === item.label
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                  aria-expanded={item.hasDropdown ? activeDropdown === item.label : undefined}
                  aria-haspopup={item.hasDropdown ? "true" : undefined}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      className={`w-3 h-3 opacity-50 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Contact CTA (desktop) */}
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-semibold tracking-wider uppercase border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Contact Us
            </Link>

            {/* Search */}
            <button
              className="p-2 text-gray-300 hover:text-white transition-colors hover:scale-110 transform duration-200"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Mobile Toggle */}
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

        {/* ── Active indicator line ── */}
        <div
          className="h-[1px] transition-opacity duration-300"
          style={{
            opacity: isActive ? 1 : 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent 100%)",
          }}
        />

        {/* ── DESKTOP MEGA MENU PANELS ── */}
        {navItems.filter(i => i.hasDropdown).map((item) => {
          const menu = megaMenus[item.label];
          if (!menu) return null;
          const isOpen = activeDropdown === item.label;

          return (
            <div
              key={item.label}
              className="hidden lg:block overflow-hidden transition-all duration-300 ease-out"
              style={{
                maxHeight: isOpen ? "500px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="flex gap-8">
                  {/* ── Columns ── */}
                  <div className={`flex-1 grid gap-8 ${menu.columns.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                    {menu.columns.map((col) => (
                      <div key={col.heading}>
                        <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-4 pb-2 border-b border-white/5">
                          {col.heading}
                        </h3>
                        <ul className="space-y-0.5">
                          {col.items.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                onClick={closeMega}
                                className="group/link flex items-start gap-2.5 px-2 py-2.5 -mx-2 rounded-sm hover:bg-white/[0.03] transition-colors"
                              >
                                <CapIcon label={link.label} />
                                <div className="min-w-0">
                                  <span className="block text-sm font-medium text-gray-200 group-hover/link:text-white transition-colors leading-tight">
                                    {link.label}
                                  </span>
                                  {link.desc && (
                                    <span className="block text-xs text-gray-500 group-hover/link:text-gray-400 transition-colors mt-0.5 leading-snug">
                                      {link.desc}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* ── Featured Card ── */}
                  {menu.featured && (
                    <div className="w-[280px] shrink-0">
                      <Link
                        href={menu.featured.href}
                        onClick={closeMega}
                        className={`block p-5 rounded-sm bg-gradient-to-br ${menu.featured.color} border border-white/5 hover:border-white/10 transition-all group/card`}
                      >
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent-cyan mb-2 block">
                          {menu.featured.tag}
                        </span>
                        <span className="block text-base font-semibold text-white mb-2 group-hover/card:text-accent-cyan transition-colors">
                          {menu.featured.title}
                        </span>
                        <span className="block text-xs text-gray-400 leading-relaxed mb-3">
                          {menu.featured.desc}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan group-hover/card:gap-2 transition-all">
                          Learn more
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* ── View All footer ── */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href={menu.viewAllHref}
                    onClick={closeMega}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-accent-cyan hover:text-white transition-colors"
                  >
                    {menu.viewAllLabel}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMega}
                    className="text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    Talk to an expert
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* ── MOBILE MENU ── */}
        <div
          id="mobile-menu"
          role="region"
          aria-label="Mobile navigation"
          className="lg:hidden overflow-y-auto transition-all duration-500 ease-out"
          style={{
            maxHeight: mobileOpen ? "calc(100vh - 64px)" : "0px",
            opacity: mobileOpen ? 1 : 0,
          }}
        >
          <div className="bg-black/98 backdrop-blur-md border-t border-white/5">
            <nav className="flex flex-col px-6 py-4" aria-label="Mobile navigation">
              {navItems.map((item, i) => {
                const menu = megaMenus[item.label];

                return (
                  <div key={item.label}>
                    {/* Top-level item */}
                    <div
                      className="flex items-center justify-between py-3.5 border-b border-white/5"
                      style={{
                        opacity: mobileOpen ? 1 : 0,
                        transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
                        transition: `opacity 300ms ease ${i * 50}ms, transform 300ms ease ${i * 50}ms`,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className="text-base font-medium text-gray-200 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                      {item.hasDropdown && menu && (
                        <button
                          onClick={() => setMobileAccordion(mobileAccordion === item.label ? null : item.label)}
                          className="p-1.5 text-gray-400 hover:text-white transition-colors"
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

                    {/* Mobile Accordion: Show columns as grouped sections */}
                    {item.hasDropdown && menu && (
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          maxHeight: mobileAccordion === item.label ? "1200px" : "0px",
                          opacity: mobileAccordion === item.label ? 1 : 0,
                        }}
                      >
                        <div className="pl-2 py-3 space-y-5">
                          {menu.columns.map((col) => (
                            <div key={col.heading}>
                              <span className="block text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 mb-2">
                                {col.heading}
                              </span>
                              {col.items.map((link) => (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  onClick={closeMobile}
                                  className="flex items-center gap-2.5 py-2.5 pl-2"
                                >
                                  <CapIcon label={link.label} />
                                  <div>
                                    <span className="block text-sm text-gray-300 hover:text-white transition-colors">
                                      {link.label}
                                    </span>
                                    {link.desc && (
                                      <span className="block text-xs text-gray-500">
                                        {link.desc}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ))}

                          {/* Featured card in mobile */}
                          {menu.featured && (
                            <Link
                              href={menu.featured.href}
                              onClick={closeMobile}
                              className={`block p-4 rounded-sm bg-gradient-to-br ${menu.featured.color} border border-white/5 mt-2`}
                            >
                              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent-cyan block mb-1">
                                {menu.featured.tag}
                              </span>
                              <span className="block text-sm font-semibold text-white mb-1">
                                {menu.featured.title}
                              </span>
                              <span className="block text-xs text-gray-400 leading-relaxed">
                                {menu.featured.desc}
                              </span>
                            </Link>
                          )}

                          {/* View all link */}
                          <Link
                            href={menu.viewAllHref}
                            onClick={closeMobile}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-accent-cyan pl-2 pt-1"
                          >
                            {menu.viewAllLabel}
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile contact button */}
              <div
                className="pt-4 mt-2 border-t border-white/5"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transition: `opacity 300ms ease ${navItems.length * 50}ms`,
                }}
              >
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold tracking-wider uppercase border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                >
                  Contact Us
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
