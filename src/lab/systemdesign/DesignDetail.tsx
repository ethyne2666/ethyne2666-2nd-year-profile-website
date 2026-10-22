import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Info, Pause, Play, X } from "lucide-react";
import type { Design } from "./designs";
import FlowDiagram from "./FlowDiagram";
import { Base62Visual, RingVisual, SnowflakeVisual, TokenBucketVisual } from "./visuals";

const VISUALS = {
  base62: Base62Visual,
  tokenBucket: TokenBucketVisual,
  ring: RingVisual,
  snowflake: SnowflakeVisual,
} as const;

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4 }}
    className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6"
  >
    <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-neutral-500">{label}</p>
    {children}
  </motion.section>
);

const DesignDetail = ({ design, onBack }: { design: Design; onBack: () => void }) => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const total = design.steps.length;
  const Visual = design.visual ? VISUALS[design.visual] : null;
  const isRealWorld = design.chapter === undefined;

  useEffect(() => { window.scrollTo({ top: 0 }); }, [design.slug]);

  // auto-advance; longer paths get more time. Depending on `step` restarts the timer after a manual click.
  useEffect(() => {
    if (!playing) return;
    const ms = Math.max(4800, (design.steps[step].path.length - 1) * 750 + 2200);
    const t = setTimeout(() => setStep((s) => (s + 1) % total), ms);
    return () => clearTimeout(t);
  }, [playing, step, total, design]);

  const go = (i: number) => setStep((i + total) % total);

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 font-mono text-xs text-neutral-600 transition hover:text-neutral-950"
      >
        <ArrowLeft size={14} /> all designs
      </button>

      {/* header */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-neutral-950 px-3 py-1 font-mono text-[11px] font-semibold text-white">
            {isRealWorld ? "real-world system" : `chapter ${design.chapter}`}
          </span>
          {design.tags.map((t) => (
            <span key={t} className="rounded-full border border-neutral-200 px-3 py-1 font-mono text-[11px] text-neutral-600">{t}</span>
          ))}
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{design.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">{design.tagline}</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-3">
          {design.requirements.map((r) => (
            <li key={r} className="flex gap-2 rounded-xl bg-neutral-50 p-3 text-xs leading-5 text-neutral-700">
              <Check size={14} className="mt-0.5 shrink-0 text-neutral-950" /> {r}
            </li>
          ))}
        </ul>
        {isRealWorld && (
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-neutral-500">
            <Info size={14} className="mt-0.5 shrink-0" />
            A simplified view built from public talks and common design patterns. The real internals are far bigger and differ in detail.
          </p>
        )}
      </div>

      {/* animated flow */}
      <Section label="how it works, step by step">
        <FlowDiagram nodes={design.nodes} steps={design.steps} step={step} slug={design.slug} />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {design.steps.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Step ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all ${i === step ? "w-7 bg-neutral-950" : "w-2.5 bg-neutral-300 hover:bg-neutral-500"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Previous step" onClick={() => go(step - 1)} className="rounded-lg border border-neutral-300 p-2 hover:border-neutral-950"><ChevronLeft size={16} /></button>
            <button type="button" onClick={() => setPlaying((p) => !p)} className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-neutral-800">
              {playing ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Play</>}
            </button>
            <button type="button" aria-label="Next step" onClick={() => go(step + 1)} className="rounded-lg border border-neutral-300 p-2 hover:border-neutral-950"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="mt-4 min-h-[120px] rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <AnimatePresence mode="wait">
            <motion.div key={`${design.slug}-${step}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">step {step + 1} of {total}</p>
              <h3 className="mt-1 text-lg font-bold tracking-tight">{design.steps[step].title}</h3>
              <p className="mt-1 text-sm leading-6 text-neutral-600">{design.steps[step].text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      {Visual && (
        <Section label="try it yourself">
          <Visual />
        </Section>
      )}

      <Section label="key ideas">
        <div className="grid gap-3 sm:grid-cols-2">
          {design.ideas.map((idea, i) => (
            <div key={idea.title} className="rounded-xl border border-neutral-200 p-4">
              <span className="font-mono text-xs font-bold text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="mt-1 font-bold tracking-tight">{idea.title}</h4>
              <p className="mt-1 text-sm leading-6 text-neutral-600">{idea.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="trade-offs">
        <div className="grid gap-4 sm:grid-cols-2">
          <ul className="space-y-2">
            {design.good.map((g) => (
              <li key={g} className="flex gap-2 text-sm leading-6 text-neutral-700"><Check size={16} className="mt-1 shrink-0 text-neutral-950" /> {g}</li>
            ))}
          </ul>
          <ul className="space-y-2">
            {design.bad.map((b) => (
              <li key={b} className="flex gap-2 text-sm leading-6 text-neutral-700"><X size={16} className="mt-1 shrink-0 text-neutral-400" /> {b}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section label={isRealWorld ? "tech at a glance" : "numbers worth remembering"}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {design.numbers.map((nm) => (
            <div key={nm.label + nm.value} className="rounded-xl bg-neutral-950 p-4 text-white">
              <p className="break-words text-lg font-bold sm:text-xl">{nm.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-neutral-400">{nm.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {!isRealWorld && (
        <p className="px-1 text-center text-xs leading-5 text-neutral-500">
          Concepts follow the chapters of{" "}
          <a className="underline underline-offset-2 hover:text-neutral-950" href="https://github.com/liquidslr/system-design-notes" target="_blank" rel="noreferrer">
            liquidslr/system-design-notes
          </a>
          , rewritten and animated in my own words.
        </p>
      )}
    </div>
  );
};

export default DesignDetail;