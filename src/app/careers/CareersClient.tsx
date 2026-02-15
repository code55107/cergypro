"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";

interface JobListing {
  title: string;
  location: string;
  department: string;
  type: string;
  id: string;
  posted: string;
}

interface CareersClientProps {
  jobs: JobListing[];
}

const benefits = [
  { icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>, title: "Learning & Development", description: "Tuition reimbursement, certifications, and continuous learning programs." },
  { icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>, title: "Health & Wellness", description: "Comprehensive medical, dental, and vision plus wellness programs and gym subsidies." },
  { icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>, title: "Flexible Work", description: "Remote and hybrid options with flexible schedules to support work-life balance." },
  { icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "Financial Security", description: "Competitive compensation, 401(k) matching, and employee stock purchase plan." },
];

export default function CareersClient({ jobs }: CareersClientProps) {
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filtered = search
    ? jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(search.toLowerCase()) ||
          j.department.toLowerCase().includes(search.toLowerCase()) ||
          j.location.toLowerCase().includes(search.toLowerCase())
      )
    : jobs;

  return (
    <>
      <Header />
      <main>
        {/* Hero with Search */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-amber-950/30 via-black to-black overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6">
            <p className="text-accent-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "opacity 500ms cubic-bezier(0.16,1,0.3,1) 200ms, transform 500ms cubic-bezier(0.16,1,0.3,1) 200ms" }}>
              CAREERS
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-[1.1] mb-6 max-w-3xl" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)", transition: "opacity 700ms cubic-bezier(0.16,1,0.3,1) 300ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 300ms" }}>
              Do work that makes a difference
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mb-10" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1) 500ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 500ms" }}>
              Join a team of 9,000+ professionals tackling the world&apos;s most complex challenges across technology, consulting, and design.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl" style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "opacity 600ms cubic-bezier(0.16,1,0.3,1) 700ms, transform 600ms cubic-bezier(0.16,1,0.3,1) 700ms" }}>
              <label htmlFor="job-search" className="sr-only">Search jobs</label>
              <input id="job-search" type="text" placeholder="Search jobs by title, department, or location..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 px-5 py-4 bg-[#1a1a1a] border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-accent-cyan/50 transition-colors" />
              <button className="btn-shine px-8 py-4 bg-amber-400 text-black text-sm font-semibold tracking-wider uppercase hover:bg-amber-300 transition-colors">FIND JOBS</button>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-white border-y border-gray-200">
          <AnimateIn animation="fadeUp">
            <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-gray-900 text-lg">We are hiring across all practice areas. Explore open positions and find your fit.</p>
              <Link href="/careers" className="btn-shine inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all shrink-0">
                WHY CERGYPRO?
              </Link>
            </div>
          </AnimateIn>
        </section>

        {/* Job Listings */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <h2 className="text-2xl font-light text-gray-900 mb-8">
                {search ? `Results for "${search}"` : "Be the first to apply"}
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((job, i) => (
                <AnimateIn key={job.id} animation="fadeUp" delay={i % 2 * 120}>
                  <div className="group bg-white border border-gray-200 p-6 rounded-sm hover:border-amber-400/30 transition-all card-lift">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-500 transition-colors">{job.title}</h3>
                      <button className="text-gray-400 hover:text-amber-500 transition-colors shrink-0 ml-4" aria-label={`Save ${job.title}`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                        {job.location}
                      </span>
                      <span className="text-gray-300">|</span>
                      <span>{job.department}</span>
                      <span className="text-gray-300">|</span>
                      <span>{job.type}</span>
                      <span className="text-gray-300">|</span>
                      <span>{job.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">{job.posted}</span>
                      <button className="btn-shine px-5 py-2 bg-gray-900 text-white text-xs font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors">APPLY NOW</button>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
            {filtered.length === 0 && <p className="text-gray-500 text-center py-12">No jobs match your search. Try different keywords.</p>}
            {filtered.length > 0 && (
              <AnimateIn animation="fadeUp">
                <div className="text-center mt-10">
                  <button className="px-8 py-3 border border-gray-300 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:bg-gray-100 transition-colors">VIEW MORE OPENINGS</button>
                </div>
              </AnimateIn>
            )}
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <AnimateIn animation="fadeUp">
              <p className="text-gray-500 text-xs font-semibold tracking-[0.2em] uppercase mb-4">BENEFITS</p>
              <h2 className="text-3xl font-light text-gray-900 mb-12">What we offer</h2>
            </AnimateIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b, i) => (
                <AnimateIn key={b.title} animation="fadeUp" delay={i * 120}>
                  <div>
                    <div className="text-gray-400 mb-4">{b.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{b.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{b.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Life at CergyPro */}
        <section className="bg-blue-600">
          <AnimateIn animation="fadeUp">
            <div className="max-w-[1400px] mx-auto px-6 py-20">
              <h2 className="text-3xl md:text-4xl font-light text-white max-w-3xl leading-tight">
                At CergyPro, you will work alongside brilliant minds on projects that shape the future of communities, governments, and industries around the world.
              </h2>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
