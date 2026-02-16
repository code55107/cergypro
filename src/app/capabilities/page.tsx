import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import GlowCard from "@/components/GlowCard";
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
    description: "Our largest and fastest-growing practice. We deliver end-to-end ServiceNow solutions across ITSM, ITOM, SecOps, HR, and CSM — helping government and enterprise clients consolidate tools, automate workflows, and accelerate service delivery.",
    image: "/images/cloud-platform.jpg",
    items: [
      { name: "ITSM Implementation & Optimization", description: "Full-lifecycle ServiceNow ITSM deployments \u2014 from greenfield implementations to platform consolidation and performance optimization for enterprise and government clients.", image: "/images/analytics-dashboard.jpg" },
      { name: "ITOM & Discovery", description: "ServiceNow IT Operations Management including event management, service mapping, and discovery to give organizations complete visibility into their infrastructure.", image: "/images/energy-grid.jpg" },
      { name: "Security Operations (SecOps)", description: "Integrate threat intelligence, vulnerability response, and incident management into a unified SecOps workflow on the ServiceNow platform.", image: "/images/cybersecurity-policy.jpg" },
      { name: "HR Service Delivery & CSM", description: "Transform employee experiences and customer service operations with ServiceNow HR Service Delivery, CSM, and self-service portals.", image: "/images/team-collaboration.jpg" },
      { name: "ServiceNow Platform Development", description: "Custom application development, integrations, and workflow automation on the Now Platform \u2014 leveraging Flow Designer, IntegrationHub, and App Engine.", image: "/images/generative-ai.jpg" },
      { name: "Managed Services & Support", description: "Ongoing ServiceNow administration, upgrades, and optimization to maximize platform ROI and ensure continuous improvement.", image: "/images/grants-automation.jpg" },
    ],
  },
  {
    category: "AI & DATA",
    description: "From predictive analytics to generative AI, we build production-grade AI solutions with responsible governance \u2014 helping organizations unlock the full value of their data.",
    image: "/images/generative-ai.jpg",
    items: [
      { name: "Enterprise AI & Machine Learning", description: "Production-grade AI solutions \u2014 from predictive analytics and NLP to computer vision \u2014 built with responsible governance from day one.", image: "/images/ai-governance.jpg" },
      { name: "Advanced Analytics & BI", description: "Transform complex data into real-time, actionable intelligence through dashboards, data pipelines, and enterprise reporting.", image: "/images/analytics-dashboard.jpg" },
      { name: "Data Engineering & Management", description: "Architect modern data platforms, lakes, and warehouses that unify data across the enterprise for analytics and AI readiness.", image: "/images/climate-infrastructure.jpg" },
      { name: "Generative AI", description: "Deploy large language models and generative AI solutions securely within enterprise environments, with human-in-the-loop safeguards.", image: "/images/generative-ai.jpg" },
    ],
  },
  {
    category: "CLOUD & INFRASTRUCTURE",
    description: "We migrate, modernize, and manage cloud environments across AWS, Azure, and GCP \u2014 with DevSecOps pipelines and infrastructure as code baked in from the start.",
    image: "/images/cloud-platform.jpg",
    items: [
      { name: "Cloud Migration & Modernization", description: "Migrate legacy systems to AWS, Azure, and GCP with minimal disruption \u2014 including re-platforming, re-architecting, and containerization.", image: "/images/cloud-platform.jpg" },
      { name: "DevSecOps & Automation", description: "Accelerate delivery with CI/CD pipelines, infrastructure as code, and automated security testing embedded throughout the lifecycle.", image: "/images/innovation-summit.jpg" },
      { name: "Application Development", description: "Build cloud-native applications, APIs, and microservices using modern frameworks and agile engineering practices.", image: "/images/digital-health.jpg" },
      { name: "Managed Cloud Services", description: "Ongoing cloud operations, optimization, and governance \u2014 ensuring security, cost efficiency, and performance at scale.", image: "/images/energy-grid.jpg" },
    ],
  },
  {
    category: "CYBERSECURITY",
    description: "Zero trust, threat detection, identity management, and continuous compliance \u2014 we protect the most sensitive networks and data across federal and commercial environments.",
    image: "/images/cybersecurity-policy.jpg",
    items: [
      { name: "Zero Trust Architecture", description: "Design and implement zero-trust frameworks that verify every user, device, and connection \u2014 meeting NIST, CMMC, and FedRAMP standards.", image: "/images/cybersecurity-policy.jpg" },
      { name: "Threat Detection & Response", description: "24/7 security operations with AI-powered threat detection, incident response, and forensic analysis across hybrid environments.", image: "/images/disaster-response.jpg" },
      { name: "Identity & Access Management", description: "Enterprise IAM solutions including multi-factor authentication, privileged access management, and identity governance.", image: "/images/industry-federal.jpg" },
      { name: "Compliance & Risk Management", description: "Continuous compliance monitoring and risk assessment for federal mandates, HIPAA, PCI-DSS, and industry regulations.", image: "/images/coastal-communities.jpg" },
    ],
  },
  {
    category: "DIGITAL TRANSFORMATION",
    description: "IT strategy, CRM platforms, intelligent automation, and human-centered design \u2014 we architect transformation programs that deliver measurable business outcomes.",
    image: "/images/distributed-energy.jpg",
    items: [
      { name: "IT Strategy & Roadmapping", description: "Align technology investments with business outcomes through assessment, architecture planning, and multi-year transformation roadmaps.", image: "/images/transportation-data.jpg" },
      { name: "Customer Platforms & CRM", description: "Deploy and customize Salesforce and proprietary platforms \u2014 including Sightline\u00AE for utility customer engagement and enterprise CRM solutions.", image: "/images/utility-engagement.jpg" },
      { name: "Process Automation & RPA", description: "Automate high-volume, repetitive processes with intelligent automation, reducing costs and accelerating service delivery.", image: "/images/grants-automation.jpg" },
      { name: "User Experience & Design", description: "Human-centered design for digital products, portals, and citizen-facing services that drive adoption and satisfaction.", image: "/images/health-integration.jpg" },
    ],
  },
];

// Alternating highlight banners between sections
const sectionBanners: Record<string, { title: string; href: string; bgColor: string }> = {
  "SERVICENOW CONSULTING": {
    title: "200+ ServiceNow implementations delivered \u2014 across federal, defense, healthcare, and Fortune 500 clients",
    href: "/contact",
    bgColor: "bg-emerald-400",
  },
  "AI & DATA": {
    title: "Turning data into decisions \u2014 we\u2019ve deployed 50+ production AI systems across government and enterprise",
    href: "/insights",
    bgColor: "bg-cyan-400",
  },
  "CYBERSECURITY": {
    title: "Protecting the networks that protect the nation \u2014 FedRAMP, CMMC, and zero trust at scale",
    href: "/industries",
    bgColor: "bg-amber-400",
  },
};

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
        description: "",
        image: "/images/capabilities-hero.jpg",
        items: items.map((item) => ({ ...item, image: "/images/capabilities-hero.jpg" })),
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

        {/* Capabilities Sections */}
        {capabilities.map((section, sectionIndex) => (
          <div key={section.category}>
            {/* Section Banner with Background Image */}
            <section
              id={section.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}
              className="relative scroll-mt-20 overflow-hidden"
            >
              <div className="relative py-20 md:py-28">
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={section.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60" />
                </div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-6">
                  <AnimateIn animation="fadeUp">
                    <p className="text-accent-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                      {String(sectionIndex + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight mb-6 max-w-2xl">
                      {section.category.charAt(0) + section.category.slice(1).toLowerCase()}
                    </h2>
                    {section.description && (
                      <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
                        {section.description}
                      </p>
                    )}
                  </AnimateIn>
                </div>
              </div>
            </section>

            {/* Capability Cards Grid */}
            <section className="bg-white">
              <div className="max-w-[1400px] mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items.map((item, i) => (
                    <AnimateIn key={item.name} animation="fadeUp" delay={i % 3 * 150}>
                      <GlowCard className="rounded-sm h-full">
                        <Link
                          href="/contact"
                          className="group block bg-white border border-gray-200 rounded-sm overflow-hidden card-lift h-full"
                        >
                          <div className="overflow-hidden relative aspect-[16/9]">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                              {item.description}
                            </p>
                            <span className="inline-flex items-center gap-2 text-gray-900 text-xs font-semibold tracking-wider uppercase group-hover:gap-3 transition-all">
                              LEARN MORE
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                          </div>
                        </Link>
                      </GlowCard>
                    </AnimateIn>
                  ))}
                </div>
              </div>
            </section>

            {/* Highlight Banner (between select sections) */}
            {sectionBanners[section.category] && (
              <HighlightBanner
                title={sectionBanners[section.category].title}
                href={sectionBanners[section.category].href}
                bgColor={sectionBanners[section.category].bgColor}
                textColor="text-black"
              />
            )}
          </div>
        ))}

        {/* Partners */}
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                PARTNERSHIPS
              </p>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Strategic technology alliances
              </h2>
              <p className="text-gray-600 text-sm max-w-xl mx-auto mb-12">
                We maintain deep partnerships with the world&apos;s leading technology platforms to deliver best-in-class solutions across every engagement.
              </p>
            </AnimateIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {["AWS", "Microsoft Azure", "Google Cloud", "Salesforce", "Palo Alto Networks", "Snowflake", "Databricks", "Splunk"].map((partner, i) => (
                <AnimateIn key={partner} animation="scaleUp" delay={i * 80}>
                  <div className="bg-gray-50 rounded-sm py-8 px-6 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <span className="text-gray-500 text-sm font-medium">{partner}</span>
                  </div>
                </AnimateIn>
              ))}
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
