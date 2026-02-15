import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "CergyPro cookie policy — how we use cookies and similar technologies on our website.",
};

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">LEGAL</p>
            <h1 className="text-4xl font-light text-gray-900 mb-8">Cookie Policy</h1>
            <p className="text-gray-600 text-sm mb-6">Last updated: January 1, 2025</p>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">What Are Cookies</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, understand how you use our site, and improve your experience.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Types of Cookies We Use</h2>
              <p><strong>Essential Cookies:</strong> Required for basic website functionality such as navigation and secure access.</p>
              <p><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous usage data.</p>
              <p><strong>Functional Cookies:</strong> Remember your preferences and settings to provide a personalized experience.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Managing Cookies</h2>
              <p>You can control and manage cookies through your browser settings. Note that disabling certain cookies may affect website functionality. Most browsers allow you to refuse or delete cookies.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Contact</h2>
              <p>For questions about our Cookie Policy, contact us at privacy@cergypro.com.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
