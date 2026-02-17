import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import FeaturedCard from "@/components/FeaturedCard";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import Image from "next/image";
import { getSiteSettings } from "@/lib/sanity";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About CergyPro — Technology Consulting & Digital Transformation",
  description:
    "CergyPro is a global technology consulting firm with 9,000+ professionals delivering AI, analytics, cybersecurity, and digital transformation across government, commercial, and energy sectors.",
  openGraph: {
    title: "About CergyPro — Technology Consulting & Digital Transformation",
    description:
      "9,000+ professionals. 70+ global offices. 45+ years of delivering mission-critical technology solutions for government, commercial, and energy clients.",
    url: "https://www.cergypro.com/about",
  },
};

export const revalidate = 60;

/* ── Fallback data kept for future reactivation ── */
// const fallbackTimeline = [
//   { year: "1979", event: "Founded as a technology services firm supporting federal defense and intelligence programs." },
//   { year: "1992", event: "Expanded into civilian government IT, securing major contracts for systems integration and data management." },
//   { year: "2001", event: "Grew cybersecurity practice in response to post-9/11 federal demand for information assurance." },
//   { year: "2008", event: "Entered the energy and utilities market, building customer information systems for top-tier utilities." },
//   { year: "2015", event: "Acquired advanced analytics firms, establishing a dedicated AI and data science practice." },
//   { year: "2018", event: "Launched ServiceNow consulting practice, rapidly growing to become the firm\u2019s largest service line with ITSM, ITOM, SecOps, and HR capabilities." },
//   { year: "2021", event: "Launched Sightline\u00AE, the industry\u2019s most comprehensive utility customer engagement platform." },
//   { year: "2024", event: "Surpassed $2B in annual revenue and 9,000 employees worldwide, with ServiceNow and AI capabilities embedded across all service lines." },
// ];

// const fallbackLeaders = [
//   { name: "Daniel Rourke", role: "Chairman & Chief Executive Officer", image: "/images/leader-1.jpg" },
//   { name: "Priya Deshmukh", role: "President & Chief Operating Officer", image: "/images/leader-2.jpg" },
//   { name: "Dr. Marcus Hale", role: "Chief Technology Officer", image: "/images/leader-3.jpg" },
//   { name: "Catherine Liu", role: "Chief Financial Officer", image: "/images/leader-4.jpg" },
//   { name: "Robert Vasquez", role: "EVP, Federal & Government Services", image: "/images/leader-5.jpg" },
//   { name: "Adaeze Okafor", role: "EVP, Energy & Utilities", image: "/images/leader-6.jpg" },
// ];

const values = [
  { title: "Mission-first", description: "We align our work to the outcomes that matter most — national security, reliable energy, and modern public services." },
  { title: "Technical excellence", description: "We attract and develop top engineering talent, investing continuously in AI, cloud, and cybersecurity capabilities." },
  { title: "Client partnership", description: "We embed deeply with our clients, treating their missions as our own and measuring success by their results." },
  { title: "Responsible innovation", description: "We deploy emerging technologies with governance, transparency, and ethics built in from day one." },
];

const fallbackStats = [
  { value: "9,000+", label: "Employees worldwide" },
  { value: "70+", label: "Global office locations" },
  { value: "$2.1B", label: "Annual revenue (FY 2025)" },
  { value: "45+", label: "Years of expertise" },
];

const differentiators = [
  {
    title: "ServiceNow Elite Partner",
    description: "One of the largest independent ServiceNow practices globally, with certified architects across ITSM, ITOM, HR, CSM, and SecOps.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    title: "Cross-Sector Expertise",
    description: "Deep domain knowledge spanning federal, defense, energy, healthcare, and Fortune 500 enterprises — we understand your industry\u2019s unique challenges.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "Mission-Critical Track Record",
    description: "45+ years delivering technology solutions where failure is not an option — from national security systems to grid operations serving millions.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "AI-First Approach",
    description: "We embed AI and automation into every engagement, from Now Assist deployments to custom ML models that drive measurable operational improvements.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
];

const trustBadges = [
  "ServiceNow Elite Partner",
  "AWS Advanced Partner",
  "Microsoft Gold Partner",
  "Google Cloud Partner",
  "FedRAMP Authorized",
  "ISO 27001 Certified",
];

const featuredCaseStudy = {
  tag: "ASTRAZENECA \u00b7 HEALTHCARE",
  title: "AstraZeneca saves 30,000+ hours annually by replacing manual tasks with AI-powered automation",
  description: "How one of the world\u2019s largest pharmaceutical companies unified 60,000 laboratory requests and transformed employee onboarding using ServiceNow.",
  imageSrc: "/images/az-hero.jpg",
  href: "/insights/astrazeneca-servicenow",
};

export default async function AboutPage() {
  let stats = fallbackStats;

  try {
    const settings = await getSiteSettings();
    if (settings?.stats?.length > 0) {
      stats = settings.stats;
    }
  } catch (e) {
    console.error("Failed to fetch about data from Sanity, using fallback data:", e);
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.cergypro.com" },
          { name: "About", url: "https://www.cergypro.com/about" },
        ]}
      />
      <Header />
      <main>
        <PageHero
          tag="ABOUT CERGYPRO"
          title="Technology that advances the missions that matter most"
          subtitle="For over 45 years, CergyPro has partnered with government agencies, commercial enterprises, and energy companies to deliver mission-critical technology solutions at scale."
          bgGradient="from-emerald-950/30 via-black to-black"
          bgImage="/images/about-hero.jpg"
          bgImageAlt="Executive boardroom with panoramic windows overlooking the city"
        />

        {/* Stats */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 py-16">
            <StatCounter stats={stats} />
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <AnimateIn animation="fadeRight">
                <div>
                  <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                    OUR MISSION
                  </p>
                  <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-6">
                    We turn complex technology challenges into operational advantages
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    CergyPro is a global technology consulting firm with more than 9,000 professionals delivering ServiceNow consulting, AI, advanced analytics, cybersecurity, and digital transformation solutions. We combine deep domain expertise with enterprise-grade engineering to help organizations operate smarter, faster, and more securely.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    From modernizing federal agency systems and building zero-trust security architectures to deploying AI-powered utility platforms serving millions of customers, our work drives measurable outcomes for some of the most demanding organizations in the world.
                  </p>
                </div>
              </AnimateIn>
              <AnimateIn animation="fadeLeft">
                <div className="aspect-[4/3] rounded-sm overflow-hidden relative">
                  <Image
                    src="/images/team-collaboration.jpg"
                    alt="CergyPro team collaboration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                OUR VALUES
              </p>
              <h2 className="text-3xl font-light text-gray-900 mb-12">
                What drives us
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <AnimateIn key={v.title} animation="fadeUp" delay={i * 120}>
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{v.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Why CergyPro */}
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                WHY CERGYPRO
              </p>
              <h2 className="text-3xl font-light text-gray-900 mb-12">
                What sets us apart
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {differentiators.map((d, i) => (
                <AnimateIn key={d.title} animation="fadeUp" delay={i * 120}>
                  <div className="border-t border-gray-200 pt-6">
                    <div className="text-gray-400 mb-4">
                      {d.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{d.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{d.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-center">
                TRUSTED BY
              </p>
              <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">
                Partners and certifications
              </h2>
            </AnimateIn>
            <AnimateIn animation="fadeUp" delay={150}>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="px-5 py-3 bg-white border border-gray-200 rounded-sm text-sm font-medium text-gray-600 tracking-wide"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Client Success */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                CLIENT SUCCESS
              </p>
              <h2 className="text-3xl font-light text-gray-900 mb-12">
                Delivering measurable outcomes
              </h2>
            </AnimateIn>
            <AnimateIn animation="fadeUp" delay={150}>
              <FeaturedCard
                tag={featuredCaseStudy.tag}
                title={featuredCaseStudy.title}
                description={featuredCaseStudy.description}
                imageSrc={featuredCaseStudy.imageSrc}
                href={featuredCaseStudy.href}
              />
            </AnimateIn>
          </div>
        </section>

        {/* Leadership — hidden for now, kept for future use */}
        {/* <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                LEADERSHIP
              </p>
              <h2 className="text-3xl font-light text-gray-900 mb-12">
                Our executive team
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.map((leader, i) => (
                <AnimateIn key={leader.name} animation="fadeUp" delay={i % 3 * 150}>
                  <div className="group">
                    <div className="aspect-[3/4] rounded-sm mb-4 overflow-hidden relative">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{leader.name}</h3>
                    <p className="text-gray-600 text-sm">{leader.role}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section> */}

        {/* Timeline — hidden for now, kept for future use */}
        {/* <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                OUR HISTORY
              </p>
              <h2 className="text-3xl font-light text-gray-900 mb-12">
                A legacy of impact
              </h2>
            </AnimateIn>
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <AnimateIn key={item.year} animation="fadeUp" delay={i * 100}>
                  <div className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 py-6 border-b border-gray-200">
                    <span className="text-gray-900 text-2xl font-light">{item.year}</span>
                    <p className="text-gray-600 leading-relaxed">{item.event}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section> */}

        {/* Contact CTA */}
        <section className="bg-emerald-400 text-black">
          <AnimateIn animation="fadeUp">
            <Link
              href="/contact"
              className="group max-w-[1400px] mx-auto px-6 py-16 md:py-20 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 opacity-70">
                  GET IN TOUCH
                </p>
                <h2 className="text-3xl md:text-4xl font-light max-w-2xl leading-tight">
                  Ready to tackle your biggest technology challenges?
                </h2>
              </div>
              <svg
                className="w-10 h-10 shrink-0 ml-8 group-hover:translate-x-2 transition-transform"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimateIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
