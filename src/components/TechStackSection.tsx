type TechItem = {
  name: string;
  icon: string;
  description: string;
};

type TechCategory = {
  title: string;
  description: string;
  items: TechItem[];
};

const simpleIcon = (slug: string) =>
  `https://cdn.simpleicons.org/${slug}`;

const categories: TechCategory[] = [
  {
    title: "Languages",
    description: "Programming and markup",
    items: [
      {
        name: "Python",
        icon: simpleIcon("python"),
        description: "Automation, scripting, Django",
      },
      {
        name: "JavaScript",
        icon: simpleIcon("javascript"),
        description: "Web and server-side development",
      },
      {
        name: "TypeScript",
        icon: simpleIcon("typescript"),
        description: "Typed JavaScript applications",
      },
      {
        name: "Java",
        icon: simpleIcon("java"),
        description: "Spring Boot applications",
      },
      {
        name: "C / C++",
        icon: simpleIcon("cplusplus"),
        description: "Embedded systems and programming",
      },
      {
        name: "HTML5",
        icon: simpleIcon("html5"),
        description: "Semantic web markup",
      },
      {
        name: "CSS3",
        icon: simpleIcon("css3"),
        description: "Responsive layouts and styling",
      },
      {
        name: "YAML",
        icon: simpleIcon("yaml"),
        description: "Configuration and automation",
      },
    ],
  },
  {
    title: "Frontend",
    description: "Interfaces and user experiences",
    items: [
      {
        name: "React",
        icon: simpleIcon("react"),
        description: "Components, hooks, and interfaces",
      },
      {
        name: "Next.js",
        icon: simpleIcon("nextdotjs"),
        description: "React applications and routing",
      },
      {
        name: "Tailwind CSS",
        icon: simpleIcon("tailwindcss"),
        description: "Utility-first styling",
      },
      {
        name: "TypeScript",
        icon: simpleIcon("typescript"),
        description: "Typed frontend development",
      },
      {
        name: "Figma",
        icon: simpleIcon("figma"),
        description: "Interface design and prototyping",
      },
    ],
  },
  {
    title: "Backend",
    description: "APIs, services, and authentication",
    items: [
      {
        name: "Node.js",
        icon: simpleIcon("nodedotjs"),
        description: "Server-side JavaScript",
      },
      {
        name: "Express",
        icon: simpleIcon("express"),
        description: "Web servers and REST APIs",
      },
      {
        name: "Django",
        icon: simpleIcon("django"),
        description: "Python web applications",
      },
      {
        name: "Spring Boot",
        icon: simpleIcon("springboot"),
        description: "Java services and REST APIs",
      },
      {
        name: "JWT",
        icon: simpleIcon("jsonwebtokens"),
        description: "Token-based authentication",
      },
      {
        name: "Nginx",
        icon: simpleIcon("nginx"),
        description: "Reverse proxy and web server",
      },
    ],
  },
  {
    title: "Databases",
    description: "Data storage and caching",
    items: [
      {
        name: "MongoDB",
        icon: simpleIcon("mongodb"),
        description: "Document database",
      },
      {
        name: "PostgreSQL",
        icon: simpleIcon("postgresql"),
        description: "Relational database",
      },
      {
        name: "MySQL",
        icon: simpleIcon("mysql"),
        description: "Relational database",
      },
      {
        name: "Redis",
        icon: simpleIcon("redis"),
        description: "Caching and data structures",
      },
    ],
  },
  {
    title: "DevOps & Tools",
    description: "Development, deployment, and operations",
    items: [
      {
        name: "Docker",
        icon: simpleIcon("docker"),
        description: "Containers and Compose",
      },
      {
        name: "AWS",
        icon: simpleIcon("amazonaws"),
        description: "Cloud infrastructure",
      },
      {
        name: "Git",
        icon: simpleIcon("git"),
        description: "Version control",
      },
      {
        name: "GitHub",
        icon: simpleIcon("github"),
        description: "Repositories and collaboration",
      },
      {
        name: "Vercel",
        icon: simpleIcon("vercel"),
        description: "Web application deployment",
      },
      {
        name: "Linux",
        icon: simpleIcon("linux"),
        description: "Command line and system tools",
      },
      {
        name: "Sentry",
        icon: simpleIcon("sentry"),
        description: "Error monitoring",
      },
      {
        name: "Postman",
        icon: simpleIcon("postman"),
        description: "API testing",
      },
    ],
  },
];

const TechStackSection = () => {
  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden bg-white px-5 py-20 text-neutral-950 sm:px-8 sm:py-24"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <header className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
            Tools of the trade
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Tech Stack
          </h2>

          <p className="mt-4 text-sm leading-6 text-neutral-600 sm:text-base">
            Technologies I use to design, build, and deliver software.
          </p>

          <div className="mx-auto mt-6 h-px w-16 bg-neutral-950" />
        </header>

        {/* All categories and technologies */}
        <div className="space-y-12 sm:space-y-14">
          {categories.map((category) => (
            <section key={category.title} aria-label={category.title}>
              <div className="mb-5 flex flex-col gap-1 border-b border-neutral-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {category.description}
                  </p>
                </div>

                <span className="font-mono text-xs text-neutral-400">
                  {String(category.items.length).padStart(2, "0")} technologies
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                {category.items.map((item) => (
                  <article
                    key={`${category.title}-${item.name}`}
                    className="group flex min-h-40 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white/90 px-3 py-5 text-center shadow-[0_12px_35px_-30px_rgba(0,0,0,0.35)] transition duration-200 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)] sm:min-h-44 sm:px-4"
                  >
                    <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-3 transition duration-200 group-hover:border-neutral-300 group-hover:bg-white sm:h-20 sm:w-20 sm:p-4">
                      <img
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="h-full w-full object-contain"
                        onError={(event) => {
                          event.currentTarget.style.visibility = "hidden";
                        }}
                      />
                    </div>

                    <h4 className="mt-3 text-sm font-semibold text-neutral-900 sm:text-base">
                      {item.name}
                    </h4>

                    <p className="mt-1 max-w-40 text-xs leading-5 text-neutral-500">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;