"use client";

import React, { useState } from "react";
import { FaFileCode, FaFolder, FaChevronRight } from "react-icons/fa6";

const SKILL_DESCRIPTIONS: Record<string, { desc: string; level: string }> = {
  Java: { desc: "10-month intensive DSA fellowship training supported by Amazon.", level: "Expert" },
  Python: { desc: "Machine Learning, automation scripts, and FastAPI backends.", level: "Advanced" },
  TypeScript: { desc: "Scalable, type-safe Next.js App Router applications.", level: "Advanced" },
  JavaScript: { desc: "Asynchronous backend logic and DOM manipulation in MERN stack.", level: "Expert" },
  "HTML5/CSS3": { desc: "Responsive layout design and premium modern CSS aesthetics.", level: "Expert" },
  "React.js": { desc: "Hooks, context, rendering optimization, and reusable UI structures.", level: "Expert" },
  "Next.js 14": { desc: "Server Actions, route handlers, SSR, and SEO-optimized page delivery.", level: "Advanced" },
  "Node.js": { desc: "REST APIs, asynchronous runtime configurations, and servers.", level: "Expert" },
  FastAPI: { desc: "High-performance Python backend REST endpoints and Swagger APIs.", level: "Advanced" },
  MongoDB: { desc: "NoSQL document collections, complex indexes, and Mongoose schemas.", level: "Expert" },
  PostgreSQL: { desc: "Neon Serverless relational tables, migrations, and Prisma ORM.", level: "Expert" },
  Gemini_API: { desc: "Generative AI context matching, embedding searches, and agent chatbots.", level: "Advanced" },
  AWS_Bedrock: { desc: "Generative AI models and secure API pipelines on AWS cloud.", level: "Advanced" },
  "Git/GitHub": { desc: "Collaborative branch management, rebase workflows, and conflict fixes.", level: "Expert" },
  WebRTC: { desc: "Peer-to-peer real-time video/audio channels and Video KYC booking.", level: "Advanced" }
};

interface CodeLine {
  text: string;
  type: "bracket" | "property" | "info" | "skill" | "nested-bracket";
  skillKey?: string;
  indent: number;
}

const lines: CodeLine[] = [
  { text: "{", type: "bracket", indent: 0 },
  { text: '"developer": "Akansha Lakhina",', type: "info", indent: 1 },
  { text: '"focus": "AI + Full-Stack Developer",', type: "info", indent: 1 },
  { text: '"skills": {', type: "property", indent: 1 },
  
  { text: '"languages": {', type: "nested-bracket", indent: 2 },
  { text: '"Java": "10-month DSA intensive",', type: "skill", skillKey: "Java", indent: 3 },
  { text: '"Python": "ML & FastAPI backend",', type: "skill", skillKey: "Python", indent: 3 },
  { text: '"TypeScript": "Robust web apps",', type: "skill", skillKey: "TypeScript", indent: 3 },
  { text: '"JavaScript": "Asynchronous engine",', type: "skill", skillKey: "JavaScript", indent: 3 },
  { text: '"HTML5_CSS3": "Premium UI design"', type: "skill", skillKey: "HTML5/CSS3", indent: 3 },
  { text: "},", type: "nested-bracket", indent: 2 },
  
  { text: '"fullStack": {', type: "nested-bracket", indent: 2 },
  { text: '"React_js": "Hooks & state flow",', type: "skill", skillKey: "React.js", indent: 3 },
  { text: '"Next_js_14": "SSR & SEO actions",', type: "skill", skillKey: "Next.js 14", indent: 3 },
  { text: '"Node_js": "High-throughput APIs",', type: "skill", skillKey: "Node.js", indent: 3 },
  { text: '"FastAPI": "High-performance Python",', type: "skill", skillKey: "FastAPI", indent: 3 },
  { text: '"MongoDB": "Mongoose DB models",', type: "skill", skillKey: "MongoDB", indent: 3 },
  { text: '"PostgreSQL": "Relational Prisma schema"', type: "skill", skillKey: "PostgreSQL", indent: 3 },
  { text: "},", type: "nested-bracket", indent: 2 },
  
  { text: '"aiAndTools": {', type: "nested-bracket", indent: 2 },
  { text: '"Gemini_API": "AI Agent integration",', type: "skill", skillKey: "Gemini_API", indent: 3 },
  { text: '"AWS_Bedrock": "Generative AI model flow",', type: "skill", skillKey: "AWS_Bedrock", indent: 3 },
  { text: '"Git_GitHub": "Collaboration & CI/CD",', type: "skill", skillKey: "Git/GitHub", indent: 3 },
  { text: '"WebRTC": "Real-time Video KYC"', type: "skill", skillKey: "WebRTC", indent: 3 },
  { text: "}", type: "nested-bracket", indent: 2 },
  
  { text: "}", type: "bracket", indent: 1 },
  { text: "}", type: "bracket", indent: 0 }
];

export const TechStackIDE = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillInfo = hoveredSkill ? SKILL_DESCRIPTIONS[hoveredSkill] : null;

  return (
    <div className="w-full flex flex-col h-[320px] sm:h-[300px] rounded-xl border border-white/10 bg-black-100/50 backdrop-blur-md overflow-hidden font-mono text-[10px] sm:text-xs">
      {/* Editor Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-black-200/40">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-1.5 text-white-200/50 text-[11px]">
          <FaFolder className="text-yellow-500/80 text-xs" />
          <span>portfolio</span>
          <FaChevronRight className="text-[8px] opacity-40" />
          <FaFileCode className="text-cyan-400 text-xs" />
          <span className="text-white font-medium">skills.json</span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Gutter */}
        <div className="w-8 sm:w-10 py-3 text-right pr-2 sm:pr-3 text-white-200/20 border-r border-white/5 bg-black-100/20 select-none">
          {lines.map((_, i) => (
            <div key={i} className="leading-5 h-5">{i + 1}</div>
          ))}
        </div>

        {/* Code Output Viewer */}
        <div className="flex-1 py-3 pl-3 sm:pl-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
          {lines.map((line, idx) => {
            const isHovered = line.skillKey && hoveredSkill === line.skillKey;

            return (
              <div
                key={idx}
                className={`leading-5 h-5 flex items-center transition-all duration-150 rounded px-1.5 -ml-1.5 ${
                  line.skillKey ? "cursor-help" : ""
                } ${isHovered ? "bg-purple/10 border-l border-purple pl-1" : ""}`}
                style={{ paddingLeft: `${line.indent * 12 + (isHovered ? 4 : 6)}px` }}
                onMouseEnter={() => {
                  if (line.skillKey) setHoveredSkill(line.skillKey);
                }}
                onMouseLeave={() => {
                  if (line.skillKey) setHoveredSkill(null);
                }}
              >
                {line.type === "bracket" || line.type === "nested-bracket" ? (
                  <span className="text-yellow-400 font-semibold">{line.text}</span>
                ) : line.type === "property" ? (
                  <>
                    <span className="text-cyan-400">{line.text.slice(0, line.text.indexOf(":"))}</span>
                    <span className="text-white-100">: </span>
                    <span className="text-yellow-400 font-semibold">&#123;</span>
                  </>
                ) : line.type === "info" ? (
                  <>
                    <span className="text-purple-300">{line.text.slice(0, line.text.indexOf(":"))}</span>
                    <span className="text-white-100">: </span>
                    <span className="text-emerald-400">{line.text.slice(line.text.indexOf(":") + 2)}</span>
                  </>
                ) : line.type === "skill" && line.skillKey ? (
                  <>
                    <span className="text-cyan-400">{line.text.slice(0, line.text.indexOf(":"))}</span>
                    <span className="text-white-100">: </span>
                    <span className="text-orange-400">{line.text.slice(line.text.indexOf(":") + 2)}</span>
                  </>
                ) : (
                  <span className="text-white-100">{line.text}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Editor Status Bar / Terminal Output */}
      <div className="bg-[#0c0e17] border-t border-white/5 px-3.5 py-1.5 flex items-center justify-between text-[9px] sm:text-[10px] text-white-200/50 select-none">
        <div className="flex items-center gap-3 truncate max-w-[80%]">
          <span className="text-teal-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            main*
          </span>
          <span className="truncate">
            {skillInfo ? (
              <span className="text-white">
                <span className="text-purple font-semibold">[{skillInfo.level}]</span> {hoveredSkill}: {skillInfo.desc}
              </span>
            ) : (
              "ℹ️ Hover over JSON keys to inspect skill details..."
            )}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span>UTF-8</span>
          <span className="hidden sm:inline">JSON</span>
          <span>Tab Size: 2</span>
        </div>
      </div>
    </div>
  );
};
