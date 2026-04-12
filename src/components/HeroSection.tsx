import { ChevronDown, FileText, Code } from "lucide-react";

/* Blue  : #38bdf8  (sky-400)   — Web Developer colour  */
/* Green : #10b981  (emerald-500) — DevOps colour        */

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
          className="text-[18vw] md:text-[16vw] font-black leading-none tracking-tight select-none text-center"
          style={{
            color: "white",
            WebkitTextStroke: "2px rgba(255,255,255,0.12)",
            textShadow: "4px 4px 0px #38bdf8, 8px 8px 0px rgba(56,189,248,0.18)",
          }}
        >
          CHARAN
        </h1>

        {/* ── MIDDLE ROW — photo left + Pacifico subtitle right ── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 -mt-4 md:-mt-6 relative z-20">

          {/* Profile photo — blue + green dual ring */}
          <div className="relative flex-shrink-0" style={{ width: "fit-content" }}>
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
                  className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-full block"
                />
              </div>
            </div>
          </div>

          {/* Pacifico cursive subtitle */}
          <div className="text-center md:text-left">
            <p
              className="text-2xl md:text-4xl"
              style={{ fontFamily: '"Pacifico", cursive', fontWeight: 300 }}
            >
              <span style={{ color: "white" }}>Web </span>
              <span style={{ color: "#38bdf8" }}>Developer</span>
              <span style={{ color: "white" }}> and </span>
              <span style={{ color: "#10b981" }}>DevOps</span>
            </p>
            <p
              className="text-xs md:text-sm mt-2 font-mono tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              ECE Student · Full-Stack · Cloud & Infra
            </p>
          </div>
        </div>

        {/* ── BIG NAME BOTTOM — "KUMAR" ── */}
        <h1
          className="text-[18vw] md:text-[16vw] font-black leading-none tracking-tight select-none text-center -mt-4 md:-mt-6"
          style={{
            color: "white",
            WebkitTextStroke: "2px rgba(255,255,255,0.12)",
            textShadow: "-4px 4px 0px #10b981, -8px 8px 0px rgba(16,185,129,0.18)",
          }}
        >
          KUMAR
        </h1>

        {/* ── Bio paragraph — blue & green highlights, no pink/purple ── */}
        <p
          className="mt-6 max-w-xl text-center text-base md:text-lg leading-relaxed"
          style={{ color: "rgba(255,255,255,0.52)" }}
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

        {/* ── CTA Buttons — only two ── */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1EpYVVI4ovILdJ30Jq_ZlPbfA0ibK6dvp/view?usp=sharing",
                "_blank"
              )
            }
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold
                       transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-white/5"
            style={{
              border: "2px solid #38bdf8",
              color: "#38bdf8",
              background: "transparent",
            }}
          >
            <FileText className="w-4 h-4" />
            View Resume
          </button>

          <button
            onClick={() => scrollToSection("projects")}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold
                       transition-all duration-200 hover:scale-105 active:scale-95 hover:opacity-90"
            style={{
              background: "#10b981",
              color: "#000",
              border: "2px solid #10b981",
              fontWeight: 700,
            }}
          >
            <Code className="w-4 h-4" />
            My Projects
          </button>
        </div>

        {/* Scroll hint */}
        <button
          onClick={() => scrollToSection("about")}
          className="mt-12 flex flex-col items-center gap-1"
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