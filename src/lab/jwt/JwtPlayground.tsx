import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Clock,
  KeyRound,
  Loader2,
  LockKeyhole,
  Monitor,
  RotateCcw,
  Server,
  ShieldAlert,
  Terminal as TerminalIcon,
} from "lucide-react";
import { newId, send, type Exchange, type RequestSpec } from "../lib/api";
import { decodePart, shorten, splitToken, tamperToken } from "../lib/jwt";

const BASE = "/api/lab/jwt";

/* ───────────────────────── small UI pieces ───────────────────────── */

const STATUS_TEXT: Record<number, string> = {
  200: "OK",
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  405: "Method Not Allowed",
  500: "Server Error",
};

const statusTone = (s?: number) =>
  !s ? "bg-neutral-700 text-neutral-200"
  : s < 300 ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40"
  : s < 500 ? "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/40"
  : "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/40";

// Colours JSON the way Postman does. Dark background, so the tones are light.
const JsonView = ({ value }: { value: unknown }) => {
  const text = JSON.stringify(value, null, 2) ?? "";
  const parts = text.split(
    /("(?:\\.|[^"\\])*"(?:\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g
  );
  return (
    <pre className="whitespace-pre-wrap break-all font-mono text-xs leading-relaxed text-neutral-300">
      {parts.map((p, i) => {
        if (!p) return null;
        if (p.startsWith('"') && p.endsWith(":")) return <span key={i} className="text-sky-300">{p}</span>;
        if (p.startsWith('"')) return <span key={i} className="text-emerald-300">{p}</span>;
        if (/^(true|false|null)$/.test(p)) return <span key={i} className="text-amber-300">{p}</span>;
        if (/^-?\d/.test(p)) return <span key={i} className="text-violet-300">{p}</span>;
        return <span key={i}>{p}</span>;
      })}
    </pre>
  );
};

const StepCard = ({
  n, title, hint, locked, children,
}: { n: number; title: string; hint: string; locked?: boolean; children: React.ReactNode }) => (
  <motion.section
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4 }}
    className={`rounded-2xl border bg-white p-5 shadow-[0_16px_50px_-38px_rgba(0,0,0,0.35)] transition-opacity sm:p-6 ${
      locked ? "border-neutral-200 opacity-60" : "border-neutral-200"
    }`}
  >
    <div className="mb-4 flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-950 font-mono text-xs font-bold text-white">
        {n}
      </span>
      <div className="min-w-0">
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        <p className="text-sm leading-6 text-neutral-600">{hint}</p>
      </div>
    </div>
    {children}
  </motion.section>
);

const Btn = ({
  children, onClick, disabled, variant = "solid",
}: { children: React.ReactNode; onClick: () => void; disabled?: boolean; variant?: "solid" | "ghost" }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-mono text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
      variant === "solid"
        ? "bg-neutral-950 text-white hover:bg-neutral-800"
        : "border border-neutral-300 bg-white text-neutral-800 hover:border-neutral-950"
    }`}
  >
    {children}
  </button>
);

const Chip = ({
  active, onClick, disabled, children,
}: { active: boolean; onClick: () => void; disabled?: boolean; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`rounded-full border px-3 py-1.5 font-mono text-xs transition disabled:cursor-not-allowed disabled:opacity-40 ${
      active
        ? "border-neutral-950 bg-neutral-950 text-white"
        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-950"
    }`}
  >
    {children}
  </button>
);

/* The little Browser ── • ──► Server animation at the top of the console */
const Wire = ({ state, tick }: { state: "idle" | "loading" | "ok" | "error"; tick: number }) => (
  <div className="flex items-center gap-2 sm:gap-3">
    <div className="flex flex-col items-center gap-1 text-neutral-400">
      <Monitor size={18} />
      <span className="font-mono text-[10px]">Browser</span>
    </div>
    <div className="relative h-6 flex-1">
      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-neutral-700" />
      {state === "loading" && (
        <motion.span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]"
          initial={{ left: "0%" }}
          animate={{ left: ["0%", "96%", "0%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {(state === "ok" || state === "error") && (
        <motion.span
          key={tick}
          className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${
            state === "ok" ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" : "bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.9)]"
          }`}
          initial={{ left: "96%" }}
          animate={{ left: "0%" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      )}
    </div>
    <div className="flex flex-col items-center gap-1 text-neutral-400">
      <Server size={18} />
      <span className="font-mono text-[10px]">Spring Boot</span>
    </div>
  </div>
);

/* ───────────────────────── request / response console ───────────────────────── */

const Console = ({
  current, history, slow, onPick,
}: { current: Exchange | null; history: Exchange[]; slow: boolean; onPick: (e: Exchange) => void }) => {
  const state = !current ? "idle" : current.pending ? "loading" : current.status && current.status < 300 ? "ok" : "error";
  const headers = current?.shownHeaders ?? current?.headers ?? {};

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-white shadow-[0_22px_60px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400">
          <TerminalIcon size={12} /> request console
        </span>
      </div>

      <div className="border-b border-neutral-800 px-4 py-4">
        <Wire state={state} tick={current?.id ?? 0} />
      </div>

      {!current ? (
        <p className="px-4 py-10 text-center font-mono text-xs leading-6 text-neutral-500">
          Run a step on the left.
          <br />
          The exact request and the server&apos;s response show up here.
        </p>
      ) : (
        <div data-lenis-prevent className="max-h-[560px] space-y-5 overflow-y-auto px-4 py-4">
          {/* REQUEST */}
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Request</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold ${current.method === "GET" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                {current.method}
              </span>
              <span className="break-all font-mono text-xs text-neutral-200">{current.shownPath ?? current.path}</span>
            </div>
            {Object.keys(headers).length > 0 && (
              <div className="mt-3 space-y-1 rounded-lg bg-neutral-900 p-3">
                {Object.entries(headers).map(([k, v]) => (
                  <p key={k} className="break-all font-mono text-xs">
                    <span className="text-sky-300">{k}:</span> <span className="text-neutral-300">{v}</span>
                  </p>
                ))}
              </div>
            )}
            {current.body !== undefined && (
              <div className="mt-3 rounded-lg bg-neutral-900 p-3">
                <JsonView value={current.body} />
              </div>
            )}
          </div>

          {/* RESPONSE */}
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Response</p>
            {current.pending ? (
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                <Loader2 size={14} className="animate-spin" />
                {slow ? "Free-tier server may be waking up - can take ~30s…" : "Waiting for the server…"}
              </div>
            ) : current.networkError ? (
              <p className="rounded-lg bg-rose-500/10 p-3 font-mono text-xs leading-6 text-rose-300">{current.networkError}</p>
            ) : (
              <motion.div key={current.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded px-2 py-0.5 font-mono text-[11px] font-bold ${statusTone(current.status)}`}>
                    {current.status} {STATUS_TEXT[current.status ?? 0] ?? ""}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-500">{current.ms} ms</span>
                </div>
                <div className="mt-3 rounded-lg bg-neutral-900 p-3">
                  <JsonView value={current.response} />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {history.length > 1 && (
        <div className="border-t border-neutral-800 px-4 py-3">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">History</p>
          <div className="flex flex-wrap gap-2">
            {history.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => onPick(h)}
                className={`rounded-md border px-2 py-1 font-mono text-[10px] transition ${
                  current?.id === h.id ? "border-sky-400/60 text-sky-300" : "border-neutral-800 text-neutral-400 hover:border-neutral-600"
                }`}
              >
                {h.method} {h.path.replace(BASE, "").split("?")[0]} · {h.status ?? "ERR"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ───────────────────────── the playground ───────────────────────── */

type Mode = "valid" | "none" | "tampered" | "garbage";
const GARBAGE = "not.a.realtoken";

const JwtPlayground = () => {
  const [username, setUsername] = useState("visitor");
  const [ttl, setTtl] = useState(60);
  const [token, setToken] = useState<string | null>(null);
  const [view, setView] = useState<"original" | "tampered">("original");
  const [mode, setMode] = useState<Mode>("valid");

  const [current, setCurrent] = useState<Exchange | null>(null);
  const [history, setHistory] = useState<Exchange[]>([]);
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);
  const [now, setNow] = useState(Date.now());

  const inspected = token ? (view === "tampered" ? tamperToken(token) : token) : null;
  const parts = inspected ? splitToken(inspected) : null;
  const header = parts ? decodePart(parts.header) : null;
  const payload = parts ? decodePart(parts.payload) : null;

  // Expiry countdown, driven by the real `exp` claim inside the token.
  const expMs = useMemo(() => {
    const p = token ? splitToken(token) : null;
    const exp = p ? (decodePart(p.payload)?.exp as number | undefined) : undefined;
    return exp ? exp * 1000 : null;
  }, [token]);
  const remaining = expMs ? Math.max(0, Math.ceil((expMs - now) / 1000)) : 0;
  const expired = !!token && !!expMs && remaining === 0;

  useEffect(() => {
    if (!expMs || expired) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [expMs, expired]);

  const run = useCallback(async (spec: RequestSpec) => {
    const id = newId();
    setLoading(true);
    setSlow(false);
    setCurrent({ ...spec, id, pending: true });
    const slowTimer = setTimeout(() => setSlow(true), 4000);
    const result = await send(spec);
    clearTimeout(slowTimer);
    setSlow(false);
    setLoading(false);
    const done: Exchange = { ...spec, id, pending: false, ...result };
    setCurrent(done);
    setHistory((h) => [done, ...h].slice(0, 6));
    return done;
  }, []);

  const login = async () => {
    const ex = await run({
      method: "POST",
      path: `${BASE}/demo-login`,
      body: { username, ttlSeconds: ttl },
    });
    const t = (ex.response as { data?: { token?: string } } | null)?.data?.token;
    if (t) {
      setToken(t);
      setView("original");
      setMode("valid");
      setNow(Date.now());
    }
  };

  const decodeOnServer = () => {
    if (!inspected) return;
    run({
      method: "GET",
      path: `${BASE}/decode?token=${encodeURIComponent(inspected)}`,
      shownPath: `${BASE}/decode?token=${shorten(inspected)}`,
    });
  };

  const callProtected = () => {
    const tokenFor: Record<Mode, string | null> = {
      valid: token,
      tampered: token ? tamperToken(token) : null,
      garbage: GARBAGE,
      none: null,
    };
    const t = tokenFor[mode];
    run({
      method: "GET",
      path: `${BASE}/protected-resource`,
      headers: t ? { Authorization: `Bearer ${t}` } : {},
      shownHeaders: t ? { Authorization: `Bearer ${shorten(t)}` } : {},
    });
  };

  const reset = () => {
    setToken(null);
    setCurrent(null);
    setHistory([]);
    setView("original");
    setMode("valid");
  };

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
      {/* LEFT - the three steps */}
      <div className="space-y-5">
        {/* STEP 1 */}
        <StepCard n={1} title="Log in, get a token" hint="No password here - the server just signs a token for whatever name you give it.">
          <label className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-neutral-500" htmlFor="jwt-user">
            username
          </label>
          <input
            id="jwt-user"
            value={username}
            maxLength={50}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 font-mono text-sm outline-none transition focus:border-neutral-950"
          />
          <p className="mb-2 mt-4 font-mono text-[11px] uppercase tracking-widest text-neutral-500">token lifetime</p>
          <div className="flex flex-wrap gap-2">
            {[
              { s: 15, l: "15 sec" },
              { s: 60, l: "1 min" },
              { s: 300, l: "5 min" },
            ].map((o) => (
              <Chip key={o.s} active={ttl === o.s} onClick={() => setTtl(o.s)}>{o.l}</Chip>
            ))}
          </div>
          <p className="mt-2 text-xs text-neutral-500">Pick 15 sec to watch a token expire for real.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Btn onClick={login} disabled={loading}>
              <KeyRound size={14} /> POST /demo-login
            </Btn>
            {token && (
              <Btn variant="ghost" onClick={reset}>
                <RotateCcw size={14} /> Reset
              </Btn>
            )}
          </div>
        </StepCard>

        {/* STEP 2 */}
        <StepCard n={2} title="Look inside the token" hint="A JWT is three Base64 chunks joined by dots. Anyone can read the first two." locked={!token}>
          {!token || !parts ? (
            <p className="rounded-lg border border-dashed border-neutral-300 px-4 py-6 text-center font-mono text-xs text-neutral-500">
              Get a token in step 1 first.
            </p>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={view}>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Chip active={view === "original"} onClick={() => setView("original")}>original</Chip>
                <Chip active={view === "tampered"} onClick={() => setView("tampered")}>
                  <span className="inline-flex items-center gap-1"><ShieldAlert size={12} /> tamper: sub → admin</span>
                </Chip>
              </div>

              <div data-lenis-prevent className="max-h-40 overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50 p-3 font-mono text-xs leading-relaxed break-all">
                <span className="text-sky-600">{parts.header}</span>
                <span className="text-neutral-400">.</span>
                <span className="text-emerald-600">{parts.payload}</span>
                <span className="text-neutral-400">.</span>
                <span className="text-amber-600">{parts.signature}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px]">
                <span className="text-sky-600">● header</span>
                <span className="text-emerald-600">● payload</span>
                <span className="text-amber-600">● signature</span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-neutral-950 p-3">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-sky-300">header</p>
                  <JsonView value={header} />
                </div>
                <div className="rounded-lg bg-neutral-950 p-3">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-emerald-300">payload</p>
                  <JsonView value={payload} />
                </div>
              </div>

              <p className="mt-3 text-xs leading-5 text-neutral-600">
                {view === "tampered"
                  ? "Payload now says admin, but the signature is the old one. The server will notice the mismatch."
                  : "Encoded is not encrypted - never put secrets in the payload. The signature is what stops edits."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Btn variant="ghost" onClick={decodeOnServer} disabled={loading}>
                  GET /decode
                </Btn>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold ${
                    expired ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  <Clock size={12} />
                  {expired ? "expired" : `expires in ${mm}:${ss}`}
                </span>
              </div>
              {expMs && (
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className={`h-full rounded-full transition-[width] duration-300 ${expired ? "bg-rose-400" : "bg-emerald-500"}`}
                    style={{ width: `${Math.min(100, (remaining / ttl) * 100)}%` }}
                  />
                </div>
              )}
            </motion.div>
          )}
        </StepCard>

        {/* STEP 3 */}
        <StepCard n={3} title="Knock on the locked door" hint="One protected endpoint. Choose what you send and see how the server reacts.">
          <div className="flex flex-wrap gap-2">
            <Chip active={mode === "valid"} onClick={() => setMode("valid")} disabled={!token}>valid token</Chip>
            <Chip active={mode === "none"} onClick={() => setMode("none")}>no token</Chip>
            <Chip active={mode === "tampered"} onClick={() => setMode("tampered")} disabled={!token}>tampered</Chip>
            <Chip active={mode === "garbage"} onClick={() => setMode("garbage")}>garbage</Chip>
          </div>
          {expired && mode === "valid" && (
            <p className="mt-3 flex items-center gap-2 text-xs text-rose-700">
              <ShieldAlert size={14} /> This token has expired - expect a 401.
            </p>
          )}
          <div className="mt-4">
            <Btn onClick={callProtected} disabled={loading || ((mode === "valid" || mode === "tampered") && !token)}>
              <LockKeyhole size={14} /> GET /protected-resource
            </Btn>
          </div>
        </StepCard>

        <p className="flex items-start gap-2 px-1 text-xs leading-5 text-neutral-500">
          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />
          Live against my Spring Boot API. Tokens are signed with a key that exists only in server memory and works only on this demo endpoint.
        </p>
      </div>

      {/* RIGHT - console (sticks on desktop, stacks on mobile) */}
      <div className="lg:sticky lg:top-6">
        <Console current={current} history={history} slow={slow} onPick={setCurrent} />
      </div>
    </div>
  );
};

export default JwtPlayground;