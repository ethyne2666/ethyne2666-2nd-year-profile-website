import { motion } from "motion/react";
import {
  Cog, Database, Globe, Monitor, Network, Server, Zap, ListOrdered, type LucideIcon,
} from "lucide-react";
import type { DNode, Kind, Step } from "./designs";

const NW = 150;
const NH = 50;
const PAD = 10;

const ICONS: Record<Kind, LucideIcon> = {
  client: Monitor,
  lb: Network,
  service: Server,
  cache: Zap,
  store: Database,
  queue: ListOrdered,
  worker: Cog,
  external: Globe,
};

// Where a centre-to-centre line leaves a node's rectangle, so lines don't draw over the boxes.
const edgePoint = (from: DNode, to: DNode) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const t = Math.min(
    dx === 0 ? Infinity : NW / 2 / Math.abs(dx),
    dy === 0 ? Infinity : NH / 2 / Math.abs(dy)
  );
  return { x: from.x + dx * t, y: from.y + dy * t };
};

interface Props {
  nodes: DNode[];
  steps: Step[];
  step: number;
  slug: string;
}

const FlowDiagram = ({ nodes, steps, step, slug }: Props) => {
  // the canvas grows to fit however many columns and rows a design uses
  const W = Math.max(...nodes.map((n) => n.x)) + NW / 2 + PAD;
  const H = Math.max(...nodes.map((n) => n.y)) + NH / 2 + PAD;

  const byId = Object.fromEntries(nodes.map((nd) => [nd.id, nd]));
  const path = steps[step].path.map((id) => byId[id]);
  const activeIds = new Set(steps[step].path);

  // every link used by any step is drawn faintly; links used by the current step animate
  const pairKey = (a: string, b: string) => [a, b].sort().join("|");
  const links = new Map<string, [string, string]>();
  steps.forEach((s) => s.path.slice(1).forEach((id, i) => links.set(pairKey(s.path[i], id), [s.path[i], id])));
  const activePairs = new Set(steps[step].path.slice(1).map((id, i) => pairKey(steps[step].path[i], id)));

  const duration = Math.max(1, (path.length - 1) * 0.75);

  return (
    <div data-lenis-prevent className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
      <svg
        viewBox={`-${PAD} -${PAD} ${W + PAD} ${H + PAD}`}
        style={{ minWidth: Math.round(W * 0.8) }}
        className="mx-auto block w-full"
        role="img"
        aria-label="System design diagram"
      >
        <defs>
          <pattern id={`dots-${slug}`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="#e5e5e5" />
          </pattern>
        </defs>
        <rect x={-PAD} y={-PAD} width={W + PAD} height={H + PAD} fill={`url(#dots-${slug})`} />

        {/* links */}
        {[...links.entries()].map(([key, [a, b]]) => {
          const p1 = edgePoint(byId[a], byId[b]);
          const p2 = edgePoint(byId[b], byId[a]);
          return activePairs.has(key) ? (
            <motion.line
              key={key + step}
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke="#0a0a0a" strokeWidth={2.5} strokeLinecap="round" strokeDasharray="7 6"
              animate={{ strokeDashoffset: [0, -13] }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <line key={key} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#d4d4d4" strokeWidth={1.5} strokeLinecap="round" />
          );
        })}

        {/* nodes: black when part of the current step, white otherwise */}
        {nodes.map((nd) => {
          const Icon = ICONS[nd.kind];
          const on = activeIds.has(nd.id);
          const fs = nd.label.length > 16 ? 10 : 11;
          return (
            <g key={nd.id}>
              <rect
                x={nd.x - NW / 2} y={nd.y - NH / 2} width={NW} height={NH} rx={12}
                fill={on ? "#0a0a0a" : "#ffffff"}
                stroke={on ? "#0a0a0a" : "#d4d4d4"}
                strokeWidth={1.5}
                style={{ transition: "all .3s" }}
              />
              <Icon x={nd.x - NW / 2 + 10} y={nd.y - 9} size={18} color={on ? "#ffffff" : "#737373"} strokeWidth={2} />
              <text x={nd.x - NW / 2 + 36} y={nd.sub ? nd.y - 3 : nd.y + 4} fontSize={fs} fontWeight={600} fill={on ? "#ffffff" : "#0a0a0a"} style={{ transition: "fill .3s" }}>
                {nd.label}
              </text>
              {nd.sub && (
                <text x={nd.x - NW / 2 + 36} y={nd.y + 12} fontSize={9} fill={on ? "#d4d4d4" : "#737373"} style={{ transition: "fill .3s" }}>
                  {nd.sub}
                </text>
              )}
            </g>
          );
        })}

        {/* the moving packet; the key restarts it whenever the step changes */}
        {path.length > 1 && (
          <motion.circle
            key={`${slug}-${step}`}
            r={7}
            fill="#0a0a0a"
            stroke="#ffffff"
            strokeWidth={2.5}
            initial={{ cx: path[0].x, cy: path[0].y }}
            animate={{ cx: path.map((p) => p.x), cy: path.map((p) => p.y) }}
            transition={{ duration, ease: "linear", repeat: Infinity, repeatDelay: 0.9 }}
            style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.5))" }}
          />
        )}
      </svg>
    </div>
  );
};

export default FlowDiagram;