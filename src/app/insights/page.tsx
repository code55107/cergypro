import { getArticles, getFeaturedArticle } from "@/lib/sanity";
import InsightsClient from "./InsightsClient";

export const revalidate = 60;

const fallbackArticles = [
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

const fallbackFeatured = {
  tag: "FEATURED INSIGHT",
  title: "How generative AI is reshaping government service delivery",
  description: "Federal agencies are experimenting with large language models to streamline citizen interactions, automate document processing, and accelerate decision-making. Here is what early adopters are learning.",
  imageSrc: "/images/generative-ai.jpg",
};

const fallbackCategories = ["AI & Technology", "Climate", "Health", "Energy", "Policy"];

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
