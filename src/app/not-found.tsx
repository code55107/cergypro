import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-32 text-center">
          <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            ERROR 404
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6">
            Page not found
          </h1>
          <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto">
            The page you are looking for may have been moved, deleted, or does
            not exist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="btn-shine inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors"
            >
              GO HOME
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 border border-gray-300 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:bg-gray-100 transition-colors"
            >
              CONTACT US
            </Link>
          </div>
          <nav className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600" aria-label="Quick links">
            <Link href="/industries" className="hover:text-gray-900 transition-colors">Industries</Link>
            <Link href="/capabilities" className="hover:text-gray-900 transition-colors">Capabilities</Link>
            <Link href="/insights" className="hover:text-gray-900 transition-colors">Insights</Link>
            <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
            <Link href="/careers" className="hover:text-gray-900 transition-colors">Careers</Link>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
