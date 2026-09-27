import { FileText, Code } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-white text-neutral-950"
    >
      {/* Subtle grid and soft color accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 85%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl"
      />

      {/* Decorative tech symbols */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      >
        <span className="absolute left-[7%] top-[19%] font-mono text-sm text-neutral-300/80">
          {"</>"}
        </span>
        <span className="absolute left-[46%] top-[12%] font-mono text-xs text-emerald-600/40">
          {"{ }"}
        </span>
        <span className="absolute right-[9%] top-[23%] font-mono text-xs text-sky-600/50">
          API
        </span>
        <span className="absolute left-[8%] bottom-[23%] font-mono text-xs text-sky-600/40">
          01
        </span>
        <span className="absolute right-[8%] bottom-[18%] font-mono text-sm text-emerald-600/50">
          {"↗"}
        </span>
        <span className="absolute right-[44%] bottom-[11%] font-mono text-xs text-neutral-300">
          {"[ deploy ]"}
        </span>

        <span className="absolute left-[13%] top-[42%] h-2 w-2 rounded-full border border-emerald-400/70" />
        <span className="absolute right-[13%] top-[58%] h-2 w-2 rounded-full bg-sky-400/50" />
        <span className="absolute right-[28%] top-[14%] h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* Left half: text content */}
        <div className="order-2 flex w-full items-center px-6 py-12 md:px-12 lg:order-1 lg:w-1/2 lg:py-20">
          <div className="mx-auto flex max-w-xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
            {/* Headline */}
            <h1
              className="font-black leading-[1.05] tracking-tight"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                color: "#0a0a0a",
                fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
              }}
            >
              Charan Kumar
              <br />
              builds{" "}
              <span
                className="decoration-emerald-400 decoration-[5px] underline underline-offset-[7px]"
                style={{ fontStyle: "italic" }}
              >
                full-stack
              </span>{" "}
              products
            </h1>

            {/* Role line */}
            <p
              className="mt-4 tracking-tight"
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                lineHeight: 1.3,
                color: "#0a0a0a",
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              <span className="font-bold">Spring Boot</span>
              {" · "}
              <span className="italic">MERN Stack</span>
              {" · "}
              <span className="font-bold">DevOps</span>
            </p>

            {/* Bio */}
            <p
              className="mt-5 max-w-lg leading-relaxed"
              style={{ color: "#525252", fontSize: "1rem" }}
            >
              I build dependable web applications from the interface to the
              infrastructure—using{" "}
              <span className="font-bold text-neutral-950 underline decoration-emerald-400 decoration-2 underline-offset-4">
                Spring Boot and the MERN stack
              </span>{" "}
              to create full-stack experiences, and{" "}
              <span className="font-semibold italic text-neutral-950">
                DevOps
              </span>{" "}
              to automate delivery with Docker, CI/CD, and cloud deployments.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/1JnynU7mL9Er2wz8NPjf_l_KkAVdXjGQj/view?usp=sharing",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="flex items-center gap-2 rounded-full border-2 border-neutral-950 bg-white/70 px-6 py-3 text-sm font-semibold text-neutral-950 transition-all duration-200 hover:scale-105 hover:bg-neutral-950 hover:text-white active:scale-95"
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                View Resume
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="flex items-center gap-2 rounded-full border-2 border-neutral-950 bg-white/70 px-6 py-3 text-sm font-semibold text-neutral-950 transition-all duration-200 hover:scale-105 hover:bg-neutral-950 hover:text-white active:scale-95"
              >
                <Code className="h-4 w-4 flex-shrink-0" />
                My Projects
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/playground";
                }}
                className="flex items-center gap-2 rounded-full border-2 border-neutral-950 bg-white/70 px-6 py-3 text-sm font-semibold text-neutral-950 transition-all duration-200 hover:scale-105 hover:bg-emerald-400 hover:text-neutral-950 active:scale-95"
              >
                <Code className="h-4 w-4 flex-shrink-0" />
                Playground
              </button>
            </div>

            {/* Skill tags */}
            <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-neutral-200/80 pt-6 lg:justify-start">
              <span className="text-sm font-medium text-neutral-800">
                Spring Boot · MERN Stack
              </span>
              <span
                aria-hidden="true"
                className="hidden h-4 w-px bg-neutral-300 sm:block"
              />
              <span className="text-sm font-medium text-neutral-800">
                DevOps · Cloud · CI/CD
              </span>
            </div>
          </div>
        </div>

        {/* Right half: profile photo */}
        <div className="order-1 flex w-full items-center justify-center py-10 lg:order-2 lg:w-1/2 lg:py-20">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[1.75rem] border border-dashed border-emerald-300/70"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-[2.25rem] border border-sky-200/70"
            />

            <div className="relative h-[clamp(160px,40vw,340px)] w-[clamp(160px,40vw,340px)] overflow-hidden rounded-[1.25rem] border-[5px] border-neutral-950 bg-neutral-100 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.35)]">
              <img
                src="https://res.cloudinary.com/debzdkdon/image/upload/v1790509455/charan_pstc1i.png"
                alt="Charan Kumar"
                className="block h-full w-full object-cover"
              />
            </div>

            {/* Small decorative labels */}
            <div className="absolute -left-8 top-8 hidden rounded-lg border border-neutral-200 bg-white/90 px-3 py-2 font-mono text-[10px] text-neutral-500 shadow-sm sm:block">
              {"<developer />"}
            </div>
            <div className="absolute -bottom-5 -right-5 rounded-lg border border-neutral-200 bg-white/90 px-3 py-2 font-mono text-[10px] text-neutral-500 shadow-sm">
              {"git push"}
              <span className="ml-1 text-emerald-600">✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;