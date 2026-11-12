"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { prefersReducedMotion } from "@/lib/utils";

type NodeDef = { x: number; y: number; label: string; kind?: "io" | "qa" };

const NODES: Record<string, NodeDef> = {
  ingest: { x: 200, y: 30, label: "brief + raw clips", kind: "io" },
  clip: { x: 78, y: 96, label: "clip analysis" },
  vision: { x: 200, y: 96, label: "vision" },
  research: { x: 322, y: 96, label: "research" },
  strategy: { x: 128, y: 162, label: "strategy" },
  story: { x: 272, y: 162, label: "story" },
  voice: { x: 44, y: 228, label: "voiceover" },
  music: { x: 122, y: 228, label: "music" },
  anim: { x: 200, y: 228, label: "animation" },
  trans: { x: 278, y: 228, label: "transition" },
  caps: { x: 356, y: 228, label: "captions" },
  director: { x: 200, y: 294, label: "editing director" },
  render: { x: 118, y: 360, label: "render" },
  critic: { x: 282, y: 360, label: "critic", kind: "qa" },
  reviewer: { x: 200, y: 426, label: "visual reviewer", kind: "qa" },
  thumb: { x: 80, y: 492, label: "thumbnail" },
  title: { x: 200, y: 492, label: "title" },
  publish: { x: 320, y: 492, label: "publishing" },
  output: { x: 200, y: 560, label: "youtube-ready.mp4", kind: "io" },
  perf: { x: 58, y: 560, label: "performance" },
  learn: { x: 342, y: 560, label: "learning" },
};

type Edge = { from: string; to: string; kind?: "loop" | "feedback" };
const EDGES: Edge[] = [
  { from: "ingest", to: "clip" },
  { from: "ingest", to: "vision" },
  { from: "ingest", to: "research" },
  { from: "clip", to: "strategy" },
  { from: "vision", to: "strategy" },
  { from: "vision", to: "story" },
  { from: "research", to: "story" },
  { from: "strategy", to: "voice" },
  { from: "strategy", to: "music" },
  { from: "strategy", to: "anim" },
  { from: "story", to: "anim" },
  { from: "story", to: "trans" },
  { from: "story", to: "caps" },
  { from: "voice", to: "director" },
  { from: "music", to: "director" },
  { from: "anim", to: "director" },
  { from: "trans", to: "director" },
  { from: "caps", to: "director" },
  { from: "director", to: "render" },
  { from: "render", to: "critic" },
  { from: "critic", to: "director", kind: "loop" },
  { from: "critic", to: "reviewer" },
  { from: "reviewer", to: "thumb" },
  { from: "reviewer", to: "title" },
  { from: "reviewer", to: "publish" },
  { from: "thumb", to: "output" },
  { from: "title", to: "output" },
  { from: "publish", to: "output" },
  { from: "output", to: "perf" },
  { from: "perf", to: "learn", kind: "feedback" },
  { from: "learn", to: "story", kind: "feedback" },
];

const STAGES: { nodes: string[]; log: string; tone?: "bad" | "good" }[] = [
  { nodes: ["ingest"], log: "job received · brief + raw phone clips" },
  { nodes: ["clip", "vision", "research"], log: "gemini shot check · 6 windows per clip" },
  { nodes: ["strategy", "story"], log: "planning the story beats" },
  { nodes: ["voice", "music", "anim", "trans", "caps"], log: "5 agents in parallel · lyria scores music" },
  { nodes: ["director"], log: "editing director assembles the cut" },
  { nodes: ["render"], log: "ffmpeg render · master to −16 LUFS" },
  { nodes: ["critic"], log: "critic: weak first 3s → send back", tone: "bad" },
  { nodes: ["director"], log: "pass 2 · re-cut the opening" },
  { nodes: ["render"], log: "re-render" },
  { nodes: ["critic"], log: "critic: passed", tone: "good" },
  { nodes: ["reviewer"], log: "vision model scores every shot 0–10", tone: "good" },
  { nodes: ["thumb", "title", "publish"], log: "thumbnail · title · youtube.txt" },
  { nodes: ["output"], log: "video ready to publish", tone: "good" },
  { nodes: ["perf"], log: "bigquery: first-7-day metrics" },
  { nodes: ["learn"], log: "mine lessons · human approves" },
  { nodes: ["story"], log: "approved lessons shape the next edit" },
];

const w = (label: string) => Math.max(54, label.length * 6.1 + 18);

function edgePath(e: Edge) {
  const a = NODES[e.from];
  const b = NODES[e.to];
  if (e.kind === "loop") {
    // critic → director: curl out to the right and back in
    return `M ${a.x + 10} ${a.y - 11} C ${a.x + 70} ${a.y - 40}, ${b.x + 120} ${b.y - 10}, ${b.x + w(NODES[e.to].label) / 2} ${b.y}`;
  }
  if (e.from === "perf" && e.to === "learn") {
    return `M ${a.x} ${a.y + 11} C ${a.x + 40} ${a.y + 34}, ${b.x - 40} ${b.y + 34}, ${b.x} ${b.y + 11}`;
  }
  if (e.from === "learn" && e.to === "story") {
    return `M ${a.x + 30} ${a.y - 8} C ${a.x + 70} ${a.y - 160}, ${b.x + 130} ${b.y + 40}, ${b.x + w(NODES[e.to].label) / 2} ${b.y}`;
  }
  if (e.from === "output" && e.to === "perf") {
    return `M ${a.x - w(a.label) / 2} ${a.y} L ${b.x + w(b.label) / 2} ${b.y}`;
  }
  const y1 = a.y + 11;
  const y2 = b.y - 11;
  const my = (y1 + y2) / 2;
  return `M ${a.x} ${y1} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${y2}`;
}

export function AgentGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(prefersReducedMotion()), []);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => setStep((s) => (s + 1) % (STAGES.length + 3)), 900);
    return () => clearInterval(id);
  }, [inView, reduced]);

  const s = reduced ? STAGES.length - 1 : Math.min(step, STAGES.length - 1);
  const stage = STAGES[s];
  const prev = s > 0 ? STAGES[s - 1] : null;

  const visited = useMemo(() => {
    const v = new Set<string>();
    for (let i = 0; i <= s; i++) STAGES[i].nodes.forEach((n) => v.add(n));
    return v;
  }, [s]);

  const logStart = Math.max(0, s - 3);
  const logs = STAGES.slice(logStart, s + 1);
  const showOutput = s >= 12;

  return (
    <div ref={ref} className="relative flex h-full w-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[10px] text-fg-3">
        <span>
          <span className="text-volt">●</span> langgraph · StateGraph
        </span>
        <span>replay · {String(s + 1).padStart(2, "0")}/{STAGES.length}</span>
      </div>

      <div className="relative min-h-0 flex-1 px-2 py-3">
        <svg viewBox="0 0 400 600" className="h-full w-full" role="img" aria-label="Alpha Titans agent graph">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {EDGES.map((e, i) => {
            const active = stage.nodes.includes(e.to) && !!prev?.nodes.includes(e.from);
            const done = visited.has(e.from) && visited.has(e.to) && !active;
            const color =
              e.kind === "loop" ? "#FF6B6B" : e.kind === "feedback" ? "#8B7CFF" : active ? "#C8FF3D" : "#ffffff";
            return (
              <path
                key={i}
                d={edgePath(e)}
                fill="none"
                stroke={color}
                strokeWidth={active ? 1.6 : 1}
                strokeOpacity={active ? 1 : done ? 0.28 : e.kind ? 0.22 : 0.08}
                strokeDasharray={e.kind || active ? "4 4" : undefined}
                className={active ? "[animation:dash_0.6s_linear_infinite]" : undefined}
                style={{ transition: "stroke-opacity .4s, stroke .4s" }}
              />
            );
          })}

          {Object.entries(NODES).map(([id, n]) => {
            const isActive = stage.nodes.includes(id);
            const isDone = visited.has(id);
            const width = w(n.label);
            const bad = isActive && stage.tone === "bad";
            const accent = bad ? "#FF6B6B" : n.kind === "qa" ? "#8B7CFF" : "#C8FF3D";
            return (
              <g key={id} transform={`translate(${n.x - width / 2} ${n.y - 11})`} filter={isActive ? "url(#glow)" : undefined}>
                <rect
                  width={width}
                  height={22}
                  rx={11}
                  fill={isActive ? accent : n.kind === "io" ? "#14141B" : "#0D0D12"}
                  fillOpacity={isActive ? 0.18 : 1}
                  stroke={isActive ? accent : isDone ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}
                  strokeDasharray={n.kind === "io" ? "3 3" : undefined}
                  style={{ transition: "all .35s" }}
                />
                <text
                  x={width / 2}
                  y={14.5}
                  textAnchor="middle"
                  fontSize={9.5}
                  fontFamily="var(--font-mono)"
                  fill={isActive ? accent : isDone ? "#EDEDF2" : "#6C6C7A"}
                  style={{ transition: "fill .35s" }}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>

        <AnimatePresence>
          {showOutput && (
            <motion.figure
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-3 top-3 w-[38%] overflow-hidden rounded-xl border border-volt/40 bg-ink shadow-[0_20px_60px_-20px_rgba(200,255,61,0.5)]"
            >
              <Image
                src="/work/alpha-titans-output.jpg"
                alt="Thumbnail generated by Alpha Titans for a LEGO build video"
                width={640}
                height={360}
                className="h-auto w-full"
              />
              <figcaption className="px-2 py-1.5 font-mono text-[9px] text-fg-2">thumbnail.jpg · agent output</figcaption>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>

      <div className="h-[92px] space-y-1 overflow-hidden border-t border-line px-5 py-3 font-mono text-[11px]">
        {logs.map((l, i) => (
          <motion.div
            key={logStart + i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: i === logs.length - 1 ? 1 : 0.4, x: 0 }}
            className={l.tone === "bad" ? "text-[#FF6B6B]" : l.tone === "good" ? "text-volt" : "text-fg-2"}
          >
            {l.tone === "bad" ? "✗" : l.tone === "good" ? "✓" : "›"} {l.log}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
