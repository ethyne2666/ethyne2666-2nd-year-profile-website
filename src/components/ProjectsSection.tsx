import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Project data ─────────────────────────────────────────────────────────── */
const projects = [
  {
    id: "smarttax",
    title: "SmartTax",
    tagline: "Intelligent Indian Tax Management",
    logo: "https://res.cloudinary.com/debzdkdon/image/upload/v1774199673/smart_Tax-2_vpxd3s.png",
    logoType: "img",
    demoImg: "https://res.cloudinary.com/debzdkdon/image/upload/v1776012510/Screenshot_2026-04-12_221723_ybn7sb.png", 
    demoLink: "https://smart-tax-management.vercel.app/",
    codeLink: "https://github.com/ethyne2666/smartTax-management.git",
    category: "FinTech / SaaS",
    accent: "#10b981",
    description: [
      "SmartTax is a comprehensive full-stack Indian tax management platform built with React and TypeScript, designed to simplify the notoriously complex Indian tax filing landscape for individuals and businesses alike.",
      "The platform features a tiered subscription system — Free, Premium, and Enterprise — each unlocking progressively powerful tools: from basic income-tax calculators to advanced modules covering stock capital gains, crypto taxation, NRI-specific regulations, and international market reporting.",
      "A standout feature is the auto-generation of tax documentation and structured reports ready for CA review, drastically cutting preparation time. The system intelligently handles edge cases like LTCG/STCG exemptions, Section 80C deductions, and double-taxation avoidance treaties.",
      "SmartTax was innovative enough to warrant a formal Indian Patent Application filed under Form 2 of the Patents Act 1970 — a testament to the originality of its automated tax-logic engine.",
    ],
    tags: ["React", "TypeScript", "Node.js", "FinTech", "SaaS", "Indian Patent"],
    highlights: ["Patent Filed — Patents Act 1970", "Free / Premium / Enterprise Plans", "NRI & Crypto Tax Modules", "Auto-generated Tax Documentation"],
  },
  {
    id: "dealdrop",
    title: "DealDrop",
    tagline: "AI-Powered Price Tracker",
    logo: "https://price-tracker-dealdrop.vercel.app/_next/image?url=%2Fdeal-drop-logo.png&w=1080&q=75",
    logoType: "img",
    demoImg: "https://res.cloudinary.com/debzdkdon/image/upload/v1776012197/Screenshot_2026-04-12_202957_or1epz.png",
    demoLink: "https://price-tracker-dealdrop.vercel.app/",
    codeLink: "https://github.com/ethyne2666/Price-Tracker-AI-",
    category: "Web App / Automation",
    accent: "#f59e0b",
    description: [
      "DealDrop is an AI-powered price intelligence tool that continuously monitors product listings across major Indian and global e-commerce platforms — including Amazon and Flipkart — tracking price fluctuations in real time.",
      "Users define custom price targets or percentage drop thresholds, and DealDrop fires instant notifications via email or browser push the moment a deal hits. The scraping engine uses dynamic rendering to bypass bot-detection layers reliably.",
      "The AI layer goes beyond simple alerts: it predicts optimal buy windows by analyzing historical price curves, seasonal sale patterns, and competitor pricing trends, giving users a genuine edge over casual bargain hunters.",
      "Built with Python on the backend and a clean, card-based React frontend, the system is architected for horizontal scale — capable of tracking thousands of products simultaneously without degrading alert latency.",
    ],
    tags: ["Python", "AI", "Web Scraping", "React", "Notifications", "REST API"],
    highlights: ["Multi-site Price Tracking", "AI Buy-Window Prediction", "Custom Alert Rules", "Real-time Notifications"],
  },
  {
    id: "wechat",
    title: "We-Chat",
    tagline: "Real-Time Messaging App",
    logo: null,
    logoType: "svg",
    demoImg: "https://res.cloudinary.com/debzdkdon/image/upload/v1776012196/Screenshot_2026-04-12_220809_bqi6p2.png",
    demoLink: "https://we-chat-seven.vercel.app/login",
    codeLink: "https://github.com/ethyne2666/We-Chat",
    category: "Messaging App",
    accent: "#936EFF",
    description: [
      "We-Chat is a full-featured real-time messaging application inspired by the WeChat ecosystem, built to deliver a snappy, modern chat experience across devices without the bloat of most consumer messengers.",
      "The app uses WebSockets for persistent bidirectional communication, ensuring messages appear instantly on both sides with zero polling overhead. Conversations are grouped cleanly into one-on-one and group threads, with unread badges and last-seen timestamps.",
      "Rich media support allows users to share images, files, and emoji reactions. The UI is fully responsive — desktop shows a familiar two-pane layout while mobile collapses to a native-feel single-pane flow with smooth transitions.",
      "Authentication is handled via JWT with refresh-token rotation, keeping sessions secure without forcing constant re-logins. The backend is stateless and horizontally scalable, designed to handle concurrent connections at production load.",
    ],
    tags: ["React", "Node.js", "WebSockets", "JWT", "MongoDB", "UI/UX"],
    highlights: ["Real-time WebSocket Messaging", "JWT Auth with Refresh Tokens", "Group & One-on-One Chats", "Fully Responsive UI"],
  },
  {
    id: "hackathon",
    title: "Daily Basis",
    tagline: "Status Code 2 Hackathon — IIIT Kalyani",
    logo: "https://inphd.com/wp-content/uploads/IIIT-Kalyani-Logo.webp",
    logoType: "img",
    demoImg: "https://res.cloudinary.com/debzdkdon/image/upload/v1776012196/Screenshot_2026-04-12_221026_zdhvm9.png",
    demoLink: null,
    codeLink: "https://github.com/ethyne2666/hackhathon",
    category: "Hackathon Project",
    accent: "#3b82f6",
    description: [
      "Daily Basis was built during the Status Code 2 hackathon hosted by IIIT Kalyani — a high-pressure 24-hour sprint where our team designed and shipped a working product completely from scratch.",
      "The app is a Django-powered subscription platform where users curate a personalized daily briefing: morning news digests, habit trackers, productivity nudges, and AI-generated summaries of topics they care about — all in one place.",
      "AI integration was central to the pitch: GPT-based summarisation condensed long-form articles into 3-bullet digests, while a recommendation engine surfaced content based on reading history and stated interests.",
      "The project demonstrated rapid architectural decision-making under constraint — choosing Django for its batteries-included admin and ORM, Celery for async task queues, and deploying a functional demo to a cloud instance within the hackathon window.",
    ],
    tags: ["Django", "Python", "Celery", "AI Summarisation", "PostgreSQL", "Cloud"],
    highlights: ["IIIT Kalyani — Status Code 2", "AI Content Summarisation", "Subscription-based Platform", "Shipped in 24 Hours"],
  },
  {
    id: "maze",
    title: "Maze Robot",
    tagline: "4th Place — Robotics Competition",
    logo: null,
    logoType: "trophy",
    demoImg: "https://res.cloudinary.com/debzdkdon/image/upload/v1776012809/engima_xmk87p.jpg",
    demoLink: null,
    codeLink: null,
    category: "Robotics / Embedded",
    accent: "#f97316",
    description: [
      "An autonomous maze-solving robot designed and built competitively, placing 4th in a regional robotics competition against teams from across the state — navigating unknown mazes in real time with zero pre-loaded map data.",
      "The navigation algorithm is a wall-following variant enhanced with dead-end back-tracking logic, allowing the robot to recover from cul-de-sacs rather than endlessly circling. IR proximity and ultrasonic sensors provide 360° spatial awareness at under 10ms sampling rates.",
      "All control logic runs on a bare-metal C++ firmware loop with no OS overhead — keeping decision latency under 15ms from sensor read to motor command. Motor drivers were tuned via PWM for smooth differential steering around tight corners.",
      "The project was a deep dive into embedded real-time systems: interrupt-driven I/O, UART debug logging, and hardware-in-the-loop testing. The final run completed the maze 40% faster than our first prototype.",
    ],
    tags: ["Embedded C++", "Arduino", "Sensors", "PWM", "Algorithms", "Real-time"],
    highlights: ["4th Place — Regional Competition", "Real-time Sensor Fusion", "Dead-end Recovery Algorithm", "<15ms Decision Latency"],
  },
];

/* ─── Inline We-Chat SVG Logo ──────────────────────────────────────────────── */
const WeChatLogo = () => (
  <svg width="48" height="48" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M174.433 277.078L166.301 290.817C159.053 303.061 140.948 303.061 133.7 290.817L125.568 277.078C119.261 266.422 116.108 261.096 111.042 258.148C105.977 255.202 99.5992 255.092 86.844 254.873C68.0136 254.548 56.2036 253.394 46.2989 249.292C27.9217 241.679 13.3211 227.08 5.70902 208.702C0 194.92 0 177.446 0 142.501V127.5C0 78.3988 0 53.848 11.052 35.8128C17.2363 25.721 25.721 17.2363 35.8128 11.052C53.8479 0 78.3988 0 127.5 0H172.501C221.602 0 246.152 0 264.188 11.052C274.281 17.2363 282.765 25.721 288.949 35.8128C300.001 53.848 300.001 78.3988 300.001 127.5V142.501C300.001 177.446 300.001 194.92 294.292 208.702C286.68 227.08 272.08 241.679 253.702 249.292C243.797 253.394 231.988 254.548 213.157 254.873C200.401 255.092 194.024 255.202 188.959 258.148C183.893 261.094 180.739 266.422 174.433 277.078Z" fill="#936EFF" />
    <circle cx="90" cy="135" r="15" fill="white" />
    <circle cx="150" cy="135" r="15" fill="white" />
    <circle cx="210" cy="135" r="15" fill="white" />
  </svg>
);

/* ─── Main Component ───────────────────────────────────────────────────────── */
const ProjectsSection = () => {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const total = projects.length;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const go = useCallback((dir: "left" | "right") => {
    if (animating) return;
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setActive((prev) =>
        dir === "right" ? (prev + 1) % total : (prev - 1 + total) % total
      );
      setAnimating(false);
    }, 280);
  }, [animating, total]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go("right");
      if (e.key === "ArrowLeft") go("left");
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [go]);

  const p = projects[active];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Ambient accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 50% 65%, ${p.accent}12 0%, transparent 70%)`,
          transition: "background 0.7s ease",
        }}
      />

      {/* ── Section header ── */}
      <div
        className="text-center mb-14 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <h2
          className="font-black leading-none tracking-tighter"
          style={{
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            fontSize: "clamp(3rem, 10vw, 9rem)",
            color: "white",
            letterSpacing: "0.1em",
          }}
        >
          PROJECTS
        </h2>
        <p
          className="pacifico-regular"
          style={{
            fontSize: "clamp(1.5rem, 4.5vw, 3.2rem)",
            color: p.accent,
            transition: "color 0.5s ease",
            marginTop: "-0.25em",
            lineHeight: 1.3,
          }}
        >
          Showcase
        </p>
        <div
          className="mx-auto mt-4 rounded-full h-px w-16 opacity-50"
          style={{ background: p.accent, transition: "background 0.5s ease" }}
        />
      </div>

      {/* ── Carousel wrapper ── */}
      <div className="relative z-10 max-w-5xl mx-auto select-none">

        {/* Prev */}
        <button
          onClick={() => go("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                     -translate-x-3 sm:-translate-x-12
                     w-10 h-10 rounded-full flex items-center justify-center
                     border transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            borderColor: `${p.accent}50`,
            background: "rgba(0,0,0,0.7)",
            color: p.accent,
            boxShadow: `0 0 20px ${p.accent}20`,
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: `1px solid ${p.accent}30`,
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(16px)",
            boxShadow: `0 0 80px ${p.accent}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${animDir === "right" ? "-50px" : "50px"}) scale(0.98)`
              : "translateX(0) scale(1)",
            transition: "opacity 0.28s ease, transform 0.28s ease, border-color 0.6s, box-shadow 0.6s",
          }}
        >
          <div className="flex flex-col lg:flex-row">

            {/* LEFT — Logo + demo image */}
            <div
              className="lg:w-[40%] flex-shrink-0 flex flex-col items-center justify-center gap-5 p-8 relative min-h-[260px]"
              style={{ borderRight: `1px solid ${p.accent}18` }}
            >
              {/* grid texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg,${p.accent} 0,transparent 1px,transparent 44px),
                                    repeating-linear-gradient(90deg,${p.accent} 0,transparent 1px,transparent 44px)`,
                }}
              />

              <div className="relative z-10 flex flex-col items-center gap-5 w-full">
                {/* Logo */}
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0"
                  style={{ background: "#111", border: `1px solid ${p.accent}30` }}
                >
                  {p.logoType === "svg" ? (
                    <WeChatLogo />
                  ) : p.logoType === "trophy" ? (
                    <span className="text-3xl">🏆</span>
                  ) : (
                    <img
                      src={p.logo!}
                      alt={p.title}
                      className="w-14 h-14 object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
                    />
                  )}
                </div>

                {/* Demo image */}
                <div
                  className="w-full rounded-xl overflow-hidden flex items-center justify-center"
                  style={{
                    aspectRatio: "16/9",
                    border: `1px dashed ${p.accent}35`,
                    background: `${p.accent}07`,
                  }}
                >
                  {p.demoImg ? (
                    <img src={p.demoImg} alt={`${p.title} screenshot`} className="w-full h-full object-cover" />
                  ) : (
                    <span
                      className="text-xs font-mono"
                      style={{ color: `${p.accent}50` }}
                    >
                      add screenshot here
                    </span>
                  )}
                </div>

                {/* Category */}
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    background: `${p.accent}15`,
                    border: `1px solid ${p.accent}40`,
                    color: p.accent,
                  }}
                >
                  {p.category}
                </span>
              </div>
            </div>

            {/* RIGHT — Content */}
            <div
              className="project-scroll flex-1 flex flex-col gap-5 p-8 lg:p-10 overflow-y-auto"
              style={{
                maxHeight: "580px",
                "--project-accent": p.accent,
              } as React.CSSProperties}
            >

              {/* Title + tagline */}
              <div>
                <h3
                  className="font-black leading-none mb-1"
                  style={{
                    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    color: "white",
                    letterSpacing: "0.03em",
                  }}
                >
                  {p.title}
                </h3>
                <p className="pacifico-regular text-base" style={{ color: p.accent }}>
                  {p.tagline}
                </p>
              </div>

              {/* Paragraphs */}
              <div className="space-y-3">
                {p.description.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: i === 0 ? "#d1d5db" : "#9ca3af" }}>
                    {i === 0 ? (
                      <>
                        <span style={{ color: p.accent, fontWeight: 700 }}>
                          {para.split(".")[0]}.
                        </span>
                        {para.slice(para.indexOf(".") + 1)}
                      </>
                    ) : para}
                  </p>
                ))}
              </div>

              {/* Highlights grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {p.highlights.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                    style={{
                      background: `${p.accent}0f`,
                      border: `1px solid ${p.accent}22`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                    <span className="text-gray-300">{h}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs"
                    style={{ borderColor: `${p.accent}40`, color: "#6b7280" }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 mt-auto pt-2 flex-wrap">
                {p.demoLink && (
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-mono font-semibold
                               transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ background: p.accent, color: "#000" }}
                    onClick={() => window.open(p.demoLink!, "_blank")}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </button>
                )}
                {p.codeLink && (
                  <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-mono
                               border transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-white/5"
                    style={{ borderColor: `${p.accent}50`, color: "#e5e7eb" }}
                    onClick={() => window.open(p.codeLink!, "_blank")}
                  >
                    <Github className="w-3.5 h-3.5" />
                    Source Code
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Next */}
        <button
          onClick={() => go("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                     translate-x-3 sm:translate-x-12
                     w-10 h-10 rounded-full flex items-center justify-center
                     border transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            borderColor: `${p.accent}50`,
            background: "rgba(0,0,0,0.7)",
            color: p.accent,
            boxShadow: `0 0 20px ${p.accent}20`,
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center items-center gap-2.5 mt-10 relative z-10">
        {projects.map((proj, i) => (
          <button
            key={proj.id}
            onClick={() => {
              if (i === active || animating) return;
              setAnimDir(i > active ? "right" : "left");
              setAnimating(true);
              setTimeout(() => { setActive(i); setAnimating(false); }, 280);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? "30px" : "10px",
              height: "10px",
              background: i === active ? p.accent : "rgba(255,255,255,0.15)",
              border: `1px solid ${i === active ? p.accent : "rgba(255,255,255,0.1)"}`,
            }}
          />
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div className="text-center mt-14 relative z-10">
        <p className="text-xs text-gray-600 font-mono mb-5 tracking-widest uppercase">
          {active + 1} of {total} &nbsp;·&nbsp; ← → keys also work
        </p>
        <button
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-semibold
                     border border-white/20 bg-white/5 text-white
                     hover:bg-white/10 hover:border-white/30 transition-all duration-200 hover:scale-105"
          onClick={() => window.open("https://github.com/ethyne2666", "_blank")}
        >
          <Github className="w-4 h-4" />
          All Projects on GitHub
        </button>
      </div>
    </section>
  );
};

export default ProjectsSection;