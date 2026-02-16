import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import GlowCard from "@/components/GlowCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investor Relations — NYSE: CPRO | CergyPro",
  description:
    "CergyPro investor relations — stock information (NYSE: CPRO), financial highlights, SEC filings, earnings reports, and corporate governance. $2.1B annual revenue.",
  openGraph: {
    title: "Investor Relations | CergyPro (NYSE: CPRO)",
    description:
      "$2.1B annual revenue. 9,000+ employees. Access financial reports, SEC filings, and governance information.",
    url: "https://www.cergypro.com/investors",
  },
};

const financialHighlights = [
  { label: "Revenue (FY 2025)", value: "$2.1B" },
  { label: "Net Income", value: "$156M" },
  { label: "Diluted EPS", value: "$8.24" },
  { label: "Operating Margin", value: "10.2%" },
];

const recentFilings = [
  { date: "Jan 21, 2026", title: "Q4 2025 Earnings Report", type: "10-K" },
  { date: "Oct 30, 2025", title: "Q3 2025 Quarterly Report", type: "10-Q" },
  { date: "Jul 28, 2025", title: "Q2 2025 Quarterly Report", type: "10-Q" },
  { date: "Apr 29, 2025", title: "Q1 2025 Quarterly Report", type: "10-Q" },
  { date: "Mar 18, 2025", title: "2025 Proxy Statement", type: "DEF 14A" },
];

const pressReleases = [
  { date: "Feb 5, 2026", title: "CergyPro Awarded $480M Federal Cloud Modernization Contract" },
  { date: "Jan 21, 2026", title: "CergyPro Reports Record Q4 Revenue of $562M, Full Year Revenue Exceeds $2.1B" },
  { date: "Dec 15, 2025", title: "CergyPro Launches AI Center of Excellence, Expands Generative AI Capabilities" },
  { date: "Nov 8, 2025", title: "CergyPro Named to Forbes Best Employers for Technology for Sixth Consecutive Year" },
];

export default function InvestorsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          tag="INVESTOR RELATIONS"
          title="Delivering consistent growth through technology leadership"
          subtitle="CergyPro (NYSE: CPRO) is a $2.1B technology consulting firm delivering double-digit growth. Access earnings reports, SEC filings, and governance information."
          bgGradient="from-yellow-950/30 via-black to-black"
          bgImage="/images/investors-hero.jpg"
          bgImageAlt="Corporate glass building against a clear blue sky"
        />

        {/* Stock Info Banner */}
        <section className="bg-white border-y border-gray-200">
          <AnimateIn animation="fadeUp">
            <div className="max-w-[1400px] mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">NYSE: CPRO</p>
                    <p className="text-3xl font-light text-gray-900">$148.72</p>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span className="text-sm font-medium">+$2.34 (1.60%)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Delayed by 15 minutes. Data is for illustrative purposes only.</p>
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* Financial Highlights */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">FINANCIAL HIGHLIGHTS</p>
              <h2 className="text-3xl font-light text-gray-900 mb-12">Fiscal Year 2025</h2>
            </AnimateIn>
            <StatCounter stats={financialHighlights.map((f) => ({ value: f.value, label: f.label }))} />
          </div>
        </section>

        {/* SEC Filings */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">SEC FILINGS</p>
                  <h2 className="text-3xl font-light text-gray-900">Recent filings</h2>
                </div>
                <Link href="/investors" className="hidden md:inline-flex items-center gap-2 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:gap-3 transition-all">
                  VIEW ALL FILINGS
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </AnimateIn>
            <div className="divide-y divide-gray-200">
              {recentFilings.map((filing, i) => (
                <AnimateIn key={filing.title} animation="fadeUp" delay={i * 80}>
                  <Link href="/investors" className="group flex items-center justify-between py-5 hover:bg-gray-100/50 -mx-4 px-4 transition-colors">
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-gray-500 w-28 shrink-0">{filing.date}</span>
                      <span className="text-gray-900 group-hover:text-gray-600 transition-colors">{filing.title}</span>
                    </div>
                    <span className="text-xs text-gray-500 border border-gray-300 px-3 py-1 rounded-full shrink-0 ml-4">{filing.type}</span>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">PRESS RELEASES</p>
              <h2 className="text-3xl font-light text-gray-900 mb-10">Latest news</h2>
            </AnimateIn>
            <div className="divide-y divide-gray-200">
              {pressReleases.map((pr, i) => (
                <AnimateIn key={pr.title} animation="fadeUp" delay={i * 80}>
                  <Link href="/investors" className="group flex items-start gap-6 py-5 hover:bg-gray-100/50 -mx-4 px-4 transition-colors">
                    <span className="text-sm text-gray-500 w-28 shrink-0 pt-0.5">{pr.date}</span>
                    <span className="text-gray-900 group-hover:text-gray-600 transition-colors leading-relaxed">{pr.title}</span>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">GOVERNANCE</p>
              <h2 className="text-3xl font-light text-gray-900 mb-10">Corporate governance</h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Board of Directors", desc: "Meet the independent directors guiding our strategic direction." },
                { title: "Committee Charters", desc: "Audit, Compensation, and Governance committee charters and composition." },
                { title: "Ethics & Compliance", desc: "Our code of conduct, anti-corruption policies, and whistleblower protections." },
              ].map((item, i) => (
                <AnimateIn key={item.title} animation="fadeUp" delay={i * 120}>
                  <GlowCard className="rounded-sm h-full">
                    <Link href="/investors" className="group block bg-white p-8 rounded-sm hover:bg-gray-50 transition-all card-lift h-full">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </Link>
                  </GlowCard>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* IR Contact */}
        <section className="bg-white border-t border-gray-200">
          <AnimateIn animation="fadeUp">
            <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-light text-gray-900 mb-2">Investor Relations Contact</h3>
                <p className="text-gray-600 text-sm">ir@cergypro.com &middot; +1 (703) 555-0199</p>
              </div>
              <Link href="/contact" className="btn-shine inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors shrink-0">
                CONTACT IR TEAM
              </Link>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
