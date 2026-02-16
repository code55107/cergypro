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
  title: "About",
  description:
    "Learn about CergyPro — a purpose-driven, technology-forward company with 9,000+ professionals tackling complex challenges for over four decades.",
  openGraph: {
    title: "About CergyPro",
    description:
      "Purpose-driven. Technology-forward. People-first. Over four decades of partnering with governments, businesses, and communities.",
    url: "https://www.cergypro.com/about",
  },
};

export const revalidate = 60;

const fallbackTimeline = [
  { year: "1969", event: "Founded as a research and consulting firm focused on social programs and public policy." },
  { year: "1980", event: "Expanded into environmental services, becoming a leader in ecological assessment." },
  { year: "1999", event: "Entered the technology consulting space with digital modernization capabilities." },
  { year: "2006", event: "Went public on the NYSE, fueling expansion into federal health and disaster management." },
  { year: "2015", event: "Acquired a leading digital agency, adding creative and marketing capabilities." },
  { year: "2020", event: "Launched AI and data analytics practice to address growing demand for intelligent automation." },
  { year: "2024", event: "Introduced Sightline platform, powered by responsible AI for utility customer engagement." },
];

const fallbackLeaders = [
  { name: "Sarah Chen", role: "Chief Executive Officer", image: "/images/leader-1.jpg" },
  { name: "Michael Torres", role: "Chief Operating Officer", image: "/images/leader-2.jpg" },
  { name: "Dr. Amara Osei", role: "Chief Technology Officer", image: "/images/leader-3.jpg" },
  { name: "James Whitfield", role: "Chief Financial Officer", image: "/images/leader-4.jpg" },
  { name: "Lisa Nakamura", role: "EVP, Federal Services", image: "/images/leader-5.jpg" },
  { name: "David Okonkwo", role: "EVP, Energy & Environment", image: "/images/leader-6.jpg" },
];

const values = [
  { title: "Purpose-driven", description: "We tackle the challenges that matter most to society, from climate resilience to public health equity." },
  { title: "Collaborative", description: "We bring together diverse experts to create solutions that no single discipline could achieve alone." },
  { title: "Innovative", description: "We invest in emerging technologies and approaches that push the boundaries of what's possible." },
  { title: "Accountable", description: "We hold ourselves to the highest standards of ethics, transparency, and measurable results." },
];

const fallbackStats = [
  { value: "9,000+", label: "Employees worldwide" },
  { value: "70+", label: "Global office locations" },
  { value: "$2B+", label: "Annual revenue" },
  { value: "2,000+", label: "Active client engagements" },
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
          title="Purpose-driven. Technology-forward. People-first."
          subtitle="For over four decades, we have partnered with governments, businesses, and communities to solve complex challenges and create lasting impact."
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
                    We help our clients navigate complexity and make a meaningful difference
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    CergyPro is a global consulting and technology services company with more than 9,000 professionals focused on making big things possible for our clients. We combine domain expertise, advanced analytics, and human-centered design to deliver solutions that improve lives and strengthen communities.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Our work spans federal government, commercial enterprises, and international organizations. Whether helping utilities modernize their customer platforms or supporting disaster recovery for millions of affected families, we bring the same commitment to quality, innovation, and impact.
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

        {/* Corporate Citizenship */}
        <section className="bg-emerald-400 text-black">
          <AnimateIn animation="fadeUp">
            <Link
              href="/about"
              className="group max-w-[1400px] mx-auto px-6 py-16 md:py-20 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 opacity-70">
                  CORPORATE CITIZENSHIP
                </p>
                <h2 className="text-3xl md:text-4xl font-light max-w-2xl leading-tight">
                  Our commitment to the communities where we live and work
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
