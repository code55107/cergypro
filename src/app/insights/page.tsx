import type { Metadata } from "next";
import { getArticles, getFeaturedArticle } from "@/lib/sanity";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights — AI, Cybersecurity & Digital Transformation Thought Leadership | CergyPro",
  description:
    "Expert perspectives on enterprise AI, cybersecurity, cloud modernization, government digital transformation, and energy technology from CergyPro's domain leaders.",
  openGraph: {
    title: "Insights & Perspectives | CergyPro",
    description:
      "Thought leadership on AI, cybersecurity, cloud, and digital transformation from CergyPro's technology and industry experts.",
    url: "https://www.cergypro.com/insights",
  },
};

export const revalidate = 60;

const fallbackArticles = [
  { tag: "ARTIFICIAL INTELLIGENCE", title: "From pilot to production: why AI governance is a feature, not a gate", description: "The agencies and enterprises deploying AI fastest are embedding responsible governance from day one. Here\u2019s what they\u2019re doing differently.", imageSrc: "/images/ai-governance.jpg", category: "AI & Data" },
  { tag: "CYBERSECURITY", title: "Zero trust in practice: lessons from the federal frontline", description: "How three agencies moved beyond frameworks to fully operational zero-trust architectures \u2014 and the pitfalls they avoided.", imageSrc: "/images/cybersecurity-policy.jpg", category: "Cybersecurity" },
  { tag: "ENERGY & UTILITIES", title: "Grid modernization: balancing reliability with the clean energy transition", description: "Utilities face a dual mandate \u2014 decarbonize while keeping the lights on. New approaches to grid planning are making both possible.", imageSrc: "/images/distributed-energy.jpg", category: "Energy" },
  { tag: "SERVICENOW", title: "Why ServiceNow implementations fail \u2014 and how to get them right", description: "The difference between a transformative ServiceNow rollout and costly shelf-ware comes down to three architecture decisions most teams overlook.", imageSrc: "/images/cloud-platform.jpg", category: "ServiceNow" },
  { tag: "SERVICENOW", title: "ServiceNow SecOps: unifying vulnerability and incident response on one platform", description: "Organizations running security operations across multiple tools are consolidating onto ServiceNow SecOps \u2014 and seeing 40% faster mean-time-to-resolve.", imageSrc: "/images/grants-automation.jpg", category: "ServiceNow" },
  { tag: "AI & DATA", title: "Building enterprise data platforms that actually get used", description: "Most data platform investments underdeliver because they solve for technology, not for the analysts and operators who need the data.", imageSrc: "/images/analytics-dashboard.jpg", category: "AI & Data" },
  { tag: "CYBERSECURITY", title: "The CMMC compliance roadmap: what defense contractors need to know", description: "A practical guide to achieving Cybersecurity Maturity Model Certification without stalling your business operations.", imageSrc: "/images/climate-infrastructure.jpg", category: "Cybersecurity" },
  { tag: "ENERGY", title: "AI-powered demand forecasting is transforming utility operations", description: "Utilities deploying machine learning for load prediction are seeing 15\u201320% improvements in operational efficiency and grid reliability.", imageSrc: "/images/energy-grid.jpg", category: "Energy" },
  { tag: "GOVERNMENT", title: "How state agencies are using RPA to cut processing times by 60%", description: "Robotic process automation is delivering quick wins for state governments drowning in manual processes and paper forms.", imageSrc: "/images/digital-health.jpg", category: "Government" },
];

const fallbackFeatured = {
  tag: "FEATURED INSIGHT",
  title: "The enterprise AI playbook: moving from experimentation to execution",
  description: "Most organizations have run AI pilots. Few have scaled them. Our latest analysis examines the leadership, architecture, and governance patterns that separate AI leaders from the rest \u2014 across government, energy, and commercial sectors.",
  imageSrc: "/images/generative-ai.jpg",
};

const fallbackCategories = ["ServiceNow", "AI & Data", "Cybersecurity", "Cloud & Infrastructure", "Energy", "Government"];

export default async function InsightsPage() {
  let articles = fallbackArticles;
  let featured = fallbackFeatured;
  let categories = fallbackCategories;

  try {
    const [sanityArticles, sanityFeatured] = await Promise.all([
      getArticles(),
      getFeaturedArticle(),
    ]);

    if (sanityArticles?.length > 0) {
      articles = sanityArticles.map((a: { tag: string; title: string; description: string; imageSrc: string; category: string }) => ({
        tag: a.tag,
        title: a.title,
        description: a.description,
        imageSrc: a.imageSrc,
        category: a.category,
      }));
      // Extract unique categories from the data
      const uniqueCategories = [...new Set(articles.map((a) => a.category).filter(Boolean))];
      if (uniqueCategories.length > 0) categories = uniqueCategories;
    }

    if (sanityFeatured) {
      featured = {
        tag: sanityFeatured.tag || "FEATURED INSIGHT",
        title: sanityFeatured.title,
        description: sanityFeatured.description,
        imageSrc: sanityFeatured.imageSrc,
      };
    }
  } catch (e) {
    console.error("Failed to fetch insights from Sanity, using fallback data:", e);
  }

  return (
    <InsightsClient
      articles={articles}
      featured={featured}
      categories={categories}
    />
  );
}
