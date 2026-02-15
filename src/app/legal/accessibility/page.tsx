import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "CergyPro accessibility statement — our commitment to making our website accessible to all users.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">LEGAL</p>
            <h1 className="text-4xl font-light text-gray-900 mb-8">Accessibility Statement</h1>
            <p className="text-gray-600 text-sm mb-6">Last updated: January 1, 2025</p>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Our Commitment</h2>
              <p>CergyPro is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards to our website.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Standards</h2>
              <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with a wide array of disabilities.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Measures We Take</h2>
              <p>We work to ensure our website supports keyboard navigation, screen readers, and other assistive technologies. We use semantic HTML, provide alternative text for images, maintain sufficient color contrast, and test regularly with accessibility tools.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Feedback</h2>
              <p>We welcome your feedback on the accessibility of the CergyPro website. If you encounter accessibility barriers or have suggestions, please contact us at accessibility@cergypro.com or call +1 (703) 555-0100.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
