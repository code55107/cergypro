import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import type { HeroSlide } from "@/components/Hero";

export const metadata: Metadata = {
  title: "CergyPro - Technology, Consulting & Digital Solutions",
  description:
    "CergyPro delivers innovative solutions for customer engagement, data centers, and digital platforms powered by AI. 9,000+ professionals worldwide.",
  openGraph: {
    title: "CergyPro - Technology, Consulting & Digital Solutions",
    description:
      "Innovative solutions for customer engagement, data centers, and digital platforms powered by AI.",
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
  { tag: "CUSTOMER ENGAGEMENT", title: "The most trusted\nutility platform\njust got better", subtitle: "Introducing the new Sightline\u00AE. Now responsibly powered with AI.", cta: "LEARN MORE", image: "/images/hero-1.jpg" },
  { tag: "DATA CENTERS", title: "Powering the future\nof data center\ninfrastructure", subtitle: "End-to-end solutions for planning, designing, and optimizing data centers.", cta: "EXPLORE", image: "/images/hero-2.jpg" },
  { tag: "DIGITAL PLATFORM", title: "Transform your\ncustomer experience\nwith AI", subtitle: "Our platform delivers personalized engagement at every touchpoint.", cta: "DISCOVER", image: "/images/hero-3.jpg" },
];

const fallbackStats = [
  { value: "9,000+", label: "Employees worldwide" },
  { value: "70+", label: "Global office locations" },
  { value: "$2B+", label: "Annual revenue" },
  { value: "40+", label: "Years of experience" },
];

const fallbackArticles = [
  { tag: "ARTIFICIAL INTELLIGENCE", title: "Why responsible AI governance is the next competitive advantage", description: "Organizations that embed ethical AI frameworks early are seeing measurable returns in stakeholder trust.", imageSrc: "/images/ai-governance.jpg" },
  { tag: "CLIMATE RESILIENCE", title: "Building adaptive infrastructure for a changing climate", description: "New approaches to infrastructure planning that account for extreme weather events and rising sea levels.", imageSrc: "/images/climate-infrastructure.jpg" },
  { tag: "DIGITAL HEALTH", title: "Telehealth adoption trends reshaping federal health programs", description: "A look at how virtual care models are transforming access and outcomes across underserved communities.", imageSrc: "/images/digital-health.jpg" },
];

const fallbackWebinars = [
  { tag: "WEBINAR", title: "The future of utility customer engagement in 2025", imageSrc: "/images/utility-engagement.jpg" },
  { tag: "WEBINAR", title: "Navigating federal grant management with automation", imageSrc: "/images/grants-automation.jpg" },
  { tag: "VIRTUAL EVENT", title: "CergyPro Innovation Summit: Responsible AI in Practice", imageSrc: "/images/innovation-summit.jpg" },
];

const fallbackStories = [
  { tag: "CLIENT STORY", title: "Helping a state agency reduce disaster response time by 60%", imageSrc: "/images/disaster-response.jpg" },
  { tag: "CLIENT STORY", title: "Deploying cloud-native platforms for a federal health system", imageSrc: "/images/cloud-platform.jpg" },
  { tag: "CLIENT STORY", title: "Transforming transportation data into actionable intelligence", imageSrc: "/images/transportation-data.jpg" },
];

const fallbackFeatured = {
  tag: "CASE STUDY",
  title: "Modernizing energy grid management for 12 million customers",
  description: "See how we partnered with a major utility provider to deploy AI-driven demand forecasting, reducing outage response time by 40% and improving customer satisfaction scores.",
  imageSrc: "/images/energy-grid.jpg",
};

export default async function Home() {
  // Fetch data from Sanity (falls back to hardcoded data if empty)
  let heroSlides = fallbackSlides;
  let stats = fallbackStats;
  let bannerTitle = "Discover how data analytics and AI are transforming public sector decision-making";
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
