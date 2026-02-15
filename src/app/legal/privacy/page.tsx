import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Statement",
  description: "CergyPro privacy statement — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">LEGAL</p>
            <h1 className="text-4xl font-light text-gray-900 mb-8">Privacy Statement</h1>
            <p className="text-gray-600 text-sm mb-6">Last updated: January 1, 2025</p>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm leading-relaxed">
              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Information We Collect</h2>
              <p>CergyPro collects personal information that you voluntarily provide when you interact with our website, submit inquiries, apply for positions, or engage with our services. This may include your name, email address, phone number, organization, and other professional details.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to respond to your inquiries, process job applications, improve our services, send relevant communications, and comply with legal obligations. We do not sell your personal information to third parties.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is completely secure.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Your Rights</h2>
              <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal information. You may also have the right to opt out of certain data processing activities. To exercise your rights, please contact us at privacy@cergypro.com.</p>

              <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Contact Us</h2>
              <p>If you have questions about this Privacy Statement, please contact our Privacy Office at privacy@cergypro.com or write to CergyPro Inc., 1902 Reston Metro Plaza, Suite 100, Reston, VA 20190.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
