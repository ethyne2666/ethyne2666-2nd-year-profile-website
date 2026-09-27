import { useEffect, useState } from "react";
import {
  ExternalLink,
  Github,
  X,
  ArrowUpRight,
  FolderOpen,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  details: string;
  tags: string[];
  demoLink?: string | null;
  codeLink?: string | null;
};

const projects: Project[] = [
  {
    id: "smarttax",
    title: "SmartTax",
    category: "FinTech · SaaS",
    image:
      "https://res.cloudinary.com/debzdkdon/image/upload/v1776012510/Screenshot_2026-04-12_221723_ybn7sb.png",
    description:
      "A tax management platform that helps users understand, calculate, and organize Indian tax information.",
    details:
      "SmartTax brings tax tools and reporting into one platform, with features for income tax, investments, crypto, and NRI scenarios. It includes tiered plans and tools for preparing structured tax documents.",
    tags: ["React", "TypeScript", "Node.js", "FinTech"],
    demoLink: "https://smart-tax-management.vercel.app/",
    codeLink: "https://github.com/ethyne2666/smartTax-management",
  },
  {
    id: "dealdrop",
    title: "DealDrop",
    category: "Web App · Automation",
    image:
      "https://res.cloudinary.com/debzdkdon/image/upload/v1776012197/Screenshot_2026-04-12_202957_or1epz.png",
    description:
      "A price tracking app that helps shoppers follow products and spot price changes.",
    details:
      "DealDrop tracks product prices and lets users set target prices or percentage-drop alerts. The project combines a React interface with backend price monitoring and notification features.",
    tags: ["Python", "React", "Web Scraping", "Automation"],
    demoLink: "https://price-tracker-dealdrop.vercel.app/",
    codeLink: "https://github.com/ethyne2666/Price-Tracker-AI-",
  },
  {
    id: "wechat",
    title: "We-Chat",
    category: "Messaging · Real Time",
    image:
      "https://res.cloudinary.com/debzdkdon/image/upload/v1776012196/Screenshot_2026-04-12_220809_bqi6p2.png",
    description:
      "A responsive messaging app with real-time conversations and account authentication.",
    details:
      "We-Chat uses WebSockets for live messaging and supports one-to-one and group conversations. The interface adapts to mobile screens, with JWT-based authentication.",
    tags: ["React", "Node.js", "WebSockets", "MongoDB"],
    demoLink: "https://we-chat-seven.vercel.app/login",
    codeLink: "https://github.com/ethyne2666/We-Chat",
  },
  {
    id: "fitness-microservices",
    title: "AI Fitness Microservices",
    category: "Spring Boot · Microservices",
    image:
      "https://res.cloudinary.com/debzdkdon/image/upload/v1790512603/flow_l6qoco.png",
    description:
      "An AI-powered fitness app built with Spring Boot microservices and a React frontend.",
    details:
      "The system connects user, activity, and AI services through an API Gateway and Eureka service discovery. It uses centralized configuration, Keycloak authentication, RabbitMQ messaging, PostgreSQL, MongoDB, and Gemini-powered fitness recommendations.",
    tags: [
      "Spring Boot",
      "Spring Cloud",
      "React",
      "RabbitMQ",
      "Keycloak",
      "Gemini AI",
    ],
    demoLink: null,
    codeLink: "https://github.com/ethyne2666/fitness_microservices",
  },
  {
    id: "daily-basis",
    title: "Daily Basis",
    category: "Hackathon · IIIT Kalyani",
    image:
      "https://res.cloudinary.com/debzdkdon/image/upload/v1776012196/Screenshot_2026-04-12_221026_zdhvm9.png",
    description:
      "A subscription-based Django app created with a team during the Status Code 2 hackathon.",
    details:
      "Daily Basis was developed during the Status Code 2 hackathon at IIIT Kalyani. The project explored a Django-based subscription experience and gave the team a chance to design and build a working product under time constraints.",
    tags: ["Django", "Python", "Hackathon"],
    demoLink: null,
    codeLink: "https://github.com/ethyne2666/hackhathon",
  },
  {
    id: "maze-robot",
    title: "Maze Robot",
    category: "Robotics · Embedded Systems",
    image:
      "https://res.cloudinary.com/debzdkdon/image/upload/v1776012809/engima_xmk87p.jpg",
    description:
      "An autonomous maze-solving robot that earned 4th place in the Enigma Robotics Competition.",
    details:
      "The robot uses sensors and embedded C++ control logic to navigate a maze, handle dead ends, and steer through turns. The project involved robotics hardware, sensor input, and real-time decision-making.",
    tags: ["C++", "Arduino", "Sensors", "Robotics"],
    demoLink: null,
    codeLink: null,
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white px-5 py-20 text-neutral-950 sm:px-8 sm:py-24"
    >
      {/* Subtle monochrome grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 12%, black 85%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}
        <header className="mb-12 text-center sm:mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
            Selected work
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base">
            A selection of applications and systems I’ve built.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-950" />
        </header>

        {/* Project list */}
        <div className="space-y-8 sm:space-y-10">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_16px_50px_-38px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_22px_60px_-38px_rgba(0,0,0,0.45)]"
            >
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                {/* Large project image */}
                <div className="relative min-h-64 bg-neutral-100 sm:min-h-80 lg:min-h-[360px]">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading={index > 1 ? "lazy" : "eager"}
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-700 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Project summary */}
                <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 font-mono text-xs text-neutral-400">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(projects.length).padStart(2, "0")}
                      </p>
                      <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        {project.title}
                      </h3>
                    </div>
                    <FolderOpen
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 flex-shrink-0 text-neutral-400"
                    />
                  </div>

                  <p className="max-w-xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links directly after the image/summary */}
                  <div className="mt-7 flex flex-wrap gap-3">
                    {project.demoLink && (
                      <button
                        type="button"
                        onClick={() => openLink(project.demoLink!)}
                        className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
                      >
                        Live demo
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    )}

                    {project.codeLink && (
                      <button
                        type="button"
                        onClick={() => openLink(project.codeLink!)}
                        className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition hover:border-neutral-500 hover:bg-neutral-50"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                        <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
                      </button>
                    )}

                    {!project.demoLink && !project.codeLink && (
                      <span className="text-sm text-neutral-500">
                        Project details available on request
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="ml-auto rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 underline decoration-neutral-300 underline-offset-4 transition hover:text-black hover:decoration-neutral-800"
                    >
                      More info
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* GitHub profile */}
        <div className="mt-12 text-center sm:mt-16">
          <button
            type="button"
            onClick={() => openLink("https://github.com/ethyne2666")}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-800 transition hover:border-neutral-500 hover:bg-neutral-50"
          >
            <Github className="h-4 w-4" />
            More projects on GitHub
            <ArrowUpRight className="h-4 w-4 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Project details popup */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
          onTouchStart={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProject(null);
            }
          }}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="relative my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
              className="absolute right-4 top-4 rounded-full border border-neutral-200 p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="mb-2 pr-10 font-mono text-xs uppercase tracking-wider text-neutral-500">
              {selectedProject.category}
            </p>
            <h3
              id="project-dialog-title"
              className="pr-10 text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl"
            >
              {selectedProject.title}
            </h3>

            <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} project preview`}
                className="max-h-64 w-full object-cover"
              />
            </div>

            <p className="mt-6 text-sm leading-7 text-neutral-600 sm:text-base">
              {selectedProject.details}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-neutral-200 pt-5">
              {selectedProject.demoLink && (
                <button
                  type="button"
                  onClick={() => openLink(selectedProject.demoLink!)}
                  className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
                >
                  Live demo
                  <ExternalLink className="h-4 w-4" />
                </button>
              )}

              {selectedProject.codeLink && (
                <button
                  type="button"
                  onClick={() => openLink(selectedProject.codeLink!)}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
                >
                  <Github className="h-4 w-4" />
                  View source
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;