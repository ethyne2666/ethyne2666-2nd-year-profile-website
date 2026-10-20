import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, KeyRound, Network } from "lucide-react";
import JwtPlayground from "./jwt/JwtPlayground";

const TABS = [
  { id: "jwt", label: "JWT Auth", icon: KeyRound },
  { id: "design", label: "System Design", icon: Network },
] as const;

type TabId = (typeof TABS)[number]["id"];

const UPCOMING = [
  { title: "URL Shortener", text: "Paste a long link, watch the short code get generated and stored." },
  { title: "Notification System", text: "Follow one notification through queue, workers and channels." },
];

const PlaygroundPage = () => {
  const [tab, setTab] = useState<TabId>("jwt");

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-neutral-950">
      {/* soft blobs, same family as the hero */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -right-24 top-96 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-neutral-600 transition hover:text-neutral-950"
        >
          <ArrowLeft size={14} /> back to portfolio
        </Link>

        <header className="mb-8 mt-8 text-center sm:mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">playground</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Poke the backend</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base">
            Real requests to my Spring Boot API. Click through, break things, and read the raw request and response.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-neutral-950" />
        </header>

        <div className="mb-6 flex justify-center">
          <div role="tablist" className="inline-flex rounded-full border border-neutral-200 bg-white p-1 shadow-sm">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold transition sm:px-5 ${
                  tab === id ? "bg-neutral-950 text-white" : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        </div>

        {tab === "jwt" ? (
          <JwtPlayground />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {UPCOMING.map((u) => (
              <div key={u.title} className="rounded-2xl border border-dashed border-neutral-300 bg-white/70 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">coming next</p>
                <h3 className="mt-2 text-lg font-bold tracking-tight">{u.title}</h3>
                <p className="mt-1 text-sm leading-6 text-neutral-600">{u.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default PlaygroundPage;