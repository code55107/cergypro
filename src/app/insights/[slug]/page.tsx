import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/sanity";

type ArticleBlock =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; youtubeId: string; title: string };

interface ArticleData {
  slug: string;
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  category?: string;
  body?: string[];
  blocks?: ArticleBlock[];
}

const fallbackArticles: ArticleData[] = [
  {
    slug: "enterprise-ai-playbook",
    tag: "FEATURED INSIGHT",
    title: "The enterprise AI playbook: moving from experimentation to execution",
    description: "Most organizations have run AI pilots. Few have scaled them. Our latest analysis examines the leadership, architecture, and governance patterns that separate AI leaders from the rest.",
    imageSrc: "/images/generative-ai.jpg",
    body: [
      "Enterprise AI adoption has reached an inflection point. While nearly every large organization has experimented with artificial intelligence, fewer than 20% have successfully scaled AI beyond pilot programs into production systems that deliver measurable business value.",
      "The gap between AI experimentation and AI execution is not primarily technical — it is organizational. Our analysis of over 50 enterprise AI programs across government, energy, and commercial sectors reveals that the most successful organizations share three common traits: executive sponsorship tied to specific business outcomes, cross-functional governance that balances innovation speed with risk management, and a deliberate investment in data engineering before model development.",
      "For federal agencies, the challenge is compounded by regulatory requirements and the need for explainable AI. Organizations that have succeeded in this environment have adopted a 'governance-first' approach, building responsible AI frameworks before scaling deployments rather than retrofitting compliance after the fact.",
      "The playbook is clear: start with a well-defined business problem, invest in data infrastructure, build governance into the development lifecycle, and measure success against mission outcomes — not model accuracy alone.",
    ],
  },
  {
    slug: "ai-governance-competitive-advantage",
    tag: "ARTIFICIAL INTELLIGENCE",
    title: "From pilot to production: why AI governance is a feature, not a gate",
    description: "The agencies and enterprises deploying AI fastest are embedding responsible governance from day one. Here\u2019s what they\u2019re doing differently.",
    imageSrc: "/images/ai-governance.jpg",
    body: [
      "As artificial intelligence becomes embedded in nearly every industry, the question is no longer whether to adopt AI, but how to do so responsibly. Organizations that move early to establish governance frameworks are finding that ethical AI is not just a compliance requirement — it is a strategic differentiator.",
      "CergyPro has been working with federal agencies and commercial clients to develop AI governance frameworks that balance innovation with accountability. Our approach emphasizes transparency, fairness, and human oversight at every stage of the AI lifecycle.",
      "Key components of a robust AI governance program include clear policies for data usage and model development, bias detection and mitigation processes, explainability requirements for high-stakes decisions, and continuous monitoring of deployed models.",
      "The organizations seeing the greatest returns are those that treat AI governance as a cross-functional initiative, bringing together technologists, ethicists, legal counsel, and business leaders to shape policies that are both rigorous and practical.",
    ],
  },
  {
    slug: "zero-trust-federal-frontline",
    tag: "CYBERSECURITY",
    title: "Zero trust in practice: lessons from the federal frontline",
    description: "How three agencies moved beyond frameworks to fully operational zero-trust architectures \u2014 and the pitfalls they avoided.",
    imageSrc: "/images/cybersecurity-policy.jpg",
    body: [
      "Zero trust is no longer a buzzword in federal cybersecurity — it is a mandate. Executive Order 14028 and OMB Memorandum M-22-09 have set clear deadlines for federal agencies to adopt zero-trust architectures. But moving from policy to implementation remains a significant challenge.",
      "We worked with three federal agencies at different stages of zero-trust maturity to understand what separates successful implementations from stalled initiatives. The findings were consistent: agencies that succeeded started with identity and access management rather than network segmentation, invested in comprehensive asset inventory before deploying monitoring tools, and engaged end users early to minimize friction.",
      "The most common pitfall was attempting a wholesale transformation rather than an incremental approach. Agencies that tried to overhaul their entire security architecture simultaneously often encountered budget overruns and stakeholder fatigue. Those that adopted a phased approach — prioritizing high-value assets and expanding outward — achieved compliance faster and with fewer disruptions.",
      "Zero trust is a journey, not a destination. Continuous monitoring, adaptive policies, and regular reassessment are essential to maintaining a true zero-trust posture as threats evolve.",
    ],
  },
  {
    slug: "grid-modernization-clean-energy",
    tag: "ENERGY & UTILITIES",
    title: "Grid modernization: balancing reliability with the clean energy transition",
    description: "Utilities face a dual mandate \u2014 decarbonize while keeping the lights on. New approaches to grid planning are making both possible.",
    imageSrc: "/images/distributed-energy.jpg",
    body: [
      "The electric grid is undergoing its most significant transformation since its inception. Utilities must simultaneously decarbonize their generation portfolios, integrate distributed energy resources, and maintain the reliability that customers depend on every day.",
      "Advanced analytics and AI are proving essential to this balancing act. Machine learning models can predict renewable generation output hours or days in advance, optimize battery storage dispatch, and identify grid vulnerabilities before they cause outages.",
      "CergyPro has helped utilities across the country develop integrated resource plans that account for the full complexity of the energy transition. Our approach combines engineering analysis with advanced data science to model scenarios that would be impossible to evaluate manually.",
      "The utilities that are managing this transition most effectively share a common trait: they are treating grid modernization not as a technology project, but as a business transformation that requires new operating models, workforce capabilities, and customer engagement strategies.",
    ],
  },
  {
    slug: "servicenow-implementations-right",
    tag: "SERVICENOW",
    title: "Why ServiceNow implementations fail \u2014 and how to get them right",
    description: "The difference between a transformative ServiceNow rollout and costly shelf-ware comes down to three architecture decisions most teams overlook.",
    imageSrc: "/images/cloud-platform.jpg",
    body: [
      "ServiceNow has become the enterprise platform of choice for IT service management, operations, and increasingly for HR and customer service workflows. Yet a significant number of implementations fail to deliver expected value — not because of the platform itself, but because of how organizations approach the rollout.",
      "After leading dozens of ServiceNow implementations across government and enterprise clients, we have identified three architectural decisions that consistently separate successful deployments from costly failures: platform governance from day one, process optimization before configuration, and a clear integration strategy.",
      "The first mistake organizations make is treating ServiceNow as a technology project rather than a business transformation. When teams rush to configure modules without first rationalizing and optimizing underlying processes, they end up digitizing inefficiency rather than eliminating it.",
      "The second common failure is underestimating the integration challenge. ServiceNow rarely operates in isolation — it must connect with CMDB data sources, monitoring tools, identity providers, and often legacy ticketing systems during migration. Organizations that invest in a robust integration architecture early avoid the technical debt that cripples many deployments.",
    ],
  },
  {
    slug: "servicenow-secops-unified-response",
    tag: "SERVICENOW",
    title: "ServiceNow SecOps: unifying vulnerability and incident response on one platform",
    description: "Organizations running security operations across multiple tools are consolidating onto ServiceNow SecOps \u2014 and seeing 40% faster mean-time-to-resolve.",
    imageSrc: "/images/grants-automation.jpg",
    body: [
      "Security operations teams are drowning in tools. The average enterprise security operations center manages over 45 different security tools, creating alert fatigue, context-switching overhead, and gaps in incident response workflows.",
      "ServiceNow Security Operations (SecOps) offers a compelling alternative: a unified platform that integrates vulnerability response, security incident response, threat intelligence, and configuration compliance into a single workflow engine built on the Now Platform.",
      "Organizations that have consolidated their security operations onto ServiceNow SecOps are reporting measurable improvements: 40% faster mean-time-to-resolve for security incidents, 60% reduction in manual triage effort through automated enrichment and prioritization, and significantly improved audit readiness through centralized compliance tracking.",
      "The key to a successful SecOps deployment is starting with the integration layer. ServiceNow SecOps becomes transformative when it can ingest alerts from your existing SIEM, correlate them with CMDB data to understand business impact, and orchestrate response workflows across teams — all without requiring analysts to switch between tools.",
    ],
  },
  {
    slug: "enterprise-data-platforms",
    tag: "AI & DATA",
    title: "Building enterprise data platforms that actually get used",
    description: "Most data platform investments underdeliver because they solve for technology, not for the analysts and operators who need the data.",
    imageSrc: "/images/energy-grid.jpg",
    body: [
      "The promise of enterprise data platforms is compelling: a single source of truth that enables data-driven decision-making across the organization. The reality is often different — expensive platforms that sit underutilized because they were designed for data engineers, not for the business users who need the insights.",
      "The most successful data platform initiatives we have seen start not with technology selection, but with user research. Understanding how analysts, operators, and executives actually consume data — and what decisions they are trying to make — is the single most important input to platform design.",
      "Technical architecture matters, but it should follow use cases, not precede them. A well-designed data mesh or lakehouse architecture is meaningless if the people who need the data cannot find it, trust it, or access it in the format they need.",
      "Organizations that get this right treat their data platform as a product, not a project. They assign product managers, measure adoption metrics, iterate based on user feedback, and invest in data literacy programs that help business users get value from the platform independently.",
    ],
  },
  {
    slug: "cmmc-compliance-roadmap",
    tag: "CYBERSECURITY",
    title: "The CMMC compliance roadmap: what defense contractors need to know",
    description: "A practical guide to achieving Cybersecurity Maturity Model Certification without stalling your business operations.",
    imageSrc: "/images/climate-infrastructure.jpg",
    body: [
      "The Cybersecurity Maturity Model Certification (CMMC) program is reshaping how the Department of Defense evaluates the cybersecurity posture of its contractor base. For the thousands of defense industrial base companies that handle Controlled Unclassified Information (CUI), achieving CMMC certification is no longer optional — it is a condition of doing business.",
      "The path to certification can feel overwhelming, particularly for small and mid-size contractors who lack dedicated cybersecurity teams. But with a structured approach, compliance is achievable without disrupting core business operations.",
      "The first step is understanding your current state through a gap assessment against the NIST SP 800-171 controls that form the foundation of CMMC Level 2. Most organizations find that they have already implemented many of the required controls but lack the documentation and evidence collection processes needed to demonstrate compliance.",
      "CergyPro helps defense contractors develop realistic compliance roadmaps that prioritize the highest-risk gaps, leverage existing investments, and build sustainable security practices rather than point-in-time compliance artifacts.",
    ],
  },
  {
    slug: "ai-demand-forecasting-utilities",
    tag: "ENERGY",
    title: "AI-powered demand forecasting is transforming utility operations",
    description: "Utilities deploying machine learning for load prediction are seeing 15\u201320% improvements in operational efficiency and grid reliability.",
    imageSrc: "/images/analytics-dashboard.jpg",
    body: [
      "Accurate demand forecasting has always been critical for utility operations, but the proliferation of distributed energy resources, electric vehicles, and extreme weather events has made traditional forecasting methods increasingly unreliable.",
      "Machine learning models trained on granular historical data, weather patterns, economic indicators, and real-time grid telemetry are delivering step-function improvements in forecast accuracy. Utilities deploying these models are seeing 15-20% improvements in operational efficiency through better resource allocation, reduced reserve margins, and more effective demand response programs.",
      "The most advanced utilities are moving beyond day-ahead forecasting to real-time predictive models that can anticipate load changes minutes to hours in advance. This capability is particularly valuable for managing the variability introduced by solar and wind generation.",
      "Success in AI-powered forecasting requires more than good models — it requires integration with existing operational systems, trust from grid operators, and continuous model retraining as grid conditions evolve. The utilities getting this right are treating AI as an operational capability, not a data science experiment.",
    ],
  },
  {
    slug: "state-agencies-rpa-automation",
    tag: "GOVERNMENT",
    title: "How state agencies are using RPA to cut processing times by 60%",
    description: "Robotic process automation is delivering quick wins for state governments drowning in manual processes and paper forms.",
    imageSrc: "/images/digital-health.jpg",
    body: [
      "State government agencies process millions of transactions annually — benefits applications, license renewals, compliance filings, and more. Many of these processes still rely on manual data entry, paper forms, and legacy systems that were not designed for modern workloads.",
      "Robotic process automation (RPA) offers a pragmatic path to modernization. Unlike large-scale system replacements, RPA bots can be deployed in weeks rather than months, automating repetitive tasks without requiring changes to underlying systems.",
      "State agencies that have adopted RPA are reporting dramatic improvements: 60% reductions in processing time, 90% decreases in data entry errors, and significant improvements in employee satisfaction as staff are freed from tedious manual work to focus on higher-value activities.",
      "The agencies seeing the most success are those that take a portfolio approach to RPA — identifying and prioritizing automation opportunities across departments, establishing centers of excellence to manage bot development and governance, and measuring ROI rigorously to build the case for expanded investment.",
    ],
  },
  {
    slug: "astrazeneca-servicenow",
    tag: "ASTRAZENECA · HEALTHCARE",
    title: "AstraZeneca saves 30,000+ hours annually by replacing manual tasks with AI-powered automation",
    description: "How one of the world\u2019s largest pharmaceutical companies unified 60,000 laboratory requests and transformed employee onboarding using ServiceNow\u2019s App Engine, ITSM, HRSD, and Now Assist.",
    imageSrc: "/images/az-hero.jpg",
    blocks: [
      { type: "text", content: "AstraZeneca, a global biopharmaceutical company with over 89,000 employees, faced a challenge familiar to large R&D-intensive organizations: its scientists and researchers were spending thousands of hours on manual administrative tasks instead of focusing on discovering life-changing medicines. Laboratory requests, IT service tickets, and HR processes were scattered across disconnected systems, creating bottlenecks and frustration." },
      { type: "text", content: "The company turned to ServiceNow as its enterprise-wide workflow platform, consolidating fragmented processes onto a single system. Using ServiceNow App Engine, AstraZeneca built custom applications to route and manage over 60,000 laboratory requests through one unified system \u2014 replacing manual email chains and spreadsheets with automated workflows that complete in seconds what previously took 30 minutes." },
      { type: "video", youtubeId: "vNu7-kDu_qE", title: "AstraZeneca accelerates its mission to save millions of lives with automation and AI" },
      { type: "text", content: "The results have been transformative. AstraZeneca now saves more than 30,000 hours every year through automation across IT, HR, and laboratory operations. Tasks that once required manual handoffs between departments are now resolved automatically, freeing scientists to focus on research and drug development rather than paperwork." },
      { type: "image", src: "/images/az-inline.jpg", alt: "Scientists collaborating with digital technology in a laboratory environment", caption: "AstraZeneca\u2019s scientists now spend more time on research and less on administrative workflows" },
      { type: "text", content: "Beyond IT, AstraZeneca deployed ServiceNow HR Service Delivery to overhaul its employee onboarding experience. The new Onboarding 2.0 program, powered by Now Assist\u2019s generative AI capabilities, is projected to save hiring managers over 90,000 hours annually by automating provisioning, compliance checks, and new-hire orientation workflows." },
      { type: "text", content: "AstraZeneca\u2019s success demonstrates a pattern we see across healthcare and life sciences organizations: the greatest ROI from ServiceNow comes not from a single module, but from treating the platform as an enterprise-wide automation layer that spans IT, HR, and domain-specific operations. When the platform becomes the connective tissue between departments, the compounding efficiency gains are substantial." },
    ],
  },
  {
    slug: "siemens-servicenow",
    tag: "SIEMENS · MANUFACTURING",
    title: "Siemens saves 1 million hours through automation while resolving 210,000 tickets monthly without human intervention",
    description: "How a global industrial conglomerate unified HR, Finance, and Procurement services for 360,000+ employees using ServiceNow AI Agents, App Engine, and Workflow Data Fabric.",
    imageSrc: "/images/siemens-hero.jpg",
    blocks: [
      { type: "text", content: "Siemens, the global technology and industrial manufacturing conglomerate with over 360,000 employees worldwide, operates one of the largest Global Business Services (GBS) organizations in the world. Managing HR, Finance, Procurement, and IT services at that scale \u2014 across dozens of countries, languages, and legacy systems \u2014 required a fundamentally different approach to enterprise service delivery." },
      { type: "text", content: "Siemens selected ServiceNow as the backbone of its GBS transformation, deploying the platform across HR Service Delivery, IT Service Management, and enterprise workflow automation. The scale of the deployment is staggering: 210,000 support tickets are now resolved automatically every month without any human intervention, powered by ServiceNow\u2019s AI-driven routing, categorization, and resolution capabilities." },
      { type: "video", youtubeId: "glydjFBykuE", title: "Siemens GBS enriches employee experience with ServiceNow" },
      { type: "text", content: "The cumulative impact has been extraordinary. Siemens has saved over 1 million hours through workflow automation \u2014 time that has been redirected from repetitive administrative tasks to higher-value work across the organization. The company harmonized fragmented legacy systems into a unified service experience, giving employees a single portal to access HR, Finance, and Procurement services regardless of their location or business unit." },
      { type: "image", src: "/images/siemens-inline.jpg", alt: "Modern industrial automation with digital control systems", caption: "Siemens leverages automation across its global operations to drive efficiency at scale" },
      { type: "text", content: "Looking ahead, Siemens is preparing its ServiceNow environment for the next wave of AI-powered automation. Using ServiceNow\u2019s Workflow Data Fabric, the company is unifying data across its enterprise systems to enable Agentic AI \u2014 autonomous AI agents that can handle increasingly complex multi-step service requests without human intervention." },
      { type: "text", content: "The Siemens story illustrates what enterprise-scale ServiceNow transformation looks like when it is done right: a unified platform that spans multiple business functions, AI automation that delivers measurable productivity gains, and a data strategy that positions the organization for the next generation of intelligent workflows." },
    ],
  },
  {
    slug: "bell-canada-servicenow",
    tag: "BELL CANADA · TELECOM",
    title: "Bell Canada deflects 3 million customer support calls annually and automates 90% of dispatch tasks with ServiceNow",
    description: "How Canada\u2019s largest telecommunications company transformed customer service and field operations using ServiceNow\u2019s Field Service Management and AI-powered Virtual Repair.",
    imageSrc: "/images/bell-hero.jpg",
    blocks: [
      { type: "text", content: "Bell Canada, the country\u2019s largest telecommunications provider serving millions of residential and business customers, was grappling with the twin challenges of rising customer support volumes and the operational complexity of managing a nationwide field service workforce. With millions of service calls annually and technicians deployed across vast geographic areas, even small improvements in efficiency could translate to massive cost savings and better customer outcomes." },
      { type: "text", content: "Bell Canada deployed ServiceNow\u2019s telecommunications-specific solutions \u2014 including Field Service Management, Sales and Order Management, and Telecommunications Service Management \u2014 to reimagine how it delivers customer service and manages field operations. The centerpiece of the transformation was an AI-powered Virtual Repair capability that enables customers to diagnose and resolve common service issues without ever speaking to a human agent." },
      { type: "video", youtubeId: "vZAWX-bs8k8", title: "Bell puts the \u2018wow\u2019 in Customer Experience with ServiceNow" },
      { type: "text", content: "The results speak for themselves. Bell Canada now deflects over 3 million customer support calls annually through self-service and AI-powered resolution. The Virtual Repair tool alone has saved 500,000 calls by guiding customers through troubleshooting steps that resolve their issues in minutes. For the calls that do require human intervention, automated triage ensures they reach the right specialist on the first attempt." },
      { type: "image", src: "/images/bell-inline.jpg", alt: "Network technician working with server infrastructure", caption: "Bell Canada\u2019s field service teams leverage AI-optimized scheduling and automated dispatch" },
      { type: "text", content: "On the field operations side, ServiceNow has automated 90% of dispatch-related tasks \u2014 scheduling, routing, parts allocation, and technician assignment. What previously required manual coordination across multiple systems now happens automatically, with AI optimizing technician routes and ensuring the right parts are available at the job site before the technician arrives." },
      { type: "text", content: "Bell Canada\u2019s transformation demonstrates the power of industry-specific ServiceNow solutions. By deploying purpose-built telecommunications workflows rather than generic service management tools, Bell achieved faster time-to-value and deeper integration with its existing network management and customer billing systems. For telecom providers looking to reduce costs while improving customer experience, the Bell Canada playbook offers a proven roadmap." },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = fallbackArticles.find((a) => a.slug === slug);
  return {
    title: article ? `${article.title} | CergyPro Insights` : "Insight Detail | CergyPro",
    description: article?.description || "Read the latest insights from CergyPro.",
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try Sanity first, then fallback
  let article: ArticleData | undefined;

  try {
    const sanityArticles = await getArticles();
    if (sanityArticles?.length > 0) {
      const found = sanityArticles.find((a: { slug?: string }) => a.slug === slug);
      if (found) {
        article = {
          slug: found.slug,
          tag: found.tag,
          title: found.title,
          description: found.description,
          imageSrc: found.imageSrc,
          body: found.body || [],
        };
      }
    }
  } catch (e) {
    console.error("Failed to fetch article from Sanity:", e);
  }

  // Fallback to static data
  if (!article) {
    article = fallbackArticles.find((a) => a.slug === slug);
  }

  // 404 fallback — show a generic article if slug doesn't match
  if (!article) {
    article = {
      slug,
      tag: "INSIGHT",
      title: "Article not found",
      description: "The article you are looking for may have been moved or is no longer available.",
      imageSrc: "/images/generative-ai.jpg",
      body: [
        "We could not find the article you were looking for. It may have been moved, updated, or is no longer available.",
        "Please return to our Insights page to browse the latest articles, reports, and thought leadership from CergyPro\u2019s technology and industry experts.",
      ],
    };
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.cergypro.com" },
          { name: "Insights", url: "https://www.cergypro.com/insights" },
          { name: article.title, url: `https://www.cergypro.com/insights/${article.slug}` },
        ]}
      />
      <Header />
      <main>
        <section className="pt-32 pb-12 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900 transition-colors mb-8"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Insights
            </Link>
            <p className="text-accent-cyan text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              {article.tag}
            </p>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {article.description}
            </p>
          </div>
        </section>

        <section className="bg-white pb-8">
          <div className="max-w-[800px] mx-auto px-6">
            <div className="aspect-[16/9] relative rounded-sm overflow-hidden mb-12">
              <Image
                src={article.imageSrc}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
              />
            </div>
          </div>
        </section>

        <article className="bg-white pb-20">
          <div className="max-w-[800px] mx-auto px-6 space-y-8">
            {article.blocks
              ? article.blocks.map((block, i) => {
                  if (block.type === "text") {
                    return (
                      <p key={i} className="text-gray-600 leading-relaxed">
                        {block.content}
                      </p>
                    );
                  }
                  if (block.type === "image") {
                    return (
                      <figure key={i} className="my-10">
                        <div className="aspect-[16/9] relative rounded-sm overflow-hidden">
                          <Image
                            src={block.src}
                            alt={block.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 800px) 100vw, 800px"
                          />
                        </div>
                        {block.caption && (
                          <figcaption className="text-gray-400 text-sm mt-3 text-center">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  if (block.type === "video") {
                    return (
                      <figure key={i} className="my-10">
                        <div className="aspect-video relative rounded-sm overflow-hidden bg-black">
                          <iframe
                            src={`https://www.youtube.com/embed/${block.youtubeId}?rel=0`}
                            title={block.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                        <figcaption className="text-gray-400 text-sm mt-3 text-center">
                          {block.title}
                        </figcaption>
                      </figure>
                    );
                  }
                  return null;
                })
              : article.body?.map((paragraph, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
          </div>
        </article>

        <section className="bg-white border-t border-gray-200">
          <div className="max-w-[800px] mx-auto px-6 py-12 flex items-center justify-between">
            <Link
              href="/insights"
              className="text-gray-900 text-sm font-semibold tracking-wider uppercase hover:text-gray-600 transition-colors"
            >
              VIEW ALL INSIGHTS
            </Link>
            <Link
              href="/contact"
              className="btn-shine inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold tracking-wider uppercase hover:bg-gray-800 transition-colors"
            >
              TALK TO AN EXPERT
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
