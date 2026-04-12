import { useState, useRef, useEffect, KeyboardEvent } from "react";

// ─── Command definitions ───────────────────────────────────────────────────────
const COMMANDS: Record<string, () => string | string[]> = {
  help: () => [
    "┌─────────────────────────────────────────┐",
    "│          AVAILABLE COMMANDS             │",
    "├─────────────────────────────────────────┤",
    "│  help         → show this menu          │",
    "│  whoareyou    → about Charan            │",
    "│  projects     → list all projects       │",
    "│  skills       → tech stack              │",
    "│  contact      → get in touch            │",
    "│  demo <name>  → open a project demo     │",
    "│  github       → open GitHub profile     │",
    "│  linkedin     → open LinkedIn profile   │",
    "│  clear        → clear the terminal      │",
    "│  exit         → close terminal          │",
    "└─────────────────────────────────────────┘",
  ],

  whoareyou: () => [
    "",
    "  ██████╗██╗  ██╗ █████╗ ██████╗  █████╗ ███╗   ██╗",
    "  ██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗████╗  ██║",
    "  ██║     ███████║███████║██████╔╝███████║██╔██╗ ██║",
    "  ██║     ██╔══██║██╔══██║██╔══██╗██╔══██║██║╚██╗██║",
    "  ╚██████╗██║  ██║██║  ██║██║  ██║██║  ██║██║ ╚████║",
    "   ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝",
    "",
    "  AI & Web Developer  |  Electronics Student  |  Open Source Enthusiast",
    "",
    "  ● Backend dev, microservices, AI projects",
    "  ● Electronics & IoT hardware hacker",
    "  ● Competitive programmer (C++)",
    "  ● Building at the intersection of software & hardware",
    "",
    "  Based in Kolkata, India 🇮🇳",
    "",
  ],

  projects: () => [
    "",
    "  ┌── PROJECTS ───────────────────────────────────────────────────┐",
    "  │",
    "  │  [1] Developer Portfolio                                      │",
    "  │      → 3D hero (Three.js), Voice Agent, Web Audio API        │",
    "  │      → MERN monorepo, Vite + React client                    │",
    "  │",
    "  │  [2] SmartTax                                                 │",
    "  │      → Full-stack tax management web app (React + TypeScript) │",
    "  │      → Free / Premium / Enterprise plan system               │",
    "  │      → Indian patent application generated (Patents Act 1970) │",
    "  │      → demo: smart-tax-management.vercel.app                 │",
    "  │",
    "  │  [3] DealDrop – Price Tracker AI                              │",
    "  │      → AI-powered e-commerce price monitoring & alerts       │",
    "  │      → Python, web scraping, multi-site tracking             │",
    "  │",
    "  │  [4] We-Chat                                                  │",
    "  │      → Real-time messaging app (React + WebSockets)          │",
    "  │",
    "  │  [5] Status Code 2 Hackathon – Daily Basis                    │",
    "  │      → Django subscription web app, AI integration           │",
    "  │",
    "  │  [6] Maze Following Robot                                     │",
    "  │      → Autonomous robot, 4th place in robotics competition   │",
    "  │      → Embedded C++, sensors, real-time navigation           │",
    "  │",
    "  │  [7] Smart Security System                                    │",
    "  │      → Arduino Nano + IR/Ultrasonic + Bluetooth (HC-05)      │",
    "  │      → LED alarm + mobile control                            │",
    "  │",
    "  └───────────────────────────────────────────────────────────────┘",
    "",
    "  Type  demo <project name>  to open a live demo.",
    "",
  ],

  skills: () => [
    "",
    "  LANGUAGES      →  TypeScript  JavaScript  Python  C++",
    "  FRONTEND       →  React  Vite  Tailwind  Three.js  shadcn/ui",
    "  BACKEND        →  Node.js  Express  Django  REST  Microservices",
    "  AI / ML        →  Anthropic API  LangChain  Web Speech API",
    "  DATABASES      →  MongoDB  PostgreSQL",
    "  HARDWARE       →  Arduino  ESP8266 (NodeMCU)  HC-05  HC-SR04",
    "  TOOLS          →  Git  Docker  Vercel  Bun  VS Code",
    "",
  ],

  contact: () => [
    "",
    "  ┌── CONTACT ──────────────────────────────────┐",
    "  │  GitHub    → github.com/ethyne2666          │",
    "  │  LinkedIn  → linkedin.com/in/charan-kumar   │",
    "  │  Location  → Kolkata, West Bengal, India    │",
    "  └─────────────────────────────────────────────┘",
    "",
    "  Type  github  or  linkedin  to open directly.",
    "",
  ],

  github: () => {
    window.open("https://github.com/ethyne2666", "_blank");
    return "  → Opening GitHub profile...";
  },

  linkedin: () => {
    window.open("https://linkedin.com/in/charan-kumar-ab5568311", "_blank");
    return "  → Opening LinkedIn profile...";
  },

  clear: () => "__CLEAR__",
  exit: () => "__EXIT__",
};

// demo sub-command
const DEMO_LINKS: Record<string, string> = {
  portfolio: "https://ethyne2666-2nd-year-profile-website-iqgppet64.vercel.app/",
  smarttax: "https://smart-tax-management.vercel.app/",
  dealdrop: "https://price-tracker-dealdrop.vercel.app/",
  wechat: "https://we-chat-seven.vercel.app/login",
};

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Line {
  text: string;
  type: "output" | "input" | "error" | "system";
}

// ─── Component ─────────────────────────────────────────────────────────────────
interface TerminalProps {
  onClose: () => void;
}

const BOOT_LINES = [
  "  Initializing CHARAN-OS v2.0.0...",
  "  Loading modules... [████████████████████] 100%",
  "  System ready.",
  "",
  '  Type  help  to see all available commands.',
  "",
];

const Terminal = ({ onClose }: TerminalProps) => {
  const [lines, setLines] = useState<Line[]>(
    BOOT_LINES.map((t) => ({ text: t, type: "system" }))
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booting, setBooting] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // auto-focus
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
      setBooting(false);
    }, 400);
  }, []);

  // scroll to bottom whenever lines change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const pushLines = (newLines: string[], type: Line["type"] = "output") => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((t) => ({ text: t, type })),
    ]);
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // echo input
    setLines((prev) => [
      ...prev,
      { text: `  guest@charan:~$ ${trimmed}`, type: "input" },
    ]);

    // history
    setHistory((h) => [trimmed, ...h].slice(0, 50));
    setHistIdx(-1);

    const parts = trimmed.toLowerCase().split(/\s+/);
    const cmd = parts[0];

    // demo command
    if (cmd === "demo") {
      const name = parts[1];
      if (!name) {
        pushLines(
          [
            "",
            "  Usage: demo <project>",
            "  Projects: portfolio, smarttax, dealdrop, wechat",
            "",
          ],
          "error"
        );
        return;
      }
      const url = DEMO_LINKS[name];
      if (url) {
        window.open(url, "_blank");
        pushLines([`  → Opening demo for '${name}'...`, ""], "output");
      } else {
        pushLines(
          [
            `  Error: no demo found for '${name}'`,
            "  Available: " + Object.keys(DEMO_LINKS).join(", "),
            "",
          ],
          "error"
        );
      }
      return;
    }

    const fn = COMMANDS[cmd];
    if (!fn) {
      pushLines(
        [
          `  command not found: ${cmd}`,
          "  Type  help  to see all available commands.",
          "",
        ],
        "error"
      );
      return;
    }

    const result = fn();

    if (result === "__CLEAR__") {
      setLines([]);
      return;
    }
    if (result === "__EXIT__") {
      onClose();
      return;
    }

    const resultLines = Array.isArray(result) ? result : [result];
    pushLines(resultLines, "output");
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    // backdrop
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Terminal window */}
      <div
        className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          background: "#0d0d0d",
          border: "1px solid #1a1a1a",
          boxShadow: "0 0 60px rgba(0,255,65,0.12), 0 0 0 1px #0f2010",
          height: "min(80vh, 640px)",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-3 select-none"
          style={{
            background: "#111",
            borderBottom: "1px solid #1e1e1e",
          }}
        >
          {/* Traffic lights */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full transition-opacity hover:opacity-80"
              style={{ background: "#ff5f57" }}
              title="Close"
            />
            <div className="w-3.5 h-3.5 rounded-full" style={{ background: "#ffbd2e" }} />
            <div className="w-3.5 h-3.5 rounded-full" style={{ background: "#28ca41" }} />
          </div>

          <span className="text-xs" style={{ color: "#3a3a3a", letterSpacing: "0.15em" }}>
            CHARAN-OS — bash
          </span>

          <button
            onClick={onClose}
            className="text-xs px-2 py-0.5 rounded transition-colors hover:bg-white/10"
            style={{ color: "#555" }}
          >
            ESC
          </button>
        </div>

        {/* Output area */}
        <div
          className="flex-1 overflow-y-auto px-2 py-4 text-sm leading-relaxed"
          style={{ color: "#00ff41" }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className="whitespace-pre"
              style={{
                color:
                  line.type === "input"
                    ? "#7fffb0"
                    : line.type === "error"
                    ? "#ff4d4d"
                    : line.type === "system"
                    ? "#00aa2a"
                    : "#00ff41",
                opacity: line.type === "system" ? 0.7 : 1,
              }}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderTop: "1px solid #1a1a1a", background: "#0d0d0d" }}
        >
          <span className="text-sm select-none" style={{ color: "#00aa2a", flexShrink: 0 }}>
            guest@charan:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={booting}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent outline-none text-sm caret-green-400"
            style={{
              color: "#7fffb0",
              caretColor: "#00ff41",
            }}
            placeholder={booting ? "" : "type a command…"}
          />
          {/* blinking cursor shown when not typing */}
        </div>
      </div>
    </div>
  );
};

export default Terminal;