import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  Menu,
  X,
} from "lucide-react";
import { navItems } from "../lib/navItems";
import Terminal from "./Terminal";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [termOpen, setTermOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setTermOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || termOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, termOpen]);

  const handleNavigation = (href: string) => {
    setOpen(false);

    if (href === "/playground") {
      window.location.href = href;
      return;
    }

    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.href = href;
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/90 text-neutral-950 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setOpen(false);
            }}
            className="flex flex-shrink-0 items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-950 text-white">
              <Code2 className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold tracking-[0.08em]">
              CHARAN
            </span>
          </a>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-2 lg:flex"
          >
            {navItems.map((item) => (
              <div key={item.id} className="group relative">
                <button
                  type="button"
                  onClick={() => handleNavigation(item.href)}
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                >
                  {item.label}
                </button>

                {item.children && item.children.length > 0 && (
                  <div className="invisible absolute left-0 top-full z-20 min-w-48 translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                      {item.children.map((child) => (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() => handleNavigation(child.href)}
                          className="block w-full rounded-lg px-3 py-2 text-left text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Playground entry */}
            <a
              href="/playground"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-950 bg-neutral-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-neutral-950"
            >
              <Code2 className="h-4 w-4" />
              Playground
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {/* Terminal */}
            <button
              type="button"
              onClick={() => setTermOpen(true)}
              title="Open terminal"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 font-mono text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
            >
              &gt;_
              <span className="ml-2 hidden xl:inline">Terminal</span>
            </button>
          </nav>

          {/* Compact actions for tablet and mobile */}
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <a
              href="/playground"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-950 bg-neutral-950 px-3 py-2 text-xs font-medium text-white transition hover:bg-white hover:text-neutral-950 sm:text-sm"
            >
              <Code2 className="h-4 w-4" />
              <span>Playground</span>
            </a>

            <button
              type="button"
              onClick={() => setTermOpen(true)}
              aria-label="Open terminal"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 bg-white font-mono text-sm text-neutral-800 transition hover:border-neutral-950"
            >
              &gt;_
            </button>

            <button
              type="button"
              onClick={() => setOpen((previous) => !previous)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-900 transition hover:border-neutral-950"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Mobile menu panel */}
      <aside
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`fixed right-0 top-16 z-50 h-[calc(100dvh-4rem)] w-full max-w-sm overflow-y-auto border-l border-neutral-200 bg-white p-5 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="mb-5 border-b border-neutral-200 pb-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Navigation
          </p>
          <p className="mt-1 text-sm text-neutral-700">
            Explore the portfolio
          </p>
        </div>

        <nav className="space-y-3">
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => handleNavigation(item.href)}
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-left text-base font-medium text-neutral-900 transition hover:border-neutral-950 hover:bg-neutral-50"
              >
                {item.label}
              </button>

              {item.children && item.children.length > 0 && (
                <div className="ml-4 mt-2 space-y-2 border-l border-neutral-200 pl-3">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => handleNavigation(child.href)}
                      className="block w-full py-1.5 text-left text-sm text-neutral-600 transition hover:text-neutral-950"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a
            href="/playground"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-xl border border-neutral-950 bg-neutral-950 px-4 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-neutral-950"
          >
            <span className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Playground
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setTermOpen(true);
            }}
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-left font-mono text-sm text-neutral-800 transition hover:border-neutral-950 hover:bg-neutral-50"
          >
            &gt;_ Open Terminal
          </button>
        </nav>

        <div className="mt-8 border-t border-neutral-200 pt-4">
          <p className="text-xs leading-5 text-neutral-500">
            System design, API experiments, and interactive backend tools live
            in the Playground.
          </p>
        </div>
      </aside>

      {/* Existing terminal overlay */}
      {termOpen && <Terminal onClose={() => setTermOpen(false)} />}
    </>
  );
};

export default Navbar;