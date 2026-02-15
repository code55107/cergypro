import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import { BreadcrumbJsonLd, JobPostingJsonLd } from "@/components/JsonLd";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Job Detail",
};

const fallbackJob = {
  title: "Senior Data Scientist",
  location: "Reston, VA",
  department: "AI & Analytics",
  type: "Full-time",
  id: "JR-2024-1847",
  posted: "2 days ago",
  description:
    "We are looking for a Senior Data Scientist to join our AI & Analytics practice. You will work with cross-functional teams to design and deploy machine learning models that solve complex problems for our clients across government and commercial sectors.",
  responsibilities: [
    "Design and implement machine learning models for client engagements",
    "Collaborate with data engineers to build scalable data pipelines",
    "Present findings and recommendations to senior stakeholders",
    "Mentor junior data scientists and contribute to practice growth",
    "Stay current with emerging AI/ML technologies and methodologies",
  ],
  qualifications: [
    "Master's or PhD in Computer Science, Statistics, or related field",
    "5+ years of experience in applied data science or machine learning",
    "Proficiency in Python, R, and SQL",
    "Experience with cloud platforms (AWS, Azure, or GCP)",
    "Strong communication skills and ability to explain technical concepts to non-technical audiences",
    "US citizenship or ability to obtain a security clearance preferred",
  ],
};

export default function JobDetailPage() {
  const job = fallbackJob;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.cergypro.com" },
          { name: "Careers", url: "https://www.cergypro.com/careers" },
          { name: job.title, url: `https://www.cergypro.com/careers/${job.id}` },
        ]}
      />
      <JobPostingJsonLd
        title={job.title}
        description={job.description}
        location={job.location}
        department={job.department}
        jobId={job.id}
      />
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-amber-950/30 via-black to-black">
          <div className="max-w-[1400px] mx-auto px-6">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              All Jobs
            </Link>
            <h1 className="text-3xl md:text-4xl font-light text-white mb-4">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {job.location}
              </span>
              <span>{job.department}</span>
              <span>{job.type}</span>
              <span>{job.id}</span>
              <span>Posted {job.posted}</span>
            </div>
            <button className="btn-shine px-8 py-3 bg-amber-400 text-black text-sm font-semibold tracking-wider uppercase hover:bg-amber-300 transition-colors">
              APPLY NOW
            </button>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-[1400px] mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2 space-y-12">
                <AnimateIn animation="fadeUp">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Role</h2>
                    <p className="text-gray-600 leading-relaxed">{job.description}</p>
                  </div>
                </AnimateIn>

                <AnimateIn animation="fadeUp" delay={100}>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
                    <ul className="space-y-3">
                      {job.responsibilities.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                          <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>

                <AnimateIn animation="fadeUp" delay={200}>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Qualifications</h2>
                    <ul className="space-y-3">
                      {job.qualifications.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                          <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimateIn>
              </div>

              <aside>
                <AnimateIn animation="fadeLeft" delay={150}>
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-sm sticky top-24">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Apply</h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Interested in this role? Submit your application and a recruiter will be in touch.
                    </p>
                    <button className="btn-shine w-full px-6 py-3 bg-amber-400 text-black text-sm font-semibold tracking-wider uppercase hover:bg-amber-300 transition-colors mb-4">
                      APPLY NOW
                    </button>
                    <button className="w-full px-6 py-3 border border-gray-300 text-gray-900 text-sm font-semibold tracking-wider uppercase hover:bg-gray-100 transition-colors">
                      SAVE JOB
                    </button>
                  </div>
                </AnimateIn>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
