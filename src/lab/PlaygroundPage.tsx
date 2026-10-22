import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, KeyRound, Network } from "lucide-react";
import JwtPlayground from "./jwt/JwtPlayground";
import SystemDesignSection from "./systemdesign/SystemDesignSection";

const TABS = [
  { id: "jwt", label: "JWT Auth", icon: KeyRound },
  { id: "design", label: "System Design", icon: Network },
] as const;

type TabId = (typeof TABS)[number]["id"];

const PlaygroundPage = () => {
  const [params, setParams] = useSearchParams();

  // opening a shared link like /playground?design=url-shortener lands straight on the System Design tab
  const [tab, setTab] = useState<TabId>(params.get("design") ? "design" : "jwt");

  const changeTab = (id: TabId) => {
    // leaving System Design: drop the open design from the URL so it doesn't reappear later
    if (id === "jwt" && params.get("design")) setParams({});
    setTab(id);
  };

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
            Real requests to my Spring Boot API, plus interactive system design walkthroughs. Click through, break things, and read the raw request and response.
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
                onClick={() => changeTab(id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-semibold transition sm:px-5 ${
                  tab === id ? "bg-neutral-950 text-white" : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        </div>

        {tab === "jwt" ? <JwtPlayground /> : <SystemDesignSection />}
      </div>
    </main>
  );
};

export default PlaygroundPage;