import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import HighlightBanner from "@/components/HighlightBanner";
import Link from "next/link";
import Image from "next/image";
import { getCapabilities } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Capabilities — ServiceNow, AI, Cloud, Cybersecurity & Digital Transformation | CergyPro",
  description:
    "CergyPro delivers enterprise AI, cloud modernization, cybersecurity, data analytics, and digital transformation solutions for government and commercial clients.",
  openGraph: {
    title: "Our Capabilities | CergyPro",
    description:
      "Enterprise AI, cloud migration, zero-trust cybersecurity, advanced analytics, and full-stack digital transformation capabilities.",
    url: "https://www.cergypro.com/capabilities",
  },
};

export const revalidate = 60;

const fallbackCapabilities = [
  {
    category: "SERVICENOW CONSULTING",
    headline: "The ServiceNow expertise enterprises count on",
    description: "Our largest and fastest-growing practice. We deliver end-to-end ServiceNow solutions across ITSM, ITOM, SecOps, HR, and CSM — helping government and enterprise clients consolidate tools, automate workflows, and accelerate service delivery.",
    image: "/images/cap-servicenow.jpg",
    items: [
      { name: "ITSM Implementation & Optimization", description: "Full-lifecycle ServiceNow ITSM deployments — from greenfield implementations to platform consolidation and performance optimization." },
      { name: "ITOM & Discovery", description: "Event management, service mapping, and discovery for complete infrastructure visibility." },
      { name: "Security Operations (SecOps)", description: "Unified threat intelligence, vulnerability response, and incident management on the ServiceNow platform." },
      { name: "HR Service Delivery & CSM", description: "Employee experience and customer service transformation with self-service portals." },
      { name: "Platform Development", description: "Custom apps, integrations, and workflow automation via Flow Designer, IntegrationHub, and App Engine." },
      { name: "Managed Services & Support", description: "Ongoing administration, upgrades, and optimization to maximize platform ROI." },
    ],
  },
  {
    category: "AI & DATA",
    headline: "Turning complexity into clarity with AI",
    description: "From predictive analytics to generative AI, we build production-grade solutions with responsible governance — helping organizations unlock the full value of their data.",
    image: "/images/cap-ai.jpg",
    items: [
      { name: "Enterprise AI & Machine Learning", description: "Predictive analytics, NLP, and computer vision — built with responsible governance from day one." },
      { name: "Advanced Analytics & BI", description: "Real-time dashboards, data pipelines, and enterprise reporting that drive decisions." },
      { name: "Data Engineering & Management", description: "Modern data platforms, lakes, and warehouses that unify enterprise data for AI readiness." },
      { name: "Generative AI", description: "Secure LLM deployments within enterprise environments with human-in-the-loop safeguards." },
    ],
  },
  {
    category: "CLOUD & INFRASTRUCTURE",
    headline: "Cloud-native. Mission-ready.",
    description: "We migrate, modernize, and manage cloud environments across AWS, Azure, and GCP — with DevSecOps pipelines and infrastructure as code baked in from the start.",
    image: "/images/cap-cloud.jpg",
    items: [
      { name: "Cloud Migration & Modernization", description: "Re-platforming, re-architecting, and containerization across AWS, Azure, and GCP." },
      { name: "DevSecOps & Automation", description: "CI/CD pipelines, infrastructure as code, and automated security testing throughout the lifecycle." },
      { name: "Application Development", description: "Cloud-native applications, APIs, and microservices using modern frameworks." },
      { name: "Managed Cloud Services", description: "Ongoing cloud operations, optimization, and governance at scale." },
    ],
  },
  {
    category: "CYBERSECURITY",
    headline: "Protecting the networks that protect the nation",
    description: "Zero trust, threat detection, identity management, and continuous compliance — we secure the most sensitive networks and data across federal and commercial environments.",
    image: "/images/cap-cyber.jpg",
    items: [
      { name: "Zero Trust Architecture", description: "End-to-end zero-trust frameworks meeting NIST, CMMC, and FedRAMP standards." },
      { name: "Threat Detection & Response", description: "24/7 AI-powered security operations with incident response and forensic analysis." },
      { name: "Identity & Access Management", description: "MFA, privileged access management, and identity governance at enterprise scale." },
      { name: "Compliance & Risk Management", description: "Continuous monitoring for HIPAA, PCI-DSS, and federal regulatory mandates." },
    ],
  },
  {
    category: "DIGITAL TRANSFORMATION",
    headline: "Architecting transformation that delivers",
    description: "IT strategy, CRM platforms, intelligent automation, and human-centered design — we build transformation programs that deliver measurable business outcomes.",
    image: "/images/cap-digital.jpg",
    items: [
      { name: "IT Strategy & Roadmapping", description: "Architecture planning and multi-year transformation roadmaps aligned to business outcomes." },
      { name: "Customer Platforms & CRM", description: "Salesforce deployments and proprietary platforms including Sightline\u00AE for utility engagement." },
      { name: "Process Automation & RPA", description: "Intelligent automation that reduces costs and accelerates service delivery." },
      { name: "User Experience & Design", description: "Human-centered design for digital products, portals, and citizen-facing services." },
    ],
  },
];

export default async function CapabilitiesPage() {
  let capabilities = fallbackCapabilities;

  try {
    const sanityCapabilities = await getCapabilities();
    if (sanityCapabilities?.length > 0) {
      const grouped: Record<string, { name: string; description: string }[]> = {};
      for (const cap of sanityCapabilities) {
        const cat = (cap as { category: string }).category?.toUpperCase() || "OTHER";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push({
          name: (cap as { name: string }).name,
          description: (cap as { description: string }).description,
        });
      }
      capabilities = Object.entries(grouped).map(([category, items]) => ({
        category,
        headline: "",
        description: "",
        image: "/images/capabilities-hero.jpg",
        items,
      }));
    }
  } catch (e) {
    console.error("Failed to fetch capabilities from Sanity, using fallback data:", e);
  }

  return (
    <>
      <Header />
      <main>
        <PageHero
          tag="CAPABILITIES"
          title="End-to-end technology capabilities built for mission-critical work"
          subtitle="From AI and cloud to cybersecurity and digital transformation — we engineer solutions that scale, secure, and deliver measurable outcomes."
          bgGradient="from-violet-950/40 via-black to-black"
          bgImage="/images/capabilities-hero.jpg"
          bgImageAlt="Close-up of a circuit board representing technology capabilities"
        />

        {/* Capability Sections */}
        {capabilities.map((section, sectionIndex) => {
          const isEven = sectionIndex % 2 === 0;

          return (
            <div key={section.category}>
              <section
                id={section.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}
                className={`scroll-mt-20 ${isEven ? "bg-white" : "bg-gray-50"}`}
              >
                <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
                  {/* Section Header: Image + Text side by side */}
                  <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-16 items-center mb-16`}>
                    {/* Image */}
                    <AnimateIn animation="fadeUp" className="w-full lg:w-1/2">
                      <div className="relative aspect-[16/10] rounded-sm overflow-hidden">
                        <Image
                          src={section.image}
                          alt={section.category}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Subtle number overlay */}
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-sm">
                          <span className="text-white/80 text-xs font-semibold tracking-widest">
                            {String(sectionIndex + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </AnimateIn>

                    {/* Text */}
                    <AnimateIn animation="fadeUp" delay={150} className="w-full lg:w-1/2">
                      <p className="text-accent-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                        {section.category}
                      </p>
                      {section.headline && (
                        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 leading-tight mb-5">
                          {section.headline}
                        </h2>
                      )}
                      {section.description && (
                        <p className="text-gray-600 text-base leading-relaxed mb-6">
                          {section.description}
                        </p>
                      )}
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:gap-3 transition-all"
                      >
                        TALK TO OUR TEAM
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </AnimateIn>
                  </div>

                  {/* Capability Items — clean grid, no images */}
                  <div className={`grid grid-cols-1 md:grid-cols-2 ${section.items.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-px bg-gray-200 rounded-sm overflow-hidden`}>
                    {section.items.map((item, i) => (
                      <AnimateIn key={item.name} animation="fadeUp" delay={i % 3 * 100}>
                        <div className={`${isEven ? "bg-white" : "bg-gray-50"} p-8 h-full`}>
                          <h3 className="text-base font-semibold text-gray-900 mb-2">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </AnimateIn>
                    ))}
                  </div>
                </div>
              </section>

              {/* Highlight Banners between sections */}
              {sectionIndex === 0 && (
                <HighlightBanner
                  title="200+ ServiceNow implementations delivered across federal, defense, healthcare, and Fortune 500 clients"
                  href="/contact"
                  bgColor="bg-emerald-400"
                  textColor="text-black"
                />
              )}
              {sectionIndex === 1 && (
                <HighlightBanner
                  title="50+ production AI systems deployed across government and enterprise — turning data into decisions"
                  href="/insights"
                  bgColor="bg-cyan-400"
                  textColor="text-black"
                />
              )}
              {sectionIndex === 3 && (
                <HighlightBanner
                  title="Protecting the networks that protect the nation — FedRAMP, CMMC, and zero trust at scale"
                  href="/industries"
                  bgColor="bg-amber-400"
                  textColor="text-black"
                />
              )}
            </div>
          );
        })}

        {/* Partners */}
        <section className="bg-gray-900">
          <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* Left text */}
              <AnimateIn animation="fadeUp" className="lg:w-1/3 shrink-0">
                <p className="text-accent-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                  PARTNERSHIPS
                </p>
                <h2 className="text-3xl sm:text-4xl font-light text-white leading-tight mb-5">
                  Strategic technology alliances
                </h2>
                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  We maintain deep partnerships with the world&apos;s leading technology platforms to deliver best-in-class solutions across every engagement.
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <span className="block text-2xl font-light text-white">8</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Partners</span>
                  </div>
                  <div className="w-px h-8 bg-gray-700" />
                  <div className="text-center">
                    <span className="block text-2xl font-light text-white">500+</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Certifications</span>
                  </div>
                  <div className="w-px h-8 bg-gray-700" />
                  <div className="text-center">
                    <span className="block text-2xl font-light text-white">15+</span>
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Years</span>
                  </div>
                </div>
              </AnimateIn>

              {/* Right logo grid */}
              <div className="lg:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "AWS", logo: "/images/partners/aws.svg", color: "#FF9900", desc: "Premier Consulting" },
                    { name: "Microsoft Azure", logo: "/images/partners/azure.svg", color: "#0089D6", desc: "Gold Partner" },
                    { name: "Google Cloud", logo: "/images/partners/gcp.svg", color: "#4285F4", desc: "Partner Advantage" },
                    { name: "Salesforce", logo: "/images/partners/salesforce.svg", color: "#00A1E0", desc: "Summit Partner" },
                    { name: "Palo Alto Networks", logo: "/images/partners/paloalto.svg", color: "#FA582D", desc: "Platinum Partner" },
                    { name: "Snowflake", logo: "/images/partners/snowflake.svg", color: "#29B5E8", desc: "Premier Partner" },
                    { name: "Databricks", logo: "/images/partners/databricks.svg", color: "#FF3621", desc: "Consulting Partner" },
                    { name: "Splunk", logo: "/images/partners/splunk.svg", color: "#65A637", desc: "Premier Partner" },
                  ].map((partner, i) => (
                    <AnimateIn key={partner.name} animation="scaleUp" delay={i * 80}>
                      <div
                        className="group relative bg-gray-800/50 border border-gray-700/50 rounded-sm p-6 flex flex-col items-center justify-center text-center hover:border-gray-600 transition-all duration-300 overflow-hidden"
                      >
                        {/* Top accent line on hover */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                          style={{ backgroundColor: partner.color }}
                        />
                        {/* Logo */}
                        <div className="h-10 flex items-center justify-center mb-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            width={120}
                            height={40}
                            className="object-contain max-h-10"
                          />
                        </div>
                        {/* Partner tier */}
                        <span className="text-gray-500 text-[10px] font-medium tracking-wider uppercase group-hover:text-gray-400 transition-colors">
                          {partner.desc}
                        </span>
                      </div>
                    </AnimateIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-white border-t border-gray-200">
          <AnimateIn animation="fadeUp">
            <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-2">
                  Ready to put these capabilities to work?
                </h2>
                <p className="text-gray-600 text-sm">
                  Tell us about your challenge — we&apos;ll match the right team and technology.
                </p>
              </div>
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
      </main>
      <Footer />
    </>
  );
}
