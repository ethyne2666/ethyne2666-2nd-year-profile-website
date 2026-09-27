import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Code2,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

const LINKEDIN_PROFILE =
  "https://www.linkedin.com/in/charan-kumar-ab5568311";

const LINKEDIN_PUBLICATIONS =
  "https://www.linkedin.com/in/charan-kumar-ab5568311/details/publications/";

const LINKEDIN_CERTIFICATIONS =
  "https://www.linkedin.com/in/charan-kumar-ab5568311/details/certifications/";

const MEDIUM_PROFILE = "https://medium.com/@temporary2666";

const MEDIUM_LOGO =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-q3mDD2ZrI2LFOQZ34A-aj1yQP3lDy-01E-sRVN5UaTCNN7IupOQHXvjk&s=10";

const articles = [
  {
    title: "Understanding JWT Authentication",
    subtitle: "A beginner’s guide to access and refresh tokens",
    href: "https://medium.com/@temporary2666/understanding-jwt-authentication-a-beginners-guide-to-access-and-refresh-tokens-cc937d0cf18b",
    linkLabel: "Read on Medium",
  },
  {
    title: "Queues in Production",
    subtitle:
      "ActiveMQ, RabbitMQ, Kafka, BullMQ, Redis Queue, and Amazon SQS",
    href: LINKEDIN_PUBLICATIONS,
    linkLabel: "View publication",
  },
  {
    title: "More articles by Charan",
    subtitle: "Browse my Medium profile for the rest of my technical writing",
    href: MEDIUM_PROFILE,
    linkLabel: "Visit Medium profile",
  },
];

const certifications = [
  {
    name: "Introduction to Generative AI",
    issuer: "Google Cloud Skills Boost",
  },
  {
    name: "Azure AI Essentials",
    issuer: "Microsoft",
  },
  {
    name: "Cyber Job Simulation",
    issuer: "Deloitte · Forage",
  },
  {
    name: "Controllers Job Simulation",
    issuer: "Goldman Sachs · Forage",
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-white via-white to-neutral-50 px-5 py-20 text-neutral-950 sm:px-8 sm:py-24"
    >
      {/* Light monochrome grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <header className="mb-12 text-center sm:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
            Software · Systems · Writing
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            About <span className="text-neutral-400">Me</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
            Full-stack developer and computer engineering student building
            applications, backend services, and practical software projects.
          </p>

          <div className="mx-auto mt-6 h-px w-16 bg-neutral-950" />
        </header>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Software-focused introduction */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm">
                <GraduationCap className="h-5 w-5 text-neutral-800" />
              </span>

              <div>
                <p className="text-sm font-semibold text-neutral-950">
                  B.Tech student
                </p>
                <p className="text-xs text-neutral-500">
                  IIIT Kalyani · 2024–2028
                </p>
              </div>
            </div>

            <div className="space-y-5 text-sm leading-7 text-neutral-600 sm:text-base">
              <p>
                I’m a full-stack developer and B.Tech student at{" "}
                <span className="font-semibold text-neutral-950">
                  IIIT Kalyani
                </span>
                . I build web applications with the{" "}
                <span className="font-semibold text-neutral-950">
                  MERN stack
                </span>{" "}
                and{" "}
                <span className="font-semibold text-neutral-950">
                  Spring Boot
                </span>
                , with an interest in backend development, APIs, authentication,
                and microservices.
              </p>

              <p>
                My projects include real-time messaging, job search, price
                tracking, and an AI-powered fitness platform built with Spring
                Boot microservices. I’m also learning about{" "}
                <span className="font-semibold text-neutral-950">
                  AI and machine learning
                </span>
                , including LLM tools and how they can be used in practical
                software.
              </p>

              <p>
                Through{" "}
                <span className="font-semibold text-neutral-950">NullLogic</span>
                , I explain computer science and software topics such as Core
                Java, DSA, system design, Docker, AI tools, OpenClaw, and Ollama.
                My goal is to make technical ideas easier to understand and
                apply.
              </p>
            </div>

            {/* Relevant development areas */}
            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "Spring Boot",
                "MERN Stack",
                "Backend APIs",
                "Microservices",
                "Docker",
                "AI / ML",
                "System Design",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-neutral-300 bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            <a
              href={LINKEDIN_PROFILE}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900"
            >
              View my LinkedIn profile
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Articles and certifications */}
          <div className="space-y-9">
            <section aria-labelledby="about-articles-heading">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white">
                  <BookOpen className="h-5 w-5 text-neutral-800" />
                </span>

                <div>
                  <h3
                    id="about-articles-heading"
                    className="font-semibold text-neutral-950"
                  >
                    Articles &amp; writing
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Notes on backend and software engineering
                  </p>
                </div>

                <img
                  src={MEDIUM_LOGO}
                  alt="Medium"
                  className="ml-auto h-8 w-8 rounded-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="space-y-3">
                {articles.map((article, index) => (
                  <a
                    key={article.title}
                    href={article.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-4 rounded-xl border border-neutral-200 bg-white/95 p-4 shadow-[0_12px_36px_-32px_rgba(0,0,0,0.35)] transition hover:border-neutral-400 hover:shadow-sm"
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 font-mono text-xs font-semibold text-neutral-700">
                      0{index + 1}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-neutral-950">
                        {article.title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-neutral-600">
                        {article.subtitle}
                      </span>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-neutral-800 underline decoration-neutral-300 underline-offset-4 group-hover:decoration-neutral-900">
                        {article.linkLabel}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section aria-labelledby="about-certifications-heading">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white">
                  <ShieldCheck className="h-5 w-5 text-neutral-800" />
                </span>

                <div>
                  <h3
                    id="about-certifications-heading"
                    className="font-semibold text-neutral-950"
                  >
                    Certifications &amp; learning
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Selected software and AI credentials
                  </p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {certifications.map((certification) => (
                  <a
                    key={certification.name}
                    href={LINKEDIN_CERTIFICATIONS}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 rounded-xl border border-neutral-200 bg-white/90 p-4 transition hover:border-neutral-400 hover:bg-white"
                  >
                    <BrainCircuit className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-600" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium leading-5 text-neutral-900">
                        {certification.name}
                      </span>
                      <span className="mt-1 block text-xs text-neutral-500">
                        {certification.issuer}
                      </span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
                  </a>
                ))}
              </div>

              <a
                href={LINKEDIN_CERTIFICATIONS}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:decoration-neutral-900"
              >
                View certifications on LinkedIn
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </section>

            {/* NullLogic feature */}
            <a
              href="https://www.youtube.com/@charankumar-c1c"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-950 p-5 text-white transition hover:bg-neutral-800"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <Code2 className="h-5 w-5" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold">NullLogic</span>
                <span className="mt-1 block text-xs leading-5 text-white/65">
                  Core Java · DSA · System Design · AI tools · Software
                  development
                </span>
              </span>

              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;