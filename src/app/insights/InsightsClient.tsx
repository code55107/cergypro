"use client";

import { useState } from "react";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import FeaturedCard from "@/components/FeaturedCard";
import ContentCard from "@/components/ContentCard";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";

interface Article {
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
}

interface FeaturedArticle {
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
}

interface InsightsClientProps {
  articles: Article[];
  featured: FeaturedArticle;
  categories: string[];
}

export default function InsightsClient({ articles, featured, categories }: InsightsClientProps) {
  const filters = ["All", ...categories];
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
          title="Expert perspectives on technology and transformation"
          subtitle="Thought leadership, technical analysis, and strategic guidance from CergyPro\u2019s AI, cybersecurity, cloud, and industry experts."
          bgGradient="from-blue-950/40 via-black to-black"
          bgImage="/images/insights-hero.jpg"
          bgImageAlt="Deep teal abstract ocean depths"
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
                tag={featured.tag}
                title={featured.title}
                description={featured.description}
                imageSrc={featured.imageSrc}
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
