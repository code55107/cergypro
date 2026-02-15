import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export const client = createClient({
  projectId: "sk1a19mb",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// GROQ Queries
export async function getArticles(type?: string, category?: string) {
  let filter = `_type == "article"`;
  if (type) filter += ` && articleType == "${type}"`;
  if (category && category !== "All") filter += ` && category == "${category}"`;
  return client.fetch(`*[${filter}] | order(_createdAt desc) {
    _id, tag, title, description, "imageSrc": image.asset->url, category, articleType, featured, "slug": slug.current
  }`);
}

export async function getFeaturedArticle() {
  return client.fetch(`*[_type == "article" && featured == true][0] {
    _id, tag, title, description, "imageSrc": image.asset->url, "slug": slug.current
  }`);
}

export async function getIndustries() {
  return client.fetch(`*[_type == "industry"] | order(order asc) {
    _id, name, description, "image": image.asset->url
  }`);
}

export async function getLeaders() {
  return client.fetch(`*[_type == "person"] | order(order asc) {
    _id, name, role, "image": image.asset->url
  }`);
}

export async function getJobListings() {
  return client.fetch(`*[_type == "jobListing"] | order(postedDate desc) {
    _id, title, location, department, type, jobId, postedDate
  }`);
}

export async function getTimelineEvents() {
  return client.fetch(`*[_type == "timelineEvent"] | order(order asc) {
    _id, year, event
  }`);
}

export async function getOfficeLocations() {
  return client.fetch(`*[_type == "officeLocation"] {
    _id, city, address, phone, locationType
  }`);
}

export async function getCapabilities() {
  return client.fetch(`*[_type == "capability"] | order(order asc) {
    _id, name, description, category
  }`);
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0] {
    companyName,
    heroSlides[] {
      tag, title, subtitle, cta,
      "image": image.asset->url
    },
    stats[] { value, label },
    bannerTitle,
    bannerColor
  }`);
}
