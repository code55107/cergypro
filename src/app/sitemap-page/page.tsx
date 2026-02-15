import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "CergyPro website sitemap — navigate to all pages and sections of our website.",
};

const sections = [
  {
    title: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About CergyPro", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Capabilities", href: "/capabilities" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Investors", href: "/investors" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Energy & Utilities", href: "/industries" },
      { label: "Federal Health", href: "/industries" },
      { label: "Disaster Management", href: "/industries" },
      { label: "Transportation", href: "/industries" },
      { label: "Environmental Services", href: "/industries" },
      { label: "Climate Resilience", href: "/industries" },
      { label: "Aviation", href: "/industries" },
      { label: "U.S. Federal", href: "/industries" },
      { label: "Social Programs", href: "/industries" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Digital Modernization", href: "/capabilities" },
      { label: "Artificial Intelligence", href: "/capabilities" },
      { label: "Data & Analytics", href: "/capabilities" },
      { label: "Cloud", href: "/capabilities" },
      { label: "Cybersecurity", href: "/capabilities" },
      { label: "Strategy & Innovation", href: "/capabilities" },
      { label: "Experience & Design", href: "/capabilities" },
      { label: "Strategic Communications", href: "/capabilities" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/legal/terms" },
      { label: "Privacy Statement", href: "/legal/privacy" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Accessibility Statement", href: "/legal/accessibility" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <h1 className="text-4xl font-light text-gray-900 mb-12">Sitemap</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                    {section.title}
                  </h2>
                  <nav aria-label={section.title} className="flex flex-col gap-2">
                    {section.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-gray-600 text-sm hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
