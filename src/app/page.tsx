import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCard from "@/components/FeaturedCard";
import ContentCard from "@/components/ContentCard";
import SectionHeading from "@/components/SectionHeading";
import HighlightBanner from "@/components/HighlightBanner";
import StatCounter from "@/components/StatCounter";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Featured Content */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <FeaturedCard
                tag="CASE STUDY"
                title="Modernizing energy grid management for 12 million customers"
                description="See how we partnered with a major utility provider to deploy AI-driven demand forecasting, reducing outage response time by 40% and improving customer satisfaction scores."
                imageSrc="/images/energy-grid.jpg"
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
              <AnimateIn animation="fadeUp" delay={0}>
                <ContentCard
                  tag="ARTIFICIAL INTELLIGENCE"
                  title="Why responsible AI governance is the next competitive advantage"
                  description="Organizations that embed ethical AI frameworks early are seeing measurable returns in stakeholder trust."
                  imageSrc="/images/ai-governance.jpg"
                  href="/insights"
                />
              </AnimateIn>
              <AnimateIn animation="fadeUp" delay={150}>
                <ContentCard
                  tag="CLIMATE RESILIENCE"
                  title="Building adaptive infrastructure for a changing climate"
                  description="New approaches to infrastructure planning that account for extreme weather events and rising sea levels."
                  imageSrc="/images/climate-infrastructure.jpg"
                  href="/insights"
                />
              </AnimateIn>
              <AnimateIn animation="fadeUp" delay={300}>
                <ContentCard
                  tag="DIGITAL HEALTH"
                  title="Telehealth adoption trends reshaping federal health programs"
                  description="A look at how virtual care models are transforming access and outcomes across underserved communities."
                  imageSrc="/images/digital-health.jpg"
                  href="/insights"
                />
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* Highlight Banner */}
        <HighlightBanner
          title="Discover how data analytics and AI are transforming public sector decision-making"
          bgColor="bg-emerald-400"
          textColor="text-black"
          href="/capabilities"
        />

        {/* Stats Section */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <SectionHeading title="CergyPro at a glance" />
            <StatCounter
              stats={[
                { value: "9,000+", label: "Employees worldwide" },
                { value: "70+", label: "Global office locations" },
                { value: "$2B+", label: "Annual revenue" },
                { value: "40+", label: "Years of experience" },
              ]}
            />
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
              <AnimateIn animation="fadeUp" delay={0}>
                <ContentCard
                  tag="WEBINAR"
                  title="The future of utility customer engagement in 2025"
                  imageSrc="/images/utility-engagement.jpg"
                  href="/insights"
                />
              </AnimateIn>
              <AnimateIn animation="fadeUp" delay={150}>
                <ContentCard
                  tag="WEBINAR"
                  title="Navigating federal grant management with automation"
                  imageSrc="/images/grants-automation.jpg"
                  href="/insights"
                />
              </AnimateIn>
              <AnimateIn animation="fadeUp" delay={300}>
                <ContentCard
                  tag="VIRTUAL EVENT"
                  title="CergyPro Innovation Summit: Responsible AI in Practice"
                  imageSrc="/images/innovation-summit.jpg"
                  href="/insights"
                />
              </AnimateIn>
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
              <AnimateIn animation="fadeUp" delay={0}>
                <ContentCard
                  tag="CLIENT STORY"
                  title="Helping a state agency reduce disaster response time by 60%"
                  imageSrc="/images/disaster-response.jpg"
                  href="/insights"
                />
              </AnimateIn>
              <AnimateIn animation="fadeUp" delay={150}>
                <ContentCard
                  tag="CLIENT STORY"
                  title="Deploying cloud-native platforms for a federal health system"
                  imageSrc="/images/cloud-platform.jpg"
                  href="/insights"
                />
              </AnimateIn>
              <AnimateIn animation="fadeUp" delay={300}>
                <ContentCard
                  tag="CLIENT STORY"
                  title="Transforming transportation data into actionable intelligence"
                  imageSrc="/images/transportation-data.jpg"
                  href="/insights"
                />
              </AnimateIn>
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
