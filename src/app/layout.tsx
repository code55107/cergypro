import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothCursor from "@/components/SmoothCursor";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CergyPro - The Most Trusted Utility Platform",
  description:
    "CergyPro delivers innovative solutions for customer engagement, data centers, and digital platforms powered by AI.",
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
        <ScrollProgress />
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
