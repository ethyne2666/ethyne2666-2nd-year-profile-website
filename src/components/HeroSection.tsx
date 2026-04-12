import { ChevronDown, FileText, Code } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/78" />

      {/* ── Main Content ── */}
      <div className="relative z-10 w-full flex flex-col items-center px-4">

        {/* ── BIG NAME TOP — "CHARAN" ── */}
        <h1
          className="font-black leading-none tracking-tight select-none text-center"
          style={{
            fontSize: "clamp(3.5rem, 18vw, 14rem)",
            color: "white",
            WebkitTextStroke: "2px rgba(255,255,255,0.12)",
            textShadow: "4px 4px 0px #38bdf8, 8px 8px 0px rgba(56,189,248,0.18)",
          }}
        >
          CHARAN
        </h1>

        {/* ── MIDDLE ROW — photo + subtitle ── */}
        <div
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 relative z-20"
          style={{ marginTop: "clamp(-12px, -2vw, -24px)" }}
        >
          {/* Profile photo */}
          <div className="relative flex-shrink-0">
            <div
              style={{
                background: "conic-gradient(from 0deg, #38bdf8 0%, #38bdf8 50%, #10b981 50%, #10b981 100%)",
                borderRadius: "50%",
                padding: "4px",
                display: "inline-block",
              }}
            >
              <div
                style={{
                  background: "black",
                  borderRadius: "50%",
                  padding: "3px",
                  display: "inline-block",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dyblpfzvz/image/upload/v1759581921/WhatsApp_Image_2025-05-05_at_23.42.22_9bee3e5b_jg8evd.jpg"
                  alt="Charan Kumar"
                  className="object-cover rounded-full block"
                  style={{
                    width: "clamp(90px, 22vw, 144px)",
                    height: "clamp(90px, 22vw, 144px)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Subtitle block */}
          <div className="text-center md:text-left">
            {/* Role line — Pacifico */}
            <p
              className="pacifico-regular"
              style={{
                fontSize: "clamp(1.3rem, 5vw, 2.6rem)",
                lineHeight: 1.25,
              }}
            >
              <span style={{ color: "white" }}>Web </span>
              <span style={{ color: "#38bdf8" }}>Developer</span>
              <span style={{ color: "white" }}> and </span>
              <span style={{ color: "#10b981" }}>DevOps</span>
            </p>

            {/* Sub-caption — HIDDEN on mobile, visible md+ */}
            <p
              className="hidden md:block text-xs mt-2 font-mono tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              ECE Student · Full-Stack · Cloud &amp; Infra
            </p>

            {/* Mobile-only short caption — cleaner, no ECE clutter */}
            <p
              className="block md:hidden text-xs mt-1.5 font-mono tracking-wider"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Full-Stack · Cloud &amp; Infra
            </p>
          </div>
        </div>

        {/* ── BIG NAME BOTTOM — "KUMAR" ── */}
        <h1
          className="font-black leading-none tracking-tight select-none text-center"
          style={{
            fontSize: "clamp(3.5rem, 18vw, 14rem)",
            marginTop: "clamp(-12px, -2vw, -24px)",
            color: "white",
            WebkitTextStroke: "2px rgba(255,255,255,0.12)",
            textShadow: "-4px 4px 0px #10b981, -8px 8px 0px rgba(16,185,129,0.18)",
          }}
        >
          KUMAR
        </h1>

        {/* ── Bio paragraph ── */}
        <p
          className="mt-4 md:mt-6 max-w-xl text-center leading-relaxed px-2"
          style={{
            color: "rgba(255,255,255,0.52)",
            fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)",
          }}
        >
          I craft{" "}
          <span
            style={{
              background: "#38bdf8",
              color: "#000",
              padding: "1px 8px",
              borderRadius: "4px",
              fontWeight: 600,
            }}
          >
            web developer
          </span>{" "}
          experiences — from pixel-perfect UIs to rock-solid REST APIs — and ship them faster with{" "}
          <span
            style={{
              background: "#10b981",
              color: "#000",
              padding: "1px 8px",
              borderRadius: "4px",
              fontWeight: 600,
            }}
          >
            DevOps engineer
          </span>{" "}
          workflows: Docker, CI/CD pipelines, cloud deployments, and automated infra that just works.
        </p>

        {/* ── CTA Buttons ── */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 md:mt-8">
          <button
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1EpYVVI4ovILdJ30Jq_ZlPbfA0ibK6dvp/view?usp=sharing",
                "_blank"
              )
            }
            className="flex items-center gap-2 rounded-full font-semibold
                       transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-white/5"
            style={{
              padding: "clamp(8px,2vw,12px) clamp(16px,4vw,24px)",
              fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
              border: "2px solid #38bdf8",
              color: "#38bdf8",
              background: "transparent",
            }}
          >
            <FileText className="w-4 h-4 flex-shrink-0" />
            View Resume
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            className="flex items-center gap-2 rounded-full font-bold
                       transition-all duration-200 hover:scale-105 active:scale-95 hover:opacity-90"
            style={{
              padding: "clamp(8px,2vw,12px) clamp(16px,4vw,24px)",
              fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
              background: "#10b981",
              color: "#000",
              border: "2px solid #10b981",
            }}
          >
            <Code className="w-4 h-4 flex-shrink-0" />
            My Projects
          </button>
        </div>

        {/* Scroll hint */}
        <button
          onClick={() => scrollToSection("about")}
          className="mt-8 md:mt-12 flex flex-col items-center gap-1"
        >
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            scroll
          </span>
          <ChevronDown
            className="w-5 h-5 animate-bounce"
            style={{ color: "#10b981" }}
          />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;