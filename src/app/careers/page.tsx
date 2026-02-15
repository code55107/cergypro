import { getJobListings } from "@/lib/sanity";
import CareersClient from "./CareersClient";

export const revalidate = 60;

const fallbackJobs = [
  { title: "Senior Data Scientist", location: "Reston, VA", department: "AI & Analytics", type: "Full-time", id: "JR-2024-1847", posted: "2 days ago" },
  { title: "Cloud Solutions Architect", location: "Remote - US", department: "Technology", type: "Full-time", id: "JR-2024-1832", posted: "3 days ago" },
  { title: "Disaster Recovery Program Manager", location: "Atlanta, GA", department: "Disaster Management", type: "Full-time", id: "JR-2024-1821", posted: "5 days ago" },
  { title: "UX Research Lead", location: "New York, NY", department: "Experience & Design", type: "Full-time", id: "JR-2024-1815", posted: "1 week ago" },
  { title: "Cybersecurity Analyst", location: "Washington, DC", department: "Cybersecurity", type: "Full-time", id: "JR-2024-1799", posted: "1 week ago" },
  { title: "Energy Policy Consultant", location: "San Francisco, CA", department: "Energy & Utilities", type: "Full-time", id: "JR-2024-1788", posted: "2 weeks ago" },
  { title: "DevOps Engineer", location: "Remote - US", department: "Technology", type: "Full-time", id: "JR-2024-1776", posted: "2 weeks ago" },
  { title: "Health Informatics Specialist", location: "Bethesda, MD", department: "Federal Health", type: "Full-time", id: "JR-2024-1762", posted: "2 weeks ago" },
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
