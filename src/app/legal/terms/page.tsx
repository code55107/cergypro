import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "CergyPro terms of use governing your access to and use of our website and services.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">LEGAL</p>
            <h1 className="text-4xl font-light text-gray-900 mb-8">Terms of Use</h1>
            <p className="text-gray-600 text-sm mb-6">Last updated: January 1, 2025</p>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Acceptance of Terms</h2>
              <p>By accessing and using the CergyPro website, you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use this website.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, images, and software, is the property of CergyPro Inc. or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Use Restrictions</h2>
              <p>You agree not to use this website for any unlawful purpose, to interfere with its operation, or to attempt unauthorized access to any systems or networks connected to it.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Disclaimer</h2>
              <p>This website is provided &quot;as is&quot; without warranties of any kind. CergyPro does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Limitation of Liability</h2>
              <p>CergyPro shall not be liable for any damages arising from your use of or inability to use this website, including direct, indirect, incidental, or consequential damages.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Contact</h2>
              <p>For questions about these Terms, contact us at legal@cergypro.com.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
