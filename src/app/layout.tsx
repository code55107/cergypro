import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothCursor from "@/components/SmoothCursor";
import SkipToContent from "@/components/ui/SkipToContent";
import { OrganizationJsonLd } from "@/components/JsonLd";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  display: "swap",
});

const siteUrl = "https://www.cergypro.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CergyPro - Technology, Consulting & Digital Solutions",
    template: "%s | CergyPro",
  },
  description:
    "CergyPro is a global consulting and technology services company with 9,000+ professionals delivering solutions in AI, cloud, cybersecurity, and digital modernization.",
  keywords: [
    "consulting",
    "technology services",
    "AI",
    "digital modernization",
    "cloud solutions",
    "cybersecurity",
    "federal services",
    "energy",
    "utilities",
  ],
  authors: [{ name: "CergyPro" }],
  creator: "CergyPro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "CergyPro",
    title: "CergyPro - Technology, Consulting & Digital Solutions",
    description:
      "Global consulting and technology services company with 9,000+ professionals delivering solutions in AI, cloud, cybersecurity, and digital modernization.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "CergyPro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CergyPro - Technology, Consulting & Digital Solutions",
    description:
      "Global consulting and technology services company with 9,000+ professionals.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} antialiased bg-white text-gray-900`}
      >
        <SkipToContent />
        <OrganizationJsonLd />
        <ScrollProgress />
        <SmoothCursor />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
