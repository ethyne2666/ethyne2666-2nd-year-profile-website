import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, Search } from "lucide-react";
import { DESIGNS, type Design } from "./designs";
import { REAL_WORLD } from "./realWorld";
import DesignDetail from "./DesignDetail";

const ALL = [...REAL_WORLD, ...DESIGNS];

const matches = (d: Design, q: string) =>
  !q || `${d.title} ${d.tagline} ${d.tags.join(" ")}`.toLowerCase().includes(q);

const Card = ({ d, i, onOpen }: { d: Design; i: number; onOpen: () => void }) => (
  <motion.button
    type="button"
    onClick={onOpen}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.04 }}
    whileHover={{ y: -4 }}
    className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 text-left transition-colors hover:border-neutral-950"
  >
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs font-bold text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
      <ArrowUpRight size={18} className="text-neutral-400 transition group-hover:text-neutral-950" />
    </div>
    <h3 className="mt-3 text-xl font-bold tracking-tight">{d.title}</h3>
    <p className="mt-1 flex-1 text-sm leading-6 text-neutral-600">{d.tagline}</p>
    <div className="mt-4 flex flex-wrap items-center gap-1.5">
      {d.tags.map((t) => (
        <span key={t} className="rounded-full border border-neutral-200 px-2.5 py-1 font-mono text-[10px] text-neutral-600">{t}</span>
      ))}
      {d.visual && <span className="rounded-full bg-neutral-950 px-2.5 py-1 font-mono text-[10px] text-white">interactive</span>}
    </div>
    <p className="mt-3 border-t border-neutral-100 pt-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
      {d.nodes.length} components · {d.steps.length} steps
    </p>
  </motion.button>
);

const Heading = ({ title, text }: { title: string; text: string }) => (
  <div className="mb-5">
    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-600">{text}</p>
    <div className="mt-4 h-px w-full bg-neutral-200" />
  </div>
);

const SystemDesignSection = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const open = ALL.find((d) => d.slug === params.get("design")) ?? null;

  const q = query.trim().toLowerCase();
  const real = useMemo(() => REAL_WORLD.filter((d) => matches(d, q)), [q]);
  const concepts = useMemo(() => DESIGNS.filter((d) => matches(d, q)), [q]);

  // the open design lives in the URL (?design=youtube), so it can be shared and the back button works
  if (open) {
    return <DesignDetail design={open} onBack={() => setParams({})} />;
  }

  return (
    <div>
      <div className="mx-auto mb-10 flex max-w-md items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5">
        <Search size={15} className="text-neutral-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search: uber, cache, queue…"
          aria-label="Search system designs"
          className="w-full bg-transparent font-mono text-xs outline-none placeholder:text-neutral-400"
        />
      </div>

      {real.length > 0 && (
        <section className="mb-14">
          <Heading
            title="Real-world systems"
            text="How products you use every day are put together. Click one to watch a request travel through it."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {real.map((d, i) => (
              <Card key={d.slug} d={d} i={i} onOpen={() => setParams({ design: d.slug })} />
            ))}
          </div>
        </section>
      )}

      {concepts.length > 0 && (
        <section>
          <Heading
            title="Core concepts"
            text="The building blocks behind those products: rate limiting, hashing, queues, caches and more."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {concepts.map((d, i) => (
              <Card key={d.slug} d={d} i={i} onOpen={() => setParams({ design: d.slug })} />
            ))}
          </div>
        </section>
      )}

      {real.length + concepts.length === 0 && (
        <p className="py-12 text-center font-mono text-xs text-neutral-500">No design matches that search.</p>
      )}
    </div>
  );
};

export default SystemDesignSection;