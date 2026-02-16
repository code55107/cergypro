import type { Metadata } from "next";
import { getJobListings } from "@/lib/sanity";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers — Join Our Team of 9,000+ Technology Professionals | CergyPro",
  description:
    "Build your career at CergyPro. Explore open positions in AI, cloud engineering, cybersecurity, data science, and digital transformation across 70+ global offices.",
  openGraph: {
    title: "Careers at CergyPro",
    description:
      "Join 9,000+ technologists, engineers, and consultants solving the most complex challenges in government, energy, and enterprise technology.",
    url: "https://www.cergypro.com/careers",
  },
};

export const revalidate = 60;

const fallbackJobs = [
  { title: "Senior ServiceNow Developer", location: "Reston, VA", department: "ServiceNow Consulting", type: "Full-time", id: "JR-2025-2115", posted: "1 day ago" },
  { title: "ServiceNow Solutions Architect", location: "Remote - US", department: "ServiceNow Consulting", type: "Full-time", id: "JR-2025-2108", posted: "2 days ago" },
  { title: "ServiceNow ITOM Consultant", location: "Washington, DC", department: "ServiceNow Consulting", type: "Full-time", id: "JR-2025-2104", posted: "2 days ago" },
  { title: "Senior Machine Learning Engineer", location: "Reston, VA", department: "AI & Analytics", type: "Full-time", id: "JR-2025-2103", posted: "2 days ago" },
  { title: "Cloud Solutions Architect — AWS", location: "Remote - US", department: "Cloud & Infrastructure", type: "Full-time", id: "JR-2025-2091", posted: "3 days ago" },
  { title: "Zero Trust Security Engineer", location: "Washington, DC", department: "Cybersecurity", type: "Full-time", id: "JR-2025-2087", posted: "3 days ago" },
  { title: "Full Stack Developer — React/Node", location: "Remote - US", department: "Application Development", type: "Full-time", id: "JR-2025-2068", posted: "1 week ago" },
  { title: "DevSecOps Engineer", location: "Reston, VA", department: "Cloud & Infrastructure", type: "Full-time", id: "JR-2025-2055", posted: "1 week ago" },
  { title: "Federal IT Program Manager", location: "Washington, DC", department: "Government Services", type: "Full-time", id: "JR-2025-2033", posted: "2 weeks ago" },
];

function formatPostedDate(dateStr: string): string {
  if (!dateStr) return "";
  const posted = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - posted.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

export default async function CareersPage() {
  let jobs = fallbackJobs;

  try {
    const sanityJobs = await getJobListings();
    if (sanityJobs?.length > 0) {
      jobs = sanityJobs.map((j: { title: string; location: string; department: string; type: string; jobId: string; postedDate: string }) => ({
        title: j.title,
        location: j.location,
        department: j.department,
        type: j.type,
        id: j.jobId,
        posted: formatPostedDate(j.postedDate),
      }));
    }
  } catch (e) {
    console.error("Failed to fetch jobs from Sanity, using fallback data:", e);
  }

  return <CareersClient jobs={jobs} />;
}
