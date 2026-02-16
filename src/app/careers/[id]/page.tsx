import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import { BreadcrumbJsonLd, JobPostingJsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { getJobListings } from "@/lib/sanity";

interface JobData {
  title: string;
  location: string;
  department: string;
  type: string;
  id: string;
  posted: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

const fallbackJobs: JobData[] = [
  {
    title: "Senior ServiceNow Developer",
    location: "Reston, VA",
    department: "ServiceNow Consulting",
    type: "Full-time",
    id: "JR-2025-2115",
    posted: "1 day ago",
    description: "Join our ServiceNow consulting practice — our largest and fastest-growing service line — as a Senior Developer. You will lead technical delivery on complex ServiceNow implementations across ITSM, ITOM, and custom application development for government and enterprise clients.",
    responsibilities: [
      "Lead technical development on ServiceNow ITSM, ITOM, and custom scoped application projects",
      "Design and build integrations using IntegrationHub, REST APIs, and MID Server configurations",
      "Develop complex workflows, business rules, client scripts, and UI policies on the Now Platform",
      "Collaborate with Solutions Architects to translate business requirements into scalable platform solutions",
      "Mentor junior developers and contribute to internal ServiceNow best practices and accelerators",
      "Participate in platform upgrades, performance optimization, and technical debt remediation",
    ],
    qualifications: [
      "5+ years of hands-on ServiceNow development experience across multiple modules",
      "ServiceNow Certified Application Developer (CAD) or Certified System Administrator (CSA)",
      "Strong experience with Flow Designer, Script Includes, GlideRecord, and the Now Platform APIs",
      "Experience with ServiceNow integrations (REST, SOAP, IntegrationHub, MID Server)",
      "Familiarity with Agile/Scrum delivery methodologies",
      "US citizenship or ability to obtain a government security clearance preferred",
    ],
  },
  {
    title: "ServiceNow Solutions Architect",
    location: "Remote - US",
    department: "ServiceNow Consulting",
    type: "Full-time",
    id: "JR-2025-2108",
    posted: "2 days ago",
    description: "We are seeking a ServiceNow Solutions Architect to lead platform strategy and technical architecture for our largest and most complex ServiceNow engagements. You will serve as the technical authority on multi-module implementations spanning ITSM, ITOM, SecOps, HR, and CSM.",
    responsibilities: [
      "Define end-to-end ServiceNow architecture for enterprise and federal implementations",
      "Lead discovery workshops and translate business requirements into platform solutions",
      "Design multi-instance strategies, data models, and integration architectures",
      "Provide technical governance across development teams to ensure platform best practices",
      "Advise clients on ServiceNow roadmap planning, licensing optimization, and upgrade strategy",
      "Drive pre-sales technical support including solution design, effort estimation, and proposal contributions",
    ],
    qualifications: [
      "8+ years of ServiceNow experience with at least 3 years in an architecture or lead role",
      "ServiceNow Certified Technical Architect (CTA) or Certified Implementation Specialist (CIS) in 2+ modules",
      "Deep expertise across ITSM, ITOM, SecOps, HRSD, or CSM modules",
      "Experience designing enterprise integrations with CMDB, monitoring tools, and identity providers",
      "Strong client-facing communication and stakeholder management skills",
      "Experience with federal or government ServiceNow implementations is a plus",
    ],
  },
  {
    title: "ServiceNow ITOM Consultant",
    location: "Washington, DC",
    department: "ServiceNow Consulting",
    type: "Full-time",
    id: "JR-2025-2104",
    posted: "2 days ago",
    description: "We are looking for a ServiceNow ITOM Consultant to help government and enterprise clients achieve complete visibility into their IT infrastructure. You will configure and deploy Discovery, Service Mapping, Event Management, and Cloud Management on the ServiceNow platform.",
    responsibilities: [
      "Implement ServiceNow Discovery, Service Mapping, and Event Management for enterprise environments",
      "Configure MID Servers, credential management, and discovery patterns for hybrid infrastructure",
      "Build and maintain accurate CMDB data models through automated discovery and reconciliation",
      "Integrate ServiceNow ITOM with third-party monitoring tools (Splunk, Dynatrace, Datadog, etc.)",
      "Develop runbooks and automation for event correlation and incident creation",
      "Provide post-deployment support including health checks, tuning, and capability expansion",
    ],
    qualifications: [
      "4+ years of ServiceNow experience with focus on ITOM modules (Discovery, Service Mapping, Event Management)",
      "ServiceNow Certified Implementation Specialist — ITOM or equivalent certifications",
      "Strong understanding of CMDB architecture, CI classification, and data reconciliation",
      "Experience with MID Server deployment, network discovery, and cloud discovery (AWS, Azure, GCP)",
      "Knowledge of ITSM-ITOM integration patterns (event-to-incident, CMDB-to-change workflows)",
      "Active security clearance or ability to obtain one required for government engagements",
    ],
  },
  {
    title: "Senior Machine Learning Engineer",
    location: "Reston, VA",
    department: "AI & Analytics",
    type: "Full-time",
    id: "JR-2025-2103",
    posted: "2 days ago",
    description: "Join our AI & Analytics practice to design and deploy production machine learning systems for government and commercial clients. You will build end-to-end ML pipelines — from data engineering and model development to deployment and monitoring — solving complex problems at enterprise scale.",
    responsibilities: [
      "Design and implement production machine learning models for client engagements across government and enterprise",
      "Build scalable ML pipelines using cloud-native services (SageMaker, Vertex AI, Azure ML)",
      "Collaborate with data engineers to architect robust data ingestion and feature engineering pipelines",
      "Deploy models with proper monitoring, drift detection, and automated retraining capabilities",
      "Present findings and recommendations to senior client stakeholders and executives",
      "Mentor junior data scientists and contribute to AI practice growth and IP development",
    ],
    qualifications: [
      "Master\u2019s or PhD in Computer Science, Statistics, or related quantitative field",
      "5+ years of experience building and deploying production ML models",
      "Proficiency in Python, SQL, and ML frameworks (PyTorch, TensorFlow, scikit-learn)",
      "Experience with cloud ML platforms (AWS SageMaker, GCP Vertex AI, or Azure ML)",
      "Strong understanding of MLOps practices including CI/CD for ML, model monitoring, and experiment tracking",
      "US citizenship or ability to obtain a security clearance preferred",
    ],
  },
  {
    title: "Cloud Solutions Architect \u2014 AWS",
    location: "Remote - US",
    department: "Cloud & Infrastructure",
    type: "Full-time",
    id: "JR-2025-2091",
    posted: "3 days ago",
    description: "We are seeking an experienced AWS Solutions Architect to lead cloud migration and modernization initiatives for federal and commercial clients. You will design secure, scalable architectures and guide teams through complex re-platforming and re-architecting efforts.",
    responsibilities: [
      "Design and lead cloud migration strategies for enterprise workloads to AWS",
      "Architect secure, highly available solutions using AWS services (EC2, ECS, Lambda, RDS, S3, etc.)",
      "Develop Infrastructure as Code using Terraform, CloudFormation, or CDK",
      "Implement security controls aligned with FedRAMP, NIST, and Zero Trust frameworks",
      "Lead technical teams through migration execution, performance testing, and cutover planning",
      "Collaborate with DevSecOps teams to establish CI/CD pipelines and automated security testing",
    ],
    qualifications: [
      "AWS Solutions Architect Professional or equivalent certification",
      "7+ years of cloud architecture experience with at least 4 years focused on AWS",
      "Deep expertise in AWS networking (VPC, Transit Gateway, Direct Connect, PrivateLink)",
      "Experience with containerization (ECS, EKS) and serverless architectures (Lambda, Step Functions)",
      "Strong understanding of cloud security, IAM policies, and encryption at rest/in transit",
      "Experience with federal cloud environments (GovCloud, FedRAMP) is a strong plus",
    ],
  },
  {
    title: "Zero Trust Security Engineer",
    location: "Washington, DC",
    department: "Cybersecurity",
    type: "Full-time",
    id: "JR-2025-2087",
    posted: "3 days ago",
    description: "Join our cybersecurity practice to help federal agencies and enterprises implement zero-trust security architectures. You will design and deploy identity-centric security frameworks that meet NIST, CMMC, and FedRAMP requirements while minimizing operational friction.",
    responsibilities: [
      "Design and implement zero-trust architecture aligned with NIST SP 800-207 and OMB M-22-09",
      "Deploy and configure identity and access management solutions (Okta, Azure AD, Ping Identity)",
      "Implement micro-segmentation and software-defined perimeter solutions",
      "Integrate zero-trust controls with existing SIEM, SOAR, and EDR platforms",
      "Conduct security assessments and develop remediation roadmaps for clients",
      "Develop zero-trust maturity models and adoption playbooks for federal agencies",
    ],
    qualifications: [
      "5+ years of cybersecurity experience with focus on identity, access management, or network security",
      "CISSP, CCSP, or equivalent security certifications",
      "Deep understanding of NIST Zero Trust Architecture (SP 800-207) and federal security mandates",
      "Experience with IAM platforms, PAM solutions, and MFA implementations",
      "Familiarity with CMMC, FedRAMP, and FISMA compliance requirements",
      "Active Secret or Top Secret security clearance required",
    ],
  },
  {
    title: "Full Stack Developer \u2014 React/Node",
    location: "Remote - US",
    department: "Application Development",
    type: "Full-time",
    id: "JR-2025-2068",
    posted: "1 week ago",
    description: "Build modern web applications for government and commercial clients as a Full Stack Developer. You will work on citizen-facing portals, internal enterprise tools, and cloud-native applications using React, Node.js, and AWS/Azure services.",
    responsibilities: [
      "Design and develop responsive web applications using React, Next.js, and TypeScript",
      "Build scalable RESTful APIs and GraphQL services using Node.js and Express",
      "Implement CI/CD pipelines and automated testing (unit, integration, E2E)",
      "Collaborate with UX designers to implement accessible, human-centered interfaces",
      "Deploy and manage applications on AWS or Azure cloud infrastructure",
      "Participate in code reviews, architectural discussions, and agile ceremonies",
    ],
    qualifications: [
      "4+ years of full-stack development experience with React and Node.js",
      "Strong TypeScript proficiency and experience with modern React patterns (hooks, context, server components)",
      "Experience with relational and NoSQL databases (PostgreSQL, MongoDB, DynamoDB)",
      "Familiarity with containerization (Docker), orchestration (Kubernetes), and cloud services",
      "Understanding of web accessibility standards (WCAG 2.1 AA) and Section 508 compliance",
      "Experience building applications for government or regulated industries is a plus",
    ],
  },
  {
    title: "DevSecOps Engineer",
    location: "Reston, VA",
    department: "Cloud & Infrastructure",
    type: "Full-time",
    id: "JR-2025-2055",
    posted: "1 week ago",
    description: "Accelerate secure software delivery as a DevSecOps Engineer. You will build and maintain CI/CD pipelines with embedded security testing, automate infrastructure provisioning, and help development teams shift security left across the software development lifecycle.",
    responsibilities: [
      "Design and maintain CI/CD pipelines with integrated security scanning (SAST, DAST, SCA)",
      "Automate infrastructure provisioning using Terraform, Ansible, or CloudFormation",
      "Implement container security scanning and runtime protection for Docker/Kubernetes environments",
      "Configure and manage artifact repositories, secrets management, and certificate automation",
      "Collaborate with development teams to remediate vulnerabilities and improve secure coding practices",
      "Monitor and improve pipeline performance, reliability, and security posture metrics",
    ],
    qualifications: [
      "4+ years of DevOps or DevSecOps experience in enterprise environments",
      "Strong experience with CI/CD tools (GitLab CI, GitHub Actions, Jenkins, or Azure DevOps)",
      "Proficiency with Infrastructure as Code (Terraform, CloudFormation, Pulumi)",
      "Experience with container orchestration (Kubernetes, ECS) and security scanning tools",
      "Knowledge of NIST, FedRAMP, or DoD security frameworks and compliance automation",
      "AWS or Azure certifications and security clearance eligibility preferred",
    ],
  },
  {
    title: "Federal IT Program Manager",
    location: "Washington, DC",
    department: "Government Services",
    type: "Full-time",
    id: "JR-2025-2033",
    posted: "2 weeks ago",
    description: "Lead large-scale federal IT modernization programs as a Program Manager. You will oversee multi-year technology transformation engagements, manage cross-functional delivery teams, and serve as the primary client relationship owner for mission-critical government programs.",
    responsibilities: [
      "Manage large-scale federal IT programs ($10M+) across cloud, cybersecurity, and digital transformation",
      "Serve as primary client point of contact, building trusted advisor relationships with senior government leaders",
      "Oversee cross-functional delivery teams of 20\u201350+ engineers, architects, and consultants",
      "Manage program financials including budgets, forecasts, and contract modifications",
      "Ensure compliance with federal acquisition regulations (FAR/DFARS) and contract requirements",
      "Drive continuous improvement in delivery methodology, quality, and client satisfaction",
    ],
    qualifications: [
      "10+ years of IT program management experience, with at least 5 years in federal government",
      "PMP, PgMP, or equivalent program management certification",
      "Experience managing programs under IDIQ, T&M, FFP, and cost-plus contract vehicles",
      "Strong understanding of federal IT modernization priorities (cloud, zero trust, AI, ServiceNow)",
      "Proven track record of growing and retaining federal client accounts",
      "Active Secret or Top Secret security clearance required",
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const job = fallbackJobs.find((j) => j.id === id);
  return {
    title: job ? `${job.title} — ${job.location} | CergyPro Careers` : "Job Detail | CergyPro Careers",
    description: job?.description || "Explore career opportunities at CergyPro.",
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Try Sanity first, then fallback
  let job: JobData | undefined;

  try {
    const sanityJobs = await getJobListings();
    if (sanityJobs?.length > 0) {
      const found = sanityJobs.find((j: { jobId?: string }) => j.jobId === id);
      if (found) {
        job = {
          title: found.title,
          location: found.location,
          department: found.department,
          type: found.type,
          id: found.jobId,
          posted: "",
          description: found.description || "",
          responsibilities: found.responsibilities || [],
          qualifications: found.qualifications || [],
        };
      }
    }
  } catch (e) {
    console.error("Failed to fetch job from Sanity:", e);
  }

  // Fallback to static data
  if (!job) {
    job = fallbackJobs.find((j) => j.id === id);
  }

  // 404 fallback
  if (!job) {
    job = {
      title: "Position not found",
      location: "",
      department: "",
      type: "",
      id: id,
      posted: "",
      description: "This position may have been filled or is no longer available. Please browse our current openings.",
      responsibilities: [],
      qualifications: [],
    };
  }

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
            {job.location && (
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
                {job.posted && <span>Posted {job.posted}</span>}
              </div>
            )}
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

                {job.responsibilities.length > 0 && (
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
                )}

                {job.qualifications.length > 0 && (
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
                )}
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
