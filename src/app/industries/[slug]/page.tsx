import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Industry Detail",
};

const fallbackIndustry = {
  name: "Energy & Utilities",
  description:
    "Helping energy providers modernize grids, engage customers, and transition to clean energy solutions.",
  image: "/images/industry-energy.jpg",
  overview:
    "The energy sector is undergoing a rapid transformation driven by decarbonization, distributed energy resources, and rising customer expectations. CergyPro partners with utilities, regulators, and energy providers to navigate this transition with technology, data, and deep domain expertise.",
  capabilities: [
    "Grid modernization and smart metering",
    "Customer engagement platforms powered by AI",
    "Demand forecasting and load management",
    "Renewable energy integration planning",
    "Regulatory compliance and rate case support",
    "Electric vehicle infrastructure strategy",
  ],
  stats: [
    { value: "50+", label: "Utility clients served" },
    { value: "12M+", label: "Customer accounts managed" },
    { value: "40%", label: "Improvement in outage response" },
  ],
};

export default function IndustryDetailPage() {
  const industry = fallbackIndustry;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.cergypro.com" },
          { name: "Industries", url: "https://www.cergypro.com/industries" },
          { name: industry.name, url: "https://www.cergypro.com/industries/energy-utilities" },
        ]}
      />
      <Header />
      <main>
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-cyan-950/40 via-black to-black overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={industry.image}
              alt=""
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 max-w-[1400px] mx-auto px-6">
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              All Industries
            </Link>
            <h1 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6">
              {industry.name}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              {industry.description}
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">OVERVIEW</p>
                  <p className="text-gray-600 leading-relaxed">{industry.overview}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">KEY CAPABILITIES</p>
                  <ul className="space-y-3">
                    {industry.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-3 text-gray-600 text-sm">
                        <svg className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-white border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 py-16">
            <AnimateIn animation="fadeUp">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {industry.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl md:text-4xl font-light text-gray-900 mb-2">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        <section className="bg-white border-t border-gray-200">
          <AnimateIn animation="fadeUp">
            <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
              <h2 className="text-2xl font-light text-gray-900">
                Ready to transform your energy operations?
              </h2>
              <Link
                href="/contact"
                className="btn-shine inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors shrink-0"
              >
                TALK TO AN EXPERT
              </Link>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
