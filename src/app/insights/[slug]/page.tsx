import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Insight Detail",
};

const fallbackArticle = {
  tag: "ARTIFICIAL INTELLIGENCE",
  title: "Why responsible AI governance is the next competitive advantage",
  description:
    "Organizations that embed ethical AI frameworks early are seeing measurable returns in stakeholder trust, regulatory readiness, and operational efficiency.",
  imageSrc: "/images/ai-governance.jpg",
  body: [
    "As artificial intelligence becomes embedded in nearly every industry, the question is no longer whether to adopt AI, but how to do so responsibly. Organizations that move early to establish governance frameworks are finding that ethical AI is not just a compliance requirement — it is a strategic differentiator.",
    "CergyPro has been working with federal agencies and commercial clients to develop AI governance frameworks that balance innovation with accountability. Our approach emphasizes transparency, fairness, and human oversight at every stage of the AI lifecycle.",
    "Key components of a robust AI governance program include clear policies for data usage and model development, bias detection and mitigation processes, explainability requirements for high-stakes decisions, and continuous monitoring of deployed models.",
    "The organizations seeing the greatest returns are those that treat AI governance as a cross-functional initiative, bringing together technologists, ethicists, legal counsel, and business leaders to shape policies that are both rigorous and practical.",
  ],
};

export default function InsightDetailPage() {
  const article = fallbackArticle;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.cergypro.com" },
          { name: "Insights", url: "https://www.cergypro.com/insights" },
          { name: article.title, url: "https://www.cergypro.com/insights/article" },
        ]}
      />
      <Header />
      <main>
        <section className="pt-32 pb-12 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900 transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Insights
            </Link>
            <p className="text-accent-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              {article.tag}
            </p>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {article.description}
            </p>
          </div>
        </section>

        <section className="bg-white pb-8">
          <div className="max-w-[800px] mx-auto px-6">
            <div className="aspect-[16/9] relative rounded-sm overflow-hidden mb-12">
              <Image
                src={article.imageSrc}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          </div>
        </section>

        <article className="bg-white pb-20">
          <div className="max-w-[800px] mx-auto px-6 space-y-6">
            {article.body.map((paragraph, i) => (
              <p key={i} className="text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <section className="bg-white border-t border-gray-200">
          <div className="max-w-[800px] mx-auto px-6 py-12 flex items-center justify-between">
            <Link
              href="/insights"
              className="text-gray-900 text-sm font-semibold tracking-wider uppercase hover:text-gray-600 transition-colors"
            >
              VIEW ALL INSIGHTS
            </Link>
            <Link
              href="/contact"
              className="btn-shine inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors"
            >
              TALK TO AN EXPERT
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
