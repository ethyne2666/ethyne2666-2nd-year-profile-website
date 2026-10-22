import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Send, Zap } from "lucide-react";

const Btn = ({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 py-2.5 font-mono text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
  >
    {children}
  </button>
);

const GhostBtn = (p: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) => (
  <button
    type="button"
    onClick={p.onClick}
    disabled={p.disabled}
    className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-mono text-xs font-semibold text-neutral-800 transition hover:border-neutral-950 disabled:cursor-not-allowed disabled:opacity-40"
  >
    {p.children}
  </button>
);

/* ═════════════ 1. URL SHORTENER: base 62 ═════════════ */

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const toBase62 = (num: number) => {
  if (num === 0) return "0";
  let s = "";
  while (num > 0) {
    s = ALPHABET[num % 62] + s;
    num = Math.floor(num / 62);
  }
  return s;
};

export const Base62Visual = () => {
  const [url, setUrl] = useState("https://example.com/blog/a-very-long-article-title?utm_source=newsletter");
  const [nextId, setNextId] = useState(2009215674938);
  const [rows, setRows] = useState<{ id: number; short: string; long: string }[]>([]);
  const [hit, setHit] = useState<string | null>(null);

  const shorten = () => {
    if (!url.trim()) return;
    setRows((r) => [{ id: nextId, short: toBase62(nextId), long: url.trim() }, ...r].slice(0, 5));
    setNextId((n) => n + 1);
    setHit(null);
  };

  const latest = rows[0];
  // long division steps for the newest ID, newest remainder first
  const steps: { n: number; r: number }[] = [];
  if (latest) {
    let n = latest.id;
    while (n > 0) { steps.push({ n, r: n % 62 }); n = Math.floor(n / 62); }
  }

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="long-url" className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-neutral-500">long url</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2.5 font-mono text-xs outline-none focus:border-neutral-950"
          />
          <Btn onClick={shorten}><Zap size={14} /> Shorten</Btn>
        </div>
        <p className="mt-2 font-mono text-[11px] text-neutral-500">Next unique ID from the generator: {nextId}</p>
      </div>

      {latest && (
        <motion.div key={latest.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl bg-neutral-950 p-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">divide by 62, keep the remainders</p>
            <div className="space-y-1 font-mono text-xs">
              {steps.map((s, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className="text-neutral-300">
                  {s.n} mod 62 = <span className="text-neutral-400">{s.r}</span> → <span className="font-bold text-white">{ALPHABET[s.r]}</span>
                </motion.p>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-xl border border-neutral-200 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">read remainders bottom to top</p>
            <p className="mt-2 break-all font-mono text-2xl font-bold text-neutral-950">short.ly/{latest.short}</p>
            <p className="mt-1 text-xs text-neutral-500">{latest.short.length} characters for a {String(latest.id).length}-digit number</p>
          </div>
        </motion.div>
      )}

      {rows.length > 0 && (
        <div data-lenis-prevent className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full min-w-[480px] text-left font-mono text-xs">
            <thead className="bg-neutral-50 text-neutral-500">
              <tr><th className="p-2.5">id</th><th className="p-2.5">short</th><th className="p-2.5">long</th><th className="p-2.5" /></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-neutral-100">
                  <td className="p-2.5 text-neutral-600">{r.id}</td>
                  <td className="p-2.5 font-bold text-neutral-950">{r.short}</td>
                  <td className="max-w-[220px] truncate p-2.5 text-neutral-600">{r.long}</td>
                  <td className="p-2.5 text-right">
                    <button className="underline underline-offset-2 hover:text-neutral-950" onClick={() => setHit(r.short)}>visit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {hit && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-lg bg-neutral-950 p-3 font-mono text-xs leading-6 text-neutral-300">
            <span className="text-neutral-400">GET</span> /{hit} → <span className="font-bold text-white">302 Found</span>
            <br />Location: {rows.find((r) => r.short === hit)?.long}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═════════════ 2. RATE LIMITER: token bucket ═════════════ */

const CAPACITY = 5;

export const TokenBucketVisual = () => {
  const [tokens, setTokens] = useState(CAPACITY);
  const tokensRef = useRef(CAPACITY);
  const [log, setLog] = useState<{ id: number; ok: boolean }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const t = setInterval(() => {
      if (tokensRef.current < CAPACITY) {
        tokensRef.current += 1;
        setTokens(tokensRef.current);
      }
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fire = (count: number) => {
    const out: { id: number; ok: boolean }[] = [];
    for (let i = 0; i < count; i++) {
      const ok = tokensRef.current > 0;
      if (ok) tokensRef.current -= 1;
      out.unshift({ id: ++idRef.current, ok });
    }
    setTokens(tokensRef.current);
    setLog((l) => [...out, ...l].slice(0, 8));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-neutral-500">
          bucket · {tokens}/{CAPACITY} tokens · refills +1 per second
        </p>
        <div className="flex items-end justify-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
          {Array.from({ length: CAPACITY }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: i < tokens ? 1 : 0.6, opacity: i < tokens ? 1 : 0.25 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className={`h-10 w-10 rounded-full border-2 sm:h-12 sm:w-12 ${i < tokens ? "border-neutral-950 bg-neutral-950" : "border-neutral-300 bg-neutral-100"}`}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn onClick={() => fire(1)}><Send size={14} /> Send request</Btn>
          <GhostBtn onClick={() => fire(5)}>Burst × 5</GhostBtn>
        </div>
        <p className="mt-3 text-xs leading-5 text-neutral-500">Each request spends one token. Empty bucket means 429. Wait a few seconds and tokens come back, so bursts are allowed but sustained floods are not.</p>
      </div>

      <div className="rounded-2xl bg-neutral-950 p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">server log</p>
        {log.length === 0 && <p className="font-mono text-xs text-neutral-600">no requests yet</p>}
        <div className="space-y-1.5">
          <AnimatePresence initial={false}>
            {log.map((l) => (
              <motion.p key={l.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="font-mono text-xs">
                <span className="text-neutral-500">GET /api/data → </span>
                {l.ok ? <span className="text-white">✓ 200 OK</span> : <span className="text-neutral-400 line-through">✕ 429 Too Many Requests</span>}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ═════════════ 3. CONSISTENT HASHING: ring ═════════════ */

// murmur-style mixer: stable, well spread position in [0, 1)
const pos = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
};

const SERVERS = ["A", "B", "C", "D", "E"];
const KEYS = Array.from({ length: 24 }, (_, i) => `key-${i}`);
const R = 105;
const C = 140;

const points = (count: number, vnodes: boolean) =>
  SERVERS.slice(0, count).flatMap((name, si) =>
    Array.from({ length: vnodes ? 3 : 1 }, (_, v) => ({ name, si, p: pos(`${name}#${v}`) }))
  ).sort((a, b) => a.p - b.p);

const ownerOf = (key: string, pts: ReturnType<typeof points>) => (pts.find((x) => x.p >= pos(key)) ?? pts[0]).si;
const owners = (count: number, vnodes: boolean) => { const pts = points(count, vnodes); return KEYS.map((k) => ownerOf(k, pts)); };
const modOwners = (count: number) => KEYS.map((k) => Math.floor(pos(k) * 4294967296) % count);
const xy = (p: number, r = R) => ({ x: C + r * Math.cos(p * 2 * Math.PI - Math.PI / 2), y: C + r * Math.sin(p * 2 * Math.PI - Math.PI / 2) });

export const RingVisual = () => {
  const [count, setCount] = useState(3);
  const [vnodes, setVnodes] = useState(false);
  const [moved, setMoved] = useState<{ ring: number; mod: number } | null>(null);

  const change = (nextCount: number, nextV: boolean) => {
    const a = owners(count, vnodes), b = owners(nextCount, nextV);
    const ma = modOwners(count), mb = modOwners(nextCount);
    setMoved({ ring: a.filter((o, i) => o !== b[i]).length, mod: ma.filter((o, i) => o !== mb[i]).length });
    setCount(nextCount);
    setVnodes(nextV);
  };

  const pts = points(count, vnodes);
  const own = owners(count, vnodes);

  return (
    <div className="grid items-center gap-6 md:grid-cols-[300px_1fr]">
      <svg viewBox="0 0 280 280" className="mx-auto w-full max-w-[300px]">
        <circle cx={C} cy={C} r={R} fill="none" stroke="#e5e5e5" strokeWidth={2} />
        {KEYS.map((k, i) => {
          const dot = xy(pos(k), R);
          const tag = xy(pos(k), R - 14);
          return (
            <g key={k}>
              <circle cx={dot.x} cy={dot.y} r={4} fill="#0a0a0a" />
              <text x={tag.x} y={tag.y + 3} textAnchor="middle" fontSize={8} fontWeight={700} fill="#737373">{SERVERS[own[i]]}</text>
            </g>
          );
        })}
        {pts.map((s, i) => {
          const { x, y } = xy(s.p, R + 22);
          return (
            <g key={`${s.name}${i}`}>
              <circle cx={x} cy={y} r={11} fill="#0a0a0a" />
              <text x={x} y={y + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">{s.name}</text>
            </g>
          );
        })}
        <text x={C} y={C - 2} textAnchor="middle" fontSize={11} fill="#737373">hash ring</text>
        <text x={C} y={C + 14} textAnchor="middle" fontSize={10} fill="#a3a3a3">dots = keys, letter = owner</text>
      </svg>

      <div>
        <div className="flex flex-wrap gap-2">
          <Btn onClick={() => change(count + 1, vnodes)} disabled={count >= 5}><Plus size={14} /> Add server</Btn>
          <GhostBtn onClick={() => change(count - 1, vnodes)} disabled={count <= 2}><Minus size={14} /> Remove server</GhostBtn>
          <GhostBtn onClick={() => change(count, !vnodes)}>{vnodes ? "Virtual nodes: on" : "Virtual nodes: off"}</GhostBtn>
        </div>
        <p className="mt-3 text-xs leading-5 text-neutral-500">Every key belongs to the first server clockwise from it. The letter beside each dot shows its owner.</p>
        {moved && (
          <motion.div key={`${count}-${vnodes}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-neutral-950 bg-neutral-950 p-3 text-white">
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">consistent hashing</p>
              <p className="mt-1 text-2xl font-bold">{moved.ring}<span className="text-sm font-medium text-neutral-500"> / {KEYS.length} keys moved</span></p>
            </div>
            <div className="rounded-xl border border-neutral-300 bg-white p-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">hash % N</p>
              <p className="mt-1 text-2xl font-bold">{moved.mod}<span className="text-sm font-medium text-neutral-500"> / {KEYS.length} keys moved</span></p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ═════════════ 4. UNIQUE ID: Snowflake ═════════════ */

const EPOCH = Date.UTC(2024, 0, 1);
const bin = (n: bigint, bits: number) => n.toString(2).padStart(bits, "0");

interface Flake { id: bigint; ts: number; dc: number; m: number; seq: number }

export const SnowflakeVisual = () => {
  const [dc, setDc] = useState(1);
  const [machine, setMachine] = useState(1);
  const [ids, setIds] = useState<Flake[]>([]);
  const last = useRef({ ts: -1, seq: 0 });

  const generate = (count: number) => {
    const out: Flake[] = [];
    for (let i = 0; i < count; i++) {
      const ts = Date.now() - EPOCH;
      last.current = ts === last.current.ts ? { ts, seq: (last.current.seq + 1) & 4095 } : { ts, seq: 0 };
      const seq = last.current.seq;
      const id = (BigInt(ts) << BigInt(22)) | (BigInt(dc) << BigInt(17)) | (BigInt(machine) << BigInt(12)) | BigInt(seq);
      out.unshift({ id, ts, dc, m: machine, seq });
    }
    setIds((p) => [...out, ...p].slice(0, 6));
  };

  const f = ids[0];
  const part = (label: string, bits: string, cls: string, note: string) => (
    <div className="min-w-0">
      <p className={`break-all rounded-md px-1.5 py-1 font-mono text-[10px] leading-4 sm:text-xs ${cls}`}>{bits}</p>
      <p className="mt-1 font-mono text-[10px] text-neutral-500">{label}</p>
      <p className="font-mono text-[10px] font-semibold text-neutral-800">{note}</p>
    </div>
  );

  const num = (label: string, v: number, set: (n: number) => void) => (
    <label className="flex items-center gap-2 font-mono text-xs text-neutral-600">
      {label}
      <input
        type="number" min={0} max={31} value={v}
        onChange={(e) => set(Math.max(0, Math.min(31, Number(e.target.value) || 0)))}
        className="w-16 rounded-lg border border-neutral-300 px-2 py-1.5 outline-none focus:border-neutral-950"
      />
    </label>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        {num("datacenter", dc, setDc)}
        {num("machine", machine, setMachine)}
        <Btn onClick={() => generate(1)}><Zap size={14} /> Generate ID</Btn>
        <GhostBtn onClick={() => generate(5)}>5 at once</GhostBtn>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 sm:grid-cols-[auto_minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.5fr)]">
          {part("sign", "0", "bg-neutral-200 text-neutral-700", "1 bit")}
          {part("timestamp", f ? bin(BigInt(f.ts), 41) : "0".repeat(41), "bg-neutral-950 text-white", f ? `${f.ts} ms` : "41 bits")}
          {part("datacenter", f ? bin(BigInt(f.dc), 5) : "00000", "bg-neutral-700 text-white", f ? `#${f.dc}` : "5 bits")}
          {part("machine", f ? bin(BigInt(f.m), 5) : "00000", "bg-neutral-400 text-neutral-950", f ? `#${f.m}` : "5 bits")}
          {part("sequence", f ? bin(BigInt(f.seq), 12) : "0".repeat(12), "border border-neutral-950 bg-white text-neutral-950", f ? `${f.seq}` : "12 bits")}
        </div>
        <p className="mt-4 break-all font-mono text-lg font-bold sm:text-2xl">{f ? f.id.toString() : "press Generate ID"}</p>
      </div>

      {ids.length > 1 && (
        <div className="rounded-xl bg-neutral-950 p-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">recent ids, newest first, always growing</p>
          <div className="space-y-1">
            {ids.map((x, i) => (
              <p key={x.id.toString()} className="break-all font-mono text-xs text-neutral-300">
                <span className="text-white">{x.id.toString()}</span>
                <span className="text-neutral-600"> · seq {x.seq}</span>
                {i === 0 && <span className="text-neutral-400"> ← latest</span>}
              </p>
            ))}
          </div>
        </div>
      )}
      <p className="text-xs leading-5 text-neutral-500">Press "5 at once": they land in the same millisecond, so only the sequence bits change. That is how one machine makes up to 4,096 unique IDs per millisecond.</p>
    </div>
  );
};