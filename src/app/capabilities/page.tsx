import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import GlowCard from "@/components/GlowCard";
import Link from "next/link";
import { getCapabilities } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Explore CergyPro's capabilities in digital modernization, AI, cloud, cybersecurity, strategy, program implementation, and creative services.",
  openGraph: {
    title: "Our Capabilities | CergyPro",
    description:
      "Full spectrum of capabilities from technology and consulting to creative services.",
    url: "https://www.cergypro.com/capabilities",
  },
};

export const revalidate = 60;

const fallbackCapabilities = [
  {
    category: "TECHNOLOGY",
    items: [
      { name: "Digital Modernization", description: "Migrate legacy systems to modern cloud-native architectures that scale with your mission." },
      { name: "Artificial Intelligence", description: "Deploy responsible AI and machine learning solutions that automate processes and unlock insights." },
      { name: "Data & Analytics", description: "Turn complex data into actionable intelligence with advanced analytics and visualization." },
      { name: "Cloud", description: "Design, migrate, and manage secure cloud environments across AWS, Azure, and GCP." },
      { name: "Cybersecurity", description: "Protect critical infrastructure with zero-trust architecture, threat detection, and compliance." },
    ],
  },
  {
    category: "CONSULTING",
    items: [
      { name: "Strategy & Innovation", description: "Shape long-term strategies that leverage emerging technologies and market opportunities." },
      { name: "Program Implementation", description: "Deliver large-scale programs on time and on budget with proven project management frameworks." },
      { name: "Change Management", description: "Drive organizational adoption with communication strategies and stakeholder engagement." },
      { name: "Policy & Regulatory", description: "Navigate complex regulatory landscapes with evidence-based policy analysis and advocacy." },
      { name: "Grants Management", description: "Streamline federal grant administration from application through closeout." },
    ],
  },
  {
    category: "CREATIVE & COMMUNICATIONS",
    items: [
      { name: "Experience & Design", description: "Create human-centered digital experiences that drive engagement and satisfaction." },
      { name: "Strategic Communications", description: "Craft compelling narratives and multi-channel campaigns that inspire action." },
      { name: "Marketing & Digital Agency", description: "Full-service marketing, branding, and digital content production for modern audiences." },
    ],
  },
];

export default async function CapabilitiesPage() {
  let capabilities = fallbackCapabilities;

  try {
    const sanityCapabilities = await getCapabilities();
    if (sanityCapabilities?.length > 0) {
      // Group capabilities by category
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
          title="The expertise to deliver what matters"
          subtitle="From technology and consulting to creative services, we bring a full spectrum of capabilities to every engagement."
          bgGradient="from-violet-950/40 via-black to-black"
          bgImage="/images/capabilities-hero.jpg"
          bgImageAlt="Modern open-plan workspace with teams collaborating"
        />

        {/* Capabilities Sections */}
        {capabilities.map((section) => (
          <section
            key={section.category}
            className="bg-white"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-20">
              <AnimateIn animation="fadeUp">
                <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-8">
                  {section.category}
                </p>
              </AnimateIn>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item, i) => (
                  <AnimateIn key={item.name} animation="fadeUp" delay={i % 3 * 120}>
                    <GlowCard className="rounded-sm h-full">
                      <Link
                        href="/capabilities"
                        className="group block bg-white p-8 rounded-sm hover:bg-gray-50 transition-all card-lift h-full"
                      >
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
                      </Link>
                    </GlowCard>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Partners */}
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                PARTNERSHIPS
              </p>
              <h2 className="text-3xl font-light text-gray-900 mb-6">
                Trusted technology partners
              </h2>
              <p className="text-gray-600 text-sm max-w-xl mx-auto mb-12">
                We collaborate with leading technology providers to deliver the best solutions for our clients.
              </p>
            </AnimateIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {["AWS", "Microsoft Azure", "Google Cloud", "Salesforce", "ServiceNow", "Palantir", "Snowflake", "Tableau"].map((partner, i) => (
                <AnimateIn key={partner} animation="scaleUp" delay={i * 80}>
                  <div className="bg-gray-50 rounded-sm py-8 px-6 flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <span className="text-gray-500 text-sm font-medium">{partner}</span>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
