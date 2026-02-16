import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import StatCounter from "@/components/StatCounter";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import Image from "next/image";
import { getLeaders, getTimelineEvents, getSiteSettings } from "@/lib/sanity";
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

const fallbackTimeline = [
  { year: "1979", event: "Founded as a technology services firm supporting federal defense and intelligence programs." },
  { year: "1992", event: "Expanded into civilian government IT, securing major contracts for systems integration and data management." },
  { year: "2001", event: "Grew cybersecurity practice in response to post-9/11 federal demand for information assurance." },
  { year: "2008", event: "Entered the energy and utilities market, building customer information systems for top-tier utilities." },
  { year: "2015", event: "Acquired advanced analytics firms, establishing a dedicated AI and data science practice." },
  { year: "2021", event: "Launched Sightline\u00AE, the industry\u2019s most comprehensive utility customer engagement platform." },
  { year: "2024", event: "Surpassed $2B in annual revenue and 9,000 employees worldwide, with AI capabilities embedded across all service lines." },
];

const fallbackLeaders = [
  { name: "Daniel Rourke", role: "Chairman & Chief Executive Officer", image: "/images/leader-1.jpg" },
  { name: "Priya Deshmukh", role: "President & Chief Operating Officer", image: "/images/leader-2.jpg" },
  { name: "Dr. Marcus Hale", role: "Chief Technology Officer", image: "/images/leader-3.jpg" },
  { name: "Catherine Liu", role: "Chief Financial Officer", image: "/images/leader-4.jpg" },
  { name: "Robert Vasquez", role: "EVP, Federal & Government Services", image: "/images/leader-5.jpg" },
  { name: "Adaeze Okafor", role: "EVP, Energy & Utilities", image: "/images/leader-6.jpg" },
];

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

export default async function AboutPage() {
  let timeline = fallbackTimeline;
  let leaders = fallbackLeaders;
  let stats = fallbackStats;

  try {
    const [sanityLeaders, sanityTimeline, settings] = await Promise.all([
      getLeaders(),
      getTimelineEvents(),
      getSiteSettings(),
    ]);

    if (sanityLeaders?.length > 0) {
      leaders = sanityLeaders.map((l: { name: string; role: string; image: string }) => ({
        name: l.name,
        role: l.role,
        image: l.image,
      }));
    }

    if (sanityTimeline?.length > 0) {
      timeline = sanityTimeline.map((t: { year: string; event: string }) => ({
        year: t.year,
        event: t.event,
      }));
    }

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
                    CergyPro is a global technology consulting firm with more than 9,000 professionals delivering AI, advanced analytics, cybersecurity, and digital transformation solutions. We combine deep domain expertise with enterprise-grade engineering to help organizations operate smarter, faster, and more securely.
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

        {/* Leadership */}
        <section className="bg-white">
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
        </section>

        {/* Timeline */}
        <section className="bg-white">
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
        </section>

        {/* Careers CTA */}
        <section className="bg-emerald-400 text-black">
          <AnimateIn animation="fadeUp">
            <Link
              href="/careers"
              className="group max-w-[1400px] mx-auto px-6 py-16 md:py-20 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 opacity-70">
                  JOIN OUR TEAM
                </p>
                <h2 className="text-3xl md:text-4xl font-light max-w-2xl leading-tight">
                  Build your career solving the most complex technology challenges in government, energy, and enterprise
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
