import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import type { HeroSlide } from "@/components/Hero";

export const metadata: Metadata = {
  title: "CergyPro - Technology Consulting, AI & Digital Transformation",
  description:
    "CergyPro is a global technology consulting firm delivering AI, analytics, cybersecurity, and digital transformation for government, commercial, and energy clients. 9,000+ professionals worldwide.",
  openGraph: {
    title: "CergyPro - Technology Consulting, AI & Digital Transformation",
    description:
      "Global technology consulting delivering AI, analytics, cybersecurity, and digital transformation across government, commercial, and energy sectors.",
    url: "https://www.cergypro.com",
  },
};
import FeaturedCard from "@/components/FeaturedCard";
import ContentCard from "@/components/ContentCard";
import SectionHeading from "@/components/SectionHeading";
import HighlightBanner from "@/components/HighlightBanner";
import StatCounter from "@/components/StatCounter";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import { getSiteSettings, getArticles, getFeaturedArticle } from "@/lib/sanity";

export const revalidate = 60;

// Fallback data used when Sanity has no content yet
const fallbackSlides: HeroSlide[] = [
  {
    tag: "AI & ANALYTICS",
    title: "Turning complexity\ninto clarity",
    subtitle: "Enterprise-grade AI and advanced analytics that help organizations make faster, smarter decisions at scale.",
    cta: "EXPLORE AI SOLUTIONS",
    image: "/images/hero-1.jpg",
  },
  {
    tag: "CUSTOMER PLATFORMS",
    title: "The most trusted\nutility platform\njust got smarter",
    subtitle: "Sightline\u00AE now responsibly powered with AI \u2014 delivering personalized customer engagement at scale.",
    cta: "DISCOVER SIGHTLINE",
    image: "/images/hero-2.jpg",
  },
  {
    tag: "GOVERNMENT MODERNIZATION",
    title: "Modernizing the\nmissions that matter\nmost",
    subtitle: "Helping federal, state, and local agencies accelerate digital transformation while strengthening security.",
    cta: "SEE OUR WORK",
    image: "/images/hero-3.jpg",
  },
];

const fallbackStats = [
  { value: "9,000+", label: "Employees worldwide" },
  { value: "70+", label: "Global office locations" },
  { value: "$2.1B", label: "Annual revenue (FY 2025)" },
  { value: "45+", label: "Years of expertise" },
];

const fallbackArticles = [
  {
    tag: "ARTIFICIAL INTELLIGENCE",
    title: "From pilot to production: why AI governance is a feature, not a gate",
    description: "The agencies and enterprises deploying AI fastest are embedding responsible governance from day one. Here\u2019s what they\u2019re doing differently.",
    imageSrc: "/images/ai-governance.jpg",
  },
  {
    tag: "CYBERSECURITY",
    title: "Zero trust in practice: lessons from the federal frontline",
    description: "How three agencies moved beyond frameworks to fully operational zero-trust architectures \u2014 and the pitfalls they avoided.",
    imageSrc: "/images/cybersecurity-policy.jpg",
  },
  {
    tag: "ENERGY & UTILITIES",
    title: "Grid modernization: balancing reliability with the clean energy transition",
    description: "Utilities face a dual mandate \u2014 decarbonize while keeping the lights on. New approaches to grid planning are making both possible.",
    imageSrc: "/images/distributed-energy.jpg",
  },
];

const fallbackWebinars = [
  {
    tag: "WEBINAR",
    title: "Enterprise AI governance: building trust at scale",
    imageSrc: "/images/generative-ai.jpg",
  },
  {
    tag: "WEBINAR",
    title: "Modernizing legacy systems without disrupting operations",
    imageSrc: "/images/cloud-platform.jpg",
  },
  {
    tag: "VIRTUAL EVENT",
    title: "CergyPro Perspectives: The future of digital government",
    imageSrc: "/images/innovation-summit.jpg",
  },
];

const fallbackStories = [
  {
    tag: "CLIENT STORY",
    title: "Saving a federal agency $140M annually through cloud-native modernization",
    imageSrc: "/images/digital-health.jpg",
  },
  {
    tag: "CLIENT STORY",
    title: "Building a real-time analytics platform serving 12 million utility customers",
    imageSrc: "/images/utility-engagement.jpg",
  },
  {
    tag: "CLIENT STORY",
    title: "Deploying an AI-driven threat detection system across 50 state networks",
    imageSrc: "/images/analytics-dashboard.jpg",
  },
];

const fallbackFeatured = {
  tag: "THOUGHT LEADERSHIP",
  title: "The enterprise AI playbook: moving from experimentation to execution",
  description: "Most organizations have run AI pilots. Few have scaled them. Our latest report examines the leadership, architecture, and governance patterns that separate AI leaders from the rest \u2014 across government, energy, and commercial sectors.",
  imageSrc: "/images/climate-infrastructure.jpg",
};

export default async function Home() {
  // Fetch data from Sanity (falls back to hardcoded data if empty)
  let heroSlides = fallbackSlides;
  let stats = fallbackStats;
  let bannerTitle = "Navigating complexity demands more than technology \u2014 it demands a partner who understands your mission";
  let bannerColor = "bg-emerald-400";
  let articles = fallbackArticles;
  let webinars = fallbackWebinars;
  let stories = fallbackStories;
  let featured = fallbackFeatured;

  try {
    const [settings, sanityArticles, sanityWebinars, sanityStories, sanityFeatured] = await Promise.all([
      getSiteSettings(),
      getArticles("article"),
      getArticles("webinar"),
      getArticles("client-story"),
      getFeaturedArticle(),
    ]);

    if (settings?.heroSlides?.length > 0) {
      heroSlides = settings.heroSlides.map((s: { tag: string; title: string; subtitle: string; cta: string; image: string }) => ({
        tag: s.tag,
        title: s.title,
        subtitle: s.subtitle,
        cta: s.cta,
        image: s.image,
      }));
    }
    if (settings?.stats?.length > 0) stats = settings.stats;
    if (settings?.bannerTitle) bannerTitle = settings.bannerTitle;
    if (settings?.bannerColor) bannerColor = settings.bannerColor;

    if (sanityArticles?.length > 0) {
      articles = sanityArticles.slice(0, 3).map((a: { tag: string; title: string; description: string; imageSrc: string }) => ({
        tag: a.tag,
        title: a.title,
        description: a.description,
        imageSrc: a.imageSrc,
      }));
    }

    if (sanityWebinars?.length > 0) {
      webinars = sanityWebinars.slice(0, 3).map((w: { tag: string; title: string; imageSrc: string }) => ({
        tag: w.tag,
        title: w.title,
        imageSrc: w.imageSrc,
      }));
    }

    if (sanityStories?.length > 0) {
      stories = sanityStories.slice(0, 3).map((s: { tag: string; title: string; imageSrc: string }) => ({
        tag: s.tag,
        title: s.title,
        imageSrc: s.imageSrc,
      }));
    }

    if (sanityFeatured) {
      featured = {
        tag: sanityFeatured.tag || "CASE STUDY",
        title: sanityFeatured.title,
        description: sanityFeatured.description,
        imageSrc: sanityFeatured.imageSrc,
      };
    }
  } catch (e) {
    console.error("Failed to fetch from Sanity, using fallback data:", e);
  }

  return (
    <>
      <Header />
      <main>
        <Hero slides={heroSlides} />

        {/* Featured Content */}
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
            <SectionHeading
              label="Latest Insights"
              title="Perspectives that matter"
              linkText="Explore all"
              linkHref="/insights"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <AnimateIn key={i} animation="fadeUp" delay={i * 150}>
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
          </div>
        </section>

        {/* Highlight Banner */}
        <HighlightBanner
          title={bannerTitle}
          bgColor={bannerColor}
          textColor="text-black"
          href="/capabilities"
        />

        {/* Stats Section */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <SectionHeading title="CergyPro at a glance" />
            <StatCounter stats={stats} />
          </div>
        </section>

        {/* Webinars / Events */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <SectionHeading
              label="Events"
              title="Join us online"
              linkText="Explore all webinars"
              linkHref="/insights"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {webinars.map((webinar, i) => (
                <AnimateIn key={i} animation="fadeUp" delay={i * 150}>
                  <ContentCard
                    tag={webinar.tag}
                    title={webinar.title}
                    imageSrc={webinar.imageSrc}
                    href="/insights"
                  />
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Client Stories */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <SectionHeading
              label="Success stories"
              title="Client stories"
              linkText="Explore all"
              linkHref="/insights"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stories.map((story, i) => (
                <AnimateIn key={i} animation="fadeUp" delay={i * 150}>
                  <ContentCard
                    tag={story.tag}
                    title={story.title}
                    imageSrc={story.imageSrc}
                    href="/insights"
                  />
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Bar */}
        <section className="bg-white border-t border-gray-200">
          <AnimateIn animation="fadeUp">
            <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 text-center md:text-left">
                Ready to tackle your biggest challenges?
              </h2>
              <Link
                href="/contact"
                className="btn-shine inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors shrink-0"
              >
                TALK TO AN EXPERT
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimateIn>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
