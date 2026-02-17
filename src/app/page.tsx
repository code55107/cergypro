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
    href: "/capabilities#ai-data",
    image: "/images/hero-1.jpg",
  },
  {
    tag: "SERVICENOW CONSULTING",
    title: "The ServiceNow\nexpertise enterprises\ncount on",
    subtitle: "End-to-end ServiceNow implementation, optimization, and managed services \u2014 ITSM, ITOM, SecOps, HR, and CSM across government and enterprise.",
    cta: "EXPLORE SERVICENOW",
    href: "/capabilities#servicenow-consulting",
    image: "/images/hero-2.jpg",
  },
  {
    tag: "GOVERNMENT MODERNIZATION",
    title: "Modernizing the\nmissions that matter\nmost",
    subtitle: "Helping federal, state, and local agencies accelerate digital transformation while strengthening security.",
    cta: "SEE OUR WORK",
    href: "/industries",
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
    title: "The CMMC compliance roadmap: what defense contractors need to know",
    description: "A practical guide to achieving Cybersecurity Maturity Model Certification without stalling your business operations.",
    imageSrc: "/images/cmmc-compliance.jpg",
  },
  {
    tag: "SERVICENOW",
    title: "ServiceNow ITSM at scale: lessons from enterprise and federal deployments",
    description: "The difference between a transformative ServiceNow rollout and a costly shelf-ware project comes down to three architecture decisions most teams overlook.",
    imageSrc: "/images/servicenow-itsm.jpg",
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
    title: "ServiceNow ITSM at scale: lessons from enterprise and federal deployments",
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
    tag: "ASTRAZENECA · HEALTHCARE",
    title: "AstraZeneca saves 30,000+ hours annually by replacing manual tasks with AI-powered automation — so researchers can focus on saving lives",
    imageSrc: "/images/az-hero.jpg",
    href: "/insights/astrazeneca-servicenow",
  },
  {
    tag: "SIEMENS · MANUFACTURING",
    title: "Siemens saves 1 million hours through automation while resolving 210,000 tickets monthly without human intervention",
    imageSrc: "/images/siemens-hero.jpg",
    href: "/insights/siemens-servicenow",
  },
  {
    tag: "BELL CANADA · TELECOM",
    title: "Bell Canada deflects 3 million customer support calls annually and automates 90% of dispatch tasks with ServiceNow",
    imageSrc: "/images/bell-hero.jpg",
    href: "/insights/bell-canada-servicenow",
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
      heroSlides = settings.heroSlides.map((s: { tag: string; title: string; subtitle: string; cta: string; href?: string; image: string }) => ({
        tag: s.tag,
        title: s.title,
        subtitle: s.subtitle,
        cta: s.cta,
        href: s.href || "/capabilities",
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

        {/* Stats Section — hidden for now, kept for future use */}
        {/* <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <SectionHeading title="CergyPro at a glance" />
            <StatCounter stats={stats} />
          </div>
        </section> */}

        {/* What Sets Us Apart — Capabilities Showcase */}
        <section className="bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <SectionHeading
              label="What we do"
              title="What sets us apart"
              linkText="View all capabilities"
              linkHref="/capabilities"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                {
                  name: "Digital Transformation",
                  href: "/capabilities#digital-transformation",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  ),
                  desc: "Strategy, platforms, automation & change management",
                },
                {
                  name: "ServiceNow",
                  href: "/capabilities#servicenow-consulting",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                  ),
                  desc: "ITSM, ITOM, HR, CSM, SecOps & Now Assist",
                },
                {
                  name: "AI & Data",
                  href: "/capabilities#ai-data",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                  ),
                  desc: "Machine learning, analytics & generative AI",
                },
                {
                  name: "Cloud",
                  href: "/capabilities#cloud-infrastructure",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                    </svg>
                  ),
                  desc: "Migration, DevSecOps & managed cloud",
                },
                {
                  name: "Cybersecurity",
                  href: "/capabilities#cybersecurity",
                  icon: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  desc: "Zero trust, threat detection & compliance",
                },
              ].map((cap, i) => (
                <AnimateIn key={cap.name} animation="fadeUp" delay={i * 100}>
                  <Link
                    href={cap.href}
                    className="group block bg-white border border-gray-200 rounded-sm p-6 hover:border-gray-400 hover:shadow-lg transition-all duration-300 h-full"
                  >
                    <div className="text-gray-400 group-hover:text-gray-900 transition-colors duration-300 mb-4">
                      {cap.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      {cap.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {cap.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-gray-900 group-hover:gap-2 transition-all uppercase tracking-wider">
                      Learn more
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
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

        {/* Client Stories — ServiceNow Use Cases */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <SectionHeading
              label="ServiceNow in action"
              title="How leading organizations transform with ServiceNow"
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
                    href={story.href || "/insights"}
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
