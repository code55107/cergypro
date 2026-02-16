import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import Image from "next/image";
import { getIndustries } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Industries — Government, Energy & Commercial | CergyPro",
  description:
    "CergyPro delivers technology consulting across federal government, defense & intelligence, state & local, energy & utilities, healthcare, and commercial enterprise sectors.",
  openGraph: {
    title: "Industries We Serve | CergyPro",
    description:
      "Deep domain expertise combined with AI, analytics, and cybersecurity capabilities across government, energy, and commercial sectors.",
    url: "https://www.cergypro.com/industries",
  },
};

export const revalidate = 60;

const fallbackIndustries = [
  { name: "Federal Civilian", description: "Modernizing federal agencies with ServiceNow ITSM, cloud migration, AI-driven automation, and zero-trust cybersecurity architectures that accelerate mission delivery.", image: "/images/industry-federal.jpg" },
  { name: "Defense & Intelligence", description: "Delivering secure, mission-critical systems for defense and intelligence communities — from advanced analytics to enterprise IT modernization.", image: "/images/industry-defense.jpg" },
  { name: "State & Local Government", description: "Helping state and local agencies digitize citizen services, modernize legacy systems, and implement data-driven decision-making.", image: "/images/industry-social.jpg" },
  { name: "Energy & Utilities", description: "Powering the energy transition with grid modernization, customer engagement platforms, and AI-optimized operations for utilities nationwide.", image: "/images/industry-energy.jpg" },
  { name: "Healthcare", description: "Transforming healthcare delivery through ServiceNow HR and CSM workflows, interoperability solutions, clinical data analytics, and secure health information exchanges.", image: "/images/industry-healthcare.jpg" },
  { name: "Commercial Enterprise", description: "Partnering with Fortune 500 companies on ServiceNow enterprise deployments, digital transformation, AI strategy, and cloud-native development.", image: "/images/industry-transport.jpg" },
  { name: "Financial Services", description: "Enabling financial institutions to accelerate digital banking, strengthen regulatory compliance, and deploy AI-powered risk analytics.", image: "/images/industry-financial.jpg" },
  { name: "Transportation & Infrastructure", description: "Advancing intelligent transportation systems, infrastructure resilience, and smart mobility solutions through data and technology.", image: "/images/industry-aviation.jpg" },
  { name: "Environmental & Sustainability", description: "Supporting environmental compliance, climate analytics, and sustainability programs with advanced modeling and data science.", image: "/images/industry-environment.jpg" },
];

export default async function IndustriesPage() {
  let industries = fallbackIndustries;

  try {
    const sanityIndustries = await getIndustries();
    if (sanityIndustries?.length > 0) {
      industries = sanityIndustries.map((ind: { name: string; description: string; image: string }) => ({
        name: ind.name,
        description: ind.description,
        image: ind.image,
      }));
    }
  } catch (e) {
    console.error("Failed to fetch industries from Sanity, using fallback data:", e);
  }

  return (
    <>
      <Header />
      <main>
        <PageHero
          tag="INDUSTRIES"
          title="Domain expertise that drives mission outcomes"
          subtitle="We combine deep industry knowledge with enterprise-grade technology capabilities to deliver solutions tailored to the unique demands of each sector we serve."
          bgGradient="from-cyan-950/40 via-black to-black"
          bgImage="/images/industries-hero.jpg"
          bgImageAlt="Modern office with architectural ceiling lighting and workspaces"
        />

        {/* Industries Grid */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, i) => (
                <AnimateIn key={industry.name} animation="fadeUp" delay={i % 3 * 150}>
                  <GlowCard className="rounded-sm">
                    <Link
                      href="/industries"
                      className="group block bg-white border border-gray-200 rounded-sm overflow-hidden card-lift"
                    >
                      <div className="overflow-hidden relative aspect-[16/9]">
                        <Image
                          src={industry.image}
                          alt={industry.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                          {industry.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {industry.description}
                        </p>
                        <span className="inline-flex items-center gap-2 text-gray-900 text-xs font-semibold tracking-wider uppercase mt-4 group-hover:gap-3 transition-all">
                          EXPLORE
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

        {/* CTA */}
        <section className="bg-white border-t border-gray-200">
          <AnimateIn animation="fadeUp">
            <div className="max-w-[1400px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-2">
                  Don&apos;t see your industry?
                </h2>
                <p className="text-gray-600 text-sm">
                  Our cross-sector expertise means we can tailor solutions for any domain.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn-shine inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors shrink-0"
              >
                CONTACT US
              </Link>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
