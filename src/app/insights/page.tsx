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
  { slug: "ai-governance-competitive-advantage", tag: "ARTIFICIAL INTELLIGENCE", title: "From pilot to production: why AI governance is a feature, not a gate", description: "The agencies and enterprises deploying AI fastest are embedding responsible governance from day one. Here\u2019s what they\u2019re doing differently.", imageSrc: "/images/ai-governance.jpg", category: "AI & Data" },
  { slug: "grid-modernization-clean-energy", tag: "ENERGY & UTILITIES", title: "Grid modernization: balancing reliability with the clean energy transition", description: "Utilities face a dual mandate \u2014 decarbonize while keeping the lights on. New approaches to grid planning are making both possible.", imageSrc: "/images/distributed-energy.jpg", category: "Energy" },
  { slug: "servicenow-implementations-right", tag: "SERVICENOW", title: "ServiceNow ITSM at scale: lessons from enterprise and federal deployments", description: "The difference between a transformative ServiceNow rollout and costly shelf-ware comes down to three architecture decisions most teams overlook.", imageSrc: "/images/servicenow-itsm.jpg", category: "ServiceNow" },
  { slug: "enterprise-data-platforms", tag: "AI & DATA", title: "Building enterprise data platforms that actually get used", description: "Most data platform investments underdeliver because they solve for technology, not for the analysts and operators who need the data.", imageSrc: "/images/energy-grid.jpg", category: "AI & Data" },
  { slug: "cmmc-compliance-roadmap", tag: "CYBERSECURITY", title: "The CMMC compliance roadmap: what defense contractors need to know", description: "A practical guide to achieving Cybersecurity Maturity Model Certification without stalling your business operations.", imageSrc: "/images/cmmc-compliance.jpg", category: "Cybersecurity" },
  { slug: "ai-demand-forecasting-utilities", tag: "ENERGY", title: "AI-powered demand forecasting is transforming utility operations", description: "Utilities deploying machine learning for load prediction are seeing 15\u201320% improvements in operational efficiency and grid reliability.", imageSrc: "/images/analytics-dashboard.jpg", category: "Energy" },
  { slug: "astrazeneca-servicenow", tag: "ASTRAZENECA · HEALTHCARE", title: "AstraZeneca saves 30,000+ hours annually by replacing manual tasks with AI-powered automation", description: "How one of the world\u2019s largest pharmaceutical companies unified 60,000 laboratory requests and transformed employee onboarding using ServiceNow.", imageSrc: "/images/az-hero.jpg", category: "Client Stories" },
  { slug: "siemens-servicenow", tag: "SIEMENS · MANUFACTURING", title: "Siemens saves 1 million hours through automation while resolving 210,000 tickets monthly", description: "How a global industrial conglomerate unified HR, Finance, and Procurement services for 360,000+ employees using ServiceNow.", imageSrc: "/images/siemens-hero.jpg", category: "Client Stories" },
  { slug: "bell-canada-servicenow", tag: "BELL CANADA · TELECOM", title: "Bell Canada deflects 3 million customer support calls annually with ServiceNow", description: "How Canada\u2019s largest telecom transformed customer service and field operations using AI-powered Virtual Repair and Field Service Management.", imageSrc: "/images/bell-hero.jpg", category: "Client Stories" },
];

const fallbackFeatured = {
  slug: "sla-aerospace-industry",
  tag: "FEATURED INSIGHT",
  title: "SLA management in aerospace: why precision in service commitments defines mission success",
  description: "In aerospace and defense, a missed service level agreement is not a billing dispute \u2014 it is a mission risk. Our latest analysis explores how leading aerospace organizations are using technology to transform SLA management from reactive contract enforcement into a proactive operational capability.",
  imageSrc: "/images/industry-aviation.jpg",
};

const fallbackCategories = ["ServiceNow", "AI & Data", "Cybersecurity", "Cloud & Infrastructure", "Energy", "Client Stories"];

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
      articles = sanityArticles.map((a: { slug?: string; tag: string; title: string; description: string; imageSrc: string; category: string }) => ({
        slug: a.slug || a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
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
        slug: sanityFeatured.slug || sanityFeatured.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
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
