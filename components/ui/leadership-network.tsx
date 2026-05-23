"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  role: string;
  details: string;
}

export const LeadershipNetwork = () => {
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  // Nodes representing global cities in the Aspire Leaders cohort
  const nodes: Node[] = [
    {
      id: "boston",
      name: "Boston (Harvard)",
      x: 15,
      y: 35,
      role: "Aspire Institute Board",
      details: "Academic advisors, global curriculum & leadership modules",
    },
    {
      id: "delhi",
      name: "New Delhi (Akansha)",
      x: 65,
      y: 40,
      role: "Global Leadership Fellow",
      details: "Lead builder & Amazon Scholar engineering solutions",
    },
    {
      id: "london",
      name: "London",
      x: 42,
      y: 25,
      role: "Cohort Collaborator",
      details: "Cross-border peer reviews on global development challenges",
    },
    {
      id: "munich",
      name: "Munich (GDG Global)",
      x: 48,
      y: 32,
      role: "Solution Challenge Judges",
      details: "Regional Google Developer mentors and technology advisors",
    },
    {
      id: "tokyo",
      name: "Tokyo",
      x: 85,
      y: 38,
      role: "Regional Coordinator",
      details: "East Asia networking and cross-cultural workshops",
    },
    {
      id: "nairobi",
      name: "Nairobi",
      x: 52,
      y: 65,
      role: "Social Impact Lead",
      details: "Collaborative research on water filtration & clean energy initiatives",
    },
    {
      id: "saopaulo",
      name: "São Paulo",
      x: 28,
      y: 75,
      role: "Cohort Peer",
      details: "Fictional world lore and gamification feedback exchange",
    },
  ];

  // Draw connections between Boston (Harvard), Delhi (Akansha), and others
  const connections = [
    { from: "boston", to: "delhi" },
    { from: "boston", to: "london" },
    { from: "boston", to: "nairobi" },
    { from: "boston", to: "saopaulo" },
    { from: "delhi", to: "london" },
    { from: "delhi", to: "munich" },
    { from: "delhi", to: "tokyo" },
    { from: "delhi", to: "nairobi" },
  ];

  useEffect(() => {
    if (hoveredNode) {
      // Find all connected nodes
      const connected = connections
        .filter((c) => c.from === hoveredNode.id || c.to === hoveredNode.id)
        .map((c) => (c.from === hoveredNode.id ? c.to : c.from));
      setActiveConnections([hoveredNode.id, ...connected]);
    } else {
      setActiveConnections([]);
    }
  }, [hoveredNode]);

  return (
    <div className="absolute inset-0 w-full h-full bg-slate-950/20 dark:bg-black-100/40 rounded-3xl overflow-hidden flex flex-col justify-end p-4 border border-white/[0.03]">
      {/* Visual background lines representing map coordinates */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* SVG Canvas for nodes and laser lines */}
      <div className="absolute inset-0 w-full h-[75%] top-4">
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Gradients definitions for glowing paths */}
          <defs>
            <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cb3cff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.8" />
            </linearGradient>
            <filter id="svg-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines */}
          {connections.map((conn, idx) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const isHighlighted =
              activeConnections.includes(conn.from) &&
              activeConnections.includes(conn.to);

            return (
              <g key={`conn-${idx}`}>
                {/* Underlay glow */}
                <motion.line
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="url(#glow-grad)"
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  opacity={isHighlighted ? 0.6 : 0.15}
                  filter={isHighlighted ? "url(#svg-glow)" : undefined}
                  transition={{ duration: 0.3 }}
                />
                {/* Moving dot animation along connections */}
                <motion.circle
                  r={isHighlighted ? 2.5 : 1.5}
                  fill={isHighlighted ? "#00f2fe" : "#a855f7"}
                  opacity={isHighlighted ? 0.9 : 0.4}
                  filter="url(#svg-glow)"
                >
                  <animateMotion
                    dur={`${4 + idx % 3}s`}
                    repeatCount="indefinite"
                    path={`M ${fromNode.x * 3.5},${fromNode.y * 2.2} L ${toNode.x * 3.5},${toNode.y * 2.2}`}
                    // Fallback to coordinates calculation
                  />
                  {/* Native SVG dasharray animation backup */}
                </motion.circle>
                
                {/* Glowing laser pulse overlay */}
                <motion.line
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="#a855f7"
                  strokeWidth={isHighlighted ? 1.5 : 0.5}
                  strokeDasharray="6, 30"
                  opacity={isHighlighted ? 0.8 : 0.3}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="100;0"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </motion.line>
              </g>
            );
          })}

          {/* Render Nodes */}
          {nodes.map((node) => {
            const isHighlighted = activeConnections.includes(node.id);
            const isSelf = node.id === "delhi";

            return (
              <g
                key={node.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Pulsing Outer Glow */}
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={isSelf ? 14 : 10}
                  fill={isSelf ? "#a855f7" : "#00f2fe"}
                  opacity={isHighlighted ? 0.25 : 0.05}
                  className="animate-pulse"
                />
                {/* Inner Glow Border */}
                <motion.circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={isSelf ? 8 : 5}
                  stroke={isSelf ? "#cb3cff" : "#00f2fe"}
                  strokeWidth={isHighlighted ? 2 : 1}
                  fill={isHighlighted ? (isSelf ? "#cb3cff" : "#00f2fe") : "#090d1f"}
                  animate={{
                    r: isHighlighted ? (isSelf ? 9 : 6) : (isSelf ? 7 : 4.5),
                  }}
                  transition={{ duration: 0.2 }}
                />
                {/* Central Dot */}
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={isSelf ? 4.5 : 2.5}
                  fill="#ffffff"
                />

                {/* Text Label on hover or for key nodes */}
                <motion.text
                  x={`${node.x}%`}
                  y={`${node.y - 4}%`}
                  textAnchor="middle"
                  fill={isSelf ? "#e2cbff" : isHighlighted ? "#58e2ff" : "#94a3b8"}
                  fontSize={isSelf ? "10px" : "8px"}
                  fontWeight={isSelf || isHighlighted ? "bold" : "normal"}
                  className="select-none pointer-events-none"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: isHighlighted || isSelf ? 1 : 0.5, scale: isHighlighted ? 1.05 : 1 }}
                >
                  {node.name.split(" ")[0]}
                </motion.text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Info Tooltip / Display Panel at the bottom */}
      <div className="relative z-10 w-full h-[32%] bg-black/60 dark:bg-black-100/80 border border-white/[0.08] backdrop-blur-md rounded-2xl p-3 flex flex-col justify-center min-h-[70px]">
        <AnimatePresence mode="wait">
          {hoveredNode ? (
            <motion.div
              key={hoveredNode.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white tracking-wide">{hoveredNode.name}</span>
                <span className="text-[9px] font-semibold text-purple uppercase bg-purple/10 px-2 py-0.5 rounded-full border border-purple/20">
                  {hoveredNode.role}
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                {hoveredNode.details}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col justify-center items-center text-center h-full"
            >
              <span className="text-[10px] text-purple font-semibold uppercase tracking-wider animate-pulse">
                ✦ Hover over network nodes ✦
              </span>
              <p className="text-[10px] text-neutral-400 mt-1 leading-snug">
                Visualizing collaborative connections between Harvard advisors and global cohort peers.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
