import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Code2,
  KeyRound,
  Network,
  Radio,
  Terminal,
} from "lucide-react";
import RequestConsole from "./postman/RequestConsole";
import Footer from "../components/Footer";

type ModuleId = "request-console" | "auth-simulator" | "system-sketches";

const MODULES: {
  id: ModuleId;
  label: string;
  icon: typeof Terminal;
  live: boolean;
}[] = [
  {
    id: "request-console",
    label: "Request Console",
    icon: Terminal,
    live: true,
  },
  {
    id: "auth-simulator",
    label: "Auth Simulator",
    icon: KeyRound,
    live: false,
  },
  {
    id: "system-sketches",
    label: "System Sketches",
    icon: Network,
    live: false,
  },
];

const PROMPT_TEXT = "visitor@charankumar:~/playground$ select a module to begin";

const PlaygroundPage = () => {
  const [activeModule, setActiveModule] =
    useState<ModuleId>("request-console");
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setTypedText(PROMPT_TEXT);
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(PROMPT_TEXT.slice(0, index));

      if (index >= PROMPT_TEXT.length) {
        window.clearInterval(interval);
      }
    }, 22);

    return () => window.clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white text-neutral-950">
      {/* Monochrome grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, black, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, black 55%, transparent 100%)",
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-neutral-300 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6 md:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-400 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 transition hover:border-neutral-950 hover:text-black sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </a>

        <div className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-700">
          <span className="h-2 w-2 rounded-full bg-neutral-950" />
          Request console
        </div>
      </header>

      {/* Intro */}
      <section className="relative z-10 border-b border-neutral-200 px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
        <div className="mx-auto w-full max-w-7xl">
          <p className="min-h-[1.5em] font-mono text-xs text-neutral-600 sm:text-sm">
            {typedText}
            <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-neutral-950 align-middle" />
          </p>

          <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
                Interactive portfolio
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                The Playground
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
                Explore API requests and interactive tools for backend
                development, authentication, and system design.
              </p>
            </div>

            <a
              href="https://github.com/ethyne2666"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-neutral-400 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
            >
              View my code
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Module selector and selected module */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 md:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-neutral-950">
              Playground modules
            </h2>
            <p className="mt-1 text-xs text-neutral-600">
              Choose a tool to explore.
            </p>
          </div>

          {/* Mobile dropdown */}
          <label className="relative block sm:max-w-xs md:hidden">
            <span className="sr-only">Choose a playground module</span>
            <select
              value={activeModule}
              onChange={(event) =>
                setActiveModule(event.target.value as ModuleId)
              }
              className="w-full appearance-none rounded-lg border border-neutral-400 bg-white px-4 py-3 pr-10 text-sm font-medium text-neutral-950 shadow-sm outline-none focus:border-neutral-950 focus:ring-2 focus:ring-neutral-300"
            >
              {MODULES.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.label}
                  {!module.live ? " — Coming soon" : ""}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-700"
            >
              ▾
            </span>
          </label>
        </div>

        <div className="grid flex-1 gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-8">
          {/* Desktop selector */}
          <nav
            aria-label="Playground modules"
            className="hidden h-fit flex-col gap-2 md:flex"
          >
            {MODULES.map((module) => {
              const Icon = module.icon;
              const isActive = activeModule === module.id;

              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => setActiveModule(module.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition ${
                    isActive
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : "border-neutral-400 bg-white text-neutral-800 hover:border-neutral-950 hover:bg-neutral-50"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="min-w-0 flex-1 text-sm font-medium">
                    {module.label}
                  </span>
                  {module.live ? (
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isActive ? "bg-white" : "bg-neutral-950"
                      }`}
                    />
                  ) : (
                    <span
                      className={`text-[9px] font-semibold uppercase ${
                        isActive ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Selected module content */}
          <div className="min-w-0">
            {activeModule === "request-console" && (
              <div className="min-h-[420px] rounded-xl border border-neutral-300 bg-white p-4 shadow-sm sm:p-6">
                <RequestConsole />
              </div>
            )}

            {activeModule === "auth-simulator" && (
              <ComingSoonPanel
                title="Auth Simulator"
                path="~/playground/auth-simulator"
                description="Explore a sign-in flow, inspect a signed token, and see how protected endpoints respond when authentication is present or missing."
                icon={KeyRound}
              />
            )}

            {activeModule === "system-sketches" && (
              <ComingSoonPanel
                title="System Sketches"
                path="~/playground/system-sketches"
                description="Explore architecture examples such as a URL shortener and notification pipeline, and follow how requests move between services."
                icon={Network}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-neutral-200 bg-white/85 px-4 py-5 sm:px-6 md:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="/"
            className="inline-flex w-fit items-center gap-2 font-semibold text-neutral-800 transition hover:text-black"
          >
            <Code2 className="h-4 w-4" />
            Charan Kumar
          </a>
          <p>Interactive backend and system design playground</p>
        </div>
      </footer>
      <Footer/>
    </div>
  );
};

const ComingSoonPanel = ({
  title,
  path,
  description,
  icon: Icon,
}: {
  title: string;
  path: string;
  description: string;
  icon: typeof KeyRound;
}) => (
  <section className="min-h-[300px] rounded-xl border border-neutral-300 bg-white p-6 shadow-sm sm:p-8">
    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-800">
      <Icon className="h-5 w-5" />
    </div>

    <p className="mb-2 font-mono text-xs text-neutral-500">{path}</p>
    <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
      {title}
    </h2>
    <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base">
      {description}
    </p>

    <span className="mt-6 inline-flex rounded-full border border-neutral-300 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-600">
      In progress
    </span>
  </section>
);

export default PlaygroundPage;