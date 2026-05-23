"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaServer, FaBrain } from "react-icons/fa6";

const SKILL_CATEGORIES = [
  {
    id: "languages",
    title: "Core Languages",
    icon: <FaCode className="text-cyan-400 text-sm" />,
    skills: [
      { name: "Java", level: "Expert", desc: "10-month DSA intensive fellowship" },
      { name: "Python", level: "Advanced", desc: "ML, scripting, & AI backends" },
      { name: "JavaScript", level: "Expert", desc: "MERN Stack core development" },
      { name: "TypeScript", level: "Advanced", desc: "Robust Next.js applications" },
      { name: "HTML5 & CSS3", level: "Expert", desc: "Pixel-perfect responsive layouts" },
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    icon: <FaServer className="text-purple text-sm" />,
    skills: [
      { name: "React.js", level: "Expert", desc: "Interactive UI & state management" },
      { name: "Next.js 14", level: "Advanced", desc: "Server Actions, routing & SEO" },
      { name: "Node.js & Express", level: "Expert", desc: "Scalable backend routing APIs" },
      { name: "FastAPI", level: "Advanced", desc: "High-performance Python APIs" },
      { name: "MongoDB & Prisma", level: "Expert", desc: "Neon PostgreSQL schema designs" },
    ],
  },
  {
    id: "ai_tools",
    title: "AI Integrations & Tools",
    icon: <FaBrain className="text-pink-500 text-sm" />,
    skills: [
      { name: "Google Gemini API", level: "Advanced", desc: "Contextual agent integrations" },
      { name: "Generative AI", level: "Advanced", desc: "AWS Bedrock & SageMaker" },
      { name: "Git & GitHub", level: "Expert", desc: "Version control & collaboration" },
      { name: "REST APIs & WebRTC", level: "Advanced", desc: "Real-time communication & Video KYC" },
      { name: "Hostinger & Vercel", level: "Expert", desc: "Production server deployments" },
    ],
  },
];

export const PoppingTechBubbles = () => {
  const [activeTab, setActiveTab] = useState("languages");

  const currentCategory = SKILL_CATEGORIES.find((cat) => cat.id === activeTab) || SKILL_CATEGORIES[0];

  return (
    <div className="w-full h-full flex flex-col justify-between py-2 min-h-[300px]">
      {/* Category selector pills */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-white/5 pb-3">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-300 ${
              activeTab === cat.id
                ? "bg-purple/10 border-purple text-purple shadow-[0_0_12px_rgba(203,172,249,0.15)]"
                : "bg-white/[0.02] border-white/5 text-white-200 hover:border-white/10 hover:text-white"
            }`}
          >
            {cat.icon}
            {cat.title}
          </button>
        ))}
      </div>

      {/* Skills display card grid */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 max-h-[220px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-2.5"
          >
            {currentCategory.skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative flex items-center justify-between p-2.5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-purple/30 hover:bg-white/[0.03] transition-all duration-200"
              >
                {/* Visual glow indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-xl bg-purple opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="pl-1.5 text-left">
                  <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-purple transition-colors">
                    {skill.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-white-200/60 font-light mt-0.5 leading-tight">
                    {skill.desc}
                  </p>
                </div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase bg-cyan-950/20 border border-cyan-900/40 px-2 py-0.5 rounded-lg flex-shrink-0">
                  {skill.level}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
