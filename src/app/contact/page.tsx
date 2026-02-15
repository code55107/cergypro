import type { Metadata } from "next";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import ContactForm from "@/components/ContactForm";
import { getOfficeLocations } from "@/lib/sanity";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with CergyPro. Reach our offices in Reston VA, New York, Atlanta, San Francisco, London, and Brussels.",
  openGraph: {
    title: "Contact CergyPro",
    description:
      "Start a conversation. Offices in Reston VA, New York, Atlanta, San Francisco, London, and Brussels.",
    url: "https://www.cergypro.com/contact",
  },
};

export const revalidate = 60;

const fallbackOffices = [
  { city: "Reston, VA", address: "1902 Reston Metro Plaza, Suite 100", phone: "+1 (703) 555-0100", type: "Global Headquarters" },
  { city: "New York, NY", address: "420 Fifth Avenue, 28th Floor", phone: "+1 (212) 555-0200", type: "Regional Office" },
  { city: "Atlanta, GA", address: "191 Peachtree Street NE, Suite 3400", phone: "+1 (404) 555-0300", type: "Regional Office" },
  { city: "San Francisco, CA", address: "101 California Street, Suite 2710", phone: "+1 (415) 555-0400", type: "Regional Office" },
  { city: "London, UK", address: "25 Old Broad Street, EC2N 1HN", phone: "+44 20 7555 0500", type: "European Headquarters" },
  { city: "Brussels, Belgium", address: "Rue de la Loi 227, 1040", phone: "+32 2 555 0600", type: "EU Office" },
];

export default async function ContactPage() {
  let offices = fallbackOffices;

  try {
    const sanityOffices = await getOfficeLocations();
    if (sanityOffices?.length > 0) {
      offices = sanityOffices.map((o: { city: string; address: string; phone: string; locationType: string }) => ({
        city: o.city,
        address: o.address,
        phone: o.phone,
        type: o.locationType,
      }));
    }
  } catch (e) {
    console.error("Failed to fetch offices from Sanity, using fallback data:", e);
  }

  return (
    <>
      <LocalBusinessJsonLd />
      <Header />
      <main>
        <PageHero
          tag="CONTACT US"
          title="Let's start a conversation"
          subtitle="Whether you have a specific challenge in mind or want to explore how we can work together, we are here to help."
          bgGradient="from-pink-950/30 via-black to-black"
        />

        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <AnimateIn animation="fadeRight">
                <div>
                  <h2 className="text-2xl font-light text-gray-900 mb-8">Get in touch</h2>
                  <ContactForm />
                </div>
              </AnimateIn>

              {/* Contact Info */}
              <AnimateIn animation="fadeLeft" delay={200}>
                <div>
                  <h2 className="text-2xl font-light text-gray-900 mb-8">Other ways to connect</h2>
                  <div className="space-y-8">
                    {[
                      { title: "General Inquiries", line1: "info@cergypro.com", line2: "+1 (703) 555-0100" },
                      { title: "Media & Press", line1: "press@cergypro.com", line2: "+1 (703) 555-0150" },
                      { title: "Partnership Opportunities", line1: "partnerships@cergypro.com", line2: "+1 (703) 555-0175" },
                      { title: "Supplier Registration", line1: "Visit our supplier portal to register as a vendor or subcontractor.", line2: "" },
                    ].map((card, i) => (
                      <AnimateIn key={card.title} animation="fadeUp" delay={300 + i * 100}>
                        <div className="bg-gray-50 border border-gray-200 p-6 rounded-sm hover:bg-gray-100 transition-colors">
                          <h3 className="text-gray-900 font-semibold mb-2">{card.title}</h3>
                          <p className="text-gray-600 text-sm mb-1">{card.line1}</p>
                          {card.line2 && <p className="text-gray-600 text-sm">{card.line2}</p>}
                        </div>
                      </AnimateIn>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="bg-white border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">LOCATIONS</p>
              <h2 className="text-3xl font-light text-gray-900 mb-12">Our offices</h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {offices.map((office, i) => (
                <AnimateIn key={office.city} animation="fadeUp" delay={i % 3 * 120}>
                  <div className="border-t border-gray-200 pt-6">
                    <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase mb-2">{office.type}</p>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{office.city}</h3>
                    <p className="text-gray-600 text-sm">{office.address}</p>
                    <p className="text-gray-600 text-sm mt-1">{office.phone}</p>
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
