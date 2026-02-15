"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import FeaturedCard from "@/components/FeaturedCard";
import ContentCard from "@/components/ContentCard";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";

const filters = ["All", "AI & Technology", "Climate", "Health", "Energy", "Policy"];

const articles = [
  { tag: "ARTIFICIAL INTELLIGENCE", title: "Why responsible AI governance is the next competitive advantage", description: "Organizations that embed ethical AI frameworks early are seeing measurable returns in stakeholder trust.", imageSrc: "/images/ai-governance.jpg", category: "AI & Technology" },
  { tag: "CLIMATE RESILIENCE", title: "Building adaptive infrastructure for a changing climate", description: "New approaches to infrastructure planning that account for extreme weather events and rising sea levels.", imageSrc: "/images/climate-infrastructure.jpg", category: "Climate" },
  { tag: "DIGITAL HEALTH", title: "Telehealth adoption trends reshaping federal health programs", description: "A look at how virtual care models are transforming access and outcomes across underserved communities.", imageSrc: "/images/digital-health.jpg", category: "Health" },
  { tag: "ENERGY", title: "The distributed energy revolution is closer than you think", description: "How microgrids, battery storage, and smart metering are reshaping the utility business model.", imageSrc: "/images/distributed-energy.jpg", category: "Energy" },
  { tag: "POLICY", title: "Federal cybersecurity mandates: what agencies need to know now", description: "A guide to the latest executive orders and compliance frameworks shaping federal IT security.", imageSrc: "/images/cybersecurity-policy.jpg", category: "Policy" },
  { tag: "AI & DATA", title: "From predictive to prescriptive: the next frontier in analytics", description: "Moving beyond dashboards to decision engines that recommend actions in real time.", imageSrc: "/images/analytics-dashboard.jpg", category: "AI & Technology" },
  { tag: "CLIMATE", title: "Coastal communities and the economics of managed retreat", description: "Examining the financial and social trade-offs when rising seas force relocation decisions.", imageSrc: "/images/coastal-communities.jpg", category: "Climate" },
  { tag: "HEALTH", title: "Behavioral health integration in primary care settings", description: "Breaking down silos between mental health and physical health services improves overall outcomes.", imageSrc: "/images/health-integration.jpg", category: "Health" },
  { tag: "ENERGY", title: "Electrification of transportation: infrastructure readiness", description: "Assessing grid capacity and charging infrastructure needs for the EV transition.", imageSrc: "/images/ev-infrastructure.jpg", category: "Energy" },
];

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  return (
    <>
      <Header />
      <main>
        <PageHero
          tag="INSIGHTS"
          title="Perspectives on the issues that matter"
          subtitle="Expert analysis, research, and thought leadership from across our practice areas."
          bgGradient="from-blue-950/40 via-black to-black"
        />

        {/* Filters */}
        <section className="bg-white border-b border-gray-200 sticky top-16 z-30">
          <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-2 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white font-medium scale-105"
                    : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Article */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <FeaturedCard
                tag="FEATURED INSIGHT"
                title="How generative AI is reshaping government service delivery"
                description="Federal agencies are experimenting with large language models to streamline citizen interactions, automate document processing, and accelerate decision-making. Here is what early adopters are learning."
                imageSrc="/images/generative-ai.jpg"
                href="/insights"
              />
            </AnimateIn>
          </div>
        </section>

        {/* Article Grid */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, i) => (
                <AnimateIn key={i} animation="fadeUp" delay={i % 3 * 150}>
                  <ContentCard
                    tag={article.tag}
                    title={article.title}
                    description={article.description}
                    imageSrc={article.imageSrc}
                    href="/insights"
                  />
                </AnimateIn>
              ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-gray-500 text-center py-12">
                No articles found for this category.
              </p>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
            <AnimateIn animation="fadeUp">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Stay informed
              </h2>
              <p className="text-gray-600 text-sm max-w-md mx-auto mb-8">
                Get our latest insights delivered straight to your inbox. No spam, just the perspectives that matter.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:flex-1 px-5 py-3 bg-white border border-gray-300 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
                />
                <button className="btn-shine w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors">
                  SUBSCRIBE
                </button>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
