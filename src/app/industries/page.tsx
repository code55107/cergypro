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
  title: "Industries",
  description:
    "CergyPro serves energy, federal health, disaster management, transportation, environmental services, aviation, and more with deep domain expertise.",
  openGraph: {
    title: "Industries We Serve | CergyPro",
    description:
      "Deep expertise across energy, health, disaster management, transportation, environmental services, and more.",
    url: "https://www.cergypro.com/industries",
  },
};

export const revalidate = 60;

const fallbackIndustries = [
  { name: "Energy & Utilities", description: "Helping energy providers modernize grids, engage customers, and transition to clean energy solutions.", image: "/images/industry-energy.jpg" },
  { name: "Federal Health", description: "Supporting government health agencies with digital transformation, data analytics, and improved patient outcomes.", image: "/images/industry-health.jpg" },
  { name: "Disaster Management", description: "Providing end-to-end disaster preparedness, response, and recovery solutions that save lives and reduce costs.", image: "/images/industry-disaster.jpg" },
  { name: "Transportation", description: "Advancing smart mobility, infrastructure resilience, and sustainable transportation systems worldwide.", image: "/images/industry-transport.jpg" },
  { name: "Environmental Services", description: "Driving environmental compliance, remediation, and sustainability strategies for public and private sectors.", image: "/images/industry-environment.jpg" },
  { name: "Climate Resilience", description: "Building adaptive strategies that help communities and organizations withstand and recover from climate impacts.", image: "/images/industry-climate.jpg" },
  { name: "Aviation", description: "Optimizing aviation operations, air traffic management, and airport infrastructure through technology and analytics.", image: "/images/industry-aviation.jpg" },
  { name: "U.S. Federal", description: "Partnering with federal agencies to deliver mission-critical programs, IT modernization, and policy implementation.", image: "/images/industry-federal.jpg" },
  { name: "Social Programs", description: "Designing and implementing programs that strengthen education, workforce development, and community well-being.", image: "/images/industry-social.jpg" },
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
          title="Deep expertise across the sectors that matter most"
          subtitle="We bring decades of domain knowledge, advanced analytics, and technology to help industries solve their most pressing challenges."
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
