interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "CergyPro",
        url: "https://www.cergypro.com",
        logo: "https://www.cergypro.com/images/logo.png",
        description:
          "CergyPro is a global consulting and technology services company with more than 9,000 professionals focused on making big things possible for our clients.",
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: 9000,
          unitText: "employees",
        },
        foundingDate: "1969",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1902 Reston Metro Plaza, Suite 100",
          addressLocality: "Reston",
          addressRegion: "VA",
          postalCode: "20190",
          addressCountry: "US",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-703-555-0100",
          contactType: "customer service",
        },
        sameAs: [
          "https://www.linkedin.com/company/cergypro",
          "https://twitter.com/cergypro",
        ],
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

export function JobPostingJsonLd({
  title,
  description,
  location,
  department,
  jobId,
  postedDate,
}: {
  title: string;
  description: string;
  location: string;
  department: string;
  jobId: string;
  postedDate?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title,
        description,
        identifier: {
          "@type": "PropertyValue",
          name: "CergyPro",
          value: jobId,
        },
        hiringOrganization: {
          "@type": "Organization",
          name: "CergyPro",
          sameAs: "https://www.cergypro.com",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: location,
          },
        },
        industry: department,
        datePosted: postedDate || new Date().toISOString().split("T")[0],
      }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "CergyPro",
        url: "https://www.cergypro.com",
        telephone: "+1-703-555-0100",
        email: "info@cergypro.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "1902 Reston Metro Plaza, Suite 100",
          addressLocality: "Reston",
          addressRegion: "VA",
          postalCode: "20190",
          addressCountry: "US",
        },
        openingHours: "Mo-Fr 08:00-18:00",
      }}
    />
  );
}
